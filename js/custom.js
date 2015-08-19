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
    var rightAnswers = 0;
    
    //Get the element that stores the question
    var question = document.getElementById("question");
    loadNewQuestion(questionNumber, question);
    
    //Get <span> for each possible answer and 
    //place in array
    var firstAnswer = document.getElementById("firstAnswer");
    var secondAnswer = document.getElementById("secondAnswer");
    var thirdAnswer = document.getElementById("thirdAnswer");
    var fourthAnswer = document.getElementById("fourthAnswer");
    
    var answerOptions = [firstAnswer, secondAnswer, thirdAnswer, fourthAnswer];
    
    //Load all answer options
    loadNewAnswers(questionNumber, answerOptions);
    
    //Sets a listener for the next button
    var nextBtn = document.getElementById("next");
    nextBtn.addEventListener("click", function() {
        if (isAnswerCorrect(questionNumber) == true) {
            rightAnswers++;
            alert("answer is correct!!!!");
        } else {
            alert("answer is wrong bitch");
        }
        if (questionNumber === data.length - 1) {
            endQuiz(rightAnswers);
        } else {
            nextQuestion(++questionNumber, question, answerOptions);
        }
    }, false);
}

/*******
 * Name: nextQuestion
 * Function: loads the next question in the data array
 * Parameters: "questionNumber" is the integer place of the question to load on the page. "question" is the DOM node where the new question will go. "answerOptions" is an array of DOM nodes where the new answer options will be loaded
 ******/
function nextQuestion(questionNumber, question, answerOptions) {
    //alert(questionNumber);
    
    loadNewQuestion(questionNumber, question);
    loadNewAnswers(questionNumber, answerOptions);
    
}

/*******
 * Name: loadNewAnswers
 * Function: loads the HTML for the new answer options
 * Parameters: "questionNumber" is the integer place of the question to load on the page. "answerOptions" is an array of DOM nodes where the new answer options will be loaded
 ******/
function loadNewAnswers(questionNumber, answerOptions) {
    for (var i = 0; i < 4; i++) {
        answerOptions[i].innerHTML = data[questionNumber].choices[i];
    }
}

/*******
 * Name: loadNewQuestion
 * Function: loads the HTML for the new question
 * Parameters: "questionNumber" is the integer place of the question to load on the page. "question" is the DOM node where the new question will go
 ******/
function loadNewQuestion(questionNumber, question) {
    question.innerHTML = data[questionNumber].question;
}


function isAnswerCorrect(questionNumber) {
    var radios = document.getElementsByName("answers");
    
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            if (radios[i].value == data[questionNumber].correctAnswer) {
                return true;
            }
        }
    }
    return false;
}

/*******
 * Name: endQuiz
 * Function: terminates the quiz and provides score to the user.
 ******/
function endQuiz(rightAnswers) {
    alert("Done quiz. Right answers: " + rightAnswers);
}


