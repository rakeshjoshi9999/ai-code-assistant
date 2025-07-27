import express from 'express';
import cors from 'cors';
import generateReview
 from './review.js';
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())

app.post('/api/v1/reviews',async(req,res)=>{
    let data = req.body;
    try{
        const review = await generateReview(data);
        console.log('====>',review)
        return res.send({
            review
        })
    }catch(error){
        return res.status(500).send({
            message:error.message
        })
    }
});

app.listen(port,()=>{
    console.log('Server is running on port: '+port)
})