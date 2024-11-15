import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import Mostrar from '../../Mostrar/PolizasM/mostrarPoliza';



export default function Home (){
    const navigate = useNavigate();

    

    return (
        <Grid container spacing={5}>
            <Grid></Grid>
            <Grid item size={12} sx={{justifyItems:"center", paddingTop:5, background:"#146EA6" }} > <Typography variant="h3" sx={{color:"white", fontFamily:"Roboto",paddingBottom:5}}>GESTIONADOR DE PÓLIZAS</Typography></Grid>
            
            <Grid item size={1.5} ></Grid>
            <Grid item size={3} >
            
            </Grid>
            <Grid item size={3} sx={{textAlign:"center"}}><Button 
            sx={{background:"#072040"}}
                fullWidth
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/crear')}
            >
                Crear Póliza
            </Button></Grid>
            
            


            <Mostrar />
            

        </Grid>

        
    )
}