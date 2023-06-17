let questions = [
    {
        "question":"Wann erschien der erste Batman Comic?",
        "answer_1":"1844",
        "answer_2":"2020",
        "answer_3":"1939",
        "answer_4":"1984",
        "right-answer":3
    },
    {
        "question":"Gotham City gibt es nur im Comic. Aber welche reale Stadt soll Gotham darstellen?",
        "answer_1":"Mainz",
        "answer_2":"München",
        "answer_3":"Los Angeles",
        "answer_4":"New York",
        "right-answer":4
    },
    {
        "question":"Was wäre Batman ohne...?",
        "answer_1":"Fred Feuerstein",
        "answer_2":"Barney Stinson",
        "answer_3":"Robin",
        "answer_4":"Fred Durst",
        "right-answer":3
    },
    {
        "question":"Wer steckt hinter Batmans Maske?",
        "answer_1":"Bruce Wayne",
        "answer_2":"Bruce Willis",
        "answer_3":"Robin",
        "answer_4":"Hulk",
        "right-answer":1
    },
    {
        "question":"Welcher Schauspieler verkörperte in dem Jahr 1997 erschienen Film Batman & Robin den eisigen Bösewicht Mr. Freeze?",
        "answer_1":"Arnold Schwarzenegger",
        "answer_2":"Silvester Stallone",
        "answer_3":"Neil Patrick Harris",
        "answer_4":"Harold aus Harold & Kumar",
        "right-answer":1
    },
    {
        "question":"Wer ist Edward Nigma alter Ego in vielen Batman Filmen und Comics?",
        "answer_1":"Pinguin",
        "answer_2":"Riddler",
        "answer_3":"Hulk",
        "answer_4":"Two-Face",
        "right-answer":2
    },
    {
        "question":"Welcher Schauspieler spielte in der Serie Gotham den Riddler?",
        "answer_1":"Evan Stone",
        "answer_2":"Cory Michael Smith",
        "answer_3":"Jim Carrey",
        "answer_4":"Michael Keaton",
        "right-answer":2
    },
    {
        "question":"So sexy wie verrückt und oft an der Seite des Jokers zu sehen. Von welcher Schurkin aus dem DC Extended Universe ist die Rede?",
        "answer_1":"Harley Quinn",
        "answer_2":"She-Hulk",
        "answer_3":"Supergirl",
        "answer_4":"Poison Ivy",
        "right-answer":1
    },
    {
        "question":"In Entenhausen gibt es ebenfalls einen dunkel gekleideten Helden. Wie heißt er?",
        "answer_1":"Black-Duck",
        "answer_2":"Phantomias",
        "answer_3":"Rubber-Duck",
        "answer_4":"Donald Duck",
        "right-answer":2
    },
    {
        "question":"Wer steckt hinter der Maske von Phantomias?",
        "answer_1":"Gustav Gans",
        "answer_2":"Donald Duck",
        "answer_3":"Dagobert Duck",
        "answer_4":"Tick, Trick und Track",
        "right-answer":2
    }
];

let currentQuestion = 0;
let answeredQuestions = [];
let givenAnswerResult = [];
let givenAnswer;

function init(){
    document.getElementById('questions-amount').innerHTML = questions.length;
    showQuestion();
    disableButton();
}

function showQuestion(){

    if(currentQuestion == questions.length){
        let rightAnswers = 0;
        let wrongAnswers = 0;
        givenAnswerResult.forEach(element => {
            if(element=='right'){
                rightAnswers+=1;
                
            }
            else{
                wrongAnswers+=1;
            }
        });
        document.getElementById('card-pic').src = "img/the-end.jpg"
        document.getElementById('endScreen').innerHTML = /*html*/`
        <p><b>Quiz beendet!</b></p>
        <span>Du hast <b>${rightAnswers}</b> Frage(n) richtig und <b>${wrongAnswers}</b> Frage(n) falsch beantwortet!</span>
        <button class="btn btn-dark" onclick="reloadPage()">Nochmal spielen</button>
        `;
        document.getElementById('endScreen').style='';
        document.getElementById('questionBody').style.display = "none";
    }
    else{
        document.getElementById('current-question-number').innerHTML = currentQuestion+1;
        document.getElementById('questiontext').innerHTML = questions[currentQuestion].question;
        document.getElementById('answer_1').innerHTML = questions[currentQuestion].answer_1;
        document.getElementById('answer_2').innerHTML = questions[currentQuestion].answer_2;
        document.getElementById('answer_3').innerHTML = questions[currentQuestion].answer_3;
        document.getElementById('answer_4').innerHTML = questions[currentQuestion].answer_4;
    }
}

function disableButton(){
    let button = document.getElementById('nextQuestion');
    button.disabled = true;
}
function enableButton(){
    let button = document.getElementById('nextQuestion');
    button.disabled = false;
}

function answer(selection){
    let selectedQuestionNumber = selection.slice(-1);
    let rightAnswerNumber = questions[currentQuestion]["right-answer"];
    if(selectedQuestionNumber==questions[currentQuestion]["right-answer"]){
        document.getElementById(selection).parentNode.classList.add('bg-success');
        givenAnswer = 'right';
        setLocalStorage(selectedQuestionNumber,givenAnswer);
    }
    else{
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById('answer_'+rightAnswerNumber).parentNode.classList.add('bg-success');
        givenAnswer = 'wrong';
        setLocalStorage(selectedQuestionNumber,givenAnswer);
    }
    enableButton();
    increaseProgressBar();
}

function nextQuestion(){
    currentQuestion++;
    showQuestion();
    disableButton();
    clearAnswerFields();
}

function setLocalStorage(selectedQuestionNumber,givenAnswer){
    answeredQuestions.push(selectedQuestionNumber);
    givenAnswerResult.push(givenAnswer);

    let answeredQuestionsAsTest = JSON.stringify(answeredQuestions);
    let givenAnswerResultAsText = JSON.stringify(givenAnswerResult);

    localStorage.setItem('QuestionNumbers',answeredQuestionsAsTest);
    localStorage.setItem('RightorWrong',givenAnswerResultAsText);
}

function resetLocalStorage(){
    localStorage.clear();
}

function clearAnswerFields(){
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}

function increaseProgressBar(){
    let percentage = (currentQuestion+1)/questions.length
    percentage = percentage*100;
    console.log(percentage);
    document.getElementById('progress-bar').innerHTML = `${percentage} %`;
    document.getElementById('progress-bar').style.width = `${percentage}%`;
}

function reloadPage(){
    location.reload();
    resetLocalStorage()
}