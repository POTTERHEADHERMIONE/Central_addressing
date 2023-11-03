# boot.py start
#This file is executed on every boot (including wake-boot from deepsleep)
#import esp
#esp.osdebug(None)
import os, machine
#os.dupterm(None, 1) # disable REPL on UART(0)
import gc
#import webrepl
#webrepl.start()
gc.collect()

## Boot.py end

import usocket as socket
import network
import uasyncio as asyncio

wifi_ssid = "IIITS_Student"
wifi_password = "iiit5@2k18"
server_address = ('10.0.9.83', 8948)  # Replace with your server's IP address and port

async def wifi_connect(ssid, password):
    sta_if = network.WLAN(network.STA_IF)
    if not sta_if.isconnected():
        print("Connecting to Wi-Fi...")
        sta_if.active(True)
        sta_if.connect(ssid, password)
        while not sta_if.isconnected():
            await asyncio.sleep(1)
    print("Connected to Wi-Fi")

async def handle_server_connection():
    # Create a socket object for the client
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        # Connect to the server
        client_socket.connect(server_address)
        print("Connected to server")

        while True:
            # Send a message to the server
            client_socket.send("This is a test message from NodeMCU (client)")
            # Receive data from the server
            data = client_socket.recv(1024)
            if not data:
                break  # Connection closed by the server
            print("Received:", data.decode('utf-8'))

            await asyncio.sleep(1)  # Adjust the interval as needed

    except Exception as e:
        print("Error:", e)
    finally:
        client_socket.close()

async def main():
    await wifi_connect(wifi_ssid, wifi_password)
    await handle_server_connection()

loop = asyncio.get_event_loop()
loop.run_until_complete(main())