import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import styles from './Orders.module.scss';
import Spinner from './Spinner';
import ErrorHandler from './ErrorHandler';
import Strelica from './Strelica';

class Orders extends Component {

    state={
        orders:'',
        loading: true,
        key :null,
        scrollActive: false,
        strelicaNaDnu: false 
    }

 

    componentDidMount(){
        window.addEventListener('scroll', this.handleScrollToElement);

        //Ovdje sam odlučio da nema potrebe u reduxu ništa mijenjiti i dispatht nešto jer ovo podatke ne trebam nigdje drugdje nego ću samo povući ove podatke i iz reduxa izvući 
        //podatke koje treba ovdje, token i userId.
        let token= this.props.token || localStorage.getItem('token')
        let userId=this.props.userId || localStorage.getItem('userId')
       
        axios.get(`https://moj-burger-e5430.firebaseio.com/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`)
        .then((response)=>{
           
            let dataObj=response.data
            let arr=[]
            //VAŽNO: ovdje mi se dogodila zanimljiva situacija gdje su keys unutar ovoga dataObjekta oni random brojevi i slova koju dobije svaka nardužba.
            //Ovako se to riješi kad je riječ o pristupanju, ključno je korisiti for in loop, mogli smo recimo korisiti još Object.keys...
            for(let key in dataObj){
             arr.push({ingredients: dataObj[key].ingredients, price: dataObj[key].price, key: key})  
            }
            this.setState({orders: arr, loading: false})
        }).catch(()=>{
            
            //VAŽNO:ako ne stavimo ovaj .catch, unatoč tome što imamo intrceptor, ova komponte će se nastaviti rendati i doći će do .then ako ne stavimo ovdje ovaj
            //catch i onaće će ract izbaciti svoj error i ne dobijemo našu error poruku. Znači u ErrorHandler komponeti su stavir postvljene na takav način da će
            //se Wrapped componet uvijek rendati i zato uvijek trebimao imati i ovaj catch.
            //Uglavnom nije mi drago ovo omatanje, radije ću imati error kompontu koju će imporati gdje trebam i onda kada dođe do ovog .catch samo ću sa this.sete staviti
            //da je error i onda je aktivirati...
            this.setState({loading: false})
        })
    }

    componentWillUnmount() {
        //bitno je unmounti ovaj scroll kojg postvljamo na window
        window.removeEventListener('scroll', this.handleScrollToElement);
    }
    
     
   handleScrollToElement=()=>{
     

         //ovdje želim vratiti strelicu/animaciju kada se vratimo maksimalno gore tj. kad je scrollY na orginaloj vrijednosti
         if(this.state.strelicaNaDnu && window.scrollY===0){
             this.setState({strelicaNaDnu: false})
         }

        //Ovdje je cilj zaustaviti animcijau one strelice, ostavit je mirnom(ali vidljivom) dok je scroll aktivan 
        this.setState((lastState)=>{
           return  {scrollActive: !lastState.scrollActive}
        })
          
        // console.log('window.innerHeight',window.innerHeight);
        //   //Da, scrollY je vertikalni scroll, uvijek se zbunimo oko toga.Vrijednost mu je nula dok ne pomčmeo scrollati prema dole...
        //   console.log('window scrollY', window.scrollY);
        //   console.log('document.body offsetHeight', document.body.offsetHeight);
   
          //VAŽNo:Ovdje ciljam samo dno stranice tj. točku gdje više ne možemo scrollati.setState će maknuti onda strelicu sa display:none
          //Korismo ovaj document.body.offesetHeight jer body nisam modificirao osim stavljana border-box(block postavu garantira offsetHeight koji je ekvivlanet computed height, border
          //box nije relevatan za to, ne razumijme offsetHeight inline elementa... ) 
          //i sadrži u sebi i header tj. sve elemnte u visini. Tako da je ta visina body elemnta ujedno i samo dno gdje se može scrollati... 
         if(window.innerHeight+window.scrollY===document.body.offsetHeight){
            this.setState({strelicaNaDnu: true})
        } 
        
    }

    render() {
      

        
     if(this.state.orders){
            return (
                <React.Fragment>
                  
               {this.state.orders.map(cur=>{
                  return (
                      //JAKO VAŽNO: nije se za igrati sa onim key errorom. Dok to nisam popravio i gori poslao one unique keys sa servera u state
                      //imao sam ogroman problem gdje bi se ova komponeta rendala kad je path '/' unatoč tome što sam bio i stavio exact unutar Route(sad sam maknio to).
                      //I onda bi se dogodilo da bude iznad onog Burgera, uglavnom key've uvijek treba riješiti...
                      //VAŽNO: onaj trick sa meth random mi nije radio, jer sam ga napisao untuar render metoda, ne ovdje unutar map metode...
                    <div className={styles.glavniCont} key={cur.key}>  
                        <div className={styles.prviRed}>
                        <div>Ingredients:</div> 
                        <div>Salad: ({cur.ingredients.salad})</div>
                        <div>Bacon: ({cur.ingredients.bacon})</div>
                        <div>Cheese: ({cur.ingredients.cheese})</div>
                        <div>Meat: ({cur.ingredients.meat})</div>
                         </div>
                      <div className={styles.drugiRed}>
                          Price:<strong>USD: {cur.price.toFixed(2)}</strong> 
                      </div>
                    </div>
                  ) 
               })}
              <div className={this.state.strelicaNaDnu ? 'displayNoneGeneralno': ''}><Strelica scrollActive={this.state.scrollActive}/></div>
          
             </React.Fragment>
            );
        }
        else if(this.state.loading){
            return <div className={'zaSpinnerContUAuth'}><Spinner /></div>
        } else{
            return null
        }

     } 

        
       
}

const mapStateToProps=(state)=>{
  return{
      token: state.auth.token,
      userId: state.auth.userId
  }
}

export default connect(mapStateToProps,null) (ErrorHandler(Orders, axios));