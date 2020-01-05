const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

var input = {
language: 'Solidity',
          sources: {
            'Inbox.sol': {
content: source
            }
          },
settings: {
outputSelection: {
                   '*': {
                     '*': [ '*' ]
                   }
                 }
          }
}

//to compile 1 smart contract
//module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox.evm;

var contract = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;

//console.log({ abi: contract.abi, bytecode: contract.evm.bytecode.object});

module.exports = { abi: contract.abi, bytecode: contract.evm.bytecode.object };

