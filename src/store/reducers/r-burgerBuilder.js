import actionTypes  from '../randomRedux/actionTypes.js';


const intialState={
     ingredients:{
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
   totalPrice: 4
}

const ingredientPrices={
    salad : 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
 };

 //VAŽNO: nikad se ne stavlja break statment u reducere jer ionako stalno returnamo i prekidamo egzekciju funkcije u koje je napisan switch.
 const reducer=(state=intialState,action)=>{
   
    switch (action.type) {
       case actionTypes.ADD_INGREDIENT:
        let temp1=state.totalPrice + ingredientPrices[action.ingredient]
        //VAŽNO: to fixed nam vraća string i treba ga pretvoriti u broj. Sa ovim operatorom * i brojem jedan je to najlaše učiniti jer se možemo ovako nadovezati odmah.
        //PAZI:Vidi flavio copes how to turn string into number, kada ovo radi, kad se ne može koristiti... 
        //VAŽNO: nisam trebao ovdje ovaj toFixed(). ovo nije pomoglo. Ovo sam trebao staviti tamo gdje outputam cijene, unutar BuildControls i tamo sam stavio.
        //Što je totalno očekivano jer prikazujemo taolni zbroj u redux state i onda taj broj može biti problematičan i tu trebamo toFixed
        let newTotalPriceAdd=temp1.toFixed(2) * 1
        let ingredientsCopyAdd={...state.ingredients}
        ingredientsCopyAdd[action.ingredient]=ingredientsCopyAdd[action.ingredient] + 1
       return {...state, totalPrice: newTotalPriceAdd, ingredients: ingredientsCopyAdd}
      
       case actionTypes.REMOVE_INGREDIENT:
         let temp2=state.totalPrice - ingredientPrices[action.ingredient]
         let newTotalPriceRemove=temp2.toFixed(2) * 1
         let ingredientsCopyRemove={...state.ingredients}
         ingredientsCopyRemove[action.ingredient]=ingredientsCopyRemove[action.ingredient] - 1
       return {...state, totalPrice: newTotalPriceRemove, ingredients: ingredientsCopyRemove}
       //VAŽNO: kad ovdje ne returnam incijalni state kad se loada prvi put error, onda mi this.props.ingredinets untar disabled prop-a u BuildControls.js returna error.
       //JAKO VAŽNO: dogodio mi se bio error, gdje iz nekoga razloga činilo se da redux state laže, ali problem je bio u tome što sam ubaciavao ...intialState umjesto ...state.
       //Jasno je da onda neću imati najnovijei redux state...
       case actionTypes.RESTART_BURGER:
         return {...state, ingredients: action.ingredients, totalPrice: action.totalPrice}
         default:
           return {...state}
           
   }
 }

 export default reducer;