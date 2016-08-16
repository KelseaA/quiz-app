$(document).ready(function(){
	getQuestions();
});

// declaring global variables
var questions = [];
var nextQuestionIndex = 0;
var score = 0;
var questionCounter = 1;

// function to get json file
function getQuestions(){
	$.getJSON("questions.json", function(json){
	questions = json.questions;
	startQuiz();
	})
}
// starts new quiz
function startQuiz(){
	nextQuestionIndex = 0;
	score = 0;
	questionCounter = 1;
	$(".answer-box").hide();
	$(".score").hide();
	$(".question-box").show();
	$(".all-answers").show();
	$(".number-counter-wrapper").show();
	showNextQuestion();
}
// gets next question of quiz
function showNextQuestion(){
	$(".wrapper").show();
	$(".answer-box").hide();
	// $(".flip-container").flip(false);
	
	if(nextQuestionIndex < questions.length){
		showQuestions(questions[nextQuestionIndex].question, questions[nextQuestionIndex].options, questions[nextQuestionIndex].answerIndex);
		$(".number-counter").html("<p>Question " + questionCounter + " of 5</p>");
		questionCounter++;
	}
	else{
		showUserScore();
	}
}
// gives feedback on answer choice - correct or incorrect
function showAnswer(correct){
	//sets answer image
	var answerImageSrc = questions[nextQuestionIndex].answerImage;
	$(".answer-image").attr("src", answerImageSrc);

	if(correct){
		$(".answer-box").removeClass("answer-box-incorrect").addClass("answer-box-correct");
		$(".answer-feedback").text("Correct!");
		score++;
	}
	else{
		$(".answer-box").removeClass("answer-box-correct").addClass("answer-box-incorrect");
		$(".answer-feedback").text("Incorrect!");
	}
	
	var questionInfo = questions[nextQuestionIndex].info;
	$(".answer-info").html(questionInfo);

	$(".wrapper").hide();
	$(".answer-box").show();
	// $(".flip-container").flip(true);

	nextQuestionIndex++;
}
// shows questions on page
function showQuestions(question, options, answerIndex){
	//sets question
	$(".question-title").html(question);

	//sets question image
	var questionImageSrc = questions[nextQuestionIndex].questionImage;
	$(".question-image").attr("src", questionImageSrc);

	//sets question options
	$(".question-answers").empty();
	for(var i = 0; i < options.length; i++){
		var correctAnswer = false;
		if(i == answerIndex){
			correctAnswer = true;
		}
		$(".question-answers").append('<li class="option-list" data-correct-answer="' + correctAnswer + '">' + options[i] + '</li>');
	}
}
// shows user's score after quiz is finished
function showUserScore(){
	$(".answer-box").hide();
	$(".question-box").hide();
	$(".all-answers").hide();
	$(".number-counter-wrapper").hide();
	$(".user-score").html("<p>Your score is: " + score + " out of 5</p");
	$(".score").show();
}


function flip() {
    $(".card").toggleClass("flipped");
}

// event listener to enable user to click on answer options
$(".question-answers").on("click", ".option-list", function(){
	showAnswer($(this).data("correct-answer"));
	flip();
})
// event listener for click on correct/incorrect screen continue button 
$(".answer-box").on("click", ".continue", function(){
	showNextQuestion();
	flip();
})
// event listener for click on restart quiz button at end of quiz
$(".score").on("click", ".restart-quiz", function(){
	startQuiz();
})