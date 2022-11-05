import pandas as pd 
import numpy as np 
import matplotlib.pylab as plt
import librosa
import librosa.display
import IPython.display as ipd
from playsound import playsound
from scipy.fft import fft, fftfreq, ifft
from scipy.io.wavfile import write
y,sr = librosa.load('2MG.wav') #reading the audio file
duartion = 1/float(sr) # T_sample 
t_seq = np.arange(0,len(y) / float(sr),duartion) #x_axis
Y_fourier = fft(y) #fourier transform
sig_fft_filtered = Y_fourier.copy() 
cut_off = 33 # cutoff freq , elemenate everything behind it
sig_fft_filtered[t_seq < cut_off] = 0 #filter
filtered = ifft(sig_fft_filtered) #هنا بقي الجزء البايظ :(
data = np.real(filtered) 
hehe =write("example.wav", sr, data.astype(np.int16)) #exporting the filtered data as wav 
plt.plot(t_seq,np.abs(sig_fft_filtered))#plotting in fft
#plt.plot(t_seq , np.abs(Y_fourier)) #whole fft plotting
#plt.plot(t_seq,y) #normal plotting
plt.show()
