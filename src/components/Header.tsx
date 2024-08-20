import { Box, Button, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import CartContext from "../store/CartContext";
import CartDialog from "./CartDialog";

function Header() {
  const cartCtx = useContext(CartContext);
  if (!cartCtx) {
    throw new Error("Cart Context is not provided");
  }
  const totalCartItemsQuantity = cartCtx.items.reduce((totalQuantity, item) => {
    return totalQuantity + item.quantity;
  }, 0);

  const [openCartDialog, setOpenCartDialog] = useState(false);

  function handleOpenCartDialog() {
    setOpenCartDialog(true);
  }

  return (
    <Box
      sx={{
        height: 100,
        pb: 5,
        pt: 5,
        px: 20,
        mb: 2,
        backgroundColor: "black",
      }}
    >
      <Stack direction="row" justifyContent="center">
        <Box display="flex" flex="1">
          <Typography variant="h3" sx={{ color: "yellow" }}>
            React Food
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          onClick={handleOpenCartDialog}
        >
          Cart({totalCartItemsQuantity})
        </Button>
      </Stack>
      <CartDialog
        open={openCartDialog}
        onClose={() => setOpenCartDialog(false)}
      />
    </Box>
  );
}

export default Header;
