let questions = [
    {
        "question": "Wann erschien der erste Batman Comic?",
        "answer_1": "1844",
        "answer_2": "2020",
        "answer_3": "1939",
        "answer_4": "1984",
        "right-answer": 3
    },
    {
        "question": "Gotham City gibt es nur im Comic. Aber welche reale Stadt soll Gotham darstellen?",
        "answer_1": "Mainz",
        "answer_2": "München",
        "answer_3": "Los Angeles",
        "answer_4": "New York",
        "right-answer": 4
    },
    {
        "question": "Was wäre Batman ohne...?",
        "answer_1": "Fred Feuerstein",
        "answer_2": "Barney Stinson",
        "answer_3": "Robin",
        "answer_4": "Fred Durst",
        "right-answer": 3
    },
    {
        "question": "Wer steckt hinter Batmans Maske?",
        "answer_1": "Bruce Wayne",
        "answer_2": "Bruce Willis",
        "answer_3": "Robin",
        "answer_4": "Hulk",
        "right-answer": 1
    },
    {
        "question": "Welcher Schauspieler verkörperte in dem Jahr 1997 erschienen Film Batman & Robin den eisigen Bösewicht Mr. Freeze?",
        "answer_1": "Arnold Schwarzenegger",
        "answer_2": "Silvester Stallone",
        "answer_3": "Neil Patrick Harris",
        "answer_4": "Harold aus Harold & Kumar",
        "right-answer": 1
    },
    {
        "question": "Wer ist Edward Nigma alter Ego in vielen Batman Filmen und Comics?",
        "answer_1": "Pinguin",
        "answer_2": "Riddler",
        "answer_3": "Hulk",
        "answer_4": "Two-Face",
        "right-answer": 2
    },
    {
        "question": "Welcher Schauspieler spielte in der Serie Gotham den Riddler?",
        "answer_1": "Evan Stone",
        "answer_2": "Cory Michael Smith",
        "answer_3": "Jim Carrey",
        "answer_4": "Michael Keaton",
        "right-answer": 2
    },
    {
        "question": "So sexy wie verrückt und oft an der Seite des Jokers zu sehen. Von welcher Schurkin aus dem DC Extended Universe ist die Rede?",
        "answer_1": "Harley Quinn",
        "answer_2": "She-Hulk",
        "answer_3": "Supergirl",
        "answer_4": "Poison Ivy",
        "right-answer": 1
    },
    {
        "question": "In Entenhausen gibt es ebenfalls einen dunkel gekleideten Helden. Wie heißt er?",
        "answer_1": "Black-Duck",
        "answer_2": "Phantomias",
        "answer_3": "Rubber-Duck",
        "answer_4": "Donald Duck",
        "right-answer": 2
    },
    {
        "question": "Wer steckt hinter der Maske von Phantomias?",
        "answer_1": "Gustav Gans",
        "answer_2": "Donald Duck",
        "answer_3": "Dagobert Duck",
        "answer_4": "Tick, Trick und Track",
        "right-answer": 2
    }
];

// Globale Variablen
let currentQuestion = 0;
let wrongAnswers = 0;
let rightAnswers = 0;
let amountOfAnswers = 4;
let audio_success = new Audio('audio/good.wav');
let audio_fail = new Audio('audio/wrongSong.wav');

function init() {
    document.getElementById('questions-amount').innerHTML = questions.length;
    showCard();
    disableButton();
}

function showCard() {
    if (gameIsOver()) {
        showEndCard();
    }
    else {
        showQuestionCard();
    }
}

function showQuestionCard() {
    document.getElementById('current-question-number').innerHTML = currentQuestion + 1;
    document.getElementById('questiontext').innerHTML = questions[currentQuestion].question;
    if (gameIsOver()) {
        document.getElementById('nextCard').innerHTML = 'Ergebnis anzeigen';
    }
    else {
        document.getElementById('nextCard').innerHTML = 'Nächste Frage';
    }
    for (let index = 1; index <= amountOfAnswers; index++) {
        document.getElementById('answer_' + index).innerHTML = questions[currentQuestion]["answer_" + index];
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}

function showEndCard() {
    document.getElementById('card-pic').src = "img/the-end.jpg"
    document.getElementById('endScreen').innerHTML = /*html*/`
    <p><b>Quiz beendet!</b></p>
    <span>Du hast <b>${rightAnswers}</b> Frage(n) richtig und <b>${wrongAnswers}</b> Frage(n) falsch beantwortet!</span>
    <button class="btn btn-dark" onclick="reloadPage()">Nochmal spielen</button>
    `;
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style.display = "none";
}

function disableButton() {
    let button = document.getElementById('nextCard');
    button.disabled = true;
}
function disableAnswerFields() {
    for (let index = 1; index <= amountOfAnswers; index++) {
        document.getElementById('answer_' + index).parentNode.classList.remove("answer-fields-hover");
        document.getElementById('answer_' + index).parentNode.classList.add("answer-fields-blocked");
    }
}

function enableAnswerFields() {
    for (let index = 1; index <= amountOfAnswers; index++) {
        document.getElementById('answer_' + index).parentNode.classList.add("answer-fields-hover");
        document.getElementById('answer_' + index).parentNode.classList.remove("answer-fields-blocked");
    }
}
function enableButton() {
    let button = document.getElementById('nextCard');
    button.disabled = false;
}

function answer(selection) {
    let selectedQuestionNumber = selection.slice(-1);
    let rightAnswerNumber = questions[currentQuestion]["right-answer"];
    if (rightAnswerTrue(selectedQuestionNumber)) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        audio_success.play();
        setTimeout(enableButton, 3000);
        rightAnswers += 1;
    }
    else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById('answer_' + rightAnswerNumber).parentNode.classList.add('bg-success');
        audio_fail.play();
        setTimeout(enableButton, 6000);
        wrongAnswers += 1;
    }
    increaseProgressBar();
    disableAnswerFields();
}

function rightAnswerTrue(selectedQuestionNumber) {
    return selectedQuestionNumber == questions[currentQuestion]["right-answer"]
}

function nextQuestion() {
    currentQuestion++;
    showCard();
    disableButton();
    clearAnswerFields();
    enableAnswerFields();
}

function clearAnswerFields() {
    for (let index = 1; index <= amountOfAnswers; index++) {
        document.getElementById('answer_' + index).parentNode.classList.remove('bg-danger');
        document.getElementById('answer_' + index).parentNode.classList.remove('bg-success');
    }
}

function increaseProgressBar() {
    let percentage = (currentQuestion + 1) / questions.length
    percentage = percentage * 100;
    document.getElementById('progress-bar').innerHTML = `${percentage} %`;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

function reloadPage() {
    location.reload();
}