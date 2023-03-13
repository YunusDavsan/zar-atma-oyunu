'use strict';

// Değişkenlerimizi tanımladık
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const mevcutSkor0El = document.getElementById('current--0');
const mevcutSkor1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Kosullarımızı sıralamaya basladık
let scores, mevcutSkor, aktivePlayer, playing;

const init = function () {
  scores = [0, 0];
  mevcutSkor = 0;
  aktivePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  mevcutSkor0El.textContent = 0;
  mevcutSkor1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // her zaman birinci hesaptan baslamasına karar vermiş olduk
  player1El.classList.remove('player--active');
};
init();

const oyuncuDegistirme = function () {
  document.getElementById(`current--${aktivePlayer}`).textContent = 0;
  mevcutSkor = 0;
  aktivePlayer = aktivePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// zar at butonu
btnRoll.addEventListener('click', function () {
  if (playing) {
    // zar atıyoruz
    let dice = Math.trunc(Math.random() * 6) + 1;

    // zarı ekranda gösteriyoruz
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // zar 1 gelip gelmediğini kontrol ediyoruz
    if (dice !== 1) {
      // 1gelmezse skora ekleme yapıyoruz
      mevcutSkor += dice;
      document.getElementById(`current--${aktivePlayer}`).textContent =
        mevcutSkor;

      //eger 1 gelirse diğer oyuncuya geçiyor
    } else {
      oyuncuDegistirme();
    }
  }
});

// hesaba ekleme butonu
btnHold.addEventListener('click', function () {
  if (playing) {
    // aktive oyuncu puanını ekle
    scores[aktivePlayer] += mevcutSkor;
    document.getElementById(`score--${aktivePlayer}`).textContent =
      scores[aktivePlayer];
    //kontrol et eger 100 puandan coksa oyunu bitir
    if (scores[aktivePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${aktivePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${aktivePlayer}`)
        .classList.remove('player--active');
    } else {
      // diğer oyunucuya gec
      oyuncuDegistirme();
    }
  }
});

// Yeni oyun butonunu
btnNew.addEventListener('click', init);
