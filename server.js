const express = require('express');
const sequelize = require('sequelize');
const path = require('path');
const session = require('express-session');
const validator = require('express-validator');

const db = require('./models');
const passport = require('./config/passport');
const routes = require('./routes');
require('dotenv');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({secret:'dog', saveUninitialized:true, resave:true}));
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);
if(process.env.NODE_ENV==='production') app.use(express.static('client/build'));

db.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Live on server`);
	});
});