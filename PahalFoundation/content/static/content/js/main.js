pizza = document.querySelector('.pizza')
navbar = document.querySelector('.nav-bar')
navlinks = document.querySelector('.nav-links')

pizza.addEventListener('click',()=>{
    navbar.classList.toggle('h-nav-resp')
    navlinks.classList.toggle('nav-links-res')
    pizza.classList.toggle('pizza')
})
// Back to top button
    // Back to top button functionality
      const backToTop = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    });

    backToTop.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

// Attendance html
    // Logic to mark all students at once
    function markAll(status) {
        const selects = document.querySelectorAll('.status-select');
        selects.forEach(select => {
            select.value = status;
        });
        calculateAttendance(); // Refresh colors and math
    }

    // Logic for live math and green/red color toggling
    function calculateAttendance() {
        const selects = document.querySelectorAll('.status-select');
        let presentCount = 0;
        let absentCount = 0;
        let totalMarked = 0;

        selects.forEach(select => {
            // Remove previous status classes
            select.parentElement.classList.remove('is-present', 'is-absent');
            select.classList.remove('select-present', 'select-absent');

            if (select.value === 'present') {
                presentCount++;
                totalMarked++;
                select.parentElement.classList.add('is-present');
                select.classList.add('select-present');
            } else if (select.value === 'absent') {
                absentCount++;
                totalMarked++;
                select.parentElement.classList.add('is-absent');
                select.classList.add('select-absent');
            }
        });

        // Update Summary UI
        document.getElementById('total-present').innerText = presentCount;
        document.getElementById('total-absent').innerText = absentCount;

        if (totalMarked > 0) {
            let percentage = (presentCount / totalMarked) * 100;
            document.getElementById('attendance-percent').innerText = Math.round(percentage) + '%';
        } else {
            document.getElementById('attendance-percent').innerText = '0%';
        }
    }

document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('id_photo');
    const dropzone = document.getElementById('image-dropzone');
    const placeholder = document.getElementById('upload-placeholder');
    const previewContainer = document.getElementById('upload-preview');
    const previewImage = document.getElementById('preview-image');
    const fileNameDisplay = document.getElementById('file-name');
    const btnChange = document.getElementById('btn-change-photo');
    const btnRemove = document.getElementById('btn-remove-photo');

    dropzone.addEventListener('click', function(e) {
        if(e.target.closest('.preview-actions')) return; 
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                previewImage.src = e.target.result;
                fileNameDisplay.innerHTML = `<i class="fas fa-image"></i> ${file.name}`;
                placeholder.classList.add('hidden');
                previewContainer.classList.remove('hidden');
                dropzone.classList.add('has-image');
            }
            reader.readAsDataURL(file);
        }
    });

    btnChange.addEventListener('click', function(e) {
        e.stopPropagation(); 
        fileInput.click();
    });

    btnRemove.addEventListener('click', function(e) {
        e.stopPropagation(); 
        fileInput.value = ''; 
        previewImage.src = ''; 
        placeholder.classList.remove('hidden');
        previewContainer.classList.add('hidden');
        dropzone.classList.remove('has-image');
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.classList.remove('dragover');
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            fileInput.files = e.dataTransfer.files;
            fileInput.dispatchEvent(new Event('change'));
        }
    });
});