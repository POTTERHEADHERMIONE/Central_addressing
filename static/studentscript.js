


const navLinks = document.querySelectorAll('.nav-links li');
const courseInfo = document.getElementById('course-name'); 
const hoverBlock = document.querySelector('.active'); 

function showCourseInfo(courseName) {
    courseInfo.textContent = `Selected Course: ${courseName}`;
}



function clearCourseInfo() {
    const selectedCourse = document.querySelector('.nav-links li.selected p');
    if (selectedCourse) {
        showCourseInfo(selectedCourse.textContent);
    }
}

function selectCourse(courseName, linkElement) {
    navLinks.forEach((link, index) => {
        link.classList.remove('selected');
    });
    showCourseInfo(courseName);
    linkElement.classList.add('selected'); 
    hoverBlock.style.top = `${linkElement.offsetTop}px`; 
}


navLinks.forEach((link, index) => {
    const courseName = link.querySelector('p').textContent;

    link.addEventListener('mouseover', () => {
        selectCourse(courseName, link);
    });

    link.addEventListener('mouseout', () => {
        clearCourseInfo();
    });

    link.addEventListener('click', (e) => {
        e.preventDefault(); 
        selectCourse(courseName, link);
    });
});


courseInfo.textContent = 'Select a course to view information';



//New code added:
function loadData(subject) {
    // Simulated data from the server
    const serverData = getServerData(subject);

    // Clear previous data
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    // Display data for the selected subject
    for (const entry of serverData) {
        const entryElement = document.createElement('div');
        if (entry.type === 'Text') {
            entryElement.innerHTML = `<p>${entry.type}: ${entry.data}</p>`;
        } else if (entry.type === 'Audio') {
            entryElement.innerHTML = `<p>${entry.type}: <audio controls><source src="${entry.data}" type="audio/wav"></audio></p>`;
        } else if (entry.type === 'Video') {
            entryElement.innerHTML = `<p>${entry.type}: <iframe width="400" height="225" src="${entry.data}" frameborder="0" allowfullscreen></iframe></p>`;
        }
        dataContainer.appendChild(entryElement);
    }

    // Update the course name
    document.getElementById('course-name').innerText = `Subject: ${subject}`;
}

function getServerData(subject) {
    
    if (subject === 'RANAC') {
        return [
            { type: 'Audio', data: 'URL_TO_AUDIO_FILE_1' },
            { type: 'Video', data: 'https://www.youtube.com/embed/whvCIVRLUEs' },
            { type: 'Text', data: 'Text File' },
        ];
    }
    
    return [];
}

function showOptions(roomNumber) {
    
    var optionsHTML = `
        <button onclick="showAudioOptions('${roomNumber}')">AUDIO</button>
        <button onclick="showVideoOptions('${roomNumber}')">VIDEO</button>
        <button onclick="showTextInput('${roomNumber}')">TEXT</button>
        <button onclick="showHistory('${roomNumber}')">HISTORY</button>
    `;
    optionsBar.innerHTML = optionsHTML;
    
}

function showHistory(roomNumber) {
    
    const serverHistoryData = getServerHistoryData(roomNumber);
    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = '';

    for (const entry of serverHistoryData) {
        const entryElement = document.createElement('div');
        entryElement.innerHTML = `<p>${entry.type}: ${entry.data}</p>`;
        historyContainer.appendChild(entryElement);
    }
}


function getServerHistoryData(roomNumber) {
    
    if (roomNumber === '201') {
        return [
            { type: 'Audio', data: 'URL_TO_AUDIO_FILE_1' },
            { type: 'Video', data: 'https://www.youtube.com/embed/whvCIVRLUEs' },
            { type: 'Text', data: 'Text File' },
        ];
    }
    
    return [];
}
