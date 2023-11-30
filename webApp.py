from flask import Flask, render_template, request, jsonify
from database import adminList, studentList
from os.path import exists as folder_exists
from os import makedirs
# from 

app = Flask(__name__)
av_folder = "av_folder"

@app.route("/video")
def saveVideo():
    pass

@app.route("/audio")
def saveAudio():
    pass

@app.route("/")
def loginPage():
    return render_template("login.html")

@app.route("/student")
def studentPage():
    return render_template("student.html")

@app.route("/admin")
def adminPage():
    return render_template("admin.html")

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    print(data)
    isAdmin = data["isAdmin"]
    mailID = data["mailID"]
    password = data["password"]
    collection = ""
    if (isAdmin):
        collection = adminList
    else :
        collection = studentList
    user = collection.find_one({"mailID" : mailID})
    response = {}
    if (user):
        if (password == user["password"]):
            response = {"status":"success"}
            if (isAdmin) :
                response['rooms'] = ['123','124','125']
            else :
                response['subs'] = ["RANAC","OOP","CNA","CS","ES"]
        else :
            response = {"status":"Invalid Password"}
    else :
        response = {"status":"User doesn't exist"}
    print(response)
    return jsonify(response)


if __name__ == "__main__":
    if (folder_exists(av_folder) == False) : makedirs(av_folder)
    app.run(debug=True)
