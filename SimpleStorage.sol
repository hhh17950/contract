// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
// define a contract
contract SimpleStorage {
    // boolean unit int address bytes
    // bool hasFavoriteNumber = true;
    // string favoriteNumberText = "Five";
    // int256 favoriteNumberInt = 111;
    // address myAddress = 0x8E07824d009D08331cB67c47F83bfB9C98Ad92c2;
    // bytes32 favoriteBytes = "cat";

    // this get a default 0
    uint256 internal  favoriteNumber = 12331123;
    
    // People public person = People({favoriteNumber: 2, name: "www"});
    // define number
    // uint256[] public favoriteNumberList;
    People[] public people;
    mapping (string => uint256) public nameToFavoriteNumber;
    

    struct People{
        uint256 favoriteNumber;
        string name;
    }

    function store(uint256 _favoriteNumber) public {
        favoriteNumber = _favoriteNumber;
        favoriteNumber += 1;
    }
    // calldata:临时变量,不可被修改, memory:临时变量,可以被修改, storage: 永久变量
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People({
            favoriteNumber: _favoriteNumber,
            name: _name
        }));
        nameToFavoriteNumber[_name] = _favoriteNumber;
    }
    
    // view only read
    function retrive() public view returns (uint256) {
        return favoriteNumber;
    }
    
    function add() internal pure returns (uint256) {
        return 1 + 1;
    }
}