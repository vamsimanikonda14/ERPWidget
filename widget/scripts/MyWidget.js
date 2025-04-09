define("DS/GetPartDetails/scripts/MyWidget", ['DS/PlatformAPI/PlatformAPI', 'DS/WAFData/WAFData'], function (PlatformAPI, WAFData) {
    'use strict';

    var myWidget = {
        onLoad: function () {
            // Set up HTML content within the widget body
            widget.body.innerHTML = `
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }

                    nav {
                        background-color: #333;
                        color: white;
                        padding: 15px;
                        text-align: center;
                    }

                    .nav-buttons button {
                        margin: 10px;
                        padding: 10px;
                        font-size: 16px;
                        cursor: pointer;
                        background-color: #007BFF;
                        color: white;
                        border: none;
                        border-radius: 5px;
                    }

                    .nav-buttons button:hover {
                        background-color: #0056b3;
                    }

                    #tableContainer {
                        display: none;
                        margin-top: 20px;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }

                    table, th, td {
                        border: 1px solid #ddd;
                    }

                    th, td {
                        padding: 10px;
                        text-align: left;
                    }

                    #formContainer {
                        display: none;
                        margin-top: 20px;
                    }

                    #formContainer form {
                        margin: 20px 0;
                    }

                    #formContainer input {
                        padding: 10px;
                        margin: 5px;
                        width: 100%;
                        box-sizing: border-box;
                    }

                    #formContainer button {
                        padding: 10px;
                        margin: 10px 0;
                        background-color: #28a745;
                        color: white;
                        border: none;
                        cursor: pointer;
                        border-radius: 5px;
                    }

                    #formContainer button:hover {
                        background-color: #218838;
                    }
                </style>
                
                <nav>
                    <h1>Skyron ERP</h1>
                    <div class="nav-buttons">
                        <button id="showPartButton">Show Part Data</button>
                        <button id="showDocumentButton">Show Document Data</button>
                        <button id="createPartButton">Create Part</button>
                        <button id="createDocumentButton">Create Document</button>
                    </div>
                </nav>
                <div id="mainContent">
                    <div id="welcomeNote">
                        <h2>Welcome to Skyron ERP</h2>
                        <p>Skyron ERP is a powerful system designed to streamline your organization's processes. 
                           With our intuitive interface, you can easily manage parts, documents, and much more.</p>
                    </div>
                </div>
                <div id="tableContainer"></div>
                <div id="formContainer"></div>
            `;
            
            // Define API URLs
            const apiUrlParts = 'http://localhost:5000/api/parts';
            const apiUrlDocuments = 'http://localhost:5000/api/documents';

            // Event listeners for buttons
            document.getElementById('showPartButton').addEventListener('click', function () {
                fetchParts(apiUrlParts);
            });
            document.getElementById('showDocumentButton').addEventListener('click', function () {
                fetchDocuments(apiUrlDocuments);
            });

            // Function to fetch parts and display in a table
            async function fetchParts(apiUrlParts) {
                document.getElementById('welcomeNote').style.display = 'none';
                document.getElementById('mainContent').style.display = 'none';
                document.getElementById('tableContainer').style.display = 'block';
                document.getElementById('formContainer').style.display = 'none';

                try {
                    const response = await fetch(`${apiUrlParts}/all`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data && Array.isArray(data.parts)) {
                            createTable(data.parts, 'part');
                        }
                    } else {
                        console.error('Error fetching parts:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching parts:', error);
                }
            }

            // Function to fetch documents and display in a table
            async function fetchDocuments(apiUrlDocuments) {
                document.getElementById('welcomeNote').style.display = 'none';
                document.getElementById('mainContent').style.display = 'none';
                document.getElementById('tableContainer').style.display = 'block';
                document.getElementById('formContainer').style.display = 'none';

                try {
                    const response = await fetch(`${apiUrlDocuments}/all`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data && Array.isArray(data.documents)) {
                            createTable(data.documents, 'document');
                        }
                    } else {
                        console.error('Error fetching documents:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error fetching documents:', error);
                }
            }

            // Function to create table for parts or documents
            function createTable(data, type) {
                const tableContainer = document.getElementById('tableContainer');
                tableContainer.innerHTML = '';

                const table = document.createElement('table');
                const tableHeader = document.createElement('thead');
                const tableBody = document.createElement('tbody');

                // Table headers based on type (part/document)
                if (type === 'part') {
                    tableHeader.innerHTML = `
                        <tr>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Revision</th>
                            <th>Description</th>
                            <th>Project</th>
                            <th>Organization</th>
                            <th>Owner</th>
                            <th>Actions</th>
                        </tr>
                    `;
                } else if (type === 'document') {
                    tableHeader.innerHTML = `
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Revision</th>
                            <th>Originated</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    `;
                }

                // Create table rows based on data
                data.forEach(item => {
                    const row = document.createElement('tr');
                    let rowContent = '';

                    if (type === 'part') {
                        rowContent = `
                            <td>${item.title}</td>
                            <td>${item.type}</td>
                            <td>${item.name}</td>
                            <td>${item.revision}</td>
                            <td>${item.description}</td>
                            <td>${item.project}</td>
                            <td>${item.organization}</td>
                            <td>${item.owner}</td>
                            <td>
                                <button onclick="editRow('${type}', '${item._id}')">Edit</button>
                                <button onclick="deleteRow('${type}', '${item._id}')">Delete</button>
                            </td>
                        `;
                    } else if (type === 'document') {
                        rowContent = `
                            <td>${item.name}</td>
                            <td>${item.description}</td>
                            <td>${item.title}</td>
                            <td>${item.type}</td>
                            <td>${item.revision}</td>
                            <td>${item.originated}</td>
                            <td>${item.createdAt}</td>
                            <td>
                                <button onclick="editRow('${type}', '${item._id}')">Edit</button>
                                <button onclick="deleteRow('${type}', '${item._id}')">Delete</button>
                            </td>
                        `;
                    }

                    row.innerHTML = rowContent;
                    tableBody.appendChild(row);
                });

                table.appendChild(tableHeader);
                table.appendChild(tableBody);
                tableContainer.appendChild(table);
            }

            // Edit part or document (PUT request)
            async function editRow(type, id) {
                const updatedData = { title: 'Updated Title', description: 'Updated Description', revision: '1.1' };

                try {
                    const response = await fetch(`${type === 'part' ? apiUrlParts : apiUrlDocuments}/${id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedData),
                    });

                    if (response.ok) {
                        alert(`${type} updated successfully`);
                        type === 'part' ? fetchParts(apiUrlParts) : fetchDocuments(apiUrlDocuments);
                    } else {
                        alert('Failed to update');
                    }
                } catch (error) {
                    console.error('Error editing row:', error);
                }
            }

            // Delete part or document (DELETE request)
            async function deleteRow(type, id) {
                try {
                    const response = await fetch(`${type === 'part' ? apiUrlParts : apiUrlDocuments}/${id}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        alert(`${type} deleted successfully`);
                        type === 'part' ? fetchParts(apiUrlParts) : fetchDocuments(apiUrlDocuments);
                    } else {
                        alert('Failed to delete');
                    }
                } catch (error) {
                    console.error('Error deleting row:', error);
                }
            }
        },
    };

    widget.addEvent('onLoad', myWidget.onLoad);
});
