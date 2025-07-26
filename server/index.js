import express from 'express';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())

app.post('/api/v1/reviews',(req,res)=>{
    let data = req.body.code
    console.log(data)
    return res.send({
        review:'# Code is Good !!'
    })
});

app.listen(port,()=>{
    console.log('Server is running on port: '+port)
})