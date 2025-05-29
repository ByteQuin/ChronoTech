const cards = [
  '2_of_clubs', '2_of_diamonds', '2_of_hearts', '2_of_spades',
  '3_of_clubs', '3_of_diamonds', '3_of_hearts', '3_of_spades',
  '4_of_clubs', '4_of_diamonds', '4_of_hearts', '4_of_spades'
];

const gameBoard = $('#game-board');
const gameCards = [...cards, ...cards].sort(() => 0.5 - Math.random());

let flippedCards = [];
let lockBoard = false;
let moves = 0;
let timer;
let seconds = 0;
let minutes = 0;
let playerName = 'Jugador';

function loadLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const tbody = $('#leaderboard tbody');
  tbody.empty();

  leaderboard.forEach((entry) => {
    tbody.append(`
      <tr>
        <td>${entry.name}</td>
        <td>${entry.time}</td>
        <td>${entry.moves}</td>
      </tr>
    `);
  });
}

function createCard(cardName) {
  const card = $('<div></div>');
  card.addClass('card');
  card.data('card', cardName);
  const img = $('<img>').attr('src', 'assets/img/cards.png'); // reverso
  card.append(img);
  
  card.on('click', function() {
    if (lockBoard || $(this).hasClass('matched') || flippedCards.includes($(this)[0])) return;

    $(this).find('img').attr('src', `assets/img/${cardName}.png`); // Muestra la carta
    flippedCards.push($(this)[0]);

    if (flippedCards.length === 2) {
      lockBoard = true;
      const [first, second] = flippedCards;
      if ($(first).data('card') === $(second).data('card')) {
        $(first).addClass('matched');
        $(second).addClass('matched');
        flippedCards = [];
        moves++;
        updateMoves();
        checkVictory();
        lockBoard = false;
      } else {
        setTimeout(() => {
          $(first).find('img').attr('src', 'assets/img/cards.png');
          $(second).find('img').attr('src', 'assets/img/cards.png');
          flippedCards = [];
          moves++;
          updateMoves();
          lockBoard = false;
        }, 1000);
      }
    }
  });

  return card;
}

function updateMoves() {
  $('#moves').text(`Movimientos: ${moves}`);
}

function checkVictory() {
  if ($('.matched').length === gameCards.length) {
    clearInterval(timer);
    $('#victory-modal').show();
    $('#player-record-name').text(playerName);
    $('#player-record-time').text(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
    $('#player-record-moves').text(moves);

    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({
      name: playerName,
      time: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
      moves: moves
    });

    leaderboard.sort((a, b) => {
      if (a.moves === b.moves) {
        return a.time.localeCompare(b.time);
      }
      return a.moves - b.moves;
    });

    localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 5)));
    loadLeaderboard();
  }
}

function startTimer() {
  timer = setInterval(() => {
    seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    $('#timer').text(`Tiempo: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
  }, 1000);
}

$('#start-game').on('click', function() {
  playerName = $('#player-name').val() || 'Jugador';
  if (playerName === '') return;

  $('#player-info').hide();
  $('#status').show();
  $('#game-board').show();
  loadLeaderboard();

  gameBoard.empty();
  gameCards.forEach(card => {
    gameBoard.append(createCard(card));
  });

  startTimer();
});

$('#restart').on('click', function() {
  moves = 0;
  seconds = 0;
  minutes = 0;
  flippedCards = [];
  $('#moves').text(`Movimientos: ${moves}`);
  $('#timer').text(`Tiempo: 00:00`);
  $('#victory-modal').hide();
  $('#game-board').empty();
  gameCards.sort(() => 0.5 - Math.random());
  gameCards.forEach(card => {
    gameBoard.append(createCard(card));
  });
  startTimer();
});

$('#register-another').on('click', function() {
  $('#victory-modal').hide();
  $('#player-info').show();
  $('#player-name').val('');
  gameBoard.empty();
  loadLeaderboard();
});
