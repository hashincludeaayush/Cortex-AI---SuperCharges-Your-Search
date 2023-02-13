import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Configuration, OpenAIApi } from "openai";
import http from "http";

dotenv.config();




const hostname = "127.0.0.1";
const port = process.env.port || 5000;



const configuration = new Configuration({
    apiKey: process.env.REACT_EXRESS_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
app.get('/', async(req, res) =>{
res.status(200).send({
    message: 'Hello from Cortex AI'
})
})

app.post('/', async(req, res) =>{
try{
  const prompt = req.body.prompt;
  const response = await openai.createCompletion({
    model: "text-davinci-003",
  prompt: `${prompt}`,
  temperature: 0,
  max_tokens: 3000,
  top_p: 1,
  frequency_penalty: 0.5,
  presence_penalty: 0,
  });

  res.status(200).send({
    bot: response.data.choices[0].text
  })
} catch (error){
  console.log(error);
  res.status(500).send({error})
}
})

const server = app.listen(5000,hostname, () => console.log('Server is running on port http://localhost:5000'));

process.on('SIGINT', stop);
process.on('SIGTERM', stop);

function stop(){
  server.close();
  process.exit();
}

