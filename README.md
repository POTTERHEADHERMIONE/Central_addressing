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

- ssh pi@IP address (open in 2 windows)
- sudo systemctl start mongodb (run in any one)
- cd Central_addressing/ (in both terminals)
- gunicorn -w 4 -b 0.0.0.0:5000 webApp:app (run in one of them)
- python3 socketServer.py (in the other one)

  
