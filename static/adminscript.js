const mail = localStorage.getItem("mailID");
const sub = localStorage.getItem("sub");
const isAdmin = localStorage.getItem("isAdmin");
var rooms_sub_dict = ''
var interfaces;
let videoStream;

document.addEventListener("DOMContentLoaded", function () {
    var roomsList = '';
    if (isAdmin == 1){
        roomsList = JSON.parse(localStorage.getItem("rooms")) ;
    }
    else{
        rooms_sub_dict = JSON.parse(localStorage.getItem("subs"));
        roomsList = Object.keys(rooms_sub_dict);
        // console.log(roomsList)
        // console.log(Object.keys(roomsList));
    }
     // Parse the JSON and handle null/undefined
    const roomsListElement = document.getElementById("rooms");
    roomsList.forEach(function(roomNumber){
        var liElement = document.createElement("li");
        liElement.setAttribute('onClick',`showOptions('${roomNumber}', this)`);
        liElement.textContent = roomNumber;
        roomsListElement.appendChild(liElement);
    });   
});

selectedRoomElement = '';
selectedOption = '';

function showOptions(roomNumber, liElement) {
    document.getElementById("interfaces").innerHTML="";
    localStorage.setItem("roomNumber",roomNumber);
    if (selectedRoomElement){
        selectedRoomElement.style.backgroundColor  = 'rgba(0,0,0,0)';
    }
    selectedRoomElement = liElement;
    liElement.style.backgroundColor = "#62e9e2";
    if (isAdmin == 1){
        document.getElementById('course-name').innerText = "Room : " + roomNumber;
    }
    else{
        document.getElementById('course-name').innerText = "Subject : " + roomNumber;
    }
    if (isAdmin == 1){
        var optionsBar = document.getElementById('options-bar');
        optionsBar.style.display = 'block';
        optionsBar.innerHTML = ''; // Clear previous content
        selectedRoom = 'roomNumber'

        // Inject options bar HTML
        var optionsHTML = `
            <button onclick="showSent('${roomNumber}')">SENT</button>
            <button onclick="showAudioOptions('${roomNumber}')">AUDIO</button>
            <button onclick="showVideoOptions('${roomNumber}')">VIDEO</button>
            <button onclick="showTextInput('${roomNumber}')">TEXT</button>
        `;
        optionsBar.innerHTML = optionsHTML;
    }
    showSent(roomNumber);
}

function showTextInput(roomNumber){
        // Inject text input HTML
    var textInputHTML = `
        <div id = "textInputwrapper">
        <textarea id="textInput" name="w3review" rows="4" cols="50"></textarea>
        <button onclick="submitTextData('${roomNumber}')">Submit Text Data</button>
        </div>
    `;
    document.getElementById('interfaces').innerHTML = textInputHTML;   
}

function showAudioOptions(roomNumber){
    var audioControls = `
    <h2 id="timer">Recording Time: 00:00</h2>

    <button id="startRecording" onclick="startRecording()">Start Recording</button>
    <button id="stopRecording" onclick="stopRecording()" disabled>Stop Recording</button>

    <h2>Audio Playback</h2>
    <audio controls id="audioPlayer"></audio>

    <button id="submitData" onclick="sendAudio(${roomNumber})">Submit Data</button>
    `
    document.getElementById('interfaces').innerHTML = audioControls;
}

function showVideoOptions(roomNumber){
    var videoControls = `
    <video id="video" width="640" height="480"  autoplay></video>
    <button onclick="startVideo()">Start Video</button>
    <button onclick="stopVideo()">Stop Video</button>
    `
    document.getElementById('interfaces').innerHTML = videoControls;
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
        // Get the video element
        var video = document.getElementById('video');
        // Set the video stream as the source for the video element
        video.srcObject = stream;
    })
    .catch(function (error) {
        console.error('Error accessing camera: ', error);
    });
}

function startVideo() {
    // Request access to the user's camera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            // Get the video element
            const video = document.getElementById('video');

            // Set the video stream as the source for the video element
            video.srcObject = stream;

            // Save the stream to a variable to stop it later
            videoStream = stream;
        })
        .catch(function (error) {
            console.error('Error accessing camera: ', error);
        });
}

function stopVideo() {
    // Stop the video stream
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
    }

    // Clear the video element source
    const video = document.getElementById('video');
    video.srcObject = null;
}

function submitTextData(roomNumber){
    var textField = document.getElementById("textInput");
    var text = textField.value;
    textField.value = "";
    data = {'sub':sub, 'room':roomNumber, 'text':text}
    fetch("/sendText", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })    
    alert("Text message sent successfully !");    
}



function showSent(roomNumber){
    var data ;
    if (isAdmin == 1){
        data = {
            "room" : roomNumber,
            "sub" : sub
        };
    }
    else {
        data = {
            "room" : rooms_sub_dict[roomNumber],
            "sub" : roomNumber
        }
    }
    fetch("/getMessages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        data = data.response;
        interfaces = document.getElementById("interfaces");
        interfaces.innerHTML = "" ;
        data.forEach(function(message) {
            if (message.type == 'audio'){
                createAudioElement(message);
            }
            else if (message.type == 'video'){
                createVideoElement(message);
            }
            else{
                
                // interfaces.appendChild(createSentElement(createTextElement(message)))
                createTextElement(message);
                // interfaces.appendChild(createTextElement(message));
            }
        });
    });
}

function getTImeString(epochTimeInSeconds){
    // Replace this with your epoch time
// Create a new Date object and pass the epoch time in milliseconds
    const date = new Date(epochTimeInSeconds * 1000);
// Get the individual components of the date
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDateTime = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day} ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    return formattedDateTime;
}

function createSentElement (){
    var sentElement = document.createElement("li");
    return sentElement
}

function createAudioElement (){
    var element = createSentElement();

}

function createVideoElement (){
    // createTextElement("Live streaming session");
}

function createTextElement (message){
    var element = document.createElement("li");
    interfaces = document.getElementById("interfaces");
    element.innerHTML = getTImeString(message['time'])+"<br>"+message.text+"\n";
    interfaces.appendChild(element);
}

