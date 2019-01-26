const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const {interface,bytecode} = require("./compile");

const provider = new HDWalletProvider(
    'ready razor mail broccoli exhibit pyramid prefer rebuild evoke middle disorder adjust',
    "https://rinkeby.infura.io/v3/1e0f4b6352924635b8f92cb8c53d1db3"
)

const web3 = new Web3(provider);

const deploy = async () => {
    let accounts = await web3.eth.getAccounts()
    let inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data : bytecode,
        arguments: ['Hello World']
    })
    .send({
        from : accounts[0],
        gas: '1000000'
    })
    console.log("Contract Deployed To ",inbox.options.address);

};

deploy();