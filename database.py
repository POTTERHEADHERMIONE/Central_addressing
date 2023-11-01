from pymongo import MongoClient
client = MongoClient('localhost', 27017)

db = client['Cpas']

adminList = db['admin']
studentList = db['student']

def addUser(mailID, password,name,isStudent=1):
    collection = studentList
    if (isStudent == 0):
        collection = adminList
    userExists = collection.find_one({'mailID':mailID})
    if (userExists):
        print("User with the miail id "+mailID+" already exists")
        return 0
    else :
        data = {'mailID':mailID, 'password':password, 'name':name}
        collection.insert_one(data)
        return 1


if __name__ == '__main__':
    adminList.delete_many({})
    studentList.delete_many({})

    
