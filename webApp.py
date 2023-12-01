from flask import Flask, render_template, request, jsonify
from database import adminList, studentList, addMessage, get_messages
from os.path import exists as folder_exists
from os import makedirs
from time import time, strftime, localtime

app = Flask(__name__)
av_folder = "av_folder"


@app.route("/")
def loginPage():
    return render_template("login.html")

@app.route("/student")
def studentPage():
    return render_template("admin.html")

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
                response['rooms'] = user['rooms']
                response['sub'] = user['sub']
            else :
                response['subs'] = user['subs_rooms']
                # response['subs'] = ["RANAC","OOP","CNA","CS","ES"]
        else :
            response = {"status":"Invalid Password"}
    else :
        response = {"status":"User doesn't exist"}
    print(response)
    return jsonify(response)

@app.route('/sendAudio', methods=['POST'])
def saveAudio():
    sub = request.form['sub']
    room = request.form['room']
    audio_file = request.files.get('audioData')
    temp_path = av_folder+"/"+sub+"/"+room
    if (folder_exists(temp_path) == False):
        makedirs(temp_path)
    
    received_time = time()
    file_name = strftime("%Y-%m-%d_%H%M%S.wav", localtime(received_time))
    with open(temp_path+"/"+file_name, 'wb') as f:
        f.write(audio_file.read())
    addMessage(sub, {"time" : received_time, "file_name" : file_name, "type" : "Audio"}, room)

    return jsonify({"message": "Data received successfully!"})

@app.route('/sendText', methods=['POST'])
def saveText():
    data = request.get_json()
    text = data['text']
    sub = data['sub']
    room = data['room']
    received_time = time()
    print(data)
    addMessage(sub,{"time" : received_time, "text":text},room)
    return jsonify({'status' : 'success'})

# @app.route('/getAudio', methods=['POST'])
# def sendAudio():
#     data = request.get_json()
#     file_name = data['fileName']

@app.route('/getMessages', methods=['POST'])
def sendMessages():
    data = request.get_json()
    room = data['room']
    sub = data['sub']
    response = get_messages(sub,room)
    print(response)
    return jsonify(response)

if __name__ == "__main__":
    if (folder_exists(av_folder) == False) : makedirs(av_folder)
    app.run(debug=True)
