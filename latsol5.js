//inisiasi soal dalam quiz
const questions = [
    {
        question: "Bilangan yang terletak diantara 1.113 dan 1.115 adalah ...",
        optionA: "1.200",
        optionB: "1.114",
        optionC: "1.116",
        optionD: "1.221",
        correctOption: "optionB"
    },

    {
        question: "Hasil dari 2 + 6 x 5 : 6 adalah ...",
        optionA: "10",
        optionB: "8",
        optionC: "6",
        optionD: "7",
        correctOption: "optionD"
    },

    {
        question: "Hasil dari 1.115 + 200 - 277 adalah ...",
        optionA: "482",
        optionB: "500",
        optionC: "560",
        optionD: "480",
        correctOption: "optionA"
    },

    {
        question: "Hasil dari 5 x 6 + 2 - 10 : 5 adalah ...",
        optionA: "35",
        optionB: "32",
        optionC: "30",
        optionD: "39",
        correctOption: "optionC"
    },

    {
        question: "Harga sebuah pensil Rp. 2.500,00. Jika Bayu ingin membeli pensil sebanyak 4 buah maka berapakah yang harus Bayu bayar?",
        optionA: "Rp. 10.000,00",
        optionB: "Rp. 15.000,00",
        optionC: "Rp. 20.000,00",
        optionD: "Rp. 25.000,00",
        correctOption: "optionA"
    },

    {
        question: "Jumlah dari 1 lembar 20.000, 2 lembar 5.000, 3 lembar 2000, 2 lembar 1000, dan 4 lembar 500 adalah ...",
        optionA: "25.000",
        optionB: "30.000",
        optionC: "35.000",
        optionD: "40.000",
        correctOption: "optionD"
    },

    {
        question: "Andre makan 2/7 bagian semangka, Sinta 4/7 bagian semangka, Aldo 5/7 bagian semangka, dan Boni 3/7 bagian semangka. Jadi yang makan semangka lebih banyak adalah ...",
        optionA: "Andre",
        optionB: "Sinta",
        optionC: "Aldo",
        optionD: "Boni",
        correctOption: "optionC"
    },

    {
        question: "Keliling persegi dengan panjang sisi 17 cm adalah ...",
        optionA: "34 cm",
        optionB: "68 cm",
        optionC: "72 cm",
        optionD: "17 cm",
        correctOption: "optionB"
    },

    {
        question: "Dari pukul 08.00 pagi hingga pukul 12.00 siang lamanya adalah ... jam",
        optionA: "3",
        optionB: "5",
        optionC: "4",
        optionD: "2",
        correctOption: "optionC"
    },

    {
        question: "Bangun datar yang memiliki ciri mempunyai dua pasang sisi berhadapan, setiap pasangnya sejajar dan sama panjang, dan diagonal-diagonalnya sama panjang dan berpotongan saling membagi dua sama panjang yaitu ...",
        optionA: "Segitiga",
        optionB: "Persegi",
        optionC: "Lingkaran",
        optionD: "Persegi panjang",
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