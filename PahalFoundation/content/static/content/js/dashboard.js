// Toggle visibility for general menus
function toggleVisibility(menuId) {
    var menu = document.getElementById(menuId);
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// status change animation
document.addEventListener("change", (e) => {
    if (e.target.classList.contains("status-select")) {
        e.target.classList.add("status-changed");
        setTimeout(() => {
            e.target.classList.remove("status-changed");
        }, 300);
    }
});

function toggleMenu(id) {
    document.getElementById(id).classList.toggle("show");
}

document.getElementById('toggle-menu').addEventListener('click', function() {
    var sideMenu = document.getElementById('side-menu');
    var dashboardRight = document.getElementById('dashboard-right');
    sideMenu.classList.toggle('show');
    dashboardRight.classList.toggle('menu-open');
});
// Admission form image upload handling
document.addEventListener("DOMContentLoaded", function() {
    const fileInput = document.getElementById('id_photo');
    const dropzone = document.getElementById('image-dropzone');
    const placeholder = document.getElementById('upload-placeholder');
    const previewContainer = document.getElementById('upload-preview');
    const previewImage = document.getElementById('preview-image');
    const fileNameDisplay = document.getElementById('file-name');
    const btnChange = document.getElementById('btn-change-photo');
    const btnRemove = document.getElementById('btn-remove-photo');

    // Trigger file input when clicking dropzone
    dropzone.addEventListener('click', function(e) {
        if(e.target.closest('.preview-actions')) return; 
        fileInput.click();
    });

    // Handle File Selection & Preview
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

    // Change Button
    btnChange.addEventListener('click', function(e) {
        e.stopPropagation(); 
        fileInput.click();
    });

    // Remove Button
    btnRemove.addEventListener('click', function(e) {
        e.stopPropagation(); 
        fileInput.value = ''; 
        previewImage.src = ''; 
        placeholder.classList.remove('hidden');
        previewContainer.classList.add('hidden');
        dropzone.classList.remove('has-image');
    });

    // Drag and Drop
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
// Toggle visibility for mobile menu
function toggleVisibility(id) {
        var menu = document.getElementById(id);
        if (menu.style.display === "block") {
            menu.style.display = "none";
        } else {
            menu.style.display = "block";
        }
    }

// Search bar toggle for mobile
function toggleVisibility(id) {
        var menu = document.getElementById(id);
        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
      }
      function toggleVisibility(id) {
        var menu = document.getElementById(id);
        if (menu.style.display === "block") {
          menu.style.display = "none";
        } else {
          menu.style.display = "block";
        }
      }

      // --- NEW FIND IN PAGE LOGIC ---
      document.addEventListener("DOMContentLoaded", function() {
        const searchInput = document.getElementById('page-search-input');
        const searchBtn = document.getElementById('page-search-btn');

        function performFindInPage() {
            const query = searchInput.value;
            
            if (query.trim() === "") {
                return; // Do nothing if empty
            }

            // This replicates the browser's native Ctrl+F behavior
            // window.find(string, caseSensitive, backwards, wrapAround)
            const found = window.find(query, false, false, true);

            // Brief visual feedback if text isn't found
            if (!found) {
                searchInput.style.border = "2px solid #ef4444"; // flashes red
                setTimeout(() => {
                    searchInput.style.border = "1px solid #eee";
                }, 1000);
            } else {
                searchInput.style.border = "1px solid #eee";
            }
        }

        // Trigger on button click
        searchBtn.addEventListener('click', performFindInPage);

        // Trigger on "Enter" key press
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                performFindInPage();
            }
        });
        
        // Clear highlight if input is cleared
        searchInput.addEventListener('input', function() {
            if (this.value === "") {
                window.getSelection().removeAllRanges();
            }
        });
      });


