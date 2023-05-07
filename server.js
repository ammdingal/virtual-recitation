let express = require('express');
let app = express();
let server = app.listen(8000);
let io = require('socket.io')(server);

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index');
})

const messages = [];

io.on('connection', function (socket) {
    socket.emit('all_messages', messages);
    socket.on('new_user', function(){
        const message = 'Socket ID <strong>' + socket.id + '</strong> is present.';
        messages.push(message);
        io.emit('user_joined', message); 

        socket.on('disconnect', function() {
            const leaveMessage = 'Socket ID <strong>' + socket.id + '</strong> left.';
            messages.push(leaveMessage);
            socket.broadcast.emit('user_left', leaveMessage);
        });
    })
    
    socket.on("raiseHand", function(){
        const raiseMessage = 'Socket ID <strong>' + socket.id + '</strong> raised hand.';
        messages.push(raiseMessage);
        io.emit('raiseHand', raiseMessage);
    })
});