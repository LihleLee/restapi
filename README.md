Description
This project is a basic HTTP server built using Node.js. It provides a simple RESTful API to manage items (create, read, update, delete - CRUD) stored in a local JSON file (data.json). The server listens on port 3000 and stores data in a JSON file, allowing basic operations such as adding, viewing, updating, and deleting items.

Features
GET /items - Retrieve all items from data.json.
POST /items - Add a new item to the list in data.json.
PUT /items/:id - Update an existing item by ID.
DELETE /items/:id - Delete an item by ID.

File Structure
server.js: Main file that contains the logic to handle HTTP requests and responses.
data.json: The file used to store item data as a JSON array. It is created automatically if it doesn't exist.

Requirements
Node.js (v12 or higher)

Installation
Clone the repository:
Install Node.js (if not already installed): Node.js Downloads

Start the server:

The server will run on http://localhost:3000.

API Endpoints
1. Retrieve all items
GET /items
Retrieves all the items stored in data.json.
Response: JSON array of items

2. Add a new item
POST /items
Adds a new item to the list.
Request Body: JSON object with item data (e.g., name, description).
Response: The newly created item.


Project Title: Simple HTTP JSON Server
Description
This project is a basic HTTP server built using Node.js. It provides a simple RESTful API to manage items (create, read, update, delete - CRUD) stored in a local JSON file (data.json). The server listens on port 3000 and stores data in a JSON file, allowing basic operations such as adding, viewing, updating, and deleting items.

Features
GET /items - Retrieve all items from data.json.
POST /items - Add a new item to the list in data.json.
PUT /items/:id - Update an existing item by ID.
DELETE /items/:id - Delete an item by ID.
File Structure
server.js: Main file that contains the logic to handle HTTP requests and responses.
data.json: The file used to store item data as a JSON array. It is created automatically if it doesn't exist.
Requirements
Node.js (v12 or higher)
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Install Node.js (if not already installed): Node.js Downloads

Start the server:

bash
Copy code
node server.js
The server will run on http://localhost:3000.

API Endpoints
1. Retrieve all items
GET /items
Retrieves all the items stored in data.json.
Response: JSON array of items.

2. Add a new item
POST /items
Adds a new item to the list.
Request Body: JSON object with item data (e.g., name, description).
Response: The newly created item.

3. Update an item by ID
PUT /items/:id
Updates the item with the specified ID.
Request Body: JSON object with updated fields.
Response: The updated item.

4. Delete an item by ID
DELETE /items/:id
Deletes the item with the specified ID.
Response: Success message if the item is found and deleted.

Error Handling
400 Bad Request: Returned if invalid JSON is provided in POST or PUT requests.
404 Not Found: Returned if an item is not found for the requested ID or invalid endpoint.
500 Internal Server Error: Returned if any unexpected server error occurs.
