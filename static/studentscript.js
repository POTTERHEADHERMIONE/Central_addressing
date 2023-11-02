const navLinks = document.querySelectorAll('.nav-links li');
const courseInfo = document.getElementById('course-name'); // Get the course information element
const hoverBlock = document.querySelector('.active'); // Get the hover block element

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

// CLick ad remain in the same position
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

// Initialize with default message
courseInfo.textContent = 'Select a course to view information';
