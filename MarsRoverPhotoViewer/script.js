const apiKey = "Jhrg0Mi6uOiWAlWBjM8RpOkPmc7OfFU7IFINbTgs";
const roverSelect = document.getElementById('rover-select');
const cameraSelect = document.getElementById('camera-select');
const dateInput = document.getElementById('date-input');
const fetchButton = document.getElementById('fetch-photos');
const photoGallery = document.getElementById('photo-gallery');
const themeToggle = document.getElementById('theme-toggle');

// Theme switcher
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    if (isDarkMode) {
        themeToggle.textContent = 'Dark Mode';
    } else {
        themeToggle.textContent = 'Light Mode';
    }
});

// Fetch photos
fetchButton.addEventListener('click', () => {
    const rover = roverSelect.value;
    const camera = cameraSelect.value;
    const date = dateInput.value;

    if (!date) {
        alert('Please select a date.');
        return;
    }

    photoGallery.innerHTML = '<p>Finding the data...</p>';

    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${apiKey}`;
    if (camera !== 'all') {
        apiUrl += `&camera=${camera}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayPhotos(data.photos);
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
            photoGallery.innerHTML = '<p>Error fetching photos. Please try again.</p>';
        });
});

// Display photos
function displayPhotos(photos) {
    photoGallery.innerHTML = '';
    if (photos.length === 0) {
        photoGallery.innerHTML = '<p>No photos found for the selected date and camera.</p>';
        return;
    }

    photos.forEach(photo => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Mars rover ${photo.rover.name} photo`;

        const info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = `
            <p><strong>Camera:</strong> ${photo.camera.full_name}</p>
            <p><strong>Sol:</strong> ${photo.sol}</p>
        `;

        item.appendChild(img);
        item.appendChild(info);
        photoGallery.appendChild(item);
    });
}

// Populate camera options based on rover
roverSelect.addEventListener('change', () => {
    const rover = roverSelect.value;
    // This is a simplified version. A real implementation would fetch available cameras for each rover.
    const cameras = {
        curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
        opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
        perseverance: ['EDL_RUCAM', 'EDL_RDCAM', 'EDL_DDCAM', 'EDL_PUCAM1', 'EDL_PUCAM2', 'NAVCAM_LEFT', 'NAVCAM_RIGHT', 'MCZ_RIGHT', 'MCZ_LEFT', 'FRONT_HAZCAM_LEFT_A', 'FRONT_HAZCAM_RIGHT_A', 'REAR_HAZCAM_LEFT', 'REAR_HAZCAM_RIGHT', 'SKYCAM', 'SHERLOC_WATSON'],
        spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES']
    };

    cameraSelect.innerHTML = '<option value="all">All Cameras</option>';
    if (cameras[rover]) {
        cameras[rover].forEach(camera => {
            const option = document.createElement('option');
            option.value = camera;
            option.textContent = camera;
            cameraSelect.appendChild(option);
        });
    }
});

// Set default date to today and max date to today
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.setAttribute('max', today);