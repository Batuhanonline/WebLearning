const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Lesson = require('../models/lessons')

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

const student_draganddroplist_get = (req,res) => {
    res.render('student/draganddroplistlesson', {title: 'Sürükle Bırak Liste Kontrolü'})
}



module.exports = {
    student_index_get,
    student_draganddroplist_get,
    student_lessons_get
}


