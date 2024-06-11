import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Box, TextField, Button, Container, Typography } from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });
        if (result?.ok) {
            router.push('/');
        } else {
            alert('Login failed');
        }
    };

    const handleDiscordLogin = () => {
        signIn('discord');
    };

    return (
        <Container maxWidth="sm">
            <Box component="form" onSubmit={handleSubmit} mt={8}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Login
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                    required
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 2 }}>
                    Login
                </Button>
                <Typography variant="h6" component="p" gutterBottom sx={{ mt: 2, textAlign: 'center' }}>
                    Or login with
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleDiscordLogin}
                    sx={{ mt: 2 }}
                >
                    Login with Discord
                </Button>
            </Box>
        </Container>
    );
};

export default Login;
