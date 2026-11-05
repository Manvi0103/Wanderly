/*
    Author: Manvi Aggarwal
    Date: September 25, 2026
    Description: Node.js server for the Wanderly website.
                 Serves the AngularJS client and receives login information.
*/

// Load the Express module
const express = require("express");

// Load the MongoDB client so the server can access the database
const { MongoClient } = require("mongodb");

// Create the Express application
const app = express();

// Set the port used by the Node.js server
const PORT = 3000;

// Set the address of the local MongoDB server
const mongoURL = "mongodb://127.0.0.1:27017";

// Set the name of the database used by the website
const dbName = "COMP4621Assignment3";

// Create a MongoDB client
const client = new MongoClient(mongoURL);

// Allow the server to read JSON data sent by AngularJS
app.use(express.json());

// Serve the website files from the current folder
app.use(express.static(__dirname));

// Receive the login info from the AngularJS client
app.post("/login", async function(req, res) {
    // Get the username and password sent by AngularJS
    const username = req.body.username;
    const password = req.body.password;

    try {
        //Access the Assignment 3 db
        const db = client.db(dbName);

        // Access the users collection
        const users = db.collection("users");

        //Search MongoDB for a user with the entered username
        const user = await users.findOne({ username: username });

        //Check whether the username exists in the db
        if (user) {
            //check whether the entered password matches the stored password
            if (user.password === password) {
                //send the user's details back to the AngularJS client
                res.json({
                    success: true,
                    message: "Login successful!",
                    user: {
                        username: user.username,
                        fullName: user.fullName,
                        email: user.email,
                        favouriteDestination: user.favouriteDestination
                    }
                });
            } else {
                // The username exists, but the password is incorrect
                res.status(401).json({
                    success: false,
                    message: "Incorrect password."
                });
            }
        } else {
            res.status(404).json({
                success: false,
                newUser: true,
                message: "Username not found. You can create a new account."
            });
        }
    } catch (error) {
        //Display the error in the server console for debugging
        console.log("Database error:");
        console.log(error);

        //Send an error response to the client
        res.status(500).json({
            success: false,
            message: "A database error occurred."
        });
    }
});

// Receive new-user registration info from AngularJS
app.post("/register", async function(req, res) {
    // Get the username and password entered by the user
    const username = req.body.username;
    const password = req.body.password;

    try {
        // Access the Assignment 3 db
        const db = client.db(dbName);

        // Access the users collection
        const users = db.collection("users");

        // Check again whether the username already exists
        const existingUser = await users.findOne({
            username: username
        });

        // Do not create a duplicate username
        if (existingUser) {
            res.status(409).json({
                success: false,
                message: "This username already exists."
            });
            return;
        }

        // Create the new user document
        const newUser = {
            username: username,
            password: password
        };

        // Insert the new user into MongoDB
        await users.insertOne(newUser);

        // Confirm that the account was successfully created
        res.json({
            success: true,
            message: "Account created successfully! You can now log in."
        });
    } catch (error) {
        //Display the db error in the server console
        console.log("Registration error:");
        console.log(error);

        // Send an error message back to AngularJS
        res.status(500).json({
            success: false,
            message: "Unable to create the account."
        });
    }
});

// Connect to MongoDB before starting the website server
client.connect().then(function() {
    //Display confirmation that MongoDB is connected
    console.log("Connected to MongoDB");

    // Start the Node.js server after the database connection succeeds
    app.listen(PORT, function() {
        console.log("Wanderly server is running on port " + PORT);
    });
})
.catch(function(error) {
    //Display an error if the db connection fails
    console.log("MongoDB connection error:");
    console.log(error);
});