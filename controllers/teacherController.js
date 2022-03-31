const Mongoose = require('mongoose') 
const Teacher = require('../models/teacher')
const Lesson = require('../models/lessons')
const LessonAfterTest = require('../models/lessonaftertest')
const LessonAfterVideo = require('../models/lessonaftervideo')
const LessonAfterGame = require('../models/lessonaftergame')
const jwt = require('jsonwebtoken')

const { marked }= require('marked')
const slugify = require('slugify')
const createDomPurifier = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurifier(new JSDOM().window)


const teacher_index = (req,res) => {   
    res.render('teacher/teacherindex', {title: 'Öğretmen-Anasayfa'})
}

const teacher_lesson_note = (req,res) => {
    res.render('teacher/teacherlessonnotes', {title: 'Öğretmen-Öğretmen Ders Notları'})
}


const teacher_lesson_contents_get = (req,res) => {
    const teacherID = req.params.id
    Lesson.find({ lessonTeacher: teacherID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('teacher/teacherlessons', {title: 'Öğretmen-Dersler', lessons: result, teacherID: teacherID})
        }
    })  
}

const teacher_lesson_contents_post = async (req, res) => {
    const { deleteLessonID }= req.body
    if (deleteLessonID) {
        Lesson.findByIdAndDelete(deleteLessonID)
            .then((result) => {
                res.redirect('back')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}


const new_lesson_content = (req,res) => {
    res.render('teacher/newlesson', { title: 'Öğretmen-Yeni Ders İçeriği'})
}

const new_lesson_content_post = (req,res) => {
    const teacherID = req.params.id
    const lesson = req.body
    const addLesson = new Lesson({
        lessonTitle: lesson.lessonTitle,
        lessonDescription: lesson.lessonDescription,
        lessonSubject: lesson.lessonSubject,
        lessonTeacher: teacherID
    })
    addLesson.save()
        .then((result) => {
            const lessonID = result._id
            Teacher.updateOne({ _id: teacherID }, {$push: {lesson: {lessonID: lessonID}}} )
            .then((result)=>{
                const url = '/ogretmen/'+teacherID+'/'+lessonID+ '/ders'
                res.redirect(url)
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err) => {
            console.log(err)
        })
}

const lesson_detail_get = (req, res) => {
    const teacherID = req.params.teacher
    const lessonID = req.params.lesson
    const lesson = Lesson.findById({_id: lessonID}, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.render('teacher/lessondetail', {title: 'Ders Detayı', lesson: result, teacherID:teacherID})
        }
    })
    if(lesson == null) res.redirect('/ogretmen/'+teacherID)
}

const lesson_detail_edit_get =  (req, res) => {
    const teacherID = req.params.teacher
    const lessonID = req.params.lesson
    const lesson =  Lesson.findById({_id: lessonID}, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
            res.render('teacher/lessonedit', {title: 'Ders Düzenleme', lesson: result, teacherID:teacherID})
        }
        if(lesson == null) res.redirect('/ogretmen/'+teacherID)
    })
}


const lesson_detail_edit_post = (req ,res) => {
    const teacherID = req.params.teacher
    const lessonID = req.params.lesson
    const lesson = req.body
    Lesson.findOneAndUpdate({ _id: lessonID }, {
        lessonTitle: lesson.lessonTitle,
        lessonDescription: lesson.lessonDescription,
        lessonSubject: lesson.lessonSubject,
        sanitizedHtml:  dompurify.sanitize(marked(lesson.lessonSubject))
    }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/ogretmen/'+teacherID+'/'+lessonID+'/ders')
        }
    })
}

const lesson_content_get = (req, res) => {
    res.render('teacher/contentadd', {title: 'Ders İçeriği'})
}

const lesson_content_post = (req, res) => {
    const teacherID = req.params.teacher
    const lessonID = req.params.lesson
    const lessonContent = req.body

    Lesson.updateOne({ _id: lessonID }, {$push:{lessonContent:{
        order: lessonContent.order,
        paragraph: lessonContent.paragraph,
        song: lessonContent.song
    }}})
        .then((result) => {
            res.redirect('back')
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
}

const teacher_test_get = (req,res) => {
    
    const teacherID = req.params.id
    LessonAfterTest.find({ teacherID: teacherID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('teacher/teachertest', {title: 'Öğretmen-Testler',
            teacherID: teacherID,
            tests: result })
        }
    })

}

const teacher_test_post = (req, res) => {


    const { deleteTestID }= req.body
    if (deleteTestID) {
        LessonAfterTest.findByIdAndDelete(deleteTestID)
            .then((result) => {
                res.redirect('back')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const teacher_newtest_add_get = (req, res) => {
    const teacherID = req.params.id
    res.render('teacher/testadd', { title: 'Test Ekle', teacherID: teacherID })
}

const teacher_newtest_add_post = (req, res) => {

    const teacherID = req.params.id
    const testTitle = req.body.testTitle
    const testDescription = req.body.testDescription
    const addTest = new LessonAfterTest ({
        testTitle: testTitle,
        testDescription: testDescription,
        teacherID: teacherID
    })
    addTest.save()
        .then((result) => {
            res.redirect('/ogretmen/'+teacherID+'/'+result.id+'/soruekle')
        })
        .catch((err) => {
            console.log(err)
        })
}

const teacher_test_add_get = (req, res) => {
    const teacherID = req.params.id
    res.render('teacher/testaddnewquestion', { title: 'Yeni Soru Ekle', teacherID: teacherID })
}

const teacher_test_add_post = (req, res) => {
    const teacherID = req.params.id
    const testID = req.params.testid
    const data = req.body

    const sanitizedHtml = dompurify.sanitize(marked(data.question))
    
    LessonAfterTest.updateOne({ _id: testID }, {$push: { questions: {
        question: data.question,
        sanitizedHtml: sanitizedHtml,
        options: data.options,
        answer: data.answer
    }}})
    .then((result) => {
        res.redirect('back')
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })
}



const teacher_videos_get = (req, res) => {
    const teacherID = req.params.id

    LessonAfterVideo.find({ teacherID: teacherID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('teacher/teachervideos', {title: 'Öğretmen-Videolar',
            teacherID: teacherID,
            videos: result })
        }
    })
}

const teacher_videos_post = (req, res) => {

    const { deleteLessonID }= req.body
    if (deleteLessonID) {
        LessonAfterVideo.findByIdAndDelete(deleteLessonID)
            .then((result) => {
                res.redirect('back')
            })
            .catch((err) => {
                console.log(err)
            })
    }

}

const teacher_videos_add_get = (req, res) => {
    res.render('teacher/videoadd', { title: 'Video Ekle' })
}

const teacher_videos_add_post = (req, res) => {
    const teacherID = req.params.id
    const data = req.body
    
    const addVideo = new LessonAfterVideo({
        lessonTitle: data.lessonTitle,
        lessonDescription: data.lessonDescription,
        lessonVideoURL: data.lessonVideoURL,
        teacherID: teacherID
    })
    addVideo.save()
        .then((result) => {
            res.redirect('/ogretmen/'+teacherID+'/video')
        })
        .catch((err) => {
            console.log(err)
        })
}


const teacher_games_get = (req, res) => {
    const teacherID = req.params.id

    LessonAfterGame.find({ teacherID: teacherID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('teacher/teachergames', {title: 'Öğretmen-Oyunlar',
            teacherID: teacherID,
            games: result })
        }
    })
}

const teacher_games_post = (req, res) => {
    const { deleteGameID }= req.body
    if (deleteGameID) {
        LessonAfterGame.findByIdAndDelete(deleteGameID)
            .then((result) => {
                res.redirect('back')
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

const teacher_newgame_get = (req, res) => {
    res.render('teacher/gameadd', { title: 'Oyun Ekle' })
}

const teacher_newgame_post = (req, res) => {
    const teacherID = req.params.id
    const data = req.body

    const addGame = new LessonAfterGame({
        gameTitle: data.gameTitle,
        gameDescription: data.gameDescription,
        teacherID: teacherID,
        gameContent: data.gameContent
    }) 
    addGame.save()
        .then((result) => {
            console.log(result)
            res.redirect('/ogretmen/'+teacherID+'/oyunlar')
        })
        .catch((err) => {
            console.log(err)
        })
}


const teacher_archive = (req,res) => {
    res.render('teacher/teacherarsiv', {title: 'Öğretmen-Arşiv'})
}

const teacher_logout = (req,res) => {
    res.cookie('token', '', {maxAge:1})
    res.redirect('/')
}





module.exports = {
    teacher_index,
    teacher_lesson_note,
    teacher_lesson_contents_get,
    teacher_lesson_contents_post,
    new_lesson_content,
    new_lesson_content_post,
    lesson_detail_get,
    lesson_detail_edit_get,
    lesson_detail_edit_post,
    teacher_test_get,
    teacher_test_post,
    teacher_archive,
    lesson_content_get,
    lesson_content_post,
    teacher_newtest_add_get,
    teacher_newtest_add_post,
    teacher_test_add_get,
    teacher_test_add_post,
    teacher_videos_get,
    teacher_videos_post,
    teacher_videos_add_get,
    teacher_videos_add_post,
    teacher_games_get,
    teacher_games_post,
    teacher_newgame_get,
    teacher_newgame_post,
    teacher_logout
}