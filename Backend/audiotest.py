import numpy as np
import librosa
import librosa.display
from scipy.io.wavfile import write
import matplotlib.pyplot as plt


def load_signal(path):
    Voice_samplerate = librosa.get_samplerate(path)
    signal, sr = librosa.load(path, sr=Voice_samplerate)
    return signal, sr


def fourier(audio, sampleRate):
    originalAmp = np.fft.rfft(audio)
    originalFreq = np.fft.rfftfreq(len(audio), 1/sampleRate)
    return originalAmp, originalFreq


def fourierInverse(signal):
    inversed = np.fft.irfft(signal)
    return inversed


def save(signal, sr):
    inverseFloat = signal.astype('float32')
    # to export the new audio as wav file
    write("./files/samples/modified.wav", np.int0(sr), inverseFloat)


def dropFrequency(frequencies, magnitude, maxFreq, minFreq):
    index = (frequencies > minFreq) & (frequencies < maxFreq)
    magnitude[index] = magnitude[index]*0
    return magnitude


def Real(n, yfft, y, Fact_mode1):  # inverse fft
    slider = np.array_split(yfft, n)

    get_factor = slider
    for i in range(0, n):
        get_factor[i] = get_factor[i] * Fact_mode1[i]

    oneArray = np.concatenate(get_factor)
    inverse = np.fft.irfft(oneArray)
    real_inverse = (np.real(inverse)*len(y))
    real_inverse_Float = real_inverse.astype('float32')
    return real_inverse_Float


def remove_veowels(f_signal, freq, vowel):
    def choise_vowel(argument):
        print(argument)
        switcher = {
            'a': 2400,  # Cut below 2400hz #works for ae Back,
            'u': 2000,  # cut signal below 2000Hz #works for u COOK
            'i': 5000,  # cut signal below  5000Hz #works for i HIT
            'o': 1850,  # cut below 1850hz #works for o Sock
        }
        return switcher.get(argument, -1)
    print(type(f_signal))
    print(type(freq))
    f_signal[(np.abs(freq) < choise_vowel(vowel))] = 0
    print(len(f_signal[(np.abs(freq) < choise_vowel(vowel))]))
    return f_signal


def modify_file(file, mode, values=[]):
    signal, sr = load_signal(file)
    f_signal, freq = fourier(signal, sr)

    if(mode == 1):
        i_signal = Real(len(values), f_signal, signal, values)
    elif(mode == 2):
        i_signal = remove_veowels(f_signal, freq, values[0])

    modifiedSignal = fourierInverse(i_signal)
    save(modifiedSignal, sr)


def spectrogram(signal, name=''):
    signal, sr = load_signal(signal)
    f_signal = librosa.stft(signal)
    signal_db = librosa.amplitude_to_db(np.abs(f_signal), ref=np.max)
    # Plot the transformed audio data
    fig, ax = plt.subplots(figsize=(10, 5))
    img = librosa.display.specshow(signal_db,
                                   x_axis='time',
                                   y_axis='log',
                                   ax=ax)
    fig.colorbar(img, ax=ax, format=f'%0.2f')
    plt.savefig('./files/images/spectro_' + name+'.png')
