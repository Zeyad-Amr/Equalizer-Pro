import numpy as np
import librosa
import librosa.display
from scipy.io.wavfile import write
import matplotlib.pyplot as plt
import scipy

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


def change_freqs(n, f_signal, factors):  # inverse fft
    signalChunks = np.array_split(f_signal, n)
    for i in range(0, n):
        signalChunks[i] = signalChunks[i] * factors[i]
    fullSignal = np.concatenate(signalChunks)
    return fullSignal


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
        i_signal = change_freqs(len(values), f_signal, values)
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

def musicalInstruments(frequency, fourier, slider1, slider2, slider3):
    # Drum ranges
    index = (frequency > 10) & (frequency < 500)
    fourier[index] = fourier[index] * slider1 * scipy.signal.triang(len(fourier[index]))

    index = (frequency > 500) & (frequency < 2000)
    fourier[index] = fourier[index] * slider1 * scipy.signal.triang(len(fourier[index]))

    # Trumpet ranges
    index = (frequency > 1465) & (frequency < 1550)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 2200) & (frequency < 2225)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 730) & (frequency < 750)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 2920) & (frequency < 3000)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 3695) & (frequency < 3705)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 0.5) & (frequency < 100)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 7390) & (frequency < 7410)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 4410) & (frequency < 4470)
    fourier[index] = fourier[index] * slider2

    index = (frequency > 6500)
    fourier[index] = slider2 * fourier[index] * scipy.signal.triang(len(fourier[index]))

    # Xylophone ranges
    index = (frequency > 700) & (frequency < 1100)
    fourier[index] = fourier[index] * slider3

    index = (frequency > 850) & (frequency < 950)
    fourier[index] = fourier[index] * slider3

    index = (frequency > 4430) & (frequency < 4480)
    fourier[index] = fourier[index] * slider3

    index = (frequency > 5280) & (frequency < 5300)
    fourier[index] = fourier[index] * slider3

    index = (frequency > 6000)
    fourier[index] = fourier[index] * slider3

    index = (frequency < 6000) & (frequency > 4000)
    fourier[index] = fourier[index] * slider3

    index = (frequency > 3300) & (frequency < 3350)
    fourier[index] = fourier[index] * slider3

    index = (frequency < 40) & (frequency >= 0.5)
    fourier[index] = fourier[index] * slider3

    index = (frequency > 3690) & (frequency < 3690)
    fourier[index] = slider3 * fourier[index] * scipy.signal.triang(len(fourier[index]))

    index = (frequency > 3710) & (frequency < 4000)
    fourier[index] = slider3 * fourier[index] * scipy.signal.triang(len(fourier[index]))

    return fourier, frequency