import jwt from 'jsonwebtoken';

export const sendCookies = (res, user, message, statusCode = 200) => {
  console.log(user)
  const token = jwt.sign({ _id: user._id },
    process.env.secret);
  res.status(statusCode).cookie('token', token, {
    httpOnly: true,
    maxAge: 15 * 60 * 1000,
    sameSite: process.env.NODE_ENV === "Devlopment" ? 'lax' : "none",
    secure: process.env.NODE_ENV === "Devlopment" ? false : true,
  }).json({
    message,
    success: true
  });
};
