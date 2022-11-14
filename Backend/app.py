from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os.path

from numpy import double

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


def map_values(valueArr, valuesStr):
    if valuesStr:
        valuesStrArray = valuesStr.split(",")
        for value in valuesStrArray:
            valueArr.append(float(value))


# upload audio file to the server
@app.route("/api/upload", methods=['POST'])
def upload_file():
    if "file" not in request.files:
        return {"there is an error": 'err'}, 400

    # print(request.form)
    file = request.files["file"]
    values = []
    # values = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    valuesStr = request.form["values"]
    map_values(values, valuesStr)

    if not allowed_file(file.filename):
        return {"err": "File format is not accepted"}, 400

    completeName = os.path.join(AUDIO_FOLDER, file.filename)
    file.save(completeName)

    audiotest.modify_file(completeName, values)
    return {"file_url": "http://127.0.0.1:5000/api/file/" + file.filename}, 200


# audio file APIs
@app.route('/api/file/<file_name>', methods=['GET', 'POST'])
def file(file_name):
    completeName = os.path.join(AUDIO_FOLDER, file_name)
    # get the audio file
    if request.method == 'GET':
        return send_from_directory(directory=app.config['AUDIO_FOLDER'], path="modified.wav")
    # modify the audio file
    if request.method == 'POST':
        values = []
        valuesStr = request.form["values"]
        map_values(values, valuesStr)
        audiotest.modify_file(completeName, values)
        return {"message": "Values updated"}, 200


# Spectrograms images APIs
@app.route('/api/spectrogram/<img>', methods=['GET', 'POST'])
def spectrogram(img):
    completeName = os.path.join(IMG_FOLDER, img)
    # get the audio file
    if request.method == 'GET':
        return send_from_directory(directory=app.config['IMG_FOLDER'], path=img)
    # # modify the audio file
    # if request.method == 'POST':
    #     values = []
    #     valuesStr = request.form["values"]
    #     map_values(values, valuesStr)
    #     audiotest.modify_file(completeName, values)
    #     return {"message": "Values updated"}, 200


if __name__ == '__main__':
    app.run(debug=True)
