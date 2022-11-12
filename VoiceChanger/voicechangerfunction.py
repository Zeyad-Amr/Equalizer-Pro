import numpy as np 
import librosa
import librosa.display
Voice_samplerate = librosa.get_samplerate('Female2.wav') #get samplerate of the wav file
y, sr = librosa.load('Female2.wav',sr = Voice_samplerate)
def VoiceChanger(): #voice change function
    change= librosa.effects.pitch_shift(y,sr,n_steps=-8) # n_steps is the value to be taken from slider
    change = change.astype('float32')
    return change
NewAudio  =  write("wee.wav",np.int0(sr), VoiceChanger()) 
