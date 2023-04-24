// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;
import "./SimpleStorage.sol";

// 在这个合约里面部署上个合约,并且点部署的合约存储到一个数组
contract StorageFactory {
    SimpleStorage[] public simpleStorageArray;

    function createSimpleStorage() public {
        simpleStorageArray.push(new SimpleStorage());
    }

    function sfap(
        uint256 _index,
        string memory _name,
        uint256 _favoriteNumber
    ) public {
        SimpleStorage simpleStorage = simpleStorageArray[_index];
        simpleStorage.addPerson(_name, _favoriteNumber);
    }

    function sfget(uint256 _index) public view returns (uint256) {
        SimpleStorage simpleStorage = simpleStorageArray[_index];
        return simpleStorage.retrive();
    }
}
