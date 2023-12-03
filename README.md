# Basic Express.js Application 
Simple Express.js application that simulates a basic API for managing user information, student statistics, and articles.

## Installation
1. Clone the repository:

`git clone https://github.com/kiowoji/express-project.git`

2. Navigate to the projects folder: 

`cd express-project`

3. Install dependencies:

`npm install`

4. Start the application:

`npm start`

The application will be running at `http://localhost:3000`.

## Usage

### User Management

- Get All Users: 

`GET /users`

- Get User By Email:

`GET /users/:email`

- Add New User:

`POST /users`

Example Body:

```
{
  "firstName": "New",
  "lastName": "New",
  "email": "newemail@example.com",
  "password": "mysecretpassword",
  "age": 30,
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zip": "12345",
    "country": "USA"
  },
  "createdAt": "2023-05-06T08:12:34.567Z",
  "tags": ["Sales", "Marketing"]
}
```

- Update User's Data: 

`PUT /users/:email`

- Delete User By Email:

`DELETE /users/:email`

### Student Statistics

- Get All Students:

`GET /students`

- Get Student By Name:

`GET /students/:name`

- Get Student with Worst Homework Score:

`GET /students/worst-homework`

### Articles

- Get All Articles:

`GET /articles`

- Add New Article:

`POST /articles`

Example Body:

```
{
  "name": "ArticleName",
  "description": "ArticleDescription",
  "type": "ArticleType",
  "tags": ["Tag1", "Tag2"]
}
```

- Update Article Tags by Name:

`PUT /articles/:name`

Example Body: 

`["UpdatedTag1", "UpdatedTag2"]`

## Testing

For testing, run the following command: 

`npm test`