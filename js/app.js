function getQuestions(){
	$.getJSON("questions.json", function(json){
		questions = json.questions;
		showQuestions();
	});
}
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
$(".question-answers").on("click", ".answer-list", function(){
	showAnswer($(this).data("correct-answer"));
	console.log("You clicked this");
})