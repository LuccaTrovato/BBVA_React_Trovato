import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, colors, Card } from '@mui/material';
import axios from 'axios';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function MostrarClientes() {

    const [clientes, setClientes] = useState(null);


    useEffect(() => {
        //Consumo de la API.
        async function traerClientes() {
            const response = await axios.get(
                "http://localhost:8080/api/clientes/obtener_todo",
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                }
            );

            setClientes(response.data);

        }

        traerClientes();
    }, []);


    return (

        <Container sx={{ paddingTop: 5 }}>
            {clientes ? (
                <>

                    
                        <TableContainer component={Paper} >
                            <Table sx={{ minWidth: 650, background: "#C4E5F2" }} size="small" aria-label="a dense table" >
                                <TableHead sx={{ background: "#146EA6", border: "1px solid black" }}>
                                    <TableRow>
                                        <TableCell sx={{ color: "white" }} align="center">Nombre </TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">Apellido</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">DNI</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">CUIL</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">Fecha de Cumpleaños</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">Edad</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">Oficio</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">Nacionalidad</TableCell>
                                        <TableCell sx={{ color: "white" }} align="center">Domicilio</TableCell>

                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {clientes.map((p) => (
                                        <TableRow
                                            key={p.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >

                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.nombre}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.apellido}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.dni}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.cuil}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{new Date(p.fechaCumpleaños).toLocaleDateString()}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.edad}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.oficio}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.nacionalidad}</TableCell>
                                            <TableCell sx={{ border: "1px solid white" }} align="center">{p.domicilio}</TableCell>



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
