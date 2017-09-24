/**
* UDP 广播客户端
*/
var dgram = require("dgram");

function BoardcastClient(){
  this.socket = null;
  this.message = "";

  this.setMessage = function(msg){
    this.message = msg
    return this
  }

  this.send = function(){
    if(typeof this.message != 'string'){
      console.log('boardcast client send error content: '+ this.message + ', only string valid')
      return
    }
    var socket = dgram.createSocket('udp4')
    socket.bind(function () {
      socket.setBroadcast(true)
    });
    var message = new Buffer(this.message)
    socket.send(message, 0, message.length, 10301, '255.255.255.255', function(err, bytes) {
      if(err){
        console.error(err)
      }
      socket.close()
    });
  }
}

module.exports = new BoardcastClient()
