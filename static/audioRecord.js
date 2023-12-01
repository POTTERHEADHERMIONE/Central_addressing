let mediaRecorder;
let audioChunks = [];
let recordingStartTime;
let measureTime = 1;

async function startRecording() {
    try {
        measureTime = 1;
        recordingStartTime = Date.now();
        document.getElementById('timer').innerText = `Recording Time: 0:00`;

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
            audioChunks = [];
            document.getElementById('audioPlayer').src = audioUrl;
        };

        animateTimer();
        mediaRecorder.start();
        document.getElementById('startRecording').disabled = true;
        document.getElementById('stopRecording').disabled = false;
    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
}

function stopRecording() {
    if (mediaRecorder.state === 'recording') {
        measureTime = 0;
        mediaRecorder.stop();
        document.getElementById('startRecording').disabled = false;
        document.getElementById('stopRecording').disabled = true;
    }
}

function animateTimer() {
    updateTimer();
    requestAnimationFrame(animateTimer);
}

function updateTimer() {
    if (measureTime){
        const elapsedTime = Math.floor((Date.now() - recordingStartTime) / 1000);
        document.getElementById('timer').innerText = `Recording Time: ${formatTime(elapsedTime)}`;
    }
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${padZero(minutes)}:${padZero(remainingSeconds)}`;
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}

function sendAudio(roomNumber){
    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

    // Send data to the server using FormData
    const formData = new FormData();
    formData.append('room', roomNumber);
    formData.append('sub',sub);

    formData.append('audioData', audioBlob, 'audio.wav');

    fetch('/sendAudio', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        console.log('Data submitted successfully', data);
        // Show success message
        // document.getElementById('successMessage').innerText = 'Data sent successfully!';
        // document.getElementById('successMessage').style.display = 'block';
    })
    .catch(error => {
        console.error('Error submitting data', error);
        // Handle errors
    });
}
