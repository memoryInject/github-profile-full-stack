
# Github Profile

**Note: This project developed and tested on Ubuntu 20.04 LTS, Some of the environment setup might be different on MacOS and Windows.**

## Tech Stack

**Frontend:** React, TypeScript, Redux-Toolkit, Bootstrap
**Backend :** NodeJS, TypeScript, Express

**Frontend Caching:** [RTK Query](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)   
**Backend Caching:** Redis

**Frontend Test:** React Jest with [MSW](https://mswjs.io/)   
**Backend Test:** Jest with [MSW](https://mswjs.io/) and supertest   

**Linter:** ESLint    
**Formatter:** Prettier

## File structure
```bash
.
├── bin
│   └── dev-local-frontend-backend
├── frontend
│   ├── tsconfig.json
│   ├── public
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   └── src
├── README.md
├── docker-compose.yml
├── compose
│   ├── local
│   └── test
├── docker-compose.test.yml
├── backend
│   ├── tsconfig.json
│   ├── build
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── tsoa.json
│   ├── public
│   └── src
├── Screenshot-modal-box.jpg
├── Screenshot-home-page.jpg
├── Screenshot-iphone.jpg
└── data-flow.jpg


```
From root directory,   
**frontend:** `./frontend`  
**backend:** `./backend`
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, located in `./backend/.env` (Create if not exists)

`PORT=8000`

`NODE_ENV=development`

`CLIENT_ID=<github-client-id>`

`CLIENT_SECRET=<github-client-secret>`

`REDIS_URI=redis://localhost:6379`

`REDIS_TTL=2`


Make sure redis is running on default port or change `REDIS_URI`.  
`REDIS_TTL` is cache life span for redis, 2 minutes here.

**These environment files needed for both local and docker runs.**
## Installation

Frontend is build with React with Redux-Toolkit and Typescript.    
Backend is build with NodeJS, Express and Typescript.   
**(No need to install these if running under Docker)**

```bash
  npm install -g ts-node typescript
```

Also make sure to install redis. **(No need to install these if running under Docker)**

### Development
There are two ways to run this project   
 - Run locally 
 - Run with docker

### Run Locally (without Docker, if running docker skip this part)      
Make sure redis is running.

After all the environment setup, go to the frontend directory and install npm packages.
```bash
  cd frontend
  npm install
```
Then go to the backend directory and install npm packages
```bash
  cd backend
  npm install
```

Once both frontend and backend packages installed successfully go to backend and run the server.
```bash
  cd backend
  npm run dev
```

Then open another terminal and go to the frontend directory for running client.
```bash
  cd frontend
  npm start
```

After successfully running these two development servers, got to `http://localhost:3000` to see the project in a browser.    
**Note: client server running on port 3000 and backend running on port 8000** 

### Run with Docker (Recommended option)
If running under docker follow the steps below:  

Open a new terminal at the root of the project and run the command (Make sure docker is running and run this command at the root).
```bash
  ./compose/local/bin/up-build.sh
```
For windows run this command instead of the command above, also make sure that run this command at root directory:
```bash
  docker-compose up --build
```
After successfully build and up the docker, got to http://localhost:3000 to see the project in a browser.  

There are lots of commands available in `./compose/local/bin/` for checking logs, shell to the container etc.  
## Running Tests
There are two ways to run the test  
 - Run locally
 - Run with docker

Make sure to setup a `.env.test.local` under `./backend/` the file is already coming with this project, just in case if it's not there use the environment variables below.

`PORT=8000`

`NODE_ENV=development`

`CLIENT_ID=asdf1234`

`CLIENT_SECRET=qwert1234`

`REDIS_URI=redis://localhost:6379`

`REDIS_TTL=2`

**Both `.env` and `.env.test.local` environment files needed for local and docker tests.**

### Run test locally
Make sure redis is running.

To run tests, go to the frontend `cd frontend`

```bash
  npm run test
```

For backend tests, go to the backend `cd backend`

```bash
  npm run test
```

### Run test with Docker

To run tests, make sure the current working directory is the root of this project then run this command first    

```bash
  ./compose/test/bin/up-build.sh
```

After successfully build and up the docker containers, open another terminal and run this command for frontend test  

```bash
  ./compose/test/bin/test-frontend.sh
```
For the backend test, run this command

```bash
  ./compose/test/bin/test-backend.sh
```

## API Reference
This project builds with swagger OpenAPI Specification, by default swagger API docs will be available at http://localhost:8000/api-docs/    

Or checkout the live docs: https://github-profile-rc2j.onrender.com/api-docs/

#### Get client id

```http
  GET /api/v1/auth/client-id
```

#### Get access token

```http
  GET /api/v1/auth/get-access-token?code=<code-recieved-from-github>
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `code`      | `string` | **Required**. code came from the github login stage |

#### Get user data

```http
  GET /api/v1/user/profile
```

The access token must be stored in the client cookie `{ access_token: string }` **Required**.

#### Get user repos data

```http
  GET /api/v1/user/repos?page=1
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `page`      | `number` | **Required**. Current page. 5 repos per page by default |

The access token must be stored in the client cookie `{ access_token: string }` **Required**.

#### Logout user

```http
  GET /api/v1/user/logout
```
