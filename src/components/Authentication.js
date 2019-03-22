import React, { Component } from 'react';
import edensdk from 'eden-js-sdk-client';


class Authentication extends Component {
    
    constructor(props){
        super(props);      
        this.state = {isSignIn: false,idtoken:""};
 
        edensdk.app.auth()
            .onAuthStateChanged(async (user)=>{
                if (user) {
                    const idToken =  await user.getIdToken();
                    const email = user.email;
                    
                    // check user info.
                    if(await edensdk.apis.signInUser(idToken)===false)                    
                    {
                        await edensdk.app.auth().signOut();
                        return;
                    }

                    // update token and id.
                    // and enable api calls.        
                    console.log("Auth Success");
                    this.setState({isSignIn:true,idtoken:idToken});
                    this.props.onAuthenticate(email, idToken);
                }
                else
                {
                    await edensdk.apis.signOutUser(this.state.idtoken);
                    this.setState({isSignIn:false,idtoken:""});
                    this.props.onAuthenticate(undefined, undefined);                     
                    
                }
            })
    }
     
    handleSignIn(e)  {        
        edensdk.app.auth()
            .signInWithEmailAndPassword(this.refs.userid.value.trim(), this.refs.password.value.trim())
            .catch((error) => {
                alert(error);
             });
    }


    handleSignUp(e)  {        
        edensdk.app.auth()
            .createUserWithEmailAndPassword(this.refs.userid.value.trim(), this.refs.password.value.trim())           
            .catch((error) => {
                alert(error);
             });
    }
    
    handleSignOut(e){
        edensdk.app.auth().signOut().then(
        );
    }


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
                    <input type="text" placeholder="username" ref='userid' ></input><br/>
                    <input type="password" placeholder="password" ref='password' ></input> <br/>                
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