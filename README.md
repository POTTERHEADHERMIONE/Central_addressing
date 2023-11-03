# Web page

## Student
- Select the course
- Should be able to view the information sent and open the links etc sent 

## Admin 
- Choose the classroom / multiple classrooms to be sent
- Choose the component he has to access
- Send the required information

# Components
- Raspberry pi 3b
- NodeMCU

# Configurations
- Connect the raspberry pi with NodeMCU through wifi
- Connect the nodeMCU to the other devices in the classroom
- Connect the website with the Raspberry pi

# Libraries used
- For NodeMCU - Micropython V22 firmware
  - flashed using esptool, uploaded code using thonny (GUI), ampy (command line)
     - uasyncio
     - network
     - usocket
- For RaspberryPi - Flask app, socket
  
# instructions
- Laptop should be connected to "Saakshi" wifi name
- ssh pi@IP address (open in 2 windows)
- sudo systemctl start mongodb (run in any one)
- cd Central_addressing/ (in both terminals)
- gunicorn -w 4 -b 0.0.0.0:5000 webApp:app (run in one of them)
- open the browser, type the ipaddress:5000 (where ipaddress is the IP address of RPi)
- python3 socketServer.py (in the other one)
- if the ip adress of Rpi is not 192.168.156.23, then do this : 
      Open the socket_nodeMCU.py in NodeMCU folder
      in line 20, change the ip address to Rpi's ip
      Connect NodeMCU to laptop and run this in cmd
      ampy --port /dev/ttyUSB0 put ./NodeMCU/socket_nodeMCU.py ./boot.py
      if it gives error, reset the board
      after it is executed, disconnect and reconnect nodemcu

  
