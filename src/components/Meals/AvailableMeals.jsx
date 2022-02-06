import React, {useEffect, useState} from 'react';
import classes from "./AvailableMeals.module.css"
import MealItem from './MealItem/MealItem';
import Card from ".././UI/Card"



const AvailableMeals = () => {

  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://react-http-81444-default-rtdb.firebaseio.com/meals.json')
      
      if(!response.ok) throw new Error('Something went wrong')

      const data = await response.json()

      const loadedMeals = [];

      for (const key in data) {
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }

      setMeals(loadedMeals)
      setIsLoading(false)
    }

    fetchMeals().catch(err => {
      setIsLoading(false)
      setHttpError(err.message)
    })
  }, [])

  const mealsList = meals.map(meal => (
    <MealItem 
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (isLoading) return <section className={classes.MealsLoading}>
    <p>Loading...</p>
  </section>

  if (httpError) return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
};

export default AvailableMeals;
