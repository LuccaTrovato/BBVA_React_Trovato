import { Typography, TextField } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";
import * as React from "react";
import MostrarClientesIDNombre from "../../Mostrar/ClientesM/MostrarIDNombre/mostarClientes";
import MostrarTipoPolizasIDNoombre from "../../Mostrar/TipoPolizaM/MostrarIdTipoPol/mostrarTipoPoliza";
import { useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import Swal from "sweetalert2";

export default function Crear() {
  const [polizas, setPolizas] = useState({
    fechaEmision: "",
    fechaVencimiento: "",
    monto: "",
    idCliente: "",
    idTipo: "",
  });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPolizas({
      fechaEmision: "",
      fechaVencimiento: "",
      monto: "",
      idCliente: "",
      idTipo: "",
    });
  }, []);
  
  const crearPoliza = async (e) => {
    e.preventDefault();

    try {
      setError(false);
      let response;
      response = await axios.post(
        "http://localhost:8080/api/polizas/crearDTO",
        polizas,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/home")
    } catch (e) {
      setPolizas({
        fechaEmision: "",
        fechaVencimiento: "",
        monto: "",
        idCliente: "",
        idTipo: "",
      });
    }
  };

  /*const alertaCrear = () => {
    Swal.fire({
        title: "Quiere crear la poliza?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Crear",
        denyButtonText: `No Crear`
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Creada!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Poliza no guardada", "", "info");
        }
      });
  };*/

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          background: "#F2F2F2",
          mt: 20,
          mr: 20,
          ml: 20,
          justifyContent: "center",
          paddingTop: 10,
          paddingBottom: 5,
        }}
      >
        <Grid item></Grid>
        <Grid item size={5}>
          <TextField
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            sx={{ background: "#C4E5F2" }}
            type="date"
            label="Fecha de Emisión"
            value={polizas.fechaEmision}
            size="small"
            onChange={(e) =>
              setPolizas({ ...polizas, fechaEmision: e.target.value })
            }
          />
        </Grid>
        <Grid item size={5}>
          <TextField
            InputLabelProps={{ shrink: true }}
            fullWidth
            sx={{ background: "#C4E5F2" }}
            type="date"
            label="Fecha de Vencimiento"
            value={polizas.fechaVencimiento}
            size="small"
            onChange={(e) =>
              setPolizas({ ...polizas, fechaVencimiento: e.target.value })
            }
          />
        </Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6}>
          <NumericFormat
            fullWidth
            sx={{ background: "#C4E5F2" }}
            label="Monto"
            allowNegative={false}
            value={polizas.monto}
            thousandSeparator="."
            customInput={TextField}
            decimalSeparator=","
            decimalScale={0}
            fixedDecimalScale
            displayType="input"
            onValueChange={(values) => {
              const { value } = values;
              setPolizas({ ...polizas, monto: value });
            }}
            size="medium"
          />
        </Grid>
        <Grid item size={3}></Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6}>
          <NumericFormat
            fullWidth
            sx={{ background: "#C4E5F2" }}
            label="ID Cliente"
            allowNegative={false}
            value={polizas.idCliente}
            thousandSeparator="."
            customInput={TextField}
            decimalSeparator=","
            decimalScale={0}
            fixedDecimalScale
            displayType="input"
            onValueChange={(values) => {
              const { value } = values;
              setPolizas({ ...polizas, idCliente: value });
            }}
            size="medium"
          />
        </Grid>
        <Grid item size={3}></Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6}>
          <NumericFormat
            fullWidth
            sx={{ background: "#C4E5F2" }}
            label="ID Tipo de Póliza"
            allowNegative={false}
            value={polizas.idTipo}
            thousandSeparator="."
            customInput={TextField}
            decimalSeparator=","
            decimalScale={0}
            fixedDecimalScale
            displayType="input"
            onValueChange={(values) => {
              const { value } = values;
              setPolizas({ ...polizas, idTipo: value });
            }}
            size="medium"
          />
        </Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6} sx={{ background: "#072040" }}>
          <Button sx={{ color: "white" }} fullWidth onClick={crearPoliza}>
            Guardar
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item size={12} sx={{ justifyItems: "center" }}>
          {error && (
            <Typography sx={{ background: "red", mt: 3 }} variant="h3">
              ERROR, No se cargo la Póliza
            </Typography>
          )}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item size={6}>
          <MostrarTipoPolizasIDNoombre />
        </Grid>
        <Grid item size={6}>
          <MostrarClientesIDNombre />
        </Grid>
      </Grid>
    </div>
  );
}
