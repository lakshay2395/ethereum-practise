import React,{Component} from 'react';
import {Form,Input,Button,Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router} from '../routes'; 

class ContributeForm extends Component{

    state = {
        value : '',
        loading: false,
        errorMessage : ''
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const campaign = Campaign(this.props.address);
        try{
            this.setState({ errorMessage : '',loading : true})
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value,'ether')
            })
            this.setState({value : ''});
            Router.replaceRoute(`/campaign/${this.props.address}`);
        }catch(err){
            this.setState({ errorMessage : err.message})
        }
        this.setState({ loading : false})
    }

    render(){
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input
                        value={this.state.value}
                        onChange={event => this.setState({ value : event.target.value})}
                        label="ether"
                        labelPosition="right"
                    />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMessage}/>
                <Button primary  loading={this.state.loading}>
                    Contribute
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;