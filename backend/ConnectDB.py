import couchdb


class ConnectDB():
    def __init__(self):
        # Replace 'username' and 'password' with your CouchDB credentials
        username = 'admin'
        password = 'admin'
        
        # Connect to CouchDB server (replace 'localhost' and '5984' with your server details)
        self.server = couchdb.Server('http://localhost:5984')
        self.server.resource.credentials = (username, password)
        if ("m165db" in self.server):
            self.db = self.server['m165db']
        else:
            self.db = self.server.create("m165db")


    def getObjects(self,id=None):

        Objects = []

        for doc_id in self.db:
            if(id==None):
                Objects.append(self.db[doc_id])
            elif(id==doc_id):
                Objects.append(self.db[doc_id])
        
        return Objects
    
    def createObject(self,data):
        if(type(data['price']) in [int,float]):
            id,rev = self.db.save(data)
            return self.db.get(id)
        else:
            return {"Error":"Not a Number"}
    

    def updateObject(self,id,data):
        doc = self.db.get(id)

        if(type(data['price']) in [int,float]):
            self.db.delete(doc)
            data["_id"] = id
            self.db.save(data)
            return self.db.get(id)
        else:
            return {"Error":"Not a Number"}

    def textQueryObject(self,queryText):
        searchWords = queryText.split(" ")

        querriedDocuments = []
        
        for word in searchWords:
            documents = self.db.find({  
                "selector": {
                    "$or": [
                        {
                            "name": {
                                "$regex": "(?i).*" + word + ".*"
                            },
                        },
                        {
                            "category": {
                                "$regex": "(?i).*" + word + ".*"
                            }
                        }
                    ]
                }
            })
            for document in documents:
                if (document not in querriedDocuments) and (document != None):
                    querriedDocuments.append(document)

        return querriedDocuments


    def deleteObject(self,id):
        doc = self.db.get(id)
        self.db.delete(doc)
        return doc

        

con = ConnectDB()

con.getObjects()