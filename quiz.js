let kerdesek = [];
let aktualis = 0;
let question_numb= document.querySelector('.question_numb') 
// Betöltés JSON-ból
fetch('quiz.json')
  .then(res => res.json())
  .then(data => {
    kerdesek = data;
    megjelenitKerdes();
  });

function megjelenitKerdes() {
  const k = kerdesek[aktualis];

  // Kérdés szám
  document.querySelector('.question_numb').innerHTML = `<p>${k.id}. kérdés</p>`;

  // Kérdés szöveg
  document.querySelector('.question_content div:first-child').innerHTML = `<p>${k.kerdes}</p>`;

  // Válaszgombok
  const valaszok = document.querySelectorAll('.content_btn button');
  valaszok.forEach((gomb, index) => {
    if (k.valaszok[index]) {
      gomb.style.display = 'flex';
      gomb.querySelector('p').textContent = k.valaszok[index];
      gomb.classList.remove('disabled');
      gomb.onclick = () => ellenorizValasz(index);
    } else {
      gomb.style.display = 'none'; // ha pl. csak 2 válasz van
    }
  });

  // Tovább gomb elrejtése
  document.querySelector('.btn-style-4').style.display = 'none';
  question_numb.style.background = "var(--primary-color)"
}
// --------------------------
function ellenorizValasz(index) {
  const k = kerdesek[aktualis];
  const content = document.querySelector('.question_content div:first-child');
  const valaszGombok = document.querySelectorAll('.content_btn button');
  
  // Több helyes válasz kezelése
  if (k.helyes.includes(index)) {
    let uzenet = '';
    if (typeof k.magyarazat === 'object') {
      uzenet = k.magyarazat[index];
    } else {
      uzenet = k.magyarazat;
    }

    // Helyes válasz üzenet + magyarázat
    question_numb.innerHTML = `<p>A válasz helyes!</p>`
    question_numb.style.background = "var(--btn-succsess)"
    content.innerHTML = `<p>${uzenet}</p>`;

    valaszGombok.forEach(g => g.classList.add('disabled'));
    document.querySelector('.btn-style-4').style.display = 'inline-block';
  } else {
    question_numb.innerHTML = `<p>Próbáld újra!</p>`
    question_numb.style.background = "var(--btn-reload)"
  }
}

// Tovább gomb kezelése
document.querySelector('.btn-style-4').onclick = () => {
  aktualis++;
  if (aktualis < kerdesek.length) {
    megjelenitKerdes();
  } else {
    document.querySelector('.btn-style-4').style.backgroundColor = "var(--btn-succsess)"
    document.querySelector('.btn-style-4').style.transform = "scale(1.1)"
     question_numb.innerHTML = `<p>Nagyszerű!</p>`
    document.querySelector('.question_content div:first-child').innerHTML = `<p>Sikeresen válaszoltál a kérdésekre! Menj tovább --></p>`
    document.querySelector('.btn-style-4').addEventListener("click", () => {
    window.location.href = "third-game.html";
  });
  }
};