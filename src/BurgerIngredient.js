import React, { Component } from 'react';
import styles from './BurgerIngredient.module.css';

class BurgerIngredient extends Component {


 

    render() {
        return (
            <div className={styles.box}>
                <div className={styles.BreadTop}>
                    <div className={styles.Seeds1}></div>
                    <div className={styles.Seeds2}></div>
                </div>
                <div className={styles.Salad}></div>
                <div className={styles.Bacon}></div>
                <div className={styles.Cheese}></div>
                <div className={styles.Meat}></div>
                 <div className={styles.BreadBottom}></div>
                
            </div>
        );
    }
}

export default BurgerIngredient;