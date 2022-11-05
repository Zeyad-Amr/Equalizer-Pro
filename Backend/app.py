from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

import librosa

app = Flask(__name__)
api = Api(app)
CORS(app)


class equalizer(Resource):  # header
    def get(self):  # operation
        return 'Task 2 equalizer hehe'  # body

    def post(self):
        print(type(request.files))

        if "file" not in request.files:
            return {"there is an error": 'err'}, 200

        file = request.files["file"]

        y, sr = librosa.load(file)

        print("i print this: ")
        print(f'y: {y[:10]}')
        print(f'shape y: {y.shape}')
        print(f'sr: {sr}')

        return {'this is the f*ckin file': y.tolist()}, 200


api.add_resource(equalizer, '/api/upload')

if __name__ == '__main__':
    app.run(debug=True)
