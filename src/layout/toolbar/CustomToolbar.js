import "../../App.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const pages = ["hamburguesas","ingredientes", "pedidos", "clientes"];

// Este sera nuestro componente de toolbar personalizado
function CustomToolbar() {
  // Usamos el hook useNavigate para navegar entre las rutas, recuerden que deben importar useNavigate de react-router-dom
  const navigate = useNavigate();

  // Esta funcion se encarga de navegar a la ruta correspondiente
  const navigateToRoute = (param) => {
    navigate(param);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BURGERHOME
          </Typography>

          <Divider />
          <Box style={{justifyContent: "flex-end"}} sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  navigateToRoute(page);
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default CustomToolbar;
