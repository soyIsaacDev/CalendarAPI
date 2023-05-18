const server = require("express").Router();
const express = require("express");

const path = require('path');
var public = path.join(__dirname, '../../uploads');
server.use('/', express.static(public));

module.exports = {
    ImagenRoute: server
  }