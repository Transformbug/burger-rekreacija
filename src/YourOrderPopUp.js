import React from 'react';
import styles from './YourOrderPopUp.module.scss';

function YourOrderPopUp(props) {
    return (
        <React.Fragment>
         <div className={props.popUpActive? 'backdrop': ''}></div>
        <div className={props.popUpActive? [styles.glavniContActive,styles.glavniContNaČekanju].join(' '): styles.glavniContNaČekanju}>
            <h3 className={styles.h3Klasa}>Your Order</h3>
            <p>A delicous burger with following ingredients</p>
            <ul className={styles.ulKlasa}>
                <li>Salad:{props.ingredients.salad}</li>
                <li>Bacon:{props.ingredients.bacon}</li>
                <li>Cheese:{props.ingredients.cheese}</li>
                <li>Meat: {props.ingredients.meat}</li>
            </ul>
              <h4>Total Price: {props.totalPrice.toFixed(2)}</h4>
            <p>Continue to checkout</p>
            <div className={styles.divZaBotune}>
                <button onClick={()=>{props.changeYourOrderPopUp(false)}}>CANCEL</button>
                <button onClick={()=>props.historyOdRoutera.push('/contact-data')}>CONTINUE</button>
            </div>

        </div>
        </React.Fragment>
    );
}

export default YourOrderPopUp;