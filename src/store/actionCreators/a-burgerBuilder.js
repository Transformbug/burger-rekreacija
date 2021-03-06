import actionTypes  from '../randomRedux/actionTypes.js';

const addIngredient=(event)=>{
  //VAŽNO: ovaj .dataset je standardi property na event.target objekut i tamo je sve ono što se nalazi na costom atributima nekog html elementa.
  let ingredient=event.target.dataset.myatri

  return{
      type: actionTypes.ADD_INGREDIENT,
      ingredient: ingredient
  }
}

 const removeIngredient=(event)=>{
  let ingredient=event.target.dataset.myatri
  return{
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingredient
}
}

const restartBurgerAfterOrder=()=>{
  return{
    type: actionTypes.RESTART_BURGER,
    ingredients:{
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
     },
     totalPrice: 4
  }

}


 export default {addIngredient, removeIngredient, restartBurgerAfterOrder}