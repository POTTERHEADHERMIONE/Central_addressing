const classroomButtons = document.querySelectorAll('.button-one button, .button-two button');
const mediaOptions = document.getElementById('media-options');
const classroomText = document.querySelector('.button-selected');
const classroomTitle = document.querySelector('h2'); 
const mediaForm = document.getElementById('media-form');
const mediaTypeSelect = document.getElementById('media-type');
const selectedMedia = document.getElementById('selected-media');

// Function to show the media options and log the selected classroom number
function showMediaOptions(classroomNumber) {
    mediaOptions.style.display = 'block';
    classroomText.textContent = `Selected Room: ${classroomNumber}`; // Update the selected room text
    logSelectedClassroom(classroomNumber); // Log the selected classroom number
}

// Function to log the selected classroom number
function logSelectedClassroom(classroomNumber) {
    console.log(`Selected Classroom: ${classroomNumber}`);
}

// Function to handle media form submission
mediaForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting
    const selectedMediaType = mediaTypeSelect.value;
    selectedMedia.textContent = `Selected Media: ${selectedMediaType}`;
    selectedMedia.style.color="#62e9e2 ";
    selectedMedia.style.fontSize="medium";
    
});

// Add click event listeners to the classroom buttons
classroomButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const classroomNumber = button.textContent;
        showMediaOptions(classroomNumber);
    });
});


// new code added
let selectedRooms = [];

    function showOptions(roomNumber) {
        document.getElementById('course-name').innerText = "Room: " + roomNumber;
        var optionsBar = document.getElementById('options-bar');
        optionsBar.style.display = 'block';
        optionsBar.innerHTML = ''; // Clear previous content

        // Inject options bar HTML
        var optionsHTML = `
            <button onclick="showAudioOptions('${roomNumber}')">AUDIO</button>
            <button onclick="showVideoOptions('${roomNumber}')">VIDEO</button>
            <button onclick="showTextInput('${roomNumber}')">TEXT</button>
        `;
        optionsBar.innerHTML = optionsHTML;

        // Add the selected room to the array
        selectedRooms.push(roomNumber);
    }

    function showAudioOptions(roomNumber) {
        // Inject audio recording HTML and JavaScript
        var audioRecordingHTML = `
            <h2>Audio Recording</h2>
            <button id="startRecording">Start Recording</button>
            <button id="stopRecording" disabled>Stop Recording</button>
            <h2>Audio Playback</h2>
            <audio controls id="audioPlayer"></audio>
            <button id="submitData">Submit Data</button>
            <div id="successMessage" style="color: green;"></div>
        `;

        document.getElementById('options-bar').innerHTML += audioRecordingHTML;

        // Inject audio recording JavaScript
        var audioRecordingScript = document.createElement('script');
        audioRecordingScript.innerHTML = `
            let mediaRecorder;
            let audioChunks = [];

            async function startRecording() {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    mediaRecorder = new MediaRecorder(stream);

                    mediaRecorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            audioChunks.push(event.data);
                        }
                    };

                    mediaRecorder.onstop = () => {
                        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                        const audioUrl = URL.createObjectURL(audioBlob);
                        document.getElementById('audioPlayer').src = audioUrl;
                    };

                    mediaRecorder.start();
                    document.getElementById('startRecording').disabled = true;
                    document.getElementById('stopRecording').disabled = false;
                } catch (error) {
                    console.error('Error accessing microphone:', error);
                }
            }

            function stopRecording() {
                if (mediaRecorder.state === 'recording') {
                    mediaRecorder.stop();
                    document.getElementById('startRecording').disabled = false;
                    document.getElementById('stopRecording').disabled = true;
                }
            }

            function submitData() {
                const textData = document.getElementById('textData').value;
                const serverUrl = 'http://127.0.0.1:5000/admin/send_data';

                if (audioChunks.length === 0) {
                    console.error('No audio recorded.');
                    return;
                }

                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

                // Send data to the server using FormData
                const formData = new FormData();
                formData.append('textData', textData);
                formData.append('audioData', audioBlob, 'audio.wav');

                fetch(serverUrl, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Data submitted successfully', data);
                    // Show success message
                    document.getElementById('successMessage').innerText = 'Data sent successfully!';
                    document.getElementById('successMessage').style.display = 'block';
                })
                .catch(error => {
                    console.error('Error submitting data', error);
                    // Handle errors
                });
            }

            document.getElementById('startRecording').addEventListener('click', startRecording);
            document.getElementById('stopRecording').addEventListener('click', stopRecording);
            document.getElementById('submitData').addEventListener('click', submitData);
        `;

        document.getElementById('options-bar').appendChild(audioRecordingScript);
    }
   


    function showVideoOptions(roomNumber) {
    // Inject video recording HTML and JavaScript
    var videoRecordingHTML = `
        <h2>Video Recording</h2>
        <button id="startVideoRecording">Start Video Recording</button>
        <button id="stopVideoRecording" disabled>Stop Video Recording</button>
        <video id="videoPlayer" controls></video>
        <button id="submitVideoData">Submit Video Data</button>
        <div id="videoSuccessMessage" style="color: green;"></div>
    `;

    document.getElementById('options-bar').innerHTML += videoRecordingHTML;

    // Inject video recording JavaScript
    var videoRecordingScript = document.createElement('script');
    videoRecordingScript.innerHTML = `
        let videoMediaRecorder;
        let videoChunks = [];
        let isRecording = false;

        async function startVideoRecording() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
                videoMediaRecorder = new MediaRecorder(stream);

                // Display the live camera feed
                const videoPlayer = document.getElementById('videoPlayer');
                videoPlayer.srcObject = stream;

                videoMediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        videoChunks.push(event.data);
                    }
                };

                videoMediaRecorder.onstop = () => {
                    const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
                    const videoUrl = URL.createObjectURL(videoBlob);
                    videoPlayer.src = videoUrl;

                    // Stop the live camera feed
                    videoPlayer.srcObject.getTracks().forEach(track => track.stop());
                };

                videoMediaRecorder.start();
                isRecording = true;
                document.getElementById('startVideoRecording').disabled = true;
                document.getElementById('stopVideoRecording').disabled = false;
            } catch (error) {
                console.error('Error accessing front camera:', error);
            }
        }

        function stopVideoRecording() {
            if (videoMediaRecorder && videoMediaRecorder.state === 'recording') {
                videoMediaRecorder.stop();
                isRecording = false;
                document.getElementById('startVideoRecording').disabled = false;
                document.getElementById('stopVideoRecording').disabled = true;
            }
        }

        function submitVideoData() {
            const videoData = document.getElementById('videoData').value;
            const serverUrl = 'http://127.0.0.1:5000/admin/send_video_data';

            if (videoChunks.length === 0) {
                console.error('No video recorded.');
                return;
            }

            const videoBlob = new Blob(videoChunks, { type: 'video/webm' });

            // Send video data to the server using FormData
            const formData = new FormData();
            formData.append('videoData', videoBlob, 'video.webm');

            fetch(serverUrl, {
                method: 'POST',
                body: formData,
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Video data submitted successfully', data);
                    // Show success message
                    document.getElementById('videoSuccessMessage').innerText = 'Video data sent successfully!';
                    document.getElementById('videoSuccessMessage').style.display = 'block';
                })
                .catch(error => {
                    console.error('Error submitting video data', error);
                    // Handle errors
                });
        }

        document.getElementById('startVideoRecording').addEventListener('click', startVideoRecording);
        document.getElementById('stopVideoRecording').addEventListener('click', stopVideoRecording);
        document.getElementById('submitVideoData').addEventListener('click', submitVideoData);
    `;

    document.getElementById('options-bar').appendChild(videoRecordingScript);
}




    function showTextInput(roomNumber) {
        // Inject text input HTML
        var textInputHTML = `
            <input type="text" id="textInput" class="text-input" placeholder="Enter text information">
            <button onclick="submitTextData('${roomNumber}')">Submit Text Data</button>
            <div id="textSuccessMessage" style="color: green;"></div>
        `;

        document.getElementById('options-bar').innerHTML += textInputHTML;
    }

    function submitTextData(roomNumber) {
        const textData = document.getElementById('textInput').value;
        const serverUrl = 'http://127.0.0.1:5000/admin/send_text_data';

        // Create FormData and append text data, room number, and selected rooms
        const formData = new FormData();
        formData.append('textData', textData);
        formData.append('roomNumber', roomNumber);
        formData.append('selectedRooms', JSON.stringify(selectedRooms));

        // Send data to the server using FormData
        fetch(serverUrl, {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            console.log('Text data submitted successfully', data);
            // Show success message
            document.getElementById('textSuccessMessage').innerText = 'Text data sent successfully!';
            document.getElementById('textSuccessMessage').style.display = 'block';
        })
        .catch(error => {
            console.error('Error submitting text data', error);
            // Handle errors
        });
    }

    function selectOption(option) {
        alert("Selected Option: " + option);
        
    }
