DROP DATABASE IF EXISTS social_app;

CREATE DATABASE social_app;

\c social_app

CREATE TABLE IF NOT EXISTS people (
  id SERIAL primary key,
  firstname VARCHAR(25),
  lastname VARCHAR(25),
  created_at TIMESTAMP NOT NULL DEFAULT now()
);


\d+ people

INSERT INTO people (firstname, lastname) VALUES ('Mary', 'Vogt');

\q

