from flask import Flask,request
from flask_restful import Resource , Api
app = Flask(__name__)
api = Api(app)
class equalizer(Resource): #header
    def get(self): #operation
        return 'Task 2 equalizer hehe' #body
    def post(self):
        some_json = request.get_json()
        return {'you sent': some_json},201
api.add_resource(equalizer,'/')
if __name__ == '__main__':
    app.run(debug = True)
