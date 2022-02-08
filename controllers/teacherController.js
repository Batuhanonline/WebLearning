const Teacher = require('../models/teacher')



const teacher_index = (req,res) => {   
    res.render('teacherindex')
}

const teacher_lesson_note = (req,res) => {
    res.render('teacherlessonnotes')
}

const teacher_lesson_contents = (req,res) => {
    res.render('teacherlessons')
}

const teacher_test = (req,res) => {
    res.render('teachertest')
}

const teacher_archive = (req,res) => {
    res.render('teacherarsiv')
}




module.exports = {
    teacher_index,
    teacher_lesson_note,
    teacher_lesson_contents,
    teacher_test,
    teacher_archive
}