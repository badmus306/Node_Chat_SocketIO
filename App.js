const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname));

let messages = [
                    {name: "John", message: "Dude Fucked!!!"},
                    {name: "Doe", message: "Lady is Dead!!!" }
                ];
                
app.get('/messages',(req, res)=>{
    res.send(messages);
});

app.post('/messages', (req, res)=>{
    messages.push(req.body);
    io.emit('messages', req.body)
    res.sendStatus(200);
});

io.on('connection', (socket)=>{
    console.log('user connected');
});
var server = http.listen(3030, ()=>{
    console.log("Server is listening on port", server.address().port);
})
// app.listen(3030, (err, data)=>{
//     if(!err){
//         console.log("Connected Succesfully");
//       // res.send('index.html');
//     }else{
//         console.log("Error trying to Connect");
//     }
// });