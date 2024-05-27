# Importing flask module in the project is mandatory
# An object of Flask class is our WSGI application.
from flask import Flask, request
import ConnectDB
 
# Flask constructor takes the name of 
# current module (__name__) as argument.
app = Flask(__name__)

con = ConnectDB.ConnectDB()

@app.route('/products', methods=["POST"])
# '/products' URL is bound with createObject() function
def createObject():
    con.createObject(request.get_json())
    return "temp"

@app.route('/products/<id>', methods=["POST"])
# ‘/products/<id>’ URL is bound with editObjectWithId() function
def editObjectWithId(id):
    con.updateObject(id,request.get_json())
    return id

# The route() function of the Flask class is a decorator, 
# which tells the application which URL should call 
# the associated function.
@app.route('/products', methods=["GET"])
# ‘/products’ URL is bound with getObjects() function
def getObjects():
    return con.getObjects()

@app.route('/products/<id>', methods=["GET"])
# '/products/<id>' URL is bound with getObjectOfId() function
def getObjectOfId(id):
    return con.getObjects(id)

@app.route('/search?query=<query>', methods=["GET"])
# /search?query=<query> URL is bound with searchTextOfObjects() function
def searchTextOfObjects(query):
    con.textQueryObject(query)
    return "temp"

 
# main driver function
if __name__ == '__main__':
 
    # run() method of Flask class runs the application 
    # on the local development server.
    app.run(port="12345")
