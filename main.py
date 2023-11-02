import socket
from app_routes import app
import threading 

# Define the server's IP address and port
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("0.0.0.0", 1234))
server.listen(5)

def handle_client(client_socket):
    while True:
        data = client_socket.recv(1024)
        if not data:
            break
        # Handle the received data as needed
        print(f"Received data from client: {data.decode()}")
        client_socket.send("This is a test message from Server".encode())
        # You can perform any processing here

    client_socket.close()

def socket_server():
    while True:
        client, addr = server.accept()
        client_handler = threading.Thread(target=handle_client, args=(client,))
        client_handler.start()

def main():
    
    socket_server_thread = threading.Thread(target=socket_server)
    socket_server_thread.start()
    app.run(debug=True, threaded=True)

if __name__ == '__main__':
    main()

