from flask import Flask, send_from_directory, make_response, send_file, render_template
import os

app = Flask(__name__)

# Set the path to your audio files directory
audio_directory = os.path.join(os.getcwd(), 'av_folder')
app.config['DOWNLOAD_FOLDER'] = '/static'

@app.route('/')
def main():
    return render_template('admin.html')

@app.route("/audio", methods=["POST"])
def getFile():
    # file_to_be_sent = open("static/1.wav", 'rb').read()
    name = "1.wav"
    return send_from_directory(app.config['DOWNLOAD_FOLDER'],name, as_attachment=True)
    return send_file(file_to_be_sent, as_attachment=True, mimetype='audio/wav',download_name="audio_file")

if __name__ == '__main__':
    app.run(debug=True, port=5001)