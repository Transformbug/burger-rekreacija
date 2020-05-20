import actionTypes  from '../randomRedux/actionTypes.js';
import axios from 'axios';

const loadingStatusChange=(boolean)=>{
    return{
        type: actionTypes.LOADING_STATUS,
        value: boolean 
    }
}

const sendSignInAndUpForm=(event,stateInAuth,promjeniStateInAuth)=>{
 

    //VAŽNO:Ovo je anonimana arrow funkcija. Bio sam zasrao i napisao dispatch=()=>{code...} i onda mi je bio error dispatch is not defined jer je naravno očekviao još const/let ispred toga.
    return dispatch=>{
      
       event.preventDefault()
      
       dispatch(loadingStatusChange(true))
       
       let option=event.target.dataset.option
      
        const authData={
            email: stateInAuth[option].email,
            password: stateInAuth[option].password,
            returnSecureToken: true
        }
       promjeniStateInAuth()
       let url=null;
       option==='signIn' ? url=`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_MOJ_FIREBASE_KEY}`
                               : url=`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_MOJ_FIREBASE_KEY}`
       axios.post(url,authData)
       .then((response)=>{
        
        
        let expirationDate=new Date(new Date().getTime()+ response.data.expiresIn * 1000)
        localStorage.setItem('expirationDate', expirationDate)
        //Ovu funkcije definiram ovdje da imma pristupa dispach-u bez da kreiramo novu fukciju u nekom mapDisptahcToProps...
        const setTimeoutLogOut=()=>{
            dispatch(logOut())
          }
       
       let time=expirationDate.getTime() - new Date().getTime()   
       setTimeout(setTimeoutLogOut,time)

       dispatch(loadingStatusChange(false))

        localStorage.setItem('userId',response.data.localId)
       localStorage.setItem('token',response.data.idToken)
          
          dispatch({type: actionTypes.AUTH_SUCCESS, userId: response.data.localId, token: response.data.idToken, signedIn: true})
         
      
    })
       .catch((err)=>{
           console.log(err)
       }) 

    } 
    
  }

  const  autoSignInIfToken=(token,userId)=>{
      return{
          type: actionTypes.AUTH_SUCCESS,
          signedIn: true,
          token: token,
          userId: userId

      }
  }




  
 const logOut=()=>{
    //ako mi zatreba općetina verzija
//    localStorage.clear();

   localStorage.removeItem('token');
   localStorage.removeItem('userId');
   localStorage.removeItem('expirationDate')
  return {type: actionTypes.LOGOUT, token: null, userId: null,signedIn: false}
}


  export default {sendSignInAndUpForm, autoSignInIfToken,logOut}