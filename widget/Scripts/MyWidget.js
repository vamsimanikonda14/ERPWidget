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

            // The drag-and-drop feature was removed earlier, and now we are not calling any fetch function.
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

            // The fetchDocuments method is now removed, as you requested.

            // Handle return button click
            document.getElementById('returnBtn')?.addEventListener('click', function () {
                myWidget.resetUI();
            });
        },

        // Reset UI (Hide response form and reset background color)
        resetUI: function() {
            var responseForm = document.querySelector('#responseForm');
            responseForm.style.display = 'none';
            widget.body.style.backgroundColor = '#005685'; 
        }
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
