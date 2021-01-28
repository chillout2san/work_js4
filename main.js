'use strict'

// 各種DOMを取得
const main = document.querySelector('#main');
const para = document.querySelector('#para');
const btn = document.querySelector('#btn');

// ボタンを押下すると実行する非同期処理
btn.addEventListener('click', () => {
  main.innerText = '取得中';
  para.innerText = '少々お待ちください';
  btn.classList.add('btnTransparent');
});

// APIを取得する
const createQuiz = () => {
  fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
      return response.json()
    })
    .then(quizObj => {
      console.log(quizObj);
      console.log(quizObj.results[0]);
    })
    .catch(() => {
      console.log('APIの取得失敗!!!')
    });
};

createQuiz();