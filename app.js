const express = require('express');
const app = express();
const path = require('path');

// Set up middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set the directory for views and the view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Main route to render the EJS template
app.get('/', (req, res) => {
  res.render('index');
});

// In-memory storage for presidential votes
let votes = {
  '13': 0, // Candidate number for the first presidential candidate
  '17': 0  // Candidate number for the second presidential candidate
};

// Route to register votes for presidential candidates
app.get('/votar/:candidato', (req, res) => {
  const candidato = req.params.candidato;
  if (votes.hasOwnProperty(candidato)) {
    votes[candidato] += 1;
    res.send(`Voto registrado para o candidato número: ${candidato}`);
  } else {
    res.status(400).send('Candidato inválido para presidente');
  }
});

// Route to retrieve total votes
app.get('/resultados', (req, res) => {
  res.json(votes);
});

// Setting up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
