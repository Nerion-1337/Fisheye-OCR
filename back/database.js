const fs = require('fs');
const mysql = require('mysql2');

// Configuration de la connexion à la base de données
const connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Gotham21087*",
    database:"test"
});

// Charger les données depuis le fichier JSON
const jsonData = require('../front/data/photographers.json');
const usersData = jsonData.photographers;
const mediaData = jsonData.media;

// Création de la table "photographers"
const createUsersTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    password VARCHAR(255),
    city VARCHAR(255),
    country VARCHAR(255),
    tagline TEXT,
    price INT,
    portrait VARCHAR(255)
  )
`;

// Création de la table "media"
const createMediaTableQuery = `
  CREATE TABLE IF NOT EXISTS image (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_user INT,
    title VARCHAR(255),
    image VARCHAR(255),
    likes INT DEFAULT 0,
    date DATE,
    price INT
  )
`;

// Création de la table "media"
const createLikeTableQuery = `
  CREATE TABLE IF NOT EXISTS likes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    image_id BIGINT,
    user_like_id INT,
    user_image_id INT
  )
`;

// Exécution des requêtes pour créer les tables
connection.query(createUsersTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Table "users" créée !');
});

connection.query(createMediaTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Table "media" créée !');
});

 connection.query(createLikeTableQuery, (error, results) => {
  if (error) throw error;
  console.log('Table "likes" créée !');


  // Insertion des données des photographes
  const insertusersQuery = 'INSERT INTO users (id, name, password, city, country, tagline, price, portrait) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  usersData.forEach(photographer => {
    const { id, name, password, city, country, tagline, price, portrait_servert } = photographer;
    connection.query(insertusersQuery, [id, name, password, city, country, tagline, price, portrait_servert ], (error, results) => {
      if (error) throw error;
      console.log(`Photographe ${name} inséré !`);
    });
  });

  // Insertion des données des médias
  const insertMediaQuery = 'INSERT INTO image (id, id_user, title, image, date, price) VALUES (?, ?, ?, ?, ?, ?)';
  mediaData.forEach(media => {
    const { id, photographerId, title, image, date, price } = media;
    const image_serv = `http://localhost:3000/assets/photo/${photographerId}/${image}`;
    connection.query(insertMediaQuery, [id, photographerId, title, image_serv, date, price], (error, results) => {
      if (error) throw error;
      console.log(`Média ${title} inséré !`);
    });
  });

  // Fermeture de la connexion à la base de données
  connection.end();
});