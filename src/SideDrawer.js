import React from 'react';
import logoSlika from './assets/burger-logo.png';
import styles from './SideDrawer.module.css';
import {NavLink, Link} from 'react-router-dom';


function SideDrawer(props) {
 
    const logOutSideDrawer=()=>{
         //Ovdje sam imao glupu grešku gdje sam imao samo jedan bind() i onda sam se čudo zašto se ovo ne zove...
        props.promjeniState.call(this,false)
        props.logOut()
  }

  console.log('sidedraewer', props);

 let item;
 props.signedIn? item=<React.Fragment>
     <div onClick={props.promjeniState.bind(this,false)}><NavLink to='/orders'>Orders </NavLink></div>  
     <div onClick={logOutSideDrawer} className={styles.logOut}> <Link to='/'>Logout</Link></div> 
               
       </React.Fragment> : item=null
                           
    return (
        <div className={props.sideDrawerIsShown? styles.glavniCont: styles.displayNone}>
            <div className={styles.zatvoriX} onClick={props.promjeniState.bind(this,false)}>x</div>
            <div className={styles.logoSlikaCont}><img src={logoSlika} alt='logo'/></div>
            <div className={styles.navLinkCont}>
           <div onClick={props.promjeniState.bind(this,false)}><NavLink to='/' exact>Burger Builder</NavLink></div> 
         {!props.signedIn? <div onClick={props.promjeniState.bind(this,false)}><NavLink to='/auth'>Authenticate</NavLink></div>: null}  
               {item}
            </div>
        </div>
    );
}

export default SideDrawer;