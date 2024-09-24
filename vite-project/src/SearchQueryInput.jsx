import { TextField } from "@mui/material";

export default function SearchQueryInput({ formData, updateForm }) {
  return (
    <>
      <TextField
        name="category"
        color="success"
        sx={{
          width: { xs: 350, sm: 300, md: 300, lg: 300 },
          marginY: { xs: 1, sm: 0 },
          "& .MuiInputBase-root": {
            height: 50,
          },
          "& label": {
            color: "grey",
          },
          "& label.Mui-focused": {
            color: "#ff9f1c",
          },
        }}
        label="Enter Food"
        variant="filled"
        value={formData.category}
        placeholder="Search any cuisine, food, and drinks "
        onChange={updateForm}
      />
    </>
  );
}
