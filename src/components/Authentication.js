import React, { Component } from 'react';
import edensdk from 'eden-js-sdk-client';


class Authentication extends Component {
    
    // Constructor
    constructor(props){
        super(props);      
        
        // state initialize
        this.state = {isSignIn: false,idtoken:""};
 
        // Authentication Event handling
        edensdk.OnAuthChanged((idtoken) => {
            if(idtoken)
            {
                console.log("Auth Success");
                this.setState({isSignIn:true,idtoken:idtoken});
                this.props.onAuthenticate(idtoken);
            }
            else
            {
                console.log("Auth Signout");
                this.setState({isSignIn:false,idtoken:""});
                this.props.onAuthenticate(undefined);     
            }
        });
    }
     
    // click signin button
    handleSignIn(e)  {        
        edensdk.app.auth()
            .signInWithEmailAndPassword(this.refs.userid.value.trim(), this.refs.password.value.trim())
            .catch((error) => {
                alert(error);
             });
    }


    // click signup button
    handleSignUp(e)  {        
        edensdk.app.auth()
            .createUserWithEmailAndPassword(this.refs.userid.value.trim(), this.refs.password.value.trim())           
            .catch((error) => {
                alert(error);
             });
    }
    
    // click signout
    handleSignOut(e){
        edensdk.app.auth().signOut();
    }

    // Component Render
    render(){
        let button
        if(this.state.isSignIn)
                button = 
                (
                    <div>
                    <button onClick={(e) => this.handleSignOut(e)}>Logout</button>
                    </div>
                )
        else
        {
            
            button = (
                <div>                    
                    <input type="text" placeholder="username" ref='userid'  ></input><br/>
                    <input type="password" ref='password' placeholder='password' ></input> <br/>                
                    <button onClick={(e) => this.handleSignUp(e)}>Signup to Edenchain</button>
                    <button onClick={(e) => this.handleSignIn(e)}>SignIn to Edenchain</button>                    
                </div>
            );
        }
        return (
            <div>                
                {button}
            </div>
        );
    }
};

export default Authentication;