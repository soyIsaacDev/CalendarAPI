const express = require('express');
const app = express();

app.get("/", (req,res) => {
    res.send("Hola, el servidor esta activo");
});

module.exports = app;
