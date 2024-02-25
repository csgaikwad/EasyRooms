import  express from "express";
import bodyParser from "body-parser";

const app= express();
const port=8000;

app.get("/",(req,res)=>{
    res.send("Hello");
}
);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });