import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid"; 
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import { Box, Button, Typography } from "@mui/material";

const HomePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [error, setError] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/products`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setProducts(data);
            setError(false); // Reset error state on successful fetch
        } catch {
            setError(true);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (error) {
        return (
            <Box 
                sx={{ 
                    padding: 2, 
                    backgroundColor: 'background.paper', // Consistent background color
                    color: 'text.primary', // Consistent text color
                    border: '1px solid', // Add border to distinguish
                    borderColor: 'error.main', // Use error color for border
                    borderRadius: 1, 
                    textAlign: 'center', 
                    mt: 2 
                }}
            >
                <Typography variant="h6">
                    Something went wrong!
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                    Please try again later.
                </Typography>
                <Button variant="contained" onClick={fetchData} color="primary">
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Container sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {products.map(({ _id, image, title, price }) => (
                    <Grid item md={4} key={_id}>
                        <ProductCard _id={_id} image={image} title={title} price={price} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
