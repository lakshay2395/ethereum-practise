import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

  state = {
    manager : '',
    players : [],
    balance : '',
    value : '',
    message : ''
  }

  async componentDidMount(){
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    var addressValue = await lottery.options.address;
    const balance = await web3.eth.getBalance(addressValue);
    this.setState({manager : manager, players : players,balance : balance});
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const accounts = await web3.eth.getAccounts();
    this.setState({message : 'Waiting on transaction successs....'});
    await lottery.methods.enter().send({
      from : accounts[0],
      value : web3.utils.toWei(this.state.value,'ether')
    })

    this.setState({message : "You have been entered!!!"});
  }

  onClick = async(event) => {
    const accounts = await web3.eth.getAccounts();
    this.setState({message : 'Waiting on transaction successs....'});
    await lottery.methods.pickWinner().send({
      from : accounts[0]
    })
    this.setState({message : "A winner has been picked!!!"});
  }

  render() {
    web3.eth.getAccounts().then(console.log);
    return (
      <div>
        <h2>Lottery Contract App</h2>
        <p>This contract is managed by {this.state.manager}</p>
        <p>There are currently {this.state.players.length} players competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!</p>
        <hr/>
        <form onSubmit={this.onSubmit}>
          <h4>Do you want to try your luck ? </h4>
          <label>Amount of ether to enter</label>
          <input
            value={this.state.value}
            onChange={event => this.setState({value : event.target.value})}
          />
          <button>Enter</button>
        </form>
        <hr/>
        <h4>Ready to pick a winner ?</h4>
        <hr/>
        <h4>{this.state.message}</h4>
        <button onClick={this.onClick}>Pick a winner</button>
      </div>
    );
  }
}

export default App;
