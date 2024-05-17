import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Layout from "./layout/Layout";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HamburguesasPage from "./layout/pages/hamburguesas/listar.hamburguesas";
import PedidosPage from "./layout/pages/pedidos/listar.pedidos";
import ClientesPage from "./layout/pages/clientes/listar.clientes";
import IngredientesPage from "./layout/pages/ingredientes/listar.ingredientes";

// Este sera nuestro componente principal, en el que se encuetra el enrutador de la aplicacion 
export default function App() {
  return (
    // Usaremos BrowserRouter de la libreria react-router-dom para manejar las rutas
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/hamburguesas" element={<HamburguesasPage />} />
          <Route path="/ingredientes" element={<IngredientesPage/>} />
          <Route path="/pedidos" element={<PedidosPage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          {/* Si no encuentra la ruta va por defecto a /hamburguesas */}
          <Route path="*" element={<Navigate to="/hamburguesas" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Si observan el archivo index.js en la carpeta /public, se puede ver que se importa el componente App y se renderiza en el elemento con id "root"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
