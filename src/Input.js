import React from 'react';
import styles from './Input.module.scss';

function Input(props) {
  let invalidKlasa1=''; 
  let invalidKlasa2=''
if(!props.isValid) {
   invalidKlasa1=styles.notActiveAnymoreAndInvaild
   invalidKlasa2=styles.focusOnlyRedBorder
}
let invalidStilovi=[invalidKlasa1,invalidKlasa2].join(' ')

 let input;   
 switch(props.type){
  case 'text':
    input= <input placeholder={props.placeholder}  value={props.value} className={props.touched ? invalidStilovi : '' } onChange={props.inputChangeHandler}/>
    break;
  case 'select':
        //Ovaj name property na selctu mi ne triba jer ne šaljem sa onSubmit default zahtjev i quary params, ali eto stavio sam ga ovdje.
        //Također jedino je ovaj element koji ima default true kao vrijednost isValida jer će svako biti valid....
       input=<select name={props.typeSpecificInfo.name} value={props.value} onChange={props.inputChangeHandler} className={styles.zaFokusSelect}>
          {props.typeSpecificInfo.option.map((cur)=>{
             return <option key={cur}>{cur}</option>
          })}
      </select> 
 }


  return input
}

export default Input;