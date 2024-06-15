import couchdb


class ConnectDB():
    def __init__(self):
        # Hier werden der Username und das Passwort der CouchDB angegeben
        username = 'admin'
        password = 'admin'

        # Hier werden die Namen der CouchDB Datenbanken angegeben
        source_db = 'm165db'
        replication_db = 'm165db_replication'

        # Hier wird eine Verbindung zum CouchDB server erstellt
        self.server = couchdb.Server('http://m165-couchdb:5984')
        # Dann werden beim CouchDB die Credentials angegeben
        self.server.resource.credentials = (username, password)
        # _users Datenbank wird erstellt, falls sie noch nicht existiert
        if ('_users' not in self.server):
            self.server.create('_users')
        # _replicator Datenbank wird erstellt, falls sie noch nicht existiert
        if ('_replicator' not in self.server):
            self.server.create('_replicator')
        # _global_changes Datenbank wird erstellt, falls sie noch nicht existiert
        if ('_global_changes' not in self.server):
            self.server.create('_global_changes')
        # Es wird geprüft ob die Datenbank existiert, wenn nicht wird sie erstellt
        if (source_db in self.server):
            self.db = self.server[source_db]
        else:
            self.db = self.server.create(source_db)
        # m165db_replication Datenbank wird erstellt, falls sie noch nicht existiert
        if (replication_db not in self.server):
            # Hier werden die Argumente für die Replikation auf eine Variable geschrieben
            replication_doc = {
                'source': "http://admin:admin@m165-couchdb:5984/" + source_db,
                'target': "http://admin:admin@m165-couchdb:5984/" + replication_db,
                'create_target': True,
                'continuous': True
            }
            self.server['_replicator'].save(replication_doc)


        # Indexes Objekt wird erstellt um indexe zu manipulieren
        index = self.db.index()

        # Es wird geprüft ob der Index schon erstellt wird
        if ("_design/name_category" not in self.db):      
            # Neuer Index wird in die DB eingetragen
            index.__setitem__(
                {"name_category", "name_category_index"},
                ['name', 'category']
            )


    # Mit dieser Funktion werden alle Dokumente der Datenbank geholt, wenn eine ID mitgegeben wird, wird nur das Dokument mit der gleichen ID zurückgegeben
    def getObjects(self,id=None):
        Objects = []
        for doc_id in self.db:
            if((id==None) and ("_design" not in doc_id)):
                Objects.append(self.db[doc_id])
            elif(id==doc_id):
                Objects.append(self.db[doc_id])
        return Objects
    
    # Mit dieser Funktion kann ein Dokument in der Datenbank erstellt werden
    def createObject(self,data):
        # Hier wird der Datentyp vom Preis noch validiert
        if(type(data['price']) in [int,float]):
            id,rev = self.db.save(data)
            return self.db.get(id)
        else:
            # Dies ist die Fehlermeldung, wenn beim Preis keine Zahl angegeben wurde
            return {"Error":"Not a Number"}
    
    # Mit dieser Funktion kann ein Dokument in der Datenbank verändert werden
    def updateObject(self,id,data):
        doc = self.db.get(id)
        # Hier wird der Datentyp vom Preis noch validiert
        if(type(data['price']) in [int,float]):
            # Als erstes wird das Dokument, welches verändert wird gelöscht
            self.db.delete(doc)
            # Beim neuen Dokument wird die ID auf die gleiche ID des gelöschten Dokuments gesetzt
            data["_id"] = id
            # Nun wird das neue Dokument mit den geänderten Daten in der Datenbank erstellt
            self.db.save(data)
            return self.db.get(id)
        else:
            # Dies ist die Fehlermeldung, wenn beim Preis keine Zahl angegeben wurde
            return {"Error":"Not a Number"}

    # Mit dieser Funktion lauft eine Querry über die Attribute "name" und "category" von allen Dokumenten
    # Alle Dokumente welche bei "name" oder "category" ein Wort des Suchtextes enthalten, werden zurückgegeben
    def textQueryObject(self,queryText):
        # Hier wird ein Array von allen Wörtern des Suchtextes erstellt
        searchWords = queryText.split(" ")
        # Dieser Array wird alle Dokumente enthalten, bei denen ein Suchwort gefunden wurde
        querriedDocuments = []
        for word in searchWords:
            # Hier wird nun die Query ausgeführt
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
                # Es wird nun noch geprüft, ob die gefundenen Dokumente schon in dem Array "querriedDocuments" sind, sodass keine Dokumente doppelt vorkommen können
                if (document not in querriedDocuments) and (document != None):
                    querriedDocuments.append(document)

        return querriedDocuments

    # Mit dieser Funktion kann ein Dokument aus der Datenbank gelöscht werden
    def deleteObject(self,id):
        doc = self.db.get(id)
        self.db.delete(doc)
        return doc

        

con = ConnectDB()

con.getObjects()