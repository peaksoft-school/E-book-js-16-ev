// import './App.css'

// const App = () => <h1>eBook-js-16-ev</h1>

// export default App


import { useState } from "react";
import { Button, Typography } from "@mui/material";
import Modal from "./components/UI/Modal";

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
      <Modal open={open} handleClose={() => setOpen(false)}>
        <Typography variant="h6">Reusable MUI Modal</Typography>
        <Typography sx={{ mt: 2 }}>
          hello world!
        </Typography>
        <Button onClick={() => setOpen(false)} sx={{ mt: 2 }}>
          Close
        </Button>
      </Modal>
    </>
  );
};
export default App;