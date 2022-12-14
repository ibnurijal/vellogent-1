//inisiasi soal dalam quiz
const questions = [
    {
        question: " Hasil hitung dari (3 + 5) x 4 - 12 adalah ...",
        optionA: "10",
        optionB: "15",
        optionC: "20",
        optionD: "25",
        correctOption: "optionC"
    },

    {
        question: "Hasil hitung dari 1.050 - 500 + 2.550 adalah ...",
        optionA: "3.000",
        optionB: "3.100",
        optionC: "3.200",
        optionD: "3.300",
        correctOption: "optionB"
    },

    {
        question: "Kelipatan persekutuan dari 3 dan 6 adalah ...",
        optionA: "3,6,9",
        optionB: "6,18,24",
        optionC: "6,18,21",
        optionD: "9,21,24",
        correctOption: "optionB"
    },

    {
        question: "Faktor persekutuan dari 2 dan 8 adalah ...",
        optionA: "2",
        optionB: "4",
        optionC: "6",
        optionD: "8",
        correctOption: "optionA"
    },

    {
        question: " Suatu persegi memiliki luas 144 cm^2. Maka berapakah sisi persegi tersebut?",
        optionA: "10 cm ",
        optionB: "11 cm ",
        optionC: "12 cm ",
        optionD: "13 cm ",
        correctOption: "optionC"
    },

    {
        question: "Diketahui faktor persekutuan dari 8 dan 12 adalah 4. Maka, kelipatan persekutuannya adalah ...",
        optionA: "12",
        optionB: "16",
        optionC: "24",
        optionD: "96",
        correctOption: "optionC"
    },

    {
        question: "0,25 = ...",
        optionA: "1/2",
        optionB: "1/3",
        optionC: "1/4",
        optionD: "1/5",
        correctOption: "optionC"
    },

    {
        question: "Dina membeli buku sebanyak 2 lusin. Maka berapa buah buku yang Dina dapatkan?",
        optionA: "10",
        optionB: "12",
        optionC: "20",
        optionD: "24",
        correctOption: "optionD"
    },

    {
        question: "Berikut adalah macam-macam sudut, kecuali ...",
        optionA: "Siku-siku",
        optionB: "Segitiga",
        optionC: "Lancip",
        optionD: "Tumpul",
        correctOption: "optionB"
    },

    {
        question: "Sebuah segitiga memiliki panjang sisi 23 cm, 24 cm, dan 25 cm. Tentukan keliling segitiga tersebut!",
        optionA: "50 cm",
        optionB: "64 cm",
        optionC: "72 cm",
        optionD: "84 cm",
        correctOption: "optionD"
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