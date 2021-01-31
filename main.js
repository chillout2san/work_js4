'use strict'

// 各種DOMを取得
const $homeContainer = document.querySelector('#home-container');
const $questionContainer = document.querySelector('#question-container');
const $main = document.querySelector('#main');
const $para = document.querySelector('#para');
const $btn = document.querySelector('#btn');
const $quizTitle = document.querySelector('#quiz-title');
const $quizGenre = document.querySelector('#quiz-genre');
const $quizDif = document.querySelector('#quiz-dif');
const $quizQuestion = document.querySelector('#question');
const $quizAnswer0 = document.querySelector('#answer0');
const $quizAnswer1 = document.querySelector('#answer1');
const $quizAnswer2 = document.querySelector('#answer2');
const $quizAnswer3 = document.querySelector('#answer3');
const $quizAnswerBtn = document.querySelectorAll('#question-container > button');

// ボタンを押下すると実行する非同期処理
$btn.addEventListener('click', () => {
  $main.innerText = '取得中';
  $para.innerText = '少々お待ちください';
  $btn.classList.add('transparent');
  getAPI();
});

// 正解数用のカウンター
let correctCounter = 0;

// 何問目か用のカウンター
let quizCounter = 0;

// クイズを出題するクラス
class CreateQuiz {
  constructor(quizObj, i) {
    this.index = i + 1;
    this.quizGenre = quizObj.results[i].category;
    this.quizDif = quizObj.results[i].difficulty;
    this.question = quizObj.results[i].question;
    quizObj.results[i].incorrect_answers.push(quizObj.results[i].correct_answer);
    this.answers = quizObj.results[i].incorrect_answers;
    this.correct = quizObj.results[i].correct_answer;
  };
  shuffleAns() {
    for(let i = this.answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = this.answers[i];
      this.answers[i] = this.answers[j];
      this.answers[j] = tmp;
    };
  };
  setQuiz() {
    $quizTitle.innerHTML = `問題${this.index}`;
    $quizGenre.innerHTML = `[ジャンル]${this.quizGenre}`;
    $quizDif.innerHTML = `[難易度]${this.quizDif}`;
    $quizQuestion.innerHTML = this.question;
    $quizAnswer0.innerHTML = this.answers[0];
    $quizAnswer1.innerHTML = this.answers[1];
    $quizAnswer2.innerHTML = this.answers[2];
    $quizAnswer3.innerHTML = this.answers[3];
    $homeContainer.classList.add('transparent');
    $questionContainer.classList.remove('transparent');
  };
};

// APIを取得する
const getAPI = () => {
  fetch('https://opentdb.com/api.php?amount=10')
    .then(response => {
      return response.json()
    })
    .then(quizObj => {
      let quiz = new CreateQuiz(quizObj, quizCounter);
      quiz.shuffleAns();
      quiz.setQuiz();
      quizCounter++;
    })
    .catch(() => {
      console.log('残念！！！');
    });
};