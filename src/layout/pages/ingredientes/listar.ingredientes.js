import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { tableStyles } from "./style.ingredientes";
import AgregarIngredienteForm from "./agregar.ingredientes";
import EditarIngredienteForm from "./editar.ingredientes";

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

const IngredientesPage = () => {
  const [data, setData] = useState([]);
  const [mostrarAgregarForm, setMostrarAgregarForm] = useState(false);
  const [editandoIngredienteId, setEditandoIngredienteId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:44371/Ingrediente");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching ingredientes:", error);
    }
  };

  const agregarIngrediente = async (nuevoIngrediente) => {
    try {
      const response = await fetch("https://localhost:44371/Ingrediente", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoIngrediente),
      });
      if (response.ok) {
        fetchData(); // Actualiza la lista de ingredientes
        setMostrarAgregarForm(false);
      } else {
        console.error("Error al agregar ingrediente:", response.statusText);
      }
    } catch (error) {
      console.error("Error al agregar ingrediente:", error);
    }
  };



  const handleEditarIngrediente = (ingredienteId) => {
    setEditandoIngredienteId(ingredienteId);
  };
  
  
  const handleGuardarCambios = async (idIngrediente, ingredienteEditado) => {
    try {
      const response = await fetch(`https://localhost:44371/Ingrediente/${idIngrediente}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredienteEditado),
      });
      if (response.ok) {
        // Actualizar el estado data con el ingrediente editado
        const newData = data.map(item =>
          item.idIngrediente === idIngrediente ? ingredienteEditado : item
        );
        setData(newData);
        setEditandoIngredienteId(null);
      } else {
        console.error("Error al editar ingrediente:", response.statusText);
      }
    } catch (error) {
      console.error("Error al editar ingrediente:", error);
    }
  };
  
  
  
  

  const handleEliminarIngrediente = async (idIngrediente) => {
    try {
      const response = await fetch(`https://localhost:44371/Ingrediente/${idIngrediente}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData(); // Actualiza la lista de ingredientes
      } else {
        console.error("Error al eliminar ingrediente:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar ingrediente:", error);
    }
  };

  const handleCloseEditarForm = () => {
    setEditandoIngredienteId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2>Listado de Ingredientes</h2>
          <div>
            <Button variant="contained" onClick={() => setMostrarAgregarForm(true)} color="primary">
              Agregar Ingrediente
            </Button>
          </div>
        </div>
        <TableContainer component={Paper} style={tableStyles.container}>
          <Table aria-label="simple table" style={tableStyles.table}>
            <TableHead>
              <TableRow>
                <TableCell align="right" style={tableStyles.headerCell}>Nombre</TableCell>
                <TableCell align="right" style={tableStyles.headerCell}>Descripción</TableCell>
                <TableCell align="right" style={tableStyles.headerCell}>Precio</TableCell>
                <TableCell align="right" style={tableStyles.headerCell}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row) => (
            <TableRow
              key={row.idIngrediente}> 
              <TableCell align="right">{row.nombre}</TableCell>
              <TableCell align="right">{row.descripcion}</TableCell>
              <TableCell align="right">${row.precio}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="primary" onClick={() => handleEditarIngrediente(row.idIngrediente)}>
                  Editar
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleEliminarIngrediente(row.idIngrediente)} style={{ marginLeft: '10px' }}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>

          </Table>
        </TableContainer>
      </Box>

      {mostrarAgregarForm && (<AgregarIngredienteForm onAgregarIngrediente={agregarIngrediente} handleClose={() => setMostrarAgregarForm(false)}/>)}

      {editandoIngredienteId && (<EditarIngredienteForm ingrediente={data.find(item => item.idIngrediente === editandoIngredienteId)}
       onEditarIngrediente={(ingredienteEditado) => handleGuardarCambios(editandoIngredienteId, ingredienteEditado)} handleClose={handleCloseEditarForm}/>)}


    </ThemeProvider>
  );
};

export default IngredientesPage;
