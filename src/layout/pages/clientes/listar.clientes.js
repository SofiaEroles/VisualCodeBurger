// ClientesPage.js
import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { tableStyles } from "./style.clientes"; 

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const ClientesPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:44371/Cliente");
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error leyendo clientes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <div style={{ display: 'felx', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
          <h2>Listado de Clientes</h2>
          </div>
      <TableContainer component={Paper} style={tableStyles.container}>
        <Table aria-label="simple table" style={tableStyles.table}>
          <TableHead>
            <TableRow>
              <TableCell align="right" style={tableStyles.headerCell}>ID</TableCell>
              <TableCell align="right" style={tableStyles.headerCell}>Nombre</TableCell>
              <TableCell align="right" style={tableStyles.headerCell}>Apellido</TableCell>
            </TableRow>
          </TableHead>
           <TableBody>
           {data.map((row, index) => (
             <TableRow key={row.idCliente} style={index % 2 === 0 ? {} : tableStyles.oddRow}>
               <TableCell align="right">{row.idCliente}</TableCell>
               <TableCell align="right">{row.nombre}</TableCell>
               <TableCell align="right">{row.apellido}</TableCell>
             </TableRow>
           ))}
         </TableBody>
        </Table>
      </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default ClientesPage;
