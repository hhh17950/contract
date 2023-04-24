// 导入ethers
const { ethers } = require("ethers");
// fs 读取abi和bin文件
const fs = require("fs-extra");
// 引用dotenv并且调用其config方法来加载 .env 文件中的环境变量,使用 process.env 对象来访问环境变量
require("dotenv").config();

async function main() {
    // 将我们的脚本连接到我们本地的区块
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    const wallet = new ethers.Wallet(
        process.env.PRIMARY_KEY,
        provider
    );
    // 读取abi,读取binary
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8");
    // 创建合约工厂
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Deploying, please wait...");
    const contract = await contractFactory.deploy(); // stop hear, wait for contract to deploy
    const deployTransaction = contract.deployTransaction;
    const transactionReceipt = await contract.deployTransaction.wait(1);
    // 调用合约方法
    const currentFavoriateNumber = await contract.retrive();
    console.log(`current favoriteNumber:${currentFavoriateNumber.toString()}`);
    const storeTranactionResponse = await contract.store("12");
    const storeTranactionReceipt = await storeTranactionResponse.wait(1);
    const updateFavoriateNumber = await contract.retrive();
    console.log(`update favoriteNumber:${updateFavoriateNumber.toString()}`);
    // 以发送交易的形式部署合约
    // const nonce = await wallet.getTransactionCount()
    // const tx = {
    //     nonce: nonce,
    //     gasPrice: 20000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: "608060405262bc287360005534801561001757600080fd5b506109b7806100276000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80636057361d1461005c5780636f760f41146100785780638bab8dd5146100945780639e7a13ad146100c4578063a6b7fc5b146100f5575b600080fd5b610076600480360381019061007191906102fc565b610113565b005b610092600480360381019061008d919061046f565b610136565b005b6100ae60048036038101906100a991906104cb565b6101bf565b6040516100bb9190610523565b60405180910390f35b6100de60048036038101906100d991906102fc565b6101ed565b6040516100ec9291906105bd565b60405180910390f35b6100fd6102a9565b60405161010a9190610523565b60405180910390f35b80600081905550600160008082825461012c919061061c565b9250508190555050565b60016040518060400160405280838152602001848152509080600181540180825580915050600190039060005260206000209060020201600090919091909150600082015181600001556020820151816001019081610195919061085c565b505050806002836040516101a9919061096a565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101fd57600080fd5b90600052602060002090600202016000915090508060000154908060010180546102269061067f565b80601f01602080910402602001604051908101604052809291908181526020018280546102529061067f565b801561029f5780601f106102745761010080835404028352916020019161029f565b820191906000526020600020905b81548152906001019060200180831161028257829003601f168201915b5050505050905082565b60008054905090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6102d9816102c6565b81146102e457600080fd5b50565b6000813590506102f6816102d0565b92915050565b600060208284031215610312576103116102bc565b5b6000610320848285016102e7565b91505092915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61037c82610333565b810181811067ffffffffffffffff8211171561039b5761039a610344565b5b80604052505050565b60006103ae6102b2565b90506103ba8282610373565b919050565b600067ffffffffffffffff8211156103da576103d9610344565b5b6103e382610333565b9050602081019050919050565b82818337600083830152505050565b600061041261040d846103bf565b6103a4565b90508281526020810184848401111561042e5761042d61032e565b5b6104398482856103f0565b509392505050565b600082601f83011261045657610455610329565b5b81356104668482602086016103ff565b91505092915050565b60008060408385031215610486576104856102bc565b5b600083013567ffffffffffffffff8111156104a4576104a36102c1565b5b6104b085828601610441565b92505060206104c1858286016102e7565b9150509250929050565b6000602082840312156104e1576104e06102bc565b5b600082013567ffffffffffffffff8111156104ff576104fe6102c1565b5b61050b84828501610441565b91505092915050565b61051d816102c6565b82525050565b60006020820190506105386000830184610514565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561057857808201518184015260208101905061055d565b60008484015250505050565b600061058f8261053e565b6105998185610549565b93506105a981856020860161055a565b6105b281610333565b840191505092915050565b60006040820190506105d26000830185610514565b81810360208301526105e48184610584565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610627826102c6565b9150610632836102c6565b925082820190508082111561064a576106496105ed565b5b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061069757607f821691505b6020821081036106aa576106a9610650565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026107127fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826106d5565b61071c86836106d5565b95508019841693508086168417925050509392505050565b6000819050919050565b600061075961075461074f846102c6565b610734565b6102c6565b9050919050565b6000819050919050565b6107738361073e565b61078761077f82610760565b8484546106e2565b825550505050565b600090565b61079c61078f565b6107a781848461076a565b505050565b5b818110156107cb576107c0600082610794565b6001810190506107ad565b5050565b601f821115610810576107e1816106b0565b6107ea846106c5565b810160208510156107f9578190505b61080d610805856106c5565b8301826107ac565b50505b505050565b600082821c905092915050565b600061083360001984600802610815565b1980831691505092915050565b600061084c8383610822565b9150826002028217905092915050565b6108658261053e565b67ffffffffffffffff81111561087e5761087d610344565b5b610888825461067f565b6108938282856107cf565b600060209050601f8311600181146108c657600084156108b4578287015190505b6108be8582610840565b865550610926565b601f1984166108d4866106b0565b60005b828110156108fc578489015182556001820191506020850194506020810190506108d7565b868310156109195784890151610915601f891682610822565b8355505b6001600288020188555050505b505050505050565b600081905092915050565b60006109448261053e565b61094e818561092e565b935061095e81856020860161055a565b80840191505092915050565b60006109768284610939565b91508190509291505056fea26469706673582212203399e3cd288861d7d7a86fc31f429a638a7b913cfcc60d4c58c5a830789e1d4564736f6c63430008130033",
    //     chainId: 5777
    // }
    //  const signTxResponse = await wallet.signTransaction(tx);
    //  console.log(signTxResponse)
}

main().then(
    () => {
        process.exit(0)
    }
).catch(
    (error) => {
        console.log(error)
        process.exit(1)
    }
)