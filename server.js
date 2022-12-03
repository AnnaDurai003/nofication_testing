import express from 'express'
import fetch from 'node-fetch'
import cors from 'cors'

const app = express()
app.use(cors()) 
// app.get('/',)
app.use((req, res, next) => {
  console.log(req.method + "  " + req.path + " " + res.statusCode);
  // req.cookie("don","welcome",{httpOnly:true,secure:true,sameSite:true})

  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});
app.get("/",(req,res)=>{
   
  let token = req.query.token;
  console.log(token)
 
  let notification = {
    title:"welcome to notification",
    text:" Hello world!!!"
  }
  let notification_body = {
    notification: notification,

    registration_ids: [
      "ey9genvybYpY8Q9JHS2n6e:APA91bFFFBXc8QXKxGB_paUf96jjy2epYSFlnFOUE8Hubqeh7Dig-Qe4JEQH7dUMfu4s7XMxGe3fRT5TG-4Q55iC2iUF6yzaN-N3L7KMhLHqlr4Jbeq0uOyXEfrFMiT5BLlUikIhaoKr",
      "ey9genvybYpY8Q9JHS2n6e:APA91bFFFBXc8QXKxGB_paUf96jjy2epYSFlnFOUE8Hubqeh7Dig-Qe4JEQH7dUMfu4s7XMxGe3fRT5TG-4Q55iC2iUF6yzaN-N3L7KMhLHqlr4Jbeq0uOyXEfrFMiT5BLlUikIhaoKr",

      token,
    ],
  };
  fetch("https://fcm.googleapis.com/fcm/send", {
    method: "POST",
    headers: {
      Authorization:
        "key=" +
        "AAAA7DepHqs:APA91bESTvdxZussK-VYi7ZxIrEHqqgtSficcDVjcdL1yDYQJURmcaUFkrw4KtuzeXIDbKjDE9Uo-_75pC_EsGC91IOgXNvM4JQ1BLEfloz1IvRYROhq_SsMRH4w9qVWmB-LVhRm6QIC",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(notification_body),
  })
    .then((data) => {
      res
        .status(200)
        .json({
          success: true,
          message: "successfully send notification",
          data: data,
        });
    })
    .catch((err) => {
      res.status(500).json({ success: false, message: JSON.stringify(err) });
    });
   
})
app.listen(5000,()=>{
  console.log("your server running port http://localhost:5000")
})