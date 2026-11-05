/*
    Author: Manvi Aggarwal
    Date: September 25, 2026
    Description: Creates test user documents for the COMP 4621 Assignment 3 MongoDB database.
*/

// Switch to the database used for Assignment 3.
db = db.getSiblingDB("COMP4621Assignment3");

// Remove existing user documents so the test data is not duplicated
// when this script is executed more than once.
db.users.deleteMany({});

// Insert test users into the users collection.
db.users.insertMany([

    // First test user.
    {
        username: "mike",
        password: "travel123",
        fullName: "Mike Acker",
        email: "mike@example.com",
        favouriteDestination: "Vancouver"
    },

    // Second test user.
    {
        username: "david",
        password: "explore456",
        fullName: "David Smith",
        email: "david@example.com",
        favouriteDestination: "Paris"
    },

    // Third test user.
    {
        username: "sarah",
        password: "journey789",
        fullName: "Sarah Lee",
        email: "sarah@example.com",
        favouriteDestination: "Tokyo"
    }
]);

// Display all user documents to verify that the test data was inserted.
print("Users stored in the database:");
printjson(db.users.find().toArray());