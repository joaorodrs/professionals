<h1 align="center">Professional Finding</h1>

## 📌 Index
- [About](#about)
- [What's inside the box](#whats-inside-the-box)
  - [Back-end](#witd-back-end)
  - [Front-end](#witd-front-end)
- [How to play](#how-to-play)
  - [Back-end](#htp-back-end)
  - [Front-end](#htp-front-end)
- [To implement](#to-implement)
- [Additional](#additional)

<h1 id="about">❓ About</h1>

The project has both front-end and back-end features, and it's deal is a simple CRUD to two main entities: The <b>professional</b> and the <b>professional type</b>.

The professionals have the following properties:
```
{
  name: String,
  phoneNumber: String, // (XX) XXXXX-XXXX
  email: String,
  professionalType: String, // the professional type linked to the professional
  situation: Boolean
}
```
And the professional type properties are:
```
{
  description: String,
  phoneNumber: String, // (XX) XXXXX-XXXX
  situation: Boolean
}
```

<h1 id="whats-inside-the-box">📦 What's inside the box</h1>

<h2 id="witd-back-end">📡 Back-end</h2>

The back-end was made with NodeJS and Express, and uses this main dependencies:
- Express
- Pg (PostgreSQL)
- Sequelize ORM
- SQLite
- Jest
- Supertest

<h2 id="witd-front-end">🌐 Front-end</h2>

The project was done in the boilerplate of CRA (Create React App), and uses this main dependencies:
- ReactJS
- Material UI (Core and Icons)
- Axios
- Yup

<h1 id="how-to-play">🎮 How to play</h1>

First of all, you'll need to clone the repo and go to the project file. You can do this using this command line:
```
~$ git clone git@github.com:joaorodrs/professional-finding.git

~$ cd professional-finding
```
Or if you already have the project in your drive, just proceed to the next steps.

There's two setups that you'll need to do to fully setup the application.

<h2 id="htp-back-end">📡 Back-end</h2>

1. You'll need to go to the back-end directory, this way:
```
~/professional-finding$ cd server
```
2. And then you can install the dependencies with: `npm i` or `yarn`

3. You now can run the tests, to see if all is going well. Run this command:
```
~/professional-finding/server$ npm test // or yarn test
```
If something goes wrong on the tests, you can go on my Discord (<b>João Paulo#0735</b>) or Twitter (in my GitHub profile), but first make sure that all is right with the setup until now.

6. If everything is fine, then you can just run:
```
~/professional-finding/server$ npm run dev // or yarn dev
```
7. You can also run the project in a docker container, running:
```
~/professional-finding/server$ docker-compose up
```
Both commands (6 and 7) will run the development server at `http://localhost:3333`, but the docker one will run a PostgreSQL database and the other will run a local database that can be found in `./src/database/dev.sqlite`.

<h2 id="htp-front-end">🌐 Front-end</h2>

1. Switch up to the front-end folder using:
```
~/professional-finding/server$ cd ../frontend
```
1. Just install the dependencies by using `npm i` or `yarn`
2. And then run the project in development with:
```
~/professional-finding/frontend$ npm start // or yarn start
```
The front-end will be running in http://localhost:3000

### That's it! Now, with both back-end and front-end servers running (localhost:3333 and localhost:3000), you can see all the functionalities.

<h1 id="to-implement">👀 To implement</h1>

- [ ] Login in the platform
  - [ ] Make JWT in the back-end or Firebase Auth in the front-end
  - [ ] Make users CRUD
- [ ] Make a search feature to both professionals and professional types

<h1 id="additional">❗ Additional</h1>

- You can see the back-end API docs right here
- This project is part of a hiring process by Maxxi Data and all the requirements can be found here

---

<h2 align="center">Thank you for the attention!</h2>

---