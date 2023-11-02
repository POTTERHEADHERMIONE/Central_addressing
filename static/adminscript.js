const classroomButtons = document.querySelectorAll('.button-one button, .button-two button');
const mediaOptions = document.getElementById('media-options');
const classroomText = document.querySelector('.button-selected');
const classroomTitle = document.querySelector('h2'); // Get the h2 tag
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
