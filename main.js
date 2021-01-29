'use strict'

// 各種DOMを取得
const $main = document.querySelector('#main');
const $para = document.querySelector('#para');
const $btn = document.querySelector('#btn');

// ボタンを押下すると実行する非同期処理
$btn.addEventListener('click', () => {
  $main.innerText = '取得中';
  $para.innerText = '少々お待ちください';
  $btn.classList.add('transparent');
  getAPI();
});

// 正解数をカウント
let counter = 0;

// クイズの各要素を定義


// クイズを出題
const createQuiz = (quizObj) => {
  const quizTitle = '問題';
  console.log(quizTitle);
  const quizGenre = '';
  const quizDif = '';
  const question = '';
  const answers = ['', '', '', '']
  const correct = '';
}

// APIを取得する
const getAPI =() => {
  fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
      return response.json()
    })
    .then(quizObj => {
      console.log(quizObj);
      createQuiz(quizObj);
    })
    .catch(() => {
      console.log('APIの取得失敗!!!')
    });
};

getAPI();