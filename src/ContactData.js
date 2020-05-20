import React, { Component } from 'react';
import styles from './ContactData.module.scss';
import Input from './Input';
import axios from 'axios';
import {connect} from 'react-redux';
import Spinner from './Spinner';
import actions from './store/actionCreators/a-burgerBuilder';
import { Redirect } from 'react-router';
import Strelica from './Strelica';

class ContactData extends Component {
  
    state={
     formData:{
          name:{
            type: 'text',
            placeholder: 'Name', 
            value: '',
            isValid: false,
            touched: false    
          },
         street:{
          type: 'text',   
          placeholder: 'Street', 
          value: '',
          isValid: false,
          touched: false     
         },
         zipCode:{
          type: 'text',      
          placeholder: 'Zip-Code', 
          value: '',
          isValid: false,
          touched: false,
          typeSpecificInfo: ''       
         },
         country:{
          type: 'text',      
          placeholder: 'Country', 
          value: '',
          isValid: false,
          touched: false, 
          typeSpecificInfo: ''       
         },
         email:{
          type: 'text',      
          placeholder: 'Email', 
          value: '',
          isValid: false,
          touched: false,
          typeSpecificInfo: ''     
         },
         deliveryOption:{
            type: 'select',
            placeholder: '', 
            value: '',
            isValid: true,
            touched: false,
            typeSpecificInfo:{option: ['Fastest', 'Cheapest'], name: 'delivery'}    
         }   

     },
     loading: false,
     orderd: false   
      


  }
 

  inputChangeHandler=(event,key)=>{
    let copyFormData={...this.state.formData}      
    let objInFormData={...this.state.formData[key]}
    objInFormData.touched=true
    objInFormData.value=event.target.value 
    let isValid=this.checkValidity(event,key)
    objInFormData.isValid=isValid
    //JAKO VAŽNO: ne mogu vjeroavati, ali ovo sam prvi put ovdje primjetio. Kada sam slučajno stavio ovaj spread operator na drugom mjesto u objektu tj. kad je bio obrnu redoslijed
    // onda bi ovewirta ovaj objInFormData sa onim što je već bilo u state. Znači kad je riječ o ovewirtianju objekt propertiesa redoslijed je bitan, nema veze što je spread...
    this.setState({formData:{...copyFormData,[key]: objInFormData}})
    
 
 } 


  checkValidity=(event,key)=>{
   let valueTrimed=event.target.value.trim()
    if(key==='email'){
   let regExEmail=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regExEmail.test(String(valueTrimed).toLowerCase());
  }
   if(key==='zipCode'){
       let regExUsZipCode=/^\d{5}(-\d{4})?(?!-)$/
      return regExUsZipCode.test(String(valueTrimed).toLowerCase()) 
   }
    else{
     return valueTrimed!==''? true: false
   }

  
}


pošaljiNarudžbu=(event)=>{
  
    event.preventDefault()

    const order={
        ingredients: this.props.ingredients,
        price: this.props.totalPrice,
        orderData: {...this.state.formData},
        userId: this.props.userId || localStorage.getItem("userId")
       }

       this.setState({loading: true, orderd: false})
       
      //VAŽNO: možemo poslati bilo koji objekt kao drugi argumet ovdje. Nije bitan sadržaj, samo mora biti objekt.
       //JAKO VAŽNO!!!: ovo doli NE radi, radi ovoga sam imao ogromni problem koji bi se dogodio kad bi vrijednost this.state.token bila null.
       // axios.post("https://react-my-burger-47b75.firebaseio.com/orders.json?auth="+this.state ||localStorage.getItem("token"), order)
       //Očito se ovaj link pošalje prije evalucije izraza. Zato ovo doli RADI, vidi gori fn. vidiŠtojeLogiraniKorinskNaručioDosadSve:
       //  let orToken=this.state.token|| localStorage.getItem("token")
       //  axios.post("https://react-my-burger-47b75.firebaseio.com/orders.json?auth="+orToken, order)
       //Radi se o tome da varijabla dobije već rezultat expressiona null ||'stringToken'(za slučaj kad je this.state.token null) i zato radi dok ono gori ne radi.
       //Čak radi i ovo:
       axios.post("https://moj-burger-e5430.firebaseio.com/orders.json?auth="+ localStorage.getItem("token") , order)
       
       .then(response=>{
           console.log('pošalji nardužbu response',response);
           this.setState({loading: false,orderd: true})
           this.props.restartBurgerAfterOrder()
          
           })
       .catch(err=>console.log(err))
}


    render() {
        
        //U state nema array, pa da bi mogli korisit map built in metodu i outputat react list ovo radimo.
        let inputConfigArr=[]
        let temp=[]
        
       for(let key in this.state.formData){
         inputConfigArr.push(
             {key: key, inputInfoObj: this.state.formData[key]}
         )
         temp.push(this.state.formData[key].isValid)
       } 

    let allValidAndFormCanBeSubmmited=temp.every((cur)=> cur===true)
    
         if(!this.state.loading && !this.state.orderd){
            return (
                <form className={styles.formCont} onSubmit={this.pošaljiNarudžbu}>
                    <h3>Please enter your Contact data</h3>
                {inputConfigArr.map(cur=>{
                    return <Input
                     key={cur.key}
                     //VAŽNO: ovdje sam se mislio kako ću u inputChangeHandler fn. znati koji od kojeg točno inputa je onChange aktivirao tu fukciju. Mislio sam se hoću li
                     //korisiti refs tj. jel bi mi oni moglu poslužiti. Znam da sam defintivno mogao korisiti data-customATribut u Input.js i prebaciti podatke tamo.
                     //Ali ovo je najbolje rješenje gdje ovo odmah to obavim i prebacim. Ujedno mi dobro posluži kao unique key za koji mora dobiti svaki jsy u array za list...
                     inputChangeHandler={(event)=>{this.inputChangeHandler(event,cur.key)}}
                     type={cur.inputInfoObj.type}
                     placeholder={cur.inputInfoObj.placeholder} 
                     value={cur.inputInfoObj.value} 
                     isValid={cur.inputInfoObj.isValid} 
                     touched={cur.inputInfoObj.touched}
                     typeSpecificInfo={cur.inputInfoObj.typeSpecificInfo} />
                })}
                <button type='submit' disabled={!allValidAndFormCanBeSubmmited} className={styles.botun}>ORDER</button>
                <Strelica/>
                </form>
               
            
        );
         }
         else if(!this.state.loading && this.state.orderd){
             return <Redirect from='/contact-data' to='/'/>
        } 
        else{
            return <div className='zaSpinnerContUAuth'><Spinner/></div>
        }
      
    }
}

const mapStateToProps=state=>{
    return{
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        userId: state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        restartBurgerAfterOrder: ()=>{dispatch(actions.restartBurgerAfterOrder())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ContactData);