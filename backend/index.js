const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const userRouter=require('./routes/userRoutes')
const emailRouter=require('./routes/emailRoutes')
const passwordRouter=require('./routes/passwordRoutes')
require('dotenv').config()

const app=express()
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true
}))
app.use('/api/user',userRouter)
app.use('/api/email',emailRouter)
app.use('/api/password',passwordRouter)

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "ChatApp"
    })
    .then(() => {
        console.log("connected to Database");
    })
    .catch((err) => {
        console.log(err);
    });
});