import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, colors } from '@mui/material';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function MostrarTipoPolizas() {

    
    const [tipoPolizas, setTipoPolizas] = useState(null)



    useEffect(() => {
        //Consumo de la API.
        async function traerTipoPolizas() {
            const response = await axios.get(
                "http://localhost:8080/api/tipo_polizas/obtener_todo",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            setTipoPolizas(response.data);
        }

        traerTipoPolizas();
    }, []);




    return (

        <Container sx={{ paddingTop: 5 }}>
            <Typography variant="h2" sx={{background: "#146EA6", justifySelf:"center", mb:2, p:3}}>Tipo de Polizas</Typography>
            {tipoPolizas ? (
                <>

                    <TableContainer component={Paper} >
                        <Table sx={{ minWidth: 650, background: "#C4E5F2" }} size="small" aria-label="a dense table" >
                            <TableHead sx={{ background: "#146EA6", border: "1px solid black" }}>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }} align="center">Descripcion </TableCell>
                                    <TableCell sx={{ color: "white" }} align="center">Nombre</TableCell>
                                    <TableCell sx={{ color: "white" }} align="center">Cobertura Maxima</TableCell>
                                    
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tipoPolizas.map((p) => (
                                    <TableRow
                                        key={p.idTipo}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >

                                        <TableCell sx={{ border: "1px solid white" }} align="center">{p.descripcion}</TableCell>
                                        <TableCell sx={{ border: "1px solid white" }} align="center">{p.nombre}</TableCell>
                                        <TableCell sx={{ border: "1px solid white" }} align="center">{p.coberturaMaxima}</TableCell>
                                        

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
