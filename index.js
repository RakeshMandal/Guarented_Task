
const firebaseConfig = {
    apiKey: "AIzaSyCsgmTIXwpq7AEKjZXIi_28fHspj5h_Pkw",
    authDomain: "my-project-1543299112299.firebaseapp.com",
    projectId: "my-project-1543299112299",
    storageBucket: "my-project-1543299112299.appspot.com",
    messagingSenderId: "452008700843",
    appId: "1:452008700843:web:3949d86b7598b979ea40ee",
    measurementId: "G-6LL1Y7ESYQ"
  };
  firebase.initializeApp(firebaseConfig);
  
  const uploadInput = document.getElementById('uploadInput');
  const imagePreview = document.getElementById('imagePreview');
  
  uploadInput.addEventListener('change', function() {
    for (let i = 0; i < uploadInput.files.length; i++) {
      const selectedFile = uploadInput.files[i];
      const reader = new FileReader();
      reader.onload = function(e) {
        // Create a container div for the thumbnail
        const thumbnailContainer = document.createElement('div');
        thumbnailContainer.classList.add('thumbnail-container');
        // Create an image element for the thumbnail
        const thumbnailImg = document.createElement('img');
        thumbnailImg.src = e.target.result;
        thumbnailImg.classList.add('thumbnail');
        thumbnailContainer.appendChild(thumbnailImg);
        imagePreview.appendChild(thumbnailContainer);
        uploadImageToFirebase(selectedFile);
      };
      reader.readAsDataURL(selectedFile);
    }
  });
  
  function uploadImageToFirebase(file) {
    const filename = generateFilename();
    const storageRef = firebase.storage().ref().child(filename);
    const uploadTask = storageRef.put(file);
  }
  
  // Function to generate a unique filename for each image
  function generateFilename() {
    const timestamp = new Date().getTime();
    return `image_${timestamp}`;
  }
  