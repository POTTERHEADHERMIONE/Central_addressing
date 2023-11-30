


    document.addEventListener("DOMContentLoaded", function () {

    const subs = JSON.parse(localStorage.getItem("subs")) ; 

    var subsList = document.getElementById("course-select");

    for (var a = 0; a < subs.length; a++) {
        var optionElement = document.createElement("option");
        optionElement.value = subs[a];
        optionElement.text = subs[a];
        subsList.appendChild(optionElement);
    }
      
    // Student and Admin section toggle buttons
    const studentButton = document.getElementById("student-button");
    const adminButton = document.getElementById("admin-button");

    // Student section
    const studentSection = document.getElementById("student-section");
    const courseSelect = document.getElementById("course-select");
    const courseInfoText = document.getElementById("course-info-text");
    const courseLink = document.getElementById("course-link");

    if (courseSelect) { 

        courseSelect.addEventListener("change", function () {
            const selectedCourse = courseSelect.value;
            // courseInfoText.textContent = `This is information about the ${selectedCourse} course.`;
            courseLink.href = `https://example.com/${selectedCourse}`;
            courseLink.style.display = "block";
            courseInfoText.style.display = "block";
        });
    }

    // Admin section
    const adminSection = document.getElementById("admin-section");
    const classroomSelect = document.getElementById("classroom-select");
    const componentSelect = document.getElementById("component-select");
    const informationText = document.getElementById("information-text");
    const sendInformationButton = document.getElementById("send-information");

    if (sendInformationButton) 
    { 
        sendInformationButton.addEventListener("click", function () {
            const selectedClassroom = classroomSelect.value;
            const selectedComponent = componentSelect.value;
            const information = informationText.value;
            alert(`Classroom: ${selectedClassroom}\nComponent: ${selectedComponent}\nInformation: ${information}`);
        });
    }

    
    if (adminSection) {
        adminSection.style.display = "block";
    }




    if (studentButton && adminButton) { // Check if both buttons exist
        studentButton.addEventListener("click", function () {
            studentSection.style.display = "block";
            adminSection.style.display = "none";
        });

        adminButton.addEventListener("click", function () {
            studentSection.style.display = "none";
            adminSection.style.display = "block";
        });
    }
});
