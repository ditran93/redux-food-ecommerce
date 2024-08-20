import { Container } from "@mui/material";
import MealList from "./components/MealList";
import Header from "./components/Header";
import { CartContextProvider } from "./store/CartContext";

function App() {
  return (
    <CartContextProvider>
      <Header />
      <Container maxWidth="lg">
        <MealList />
      </Container>
    </CartContextProvider>
  );
}

export default App;
