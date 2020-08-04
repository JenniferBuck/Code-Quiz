// alert ('aloha');
const elStart = document.getElementById("start");
const elIntro = document.querySelector( ".intro" );
const elTimeLeft = document.querySelector(".time-left");
const elQuizFrame = document.querySelector( ".quiz-item" );
const elQuestion = document.querySelector(".question");
const elAnswerA = document.querySelector(".opt1");
const elAnswerB = document.querySelector(".opt2");
const elAnswerC = document.querySelector(".opt3");
const elAnswerD = document.querySelector(".opt4");
const elRightWrong = document.querySelector( ".answer-status" );
const elUserScore = document.getElementById( "scoreContainer" );

let theCurrentQuestion = 0;
//const theLastQuestion = 11;
const theLastQuestion = 8;
const theQuizDuration = 75;
// we -1 from the Duration to deal with the the setInterval function doesn't run until after the first interval has elapsed.
let theTimeLeft = theQuizDuration - 1;
let theNumberCorrect = 0;

// NOTE: -1 means all correct, 0 means none correct (which would be mean in this context).
const quizItems = 
	[ 
		[	'What is string interpolation?', 
			'Printing a string to the console',
			'Joining multiple strings together using operators like +',
			'Using template literals to embed variables into a string',
			'Mapquest to the North Pole',	
			3	
		],
		[
			'What are variables used for in javascript?',
			'For changing language settings.',
			'For storing or holding data.',
			'Heating up a pizza',
			'Taking out the trash',
			2
		],
		[
			'The best tutor in the world is?',
			'Wes Bos.',
			'Lee Mandell',
			'Tim Berners-Lee',
			'Jake Burch',
			-1
        ],
        [
            'Which one is a JavaScript Data Type?',
            'Variable',
            'Object',
            'Style',
            'Image',
            'Pizza',
            2
        ],
        [
            'What is a string concatenation?',
            'When you change a variables value.',
            'When you join strings together.',
            'When you assign a striing to a variable.',
            'When you print a string to the console.',
            2
        ],
        [
            'Which company developed JavaScript?',
            'Apple',
            'Microsoft',
            'Netscape',
            'Sierra',
            'Toyota',
            3
        ],
        [
            'Who invented JavaScript?',
            'Brendan Eich',
            'Steve Jobs',
            'Walter White',
            'Owen Meany',
            'Bill Gates',
            1
        ],
        [
            'How long did it take to develop JavaScript?',
            '125 days',
            '32 days',
            '4 years',
            '10 days',
            '1 day',
            4
        ],
	]; // End of quizItems.

function countDownTimer() {
	// let theTimeLeft = theQuizDuration;
	let countDownTime = setInterval(function() {
			if( theTimeLeft <= 0 ) {
					clearInterval(countDownTime);
					elTimeLeft.innerHTML = "Times Up!";
			} else {
					elTimeLeft.innerHTML = theTimeLeft + " seconds left";
			}
			theTimeLeft -= 1;
	}, 1000);
}

function allDone() {
	console.log('All Done!');
	console.log( theNumberCorrect );
    elUserScore.classList.remove( 'me-hide' );
    let myFormHTML = elUserScore.innerHTML;
	elUserScore.innerHTML = 'You got ' + theNumberCorrect + ' answers right!' + myFormHTML;
}

function writeNextQuestion() {
	if( theCurrentQuestion < theLastQuestion ) {
			let myQuestion = '';
			let myAnswerA = '';
			let myAnswerB = '';
			let myAnswerC = '';
			let myAnswerD = '';

		// switch( theCurrentQuestion ) {
		//     case 1: 
		//         myQuestion = quizItems.q1;
		//         myAnswerA = quizItems.a1A;
		//         myAnswerB = quizItems.a1B;
		//         myAnswerC = quizItems.a1C;
		//         myAnswerD = quizItems.a1D;
		//     break;

		//     case 2:

		//     break;

		//     case 3:
		// }

		elQuestion.innerHTML = quizItems[theCurrentQuestion][0];
		elAnswerA.innerHTML = quizItems[theCurrentQuestion][1];
		elAnswerB.innerHTML = quizItems[theCurrentQuestion][2];
		elAnswerC.innerHTML = quizItems[theCurrentQuestion][3];
		elAnswerD.innerHTML = quizItems[theCurrentQuestion][4];
	} else {
		allDone();
	}

}

function evalAnswer( event ) {
    console.log('You Clicked');
    console.log(event);
	console.log( event.target.classList[0] );
	console.log( theCurrentQuestion );

	const myUserAnswer =  event.target.classList[0];
	const myCorrectAnswerID = quizItems[theCurrentQuestion][5];
	const myCorrectAnswer = 'opt' + myCorrectAnswerID;
	let myAnwerStatus = '';

	console.log( 'correct is: ' + myCorrectAnswer );

	if( myCorrectAnswerID >= 0 && myUserAnswer !== myCorrectAnswer ) {
		myAnwerStatus = "Wrong";
		theTimeLeft -= 5;
	} else {
		myAnwerStatus = "Right";
		theNumberCorrect++;
	}

	elRightWrong.innerHTML = myAnwerStatus;

	theCurrentQuestion++; // Don't call until after the click is evaluated.
	writeNextQuestion();
}

function beginQuiz() {
	elIntro.classList.add( 'me-hide' );
	elStart.classList.add( 'me-hide' );
	
	myAnswers = document.querySelectorAll('.answer li');
	myAnswers.forEach(function( answer ){
		answer.addEventListener( 'click', evalAnswer );
	});
	// elAnswerA.addEventListener( 'click', evalAnswer );
	// elAnswerB.addEventListener( 'click', evalAnswer );
	// elAnswerC.addEventListener( 'click', evalAnswer );
	// elAnswerD.addEventListener( 'click', evalAnswer );
	countDownTimer();
	writeNextQuestion();
	elQuizFrame.classList.remove( 'me-hide');
	elTimeLeft.classList.remove( 'me-hide');	
}

elStart.addEventListener( 'click', function() {
	beginQuiz();
});

