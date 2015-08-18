window.onload = init;



/******
 * Data
 *****/
 
var data = [
    {
        question: "How many stars are in the US Flag?",
        choices: ["50", "34", "1", "51"],
        correctAnswer: 0
    },
    {
        question: "How old is Stacey?",
        choices: ["50", "21", "30", "28"],
        correctAnswer: 2
    },
    {
        question: "Who is not black?",
        choices: ["Morgan Freeman", "Michael Jackson", "John Travolta", "Barack Obama"],
        correctAnswer: 2
    }
];


function init() {
    //initialize quiz
    loadQuiz();
}

/*******
 * Name: loadQuiz
 * Function: Initializes first question and 
 * answer options in HTML
 ******/
function loadQuiz() {
    var questionNumber = 0;
    
    var question = document.getElementById("question");
    loadNewQuestion(questionNumber, question);
    
    //Get <span> for each possible answer and 
    //place in array
    var firstAnswer = document.getElementById("firstAnswer");
    var secondAnswer = document.getElementById("secondAnswer");
    var thirdAnswer = document.getElementById("thirdAnswer");
    var fourthAnswer = document.getElementById("fourthAnswer");
    
    var answerOptions = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
    
    //Load spans with questions
    loadNewAnswers(questionNumber, answerOptions);
    
    //Sets a listener for the next button
    var nextBtn = document.getElementById("next");
    nextBtn.addEventListener("click", function() {
        if (questionNumber === data.length - 1) {
            endQuiz();
        } else {
            nextQuestion(++questionNumber, question, answerOptions);
        }
    }, false);
}


function nextQuestion(questionNumber, question, answerOptions) {
    alert(questionNumber);
    loadNewQuestion(questionNumber, question);
    loadNewAnswers(questionNumber, answerOptions);
    
}

function loadNewAnswers(questionNumber, answerOptions) {
    for (var i = 0; i < 4; i++) {
        answerOptions[i].innerHTML = data[questionNumber].choices[i];
    }
}

function loadNewQuestion(questionNumber, question) {
    question.innerHTML = data[questionNumber].question;
}

function endQuiz() {
    alert("dunzo");
}


