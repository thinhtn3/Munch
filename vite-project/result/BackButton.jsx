export default function BackButton() {
  const handleClick = (e) => {
    e.preventDefault();
    location.href = "/";
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          marginBottom: "1em",
          width: "150px",
          height: "30px",
          borderRadius: "8px",
          border: "0px",
          cursor: "pointer",
        }}
      >
        Press to go back
      </button>
    </div>
  );
}
