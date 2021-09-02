import express, { Application } from 'express';
import http from 'http';
import yaml from "yamljs";
import cors from "cors";
import morgan from 'morgan';
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload';

import routes from './router/routes'

require('dotenv').config();

const config = yaml.load("config.yaml");

const app: Application = express();

app.use(cors());
app.use(morgan('dev'));

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(config.middleurl, routes)
app.set("port", config.port);

const server = http.createServer(app);

server.listen(app.get("port"), function () {
  let env = process.env['ENV'];
  
  console.log("[API]", "booting with environment : " + env);
  console.log("[API]", "svc address :", server.address());
  console.log("[API]", "mysql host :", config[`${env}`].host);
  console.log("[API]", "mysql username :", config[`${env}`].username);
  console.log("[API]", "mysql database :", config[`${env}`].database);

});