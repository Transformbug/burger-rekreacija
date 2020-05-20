import React, { Component } from 'react';
import {NavLink, Link} from 'react-router-dom';
import styles from './Navigation.module.css';
import logoSlika from './assets/burger-logo.png';
import { findByLabelText } from '@testing-library/react';

//Kreiramo sam ovdje minie komponte da ne otvram novi file.

function MobTipka(props) {
    return (
        <div className={styles.mobTipkaCont} onClick={props.promjeniState.bind(this,true)}>
           <div></div> 
           <div></div>
           <div></div>
        </div>
    );
}


const Navi = () => {
    return (
      
          <div className={styles.divUnutarNaviKomp}>  
           <NavLink to='/' exact>Burger Builder</NavLink>
           <NavLink to='/auth'>Authenticate</NavLink>
      </div>
    
    
    );
};

const Navi2= (props) => {
    return (
      
          <div className={styles.divUnutarNaviKomp}>  
          <NavLink to='/' exact>Burger Builder</NavLink>
          <NavLink to='/orders'>Orders</NavLink>
          <div onClick={props.logOut} style={{display: 'flex', alignItems: 'center'}}><Link to='/'>Logout</Link></div> 
      </div>
    
    
    );
};

class Navigation extends Component {
 

   render() {
   let navi=<Navi/>
   let navi2=<Navi2 logOut={this.props.logOut} promjeniState={this.props.promjeniState} sideDrawerIsShown={this.props.sideDrawerIsShown}/>
   let slika=<img src={logoSlika} alt="MyBurger"/>
       
 return (
            <div className={styles.glavniCont}>
                <div className={styles.prikažiMobTipka}>  <MobTipka promjeniState={this.props.promjeniState}/> </div>
                <div className={styles.prikažiSlika}>   {slika}  </div>
                <div className={styles.prikažiNavi}> {this.props.signedIn ? navi2: navi}  </div>
                  </div>
        );
    }
}

export default Navigation;