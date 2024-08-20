import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MealItem from "./MealItem";

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

function MealList() {
  const [meals, setMeals] = useState<Meal[]>([]);
  useEffect(() => {
    const fetchDishes = async () => {
      const url = "http://localhost:3000/meals";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMeals(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
    fetchDishes();
  }, []);

  return (
    <>
      <Grid container spacing={1}>
        {meals.map((meal) => (
          <MealItem
            id={meal.id}
            name={meal.name}
            description={meal.description}
            image={meal.image}
            price={meal.price}
            key={meal.id}
          />
        ))}
      </Grid>
    </>
  );
}
export default MealList;
