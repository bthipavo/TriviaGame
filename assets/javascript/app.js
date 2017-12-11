window.onload = function() {
  $('#submit').hide();
  $('#restart').hide();
  stopwatch.start();
  triviaQuestions.getQuestions();
  $("#question").on("change", "input[name^=question]", triviaQuestions.selectAnswers);
  $("#submit").on("click", triviaQuestions.checkAnswers);
  $("#restart").on("click", function() {
  	stopwatch.reset();
  	stopwatch.start();
  	triviaQuestions.getQuestions();
  });
  
		
};
var intervalId;
var idVar = {};
var answerBox = [];
var keyBox = [];
var numQuestion = 0;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

// Our stopwatch object
var stopwatch = {

  time: 0,
  lap: 1,

  reset: function() {

    stopwatch.time = 0;

    // DONE: Change the "display" div to "00:00."
    $("#display").text("00:00");
    clearInterval(intervalId); 
    clockRunning = false;
    $('#restart').show();
    $('#submit').hide();
 	idVar = {};
 	answerBox = [];
 	keyBox = [];
 	numQuestion = 0;

    // DONE: Empty the "laps" div.
  },
  start: function() {

    // DONE: Use setInterval to start the count here and set the clock to running.
    if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
    }
  },
  count: function() {

    // DONE: increment time by 1, remember we cant use "this" here.

    // console.log("current time " + stopwatch.time);
    stopwatch.time--;

    // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
    //       and save the result in a variable.

    var converted = stopwatch.timeConverter(stopwatch.time);
    // console.log(converted);

    // DONE: Use the variable we just created to show the converted time in the "display" div.
    $("#display").text(converted);
  },
  timeConverter: function(t) {

    var minutes = (Math.floor(t / 60));
    // console.log("initial" + minutes);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    // console.log(seconds);

 {
      minutes = 2 - Math.abs(minutes);
      // console.log("minute count " + minutes) ;
    }

    if(minutes === 0 && seconds == 0) {
    	minutes = 0;
    	seconds = 0;
    	$('#question').html("game over!");
    	stopwatch.reset();
    }

    return minutes + ":" + seconds;
  }
};

var triviaQuestions = {

	getQuestions: function(){

		$('#submit').show();
		$('#restart').hide();
		$('#question').empty();
	 	$('#results').hide();


		var queryURL = "https://qriusity.com/v1/questions?page=9&limit=5";
		$.ajax({
		url: queryURL,
		method: "GET"
		})

		//function - after the info is pulled from API, it will run this function
		.done(function(response) {

			var results = response;
			var spanButton = "";
			var radioButton = "";
			
			var radioLink = "";

		//sets imageurl with the image's URL

		//creates image tag
			for (var i = 0; i < results.length; i++){

			var trivia = $('<p>');
			var formQuestions = $('<form>');
			var counter = 0;
			

			console.log(response);
			// console.log(results[i]);

			//adds attributes source and alternative message
			trivia.text(results[i].question);
			keyBox.push(results[i].answers);
			numQuestion++;
			
			$(trivia).append(formQuestions);
			

				$.each( results[i], function(key, value) {

					if (key.indexOf('option') === 0) {
						// console.log(key.indexOf('option'));
						// 
						counter ++;
						spanButton = $('<div>');
						radioButton = $('<input>');
						idVar['question' + (i+1) + key] = 'question'+(i+1)+key;
						// radioLink = "input:radio["+idVar['question' + (i+1)]+"]";

						radioButton.attr('type', 'radio');
						radioButton.attr('name', 'question'+(i+1));
						radioButton.attr('id', idVar['question' + (i+1) + key]);
						// console.log(idVar['question' +(i+1)]);
						radioButton.attr('value', counter);
						// $(radioLink).onclick = trivaQuestions.selectAnswers();
						// console.log(value);
						spanButton.text(value);
						// 
						$(spanButton).prepend(radioButton);
						$(formQuestions).append(spanButton);
						// console.log("value: " + $("#question1option1").val());

						// console.log("ID: " + idVar);
						

				}
				});

			$("#question").append(trivia);
			}

	});



	
		

	},

	selectAnswers: function() {
		answerBox = [];
		// console.log('number of questions ' + numQuestion);

		for (var i = 0; i < numQuestion; i++){
			answerBox.push(0);
		}
		// console.log('initial answerBox '+ answerBox);

		$.each(idVar, function(i) {
			// console.log(i+1);
			// console.log(idVar[i]);
			if($("input[id="+idVar[i]+"]:checked").val()>0) {
				// console.log(i.indexOf('question1'));
				if(i.indexOf('question1') === 0) {
					// console.log('hello1');
					answerBox.splice(0,1,parseInt($("input[id="+idVar[i]+"]:checked").val()));				
				}
				else
					if(i.indexOf('question2') === 0) {
					// console.log('hello2');
					answerBox.splice(1,1,parseInt($("input[id="+idVar[i]+"]:checked").val()));				
				}
				else
					if(i.indexOf('question3') === 0) {
					// console.log('hello3');
					answerBox.splice(2,1,parseInt($("input[id="+idVar[i]+"]:checked").val()));				
				}
				else
					if(i.indexOf('question4') === 0) {
					console.log('hello4');
					answerBox.splice(3,1,parseInt($("input[id="+idVar[i]+"]:checked").val()));				
				}
				else
					if(i.indexOf('question5') === 0) {
					console.log('hello5');
					answerBox.splice(4,1,parseInt($("input[id="+idVar[i]+"]:checked").val()));
					}	

			}
			// else {
			// 	answerBox.push("0");
			// }
			// console.log(answerBox);
			// console.log(radioValue);
		});
		
		
	},

	checkAnswers: function() {

		console.log("checking answers");
		console.log(answerBox);
		console.log(keyBox);

		var correctAnswer = 0;
		var wrongAnswer = 0;
		var noAnswer = 0;

		if (answerBox.length === 0) {
			for (var i = 0; i < numQuestion; i++){
			answerBox.push(0);
			}
		}

		for(var i = 0; i<keyBox.length; i++) {
			if(keyBox[i] === answerBox[i]) {
				correctAnswer++;
			}
			else
				if (answerBox[i] === 0) {
					noAnswer++;
				}
				else {
					wrongAnswer++;
				}
		}

		console.log('correct ' + correctAnswer);
		console.log('wrong ' + wrongAnswer);
		console.log('no answer ' + noAnswer);

		$('#results').show();

		$('#results').html('<p> Correct Answers: '+ correctAnswer +'</p>' + '<p> Wrong Answers: '+ wrongAnswer +'</p>' + '<p> No Answers: '+ noAnswer +'</p>');
		$('#submit').hide();
		stopwatch.reset();
	}

};