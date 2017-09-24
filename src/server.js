/**
 * UDP广播服务端
 */
var dgram = require('dgram')
var server = dgram.createSocket("udp4")
require('./log4js')

function BoardcastServer() {
  this.serverPort = 10301;
  this.goals = {};
  this._init = function(goals) {
    server.on("message", function(msg, rinfo) {
      var address = rinfo.address;
      try {
        var msg = eval('(' + msg + ')')
        var goal = msg['goal']
        var data = msg['data']
        if (goals[goal]) {
          goals[goal](address, data) // 目标分发
        }
      } catch (e) {
        console.error('boardcast recived error msg: ' + msg + ', ' + e.message);
      }
    })
    server.on("listening", function() {
      var address = server.address()
      console.log("boardcast server listening " +
        address.address + ":" + address.port);
    })
    server.on("error", function(err) {
      console.error('boardcast server error: ' + err.message)
    })
    server.bind(this.serverPort)
  }

  this.addGoal = function(goal, func) {
    if (this.goals[goal]) {
      console.log('boardcast goal regist failed, exist goal: ' + goal)
    }
    this.goals[goal] = func
  }

  this._run = function() {
    this._init(this.goals)
  }
}
var _server = null
module.exports = (function() {
  if (_server === null) {
    _server = new BoardcastServer()
    _server._run()
  }
  return _server;
})();
