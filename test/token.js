const {expect} = require("chai");
const { ethers } = require("hardhat");

// to run test write npx hardhat test

describe("Token Contract",function(){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

    beforeEach(async function(){                          // beforeEach is a hook provided by chai library
                                                          // in this all lines in beforeEach will run before every test
                                                          // this prevent repetition of code
        Token = await ethers.getContractFactory("Token");
        [owner,addr1,addr2,...addrs] = await ethers.getSigners();
        hardhatToken = await Token.deploy();

    })

    describe("Deployment", function(){
        it("Should set the right owner",async function(){
            expect(await hardhatToken.owner()).to.equal(owner.address);
        })
        it("Should assign the total supply of Tokens to owner", async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
        })
    })

    describe("Transaction", function(){
        it("Should transfer tokens between accounts",async function(){
            //owner account to addr1.address
            await hardhatToken.transfer(addr1.address,5);
            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            await hardhatToken.connect(addr1).transfer(addr2.address, 5);
            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(5);
        })

        it("Should fail if sender does not have enough tokens",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(addr1).transfer(owner.address, 1)).to.be.revertedWith("Not Enough Tokens");  // initially - 0 tokens addr1
            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        })

        it("Should update balances after transfers",async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(addr1.address, 5);
            await hardhatToken.transfer(addr2.address, 10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance - 15);

            const addr1Balance = await hardhatToken.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(5);

            const addr2Balance = await hardhatToken.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(10);
            


        })
    })

})









// const {expect} = require("chai");


// describe("Token Contract", function(){
    
//     it("Deployment should assign the total supply of tokens to the owner",async function(){

//         const [owner] = await ethers.getSigners();  //.getSigners is an object through which u can access the accounts

//         console.log("Signers oblect:",owner);

//         // creating the instance
//         const Token = await ethers.getContractFactory("Token");

//         const hardhatToken = await Token.deploy();

//         // getting balance of owner which is 10000
//         const ownerBalance = await hardhatToken.balanceOf(owner.address); 
//         console.log("owner address :",owner.address);

//         //now we are using chai library 
//         //checking totalSupply = 10000 is equal to ownerBalance = 10000
//         expect(await hardhatToken.totalSupply()).to.equal(10000);
//     })

//     it("Should transfer tokens between accounts",async function(){

//         const [owner,addr1,addr2] = await ethers.getSigners();  //.getSigners is an object through which u can access the accounts

//         // creating the instance
//         const Token = await ethers.getContractFactory("Token");

//         //deploy Token
//         const hardhatToken = await Token.deploy();  

//         // Transfer 10 Tokens from owner to addr1
//         await hardhatToken.transfer(addr1.address, 10);
//         expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

//           // Transfer 5 Tokens from owner to addr1
//           await hardhatToken.connect(owner).transfer(addr2.address, 5);
//           expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
//     })
// })