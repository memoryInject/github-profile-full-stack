
# Github Profile

**Note: This project developed and tested on Ubuntu 20.04 LTS, Some of the environment setup might be different on MacOS and Windows.**

## Tech Stack

**Frontend:** React, TypeScript, Redux-Toolkit, Bootstrap

**Backend :** NodeJS, TypeScript, Express

**Front-end Caching:** [RTK Query](https://redux-toolkit.js.org/rtk-query/usage/cache-behavior)

## File structure
```bash
.
├── README.md
├── backend
│   ├── build
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── bin
│   └── dev-local-frontend-backend
├── compose
│   └── local
├── docker-compose.yml
├── frontend
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   ├── src
│   └── tsconfig.json
└── notes.txt
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



## Installation

Frontend is build with React with Redux-Toolkit and Typescript.    
Backend is build with NodeJS, Express and Typescript.   
**(No need to install these if running under Docker)**

```bash
  npm install -g ts-node typescript
```

### Development

#### Local (without Docker, if running docker skip this part)
After all the environment setup, go to frontend directory and install npm packages.
```bash
  cd frontend
  npm install
```
Then go to backend directory and install npm packages
```bash
  cd backend
  npm install
```

Once both frontend and backend packages installed successfully go to backend and run the server.
```bash
  cd backend
  npm run dev
```

Then open another terminal and go to frontend directory for running client.
```bash
  cd frontend
  npm start
```

After successfully running these two development servers, got to `http://localhost:3000` to see the project in a browser.    
**Note: client server running on port 3000 and backend running on port 8000** 

#### Docker
If running under docker follow the steps below:  

Open a new terminal at the root of the project and run the command (Make sure docker is running and run this command at root).
```bash
  ./compose/local/bin/up-build.sh
```
For windows run this command insted of the command above, also make sure that run this command at root directory:
```bash
  docker-compose up --build
```
After successfully build and up the docker, got to http://localhost:3000 to see the project in a browser.
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## API Reference

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
| `code`      | `string` | **Required**. code came from github login stage |

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
