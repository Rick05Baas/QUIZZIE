const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'How long did the developer for Assetto Corsa?',
        choice1: '5 years',
        choice2: '8 year',
        choice3: '3 years ',
        choice4: '4 years',
        answer: 3,
    },
    {
        question: 'Who developed Assetto Corsa?',
        choice1: '505 Games',
        choice2: 'Kunos Simulazioni ',
        choice3: '505 Games and Kunos Simulazioni',
        choice4: '505 Games and Kinus Simulazioni',
        answer: 2,
    },
    {
        question: 'When was announced that assetto corsa would come to PS4 and Xbox One?',
        choice1: '26 Augustus 2016',
        choice2: '23 June 2020',
        choice3: 'Summer 2018',
        choice4: '3 June 2015',
        answer: 4,
    },
   
{
        question: 'On what platform is Assetto Corsa Competizione  Available?',
        choice1: 'PC, PS4, PS5, Xbox One, Nintendo Switch',
        choice2: ' PS4, PS5, Xbox One, Xbox Series X/S, ',
        choice3: ' PC, PS4, Xbox Series X/S, Xbox One',
        choice4: ' PS4, PS5, Xbox One, PC, Xbox Series X/S',
        answer: 4,
    },
    {
        question: 'Where was announced that Assetto Corsa Competizione would come to PS5 and Xbox Series X/S?',
        choice1: 'Gamescom',
        choice2: 'Total 24 hours Spa 2021',
        choice3: 'Esports',
        choice4: 'Reveal PS5',
        answer: 1,
    },
    {
        question: 'Assetto Corsa released in the early access in 8 November 2013. When was the game official fully released?',
        choice1: '29 May 2019',
        choice2: '19 December 2014',
        choice3: '1 January, 2014',
        choice4: '29 May 2019',
        answer: 2,
    },
    {
        question: 'How many different Circuits are there?',
        choice1: '11',
        choice2: '36',
        choice3: '22',
        choice4: '43',
        answer: 3,
    },
    {
        question: 'Assetto Corsa Stand For: ?',
        choice1: 'Race Simulator',
        choice2: 'Race Setup',
        choice3: 'Drive Hard',
        choice4: 'Escape Normal',
        answer: 2,
    },
    {
        question: 'Assetto Corsa was Originally For ?',
        choice1: 'Xbox One ',
        choice2: 'Ps4',
        choice3: 'Xbox Series X/S',
        choice4: 'PC',
        answer: 4,
    },
    {
        question: '505 Games was ? for Assetto Corsa',
        choice1: 'Publisher',
        choice2: 'Developer',
        choice3: 'Management',
        choice4: 'Announcer',
        answer: 1,
    }
]



const SCORE_POINTS = 125
const MAX_QUESTIONS = 10


startGame = () => {
   questionCounter = 0
   score = 0 
   availableQuestions = [...questions]
   getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/quizzie/joost/end/')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()