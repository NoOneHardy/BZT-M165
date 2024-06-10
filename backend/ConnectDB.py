import couchdb


class ConnectDB():
    def __init__(self):
        # Replace 'username' and 'password' with your CouchDB credentials
        username = 'admin'
        password = 'admin'

        source_db = 'm165db'
        replication_db = 'm165db_replication'
        
        # Connect to CouchDB server (replace 'localhost' and '5984' with your server details)
        self.server = couchdb.Server('http://m165-couchdb:5984')
        self.server.resource.credentials = (username, password)
        if (source_db in self.server):
            self.db = self.server[source_db]
        else:
            self.db = self.server.create(source_db)
        if (replication_db in self.server):
            pass
        else:
            replication_options = {
                'create_target': True,  # Create the target database if it doesn't exist
                'continuous': True      # Enable continuous replication
            }
            self.server.replicate(source_db,replication_db,**replication_options)


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