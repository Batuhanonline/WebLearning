const Student = require('../models/student')
const Teacher = require('../models/teacher')
const Lesson = require('../models/lessons')

const student_index_get = (req, res) => {
    res.render('studentindex', {title: 'Öğrenci-Anasayfa'})
}




module.exports = {
    student_index_get
}
