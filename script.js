// JavaScript functions for icon actions

function openHome() {
    alert("Home page coming soon!");
}

function openMessages() {
    window.location.href = "chatpage.html"; // Redirect to the chat page (replace with your actual chat page URL)
}


function openSocial() {
    alert("Social page coming soon!");
}

function openProfile() {
    alert("Profile page coming soon!");
}

function openNotifications() {
    alert("Notifications coming soon!");
}
let currentContact = '';  // Store the current contact

// Function to open the chat with a specific contact
function openChat(contactName) {
    currentContact = contactName;
    document.getElementById("chat-name").innerText = `Chat with ${contactName}`;
    document.getElementById("chat-body").innerHTML = ''; // Clear chat body when switching contacts
}

// Function to send a message
function sendMessage() {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message) {
        // Create a new message div
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', 'sent');
        messageDiv.innerText = message;

        // Append message to the chat body
        const chatBody = document.getElementById("chat-body");
        chatBody.appendChild(messageDiv);

        // Scroll to the bottom of the chat
        chatBody.scrollTop = chatBody.scrollHeight;

        // Clear the input field
        messageInput.value = '';
    }
}
// Open the share functionality
function openShare() {
    if (navigator.share) {
        navigator.share({
            title: 'WhatsApp Clone',
            text: 'Check out this WhatsApp clone!',
            url: window.location.href,
        })
        .then(() => console.log('Shared successfully'))
        .catch((err) => console.log('Error sharing', err));
    } else {
        alert("Sharing is not supported on your browser.");
    }
}

// Open the camera
function openCamera() {
    // Show the camera modal
    document.getElementById('camera-modal').style.display = 'flex';

    // Access the user's camera
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                const video = document.getElementById('video');
                video.srcObject = stream;
                video.play();
                window.currentStream = stream; // Store the stream to stop it later
            })
            .catch(function (err) {
                console.log('Error accessing camera: ', err);
                alert("Unable to access the camera.");
            });
    } else {
        alert("Camera is not supported on this device.");
    }
}

// Close the camera modal
function closeCamera() {
    // Stop the video stream
    const stream = window.currentStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());

    // Hide the camera modal
    document.getElementById('camera-modal').style.display = 'none';
}

// Capture an image from the video stream
function captureImage() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert to image
    const capturedImage = canvas.toDataURL('image/png');

    // Display the captured image in the chat body
    const imgElement = document.createElement('img');
    imgElement.src = capturedImage;
    imgElement.width = 100;
    imgElement.height = 100;
    document.getElementById('chat-body').appendChild(imgElement);

    // Stop the video stream and close the camera modal
    closeCamera();
}
