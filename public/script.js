let currentInput = '';
let votes = { presidente: {} };

let candidates = {
  '13': { name: 'Candidato 13', photo: './img/lula.jpg' },
  '17': { name: 'Candidato 17', photo: './img/bolsonaro.jpg' }
  // Adicione mais candidatos a presidente conforme necessário
};

function clearVote() {
  currentInput = '';
  document.getElementById('candidate-number').value = '';
  showCandidateInfo();
}

function cancelVote() {
  currentInput = currentInput.slice(0, -1);
  document.getElementById('candidate-number').value = currentInput;
  showCandidateInfo();
}

function pressKey(key) {
  currentInput += key;
  document.getElementById('candidate-number').value = currentInput;
  showCandidateInfo();
}

function showCandidateInfo() {
  const info = document.getElementById('candidate-info');
  const photo = document.getElementById('candidate-photo');
  const name = document.getElementById('candidate-name');
  const candidate = candidates[currentInput];
  
  if (candidate) {
    info.style.display = 'block';
    photo.src = candidate.photo;
    name.textContent = candidate.name;
  } else {
    info.style.display = 'none';
  }
}

function confirmVote() {
  const candidate = candidates[currentInput];
  if (candidate) {
    vote(currentInput);
  } else {
    alert("Número inválido. Por favor, digite um número de candidato válido.");
  }
}

function vote(candidateNumber) {
  votes['presidente'][candidateNumber] = (votes['presidente'][candidateNumber] || 0) + 1;
  endVoting();
}

function endVoting() {
  // Esconde apenas a parte do teclado e a tela de votação
  document.getElementById('keypad').style.display = 'none';
  document.getElementById('screen').style.display = 'none';

  // Exibe a mensagem de fim e a contagem de votos
  const endScreen = document.getElementById('step-fim');
  endScreen.style.display = 'block';
  
  // Constrói e exibe a contagem de votos
  let voteCounts = '';
  for (const [candidateNumber, voteCount] of Object.entries(votes['presidente'])) {
    const candidate = candidates[candidateNumber];
    voteCounts += `<p>${candidate.name}: ${voteCount} voto(s)</p>`;
  }
  endScreen.innerHTML += voteCounts;
}


function selectCandidate(number) {
  currentInput = number;
  document.getElementById('candidate-number').value = currentInput;
  showCandidateInfo();
}
