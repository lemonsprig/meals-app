import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import Favourites from './components/Favourites';

const AppContext = React.createContext();
const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealURL = 'https://www.themealdb.com/api/json/v1/1/random.php'

const getFavouritesFromLocalStorage = () => {
  let favourites = localStorage.getItem('favourites');
  if(favourites) {
    favourites = JSON.parse(localStorage.getItem('favourites'));
  } else {
    favourites = [];
  }
   
  return favourites;
}

const AppProvider = ({children}) => {

  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favourites, setFavourites] = useState(getFavouritesFromLocalStorage());
  
  // just using fetch API
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  //     const data = await response.json();
  //     console.log(data)
  //   }
  //   catch (error){
  //     console.log(error);
  //   }
  // }

  // Using the Axios API library
  const fetchMeals = async (url) => {
    setLoading(true)
    try {
      const {data} = await axios(url);
      if(data.meals) { 
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    }
    catch (error) {
      console.log(error.resopnse);
    }
    setLoading(false);
  }

  const fetchRandomMeal = () => {
    fetchMeals(randomMealURL)
  }

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    if(favouriteMeal) {
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    } else {
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    
    setSelectedMeal(meal)
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false)
  }

  const addToFavourites = (idMeal) => {
    const alreadyFavourite = favourites.find((meal) => meal.idMeal === idMeal);
    if(alreadyFavourite) return;
    const meal = meals.find((meal) => meal.idMeal === idMeal);
    const updatedFavourites = [...favourites, meal];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  }

  const removeFromFavourites = (idMeal) => {
    const updatedFavourites = favourites.filter((meal) => meal.idMeal !== idMeal);
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites))
  }

  useEffect(() => {
    //fetchData(); // using fetch
    fetchMeals(allMealsURL)
  }, []);
    
  useEffect(() => {
    if(!searchTerm) return
    //fetchData(); // using fetch
    fetchMeals(`${allMealsURL}${searchTerm}`)
  }, [searchTerm]);

  return <AppContext.Provider value={{loading, meals, setSearchTerm, fetchRandomMeal, 
            showModal, selectedMeal, selectMeal, closeModal, favourites, addToFavourites, removeFromFavourites}}>
    {children}
    </AppContext.Provider>
}

//Create custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider}

