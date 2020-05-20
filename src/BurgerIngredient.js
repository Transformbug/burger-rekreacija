import React, { Component } from 'react';
import styles from './BurgerIngredient.module.css';
import {connect} from 'react-redux';
import Strelica from './Strelica';

class BurgerIngredient extends Component {

 
   render() {

    let ingredientsArr=[] 
   
    for(let key in this.props.ingredients){
       let cur=this.props.ingredients[key]
       //Ako je cur vrijedno 0, onda se loop neće pokrenuti, podsjetnik. ako je cur vrijednsot broj 1, pokrenut će se jedan put i već u idućeoj iteraciji uvjet neće biti zadovoljen.
       for(let i=0; i<cur; i++){
        ingredientsArr.push(key)
      }
   
      }

     //Note, radi toga što sam u intialReduceru u -r-burgerBuilder krivo poredao sastojeke i ovdje mi je bio mali problem dok to nisam popravio 
    //   console.log(ingredientsArr);
    
   let ingredients=ingredientsArr.map(cur=>{
       //Naravno ovo je za onaj obvezni key kada outputa array list gdje react 'izvlači'. Ovako sam bezveze ovo stavio da ne pišem ids
       let dObj=Date.now()
       let key=dObj.toString()+ Math.random().toString()
       return <div className={`${styles[cur]}`} key={key}></div>
   })



        return (
            <div className={styles.box}>
                <div className={styles.BreadTop}>
                    <div className={styles.Seeds1}></div>
                    <div className={styles.Seeds2}></div>
                </div>
                {ingredients.length>0? ingredients : <div className={styles.addIngDiv}>Please start adding Ingredients !!!</div>}
                 <div className={styles.BreadBottom}></div>
                <Strelica/>
            </div>
        );
    }
}

const mapStateToProps=(state)=>{
  return{
      ingredients: state.burgerBuilder.ingredients 
  }
}

export default connect(mapStateToProps,null) (BurgerIngredient);