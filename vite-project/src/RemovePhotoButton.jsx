import "./RemovePhotoButton.css"

export default function RemovePhotoButton({ setImageFile }) {
  const deletePhoto = (e) => {
    setImageFile(null);
  };
  return (
    <button id="RemovePhotoButton" onClick={deletePhoto}>
      X
    </button>
  );
}
