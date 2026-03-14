const router = require("express").Router()
const nodemailer = require("nodemailer")

router.post("/", async(req,res)=>{

const transporter = nodemailer.createTransport({

service:"gmail",
auth:{
user:"YOURMAIL@gmail.com",
pass:"APP_PASSWORD"
}

})

await transporter.sendMail({

from:req.body.email,
to:"YOURMAIL@gmail.com",
subject:"Travel website message",
text:req.body.message

})

res.json({status:"sent"})

})

module.exports = router