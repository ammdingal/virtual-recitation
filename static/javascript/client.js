$(document).ready(function(){
    const socket = io();
    socket.emit('new_user');
    
    socket.on('all_messages', function(messages){
        for (let i = 0; i < messages.length; i++){
            let element = document.createElement('p');
            element.innerHTML = messages[i];
            $('#box').append(element);
        }
    });  
    
    document.querySelector('button').addEventListener('click', function(){
        socket.emit('raiseHand');
    });

    socket.on('user_joined', userStatus);
    socket.on('user_left', userStatus);
    socket.on('raiseHand', userStatus);

    function userStatus(message){
        let element = $('<p>').html(message);
        $('#box').append(element);
    }
});
