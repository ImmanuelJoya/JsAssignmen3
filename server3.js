// Import required modules
import express from 'express';
import fs from 'fs';
// Initialize Express application
const app = express();
// Set port number
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET - Read all games
app.get('/Games', (req, res) => {
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        res.send(JSON.parse(data));
    });
});

// POST - Create new game (Test this with Postman)
app.post('/Games', (req, res) => {
    fs.readFile('./data/Games.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }
        const games = JSON.parse(data);
        const newGame = {
            id: games.length + 1,
            name: req.body.name,
            releases: req.body.releases
        };
        games.push(newGame);
        
        fs.writeFile('./data/Games.json', JSON.stringify(games), (err) => {
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
        const games = JSON.parse(data);
        const gameIndex = games.findIndex(g => g.id === parseInt(req.params.id));
        
        if (gameIndex === -1) {
            res.status(404).send('Game not found');
            return;
        }
        
        games[gameIndex] = { ...games[gameIndex], ...req.body };
        
        fs.writeFile('./data/Games.json', JSON.stringify(games), (err) => {
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
        let games = JSON.parse(data);
        const gameIndex = games.findIndex(g => g.id === parseInt(req.params.id));
        
        if (gameIndex === -1) {
            res.status(404).send('Game not found');
            return;
        }
        
        games = games.filter(g => g.id !== parseInt(req.params.id));
        
        fs.writeFile('./data/Games.json', JSON.stringify(games), (err) => {
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

// To run: nodemon server3.js
