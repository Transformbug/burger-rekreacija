import React, { Component } from 'react';
import axios from 'axios';

class Auth extends Component {

  state={
      email: '',
      password: '',
      signedIn: false,
      token: null,
      userId: null
  }

 //Ovu fukcicije ne zove nigdje, samo to služi kao mogućnost da vidim /ingredients. Uglavnom ingredients uvijek budu isti na serveru i to se ne modficira.
  vidiIngredientsNaServeru=()=>{
 
         axios.get('https://react-my-burger-47b75.firebaseio.com/ingredients.json')
        .then((response)=>{
           console.log('vidiIngredientsNaServeru',response);
        
        })
      
    
}

vidiŠtojeLogiraniKorisnikNaručioDosadSve=()=>{

    let token= this.state.token || localStorage.getItem('token')
    let userId=this.state.userId || localStorage.getItem('userId')
    axios.get(`https://react-my-burger-47b75.firebaseio.com/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
    .then((response)=>{
        console.log('vidiŠtojeLogiraniKorinskNaručioDosadSve',response);
    })
}

pošaljiNarudžbu=()=>{

    const order={
        ingredients: {bacon: 10, cheese: 10, meat: 10, salad: 10},
        price: 500,
        orderData: {ante: 'bezveze'},
        userId: this.state.userId || localStorage.getItem("userId")
       }
       
      //VAŽNO: možemo poslati bilo koji objekt kao drugi argumet ovdje. Nije bitan sadržaj, samo mora biti objekt.
       //JAKO VAŽNO!!!: ovo doli NE radi, radi ovoga sam imao ogromni problem koji bi se dogodio kad bi vrijednost this.state.token bila null.
       // axios.post("https://react-my-burger-47b75.firebaseio.com/orders.json?auth="+this.state ||localStorage.getItem("token"), order)
       //Očito se ovaj link pošalje prije evalucije izraza. Zato ovo doli RADI, vidi gori fn. vidiŠtojeLogiraniKorinskNaručioDosadSve:
       //  let orToken=this.state.token|| localStorage.getItem("token")
       //  axios.post("https://react-my-burger-47b75.firebaseio.com/orders.json?auth="+orToken, order)
       //Radi se o tome da varijabla dobije već rezultat expressiona null ||'stringToken'(za slučaj kad je this.state.token null) i zato radi dok ono gori ne radi.
       //Čak radi i ovo:
       axios.post("https://react-my-burger-47b75.firebaseio.com/orders.json?auth="+ localStorage.getItem("token") , order)
       
       .then(response=>{
           console.log('pošalji sastojeke response',response);
          
           })
       .catch(err=>console.log(err))
}

     //VAŽNO:Podsjetnik da kad koristimo field declarations ne smijemo staviti const ili let ispred ove arrow fn. kao inače te također moramo korsiti
     //this. ispred imana ove arrow funkcije kad se na nju budeo referirali  za razliku od obične arrow fn.
   sendSignInAndUpForm=(event,option)=>{
        event.preventDefault()
        console.log(event);
        const authData={
            email: this.state.email,
            password: this.state.password,
            returnSecureToken: true
        }
       this.setState({password: '', email:''})
       let url=null;
       option==='sign-in' ? url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBtIEtssRnACoK6EfYc692lET2-NQhkLSM'
                               : url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBtIEtssRnACoK6EfYc692lET2-NQhkLSM'
       axios.post(url,authData)
       .then((response)=>{
           //VAŽNO:Podsjetnik da axsiso automski obavi onu .json trasformaciju, zato ovdje odmah imamo response
          
            console.log('sendSignInAndUpForm',response)
           localStorage.setItem('userId',response.data.localId)
           localStorage.setItem('token',response.data.idToken)
          
          
           this.setState({userId: response.data.localId, token: response.data.idToken, signedIn: true})
         
      
})
       .catch((err)=>{
           console.log(err)
       }) 
      }

      logOut=()=>{
             //ako mi zatreba općetina verzija
        //    localStorage.clear();
            console.log('logout fuckija');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
         this.setState({token: null, userId: null, email: '', password: '',signedIn: false})
      }


      componentDidMount(){
          if(localStorage.getItem('token') && localStorage.getItem('userId')) this.setState({signedIn: true})
      }


   render() {
   
        return (
            <React.Fragment>
            <div className='contSign-in-up'>
        {/* VAŽNO: ovaj atribut autoComplete sa vrijednošću off služi da se makne automaski browser autocomplete, da ne pamti više ono što je ranije bilo upisano. */}
        <form onSubmit={(event)=>this.sendSignInAndUpForm.call(this,event,'sign-in')} autoComplete="off" >
            <h2>Sign In</h2>
            <div className='authInputsCont'>
            <input type='text' placeholder='Mail Adress'  value={this.state.email}  onChange={(event)=>{this.setState({email: event.target.value})}}/>
          <input type='text'  placeholder='Password' value={this.state.password}  onChange={(event)=>{this.setState({password: event.target.value})}}/>
          <button type='submit'>Sign In</button>
            </div>
         
        
        <div style={{color: 'red'}}>{this.state.signedIn? 'Signed In': 'Enter email and pasword to sign in'}</div>
        </form>
          
        <form onSubmit={(event)=>this.sendSignInAndUpForm.call(this,event,'sign-up')}>
            <h2>Sign Up</h2>
          {/* VAŽNO: kad se ne stavi ovaj value koji ovisi o this.state stanju onda kada se onSubmit ovog forma aktivira onda se ne isprazni input polje iako 
          samo u toj fn. koju event onSubmit pokrene vratio this.state.email i password na empty string. Ovo se zove controled input field
          Čini se da je ovo dosta staviti na jedan form elment da vrijedi za sve. */}
           <div className='authInputsCont'>
            <input type='text' placeholder='Mail Adress'  value={this.state.email}  onChange={(event)=>{this.setState({email: event.target.value})}}/>
          <input type='text'  placeholder='Password' value={this.state.password}  onChange={(event)=>{this.setState({password: event.target.value})}}/>
          <button type='submit'>Sign Up</button>
            </div>
         </form>
         
        </div>
         
         <div ><button onClick={this.pošaljiNarudžbu}>Pošalji narudžbu</button></div>
         <div ><button onClick={this.vidiŠtojeLogiraniKorisnikNaručioDosadSve}>Vidi što je logirani korisnik naručio dosad</button></div>
         <div ><button onClick={this.logOut}>Odlogijra se, logout</button></div>
            
            
            
            </React.Fragment> 
        );
    }
}

export default Auth;