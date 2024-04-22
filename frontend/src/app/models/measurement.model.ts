export interface Measurement {
  _id?: string;
  name: string;
  user_id: string;
  type: {
    isConstellation: true;
    id: string;
  };
  freqIni: number;
  freqFinal: number;
  threshold: string;
  t_capt: number;
  chanBW: number;
  nfft: number;
  mode: string;
  startedAt: Date; // se llena cuando la medición empieza
  finishedAt: Date; // cuando la medición termina
}
