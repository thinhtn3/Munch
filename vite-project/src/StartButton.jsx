import "./StartButton.css"

export default function StartButton() {

    const takePhoto = (e) => {
        const file=e.target.files[0];
        if (file) {
            console.log(file)
        }
    }
    return (
        <button onChangeclassName="takePhotoButton">Take Photo</button>
    )
}