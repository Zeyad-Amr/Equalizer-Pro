import scipy
import matplotlib.pyplot as plt
import numpy as np
import librosa
import librosa.display
from scipy.io.wavfile import write
import matplotlib
matplotlib.use('Agg')


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


def modify_file(file, body):
    signal, sr = load_signal(file)
    f_signal, freq = fourier(signal, sr)
    i_signal = edit_amps(f_signal, freq, body)
    modifiedSignal = fourierInverse(i_signal)
    save(modifiedSignal, sr)


def edit_amps(fourier, frequency, sliders):
    for slider in sliders.values():
        print(slider)
        print(type(slider))
        for range in slider["ranges"]:
            print(range)
            print(type(range))
            if len(range) == 2:
                index = (frequency > range[0])
                if range[1] == 1:
                    fourier[index] = fourier[index] * slider["factor"] * \
                        scipy.signal.triang(len(fourier[index]))
                else:
                    fourier[index] = fourier[index] * slider["factor"]
            else:
                index = (frequency > range[0]) & (frequency < range[1])
                if range[2] == 1:
                    fourier[index] = fourier[index] * slider["factor"] * \
                        scipy.signal.triang(len(fourier[index]))
                else:
                    fourier[index] = fourier[index] * slider["factor"]
    return fourier


# draw spectrogram
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
