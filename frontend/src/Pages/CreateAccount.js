import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function CreateAccount({ setUser }) {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        // encrypt the password using bcryptjs
        const saltRounds = 10;
        const encryptedPassword = await bcrypt.hash(password, saltRounds);

        const requestBody = {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: encryptedPassword
        }

        // fetch POST to add new user account
        fetch('http://localhost:8080/createAccount', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(account => setUser(account))
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
                    <Button variant="contained" color="primary" onClick={() => navigate('/inventory')}><ArrowBackIcon /></Button>
                </Box>

                <Box mb={2}>
                    <TextField
                        label="First Name"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{marginRight: '10px'}}
                    />

                    <TextField
                        label="Last Name"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        label="Username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{marginRight: '10px'}}
                    />

                    <TextField
                        label="Password"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>

                <Button type="submit" variant="contained">Create Account</Button>
            </Grid>
        </Box>

    );
}

export default CreateAccount;
