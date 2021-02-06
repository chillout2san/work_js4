'use strict'

// ホーム画面のDOM
const homeContainer = document.getElementById('home-container');
const main = document.getElementById('main');
const para = document.getElementById('para');
const btn = document.getElementById('btn');

// 問題画面のDOM
const questionContainer = document.getElementById('question-container');
const questionAnswerContainer = document.getElementById('question-answers-container');
const quizAnswerBtn = document.querySelectorAll('#question-answers-container > button');
const quizTitle = document.getElementById('quiz-title');
const quizGenre = document.getElementById('quiz-genre');
const quizDif = document.getElementById('quiz-dif');
const quizQuestion = document.getElementById('question');
const quizAnswer0 = document.getElementById('answer0');
const quizAnswer1 = document.getElementById('answer1');
const quizAnswer2 = document.getElementById('answer2');
const quizAnswer3 = document.getElementById('answer3');

// 結果画面のDOM
const result = document.getElementById('result');
const resultTitle = document.getElementById('result-title');
const resultPara = document.getElementById('result-para');
const resultBtn = document.getElementById('result-btn');

// 開始ボタンを押下すると実行する非同期処理
btn.addEventListener('click', () => {
  main.innerText = '取得中';
  para.innerText = '少々お待ちください';
  btn.classList.add('transparent');
  getQuizData();
  setQuiz();
  // getuQuizDataで取得したデータをどうやってこちらに持ってくる？？
});

// クイズを出題するクラス
class Quiz {
  constructor(obj) {
    this.quizObj = obj;
    this.correctCounter = 0;
  };
  displayQuizNumber(i){
    return i;
  }
  displayQuestion(i){
    const question = this.quizObj[i].question;
    return question;
  };
  displayDifficulty(i){
    const difficulty = this.quizObj[i].difficulty;
    return difficulty;
  };
  displayChoices(i){
    const choices = this.quizObj[i].incorrect_answers.concat('correct_answer');
    for(let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = choices[i];
      choices[i] = choices[j];
      choices[j] = tmp;
    };
    return choices;
  };
  displayCorrectAnswer(i){
    const correctAnswer = this.quizObj[i].correct_answer;
    return correctAnswer;
  }
  displayCorrectCounter(){
    return correctCounter;
  }
};

// クイズを表示する関数
const setQuiz = (obj) => {
  homeContainer.classList.add('transparent');
  questionContainer.classList.remove('transparent');
  questionAnswerContainer.classList.remove('transparent');
  quizTitle.innerHTML = `問題${obj.index}`;
  quizGenre.innerHTML = `[ジャンル]${obj.quizGenre}`;
  quizDif.innerHTML = `[難易度]${obj.quizDif}`;
  quizQuestion.innerHTML = obj.question;
  quizAnswer0.innerHTML = obj.answers[0];
  quizAnswer1.innerHTML = obj.answers[1];
  quizAnswer2.innerHTML = obj.answers[2];
  quizAnswer3.innerHTML = obj.answers[3];
  if(obj.answers.length === 2) {
    quizAnswer2.classList.add('transparent');
    quizAnswer3.classList.add('transparent');
  }else{
    quizAnswer2.classList.remove('transparent');
    quizAnswer3.classList.remove('transparent');
  };
};

// APIからデータを取得する
const getQuizData = async () => {
  try{
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const quizMass = await response.json();
    const quiz = new Quiz(quizMass.results);
    return quiz;
  }catch(error) {
      console.log('error');
    };
};

// 選択肢ボタンを押すと次のクイズが出題される
for(let i = 0; i < 4; i++){
    quizAnswerBtn[i].addEventListener('click', (e) => {
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
        quiz.shuffleAns();
        setQuiz(quiz);
      }else{
        questionContainer.classList.add('transparent');
        questionAnswerContainer.classList.add('transparent');
        result.classList.remove('transparent');
        resultTitle.innerHTML = `あなたの正答数は${correctCounter}です！`;
      };
    });
};

// ホームボタンを押すとはじめに戻る
resultBtn.addEventListener('click', () => {
  result.classList.add('transparent');
  homeContainer.classList.remove('transparent');
  btn.classList.remove('transparent');
  main.innerText = 'ようこそ';
  para.innerText = '以下のボタンをクリック';
  quizCounter = 0;
  correctCounter = 0;
});
