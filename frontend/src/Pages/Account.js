import React from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Account({ user }) {
    const navigate = useNavigate();

    return (

        <Box component="form" noValidate autoComplete="off">
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
                        label="User Id"
                        value={user.user_id}
                        readOnly
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        label="First Name"
                        value={user.first_name}
                        readOnly
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        label="Last Name"
                        value={user.last_name}
                        readOnly
                    />
                </Box>

                <Box mb={2}>
                    <TextField
                        label="Username"
                        value={user.username}
                        readOnly
                        autoComplete="off"
                    />
                </Box>

            </Grid>
        </Box>

    );
}

export default Account;
