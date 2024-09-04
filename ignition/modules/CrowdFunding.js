const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");


module.exports = buildModule("CrowdFundingModule", (m) => {

  const crowdFunding = m.contract("CrowdFunding");
  return { crowdFunding };
});


//contract address = 0x5FbDB2315678afecb367f032d93F642f64180aa3
