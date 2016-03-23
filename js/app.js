$(document).ready(function(){
	getQuestions();
});

// declaring global variables
var questions = [];
var nextQuestion = 0;

// function to get json file
function getQuestions(){
	$.getJSON("questions.json", function(json){
	questions = json.questions;
	})
}
// gets next question of quiz
function showNextQuestion(){
	if(nextQuestion < questions.length){
		showQuestions();
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
// event listener to enable user to click on answer options
$(".question-answers").on("click", ".answer-list", function(){
	showAnswer($(this).data("correct-answer"));
	console.log("You clicked this");
})