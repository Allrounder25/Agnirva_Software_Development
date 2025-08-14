# Mars Rover Photo Viewer

## Introduction
The Mars Rover Photo Viewer is a simple, interactive web application that allows you to explore the fascinating images captured by NASA's Mars rovers. You can filter photos by rover, camera, and Earth date, providing a unique way to delve into the Martian landscape.

## Features
*   View photos from Curiosity, Opportunity, Perseverance, and Spirit rovers.
*   Filter photos by specific cameras on each rover.
*   Select photos by Earth date.
*   Dynamic photo gallery with responsive design.
*   Image modal viewer for detailed photo information (rover, camera, Earth date, Martian sol).
*   Light and dark theme toggle.
*   Navigation buttons within the modal to browse photos.

## Technologies Used
*   HTML5
*   CSS3
*   JavaScript
*   NASA Mars Rover Photos API

## Setup and Installation

To run this project locally, follow these simple steps:

1.  **Download the project files.**

2.  **Obtain a NASA API Key:**
    *   Go to the [NASA API website](https://api.nasa.gov/).
    *   Sign up for a free API key.
    *   Once you have your API key, open `script.js` in a text editor.
    *   Locate the line `const apiKey = "Jhrg0Mi6uOiWAlWBjM8RpOkPmc7OfFU7IFINbTgs";` and replace `"Jhrg0Mi6uOiWAlWBjM8RpOkPmc7OfFU7IFINbTgs"` with your actual NASA API key.

3.  **Open `index.html`:**
    *   Simply open the `index.html` file in your preferred web browser. No web server is required for basic functionality.

## Usage

1.  **Select a Rover:** Choose your desired Mars rover from the "Rover" dropdown menu.
2.  **Select a Camera (Optional):** After selecting a rover, the "Camera" dropdown will populate with available cameras for that rover. You can choose a specific camera or leave it as "All Cameras".
3.  **Choose a Date:** Use the date input field to select an Earth date.
4.  **Fetch Photos:** Click the "Get Photos" button to retrieve images based on your selections.
5.  **Browse Gallery:** Photos will appear in the gallery. Click on any photo to view it in a larger modal with more details.
6.  **Toggle Theme:** Use the sun/moon icon button in the header to switch between light and dark modes.
