const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async function() {
  // Get a list of all accounts
  this.timeout(3000);
  
  accounts = await web3.eth.getAccounts();
  // Use one of those accounts to deploy the contract
  //console.log(abi);
  //console.log(bytecode);
  
  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default value', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });

  it('can change the message', async () => {
    await inbox.methods
      .setMessage('bye')
      .send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');

  });
});
