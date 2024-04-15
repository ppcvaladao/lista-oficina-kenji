const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Set view engine as EJS
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

// Rota principal that renders the EJS template
app.get('/', (req, res) => {
  res.render('index');
});

// Simple in-memory storage for votes
let votes = {
  vereador: { A: 0, B: 0 },
  prefeito: { X: 0, Y: 0 }
};


// Rota para registrar votos para vereador
app.get('/votar-vereador/:candidato', (req, res) => {
  const candidato = req.params.candidato;
  if (votes.vereador.hasOwnProperty(candidato)) {
    votes.vereador[candidato] += 1;
    res.send(`Voto registrado para Vereador: ${candidato}`);
  } else {
    res.status(400).send('Candidato inválido para vereador');
  }
});

// Rota para registrar votos para prefeito
app.get('/votar-prefeito/:candidato', (req, res) => {
  const candidato = req.params.candidato;
  if (votes.prefeito.hasOwnProperty(candidato)) {
    votes.prefeito[candidato] += 1;
    res.send(`Voto registrado para Prefeito: ${candidato}`);
  } else {
    res.status(400).send('Candidato inválido para prefeito');
  }
});

// Rota para obter os votos totais
app.get('/resultados', (req, res) => {
    res.json(votes);
  });
  

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
