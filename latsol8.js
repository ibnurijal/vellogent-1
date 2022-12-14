//inisiasi soal dalam quiz
const questions = [
    {
        question: "Bilangan yang terletak 5 satuan di sebelah kiri -3 adalah ...",
        optionA: "2",
        optionB: "0",
        optionC: "-7",
        optionD: "-8",
        correctOption: "optionD"
    },

    {
        question: "Hasil dari - 9 + (-11) - (-20) adalah ...",
        optionA: "40",
        optionB: "0",
        optionC: "20",
        optionD: "11",
        correctOption: "optionB"
    },

    {
        question: "25, 15, -2, -12, 0, 7, -5, -15. Dari bilangan tersebut yang merupakan nilai terkecil adalah ...",
        optionA: "-15",
        optionB: "0",
        optionC: "-2",
        optionD: "25",
        correctOption: "optionA"
    },

    {
        question: "Sebagian kue dibagi 8 sama besar. Maka, tiap bagian bernilai ...",
        optionA: "8",
        optionB: "1/4",
        optionC: "1/8",
        optionD: "4",
        correctOption: "optionC"
    },

    {
        question: "1/4, 3/2, 5/4, 1/8. 9/11. Dari pecahan tersebut, yang merupakan pecahan terbesar adalah ...",
        optionA: "1/8",
        optionB: "9/11",
        optionC: "3/2",
        optionD: "5/4",
        correctOption: "optionC"
    },

    {
        question: "Angka 27 jika ditulis dalam romawi menjadi ...",
        optionA: "XXV",
        optionB: "XIV",
        optionC: "XVII",
        optionD: "XXVII",
        correctOption: "optionD"
    },

    {
        question: "Angka romawi C jika dibelakangnya ditambahkan X maka akan bernilai ...",
        optionA: "100",
        optionB: "110",
        optionC: "50",
        optionD: "60",
        correctOption: "optionB"
    },

    {
        question: "Angka romawi XL bernilai ...",
        optionA: "60",
        optionB: "70",
        optionC: "80",
        optionD: "90",
        correctOption: "optionA"
    },

    {
        question: "Jumlah simetri lipat yang dimiliki lingkaran adalah ...",
        optionA: "10",
        optionB: "5",
        optionC: "2",
        optionD: "Tak Hingga",
        correctOption: "optionD"
    },

    {
        question: "Bangun datar yang tidak memiliki simetri putar adalah ...",
        optionA: "Jajar genjang",
        optionB: "Persegi panjang",
        optionC: "Trapesium",
        optionD: "Belah ketupat",
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
        remark = "Nilai kurang, terus berusaha dan jangan menyerah."
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