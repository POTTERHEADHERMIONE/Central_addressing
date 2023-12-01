let mediaRecorder;
let audioChunks = [];
let recordingStartTime;
let measureTime = 1;

document.addEventListener('DOMContentLoaded', function () {
    const audio = document.getElementById('audioPlayer');
    audio.src = '/static/av_folder/1.wav';
    // audio.play();
    // Set the audio source when the page loads
    // fetch('/getAudio/LOL')
    //     .then(response => response.blob())
    //     .then(blob => {
    //         audio.src = window.URL.createObjectURL(blob);
    //     })
    //     .catch(error => console.error('Error fetching audio:', error));

    // Add event listener for the play event (when the audio starts playing)
    audio.addEventListener('play', function () {
        console.log('Audio started playing');
        // You can add more code here if you want to perform actions when the audio starts playing
    });

    // Add event listener for the pause event (when the audio is paused)
    audio.addEventListener('pause', function () {
        console.log('Audio paused');
        // You can add more code here if you want to perform actions when the audio is paused
    });
});

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

function sendAudio(){
    const audioPlayer = document.getElementById('audioPlayer')
    // audioPlayer.src = url for 
    // audioPlayer.play();

    // // if (audioChunks.length === 0) {
    // //     console.error('No audio recorded.');
    // //     return;
    // // }

    // const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

    // // Send data to the server using FormData
    // const formData = new FormData();
    // formData.append('sub', "lol");
    // formData.append('room', '104');
    // formData.append('audioData', audioBlob, 'audio.wav');

    // fetch('/audio', {
    //     method: 'POST',
    //     body: formData,
    // })
    // .then(response => response.json())
    // .then(data => {
    //     console.log('Data submitted successfully', data);
    //     // Show success message
    //     // document.getElementById('successMessage').innerText = 'Data sent successfully!';
    //     // document.getElementById('successMessage').style.display = 'block';
    // })
    // .catch(error => {
    //     console.error('Error submitting data', error);
    //     // Handle errors
    // });
}
