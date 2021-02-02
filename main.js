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

// 正解数用のカウンター
let correctCounter = 0;

// 何問目か用のカウンター
let quizCounter = 0;

// 開始ボタンを押下すると実行する非同期処理
$btn.addEventListener('click', () => {
  $main.innerText = '取得中';
  $para.innerText = '少々お待ちください';
  $btn.classList.add('transparent');
  getQuizData();
});

// 選択肢ボタンを押すと次のクイズが出題される
for(let i = 0; i < 4; i++){
  $quizAnswerBtn[i].addEventListener('click', () => {
    console.log('テスト');
  });
};

// クイズを出題するクラス
class Quiz {
  constructor(obj, i) {
    this.index = i + 1;
    this.quizGenre = obj.category;
    this.quizDif = obj.difficulty;
    this.question = obj.question;
    obj.incorrect_answers.push(obj.correct_answer);
    this.answers = obj.incorrect_answers;
    this.correct = obj.correct_answer;
    quizCounter++;
  };
};

// 選択肢をシャッフルする関数
const shuffleAns = (answers) => {
  for(let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = answers[i];
    answers[i] = answers[j];
    answers[j] = tmp;
  };
};

// クイズを表示する関数
const setQuiz = (obj) => {
  $quizTitle.innerHTML = `問題${obj.index}`;
  $quizGenre.innerHTML = `[ジャンル]${obj.quizGenre}`;
  $quizDif.innerHTML = `[難易度]${obj.quizDif}`;
  $quizQuestion.innerHTML = obj.question;
  $quizAnswer0.innerHTML = obj.answers[0];
  $quizAnswer1.innerHTML = obj.answers[1];
  $quizAnswer2.innerHTML = obj.answers[2];
  $quizAnswer3.innerHTML = obj.answers[3];
  $homeContainer.classList.add('transparent');
  $questionContainer.classList.remove('transparent');
};

// APIを取得する
const getQuizData = async () => {
  try{
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const quizMass = await response.json();
    const quizObj = await quizMass.results;
    const quiz = new Quiz(quizObj[0], 0);
    shuffleAns(quiz);
    setQuiz(quiz);
  }catch(e) {
      console.log('e');
    };
};