const apiKey = "Jhrg0Mi6uOiWAlWBjM8RpOkPmc7OfFU7IFINbTgs";
const roverSelect = document.getElementById('rover-select');
const cameraSelect = document.getElementById('camera-select');
const dateInput = document.getElementById('date-input');
const fetchButton = document.getElementById('fetch-photos');
const photoGallery = document.getElementById('photo-gallery');
const themeToggle = document.getElementById('theme-toggle');

// Modal elements
const photoModal = document.getElementById('photo-modal');
const modalPhoto = document.getElementById('modal-photo');
const modalRover = document.getElementById('modal-rover');
const modalCamera = document.getElementById('modal-camera');
const modalEarthDate = document.getElementById('modal-earth-date');
const modalSol = document.getElementById('modal-sol');
const closeButton = document.querySelector('.close-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');

let photos = [];
let currentPhotoIndex = 0;

// Theme switcher
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    document.body.classList.toggle('dark-mode');

    const isDarkMode = document.body.classList.contains('dark-mode');
    const lightModeIcon = themeToggle.querySelector('.icon-light-mode');
    const darkModeIcon = themeToggle.querySelector('.icon-dark-mode');

    if (isDarkMode) {
        lightModeIcon.style.display = 'none';
        darkModeIcon.style.display = 'block';
    } else {
        lightModeIcon.style.display = 'block';
        darkModeIcon.style.display = 'none';
    }
});

// Set initial theme icon display
(function() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const lightModeIcon = themeToggle.querySelector('.icon-light-mode');
    const darkModeIcon = themeToggle.querySelector('.icon-dark-mode');

    if (isDarkMode) {
        lightModeIcon.style.display = 'none';
        darkModeIcon.style.display = 'block';
    } else {
        lightModeIcon.style.display = 'block';
        darkModeIcon.style.display = 'none';
    }
})();

// Fetch photos
fetchButton.addEventListener('click', () => {
    const rover = roverSelect.value;
    const camera = cameraSelect.value;
    const date = dateInput.value;

    if (!date) {
        alert('Please select a date.');
        return;
    }

    photoGallery.innerHTML = '<div class="loader"></div>';

    let apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${date}&api_key=${apiKey}`;
    if (camera !== 'all') {
        apiUrl += `&camera=${camera}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            photos = data.photos;
            displayPhotos(photos);
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

    photos.forEach((photo, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        const img = document.createElement('img');
        img.src = photo.img_src;
        img.alt = `Mars rover ${photo.rover.name} photo`;
        img.addEventListener('click', () => openModal(index));

        const info = document.createElement('div');
        info.classList.add('info');
        info.innerHTML = `
            <p><strong>Camera:</strong> ${photo.camera.full_name}</p>
            <p><strong>Sol:</strong> ${photo.sol}</p>
            <p><strong>Date:</strong> ${photo.earth_date}</p>
        `;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = '❤️';
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('liked');
        });

        item.appendChild(img);
        item.appendChild(info);
        item.appendChild(likeButton);
        photoGallery.appendChild(item);
    });
}

// Populate camera options based on rover
roverSelect.addEventListener('change', () => {
    const rover = roverSelect.value;
    const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const cameras = data.photo_manifest.photos.reduce((acc, photo) => {
                photo.cameras.forEach(camera => {
                    if (!acc.includes(camera)) {
                        acc.push(camera);
                    }
                });
                return acc;
            }, []);

            cameraSelect.innerHTML = '<option value="all">All Cameras</option>';
            cameras.forEach(camera => {
                const option = document.createElement('option');
                option.value = camera;
                option.textContent = camera;
                cameraSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error fetching camera data:', error);
        });
});

// Set default date to today and max date to today
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.setAttribute('max', today);

// Modal Functions
function openModal(index) {
    currentPhotoIndex = index;
    showPhoto(currentPhotoIndex);
    photoModal.style.display = 'flex'; // Use flex to center content
}

function showPhoto(index) {
    const photo = photos[index];
    modalPhoto.src = photo.img_src;
    modalRover.textContent = photo.rover.name;
    modalCamera.textContent = photo.camera.full_name;
    modalEarthDate.textContent = photo.earth_date;
    modalSol.textContent = photo.sol;

    prevButton.disabled = (currentPhotoIndex === 0);
    nextButton.disabled = (currentPhotoIndex === photos.length - 1);
}

function closeModal() {
    photoModal.style.display = 'none';
}

function nextPhoto() {
    if (currentPhotoIndex < photos.length - 1) {
        currentPhotoIndex++;
        showPhoto(currentPhotoIndex);
    }
}

function prevPhoto() {
    if (currentPhotoIndex > 0) {
        currentPhotoIndex--;
        showPhoto(currentPhotoIndex);
    }
}

// Event Listeners for Modal
closeButton.addEventListener('click', closeModal);
prevButton.addEventListener('click', prevPhoto);
nextButton.addEventListener('click', nextPhoto);

// Close modal when clicking outside the image
photoModal.addEventListener('click', (e) => {
    if (e.target === photoModal) {
        closeModal();
    }
});


