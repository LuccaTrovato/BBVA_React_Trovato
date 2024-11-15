import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';

export default function Header() {
  const login = location.pathname === "/"
  const estilos = { backgroundColor: "#023059", textAlign: "left", paddingLeft: 5, paddingTop: 2, paddingBottom: 2 }
  const navigate = useNavigate()



  return (
    <>
      {!login && (
        <Grid container sx={estilos}>
          <Grid item size={4} sx={{textAlign:"left", paddingLeft:2, paddingTop:1  }}> <Button onClick={() => navigate('/home')}><Typography variant="h4" >BBVA Seguros  </Typography> </Button></Grid>

          

          <Grid item size={1} sx={estilos}> <Button sx={{ color: "white" }} onClick={() => navigate('/polizas')}> Pólizas </Button> </Grid>
          <Grid item size={1} sx={estilos}> <Button sx={{ color: "white" }} onClick={() => navigate('/clientes')}> Clientes </Button> </Grid>
          <Grid item size={2} sx={estilos}> <Button sx={{ color: "white" }} onClick={() => navigate('/tipoPolizas')}> Tipos de pólizas</Button></Grid>

          <Grid item size={1} sx={estilos}></Grid>
          <Grid item size={1} sx={estilos}> <Button sx={{ color: "white" }} onClick={() => navigate('/home')}> HOME </Button> </Grid>
          <Grid item size={2} sx={estilos}> <Button sx={{ color: "white" }} onClick={() => navigate('/')}> CERRAR SESION </Button> </Grid>



        </Grid>
      )}
      <Outlet />
    </>
  )
}
