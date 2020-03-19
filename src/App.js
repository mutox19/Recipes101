import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipe';

const App = () => {

  const APP_ID = "37635877";
  const APP_KEY = "68b80e645bef66ab648f8b3abaf3a036";
  

  //uses the state in an empty array
  const [recipes, setRecipes] = useState([]);
  //use the state in a empty string
  const [search, setSearch] = useState('');

  const [query, setQuery] = useState('Chicken');
  const exampleReq = 
  `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  useEffect(() => {

    GetRecipes();
    
  }, [query]);


  //async method 
  const GetRecipes = async () => {
    const response = await fetch(exampleReq);
    const data = await response.json();
    setRecipes(data.hits);
    
  }


  //this is an event method
  const UpdateSearch = e => {

    setSearch(e.target.value);
  }
  
  const GetSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <header>
        <title>Search For A Recipe</title>
      </header>
      <form onSubmit={GetSearch} className="search-form">
        <input type="text" className="search-bar" value={search} onChange={UpdateSearch}></input>
        <button type="submit" className="search-button">Search</button>
      </form>
      <h1 className="allRecipes">All Recipes</h1>
      <div className="recipes">

      {recipes.map(myRecipe => ( 
      <Recipe key= {myRecipe.recipe.label}
      title={myRecipe.recipe.label} 
      calories={myRecipe.recipe.calories}
      image={myRecipe.recipe.image} 
      ingredients={myRecipe.recipe.ingredients}/> ))}

      </div>
      
    </div>
  );
};

export default App;
