import { Grid, Stack, Typography, Box, Button } from "@mui/material";
import { useContext } from "react";
import CartContext from "../store/CartContext";

interface MealItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
function MealItem({ id, name, description, price, image }: MealItemProps) {
  const cartCtx = useContext(CartContext);
  if (!cartCtx) {
    throw new Error("Cart Context is not provided");
  }
  function handleAddMealToCart() {
    cartCtx?.addItem({ id: id, name, price, quantity: 1 });
  }
  return (
    <Grid item lg={4} key={id}>
      <Stack
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: "300px",
          height: "600px",
          backgroundColor: "black",
          padding: 2,
        }}
      >
        <img
          src={`http://localhost:3000/${image}`}
          alt={name}
          style={{ width: "300px", height: "300px" }}
        />

        <Typography variant="h5" sx={{ textAlign: "center" }}>
          {name}
        </Typography>
        <Box
          sx={{ backgroundColor: "#778899", width: 100 }}
          display="flex"
          justifyContent="center"
        >
          <Typography variant="subtitle1" color="yellow">
            ${price}
          </Typography>
        </Box>

        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          {description}
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddMealToCart}
        >
          Add to Cart
        </Button>
      </Stack>
    </Grid>
  );
}

export default MealItem;
