from pymongo import MongoClient
client = MongoClient('localhost', 27017)
from json import dumps

db = client['Cpas']

adminList = db['admin']
studentList = db['student']

def addUser(mailID, password,name,content,isStudent=1):
    collection = studentList
    if (isStudent == 0):
        collection = adminList
    userExists = collection.find_one({'mailID':mailID})
    if (userExists):
        print("User with the miail id "+mailID+" already exists")
        return 0
    else :
        data = {'mailID':mailID, 'password':password, 'name':name}
        if (isStudent):
            data['subs_rooms'] = content
        else :
            data['sub'] = content['sub'] 
            data['rooms'] = content['rooms']
        collection.insert_one(data)
        return 1

def addMessage(sub, data, room):
    collection = db[sub+"_"+room]
    collection.insert_one(data)

def get_messages(sub, room):
    sorted_documents = list(db[sub+"_"+room].find().sort("time",-1))
    for a in sorted_documents :
        a.pop('_id')
    # print(sorted_documents)
    # print(sorted_documents)
    return {"response":sorted_documents}
    
# if __name__ == '__main__':
#     adminList.delete_many({})
#     studentList.delete_many({})

if __name__ == '__main__' :
    collections = db.list_collection_names()
    for collection in collections :
        db[collection].drop()

    
