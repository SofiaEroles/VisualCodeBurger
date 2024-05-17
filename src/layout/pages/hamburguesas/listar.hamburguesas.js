// HamburguesasPage.js
import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { tableStyles } from "./style.hamburguesas";
import AgregarHamburguesaForm from "./agregar.hamburguesas";
import EditarHamburguesaForm from "./editar.hamburguesas";

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

const HamburguesasPage = () => {
  const [data, setData] = useState([]);
  const [mostrarAgregarForm, setMostrarAgregarForm] = useState(false);
  const [editandoHamburguesaId, setEditandoHamburguesaId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://localhost:44371/Hamburguesa");
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching hamburguesas:", error);
    }
  };

  const agregarHamburguesa = async (nuevaHamburguesa) => {
    try {
      const response = await fetch("https://localhost:44371/Hamburguesa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaHamburguesa),
      });
      if (response.ok) {
        fetchData();
        setMostrarAgregarForm(false);
      } else {
        console.error("Error al agregar hamburguesa:", response.statusText);
        const errorMessage = await response.text(); // Obtener mensaje de error detallado
        console.error("Detalle del error:", errorMessage);
      }
    } catch (error) {
      console.error("Error al agregar hamburguesa:", error);
    }
  };

  const handleEditarHamburguesa = (hamburguesaId) => {
    setEditandoHamburguesaId(hamburguesaId);
  };

  const handleGuardarCambios = async (idHamburguesa, hamburguesaEditada) => {
    try {
      const response = await fetch(`https://localhost:44371/Hamburguesa/${idHamburguesa}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hamburguesaEditada),
      });
      if (response.ok) {
        fetchData();
        setEditandoHamburguesaId(null);
      } else {
        console.error("Error al editar hamburguesa:", response.statusText);
      }
    } catch (error) {
      console.error("Error al editar hamburguesa:", error);
    }
  };

  const handleEliminarHamburguesa = async (idHamburguesa) => {
    try {
      const response = await fetch(`https://localhost:44371/Hamburguesa/${idHamburguesa}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData(); // Actualiza la lista de hamburguesas
      } else {
        console.error("Error al eliminar hamburguesa:", response.statusText);
      }
    } catch (error) {
      console.error("Error al eliminar hamburguesa:", error);
    }
  };

  const handleCloseEditarForm = () => {
    setEditandoHamburguesaId(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <h2>Listado de Hamburguesas</h2>
          <div>
            <Button variant="contained" onClick={() => setMostrarAgregarForm(true)} color="primary">
              Agregar Hamburguesa
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
                <TableRow key={row.idHamburguesa}>
                  <TableCell align="right">{row.nombreHamburguesa}</TableCell>
                  <TableCell align="right">{row.descripcion}</TableCell>
                  <TableCell align="right">${row.precio}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary" onClick={() => handleEditarHamburguesa(row.idHamburguesa)}>
                      Editar
                    </Button>
                    <Button variant="contained" color="secondary" onClick={() => handleEliminarHamburguesa(row.idHamburguesa)} style={{ marginLeft: '10px' }}>
                      Eliminar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {mostrarAgregarForm && (
        <AgregarHamburguesaForm onAgregarHamburguesa={agregarHamburguesa} handleClose={() => setMostrarAgregarForm(false)} />
      )}

      {editandoHamburguesaId && (
        <EditarHamburguesaForm
          hamburguesa={data.find(item => item.idHamburguesa === editandoHamburguesaId)}
          onEditarHamburguesa={handleGuardarCambios}
          handleClose={handleCloseEditarForm}
        />
      )}
    </ThemeProvider>
  );
};

export default HamburguesasPage;
