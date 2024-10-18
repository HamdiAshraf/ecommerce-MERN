import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/auth/AuthContext";

const RegisterPage = () => {
    const [error, setError] = useState("");
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const { login } = useAuth();

    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!firstName || !lastName || !email || !password) {
            return;
        }

        const response = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            }),
        });

        if (!response.ok) {
            setError("Unable to register user, please try different credentials.");
            return;
        }

        const token = await response.json();

        if (!token) {
            setError("Incorrect token");
            return;
        }

        login(email, token);
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
                    Register New Account
                </Typography>

                <TextField
                    inputRef={firstNameRef}
                    label="First Name"
                    name="firstName"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    inputRef={lastNameRef}
                    label="Last Name"
                    name="lastName"
                    fullWidth
                    margin="normal"
                />
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
                    Register
                </Button>

                {error && <Typography sx={{ color: "red", mt: 2 }}>{error}</Typography>}
            </Box>
        </Container>
    );
};

export default RegisterPage;
