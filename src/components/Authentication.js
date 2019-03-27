import React, { Component } from 'react';
import edensdk from 'edenchain-client-sdk';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
            .signInWithEmailAndPassword(this.userid.value.trim(), this.password.value.trim())
            .catch((error) => {
                alert(error);
             });
    }


    // click signup button
    handleSignUp(e)  {        
        edensdk.app.auth()
            .createUserWithEmailAndPassword(this.userid.value.trim(), this.password.value.trim())           
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
                    <Button variant="contained" color="default"  onClick={(e) => this.handleSignOut(e)}>Logout</Button>
                    </div>
                )
        else
        {
            
            button = (
                <div>      

                    <TextField
                        id="standard-name"
                        label="Name"
                        margin="normal"
                        inputRef={el => this.userid = el} 
                        /> <br/>

                    <TextField
                        id="standard-password-input"
                        label="Password"                        
                        type="password"
                        autoComplete="current-password"
                        margin="normal"
                        inputRef={el => this.password = el} 
                        /> <br/>
                    
                     <br/>             
                    <Button variant="contained" color="default" onClick={(e) => this.handleSignUp(e)}>Signup to Edenchain</Button>
                    &nbsp;&nbsp;
                    <Button variant="contained" color="primary" onClick={(e) => this.handleSignIn(e)}>SignIn to Edenchain</Button>                    
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