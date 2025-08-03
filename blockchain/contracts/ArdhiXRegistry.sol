// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ArdhiXRegistry {
    struct Property {
        address owner;
        string metadataURI;
        bool exists;
    }

    mapping(uint256 => Property) public properties;
    event PropertyRegistered(uint256 indexed propertyId, address indexed owner, string metadataURI);
    event PropertyTransferred(uint256 indexed propertyId, address indexed from, address indexed to);

    function registerProperty(uint256 propertyId, string calldata metadataURI) external {
        require(!properties[propertyId].exists, "Property already registered");
        properties[propertyId] = Property(msg.sender, metadataURI, true);
        emit PropertyRegistered(propertyId, msg.sender, metadataURI);
    }

    function transferProperty(uint256 propertyId, address to) external {
        require(properties[propertyId].exists, "Not registered");
        require(msg.sender == properties[propertyId].owner, "Not owner");
        properties[propertyId].owner = to;
        emit PropertyTransferred(propertyId, msg.sender, to);
    }

    function getPropertyOwner(uint256 propertyId) external view returns (address) {
        require(properties[propertyId].exists, "Not registered");
        return properties[propertyId].owner;
    }
}