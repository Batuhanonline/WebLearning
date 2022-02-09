

const login_get = (req, res) => {
    res.render('login')
}

const login_post = (req, res) => {}
const teacher_login_get = (req, res) => {}
const teacher_login_post = (req, res) => {}
const academy_login_get = (req, res) => {}
const academy_login_post = (req, res) => {}
const student_login_get = (req, res) => {}
const student_login_post = (req, res) => {}
const logout_get = (req, res) => {}


module.exports = {
    login_get,
    login_post,
    teacher_login_get,
    teacher_login_post,
    academy_login_get,
    academy_login_post,
    student_login_get,
    student_login_post,
    logout_get
}