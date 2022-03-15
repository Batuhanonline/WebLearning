

const questions = lessonTest.questions

function Question(text, choices, answer){
    this.text = text
    this.choices = choices
    this.answer = answer
}

//Question prototype
Question.prototype.checkAnswer = (answer) => {
    return this.answer === answer
}



// Test Constructor
function Test(questions) {
    this.questions = questions
    this.score = 0
    this.questionIndex = 0
}

//Test prototype
Test.prototype.getTest = () => {
    return this.questions[this.questionIndex]
}

//Test is Finish
Test.prototype.isFinish = () => {
    return this.questions.length === this.questionIndex
}

//Test guess
Test.prototype.guess = (answer) => {
    var question = this.getTest()

    if (question.checkAnswer(answer)) {
        this.score++
    }
    this.questionIndex++
}

//start test
var test = new Test(questions)

console.log(test.isFinish())