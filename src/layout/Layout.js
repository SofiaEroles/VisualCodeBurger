
import '../App.css';

import { Outlet } from 'react-router-dom';
import CustomToolbar from './toolbar/CustomToolbar';

// Este sera nuestro componente contendor mas importante despues de App, el cual contendra el toolbar y el contenido de la pagina
const Layout = () => {
  return (
    <>
      <CustomToolbar />
      {/* Outlet es un componente de react-router-dom que se usa para renderizar el contenido
       de ciertas paginas(/hamburguesas y /pedidos) */}
      <Outlet />
    </>
  )
};

export default Layout;
