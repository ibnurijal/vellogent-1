//inisiasi soal dalam quiz
const questions = [
    {
        question: "Hasil  dari 13 x 15 = ...",
        optionA: "195",
        optionB: "100",
        optionC: "125",
        optionD: "120",
        correctOption: "optionA"
    },

    {
        question: "Hasil dari 27 x (48 - 7) = ...",
        optionA: "1.110",
        optionB: "1.100",
        optionC: "1.107",
        optionD: "1.207",
        correctOption: "optionC"
    },

    {
        question: "Tentukan FPB dari 12 dan 18...",
        optionA: "6",
        optionB: "2",
        optionC: "3",
        optionD: "4",
        correctOption: "optionA"
    },

    {
        question: "5 cm^3=...mm^3",
        optionA: "2.000",
        optionB: "3.000",
        optionC: "4.000",
        optionD: "5.000",
        correctOption: "optionD"
    },

    {
        question: "1/4 abad + 8 windu=...",
        optionA: "69 ",
        optionB: "79 ",
        optionC: "89 ",
        optionD: "99 ",
        correctOption: "optionC"
    },

    {
        question: "Diberikan segitiga dengan alas 10 cm dan tinggi 15 cm, maka luas segitiga tersebut adalah...",
        optionA: "75 cm^2",
        optionB: "80 cm^2",
        optionC: "85 cm^2",
        optionD: "100 cm^2",
        correctOption: "optionA"
    },

    {
        question: "Luas lingkaran jika diameternya 20 cm adalah...",
        optionA: "220 cm^2",
        optionB: "230 cm^2",
        optionC: "414 cm^2",
        optionD: "314 cm^2",
        correctOption: "optionD"
    },

    {
        question: "Perbandingan panjang dan lebar suatu persegi panjang 5 : 3. Jika panjangnya 75 meter, maka lebarnya?",
        optionA: "50 meter",
        optionB: "45 meter",
        optionC: "35 meter",
        optionD: "25 meter",
        correctOption: "optionB"
    },

    {
        question: "Banyak rusuk pada prisma tegak segitiga adalah ...",
        optionA: "12 buah",
        optionB: "9 buah",
        optionC: "8 buah",
        optionD: "6 buah",
        correctOption: "optionD"
    },

    {
        question: "4.500 - 30 x 5 : 3 + 250 =...",
        optionA: "4.000",
        optionB: "4.250",
        optionC: "4.500",
        optionD: "4.750",
        correctOption: "optionB"
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