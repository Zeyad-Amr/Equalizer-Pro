from flask import Flask, request, send_from_directory
from flask_cors import CORS
import os.path

from numpy import double

import audiotest

FILE_FOLDER = '.\samples'


app = Flask(__name__)
app.config['FILE_FOLDER'] = FILE_FOLDER
CORS(app)

ALLOWED_EXTENSIONS = {'wav', 'mp3'}


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


# values = []


def map_values(valurArr, valuesStr):
    if valuesStr:
        valuesStrArray = valuesStr.split(",")
        for value in valuesStrArray:
            valurArr.append(float(value))


@app.route("/api/upload", methods=['POST'])
def upload_file():
    if "file" not in request.files:
        return {"there is an error": 'err'}, 400

    # print(request.form)
    file = request.files["file"]
    values = []
    valuesStr = request.form["values"]
    map_values(values, valuesStr)

    if not allowed_file(file.filename):
        return {"err": "File format is not accepted"}, 400

    completeName = os.path.join(FILE_FOLDER, file.filename)
    file.save(completeName)

    audiotest.modify_file(completeName, values)
    return {"file_url": "http://127.0.0.1:5000/api/file/" + file.filename}, 200


@app.route('/api/file/<file_name>', methods=['GET', 'POST'])
def file(file_name):
    completeName = os.path.join(FILE_FOLDER, file_name)
    if request.method == 'GET':
        return send_from_directory(directory=app.config['FILE_FOLDER'], path="modified.wav")
    if request.method == 'POST':
        values = []
        valuesStr = request.form["values"]
        map_values(values, valuesStr)
        audiotest.modify_file(completeName, values)
        return {"message": "Values updated"}, 200


if __name__ == '__main__':
    app.run(debug=True)
