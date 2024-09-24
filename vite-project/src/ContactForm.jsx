import { Box, TextField, Button, Stack } from "@mui/material";

export default function ContactForm() {
  return (
    <section
      id="contact"
      style={{
        display: "flex",
        width: "100vw",
        justifyContent: "center",
        padding: "5em 0em",
        backgroundColor: "#fdfdfd",
      }}
    >
      <Stack width={600} spacing={3}>
        <h1 style={{ color: "black" }}>Have a Question?</h1>
        <TextField label="Name" variant="filled" required color="success" />
        <TextField label="Email" variant="filled" required color="success" />
        <TextField
          label="Message us here"
          variant="filled"
          multiline
          required
          color="success"
          sx={{ ".MuiInputBase-root": { height: "100px" } }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: "#ff9f1c",
            height: "50px",
            fontSize: "1.2em",
            fontFamily: "inherit",
          }}
        >
          Submit
        </Button>
      </Stack>
    </section>
  );
}
