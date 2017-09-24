Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

function getDate(extra){
 return new Date().Format('yyyy-MM-dd hh:mm:ss') + extra;
}

console.oldlog = console.log;
console.oldtrace = console.trace;
console.olddebug = console.debug;
console.oldinfo = console.info;
console.oldwarn = console.warn;
console.olderror = console.error;


function log(){
 process.stdout.write(getDate(' [log]: '));
 console.oldlog.apply(console, arguments);
}

function trace(){
 process.stdout.write(getDate(' [trace]: '));
 console.oldtrace.apply(console, arguments);
}

function info(){
 process.stdout.write(getDate(' [info]: '));
 console.oldinfo.apply(console, arguments);
}

function warn(){
 process.stdout.write(getDate(' [warn]: '));
 console.oldwarn.apply(console, arguments);
}

function error(){
 process.stderr.write(getDate(' [error]: '));
 console.olderror.apply(console, arguments);
}

function debug(){
 process.stdout.write(getDate(' [debug]: '));
 console.olddebug.apply(console, arguments);
}

console.log = log;
console.debug = debug;
console.trace = trace;
console.info = info;
console.warn = warn;
console.error = error;

global.log = log;
global.debug = debug;
global.trace = trace;
global.info = info;
global.warn = warn;
global.error = error;

module.exports = global;
