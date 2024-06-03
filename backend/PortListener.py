# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request
from flask_cors import CORS, cross_origin
import ConnectDB
 
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'

con = ConnectDB.ConnectDB()

@app.route('/products', methods=["POST"])
@cross_origin()
# '/products' URL is bound with createObject() function
def createObject():
    return con.createObject(request.get_json())

@app.route('/products/<id>', methods=["POST"])
@cross_origin()
# ‘/products/<id>’ URL is bound with editObjectWithId() function
def editObjectWithId(id):
    return con.updateObject(id,request.get_json())

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/products', methods=["GET"])
@cross_origin()
# ‘/products’ URL is bound with getObjects() function
def getObjects():
    return con.getObjects()

@app.route('/products/<id>', methods=["GET"])
@cross_origin()
# '/products/<id>' URL is bound with getObjectOfId() function
def getObjectOfId(id):
    return con.getObjects(id)[0]

@app.route('/search/<query>', methods=["GET"])
@cross_origin()
# /search?query=<query> URL is bound with searchTextOfObjects() function
def searchTextOfObjects(query):
    return con.textQueryObject(query)

@app.route('/products/<id>', methods=["DELETE"])
@cross_origin()
def deleteObjectWithId(id):
    return con.deleteObject(id)
    
 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(port="12345")
