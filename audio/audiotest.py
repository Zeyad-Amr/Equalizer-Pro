import numpy as np 
import matplotlib.pylab as plt
import librosa
import librosa.display
from IPython.display import Audio
from scipy.io.wavfile import write
wow = librosa.get_samplerate('vio.wav')
y,sr = librosa.load('vio.wav',sr=wow) #read the audio 
duartion = 1/float(sr) 
Yfft = np.fft.fft(y) / len(y) #normalize 
wfft = np.fft.rfft(y) / len(y)
Yfft = Yfft[:len(Yfft)//2]
t_seq = np.arange(0,len(y) / float(sr),duartion) #x_axis in time domain
freqs = np.arange(0,len(wfft) / float(sr),duartion) #x_axis in freq domain
Fact_mode1 = np.array([1,0,0,0,0,0,0,0,0,0]) # هنا بقي المفروض كل اليمنت يعبر عن فاكتر مود1????????
Drums = np.array([0,0,0,0,1,1,1,1,1,1]) #on bands
Piano =np.array([1,1,1,0,0,0,0,0,0,0])
Violin =np.array([0,1,1,1,1,1,1,1,1,1])
Guitar =np.array([1,0,0,0,0,0,0,0,0,0])
mode1 = False
Drums_slider = True
Piano_slider = True
Violin_slider = True
Guitar_slider = True
def Slider_Num(n): #get the number of sliders 
    slider = np.array_split(wfft,n)
    return slider 
def Factor_mode1(n): #Factor for mode1
    get_Slider= Slider_Num(n)
    Drums_Copy = get_Slider.copy()
    Piano_Copy = get_Slider.copy()
    Violin_Copy = get_Slider.copy()
    Guitar_Copy = get_Slider.copy()
    if mode1:
        for i in range(0,n):
            get_Slider[i] = get_Slider[i]*Fact_mode1[i]
    else:
        if Piano_slider:
            for i in range(0,n):
                Piano_Copy[i] = get_Slider[i]*Piano[i] 
        if Drums_slider:
            for i in range(0,n):
                Drums_Copy[i]= get_Slider[i]*Drums[i]
        if Guitar_slider:
            for i in range(0,n):
                Guitar_Copy[i] = get_Slider[i]*Guitar[i] 
        if Violin_slider:
            for i in range(0,n):
                Violin_Copy[i]= get_Slider[i]*Violin[i]
        get_Slider= np.add(Piano_Copy,Drums_Copy)
        get_Slider = np.add(Violin_Copy,Guitar_Copy)
    return get_Slider
def Real(n): # inverse fft
    get_factor = Factor_mode1(n)
    oneArray = np.concatenate(get_factor)
    #inverse = np.fft.ifft(oneArray)
    inverse = np.fft.irfft(oneArray)
    real_inverse = (np.real(inverse)*len(y))
    real_inverse_Float = real_inverse.astype('float32')
    return real_inverse_Float
NewAudio  =  write("woh.wav",np.int0(sr), Real(10)) # to export the new audio as wav file    
