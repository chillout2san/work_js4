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


// クイズの内容をAPIからセットするクラス
class CreateQuiz {
  constructor(quizObj, i) {
    this.quizGenre = quizObj.results[i].category;
    this.quizDif = quizObj.results[i].difficulty;
    this.question = quizObj.results[i].question;
    // this.answers = 正解肢を不正解肢配列にpush
    this.correct = quizObj.results[i].correct_answer;
  };
};

// APIを取得する
const getAPI =() => {
  fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
      return response.json()
    })
    .then(quizObj => {
      console.log(quizObj);
      const quiz = new CreateQuiz(quizObj, 0);
      console.log(quiz);
    })
    .catch(() => {
      console.log('APIの取得失敗!!!')
    });
};