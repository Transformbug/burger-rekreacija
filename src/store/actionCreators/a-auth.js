import actionTypes  from '../randomRedux/actionTypes.js';
import axios from 'axios';





const sendSignInAndUpForm=(event,stateInAuth,promjeniStateInAuth)=>{
     console.log(stateInAuth);
     console.log(promjeniStateInAuth);  

    //VAŽNO:Ovo je anonimana arrow funkcija. Bio sam zasrao i napisao dispatch=()=>{code...} i onda mi je bio error dispatch is not defined jer je naravno očekviao još const/let ispred toga.
    return dispatch=>{
        let option=event.target.dataset.option

        event.preventDefault()
        console.log(event);
        const authData={
            email: stateInAuth.email,
            password: stateInAuth.password,
            returnSecureToken: true
        }
       promjeniStateInAuth()
       let url=null;
       option==='sign-in' ? url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtIEtssRnACoK6EfYc692lET2-NQhkLSM'
                               : url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtIEtssRnACoK6EfYc692lET2-NQhkLSM'
       axios.post(url,authData)
       .then((response)=>{
         
           localStorage.setItem('userId',response.data.localId)
           localStorage.setItem('token',response.data.idToken)
          
          dispatch({type: actionTypes.AUTH_SUCCESS, userId: response.data.localId, token: response.data.idToken, signedIn: true})
         
      
    })
       .catch((err)=>{
           console.log(err)
       }) 

    } 
    
  }

  export default {sendSignInAndUpForm}