
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './components/Pages/Home';
import Login from "./components/Pages/Login";
import Crear from "./components/Pages/Crear/crear";
import Header from "./components/UI/Header";
import Mostrar from "./components/Mostrar/PolizasM/mostrarPoliza";
import MostrarClientes from "./components/Mostrar/ClientesM/mostarClientes";
import MostrarTipoPolizas from "./components/Mostrar/TipoPolizaM/mostrarTipoPoliza";
import Editar from "./components/Pages/Editar/editar";
import MostrarSoloPolizas from "./components/Mostrar/PolizasM/mostrarSoloPolizas.jsx";


function App() {

  



  return (
    
      <Router>
        <Routes>
            <Route element={<Header />} >
            
            <Route path="/" element={<Login  />} />
            <Route path="/home" element={<Home />} />
            <Route path="/crear" element={<Crear />} />
            <Route path="/editar/:idPoliza" element={<Editar />} />
            <Route path="/polizas" element={<MostrarSoloPolizas/>} />
            <Route path="/clientes" element={<MostrarClientes />} />
            <Route path="/tipoPolizas" element={<MostrarTipoPolizas/>} />


            </Route>

        </Routes>
      </Router>
    

  );
}

export default App;
