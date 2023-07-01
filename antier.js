import assert from "assert";
import cookieParser from "cookie-parser";
import exp from "express";
import Jwt from "jsonwebtoken";
// Database server = mogo db connection     
import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/", { dbName: "backend" }).then(() => {
                  console.log('connetcted to mongo db')
}).catch((err) => {
                  console.log('find error', err)
});

const colorSchema = new mongoose.Schema({
                  name: String,
                  email: String,
                  password: String,
});
const NewUser = mongoose.model("NewUser", colorSchema);

// node serv 
const port = 2000;
const hostname = 'localhost';
const app = exp();
import path from 'path'
app.use(exp.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(exp.static(path.join(path.resolve(), "public")))
app.set('view engine', 'ejs')
app.listen(port, hostname, () => {

                  console.log(`http://${hostname}:${port}`)
})

//
const isothentic = async (req, res, next) => {
                  const { token } = req.cookies;
                  if (token) {
                                    const decode = Jwt.verify(token, 'sass')
                                    // console.log(decode)
                                    req.user = await NewUser.findById(decode._id)
                                    next();
                  } else {

                                    res.render('login', { name: req.body.name })
                  }
}
app.get('/', isothentic, (rq, res) => {
                  res.render("logout", { name: rq.user.name })
})
app.post('/login', async (req, res) => {
                  const { email, password } = req.body;
                  awaitconsole.log(email, password)
                  let user = await NewUser.findOne({ email })
                  if (!user) return res.redirect('/register');
                  const ismatch = user.password === password;

                  if (!ismatch) return res.redirect('login', { email, pass: 'enter correct password' })
                  const token = Jwt.sign({ _id: user._id }, 'sass')
                  res.cookie('token', token, {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 60 * 1000)
                  })
                  res.redirect('/')

})
app.post('/register', async (req, res) => {
                  const { name, email, password } = req.body;
                  let User = await NewUser.findOne({ email })
                  if (User) {
                                    return res.redirect('/login')
                  }
                  else {
                                    const user = await NewUser.create({
                                                      name: name,
                                                      email: email,
                                                      password: password,

                                    })
                                    const token = Jwt.sign({ _id: user._id }, 'sass')
                                    res.cookie('token', token, {
                                                      httpOnly: true,
                                                      expires: new Date(Date.now() + 60 * 1000)
                                    })
                                    res.redirect('/')
                  }

});
app.get('/logout', (req, res) => {
                  console.log(req.user)
                  res.cookie("token", '', {
                                    httpOnly: true,
                                    expires: new Date(Date.now())
                  })
                  res.redirect('/')
})

app.get('/login', (rq, res) => {
                  res.render('login')
})
app.get('/register', (rq, res) => {
                  res.render('reg')
})