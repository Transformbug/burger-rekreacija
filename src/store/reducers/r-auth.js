import actionTypes  from '../randomRedux/actionTypes.js';

const intialState={
    signedIn: false,
    token: null,
    userId: null,
    loadingStatus: false
}



 //VAŽNO: nikad se ne stavlja break statment u reducere jer ionako stalno returnamo i prekidamo egzekciju funkcije u koje je napisan switch.
 const reducer=(state=intialState,action)=>{
   
    switch (action.type) {
       case actionTypes.AUTH_SUCCESS:
       return {...state, token: action.token, userId: action.userId, signedIn: action.signedIn }
       case actionTypes.LOGOUT:
       return {...state, token: action.token, userId: action.userId, signedIn: action.signedIn}
       case actionTypes.LOADING_STATUS: 
       return {...state, loadingStatus: action.value}  
         default:
           return {...state}
           
   }
 }

 export default reducer;