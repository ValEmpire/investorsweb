# InvestorsWeb

This is an app for individual or company who is looking for funding to their projects or products. We built a marketplace to help them bring their creative projects to life.

## We are [Live!](http://138.197.155.90/)

### Run Locally

Clone the project

```bash
  git clone https://github.com/ValEmpire/investorsweb.git investorsweb
```

Adding API key dependencies
This project has features that use Firebase and Stripe, both of which will require API keys to function. Go to Firebase and Stripe to create accounts on the respective platforms. Create a .env in both the client and server directories, matching the key-value pairs in .example.env.

#### Client

For Client Go to the project directory

```bash
  cd investorsweb/client
```

Install dependencies

```bash
  npm install
```

Start the client

```bash
  npm start
```

#### Server

For Server Go to the project directory

```bash
  cd investorsweb/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon -L
```

### Features

- Login and Registration Securely
- Very Secure. We use Http-Only Cookie
- Very well validated both in client and server side
- Explore and filter projects
- Creating, deleting, updating project
- Updating user account, including security
- Creating Stripe account
- Creating, updating, validating, deleting Debit and Credit cards
- Company Business Dashboard with Graph
- User can comments and reply to comments
- Investors can invest to a project
- Investors has their own Dashboard
- Server is REST api so it can be use seperately

### Tech Stack

**Client:** React, MateriaUI, Redux, SocketClient, Firebase

**Server:** Node, Express, Firebase-admin, Socket.io, Sequelize, PostgreSQL, Passport, JWT

### Screenshots

![App Screenshot](https://raw.githubusercontent.com/ValEmpire/files/main/Captures.PNG)

![App Screenshot](https://raw.githubusercontent.com/ValEmpire/files/main/Capturess.PNG)

### Stripe

#### Cards

Please read stripe testing [Documentation](https://stripe.com/docs/testing)

Or you can use this card numbers.

| Card numbers        | CVC          | Date            |
| ------------------- | ------------ | --------------- |
| 4242 4242 4242 4242 | any 3 digits | any future date |
| 5555 5555 5555 4444 | any 3 digits | any future date |

#### Accounts

For stripe onboarding. It sometimes asks password if it detects different ip address or multiple stripe accounts. Input **lighthouseteam** as a password.
