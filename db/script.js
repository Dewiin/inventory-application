#! /usr/bin/env node

const { Client } = require('pg');
require("dotenv").config();

const SQL = `
CREATE TYPE GENDER AS ENUM ('male', 'female'); 

CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) UNIQUE NOT NULL,
    sprite TEXT
);

CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(20) UNIQUE NOT NULL,
    gender GENDER NOT NULL
);

CREATE TABLE IF NOT EXISTS pokemons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) UNIQUE NOT NULL,
    sprite TEXT,
    pokedex_id INTEGER UNIQUE,
    type1 VARCHAR(20) NOT NULL,
    type2 VARCHAR(20),
    hp INTEGER NOT NULL,
    attack INTEGER NOT NULL,
    defense INTEGER NOT NULL,
    sp_attack INTEGER NOT NULL,
    sp_defense INTEGER NOT NULL,
    speed INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS trainer_pokemons (
    trainer_id INT REFERENCES trainers(id) ON DELETE CASCADE,
    pokemon_id INT REFERENCES pokemons(id) ON DELETE CASCADE,
    PRIMARY KEY (trainer_id, pokemon_id)
);

INSERT INTO trainers (name, gender) 
VALUES ('Nate', 'male'), ('May', 'female');
`;

async function main() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	});
	await client.connect();
	await client.query(SQL);
	await client.end();
	console.log('done');
}

main();