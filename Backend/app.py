from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os.path

import audiotest

AUDIO_FOLDER = '.\\files\samples'
IMG_FOLDER = '.\\files\images'

app = Flask(__name__)
app.config['AUDIO_FOLDER'] = AUDIO_FOLDER
app.config['IMG_FOLDER'] = IMG_FOLDER
CORS(app)


# allowed file extensions
ALLOWED_EXTENSIONS = {'wav', 'mp3'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# Convert values of frequencies as string to array of floats
def map_values(valuesStr):
    valueArr = []
    if valuesStr:
        valuesStrArray = valuesStr.split(",")
        for value in valuesStrArray:
            valueArr.append(float(value))
    return valueArr


# upload audio file to the server
@app.route("/api/upload", methods=['POST'])
def upload_file():
    if "file" not in request.files:
        return {"there is an error": 'err'}, 400

    # print(request.form)
    file = request.files["file"]
    valuesStr = request.form["values"]
    values = map_values(valuesStr)
    if not allowed_file(file.filename):
        return {"err": "File format is not accepted"}, 400

    signalPath = os.path.join(AUDIO_FOLDER, file.filename)
    file.save(signalPath)
    audiotest.modify_file(signalPath, 1, values=values)
    return {"file_url": "http://127.0.0.1:5000/api/file/" + file.filename}, 200


# audio file APIs
@app.route('/api/file/<file_name>', methods=['GET', 'POST'])
def file(file_name):
    signalPath = os.path.join(AUDIO_FOLDER, file_name)
    # get the audio file
    if request.method == 'GET':
        # audiotest.modify_file(signalPath, 1, values=values)
        return send_from_directory(directory=app.config['AUDIO_FOLDER'], path="modified.wav")
    # modify the audio file
    if request.method == 'POST':
        body = request.get_json()
        mode = body["mode"]
        values = body["values"]
        audiotest.modify_file(signalPath, mode, values)
        return {"message": "Values updated"}, 200


# Spectrograms images APIs
@app.route('/api/spectrogram/<img>', methods=['GET'])
def spectrogram(img):
    signalPath = os.path.join(AUDIO_FOLDER, img)
    modifiedSignalPath = os.path.join(AUDIO_FOLDER, 'modified.wav')
    img = img.split('.')[0]
    if request.method == 'GET':
        print(img)
        if(img == 'mod'):
            audiotest.spectrogram(modifiedSignalPath, 'modified')
            return send_from_directory(directory=app.config['IMG_FOLDER'], path='spectro_modified.png')
        else:
            audiotest.spectrogram(signalPath, img)
            return send_from_directory(directory=app.config['IMG_FOLDER'], path='spectro_' + img + '.png')


if __name__ == '__main__':
    app.run(debug=True)
