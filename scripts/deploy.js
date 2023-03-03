const hre = require("hardhat");

async function main() {
  const ToDoList = await hre.ethers.getContractFactory("ToDoList");
  const contract = await ToDoList.deploy();

  await contract.deployed();

  console.log("Address of contract:", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
