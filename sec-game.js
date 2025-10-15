const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const playingField = document.getElementById('playingField');
const overlay = document.getElementById('overlay');
const result = document.getElementById('result');
const questDissapearContainer = document.getElementById('questDissapearContainer');
const startButton = document.getElementById('startButton');
const questDissContBtn = document.getElementById('questDissContBtn')

let timeLeft = 30;
let score = 0;
let gameActive = false;
let spawner, timer;
questDissContBtn.innerHTML = `<button type="button" class="btn-style-4 btn-effect" onclick="startGame()"></button>`

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function startGame() {
  questDissapearContainer.style.display = 'none';
  score = 0;
  timeLeft = 30;
  gameActive = true;
  scoreEl.textContent = score;
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);

  spawner = setInterval(spawnSpeck, 1000);
}

function spawnSpeck() {
  if (!gameActive) return;

  const s = document.createElement('div');
  const size = Math.round(rand(30, 60));
  const x = rand(20, playingField.clientWidth - size - 20);
  const y = rand(60, playingField.clientHeight - size - 20);

  s.className = 'speck';
  s.style.width = `${size}px`;
  s.style.height = `${size}px`;
  s.style.left = `${x}px`;
  s.style.top = `${y}px`;

  const remove = (ev) => {
    ev.preventDefault();
    if (!gameActive) return;
    if (s.classList.contains('pop')) return;
    s.classList.add('pop');
    score += Math.round(100 / size * 10);
    scoreEl.textContent = score;
    if (navigator.vibrate) navigator.vibrate(40);
    setTimeout(() => s.remove(), 200);
  };

  s.addEventListener('click', remove);
  s.addEventListener('touchstart', remove, { passive: false });

  playingField.appendChild(s);

  setTimeout(() => {
    if (!s.classList.contains('pop')) s.remove();
  }, 1500);
}

function endGame() {
  gameActive = false;
  clearInterval(spawner);
  clearInterval(timer);
  questDissapearContainer.style.display = 'flex';
  questDissContBtn.innerHTML = `<button type="button" class="btn-style-4 btn-effect btn-style-4_succsess"></button>`
  questDissContBtn.innerHTML += `<button type="button" class="btn-style-4 btn-effect btn-style-4_reload" onclick="restart()"></button>`
  result.textContent = `Lejárt az idő! Pontszámod: ${score}`;
}

function restart() {
  location.reload();
}

