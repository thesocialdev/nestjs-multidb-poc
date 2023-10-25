# NestJS Personality API Testing Guide

This guide outlines the steps to test the Personality API implemented in NestJS using either a MongoDB or PostgreSQL database.

## Prerequisites

Ensure you have the following installed on your machine:

- Docker
- Docker Compose
- Node.js
- Yarn (or npm)

## Setup

1. Clone the repository to your local machine.
2. Navigate to the project directory.

## Running the Services

1. Start the databases using Docker Compose:

    ```bash
    docker-compose up -d
    ```

2. Install the project dependencies:

    ```bash
    yarn install
    ```

## Testing

1. Start the NestJS server with the desired database type using the `DB_TYPE` environment variable. For MongoDB:

    ```bash
    DB_TYPE=mongodb yarn start
    ```

   For PostgreSQL:

    ```bash
    DB_TYPE=postgresql yarn start
    ```

   The server will start and connect to the specified database.

2. Open a new terminal and navigate to the project directory.

3. Execute the testing script:

    ```bash
    ./test.sh
    ```

   The script will send a series of HTTP requests to the API to test CRUD operations for the `Personality` model.

4. Observe the output of the script to verify the API's behavior.

5. Stop the server using `Ctrl + C`, and repeat steps 1-4 for the other database type by updating the `DB_TYPE` environment variable, restarting the server, and running the script again.

## Stopping Services

1. Stop the Docker containers:

    ```bash
    docker-compose down
    ```

This concludes the testing guide for the Personality API.

