import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    const response = await fetch(
      'https://react-http-9db1f-default-rtdb.firebaseio.com/meals.json'
    );

    const data = await response.json();

    const temp = [];
    for (const meal in data) {
      temp.push({
        id: meal,
        name: data[meal].name,
        description: data[meal].description,
        price: data[meal].price,
      });
    }

    setMeals(temp);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMeals().catch((e) => {
      setIsLoading(false);
      setError(e.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsLoading}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
