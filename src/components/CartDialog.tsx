import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { useContext } from "react";
import CartContext from "../store/CartContext";

interface CartDialogProps {
  open: boolean;
  onClose: () => void;
}

function CartDialog({ open, onClose }: CartDialogProps) {
  function handleClose() {
    onClose();
  }
  const cartCtx = useContext(CartContext);

  if (!cartCtx) {
    throw new Error("Cart Context is not provided");
  }
  const totalAmount = cartCtx.items.reduce((totalAmount, item) => {
    return totalAmount + item.quantity * item.price;
  }, 0);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm">
      <DialogTitle>Your Cart</DialogTitle>
      <Divider />
      <DialogContent>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {cartCtx.items.map((item) => (
            <li key={item.id} style={{ margin: 0 }}>
              <Typography variant="subtitle1">{item.name}</Typography>
            </li>
          ))}
        </ul>
        <Typography variant="h6">Total: ${totalAmount}</Typography>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button>Proceed to Checkout</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CartDialog;
