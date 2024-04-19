# Inventory Manager Project for Z-Prefix Qualification

This application is an Inventory Manager built with React. It provides a user-friendly interface for managing inventory items. Users can create an account, log in, and log out. Once logged in, they can view their account details, create new inventory items, and view the entire inventory. Each inventory item has its own details page. The application uses Material-UI for a clean and modern user interface, and React Router for seamless navigation between different pages. User sessions are managed effectively, with the user’s login state persisting across browser refreshes thanks to the use of browser’s local storage. The application also includes a confirmation dialog for logging out to prevent accidental logouts. Overall, it’s a comprehensive solution for inventory management needs.

## Getting Started

This application was created using:

1. React frontend application, 
2. an Express API backend server with Knex,  
3. and a Postgres Docker image database.

### Prerequisites

* npm
* docker


### Install and Setup

Clone the repo:

1. `git clone git@github.com:brianlen/z-prefix.git`

The project is Dockerized into (1) frontend, (2) backend, and (3) database. Run 'npm install' in the local ./frontend and ./backend directories. This is necessary to have the local dependencies for the bind mount volumes.

2.  `npm install`

Run 'docker-compose up' in the directory where the docker-compose.yaml is located:

3. `docker-compose up -d`

The backend runs the migrate and seed for the database automatically in the start script. In case the database needs to be manually migrate and seeded, within the backend Docker container terminal, run the following:

4. `npx knex migrate:rollback && npx knex migrate:latest && npx knex seed:run`

The React application is hosted on http://localhost:3000/
The Express API server is hosted on http://localhost:8080/
The Postgres database is hosted in the Docker container with a container name of 'db' and its default port of 5432

5. In your browser, go to `http://localhost:3000/` to use the frontend application.

Three example accounts are seeded in the 'User' table in the 'my_database' database. Each account has a password of `asdf`. Passwords are stored as bcryptjs hashes in the database at account creation. Use one of these account credentials, or create your own account, to login:

6. Usernames: `johndoe`, `janedoe`, `henrycho`


## Built With

* npm
* React
* mui
* Express
* Knex
* Postgres
* Docker

## Authors

* **Henry Cho**

## License

None.

## Acknowledgments

* Jeff Haddock
* Matt Wegenke
* James Kelley
