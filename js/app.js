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
	$(".all-answers").show();
	$(".all-questions").show();
	$(".score").hide();
	$(".number-counter-wrapper").show();
	showNextQuestion();
}
// gets next question of quiz
function showNextQuestion(){
	if(nextQuestionIndex < questions.length){
		var questionInfo = questions[nextQuestionIndex].info;
		$(".pop-up").fadeOut("slow", function(){
			$(".question-info").html(questionInfo);
		});
		showQuestions(questions[nextQuestionIndex].question, questions[nextQuestionIndex].options, questions[nextQuestionIndex].answerIndex);
		nextQuestionIndex++;
		$(".number-counter").html("<p>Question " + questionCounter + " of 5</p>");
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
		$(".answer-feedback").text("Correct!");
		score++;
	}
	else{
		$(".pop-up").removeClass("pop-up-correct").addClass("pop-up-incorrect");
		$(".answer-feedback").text("Incorrect!");
	}
	$("body").addClass("pop-up-open");
	$(".pop-up").fadeIn();
}
// shows questions on page
function showQuestions(question, options, answerIndex){
	$(".question-title").html(question);
	$(".question-answers").empty();
	for(var i = 0; i < options.length; i++){
		var correctAnswer = false;
		if(i == answerIndex){
			correctAnswer = true;
		}
		$(".question-answers").append('<li class="answer-list" data-correct-answer="' + correctAnswer + '">' + options[i] + '</li>');
	}
}
// shows user's score after quiz is finished
function showUserScore(){
	$(".pop-up").hide();
	$(".all-answers").hide();
	$(".all-questions").hide();
	$(".user-score").html("<p>Your score is: " + score + " out of 5</p");
	$(".score").fadeIn();
	$(".number-counter-wrapper").hide();
}
// event listener to enable user to click on answer options
$(".question-answers").on("click", ".answer-list", function(){
	showAnswer($(this).data("correct-answer"));
})
// event listener for click on correct/incorrect screen continue button 
$(".pop-up").on("click", ".continue", function(){
	showNextQuestion();
})
// event listener for click on restart quiz button at end of quiz
$(".score").on("click", ".restart-quiz", function(){
	startQuiz();
})