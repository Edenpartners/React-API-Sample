import React, { Component } from 'react';
import edensdk from 'edenchain-client-sdk';
import 'typeface-roboto';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const style = {
    margin: '16px'
};

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
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Button  variant="contained" color="default"  onClick={ (e) => this.handleRequest(e) }>Request Coin Svr Address</Button>
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
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Button m={2} variant="contained" color="default"  onClick={ (e) => this.handleRequest(e) }>Request User Balance</Button>
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
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Request User Info</Button>
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
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Request User Transactions</Button>
                {show}
            </div>
        )
    }
}


class ApiAddEthAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:"",open:false};

    }

    async handleRequest(){ 
        this.setState({open:true});
    }

     handleSubmit = async ()=>{

        if(this.privatekey.value.trim().length===0)
        {
            this.setState({open:false,text:'Private key cannot be empty'});
            return;
        }
        let address_object = edensdk.utils.makeAddressObject(this.privatekey.value.trim());

        let response = await edensdk.apis.addEthAddress(this.props.token,address_object);

        this.setState({open:false});

        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    handleClose = () =>{
        this.setState({open:false});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                 <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"   >
                    <DialogTitle id="form-dialog-title">Input private key</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Input Ethereum Private key to Add to account. <br/>
                        Sample Key is 0x7ab5e1487bb8ff6353778edca5745c0421df9df825862fca01a36b582f3b8a88
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ethkey"
                        label="Ethereum Private Key"
                        inputRef={el => this.privatekey = el} 
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Add Eth Address</Button>
                {show}
            </div>
        )
    }
}



class ApiDelEthAddress extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:"",open:false};

    }

    async handleRequest(){ 
        this.setState({open:true});
    }

     handleSubmit = async ()=>{

        if(this.privatekey.value.trim().length===0)
        {
            this.setState({open:false,text:'Private key cannot be empty'});
            return;
        }
        let address_object = edensdk.utils.makeAddressObject(this.privatekey.value.trim());

        let response = await edensdk.apis.delEthAddress(this.props.token,address_object);

        this.setState({open:false});

        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    handleClose = () =>{
        this.setState({open:false});
    }


    render(){
        let show ;
        if(this.state.text!=="")
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"   >
                    <DialogTitle id="form-dialog-title">Input private key</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Input Ethereum Private key to Delete from account.<br/>
                        Sample Key is 0x7ab5e1487bb8ff6353778edca5745c0421df9df825862fca01a36b582f3b8a88
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ethkey"
                        label="Ethereum Private Key"
                        inputRef={el => this.privatekey = el} 
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Del Eth Address</Button>
                {show}
            </div>
        )
    }
}




class ApiDepositToken extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:"",open:false};

    }

    async handleRequest(){ 
        this.setState({open:true});
    }

    handleSubmit = async ()=>{

        if(this.txhash.value.trim().length===0)
        {
            this.setState({open:false,text:'TX hash cannot be empty'});
            return;
        }
        let response = await edensdk.apis.depositTokenToEdenChain(this.props.token,this.txhash.value.trim());

        this.setState({open:false});

        if(response)
            this.setState({text:"SUCCESS"});
        else
            this.setState({text:"FAILED"});
    }

    handleClose = () =>{
        this.setState({open:false});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"   >
                    <DialogTitle id="form-dialog-title">Input transaction hash for deposit</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Input Ethereum Transaction Hash value.<br/>                        
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="txhash"
                        label="Ethereum Transaction hash"
                        inputRef={el => this.txhash = el} 
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>

                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Deposit Token to Edenchain</Button>
                {show}
            </div>
        )
    }
}

class ApiWithdrawToken extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:"",open:false};

    }
    async handleRequest(){ 
        this.setState({open:true});
    }

    handleSubmit = async ()=>{

        if(this.ethaddress.value.trim().length===0)
        {
            this.setState({open:false,text:'Eth Address cannot be empty'});
            return;
        }

        if(this.amount.value.trim().length===0)
        {
            this.setState({open:false,text:'Amount cannot be empty'});
            return;
        }


        let response = await edensdk.apis.withdrawTokenFromEdenChain(this.props.token,this.ethaddress.value.trim(),
                this.amount.value.trim());

        this.setState({open:false});

        if(response)
            this.setState({text:"TXHASH:"+response});
        else
            this.setState({text:"FAILED"});
    }

    handleClose = () =>{
        this.setState({open:false});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"   >
                    <DialogTitle id="form-dialog-title">Input Ethereum Address and TEDN Amount for Withdraw to Ethereum Address</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Input Ethereum Address and Amount <br/>
                        Ethereum Address must be checksum address, and Amount must be full-decimal for TEDN.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ethaddress"
                        label="Ethereum Address"
                        inputRef={el => this.ethaddress = el} 
                        fullWidth
                    />
                    <TextField                        
                        margin="dense"
                        id="amount"
                        label="TEDN Amount"
                        inputRef={el => this.amount = el} 
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Withdraw Token from Edenchain</Button>
                {show}
            </div>
        )
    }
}



class ApiTransferToken extends Component{
    constructor(props)
    {
        super(props);
        this.state = {text:"",open:false};

    }
    async handleRequest(){ 
        this.setState({open:true});
    }

    handleSubmit = async ()=>{

        if(this.tedn_address.value.trim().length===0)
        {
            this.setState({open:false,text:'TEDN Address cannot be empty'});
            return;
        }

        if(this.amount.value.trim().length===0)
        {
            this.setState({open:false,text:'Amount cannot be empty'});
            return;
        }


        let response = await edensdk.apis.transferToken(this.props.token,this.tedn_address.value.trim(),
                this.amount.value.trim());

        this.setState({open:false});

        if(response)
            this.setState({text:"TXHASH:"+response});
        else
            this.setState({text:"FAILED"});
    }

    handleClose = () =>{
        this.setState({open:false});
    }

    render(){
        let show ;
        if(this.state.text!=="")
            show = <span><br/>{this.state.text}</span>
        return (
            <div style={style}>
                <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"   >
                    <DialogTitle id="form-dialog-title">Input TEDN Address and TEDN Amount for Transfer to that TEDN Address</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Input TEDN Address and Amount <br/>
                        Amount must be full-decimal for TEDN.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ethaddress"
                        label="TEDN Address"
                        inputRef={el => this.tedn_address = el} 
                        fullWidth
                    />
                    <TextField                        
                        margin="dense"
                        id="amount"
                        label="TEDN Amount"
                        inputRef={el => this.amount = el} 
                        fullWidth
                    />
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        Submit
                    </Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" color="default" onClick={ (e) => this.handleRequest(e) }>Transfer TEDN Token to User</Button>
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
                <div style={style}>
                    <ApiGetCoinServerAddress token={this.props.token}/>
                    <ApiGetUserBalance token={this.props.token}/>
                    <ApiGetUserInfo token={this.props.token}/>
                    <ApiGetUserTransactions token={this.props.token}/>
                    <ApiAddEthAddress token={this.props.token}/>
                    <ApiDelEthAddress token={this.props.token}/>
                    <ApiDepositToken token={this.props.token}/>
                    <ApiWithdrawToken token={this.props.token}/>
                    <ApiTransferToken token={this.props.token} />
                </div>
            );
        }
        else
            return <div/>
    }
};


export default ApiTest;