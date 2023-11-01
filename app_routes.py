from flask import Flask, render_template, request, jsonify
from database import adminList, studentList

app = Flask(__name__)

@app.route("/")
def loginPage():
    return render_template("login.html")

@app.route("/student")
def studentPage():
    print("we reached")
    return render_template("student.html")

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
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
            response = {"status":"success","subs":["RANAC","OOP","CNA","CS","ES"]}
        else :
            response = {"status":"Invalid Password"}
    else :
        response = {"status":"User doesn\"t exist"}
    print(response)
    return jsonify(response)


# if __name__ == "__main__":
#     app.run(debug=True)
