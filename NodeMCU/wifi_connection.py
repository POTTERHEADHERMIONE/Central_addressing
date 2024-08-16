import network
sta_if = network.WLAN(network.STA_IF); sta_if.active(True)               # Scan for available access points
sta_if.connect("Linux_craze", "saakship") # Connect to an AP
sta_if.isconnected()   
