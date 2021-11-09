const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
 'mysql://vo1k563fjcq1mght:xzkapkb7cgrqsspb@x8autxobia7sgh74.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/snpf7b5yeg3jcrem'
);

