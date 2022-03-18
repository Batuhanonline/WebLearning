const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Lesson = require('../models/lessons')
const LessonAfterTest = require('../models/lessonaftertest')
const LessonAfterVideo = require('../models/lessonaftervideo')
const LessonAfterGame = require('../models/lessonaftergame')

const student_index_get = (req, res) => {
    const studentID = req.params.id
    res.render('student/studentindex', {title: 'Öğrenci-Anasayfa', studentID: studentID})
}

const student_lessons_get = (req, res) => {
    const studentID = req.params.id
    Student.findOne({ _id: studentID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const teacherID = result.teachers[0].teacherID

            Lesson.find({ lessonTeacher: teacherID }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('student/studentlessons', { title: 'Öğrenci-Dersler', studentID: studentID, teacherID: teacherID, lessons: result })
                }
            })
        }
    })
}

const student_lesson_detail_get = (req, res) => {
    const studentID = req.params.id
    const lessonID = req.params.lesson
    Lesson.findOne({ _id: lessonID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
           res.render('student/studentlessondetail', { title: 'Öğrenci-Ders Detayı', studentID: studentID, lesson: result })
        }
    })
}

const lesson_after_test_detail_get = (req, res) => {
    LessonAfterTest.findOne({ _id: '622ede59072759b5be87dad9' }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('student/lessonaftertest', { title: 'Ders Sonrası Test', lessonTest: result })
        }
    })
}

const student_games_get = (req, res) => {
    const studentID = req.params.id

    Student.findOne({ _id: studentID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const teacherID = result.teachers[0].teacherID

            LessonAfterGame.find({ teacherID: teacherID }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('student/studentgames', { title: 'Öğrenci-Oyunlar', games: result })
                }
            })
        }        
    })

}

const student_games_post = (req, res) => {
    
}

const student_game_detail_get = (req, res) => {
    const studentID = req.params.id
    const gameID = req.params.lesson

    LessonAfterGame.findOne({ _id: gameID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('student/studentgamedetail', { title: 'Oyunlaştırılmış Pekiştirme', 
            game: result,
            studentID: studentID })
        }
    })
}

const student_draganddroplist_get = (req,res) => {




    res.render('student/draganddroplistlesson', {title: 'Sürükle Bırak Liste Kontrolü'})
}

const student_tests_get = (req, res) => {
    const studentID = req.params.id

    Student.findOne({ _id: studentID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const teacherID = result.teachers[0].teacherID

            LessonAfterTest.find({ lessonTeacher: teacherID }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('student/studenttests', { title: 'Öğrenci-Testler', 
                    studentID: studentID, 
                    teacherID: teacherID, 
                    tests: result })
                }
            })
        }
    })
}

const student_videos_get = (req, res) => {
    const studentID = req.params.id

    Student.findOne({ _id: studentID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const teacherID = result.teachers[0].teacherID

            LessonAfterVideo.find({ teacherID: teacherID }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('student/studentvideos', {title: 'Öğrenci-Videolar',
                    teacherID: teacherID,
                    studentID: studentID,
                    videos: result })
                }
            })
        }
    })
}


const student_videolesson_detail_get = (req, res) => {
    const studentID = req.params.id
    const videoLessonID = req.params.videolessonid

    LessonAfterVideo.findOne({ _id: videoLessonID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
           res.render('student/studentvideodetail', { title: 'Öğrenci-Video Ders', studentID: studentID, videoLesson: result })
        }
    })

}

var questions = [],
    answers = [],
    i = 0



module.exports = {
    student_index_get,
    student_draganddroplist_get,
    student_lesson_detail_get,
    lesson_after_test_detail_get,
    student_tests_get,
    student_lessons_get,
    student_videos_get,
    student_videolesson_detail_get,
    student_games_get,
    student_games_post,
    student_game_detail_get,

    questions_get(req, res, next){
        const studentID = req.params.id
        const testID = req.params.test
    
        LessonAfterTest.findById({ _id: testID }, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                questions = result.questions
                answer = []
                res.render('student/test/test', { title: 'Öğrenci-Test',
                question: questions[0].question,
                options: questions[0].options,
                studentID: studentID })
            }
        } )
    },


    questions_next(req, res, next){
        console.log("question: ", questions)
        i = i + 1;
            if(req.body.optradio){
                if(i <= questions.length) {
                    answers.push(req.body.optradio)
                }
                 if(i < questions.length){
                res.render('student/test/test',
                {   title: 'Öğrenci-Test',
                    question:questions[i].question,
                    options:questions[i].options});
                 } else {
                     i=0;
                     var score = 0;
                     for(let j = 0 ; j < questions.length; j++) {
                          if(questions[j].answer == answers[j])
                          {
                              score = score + 1;
                              console.log('skor:'+score)
                          }
                     } 
                     res.render('student/test/score',{
                        title: 'Test Skor',
                        score: score,
                        total: questions.length})
                        answers = []
                 }
            } 
    },



}


