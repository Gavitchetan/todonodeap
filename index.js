import exp from "express";
import bcrypt from 'bcrypt'
import mongoose from "mongoose";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import path from "path";

const app = exp();
mongoose.connect('mongodb://127.0.0.1:27017/', { dbName: 'mognos' }).then(() => {
                  console.log('server is  connected to mognodb')
}).catch(() => {
                  console.log('server is not connected ')
});
const Mschema = new mongoose.Schema({
                  name: String,
                  email: String,
                  password: String,
})
const NewUser = mongoose.model("NewUser", Mschema);
// importatnts settings
app.use(exp.static(path.join(path.resolve(), 'public')))
app.use(exp.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(cookieParser());
const port = 2000;
const hostname = 'localhost';
app.listen(port, hostname, (req, res) => {
                  console.log(`server is workin on http://${hostname}:${port}`)
})

const Othentication = async (req, res, next) => {
                  const { token } = req.cookies;
                  if (token) {
                                    const decode = Jwt.verify(token, 'sass');
                                    req.user = NewUser.findById(decode._id)
                                    next()
                  } else {
                                    res.redirect('/login')
                  }


}
app.get('/', Othentication, (req, res) => {
                  res.render('logout')
})

app.post('/login', async (req, res) => {
                  const { email, password } = req.body;
                  const user = await NewUser.findOne({ email })
                  if (!user) return res.redirect('/register');

                  const ismathc = bcrypt.compare(password, user.password);

                  if (!ismathc) res.redirect('/login')
                  const token = Jwt.sign({ _id: user._id }, 'sass')
                  res.cookie('token', token, {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 60 * 1000)
                  })
                  res.redirect('/')
})
app.post('/register', async (req, res) => {
                  const { name, email, password } = req.body;
                  const isuser = await NewUser.findOne({ email })
                  if (isuser) {
                                    return res.redirect('/login')
                  }
                  else {
                                    const hashpassword = await bcrypt.hash(password, 10)
                                    const user = NewUser.create({
                                                      name,
                                                      email,
                                                      password: hashpassword
                                    })
                                    const token = Jwt.sign({ _id: user._id }, 'sass')
                                    res.cookie('token', token, {
                                                      httpOnly: true,
                                                      expires: new Date(Date.now() + 60 * 1000)
                                    })
                                    res.redirect('/')
                  }
})

app.get('/logout', (req, res) => {
                  res.cookie('token', null, {
                                    httpOnly: true,
                                    expires: new Date(Date.now())
                  })
                  res.redirect('/')
})
app.get('/login', (req, res) => {
                  res.render('login')
})
app.get('/register', (req, res) => {
                  res.render('register')
})