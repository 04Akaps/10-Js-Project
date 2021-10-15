const quizData = [
  {
    question: "나는 몇살 일까요",
    a: "10",
    b: "17",
    c: "25",
    d: "65",
    correct: "2",
  },
  {
    question: "내가 처음으로 사용했던 언어는??",
    a: "JavaScript",
    b: "Java",
    c: "Python",
    d: "C++",
    correct: "1",
  },
  {
    question: "현재 미국 대통령은??(2021년)",
    a: "Plor in Pop",
    b: "Donald Trump",
    c: "Ivan Saldano",
    d: "Joe Biden",
    correct: "3",
  },
  {
    question: "내가 사용하는 웹 브라우저는??",
    a: "safari",
    b: "crome",
    c: "네이버 웨일",
    d: "firefox",
    correct: "0",
  },

  {
    question: "문제를 모두 해결하였습니다.",
  },
];

const question = document.querySelector("#question");
const a_text = document.querySelector("#a_text");
const b_text = document.querySelector("#b_text");
const c_text = document.querySelector("#c_text");
const d_text = document.querySelector("#d_text");

const button = document.querySelector("#button");
const answersel = document.querySelectorAll(".answer");
let currentQuestion = 0;
let score = 0;
let answer = undefined;

function loadQuiz() {
  let current = quizData[currentQuestion];
  question.textContent = current.question;
  a_text.textContent = current.a;
  b_text.textContent = current.b;
  c_text.textContent = current.c;
  d_text.textContent = current.d;
}
loadQuiz();

button.addEventListener("click", function () {
  getSelected();
  let result = quizData[currentQuestion];
  if (answer !== undefined) {
    if (answer === Number(result.correct)) {
      score++;
      alert("정답 입니다!!");
      if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuiz();
      } else {
        loadQuiz();
      }
    } else {
      alert("오답 입니다.. ㅠㅠ");
      currentQuestion++;
      loadQuiz();
    }
  } else {
    alert("선택지를 골라 주세요");
  }
  if (currentQuestion === quizData.length - 1) {
    alert(`맞은갯수 : ${score}, 틀린 갯수 : ${quizData.length - 1 - score}`);
  }
});

function getSelected() {
  answersel.forEach((a, idx) => {
    if (a.checked) {
      answer = idx;
    }
  });
  return undefined;
}
