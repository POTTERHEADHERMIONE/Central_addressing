from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # Import CORS from flask_cors

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Placeholder data storage
server_data = {
    "textData": "",
    "audioData": "/file.mp3",  # Provide a default audio file path
}

@app.route('/')
def home():
    return render_template('admin.html')

@app.route('/admin/send_data', methods=['POST'])
def receive_data_from_admin():
    # data = request.get_json()
    data = request.form

    # Update the server data with the received data
    # server_data['textData'] = data.get('textData', "")
    
    # Handle audio file
    audio_file = request.files.get('audioData')


    if audio_file:
        with open('audio_file_received.wav', 'wb') as f:
            f.write(audio_file.read())
    #     server_data['audioData'] = audio_file.read()

    return jsonify({"message": "Data received successfully!"})

@app.route('/student')
def student():
    return render_template('student.html')

@app.route('/student/get_data', methods=['GET'])
def send_data_to_student():
    return jsonify(server_data)

if __name__ == '__main__':
    app.run(debug=True)
