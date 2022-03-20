const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Lesson = require('../models/lessons')
const LessonAfterTest = require('../models/lessonaftertest')
const LessonAfterVideo = require('../models/lessonaftervideo')
const LessonAfterGame = require('../models/lessonaftergame')

const student_index_get = (req, res) => {
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
                    const lessons = result  
                    
                    LessonAfterGame.find({ teacherID: teacherID }, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            const games = result
                            
                            LessonAfterTest.find({ lessonTeacher: teacherID }, (err, result) => {
                                if (err) {
                                    console.log(err)
                                } else {
                                    const tests = result

                                    LessonAfterVideo.find({ teacherID: teacherID }, (err, result) => {
                                        if (err) {
                                            console.log(err)
                                        } else {
                                            const videos = result

                                            res.render('student/studentindex', {title: 'Öğrenci-Anasayfa', 
                                                studentID: studentID, 
                                                lessons: lessons,
                                                games: games,
                                                videos: videos,
                                                tests: tests    })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })

        }
    })   
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
            const student = result
            LessonAfterTest.find({ lessonTeacher: teacherID }, (err, result) => {
                if (err) {
                    console.log(err)
                } else {
                    res.render('student/studenttests', { title: 'Öğrenci-Testler', 
                    student: student, 
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

const questions_get = (req, res, next) => {
    const studentID = req.params.id
    const testID = req.params.test

    LessonAfterTest.findById({ _id: testID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const test = result
            res.render('student/test/test', { title: 'Öğrenci-Test',
            test: test,
            studentID: studentID })
        }
    } )
}

const questions_post = (req, res) => {
    const studentID = req.params.id
    const testID = req.params.test
    const data = req.body
    const answers = [data.answer0,data.answer1,data.answer2,data.answer3,data.answer4,data.answer5,
        data.answer6,data.answer7,data.answer8,data.answer9]
    LessonAfterTest.findById({ _id: testID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            const test = result
            var answerTrue = 0
            var answerFalse = 0
            test.questions.forEach((question, index) => {
                if (question.answer == answers[index]) {
                    answerTrue++
                } else {
                    answerFalse++
                }
            })
            Student.updateOne({ _id: studentID }, { $push: { examGrades: {
                lessonID: testID,
                answerTrue: answerTrue,
                answerFalse: answerFalse
            } } })
                .then((result) => {
                    res.redirect('/ogrenci/'+studentID+'/test')
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    } )

}


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
    questions_get,
    questions_post

}


