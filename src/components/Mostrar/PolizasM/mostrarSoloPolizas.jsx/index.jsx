import React, { useEffect, useState } from "react";
import { Container, Typography, Button, colors } from "@mui/material";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";




export default function MostrarSoloPolizas() {
  const [poliza, setPoliza] = useState(null);
  const [clientes, setClientes] = useState({});
  const [tipoPolizas, setTipoPolizas] = useState({});
  const navigate = useNavigate();


  

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/api/polizas/obtener_todoDTO",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setPoliza(response.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    //Consumo de la API.
    async function traerClientes() {
      const response = await axios.get(
        "http://localhost:8080/api/clientes/obtener_todo",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setClientes(response.data);
    }

    traerClientes();
  }, []);

  const traerCliente = idCliente => {
    let clienteActual = "";

    clientes.forEach(cliente => {
      if (idCliente == cliente.id) {
        clienteActual = cliente;
      }
    });
    return clienteActual.nombre + " " + clienteActual.apellido;
  };

  useEffect(() => {
    //Consumo de la API.
    async function traerTipoPolizas() {
      const response = await axios.get(
        "http://localhost:8080/api/tipo_polizas/obtener_todo",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );

      setTipoPolizas(response.data);
    }

    traerTipoPolizas();
  }, []);

  const traerTipoPoliza = idTipo => {
    let tipoPolizaActual = "";

    tipoPolizas.forEach(tipoPoliza => {
      if (idTipo == tipoPoliza.idTipoPoliza) {
        tipoPolizaActual = tipoPoliza;
      }
    });
    return "Seguro de " + tipoPolizaActual.nombre;
  };


   const borrar = async (idPoliza) => {
    try {
      let response;
      response = await axios.delete(
        `http://localhost:8080/api/polizas/borrarDTO/${idPoliza}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      );
      setPoliza((prevLista) =>
        prevLista.filter((poliza) => poliza.idPoliza !== idPoliza)
      );
    } catch (e) {
      
    }

  };

  return (
    <Container sx={{ paddingTop: 5 }}>
      {poliza ? (
        <>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650, background: "#C4E5F2" }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead
                sx={{ background: "#146EA6", border: "1px solid black" }}
              >
                <TableRow>
                  <TableCell sx={{ color: "white" }} align="center">
                    Fecha Emision{" "}
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Fecha vencimiento
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Monto
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Cliente
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Tipo
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {poliza.map(p => (
                  <TableRow
                    key={p.idPolza}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ border: "1px solid white" }}
                      align="center"
                    >
                      {new Date(p.fechaEmision).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid white" }}
                      align="center"
                    >
                      {new Date(p.fechaVencimiento).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid white" }}
                      align="center"
                    >
                      {p.monto}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid white" }}
                      align="center"
                    >
                      {traerCliente(p.idCliente)}
                    </TableCell>
                    <TableCell
                      sx={{ border: "1px solid white" }}
                      align="center"
                    >
                      {traerTipoPoliza(p.idTipo)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Typography>Cargando...</Typography>
      )}
    </Container>
  );
}
