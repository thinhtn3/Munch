import { TextField } from "@mui/material";

export default function SearchQueryInput({formData, updateForm}) {

  
  return (
    <>
      <TextField
        name="category"
        sx={{
          width: { xs: 350, sm: 300, md: 300, lg: 300 },
          marginY: { xs: 1, sm: 0 },
          "& .MuiInputBase-root": {
            height: 50, // Set height of the entire input component
          },
          "& label": {
            color: "grey",
          },
          "& label.Mui-focused": {
            color: "#ff9f1c",
          },
          "& .MuiOutlinedInput-root": {
            color: "#000",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "grey",
            borderWidth: "1px",
          },
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: "#ff9f1c",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#ff9f1c",
            },
          },
        }}
        label="Enter Food"
        variant="outlined"
        value={formData.category}
        placeholder="Search any cuisine, food, and drinks "
        onChange={updateForm}
      />
    </>
  );
}
