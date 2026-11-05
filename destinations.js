/*
    Author: Manvi Aggarwal
    Date: September 25, 2026
    Description: AngularJS application for the Wanderly destinations page.
                 Stores destination information and supports searching.
*/

// Create the AngularJS application for the destinations page.
var app = angular.module("destinationApp", []);

// Create the controller used by the destinations page.
app.controller("DestinationController", function($scope) {

    // Store the text entered in the destination search box.
    $scope.searchText = "";

    // Store the destination information displayed on the website.
    $scope.destinations = [
        {
            name: "Vancouver",
            country: "Canada",
            image: "images/vancouver.jpg",
            description: "A coastal city surrounded by mountains and nature.",
            bestFor: "Nature and outdoor adventures"
        },
        {
            name: "Paris",
            country: "France",
            image: "images/paris.jpg",
            description: "A historic city known for art, food and famous landmarks.",
            bestFor: "Culture and sightseeing"
        },
        {
            name: "Tokyo",
            country: "Japan",
            image: "images/tokyo.jpg",
            description: "A vibrant city combining modern life with traditional culture.",
            bestFor: "Food and city experiences"
        },
        {
            name: "Jaipur",
            country: "India",
            image: "images/jaipur.jpg",
            description: "A colourful city known for historic palaces, forts and traditional markets.",
            bestFor: "History, culture and architecture"
        },
        {
            name: "New York",
            country: "United States",
            image: "images/newyork.jpg",
            description: "A lively city filled with entertainment and iconic attractions.",
            bestFor: "Entertainment and sightseeing"
        },
        {
            name: "Rome",
            country: "Italy",
            image: "images/rome.jpg",
            description: "A historic destination filled with ancient architecture and culture.",
            bestFor: "History and food"
        },
        {
            name: "Bali",
            country: "Indonesia",
            image: "images/bali.jpg",
            description: "A tropical destination known for beaches, nature and temples.",
            bestFor: "Relaxation and nature"
        }
    ];

});