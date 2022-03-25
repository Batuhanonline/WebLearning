const Academy =  require('../models/academy')
const Teacher = require('../models/teacher')
const Student = require('../models/student')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')

const academy_index_get = (req,res) => {
    const academyID = req.params.id
    Student.find({ academyID: academyID }).sort({ createdAt: -1 })
        .then((result) => {
            const student = result
            Teacher.find({ academyID: academyID }).sort({ createdAt: -1 })
                .then((result) => {
                    res.render('academy/academyindex',{title: 'Akademi-Anasayfa', teachers: result, students: student, academyID: academyID})
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })

    
}

const academy_teachers_get = (req, res) => {
    const academyID = req.params.id
    Teacher.find({ academyID: academyID }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('academy/academyteachers', { title: 'Akademi-Öğretmenler', teachers:result, academyID: academyID })
        })
        .catch((err) => {
            console.log(err)
        })
}

const academy_students_get = (req, res) => {
    const academyID = req.params.id
    Student.find({ academyID: academyID }).sort({ createdAt: -1 })
        .then((result) => {
            res.render('academy/academystudents', { title: 'Akademi-Öğrenciler', students: result, academyID: academyID })
        })
        .catch((err) => {
            console.log(err)
        })
}

const academy_student_info_get = (req, res) => {
    const studentID = req.params.student
    const academyID = req.params.id
    console.log(studentID)
    Student.findById(studentID)
        .then((result) => {
            const student = result
            Teacher.find({ academyID: academyID }).sort({ createdAt: -1 })
                .then((result) => {
                    res.render('academy/academystudentinfo',{title: 'Akademi-Öğrenci Bilgi', teachers: result, student: student})
                })
                .catch((err) => {
                    console.log(err)
                })
        }).catch((err) => {
            console.log(err)
        })
}

const academy_student_info_post = (req, res) => {
    const { selectTeacherID, deleteTeacher} = req.body
    const studentID = req.params.student
    
    
    if (selectTeacherID) {
        Student.updateOne({ _id: studentID }, {$push: {teachers: {teacherID: selectTeacherID}}})
        .then((result) => {
            res.redirect('back')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if (deleteTeacher) {
        Student.updateOne({ _id:studentID }, {$pull: {teachers: {teacherID: deleteTeacher}}})
        .then((result) => {
            res.redirect('back')
        })    
        .catch((err) => {
            console.log(err)
        })
    }
    
}

const academy_teacher_add_get = (req,res) => {
    const academyID = req.params.id
    res.render('academy/teacheradd',{title: 'Akademi-Öğretmen Ekle'})
}

const academy_teacher_add_post = (req,res) => {
    const academyID = req.params.id
    const teacher = new Teacher(req.body)
    teacher.save()
        .then((result) => {
            res.redirect('/akademi/'+academyID)
        }).catch((err) => {
            console.log(err)
        })
}

const academy_student_add_get = (req, res) => {
    res.render('academy/studentadd', { title: 'Akademi- Öğrenci Ekle'})
}

const academy_student_add_post = (req, res) => {
    const academyID = req.params.id
    console.log(req.body)
    const student = new Student(req.body)
    student.save()
        .then((result) => {
            res.redirect('/akademi/'+academyID)
        }).catch((err) => {
            console.log(err)
        })
}


module.exports = {
    academy_index_get,
    academy_teacher_add_get,
    academy_teacher_add_post,
    academy_student_add_get,
    academy_student_add_post,
    academy_student_info_get,
    academy_student_info_post,
    academy_students_get,
    academy_teachers_get
}