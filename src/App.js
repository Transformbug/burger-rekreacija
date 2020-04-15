import React from 'react';

import './App.css';
import BurgerIngredient from './BurgerIngredient';
import Auth from './Auth';
import BuildControls from './BuildControls.js';

function App() {

 

  return (
    <div >
     <BurgerIngredient/>
   
        <Auth/>
       <BuildControls/>
    </div>
  );
}

export default App;
