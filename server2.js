import express from "express";
import fs from 'fs'; // Added fs import

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/favicon.ico', (req, res) => {
    res.status(204).end(); // 204 = No Content (suppresses the error)
});

app.get('/Games', (req, res) => { // Fixed route path
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading games data');
            return;
        }
        res.send(data);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
