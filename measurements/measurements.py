import numpy as np
from scipy import signal
import matplotlib.pyplot as plt
import SoapySDR
from SoapySDR import SOAPY_SDR_RX, SOAPY_SDR_CF32
# import time
# inicio = time.time()


#################################################
# INPUTS
freqIni = 104e6 # Hz
freqFin = 114e6
t_capt = 0.25 # s
noiseThreshold = -118 # dBm/Hz
nfft = 1024 # 2048 4096 8192 ...
mode = 'max' # 'avg' o 'max'
chanBW = 250e3
#################################################


totalBW = freqFin - freqIni
G = 42 # dB
fs = 2.56e6 # samples/s
filtBW = fs # Hz
nWindows = int(np.ceil(totalBW/2.0e6))

fc_first_win = freqIni + 1.0e6

# f_axis = np.arange(nfft)*fs/nfft - 0.5*fs
# idx_limDown = np.where(f_axis == -1.0e6)[0][0] # -1.0 MHz index en f_axis
# idx_limUp = np.where(f_axis == 1.0e6)[0][0] # 1.0 MHz index en f_axis

idx_limDown = 112*nfft//1024
idx_limUp = 912*nfft//1024

nSpecPoints = idx_limUp - idx_limDown
psd = np.empty(nWindows*nSpecPoints + 1)

nSamples = int(np.ceil(t_capt*fs))

sdr = SoapySDR.Device({'driver':'rtlsdr', "channel": "0"})

rx_chan = 0
sdr.setGainMode(SOAPY_SDR_RX, rx_chan, False)   # AGC desactivado
sdr.setGain(SOAPY_SDR_RX, rx_chan, G) 

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

for win in range(nWindows):
    fc = fc_first_win + win*2.0e6
    x = sdrCapture(sdr, rx_chan, fs, nSamples, filtBW, fc)
    x = x[0:nfft*(len(x)//nfft)]
    _, pxx = signal.welch(x, fs, nperseg = nfft, return_onesided = False, scaling = 'density')
    pxx = np.fft.fftshift(pxx)
    pxx[nfft//2] = 0 # eliminamos media
    psd[win*nSpecPoints:(win + 1)*nSpecPoints] = pxx[idx_limDown:idx_limUp]
    if win == nWindows - 1:
        psd[-1] = pxx[-1]

nPointsPerChan = int(np.round(nfft*chanBW/fs))
nChannels = int(len(psd)//nPointsPerChan)

results = np.zeros(nChannels, dtype=int)
if mode == 'max':    
    for chan in range(nChannels):
        PdBm_Hz = 10*np.log10(np.max(psd[chan*nPointsPerChan:(chan + 1)*nPointsPerChan])) - G + 30
        if PdBm_Hz > noiseThreshold:
            results[chan] = 1
else:
    for chan in range(nChannels):
        PdBm = 10*np.log10(np.sum(psd[chan*nPointsPerChan:(chan + 1)*nPointsPerChan])*fs/nfft) - G + 30
        if PdBm > noiseThreshold + 10*np.log10(nPointsPerChan*fs/nfft):
            results[chan] = 1

print(results)

# plt.plot(10*np.log10(psd)+30-G)
# plt.savefig('psd13.png')

# fin = time.time()
# print(fin-inicio)