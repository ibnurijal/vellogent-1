//inisiasi soal dalam quiz
const questions = [
    {
        question: " 17 + 5 = n, nilai n yang tepat adalah ...",
        optionA: "20",
        optionB: "21",
        optionC: "22",
        optionD: "23",
        correctOption: "optionC"
    },

    {
        question: "Besok hari kamis, kemarin hari ...",
        optionA: "Selasa",
        optionB: "Rabu",
        optionC: "Jumat",
        optionD: "Sabtu",
        correctOption: "optionA"
    },

    {
        question: " 59,28,36,68,72 bilangan yang terbesar adalah ...",
        optionA: "36",
        optionB: "28",
        optionC: "72",
        optionD: "59",
        correctOption: "optionC"
    },

    {
        question: " 26 - 12 = n, nilai n yang tepat adalah ...",
        optionA: "14",
        optionB: "38",
        optionC: "25",
        optionD: "18",
        correctOption: "optionA"
    },

    {
        question: "Lambang bilangan tiga puluh enam adalah ...",
        optionA: "3006",
        optionB: "306",
        optionC: "30",
        optionD: "36",
        correctOption: "optionD"
    },

    {
        question: "Kaleng susu adalah benda yang berbentuk ...",
        optionA: "Kubus",
        optionB: "Tabung",
        optionC: "Bola",
        optionD: "Balok",
        correctOption: "optionB"
    },

    {
        question: "Dua bilangan sesudah 23 adalah ...",
        optionA: "25",
        optionB: "27",
        optionC: "22",
        optionD: "21",
        correctOption: "optionA"
    },

    {
        question: "23 - 11 + 8 = n, nilai untuk n adalah ...",
        optionA: "20",
        optionB: "21",
        optionC: "30",
        optionD: "10",
        correctOption: "optionA"
    },

    {
        question: "Lala membeli 20 permen. Dimakan 8, sisa permen Lala tinggal ...",
        optionA: "10",
        optionB: "12",
        optionC: "11",
        optionD: "20",
        correctOption: "optionB"
    },

    {
        question: "Joko mempunyai 38 kelereng. Tono mempunyai 15 kelereng. Selisih kelereng Joko dan Tono adalah ...",
        optionA: "25",
        optionB: "24",
        optionC: "23",
        optionD: "22",
        correctOption: "optionC"
    }
]

let shuffledQuestions = [] //empty array to hold shuffled selected questions

function handleQuestions() {
    //function to shuffle and push 10 questions to shuffledQuestions array
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}

let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// function for displaying next question in the array to dom
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //gets current Question 
    const currentQuestionAnswer = currentQuestion.correctOption //gets current Question's answer
    const options = document.getElementsByName("option"); //gets all elements in dom with name of 'option' (in this the radio inputs)
    let correctOption = null
    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            //get's correct's radio input with correct answer
            correctOption = option.labels[0].id
        }
    })

    //checking to make sure a radio input has been checked or an option being chosen
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //checking if checked radio button is same as answer
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "green"
            playerScore++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "red"
            document.getElementById(correctOption).style.backgroundColor = "green"
            wrongAttempt++
            indexNumber++
            //set to delay question number till when next question loads
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}

//called when the next button is called
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //delays next question displaying for a second
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//sets options background back to null after display the right/wrong colors
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

// unchecking all radio buttons for next question(can be done with map or foreach loop also)
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

// function for when all questions being answered
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // condition check for player remark and remark color
    if (playerScore <= 3) {
        remark = "Nilai kurang, terus berlatih dan jangan menyerah."
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "nilai sedang, kamu pasti bisa lebih baik."
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Luar biasa, tetap pertahankan prestasimu."
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //data to display to score board
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}