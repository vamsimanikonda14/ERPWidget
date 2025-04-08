define("DS/MyWidget/scripts/MyWidget", ['DS/PlatformAPI/PlatformAPI', 'DS/WAFData/WAFData'], function (PlatformAPI, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Creating HTML content with form-like structure
            widget.body.innerHTML = "<div class='main-Container' id='mainContainer' style='width: 100%; height: 100%; text-align: center; background-color:#005685; color: #ffffff; padding: 40px'>" +
                                        "<h1>Documents in 3DExperience</h1>" +
                                        "<div id='responseForm' style=' margin-top: 20px; background-color:#ffffff; color:#333; padding: 70px; border-radius: 24px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); width: 80%; max-width: 1070px; margin: 0 auto; display: none;'>" +
                                            "<h2 style='color: #005685;'>Response Data</h2>" +
                                            "<div id='responseContent'></div>" +
                                            "<button id='returnBtn' style='margin-top: 20px; padding: 10px 20px; background-color: #005685; color: #fff; border: none; border-radius: 5px; cursor: pointer;'>Return to Main Area</button>" +
                                        "</div>" +
                                     "</div>";

            // Remove the drag-and-drop feature (commenting out the drag-and-drop code)
            /*
            var theInput = document.querySelector('#mainContainer');
            DataDragAndDrop.droppable(theInput, {
                drop: function (data) {
                    theInput.value = data;
                    console.log(data);
                    var dataJSON = JSON.parse(data);
                    var objectId = dataJSON.data.items[0].objectId;
                    var objectType = dataJSON.data.items[0].objectType;
                    var securityContext = dataJSON.data.items[0].contextId;
                    console.log("type", objectType + objectId + securityContext);
                    // Call the web service
                    myWidget.callWebService(objectId, securityContext);
                },
            });
            */

            // Fetch and display all documents from 3DExperience directly
            myWidget.fetchDocuments();
            
            // Handle return button click
            document.getElementById('returnBtn')?.addEventListener('click', function () {
                myWidget.resetUI();
            });
        },

        fetchDocuments: function() {
            // Assume we are fetching all documents for simplicity
            let spaceUrl = PlatformAPI.getApplicationConfiguration("app.urls.myapps");
            var resource = '/resources/v1/modeler/documents/search';  // Endpoint for fetching all documents
            
            // Using WAFData to make an authenticated request
            WAFData.authenticatedRequest(spaceUrl + resource, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
                type: 'json',
                onComplete: function (rs) {
                    console.log("Documents fetched", rs);
                    myWidget.displayDocuments(rs); // Pass the response to display
                },
                onFailure: function (error) {
                    console.log("Error occurred", error);
                    // Handle error here (e.g., show an alert to the user)
                    alert('An error occurred while fetching documents.');
                }
            });
        },

        displayDocuments: function (response) {
            var responseForm = document.querySelector('#responseForm');
            var responseContent = document.querySelector('#responseContent');

            // Clear previous content before adding new content
            responseContent.innerHTML = '';
            var inputs = responseForm.querySelectorAll('input, textarea, select');
            inputs.forEach(function(input) {
                input.value = '';  // Clear the input value
            });

            if (response && response.member && response.member.length > 0) {
                var documents = response.member;

                // Generate the table for displaying all documents
                var tableHTML = "<table class='response-table'>";
                tableHTML += "<thead><tr><th>Document Name</th><th>Version</th><th>Type</th><th>Size (MB)</th><th>Owner</th></tr></thead>";
                tableHTML += "<tbody>";

                // Iterate over each document and add it to the table
                documents.forEach(function(document) {
                    tableHTML += "<tr>";
                    tableHTML += "<td>" + document.name + "</td>";
                    tableHTML += "<td>" + document.version + "</td>";
                    tableHTML += "<td>" + document.type + "</td>";
                    tableHTML += "<td>" + document.size + " MB</td>";
                    tableHTML += "<td>" + document.owner + "</td>";
                    tableHTML += "</tr>";
                });

                tableHTML += "</tbody></table>";
                
                responseContent.innerHTML = "<div class='table-container'>" + tableHTML + "</div>";
                responseForm.style.display = 'block';  
                widget.body.style.backgroundColor = '#ffffff';  
            } else {
                responseContent.innerHTML = "<div>No documents available</div>";
            }
        },

        resetUI: function() {
            var responseForm = document.querySelector('#responseForm');
            responseForm.style.display = 'none';
            widget.body.style.backgroundColor = '#005685'; 
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
