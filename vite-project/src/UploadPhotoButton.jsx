import "./UploadPhotoButton.css";
import RemovePhotoButton from "./RemovePhotoButton";
import photoIcon from "./assets/upload.png"

// export default function StartButton({ geolocation }) {
export default function StartButton({
  handleImageChange,
  imageFile,
  setImageFile,
}) {
  const resetFile = (e) => {
    //Resets the input value after displaying image. To allow for uploading same img twice
    handleImageChange(e);
    e.target.value = null;
  };

  return (
    <div id="startButton" >
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="libraryInput">
          <input
            type="file"
            id="libraryInput"
            accept="image/*, image/jpeg, image/png, image/heic, image/heif, image/avif"
            style={{ display: "none" }}
            onChange={resetFile}
          />
          <button
            type="button"
            className="takePhotoButton"
            onClick={() => document.getElementById("libraryInput").click()} //.click() triggers a click event over the input for libraryInput
          >
            Upload Photo
            <img src={photoIcon} id="photoIcon" />
          </button>
        </label>

        {imageFile ? (
          <div className="displayImage">
            <RemovePhotoButton setImageFile={setImageFile} />
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Uploaded Image"
            />
          </div>
        ) : (
          "" //Return empty string if no imageFile exist
        )}
      </form>
    </div>
  );
}
