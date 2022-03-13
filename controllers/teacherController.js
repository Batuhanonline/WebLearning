const Mongoose = require('mongoose') 
const Teacher = require('../models/teacher')
const Lesson = require('../models/lessons')
const jwt = require('jsonwebtoken')



const teacher_index = (req,res) => {   
    res.render('teacherindex', {title: 'Öğretmen-Anasayfa'})
}

const teacher_lesson_note = (req,res) => {
    res.render('teacherlessonnotes', {title: 'Öğretmen-Öğretmen Ders Notları'})
}


const teacher_lesson_contents_get = (req,res) => {
    const teacherID = req.params.id
    Lesson.find({ lessonTeacher: teacherID }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.render('teacherlessons', {title: 'Öğretmen-Dersler', lessons: result, teacherID: teacherID})
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
    res.render('newlesson', { title: 'Öğretmen-Yeni Ders İçeriği'})
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
            res.render('lessondetail', {title: 'Ders Detayı', lesson: result, teacherID:teacherID})
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
            res.render('lessonedit', {title: 'Ders Düzenleme', lesson: result, teacherID:teacherID})
        }
        if(lesson == null) res.redirect('/ogretmen/'+teacherID)
    })
}


const lesson_detail_edit_post = (req ,res) => {
    const teacherID = req.params.teacher
    const lessonID = req.params.lesson
    const lesson = req.body
    Lesson.findByIdAndUpdate(lessonID, {
        lessonTitle: lesson.lessonTitle,
        lessonDescription: lesson.lessonDescription,
        lessonSubject: lesson.lessonSubject
    }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/ogretmen/'+teacherID)
        }
    })
}

const lesson_content_get = (req, res) => {
    res.render('contentadd', {title: 'Ders İçeriği'})
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

const teacher_test = (req,res) => {
    res.render('teachertest', {title: 'Öğretmen-Testler'})
}

const teacher_archive = (req,res) => {
    res.render('teacherarsiv', {title: 'Öğretmen-Arşiv'})
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
    lesson_detail_edit_get,
    lesson_detail_edit_post,
    teacher_test,
    teacher_archive,
    lesson_content_get,
    lesson_content_post,
    lesson_detail_get,
    teacher_logout
}