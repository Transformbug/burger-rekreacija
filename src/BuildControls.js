import React, { Component } from 'react';
import styles from './BuildControls.module.css';
import {connect} from 'react-redux';
//VAŽNO: pazi da slučajno ovo qoutes namju empy space na kraju, onda će biti error. Znači apostrof mora biti odmah do zadnjeg slova.

//VAŽNO: iz nekog razloiga ovaj import sa zvjezidom ne radi. Pokušao sam tamo da je default export, ne bitno iz nekog glupog razloga ne radi.
//Također, uz ovo ne radi ona thenika gdje exportamo iz jednog file(ne, to nije uzrok i kad ne korism tu thenku ova zvjezdica ne radi).
// import * as actions from '.store/actionCreators/a-burgerBuilder'
import actions from './store/actionCreators/a-burgerBuilder';
// console.log('ovo je actions', actions);

class BuildControls extends Component {

    render() {
        return (
            <div className={styles.mainCont}>
                 <div>Current Price: <strong>{`${this.props.totalPrice.toFixed(2)}$`}</strong></div>
                <div className={styles.subCont}>
                    {/* VAŽNO: ovo je jedan od načina kako imati više klasa na jednom elementu kada korismo css modules. Iako ovo nije bilo nužno sada */}
                    <div className={`${styles.flexColumn} ${styles.sastojci}`}>
                    <div>Salad</div>
                    <div>Bacon</div>
                    <div>Cheese</div>
                    <div>Meat</div>
                     </div>
                     {/* VAŽNO: ovo je jedan od načina kako imati više klasa na jednom elementu kada korismo css modules. Iako ovo nije bilo nužno sada */}
                    <div className={[styles.flexColumn, styles.prviBotuni].join(' ')}>
                       <button disabled={this.props.ingredients.salad>0? false: true}
                               data-myatri="salad"
                               onClick={this.props.removeIngredient} >Less
                      </button>
                        
                        <button disabled={this.props.ingredients.bacon >0? false: true} 
                              data-myatri="bacon"
                              onClick={this.props.removeIngredient}>Less
                        </button>
                        <button disabled={this.props.ingredients.cheese >0? false: true}
                               data-myatri="cheese"
                               onClick={this.props.removeIngredient}>Less
                       </button>
                        <button disabled={this.props.ingredients.meat >0? false: true}
                         data-myatri="meat"
                         onClick={this.props.removeIngredient}>Less
                         </button>
                    </div>
                   
                    <div className={`${styles.flexColumn} ${styles.drugiBotuni}`}>
                        <button onClick={this.props.addIngredient} data-myatri="salad">More</button>
                        <button onClick={this.props.addIngredient} data-myatri="bacon">More</button>
                        <button onClick={this.props.addIngredient} data-myatri="cheese">More</button>
                        <button onClick={this.props.addIngredient} data-myatri="meat">More</button>
                    </div>
                  
                </div>
                <button className={styles.botun} disabled={this.props.totalPrice>4? false: true}>SIGN UP TO ORDER</button>

                
            </div>
        );
    }
}

let mapStateToProps=(state)=>{
  return{
   totalPrice: state.burgerBuilder.totalPrice,
   ingredients:state.burgerBuilder.ingredients
  }
}

let mapDispatchToProps=(dispatch)=>{
    return{                              
        addIngredient:(event)=>{dispatch(actions.addIngredient(event))},
        removeIngredient:(event)=>{dispatch(actions.removeIngredient(event))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BuildControls);