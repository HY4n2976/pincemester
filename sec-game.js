const PlayingField = document.getElementById('PlayingField');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const overlay = document.getElementById('overlay');
const result = document.getElementById('result');

let score = 0;
let spawnInterval = 1000;
let timeLeft = 30;
let gameActive = true;

function rand(min,max){ return Math.random()*(max-min)+min; }

function spawnSpeck(){
  if (!gameActive) return;
  const s = document.createElement('div');
  s.className = 'speck';
  const size = Math.round(rand(20,60));
  s.style.width = s.style.height = size + 'px';
  const pad = 10;
  const x = rand(pad, game.clientWidth - size - pad);
  const y = rand(pad, game.clientHeight - size - pad);
  s.style.left = x+'px';
  s.style.top = y+'px';
  s.animate([{ transform: 'translateY(0)'}, { transform: `translateY(${rand(-8,8)}px)`}, { transform:'translateY(0)'}],
            { duration: rand(1500,3000), iterations: Infinity, direction:'alternate'});

  const remove = (ev) => {
    ev.preventDefault();
    if (!gameActive) return;
    if (s.classList.contains('popped')) return;
    s.classList.add('popped','pop');
    score += Math.round(100/size*10);
    scoreEl.textContent = score;
    setTimeout(()=> s.remove(),200);
  };
  s.addEventListener('click', remove);
  s.addEventListener('touchstart', remove, {passive:false});
  game.appendChild(s);
  setTimeout(()=> { if(!s.classList.contains('popped')) s.remove(); }, 7000);
}

let spawner = setInterval(spawnSpeck, spawnInterval);

// idő visszaszámlálás
const timer = setInterval(()=>{
  if (!gameActive) return;
  timeLeft--;
  timeEl.textContent = timeLeft;
  if (timeLeft <= 0) endGame();
},1000);

// nehézség fokozása (gyorsabb spawn)
setInterval(()=> {
  const newInterval = Math.max(300, 1000 - Math.floor(score/500)*100);
  if (newInterval !== spawnInterval) {
    spawnInterval = newInterval;
    clearInterval(spawner);
    spawner = setInterval(spawnSpeck, spawnInterval);
  }
},1000);

function endGame(){
  gameActive = false;
  clearInterval(spawner);
  clearInterval(timer);
  overlay.style.visibility = 'visible';
  result.textContent = `⏱️ Lejárt az idő! Pontszám: ${score}`;
}

function restart(){
  location.reload();
}
