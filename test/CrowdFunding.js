//hardhat contract test
const {expect} = require("chai");
const hre = require("hardhat");
const {time, loadFixture} = require('@nomicfoundation/hardhat-network-helpers');


describe("CrowdFunding", async function () {
    async function deployTokenFixture() {
        const [owner, addr1, addr2] = await hre.ethers.getSigners();
        const contract = await hre.ethers.deployContract("CrowdFunding");
        await contract.waitForDeployment();
        return {contract, owner, addr1, addr2};
    }


    it('create Campaign', async () => {
        const {contract, owner,addr1,addr2} = await loadFixture(deployTokenFixture);
        console.log(await time.latest());

        await contract.createCampaign(owner.address, "title", "description", hre.ethers.parseEther("100"), 1824500670);
        await contract.donateToCampaign(0,{value:hre.ethers.parseEther("10")})
        await contract.connect(addr1).donateToCampaign(0,{value:hre.ethers.parseEther("50")})
        await contract.getCampaigns();
        const donators = await contract.getDonators(0);
        console.log(donators)

    });

})
