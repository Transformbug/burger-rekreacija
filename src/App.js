import React from 'react';
import './App.css';
import BurgerIngredient from './BurgerIngredient';
import Auth from './Auth';
import BuildControls from './BuildControls.js';
import Navigation from './Navigation';
import {Route,Switch, Redirect} from 'react-router-dom';
import SideDrawer from './SideDrawer';
import {connect} from 'react-redux';
import actionsAuth from './store/actionCreators/a-auth';
import Orders from './Orders';
import ContactData from './ContactData';


class App extends React.Component {
 
  state={sideDrawerIsShown: false}
 
  constructor(props){
    super(props)
 
 
    let token=localStorage.getItem('token')
    let userId=localStorage.getItem('userId')
    if(token && userId ) {
      this.props.autoSignInIfToken(token, userId)
    //VAŽNO: da ovdje koristim JSON.parse() umjesto da koristim ovaj novi new Date da dobijem stari onda bi bio neki cross origin error. Nema pojma zašto.
    let expirationDate=new Date(localStorage.getItem('expirationDate'))
    let time=expirationDate.getTime()- new Date().getTime()
   //Pazi, setTimout treba pozvait ovu fn., ne ja... 
   setTimeout(this.props.logOut,time)
    }

  }

  
  render() {
  console.log('app.js this props',this.props);
   const ostatak=<React.Fragment> 
    <Navigation 
    logOut={this.props.logOut} 
    signedIn={this.props.signedIn}
    promjeniState={(boolean)=>this.setState({sideDrawerIsShown: boolean})} 
    sideDrawerIsShown={this.state.sideDrawerIsShown}/>
    <SideDrawer
     sideDrawerIsShown={this.state.sideDrawerIsShown} 
    promjeniState={(boolean)=>this.setState({sideDrawerIsShown: boolean})} 
    signedIn={this.props.signedIn}
    logOut={this.props.logOut}
     history={this.props.history}/>
     <div className={this.state.sideDrawerIsShown? 'backdrop': 'displayNoneGeneralno'}></div>
     <Route path='/' exact component={BurgerIngredient}/> 
     <Route path='/' exact component={BuildControls}/> 
     </React.Fragment>

     if (this.props.signedIn){
      return(
        <React.Fragment>
       
           {ostatak}
        <Switch>
          <Route path='/orders' exact component={Orders}/>
          {/* VAŽNO: iako u constructoru već zovemo autoSignInIfToken, nema to veze, kada refresamo incijalno nećemo biti signedIn nego tek kad se obavi taj prvi render 
          ciklus će redux pokrenuti opet ovu komponetu jer se promjenio status signedIn. Iz tog razloga i <Redirecta/> doli unutar else stamenta kada pokušamo
          pristupiti /contact-data tako da izravno upišemo u browser taj path, dogodit će se taj incijali redner refresh render jer to se dogodi kad izravno upišemo neku
          adresu u broswer serach bar i zato nećemo imati pristup ovaj komponeti */}
          <Route path='/contact-data'  component={ContactData}/>
          {/* vidi u Auth.js zašto je ovaj redirect bitan, zašto je onaj tamo izgubio smisao, ali neka stoji... */}
          <Redirect from='/:nepoznataAdresa' to='/'/>

        </Switch>
        </React.Fragment>
      )
     
     }else{
       return(
        <React.Fragment>
         {ostatak}
         <Switch>
      <Route path='/auth' exact component={Auth}/>
         <Redirect from='/:nepoznataAdresa' to='/'/>
         </Switch>
       
        </React.Fragment>

       )
     }

   
  }
}

const mapStateToProps=state=>{
  return{
    signedIn: state.auth.signedIn,
   
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    autoSignInIfToken:(token, userId)=>{dispatch(actionsAuth.autoSignInIfToken(token,userId))},
    logOut:()=>{dispatch(actionsAuth.logOut())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);



