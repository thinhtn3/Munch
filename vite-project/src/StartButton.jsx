import "./StartButton.css";

// export default function StartButton({ geolocation }) {
export default function StartButton({ handleImageChange, imgFile }) {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="libraryInput">
          <input
            type="file"
            accept="image/*, image/jpeg, image/png, image/heic, image/heif, image/avif"
            id="libraryInput"
            style={{ display: "none" }}
            onChange={handleImageChange} // the moment the image changes, handleImageChange runs
          />
          <button
            type="button"
            className="takePhotoButton"
            onClick={() => document.getElementById("libraryInput").click()} //.click() triggers a click event over the input for libraryInput
          >
            Take Photo
          </button>
        </label>
        <div className="displayImage">
          {imgFile ? (
            <img
              src={URL.createObjectURL(imgFile)}
              alt="Preview"
              style={{ width: "200px", height: "auto" }}
            />
          ) : (
            ''
          )}
        </div>

      </form>
    </div>
  );
}
