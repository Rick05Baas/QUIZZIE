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
        question: 'When was Forza Horizon Launched?',
        choice1: '23 October 2012',
        choice2: '28 September 2018',
        choice3: '5 November 2021 ',
        choice4: '4 march 2014',
        answer: 1,
    },
    {
        question: 'By who was Forza Horizon Developed?',
        choice1: 'Microsoft Studios',
        choice2: 'Forza ',
        choice3: 'Playground Games',
        choice4: 'Steve Jobs',
        answer: 3,
    },
    {
        question: 'Which instalment was Forza Horizon 5?',
        choice1: '11th',
        choice2: '14th',
        choice3: '5th',
        choice4: '12th',
        answer: 4,
    },
    {
        question: 'In which year did Forza Horizon won The Game Awards?',
        choice1: '2012',
        choice2: '2017',
        choice3: '2020',
        choice4: '2021',
        answer: 4,
    },
    {
        question: 'Which choice starter cars can you choose in Forza Horizon ?',
        choice1: 'Audi A2, Ford Focus',
        choice2: 'Chevrolet C8 Corvette Stingray, Ford Bronco',
        choice3: 'Audi A2 1.4, Volkswagen Jetta',
        choice4: 'Willy MB Jeep, The Supervan III ',
        answer: 2,
    },
    {
        question: 'Forza Horizon 5 was popular right after the launch how many times was the game played in the first week?',
        choice1: '10 million',
        choice2: '11 million',
        choice3: '11,2 million',
        choice4: '12 million',
        answer: 1,
    },
    {
        question: 'Which track is the longest track on Forza Horizon 5?',
        choice1: 'Suzuki Circuit',
        choice2: 'Red Bull Ring',
        choice3: 'Goliath',
        choice4: 'Mountain Of Death',
        answer: 3,
    },
    {
        question: 'How many Forza Horizons are there?',
        choice1: '12',
        choice2: '7',
        choice3: '6',
        choice4: '5',
        answer: 4,
    },
    {
        question: 'Who did published Forza Horizon?',
        choice1: 'Microsoft Studios ',
        choice2: 'Playground Games ',
        choice3: 'Forza',
        choice4: 'Epic Games',
        answer: 1,
    },
    {
        question: 'When did Forza Horizon 3 Release?',
        choice1: '30 September 2016',
        choice2: '28 September 2016',
        choice3: '4 November 2016',
        choice4: '27 September 2016',
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

        return window.location.assign('/quizzie/rick/end/')
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