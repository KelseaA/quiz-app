$(document).ready(function(){
	startQuiz();
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
	showNextQuestion();
}
// gets next question of quiz
function showNextQuestion(){
	if(nextQuestionIndex < questions.length){
		showQuestions(questions[nextQuestionIndex].question, questions[nextQuestionIndex].options, questions[nextQuestionIndex].answerIndex);
		nextQuestionIndex++;
		questionCounter++;
	}
	else{
		showUserScore();
	}
}
// gives feedback on answer choice - correct or incorrect
function showAnswer(correct){
	if(correct){
		$(".pop-up").removeClass("pop-up-incorrect").addClass("pop-up-correct");
	}
	else{
		$(".pop-up").removeClass("pop-up-correct").addClass("pop-up-incorrect");
	}
	$("body").addClass("pop-up-open");
	$(".pop-up").fadeIn();
}
// shows questions on page
function showQuestions(question, options, answerIndex){
	$("#question-title").html(question);
	$(".question-answers").empty();
	for(var i = 0; i < options.length; i++){
		var correctAnswer = false;
		if(i == answerIndex){
			correctAnswer = true;
		}
		$(".question-answers").append('<li data-correct-answer="'+correctAnswer+'">' + options[i] + '</li>');
	}
}
// shows user's score after quiz is finished
function showUserScore(){
	// $(".question-title").empty();
	// $(".question-answers").empty();
	$("all-questions").hide();
	$(".user-score").append(score);
	$(".user-score").fadeIn();
	$(".restart-quiz").fadeIn();
}
// event listener to enable user to click on answer options
$(".question-answers").on("click", ".answer-list", function(){
	showAnswer($(this).data("correct-answer"));
	console.log("You clicked this");
})