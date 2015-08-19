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
    
    //Array to track correct answers
    var rAnswers = function() {
      var answerArray = new Array();
      for (var i = 0; i < data.length; i++) {
          answerArray.push(false);
      }
      return answerArray;
    }();
    
    
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
        //if question not answered, notify user they must answer
        if (userAnsweredQuestion() == false) {
            alert("You have to answer the question before moving on");
            return;
        }
        if (isAnswerCorrect(questionNumber) == true) {
            rAnswers[questionNumber] = true;
            alert("answer is correct!!!!");
        } else {
            alert("answer is wrong bitch");
        }
        if (questionNumber === data.length - 1) {
            endQuiz(rAnswers);
        } else {
            nextQuestion(++questionNumber, question, answerOptions);
        }
    }, false);
    
    //Sets a listener for the back button
    var backBtn = document.getElementById("back");
    backBtn.addEventListener("click", function() {
        if (questionNumber > 0) {
            previousQuestion(--questionNumber, question, answerOptions, rAnswers);
        }
    }, false);
}

/*******
 * Name: nextQuestion
 * Function: loads the next question in the data array
 * Parameters: "questionNumber" is the integer place of the question to load on the page. "question" is the DOM node where the new question will go. "answerOptions" is an array of DOM nodes where the new answer options will be loaded
 ******/
function nextQuestion(questionNumber, question, answerOptions) {
    
    $("#question").fadeOut("fast", function() {
        loadNewQuestion(questionNumber, question);
    });
    $("#question").fadeIn("fast");
    

    //loadNewQuestion(questionNumber, question);
    loadNewAnswers(questionNumber, answerOptions);
    loadBackButton(questionNumber);
    
}

/*******
 * Name: previousQuestion
 * Function: loads previous next question in the data array
 * Parameters: "questionNumber" is the integer place of the question to load on the page. "question" is the DOM node where the new question will go. "answerOptions" is an array of DOM nodes where the new answer options will be loaded. "rAnswers" is a boolean array that shows which questions have been answered correctly.
 ******/
function previousQuestion(questionNumber, question, answerOptions, rAnswers) {
    loadNewQuestion(questionNumber, question);
    loadNewAnswers(questionNumber, answerOptions);
    
    //Reset correct answer count in case answered right previously
    rAnswers[questionNumber] = false;
    
    if (questionNumber < 1) {
        hideBackButton();
    } 
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
    
    var radios = document.getElementsByName("answers");
    
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            radios[i].checked = false;
        }
    }
}

/*******
 * Name: loadNewQuestion
 * Function: loads the HTML for the new question
 * Parameters: "questionNumber" is the integer place of the question to load on the page. "question" is the DOM node where the new question will go
 ******/
function loadNewQuestion(questionNumber, question) {
    //question.innerHTML = data[questionNumber].question;
    $(question).text(data[questionNumber].question);
}

/*******
 * Name: isAnswerCorrect
 * Function: determines whether quiz answer is correct
 * Parameters: "questionNumber" is the integer place of the question currently in the HTML.
 * Return: returns a boolean depending on whether or not the user answered correctly
******/
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
function endQuiz(rAnswers) {
    //alert("Done quiz. Right answers: " + rightAnswers);
    //hideQuiz();
    $("#quiz").fadeOut("fast");
    $("#result").fadeIn("fast", function() {
        var correctAnswers = 0;
        for (var i = 0; i < rAnswers.length; i++) {
            if (rAnswers[i] == true) correctAnswers++;
        }
        showResult(correctAnswers);
    });
    
}


/*******
 * Name: hideQuiz
 * Function: Hides the quiz div from the browser
 ******/
function hideQuiz() {
    var quiz = document.getElementById("quiz");
    quiz.className = "hidden";
}

/*******
 * Name: showResult
 * Function: Show's the result div and computes the score for the user
 ******/
function showResult(rightAnswers) {
    //Updates result page with correct score
    var score = document.getElementById("score");
    score.innerHTML = rightAnswers;
    
    //Shows results page
    var result = document.getElementById("result");
    result.className = "visible";
}

/*******
 * Name: userAnsweredQuestion
 * Function: Returns true if the user answered the question, false otherwise
 ******/
function userAnsweredQuestion() {
    var radios = document.getElementsByName("answers");
    
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked == true) {
            return true;
        }
    }
    
    return false;
}

/*******
 * Name: loadBackButton
 * Function: makes the back button visible when not the initial question
 * Parameter: "questionNumber" is the current question being displayed
 ******/
function loadBackButton(questionNumber) {
    if (questionNumber > 0) {
        var backBtn = document.getElementById("back");
        backBtn.className = "visible";
    }
}

/*******
 * Name: hideBackButton
 * Function: Hides the back button in the HTML
 ******/
function hideBackButton() {
    var backBtn = document.getElementById("back");
    backBtn.className = "hidden";
}
