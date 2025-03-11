import express from "express";
const app = express();
const port = 3000;

// Define root route using GET method
app.get('/', (req, res) => {
    // Send HTML response with group names
    res.send(`
        <h1>Our Group Members</h1>
        <ul>
            <li>Member 1: Immanuel Joy</li>
            <li>Member 2: Dwayne Jerald Dsouza</li>
        </ul>
    `);
});

// Start server and listen on specified port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// To run: nodemon server1.js
