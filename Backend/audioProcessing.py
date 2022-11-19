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


def edit_amps(fourier, frequency, ranges, factor, triang=False):
    for range in ranges:
        if len(range) == 1:
            index = (frequency > range[0])
        else:
            index = (frequency > range[0]) & (frequency < range[1])
        if triang:
            fourier[index] = fourier[index] * factor * \
                scipy.signal.triang(len(fourier[index]))
        else:
            fourier[index] = fourier[index] * factor


# Frequency mode
def change_freqs(n, f_signal, factors):  # inverse fft
    signalChunks = np.array_split(f_signal, n)
    for i in range(0, n):
        signalChunks[i] = signalChunks[i] * factors[i]
    fullSignal = np.concatenate(signalChunks)
    return fullSignal


def modify_file(file, mode, values=[]):
    signal, sr = load_signal(file)
    f_signal, freq = fourier(signal, sr)

    if(mode == 0):
        i_signal = change_freqs(len(values), f_signal, values)
    elif(mode == 1):
        i_signal = remove_vowels(f_signal, freq, values)
    elif(mode == 2):
        i_signal, _ = change_musical_instruments(freq, f_signal, values)
    elif(mode == 3):
        i_signal, _ = Animal(freq, f_signal, values)

    modifiedSignal = fourierInverse(i_signal)
    save(modifiedSignal, sr)


# vowels mode
def remove_vowels(f_signal, freq, vowel):
    ranges = [2400, 2000, 5000, 1850]

    for i in range(0, len(vowel)):
        f_signal[(np.abs(freq) < ranges[i])] *= vowel[i]

    return f_signal


# musical instruments mode
def change_musical_instruments(frequency, fourier, values=[]):

    # Drum ranges
    drumRanges = [[10, 500], [500, 200]]
    edit_amps(fourier, frequency, drumRanges, values[0], triang=True)

    # Trumpet ranges
    trumpetRanges = [[0.5, 100], [730, 750], [1465, 1550], [2200, 2225], [
        2920, 3000], [3695, 3705], [4410, 4470], [7390, 7410]]
    edit_amps(fourier, frequency, trumpetRanges, values[1])
    edit_amps(fourier, frequency, [[6500]], values[1], triang=True)

    # Xylophone ranges
    XylophoneRanges = [[0.5, 40], [700, 1100], [850, 950],
                       [3300, 3350], [4000, 6000], [6000]]
    edit_amps(fourier, frequency, XylophoneRanges, values[2])
    XylophoneTriangRanges = [[3710, 4000]]
    edit_amps(fourier, frequency, XylophoneTriangRanges,
              values[2], triang=True)

    return fourier, frequency


def Animal(frequency, fourier, values=[]):
    BirdRanges = [[3000, 70000]]
    edit_amps(fourier, frequency, BirdRanges, values[0])

    DogRanges = [[100, 3000]]
    edit_amps(fourier, frequency, DogRanges, values[1])
    return fourier, frequency


def spectrogram(signal, name=''):
    signal, sr = load_signal(signal)
    f_signal = librosa.stft(signal)
    signal_db = librosa.amplitude_to_db(np.abs(f_signal), ref=np.max)
    # Plot the transformed audio data
    fig, ax = plt.subplots(figsize=(10, 5))
    img = librosa.display.specshow(signal_db,
                                   sr=sr,
                                   x_axis='time',
                                   y_axis='log',
                                   ax=ax)
    ax.set_title(name)
    # fig.colorbar(img, ax=ax, format=f'%0.2f')
    plt.savefig('./files/images/spectro_' + name+'.png')
