import * as React from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Modal({ open, handleClose, handleAddNewItem }) {
  const [title, setTitle] = React.useState("");
  const [desc, setDesc] = React.useState("");

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} style={{ background: "#4095A8" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} />

            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              X
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogTitle style={{fontSize:'24px',color:"#4095A8"}}>Nieuw</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Type Je idee. Geef eventueel een kotrte beschhrijving van het idee.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setTitle(event.target.value)}
          />
          <TextField
            margin="dense"
            id="Beschrijving"
            label="Beschrijving"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setDesc(event.target.value)}
          />
          <Grid container justifyContent="flex-end">
            <Button
              onClick={() => {
                handleAddNewItem({ title, desc });
                handleClose();
              }}
            >
              Toevoegen
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
