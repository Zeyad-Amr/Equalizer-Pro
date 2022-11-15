# vowels are o , i , u and ae
import numpy as np
import librosa
import librosa.display
Voice_samplerate = librosa.get_samplerate('Socko.wav')
y, sr = librosa.load('Socko.wav', sr=Voice_samplerate)
Fourier_freq = np.fft.rfftfreq(y.size, d=1/sr)
f_signal = np.fft.rfft(y)


def Vowels():    # القيم االلي اكبر من دي هي اللي هتتجاب من السلايدر!
    cut_f_signal = f_signal.copy()
    # cut_f_signal[(np.abs(Fourier_freq)<2000)] = 0 # cut signal below 2000Hz #works for u COOK
    # cut_f_signal[(np.abs(Fourier_freq)<5000)] =0  # cut signal below  5000Hz #works for i HIT
    # cut_f_signal[(np.abs(Fourier_freq)<1850)] =0   # cut below 1850hz #works for o Sock
    # cut_f_signal[(np.abs(Fourier_freq)<2400)] =0 #Cut below 2400hz #works for ae Back
    return cut_f_signal


inverse = np.fft.irfft(Vowels())
NewAudio = write("o.wav", np.int0(sr), inverse.astype('float32'))
