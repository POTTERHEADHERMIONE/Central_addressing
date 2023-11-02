import network
sta_if = network.WLAN(network.STA_IF); sta_if.active(True)               # Scan for available access points
sta_if.connect("IIITS_Student", "iiit5@2k18") # Connect to an AP
sta_if.isconnected()   