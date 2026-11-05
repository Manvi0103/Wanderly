/*
    Author: Manvi Aggarwal
    Date: September 25, 2026
    Description: AngularJS application for the Wanderly login page.
                 Sends the entered username and password to the Node.js server.
*/

// Create the AngularJS application module.
var app = angular.module("wanderlyApp", []);

// Create the controller for the login page
app.controller("LoginController", function($scope, $http) {
    // Store the username and password entered by the user
    $scope.user = {
        username: "",
        password: ""
    };

    // Store the message returned by the server
    $scope.message = "";
    $scope.userDetails = null;

    // Controls whether the new-user registration option is displayed
    $scope.showRegistration = false;

    // Run this function when the login form is submitted
    $scope.login = function() {
        // Send the login information to the Node.js server
        $http.post("/login", $scope.user).then(function(response) {
            // Display the response from the server
            $scope.message = response.data.message;

            // Store the user details returned from MongoDB
            $scope.userDetails = response.data.user;

            // Hide registration details after a successful login
            $scope.showRegistration = false;
        })
        .catch(function(error) {
            // Remove any previously displayed user info
            $scope.userDetails = null;

            // Display an error message if the request fails
            $scope.message = error.data.message;

            // Show registration if the username does not exist
            if (error.data.newUser) {
                $scope.showRegistration = true;
            } else {
                $scope.showRegistration = false;
            }
        });
    };

    // Create a new account when the entered username does not exist
    $scope.register = function() {
        // Send the new username and password to the Node.js server
        $http.post("/register", $scope.user).then(function(response) {
            // Display the successful registration message
            $scope.message = response.data.message;

            // Hide the registration option after the account is created
            $scope.showRegistration = false;

            // Remove any previously displayed user info
            $scope.userDetails = null;
        })
        .catch(function(error) {
            //Display an error returned by the server
            $scope.message = error.data.message;
        });
    };
});