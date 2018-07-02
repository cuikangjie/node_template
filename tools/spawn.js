const spawn = require('child_process').spawn;
const signale = require('signale');

module.exports = function(shell, ...args) {

  return new Promise((resolve, reject) => {
    let free = spawn(shell, args);

    free.stdout.on('data', function(data) {
      signale.success( data)
    });

    free.stderr.on('data', function(data) {
      let str = ''+data;
      signale.info(str)
    });

    // 注册子进程关闭事件
    free.on('exit', function(code, signal) {
      signale.success('child process eixt ,exit:', code)
      // 执行完成
      resolve();
    });
  })
}
