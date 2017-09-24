var boardcastServer = require('./server')
var boardcastClient = require('./client')
boardcastServer.addGoal('test',function(addr, data){
  console.log(addr+JSON.stringify(data));
})

boardcastClient.setMessage(JSON.stringify({
  goal: 'test',
  data: {
    abc: 't111',
    aaa: 'afdsa',
  }
}))
setTimeout(function(){
  boardcastClient.send()
},2000);
setTimeout(function(){
  boardcastClient.send()
},4000);
