import numpy as np 
import matplotlib.pylab as plt
import librosa
import librosa.display
from IPython.display import Audio
from scipy.io.wavfile import write
y,sr = librosa.load('Coldplay .wav') #read the audio
duartion = 1/float(sr) 
Yfft = np.fft.fft(y) / len(y) 
Yfft = Yfft[:len(Yfft)//2] 

#t_seq = np.arange(0,len(y) / float(sr),duartion) #x_axis in time domain
#freqs = np.arange(0,len(Yfft) / float(sr),duartion) #x_axis in freq domain

Fact_mode1 = np.array([1,1,0,0,0,0,0,0,0,0]) # هنا بقي المفروض كل اليمنت يعبر عن فاكتر مود1????????
def Slider_Num(n): #get the number of sliders 
    slider = np.array_split(Yfft,n)
    return slider 
def Factor_mode1(n): #Factor for mode1
    get_Slider= Slider_Num(n)
    for i in range(0,n):
        get_Slider[i] = get_Slider[i] * Fact_mode1[i]
    return get_Slider
def Real(n): # inverse fft
    get_factor = Factor_mode1(n)
    oneArray = np.concatenate(get_factor)
    inverse = np.fft.ifft(oneArray)
    real_inverse = (np.real(inverse) * len(y))
    real_inverse_Float = real_inverse.astype('float32')
    return real_inverse_Float
NewAudio  =write("modified.wav",np.int0(sr/2), Real(10) )# to export the new audio as wav file

#Guitar : frequencies for guitar  100Hz - (2000 to 2500) - (6000 to 7,000), nearly the first 3 sliders in the normal mode can control the guitar as each slider in sample.wav control 3Khz.

#Piano : frequency range 27.5 Hz to 4186 Hz , which can be controlled using the first slider.

#Drums :