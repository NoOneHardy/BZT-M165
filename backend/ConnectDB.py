import couchdb


class ConnectDB():
    def __init__(self):
        # Replace 'username' and 'password' with your CouchDB credentials
        username = 'admin'
        password = 'admin'
        
        # Connect to CouchDB server (replace 'localhost' and '5984' with your server details)
        self.server = couchdb.Server('http://localhost:5984')
        self.server.resource.credentials = (username, password)

    def getObjects(self,id=None):
        db = self.server['demo']

        Objects = []

        for doc_id in db:
            if(id==None):
                Objects.append(db[doc_id])
            elif(id==doc_id):
                Objects.append(db[doc_id])
        
        return Objects
    
    def createObject(self,data):
        db = self.server['demo']

        id,rev = db.save(data)
        return db.get(id)
    

    def updateObject(self,id,data):
        db = self.server['demo']

        doc = db.get(id)

        db.delete(doc)

        data["_id"] = id

        db.save(data)

        return db.get(id)

    def textQueryObject(self,queryText):
        db = self.server['demo']

        searchWords = queryText.split(" ")

        querriedDocuments = []
        
        for word in searchWords:
            documents = db.find({
               "selector": {
                  "name": {
                     "$regex": "(?i).*" + word + ".*"
                  }
               }
            })
            for document in documents:
                if (document not in querriedDocuments) and (document != None):
                    querriedDocuments.append(document)

        return querriedDocuments


    def deleteObject(self,id):
        db = self.server['demo']
        doc = db.get(id)
        db.delete(doc)
        return doc

        

con = ConnectDB()

con.getObjects()