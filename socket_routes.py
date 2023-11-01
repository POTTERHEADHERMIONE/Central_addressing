from flask_socketio import SocketIO
from app_routes import app
sio = SocketIO(app)

@sio.on('message')
def message(data):
    print("Hello world")
    sio.emit('response','Message recieved : '+data)
