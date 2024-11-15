import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { blue } from '@mui/material/colors';




export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });
    const [error, setError] = useState(false);

    const navigate = useNavigate()



    useEffect(() => {
        setUser({ username: "", password: "" });
    }, []);

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:8080/auth/login",
                {},
                {
                    headers: {
                        username: user.username,
                        password: user.password,
                    },
                }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/home")

        } catch (error) {
            setError(true)
            setUser({
                username: "",
                password: "",
            });
        }

    };

    return (
        <div >
            <Grid container spacing={2} sx={{ justifyContent: "center", alignContent: "center" }} >
                <Grid item size={12} sx={{ padding: 10 }}></Grid>

                <Grid container sx={{ backgroundColor: "rgba(255,255,255,0.8)" }}>
                    <Grid item size={12} sx={{ justifyItems: "center" }}> <Typography variant="h4" sx={{ paddingTop: 3, color: "#021F59" }} gutterBottom>Iniciar Sesión</Typography></Grid>
                    <Grid item size={2} ></Grid>
                    <Grid item size={4}  >
                        <Grid container sx={{ alignItems: "center", background: "lightblue" }}>
                            <TextField
                                fullWidth
                                label="Usuario"
                                variant='filled'
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                            />
                        </Grid>
                    </Grid>
                    <Grid item size={4} >
                        <Grid container sx={{ alignItems: "center", background: "lightblue" }}>
                            <TextField
                                fullWidth
                                label="Contraseña"
                                type="password"
                                variant='filled'
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}

                            />
                        </Grid>
                    </Grid>

                    <Grid item size={4.75} ></Grid>
                    <Grid item size={2.5}>
                        <Grid container sx={{ justifyContent: "center", paddingBottom: 3, paddingTop: 3 }}>

                            <Button
                                sx={{ border: "1px solid black", background: "#021F59" }}
                                fullWidth
                                type='submit'
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                            >
                                Ingresar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item size={12} sx={{ justifyItems: "center"}}>{error && (
                    <h1 style={{ background:"red",color: "white", fontFamily: "Roboto", padding:10 }}>Usuario Incorrecto</h1>)}
                </Grid>
            </Grid>

        </div>


    );
};
