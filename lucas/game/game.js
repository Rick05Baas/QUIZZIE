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
    question: 'When was the first Gran Turismo Released?',
        choice1: '23 December 1995',
        choice2: '4 march 1995',
        choice3: '23 december 1997 ',
        choice4: '4 march',
        answer: 3,
    },
    {
        question: 'Which one is right?',
        choice1: 'First Polyphony Digital, Then Polys Entertainment',
        choice2: 'First Polys Entertainment, Then Polyphony Digital ',
        choice3: 'First Polies Entertain, Then polies Digital',
        choice4: 'First Polys Digital, then Polyphony Digital',
        answer: 2,
    },
    {
        question: 'How many years does Gran Turismos series Exist?',
        choice1: '26 years',
        choice2: '24 years',
        choice3: '29 years',
        choice4: '23 years',
        answer: 1,
    },
    {
        question: 'On what platform is Gran Turismo 7 Available?',
        choice1: 'PC, PS4, PS5, Xbox, Nintendo Switch',
        choice2: 'PS4',
        choice3: 'PS4, P55',
        choice4: 'PS4, PS5',
        answer: 4,
    },
    {
        question: 'In what category did Gran Turismo 7 won The Game Awards 2022?',
        choice1: 'Best Game',
        choice2: 'Best Racing Game',
        choice3: 'Best Sport Racing Game',
        choice4: 'Best Car Racing Game',
        answer: 3,
    },
    {
        question: 'How many million times was Gran Turismo sold worldwide?',
        choice1: '10,76',
        choice2: '10,81',
        choice3: '11',
        choice4: '10,85',
        answer: 4,
    },
    {
        question: 'How many different Circuits (+ Different Layouts) are there?',
        choice1: '35',
        choice2: '25',
        choice3: '50',
        choice4: '60',
        answer: 4,
    },
    {
        question: 'Which Gran Turismo came out between Gran Turismo 6 and 7?',
        choice1: 'Gran Turismo Streets',
        choice2: 'Gran Turismo Sport',
        choice3: 'Gran Turismo Between',
        choice4: 'Gran Turismo Speed',
        answer: 2,
    },
    {
        question: 'Who did produce Gran Turismo?',
        choice1: 'Kazunori Yamauchi ',
        choice2: 'Keng Akihiko',
        choice3: 'Yeng Jijng Bi',
        choice4: 'Ono Beijing Ye',
        answer: 1,
    },
    {
        question: 'How many Miles are driven by the Gran Turismo Community in 2022?',
        choice1: '25 Million',
        choice2: '13 Million',
        choice3: '25 Billion',
        choice4: '13 Billion',
        answer: 4,
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

        return window.location.assign('/ajhbwduabsdjhbwhavsd/end/')
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