import numpy as np
import librosa
from scipy.io.wavfile import write

# def Slider_Num(n):  # get the number of sliders
#     slider = np.array_split(Yfft, n)
#     return slider


# def Factor_mode1(n):  # Factor for mode1
#     slider = np.array_split(Yfft, n)
#     get_Slider = slider
#     for i in range(0, n):
#         get_Slider[i] = get_Slider[i] / Fact_mode1[i]
#     return get_Slider

# هنا بقي المفروض كل اليمنت يعبر عن فاكتر مود1????????
Fact_mode1 = np.array([2, 2, 2, 1, 1, 1, 1, 1, 1, -1])


def Real(n, yfft, y):  # inverse fft

    slider = np.array_split(yfft, n)

    get_factor = slider
    for i in range(0, n):
        get_factor[i] = get_factor[i] / Fact_mode1[i]

    oneArray = np.concatenate(get_factor)
    inverse = np.fft.ifft(oneArray)
    real_inverse = (np.real(inverse)*len(y))
    real_inverse_Float = real_inverse.astype('float32')
    return real_inverse_Float


# to export the new audio as wav file
def modify_file(file):
    y, sr = librosa.load(file)  # read the audio
    duartion = 1/float(sr)
    Yfft = np.fft.fft(y) / len(y)
    Yfft = Yfft[:len(Yfft)//2]
    return write("./samples/modified.wav", np.int0(sr/2), Real(10, Yfft, y))
