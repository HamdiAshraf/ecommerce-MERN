import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [error, setError] = useState("");
    
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const { login } = useAuth();


    const navigate=useNavigate()

    const onSubmit = async () => {
        
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if ( !email || !password) {
            return;
        }

        const response = await fetch(`${BASE_URL}/users/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                
                email,
                password,
            }),
        });

        if (!response.ok) {
            setError("Unable to login user, please try different credentials.");
            return;
        }

        const token = await response.json();

        if (!token) {
            setError("Incorrect token");
            return;
        }

        login(email, token);
        navigate("/")
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 4,
                    p: 3,
                    border: 1,
                    borderColor: "#f5f5f5",
                    borderRadius: 2,
                    boxShadow: 1,
                }}
            >
                <Typography variant="h5" sx={{ mb: 3 }}>
                Login to Your Account
                </Typography>

               
                <TextField
                    inputRef={emailRef}
                    label="Email"
                    name="email"
                    type="email"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    inputRef={passwordRef}
                    label="Password"
                    name="password"
                    type="password"
                    fullWidth
                    margin="normal"
                />

                <Button
                    onClick={onSubmit}
                    variant="contained"
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Login
                </Button>

                {error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}
            </Box>
        </Container>
    );
};

export default LoginPage;
