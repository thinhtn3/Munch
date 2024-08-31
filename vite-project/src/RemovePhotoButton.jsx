import "./RemovePhotoButton.css"

export default function RemovePhotoButton({ setImageFile }) {
  const deletePhoto = (e) => {
    /*
    Delete photo by setting imageFile state to null
     */
    setImageFile(null);
  };
  return (
    <button id="RemovePhotoButton" onClick={deletePhoto}>
      X
    </button>
  );
}
