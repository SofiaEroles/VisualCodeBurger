import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { tableStyles } from "./style.pedidos";

const theme = createTheme ({
  palette:{
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const PedidosPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
      
        // Reparar esta llamada al endpoint correspondiente
        const response = await fetch("https://localhost:44371/Pedido");

        // Parseo la respuesta a JSON
        const data = await response.json();

        // Hago la relacion con la propiedad 'data' de Reactjs usando setData
        setData(data);
      } catch (error) {
        console.error("Error leyendo pedidos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
    <TableContainer component={Paper} style={tableStyles.container}>
      Listado de Pedidos
      <Table aria-label="simple table" style={tableStyles.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right" style={tableStyles.headerCell}>Nombre</TableCell>
            <TableCell align="right" style={tableStyles.headerCell}>Hamburguesa</TableCell>
            <TableCell align="right" style={tableStyles.headerCell}>Cantidad</TableCell>
            <TableCell align="right" style={tableStyles.headerCell}>Precio</TableCell>
            <TableCell align="right" style={tableStyles.headerCell}>Fecha</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={row.idPedido} style={index % 2 === 0 ? {} : tableStyles.oddRow}>
              <TableCell align="right">{row.cliente.nombre} {row.cliente.apellido}</TableCell>
              <TableCell align="right">{row.hamburguesa.nombreHamburguesa}</TableCell>
              <TableCell align="right">{row.cantidad}</TableCell>
              <TableCell align="right">
                ${row.cantidad > 1 ? row.cantidad * row.hamburguesa.precio : row.hamburguesa.precio}
              </TableCell>
              <TableCell align="right">{row.fecha}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </ThemeProvider>
  );
};

export default PedidosPage;
