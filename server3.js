import express from 'express';
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.json());

// GET - Read all games
app.get('/Games', (req, res) => {
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        res.send(jsonData.games); // Send only the games array
    });
});

// POST - Create new game
app.post('/Games', (req, res) => {
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        const games = jsonData.games; // Access the games array
        const newGame = {
            id: games.length + 1,
            name: req.body.name,
            releases: req.body.releases
        };
        games.push(newGame);
        fs.writeFile('./data/Games.json', JSON.stringify(jsonData), (err) => { // Write the whole object back
            if (err) {
                res.status(500).send('Error saving data');
                return;
            }
            res.status(201).send(newGame);
        });
    });
});

// PUT - Update existing game
app.put('/Games/:id', (req, res) => {
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        const games = jsonData.games;
        const gameIndex = games.findIndex(g => g.id === parseInt(req.params.id));
        if (gameIndex === -1) {
            res.status(404).send('Game not found');
            return;
        }
        games[gameIndex] = { ...games[gameIndex], ...req.body };
        fs.writeFile('./data/Games.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                res.status(500).send('Error saving data');
                return;
            }
            res.send(games[gameIndex]);
        });
    });
});

// DELETE - Remove a game
app.delete('/Games/:id', (req, res) => {
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const jsonData = JSON.parse(data);
        let games = jsonData.games;
        const gameIndex = games.findIndex(g => g.id === parseInt(req.params.id));
        if (gameIndex === -1) {
            res.status(404).send('Game not found');
            return;
        }
        games = games.filter(g => g.id !== parseInt(req.params.id));
        jsonData.games = games; // Update the games array in the object
        fs.writeFile('./data/Games.json', JSON.stringify(jsonData), (err) => {
            if (err) {
                res.status(500).send('Error saving data');
                return;
            }
            res.status(204).send();
        });
    });
});

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});