// import "./StartButton.css";
// import React, { useState } from "react";

// export default function StartButton() {
//   const [imagePreviewUrl, setImagePreviewUrl] = useState("");

//   const handleImageChange = (e) => {
//     e.preventDefault();

//     let reader = new FileReader();
//     let file = e.target.files[0];
//     console.log(file)

//     reader.onloadend = () => {
//       setImagePreviewUrl(reader.result);
//     };

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <div>
//       <form>
//         <label htmlFor="libraryInput">
//           <input
//             type="file"
//             accept="image/*"
//             id="libraryInput"
//             style={{ display: "none" }}
//             onChange={handleImageChange}
//           />
//           <button
//             type="button"
//             className="takePhotoButton"
//             onClick={() => document.getElementById("libraryInput").click()}
//           >
//             Take Photo
//           </button>
//         </label>

//         {imagePreviewUrl && (
//           <img
//             src={imagePreviewUrl}
//             alt="Preview"
//             style={{ width: "100%", height: "auto" }}
//           />
//         )}
//       </form>
//     </div>
//   );
// }

import "./StartButton.css";
import React, { useState } from "react";

export default function StartButton() {
    const [imageFile, setImageFile] = useState(null);
  
    const handleImageChange = (e) => {
      e.preventDefault();
  
      let file = e.target.files[0];
  
      if (file) {
        setImageFile(file);
      }
    };
  
    return (
      <div>
        <form>
          <label htmlFor="libraryInput">
            <input
              type="file"
              accept="image/*"
              id="libraryInput"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <button
              type="button"
              className="takePhotoButton"
              onClick={() => document.getElementById("libraryInput").click()}
            >
              Take Photo
            </button>
          </label>
  
          {imageFile && (
            <img
            //   src={URL.createObjectURL(imageFile)}
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              style={{ width: "100%", height: "auto" }}
            />
          )}

        </form>
      </div>
    );
  }

// Grab photo from camera
  const takePhotoFromCamera = async (onPhotoCapture) => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        const video = document.createElement('video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        video.srcObject = stream;
        video.play();

        video.addEventListener('loadedmetadata', () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageUrl = canvas.toDataURL('image/jpeg');
            
            // Convert data URL to file
            const file = dataURLtoFile(imageUrl, 'photo.jpg');

            // Call the callback function with the image file
            onPhotoCapture(file);

            // Stop video stream
            stream.getTracks().forEach(track => track.stop());
        });
    } catch (error) {
        console.error('Error accessing camera:', error);
    }
};

// Usage example
const handlePhotoCapture = (file) => {
    // Handle the captured photo file here
    console.log('Captured photo:', file);
    // You can set it as state, send it to server, etc.
};

// Call takePhotoFromCamera with the callback function
takePhotoFromCamera(handlePhotoCapture);
