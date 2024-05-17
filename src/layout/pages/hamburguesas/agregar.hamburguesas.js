import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const AgregarHamburguesaForm = ({ onAgregarHamburguesa, handleClose }) => {
  const [nombreHamburguesa, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  
 

  const handleAgregarHamburguesa = () => {
    if (!nombreHamburguesa || !descripcion || !precio) {
      alert("Por favor, complete todos los campos");
      return;
    }

    onAgregarHamburguesa({ nombreHamburguesa, descripcion, precio  });

    setNombre("");
    setDescripcion("");
    setPrecio("");
    
    handleClose();
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal open={true} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2>Agregar Hamburguesa</h2>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombreHamburguesa}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="Descripcion"
            variant="outlined"
            fullWidth
            margin="normal"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          <TextField
            label="Precio"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
          />
          <Button variant="contained" onClick={handleAgregarHamburguesa} color="primary">
            Agregar
          </Button>
          <Button variant="contained" onClick={handleClose} color="secondary" style={{ marginLeft: '10px' }}>
            Cancelar
          </Button>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default AgregarHamburguesaForm;
