# somebirdsReviews
Product reviews service

## Repo Setup
### Run npm install
```
npm install
```
### Environment Variables
Create a .env file within repo root directory and add
```
DEV_DB_HOST=localhost
```
### MySQL Database Setup
```
npm run db:seed
```
This will create a database called fec_somebirds_feedback

*in order to seed the database, there must be a 'student' account with create, insert, and drop permissions.
To create this login account with all the available permissions (for simplicity), log in to MySQL on an administrative account and run the following commands
```
CREATE USER 'student'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'student'@'localhost';
```

### Build Bundle Using Webpack
Run the following to generate the bundle.js file that is needed to generate our color & size selection component
```
npm run build
```

### After Set Up
Run the following to initiate the server
```
npm run start
```
and point your browser to **localhost:3003**


##CRUD Operations

### Create / POST - Create a new Review

#### Input

- Request with JSON object in body containing the name of the reviewer, the review title, the review content, the review rating, the fit rating and the product ID of the shoe.  

```
Endpoint: `/reviews/create`

Request Body:
{
    "name": string,
    "headline": string,
    "review": string,
    "rating": integer,
    "fit_feedback": integer,
    "shoe_id": integer
 }

Request Body example:

{
    "name": Brian,
    "headline": Unhappy with this shoe,
    "review": The fitment is way off and the materail isn't that great,
    "rating": 1,
    "fit_feedback": 1,
    "shoe_id": 92
 }
```

#### Output

- If the review is created successfully, a 200 status code with 'Review created successfully' will be sent in the response.

- If the review is failed to be created, a 404 status code and message 'Error creating new Review' will be sent in the response.

### Edit / PUT - Update an exiting Review

#### Input

- Request with JSON object in body containing the name of the reviewer, the review title, the review content, the review rating, the fit rating and the product ID of the shoe to be updated.  

```
Endpoint: `/reviews/:id/update`
```

#### Output

- If the review is updated successfully, a 200 status code with 'Review updated successfully' will be sent in the response.

- If the review is failed to be updated, a 404 status code and message 'Error updating new Review' will be sent in the response.

### Delete / DELETE - delete a Review

#### Input

None

```
Endpoint: `/reviews/:reviewId/remove`
```

#### Output

- If successful, 200 status code with message "Review successfully deleted" in response body.
- If unsuccessful, 404 status code with message "Error deleting Review" in response body.
