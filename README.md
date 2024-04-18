# Inventory Manager Project for Z-Prefix Qualification

This application is an Inventory Manager built with React. It provides a user-friendly interface for managing inventory items. Users can create an account, log in, and log out. Once logged in, they can view their account details, create new inventory items, and view the entire inventory. Each inventory item has its own details page. The application uses Material-UI for a clean and modern user interface, and React Router for seamless navigation between different pages. User sessions are managed effectively, with the user’s login state persisting across browser refreshes thanks to the use of browser’s local storage. The application also includes a confirmation dialog for logging out to prevent accidental logouts. Overall, it’s a comprehensive solution for inventory management needs.

## Getting Started

This application was created using:

1. React frontend application, 
2. an Express API backend server with Knex,  
3. and a Postgres Docker image database.

### Prerequisites

npm, docker


### Installing

Clone the repo:

1. `git clone git@github.com:brianlen/z-prefix.git`

The project is Dockerized into (1) frontend, (2) backend, and (3) database. Run the following where the docker-compose.yaml is located:

2. `docker-compose up -d`

The backend runs the migrate and seed for the database automatically in the start script. In case the database needs to be manually migrate and seeded, within the backend Docker container terminal, run the following:

3. `npx knex migrate:rollback && npx knex migrate:latest && npx knex seed:run`

The React application is hosted on http://localhost:3000/
The Express API server is hosted on http://localhost:8080/
The Postgres database is hosted in the Docker container with a container name of 'db' and its default port of 5432

4. Go to `http://localhost:3000/` to use the frontend.

Three example accounts are seeded in the 'User' database. Each account has a password of 'asdf'. Passwords are stored as bcrypt hashes in the database.

5. `johndoe`, `janedoe`, `henrycho`

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