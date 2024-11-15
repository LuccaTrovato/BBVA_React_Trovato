import { Typography, TextField } from "@mui/material";

import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import * as React from "react";

import MostrarClientesIDNombre from "../../Mostrar/ClientesM/MostrarIDNombre/mostarClientes";
import MostrarTipoPolizasIDNoombre from "../../Mostrar/TipoPolizaM/MostrarIdTipoPol/mostrarTipoPoliza";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";


export default function Editar() {
  const [polizas, setPolizas] = useState({
    idPoliza: "",
    fechaEmision: "",
    fechaVencimiento: "",
    monto: "",
    idCliente: "",
    idTipo: "",
  });
  const { idPoliza } = useParams();
  const [error, setError] = useState(false);
  const [erorres, setErrores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const traerPolizaId = async (idPoliza) => {
      const response = await axios.get(
        `http://localhost:8080/api/polizas/obtener_por_id/${idPoliza}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setPolizas({
        idPoliza: response.data.idPoliza,
        fechaEmision: response.data.fechaEmision,
        fechaVencimiento: response.data.fechaVencimiento,
        monto: response.data.monto,
        idCliente: response.data.idCliente.id,
        idTipo: response.data.idTipo.idTipoPoliza,
      });
    };

    traerPolizaId(idPoliza);
  }, []);

  const editar = async (idPoliza) => {
    try {
      let response;
      response = await axios.put(
        `http://localhost:8080/api/polizas/actualizarDTO/${idPoliza}`,
        polizas,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      navigate("/home");
    } catch (error) {
      setError(true);
    }

    setPolizas({
      idPoliza: "",
      fechaEmision: "",
      fechaVencimiento: "",
      monto: "",
      idCliente: "",
      idTipo: "",
    });

    
  };
  const alertaEditar = (idPoliza) => {
    Swal.fire({
      title: "Desea actualizar la poliza?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      denyButtonText: `No Actualizar`,
      cancelButtonText:"Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Actualizada!", "", "success");
        editar(idPoliza);
      } else if (result.isDenied) {
        Swal.fire("No se actualizo", "", "info");
      }
    });
  };

  return (
    <div>
      <Grid
        container
        spacing={3}
        sx={{
          background: "#F2F2F2",
          mt: 2,
          marginLeft: 30,
          marginRight: 30,
          justifyContent: "center",
          p: 3,
        }}
      >
        <Grid item size={12} sx={{ justifyItems: "center" }} fullWidth>
          {" "}
          <Typography variant="h3" sx={{ color: "black" }}>
            {" "}
            Editar Poliza
          </Typography>
        </Grid>

        <Grid item size={3}></Grid>

        <Grid item size={6}>
          <TextField
            fullWidth
            sx={{ background: "#C4E5F2" }}
            id="outlined-number"
            label="ID Poliza"
            type="number"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            value={polizas.idPoliza}
            onChange={(e) =>
              setPolizas({ ...polizas, idPoliza: e.target.value })
            }
          />
        </Grid>
        <Grid item size={3}></Grid>
        <Grid item size={5}>
          <TextField
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
          <TextField
            fullWidth
            sx={{ background: "#C4E5F2" }}
            id="outlined-number"
            label="Monto"
            type="number"
            value={polizas.monto}
            onChange={(e) => setPolizas({ ...polizas, monto: e.target.value })}
          />
        </Grid>
        <Grid item size={3}></Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6}>
          <TextField
            fullWidth
            sx={{ background: "#C4E5F2" }}
            id="outlined-number"
            label="ID Cliente"
            type="number"
            onChange={(e) =>
              setPolizas({ ...polizas, idCliente: e.target.value })
            }
            value={polizas.idCliente}
          />
        </Grid>
        <Grid item size={3}></Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6}>
          <TextField
            fullWidth
            sx={{ background: "#C4E5F2" }}
            id="outlined-number"
            label="ID Tipo"
            type="number"
            onChange={(e) => setPolizas({ ...polizas, idTipo: e.target.value })}
            value={polizas.idTipo}
          />
        </Grid>
        <Grid item size={3}></Grid>

        <Grid item size={6} sx={{ background: "#072040" }}>
          <Button
            sx={{ color: "white" }}
            type="submit"
            fullWidth
            onClick={() => alertaEditar(polizas.idPoliza)}
          >
            Guardar
          </Button>
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
