import "./StartButtonResult.css";
import RemovePhotoButton from "./RemovePhotoButton";
import photoIcon from "../src/assets/upload.png";

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
    <div id="startButton">
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="libraryInput">
          <input
            type="file"
            id="libraryInput"
            accept="image/*, image/jpeg, image/png, image/heic, image/heif, image/avif"
            style={{ display: "none" }}
            onChange={resetFile} // the moment the image changes, handleImageChange runs
          />
          <button
            type="button"
            className="takePhotoButtonResult"
            onClick={() => document.getElementById("libraryInput").click()} //.click() triggers a click event over the input for libraryInput
          >
            <img src={photoIcon} id="photoIconResult" />
          </button>
        </label>

        {imageFile ? (
          <div className="displayImage">
            <RemovePhotoButton setImageFile={setImageFile} />
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
            />
          </div>
        ) : (
          "" //Return empty string if no imageFile exist
        )}
      </form>
    </div>
  );
}
