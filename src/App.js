import React, { Component } from 'react';
import {connect} from 'react-redux';
import './App.css';

import ApiTest from './components/ApiTest'
import Authentication from './components/Authentication'
import {setCred} from './action/setcred'

import edensdk from 'eden-js-sdk-client';

// initialize edensdk
const isInited = edensdk.init(edensdk.EDEN_PROTOTYPE_NETWORK);

// Default Root Component.
class App extends Component {

  render() {
    const {dispatch} = this.props;

    return (
      <div className="App">
          {
            isInited && 
              <Authentication onAuthenticate={(id,token)=>dispatch(setCred(id,token))}/>
          }
          {
            isInited === false &&
              <div> Initialize SDK failed </div>
          }

          <ApiTest token={this.props.cred.token}/>
        
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return {
    cred: state.usercred
  }
}

export default connect(mapStateToProps)(App);
