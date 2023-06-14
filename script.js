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
        "question":"In Entenhausen gibt es ebenfalls einen dunkel gekleideten Helden. Wie heißt er?",
        "answer_1":"Black-Duck",
        "answer_2":"Phantomias",
        "answer_3":"Rubber-Duck",
        "answer_4":"Donald Duck",
        "right-answer":2
    }
];

let currentQuestion = 0;

function init(){
    document.getElementById('questions-amount').innerHTML = questions.length;
    showQuestion();
}

function showQuestion(){
    document.getElementById('questiontext').innerHTML = questions[currentQuestion].question;
    document.getElementById('answer_1').innerHTML = questions[currentQuestion].answer_1;
    document.getElementById('answer_2').innerHTML = questions[currentQuestion].answer_2;
    document.getElementById('answer_3').innerHTML = questions[currentQuestion].answer_3;
    document.getElementById('answer_4').innerHTML = questions[currentQuestion].answer_4;
}

function answer(selection){
    for (let index = 1; index < 5; index++) {
        document.getElementById('answer_'+index).classList.remove('rightAnswer');
        document.getElementById('answer_'+index).classList.remove('wrongAnswer');
    }
    let selectedQuestionNumber = selection.slice(-1);
    if(selectedQuestionNumber==questions[currentQuestion]["right-answer"]){
        document.getElementById(selection).parentNode.classList.add('bg-success');
    }
    else{
        document.getElementById(selection).classList.add('bg-danger');
    }
}