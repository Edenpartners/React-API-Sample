import React, { Component } from 'react';
import edensdk from 'eden-js-sdk-client';

/* Each API examples */
class ApiGetCoinServerAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }
    async handleRequest(){
        let response = await edensdk.apis.getCoinServerAddress(this.props.token);
        if(response)
            this.setState({text:response});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Request Coin Svr Address</button>
                {show}
            </div>
        )
    }
}

class ApiGetUserBalance extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }
    async handleRequest(){
        let response = await edensdk.apis.getUserBalance(this.props.token);
        this.setState({text:response});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Request User Balance</button>
                {show}
            </div>
        )
    }
}



class ApiGetUserInfo extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }
    async handleRequest(){
        let response = await edensdk.apis.getUserInfo(this.props.token);
        this.setState({text: JSON.stringify(response)});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Request User Info</button>
                {show}
            </div>
        )
    }
}



class ApiGetUserTransactions extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }
    async handleRequest(){
        let response = await edensdk.apis.getTransactionList(this.props.token,1,10);
        this.setState({text: JSON.stringify(response)});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Request User Transactions</button>
                {show}
            </div>
        )
    }
}


class ApiAddEthAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }

    async handleRequest(){

        let address_object = edensdk.utils.makeAddressObject('0x7ab5e1487bb8ff6353778edca5745c0421df9df825862fca01a36b582f3b8a88');

        let response = await edensdk.apis.addEthAddress(this.props.token,address_object);

        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Add Eth Address</button>
                {show}
            </div>
        )
    }
}



class ApiDelEthAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }

    async handleRequest(){
       
        let address_object = edensdk.utils.makeAddressObject('0x7ab5e1487bb8ff6353778edca5745c0421df9df825862fca01a36b582f3b8a88');

        let response = await edensdk.apis.delEthAddress(this.props.token,address_object);
        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Del Eth Address</button>
                {show}
            </div>
        )
    }
}




class ApiDepositToken extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }

    async handleRequest(){
        let response = await edensdk.apis.depositTokenToEdenChain(this.props.token,"0x123123");
        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Deposit Token to Edenchain</button>
                {show}
            </div>
        )
    }
}

class ApiWithdrawToken extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:""};

    }

    async handleRequest(){
        let response = await edensdk.apis.withdrawTokenFromEdenChain(this.props.token,"0x123123",10);
        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span>{this.state.text}</span>
        return (
            <div>
                <button onClick={ (e) => this.handleRequest(e) }>Withdraw Token from Edenchain</button>
                {show}
            </div>
        )
    }
}



/* API Test Main  */
class ApiTest extends Component {
    render(){
        if(this.props.token)
        {
            return (
                <div>
                    <ApiGetCoinServerAddress token={this.props.token}/>
                    <ApiGetUserBalance token={this.props.token}/>
                    <ApiGetUserInfo token={this.props.token}/>
                    <ApiGetUserTransactions token={this.props.token}/>
                    <ApiAddEthAddress token={this.props.token}/>
                    <ApiDelEthAddress token={this.props.token}/>
                    <ApiDepositToken token={this.props.token}/>
                    <ApiWithdrawToken token={this.props.token}/>
                </div>
            );
        }
        else
            return <div/>
    }
};

export default ApiTest;