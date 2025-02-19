// Quiz app --------------------------------------
// Questions and Answers storage
const quiz = [
    {
        question: 'Which tag have SEO value?',
        answers: [
            {title: '<span>' , iscorrect: false},
            {title: '<p>' , iscorrect: false},
            {title: '<h1>' , iscorrect: true},
            {title: '<div>' , iscorrect: false}
        ]
    },
    {
        question: 'Which one is the correct image link?',
        answers: [
            {title: '<img/>' , iscorrect: false},
            {title: '<img <a></a>/>' , iscorrect: false},
            {title: '<a><img/></a>' , iscorrect: true},
            {title: '<link <img/>>' , iscorrect: false}
        ]
    },
    {
        question: 'What is the purpose of the meta charset="UTF-8" tag in HTML?',
        answers: [
            {title: 'Specifies the width of the web page' , iscorrect: false},
            {title: 'Declares the character encoding for the document' , iscorrect: true},
            {title: 'Defines the author name'  , iscorrect: false},
            {title: 'Links to an external stylesheet' , iscorrect: false}
        ]
    },
    {
        question: 'What does the z-index property control?',
        answers: [
            {title: 'The transparency of an element' , iscorrect: false},
            {title: 'The zoom level of an element' , iscorrect: false},
            {title: 'The horizontal alignment of elements' , iscorrect: false},
            {title: 'The vertical stacking order of elements' , iscorrect: true}
        ]
    },
    {
        question: 'How would you apply styles only to direct children of an element?',
        answers: [
            {title: 'element > child' , iscorrect: true},
            {title: 'element child' , iscorrect: false},
            {title: 'element + child' , iscorrect: false},
            {title: 'element ~ child' , iscorrect: false}
        ]
    },
    {
        question: 'How do you define a table cell that spans two columns?',
        answers: [
            {title: '<td row="2">' , iscorrect: false},
            {title: '<td colspan="2">' , iscorrect: true},
            {title: '<cell colspan="2">' , iscorrect: false},
            {title: '<td column-span="2">' , iscorrect: false}
        ]
    }
]
// DOM refrences
const appQuestion = document.getElementById('question');
const appAnswers = document.querySelector('.buttons');
const appNext = document.getElementById('next');
const appFinish = document.getElementById('finish');
// JS variables
let quizNumber = 0;
let score = 0;

displayQuiz();

function displayQuiz(){
    // Reset 'next' button
    appNext.style.display = 'none';
    // Reset buttons
    appAnswers.innerHTML = '';
    // Displaying question and answers
    appQuestion.textContent = quiz[quizNumber].question;
    quiz[quizNumber].answers.forEach( (element , index) =>{
        const button = document.createElement('button');
        button.classList.add('answer-btn');
        button.textContent = `${index + 1}. ${element.title}`;
        appAnswers.appendChild(button);
        button.addEventListener('click',checkButton);
    });
}

function checkButton(event){
    const button = event.target;
    const buttonNumber = button.textContent[0] - 1;
    if(quiz[quizNumber].answers[buttonNumber].iscorrect){
        button.classList.add('green');
        score++;
    } else {
        button.classList.add('red');
    }
    Array.from(appAnswers.children).forEach(element => {
        if(quiz[quizNumber].answers[element.textContent[0] - 1].iscorrect){
            element.classList.add('green');
        }
        element.disabled = true;
    });
    quizNumber++;
    if(quizNumber == quiz.length){
        appFinish.style.display = 'block';
        appFinish.addEventListener('click', displayScore);
    } else {
        appNext.style.display = 'block';
        appNext.addEventListener('click', displayQuiz);
    }
}

function displayScore(){
    // Reseting everythings
    appQuestion.textContent = '';
    appAnswers.innerHTML = '';
    appFinish.style.display = 'none';
    // Creating DOM elements
    const correctAnswers = document.createElement('p');
    const wrongAnswers = document.createElement('p');
    const questionNumbers = document.createElement('p');
    // Setting elements contents
    correctAnswers.textContent = "correct answers:" + score;
    wrongAnswers.textContent = "wrong answers:" + (quiz.length - score);
    questionNumbers.textContent = "question numbers:" + quiz.length;
    // Adding class to elements
    correctAnswers.id = 'score-correct';
    wrongAnswers.id = 'score-wrong';
    questionNumbers.id = 'score-all';
    // Displaying elements
    appAnswers.appendChild(correctAnswers);
    appAnswers.appendChild(wrongAnswers);
    appAnswers.appendChild(questionNumbers);
}
