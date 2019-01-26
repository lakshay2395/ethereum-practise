const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

const {interface,bytecode} = require("../compile");

let accounts;
let inbox;

beforeEach(async () => {
    //Get a list of all accounts
    accounts = await web3.eth.getAccounts()
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data : bytecode,
        arguments: ['Hello World']
    })
    .send({
        from : accounts[0],
        gas: '1000000'
    })
})

describe("Inbox Contract Test Suite",function(){

    it("deploy a contract", () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message',async () => {
        let message = await inbox.methods.message().call();
        assert.equal(message,"Hello World");
    });

    it('can change the message',async () => {
        await inbox.methods.setMessage("Bye World").send({
            from: accounts[0]
        });
        let message = await inbox.methods.message().call();
        assert.equal(message,"Bye World");
    });

})