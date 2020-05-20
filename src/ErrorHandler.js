import React, { Component } from 'react';
import styles from './ErrorHandler.module.scss';

const ErrorHandler=(WrappedComponent, axios)=>{

    //Ovo je obična funkcija, nije klasa koja returna anonimnu klasu...
  return (

    class extends Component {

        state={
           error: null 
        }
    
        constructor(props){
          super(props)
    
          //PAZI: ovaj axios.interceptor nije unutar neke funkcije, samo je unutar construcotra
          this.requestInterceptor=axios.interceptors.request.use((request)=>{
                 this.setState({error: null})
                 return request
             })
          
            //Ovo je oba dvoje unutar constorucotra, pazi...  
          this.responseInterceptor=axios.interceptors.response.use((response)=>{
                  return response
              }, (error)=>{
                  this.setState({error: error})
              })
          
       
        }
    
        componentWillUnmount(){
            axios.interceptors.request.eject(this.requestInterceptor)
            axios.interceptors.response.eject(this.responseInterceptor)
        }
    
       
    
        render() {
            return (
                 <React.Fragment>
                    <div className={this.state.error? 'backdrop': 'displayNoneGeneralno'}></div>
                    <div className={this.state.error? styles.showCont: styles.noShow}>
                         <h2>Error</h2>
                       <div>{this.state.error? this.state.error.message :null}</div>
                       <button className={styles.botun} onClick={()=>this.setState({error: null})}>Okay</button> 
                    </div>
                    <WrappedComponent {...this.props}/>
                
                 </React.Fragment>
            );
        }
    }





  )


}

  

export default ErrorHandler;