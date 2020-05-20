import React, { Component } from 'react';
import Strelica from './Strelica';
import {connect} from 'react-redux';
import actions from './store/actionCreators/a-auth';
import {Redirect} from 'react-router-dom';
import Spinner from './Spinner';

class Auth extends Component {

  state={
    signIn:{
        password: '',
        email: ''
    },
    signUp: {
        password: '',
        email: ''
    }

   }


   //VAŽNO:Podsjetnik da kad koristimo field declarations ne smijemo staviti const ili let ispred ove arrow fn. kao inače te također moramo korsiti
     //this. ispred imana ove arrow funkcije kad se na nju budeo referirali  za razliku od obične arrow fn.
 
   onSubmitHandler=(event)=>{
            {/* JAKO VAŽNO: ovdje sam incijalno bio prebacio kompletni this.setState pa da mogu mijnjati stanje ovo komponet iz druge komponeta, ali to nije radilo.
         Znači treba prebaciti na ovaj način gdje šaljemo neku fukciju unutar koje se nalazi this.setState  */}
    this.props.sendSignInAndUpForm(event,this.state,()=>{this.setState({signIn: {password: '',email: ''}})})
   }  



   render() {
    
    //VAŽNO: ovaj redirect više nije bitan otkad sam napravio prilagodne u App.js gdje ova Auth kmpnonta nije dostupna nigdje ako smo već signedIn. Dogodii se kad
    //se promjeni signedIn status na true da se prvo re-renda i App.js jer i ona prati signedIn status i onda štoto tamo u singedIn verziji react router nije dostupna
    //ova komponeta niti reduxu neće se re-reanditi i doći do ovoga redircta. Problem tamo riješi unutar App.js <Redirect/> kojemu je sada /auth nepoznata stranici i te
    //nepoznate stranice se šalju na homepage. 
     let redirectToBurgerBuilder= <Redirect form='/auth' exact to='/'/>
     let loading= this.props.loadingStatus ? <div className='zaSpinnerContUAuth'><Spinner/></div> :null
     
        if(!loading){
          return (
            <React.Fragment>
              
               {this.props.signedIn? redirectToBurgerBuilder: null }
            
            
            <div className='contSign-in-up'>
        {/* VAŽNO: ovaj atribut autoComplete sa vrijednošću off služi da se makne automaski browser autocomplete, da ne pamti više ono što je ranije bilo upisano. */}
        <form onSubmit={this.onSubmitHandler} data-option='signIn' autoComplete="off" >
            <h2>Sign In</h2>
            <div className='authInputsCont'>
            <input  type='text'  placeholder='Mail Adress'  value={this.state.signIn.email} 
            // ovdje mi se dogodila situacija gdje mi je dolazila ona poruka da mijenjam input sa controlled na uncontrolled(tj. null mi bude value u nekom trenutku).
            //JAKO VAŽNO: Uzrok tome je što sam svaki put izbrisao password property unutar signIn objekta kad bi updejtao state.
            // Znači react automski updajeta sve top level propertes koji ne promjenimo
            // sa setState, ali ako mijenjamo neki od child objekta kao što je ovdje slučaj treba paziti da ne izbrišemo ostatak propertis u subobjekut kad updajtemo neke
            // druge
             onChange={(event)=>{this.setState({signIn: {email: event.target.value, password: this.state.signIn.password}})}}/>
          <input type='text'  placeholder='Password' value={this.state.signIn.password} 
           onChange={(event)=>{this.setState({signIn: {password: event.target.value, email: this.state.signIn.email}})}}/>
          <button type='submit'>Sign In</button>
            </div>
         
        
      
        </form>

  
        <form onSubmit={this.onSubmitHandler}  data-option='signUp'>
            <h2>Sign Up</h2>
          {/* VAŽNO: kad se ne stavi ovaj value koji ovisi o this.state stanju onda kada se onSubmit ovog forma aktivira onda se ne isprazni input polje iako 
          samo u toj fn. koju event onSubmit pokrene vratio this.state.email i password na empty string. Ovo se zove controled input field
          Čini se da je ovo dosta staviti na jedan form elment da vrijedi za sve. */}
           <div className='authInputsCont'>
            <input type='text' placeholder='Mail Adress'  value={this.state.signUp.email} 
             onChange={(event)=>{this.setState({signUp: {email: event.target.value, password: this.state.signUp.password}})}}/>
          
          <input type='text'  placeholder='Password' value={this.state.signUp.password} 
           onChange={(event)=>{this.setState({signUp:{password: event.target.value, email: this.state.signUp.email}})}}/>
          <button type='submit'>Sign Up</button>
            </div>
         </form>
         
        </div>
         <Strelica/>
    
     </React.Fragment> 
        );
    }

    else{
     return loading
    }
         
  }
      
}

const mapStateToProps=state=>{
    return {
        signedIn: state.auth.signedIn,
        loadingStatus: state.auth.loadingStatus
    }
}

const mapDispatchToProps=dispatch=>{
  
    return{
     sendSignInAndUpForm: (event,authState,promjeniStateInAuth)=>{dispatch(actions.sendSignInAndUpForm(event,authState, promjeniStateInAuth))},
     autoSignInIfToken: (token,userId)=>{dispatch(actions.autoSignInIfToken(token,userId))},
     logOut: ()=>{dispatch(actions.logOut())}
       }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);