//Elements
const startButton = document.getElementById('start-btn'); 
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
let scoreP = document.createElement('p')

//Event-Listeners
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    shuffledQuestions++
    setNextQuestion()
})

// API
const questionsAPI = 'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple';

//Variables
let shuffledQuestions, currentQuestionIndex, correctAnswers
let correctAnswer = ''
let wrongAnswer = []


// Functions
function startGame(){
    console.log('started ')
    startButton.classList.add('hide')
//  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
shuffledQuestions = 0
    currentQuestionIndex = 0
    correctAnswers = 0
    questionContainer.classList.remove('hide')
    setNextQuestion();
    scoreP.remove()

}

function setNextQuestion(){
resetState()
showQuestion(shuffledQuestions[currentQuestionIndex])
}

function resetState(){
clearStatusClass(document.body)
nextButton.classList.add('hide')
while(answerButtonsElement.firstChild){
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
}

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

function showQuestion(question){

    

    fetch(questionsAPI)
    .then(response => response.json())
    .then(json => Implementor(json));


    function Implementor(json){
        questionElement.innerHTML = json.results[0].question
        correctAnswer = json.results[0].correct_answer
        wrongAnswer = json.results[0].incorrect_answers
        const answersNEW = [
        {text: correctAnswer, correct: true},
        {text: wrongAnswer[0], correct: false},
        {text: wrongAnswer[1], correct: false},
        {text: wrongAnswer[2], correct: false}]

        shuffle(answersNEW)
        
        answersNEW.forEach(answer => {
            const button = document.createElement('button')
            button.innerText = answer.text
            button.classList.add('btn')
            if (answer.correct) {
                button.dataset.correct = answer.correct
            }
            button.addEventListener('click', selectAnswer)
            answerButtonsElement.appendChild(button)
        })
    
    
    
    }
    
 ;

}

function clearStatusClass(element){
    element.classList.remove('wrong')
    element.classList.remove('correct')
}

function setStatusClass(element, correct){
clearStatusClass(element)
if (correct){
    element.classList.add('correct')
}
else{
    element.classList.add('wrong')
}
}

function selectAnswer(e){
     const selectedButton = e.target
     const correct = selectedButton.dataset.correct
     setStatusClass(document.body, correct)
     Array.from(answerButtonsElement.children).forEach(button => {
         setStatusClass(button, button.dataset.correct)      
     })
     if (selectedButton.dataset.correct){
         correctAnswers++
         console.log(correctAnswers)
     }

    // if (shuffledQuestions.length > currentQuestionIndex + 1){
    if (shuffledQuestions <= 9){
        nextButton.classList.remove('hide')
     } else {
         startButton.innerText = 'Restart'
         startButton.classList.remove('hide')
         scoreP.innerText = 'Your score is ' + String(correctAnswers);
         questionContainer.appendChild(scoreP)
     }
}



