import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';

const AppContext = React.createContext();
const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const randomMealURL = 'htpts://www.themealdb.com/api/json/v1/1/random.php'

const AppProvider = ({children}) => {

  const[loading, setLoading] = useState(false);
  const[meals, setMeals] = useState([]);
  
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

    
  useEffect(() => {
    //fetchData(); // using fetch
    fetchMeals(allMealsURL)
  }, []);

  return <AppContext.Provider value={{loading, meals}}>
    {children}
    </AppContext.Provider>
}

//Create custom hook
export const useGlobalContext = () => {
  return useContext(AppContext);
}

export { AppContext, AppProvider}

