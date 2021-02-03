'use strict'

// ホーム画面のDOM
const $homeContainer = document.querySelector('#home-container');
const $main = document.querySelector('#main');
const $para = document.querySelector('#para');
const $btn = document.querySelector('#btn');

// 問題画面のDOM
const $questionContainer = document.querySelector('#question-container');
const $questionAnswerContainer = document.querySelector('#question-answers-container');
const $quizAnswerBtn = document.querySelectorAll('#question-answers-container > button');
const $quizTitle = document.querySelector('#quiz-title');
const $quizGenre = document.querySelector('#quiz-genre');
const $quizDif = document.querySelector('#quiz-dif');
const $quizQuestion = document.querySelector('#question');
const $quizAnswer0 = document.querySelector('#answer0');
const $quizAnswer1 = document.querySelector('#answer1');
const $quizAnswer2 = document.querySelector('#answer2');
const $quizAnswer3 = document.querySelector('#answer3');

// 結果画面のDOM
const $result = document.querySelector('#result');
const $resultTitle = document.querySelector('#result-title');
const $resultPara = document.querySelector('#result-para');
const $resultBtn = document.querySelector('#result-btn');

// 正解数用のカウンター
let correctCounter = 0;

// 何問目か用のカウンター
let quizCounter = 0;

// クイズ要素
let quizObj = [];

// 開始ボタンを押下すると実行する非同期処理
$btn.addEventListener('click', () => {
  $main.innerText = '取得中';
  $para.innerText = '少々お待ちください';
  $btn.classList.add('transparent');
  getQuizData();
});

// クイズを出題するクラス
class Quiz {
  constructor(obj, i) {
    this.index = i + 1;
    this.quizGenre = obj.category;
    this.quizDif = obj.difficulty;
    this.question = obj.question;
    obj.incorrect_answers.push(obj.correct_answer);
    this.answers = obj.incorrect_answers;
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
  $homeContainer.classList.add('transparent');
  $questionContainer.classList.remove('transparent');
  $questionAnswerContainer.classList.remove('transparent');
  $quizTitle.innerHTML = `問題${obj.index}`;
  $quizGenre.innerHTML = `[ジャンル]${obj.quizGenre}`;
  $quizDif.innerHTML = `[難易度]${obj.quizDif}`;
  $quizQuestion.innerHTML = obj.question;
  $quizAnswer0.innerHTML = obj.answers[0];
  $quizAnswer1.innerHTML = obj.answers[1];
  $quizAnswer2.innerHTML = obj.answers[2];
  $quizAnswer3.innerHTML = obj.answers[3];
  if(obj.answers.length === 2) {
    $quizAnswer2.classList.add('transparent');
    $quizAnswer3.classList.add('transparent');
  }else{
    $quizAnswer2.classList.remove('transparent');
    $quizAnswer3.classList.remove('transparent');
  };
};

// APIを取得する
const getQuizData = async () => {
  try{
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const quizMass = await response.json();
    quizObj = quizMass.results;
    const quiz = new Quiz(quizObj[0], 0);
    shuffleAns(quiz);
    setQuiz(quiz);
  }catch(e) {
      console.log('e');
    };
};

// 選択肢ボタンを押すと次のクイズが出題される
for(let i = 0; i < 4; i++){
    $quizAnswerBtn[i].addEventListener('click', (e) => {
      if(quizCounter === 0){
        if(e.target.innerHTML === quizObj[0].correct_answer){
          correctCounter++;
        }else{
          // 不正解の場合は加点なし
        };
      }else{
        if(e.target.innerHTML === quizObj[quizCounter].correct_answer){
          correctCounter++;
        }else{
          // 不正解の場合は加点なし
        };
      };
      if(quizCounter + 1 < quizObj.length){
        quizCounter++;
        const quiz = new Quiz(quizObj[quizCounter],quizCounter);
        setQuiz(quiz);
      }else{
        $questionContainer.classList.add('transparent');
        $questionAnswerContainer.classList.add('transparent');
        $result.classList.remove('transparent');
        $resultTitle.innerHTML = `あなたの正答数は${correctCounter}です！`;
      };
    });
};

// ホームボタンを押すとはじめに戻る
$resultBtn.addEventListener('click', () => {
  result.classList.add('transparent');
  $homeContainer.classList.remove('transparent');
  $btn.classList.remove('transparent');
  $main.innerText = 'ようこそ';
  $para.innerText = '以下のボタンをクリック';
  quizCounter = 0;
  correctCounter = 0;
})
