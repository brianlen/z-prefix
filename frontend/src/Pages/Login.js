import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Login({ setUser }) {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();

        const requestBody = {
            username: username,
            password: password
        }

        // fetch POST to compare password with the encryptedPassword
        fetch('http://localhost:8080/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(userData => {
                setUser(userData);
                localStorage.setItem('user', JSON.stringify(userData));
            })
            .then(() => navigate('/inventory'))
    };

    return (
        
        <Box component="form" onSubmit={handleSubmit} noValidate autoComplete="off">

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                style={{ minHeight: '80vh' }}
            >

                <Box mb={2}>
                    <TextField
                        label="Username"
                        defaultValue="johndoe"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

                <Button type="submit" variant="contained">Login</Button>

            </Grid>
        </Box>

    );
}

export default Login;
