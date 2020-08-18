const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const pdfTemplate = require("../documents");

app.set("port", process.env.port || 5000);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//POST - PDF generation and fetching of the data
app.post("/create-pdf", (req, res) => {
    console.log(req.body);
    pdf.create(pdfTemplate(req.body), {}).toFile("result.pdf", (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    });
});

//GET - send the generated PDF to client
app.get("/fetch-pdf", (req, res) => {
    res.sendFile(`${__dirname}/result.pdf`);
});

app.get("/", (req, res, next) => {
    res.send("<h1>Hello world<h1>");
});

app.listen(app.get("port"), (server) => {
    console.info(`Server listen on port ${app.get("port")}`);
});