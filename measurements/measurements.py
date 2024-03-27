import numpy as np
from scipy import signal
import SoapySDR
from SoapySDR import SOAPY_SDR_RX, SOAPY_SDR_CF32

#################################################
# INPUTS
freqIni = 758e6 # Hz frcuencia inicial
freqFinal = 768.77e6 # Hz frecuencia final
t_capt = 0.25 # s tiempo de captura por cada estimación
threshold = 'auto' # dBm/Hz umbral 'auto' para estimación adaptativa o valor para umbral constante
nfft = 2048 # 2048 4096 8192 ... potencias de 2
mode = 'avg' # 'avg' estima en función de potencia media o 'max' estima según valor máximo del espectro
chanBW = 500e3 # Hz ancho de canal
#################################################

# Se estima el espectro utilizando ventanas deslizantes solapadas de 2.56 MHz, para posteriormente eliminar 280 kHz por cada extremo
# de cada ventana para utilizar sólo la parte plana de la respuesta del filtro. Se utilizan nfft puntos del espectro para estimar cada 2,56 MHz.
# Posteriormente se dividen los puntos estimados del espectro según chanBW.

totalBW = freqFinal - freqIni # ancho de banda total
G = 45 # dB ganancia del RTL
fs = 2.56e6 # samples/s tasa de muestreo
filtBW = fs # Hz ancho de filtro instantáneo
nWindows = int(np.ceil(totalBW/2.0e6)) # número de ventanas en frecuencia de 2 MHz

fc_first_win = freqIni + 1.0e6 # frecuencia central de la primera ventana

# índices de la fft para recortar a 2 MHz
idx_limDown = 112*nfft//1024
idx_limUp = 912*nfft//1024

nSpecPoints = idx_limUp - idx_limDown
psd = np.empty(nWindows*nSpecPoints)

nSamples = int(np.ceil(t_capt*fs)) # número de muestras para estimación de 2.56 MHz

sdr = SoapySDR.Device({'driver':'rtlsdr', "channel": "0"})

rx_chan = 0
sdr.setGainMode(SOAPY_SDR_RX, rx_chan, False)   # AGC desactivado
sdr.setGain(SOAPY_SDR_RX, rx_chan, G) # configuración de ganancia

# función para capturar datos del RTL
def sdrCapture(sdr:SoapySDR.Device, rx_chan, fs, nSamples, filtBW, fc): 
    sdr.setFrequency(SOAPY_SDR_RX, rx_chan, fc) 
    sdr.setBandwidth(SoapySDR.SOAPY_SDR_RX,rx_chan,filtBW)
    sdr.setSampleRate(SoapySDR.SOAPY_SDR_RX,rx_chan,fs)
    rx_stream = sdr.setupStream(SOAPY_SDR_RX, SOAPY_SDR_CF32, [rx_chan])
    mtu_frame_size = 512*2048
    mtu_bytes_per_sample = 8
    mtu_samples = mtu_frame_size // mtu_bytes_per_sample
    rx_buff = np.empty(2*mtu_samples, np.float32)
    nSamples = (nSamples//mtu_samples)*mtu_samples
    samples = np.empty( nSamples, dtype=np.complex64 )
    sdr.activateStream(rx_stream)
    for ctr in range(nSamples//mtu_samples):
        sr = sdr.readStream(rx_stream, [rx_buff], mtu_samples, timeoutUs=int(10e6)) 
        if sr.ret != mtu_samples:
            print("ERROR")
        else:
            samples[ctr*mtu_samples: (1+ctr)*mtu_samples] = rx_buff[0::2] + 1j*rx_buff[1::2]

    sdr.deactivateStream(rx_stream)
    sdr.closeStream(rx_stream)
    return(samples)

# estimamos densidad espectral de potencia por cada ventana de 2 MHz pxx y juntamos todas las estimaciones en psd
for win in range(nWindows):
    fc = fc_first_win + win*2.0e6
    x = sdrCapture(sdr, rx_chan, fs, nSamples, filtBW, fc)
    x = x[0:nfft*(len(x)//nfft)]
    _, pxx = signal.welch(x, fs, nperseg = nfft, return_onesided = False, scaling = 'density')
    pxx = np.fft.fftshift(pxx)
    pxx[nfft//2] = 0 # eliminamos media
    psd[win*nSpecPoints:(win + 1)*nSpecPoints] = pxx[idx_limDown:idx_limUp]

nPointsPerChan = int(np.round(nfft*chanBW/fs)) # número de puntos del espectro que le corresponden a chanBW
nChannels =int((nfft*totalBW/fs)//nPointsPerChan) # número de canales

results = np.zeros(nChannels, dtype=int) # array que indica por cada canal 0 desocupado o 1 ocupado

# comprobamos y estimamos umbral adaptativo
if threshold == 'auto':
    threshold = 10*np.log10(np.mean(np.sort(psd)[:int(0.2*len(psd))])) - G + 30

# realizamos estimaciones de ocupación según mode y threshold para cada canal
if mode == 'max':    
    for chan in range(nChannels):
        PdBm_Hz = 10*np.log10(np.max(psd[chan*nPointsPerChan:(chan + 1)*nPointsPerChan])) - G + 30
        if PdBm_Hz > threshold:
            results[chan] = 1
else:
    for chan in range(nChannels):
        PdBm = 10*np.log10(np.sum(psd[chan*nPointsPerChan:(chan + 1)*nPointsPerChan])*fs/nfft) - G + 30
        if PdBm > threshold + 10*np.log10(nPointsPerChan*fs/nfft):
            results[chan] = 1

print(results)