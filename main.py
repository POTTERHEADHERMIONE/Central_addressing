import socket_routes
import app_routes

if __name__ == "__main__":
    socket_routes.sio.run(app_routes.app, debug=True)