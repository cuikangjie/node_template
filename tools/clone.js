
const spawn = require('./spawn')
const signale = require('signale')
const path = require('path')
const fs = require('fs');
const {cleanFile} = require('kin-toolkits').tools;
const git = 'git', clone = 'clone';
const lib = path.resolve(__dirname, '../lib');

let url = '';

try {
   url = process.argv[2].match(/url=(\S*)/)[1];
} catch (e) {
  signale.error(e)
}


if(!url){
  signale.error('url 不能为空！');

}else if(!/^https:\/\//.test(url)){
  signale.error('请配置 https开头的url！');
  process.exit();
}else{
  let projectName = url.match(/(.+)\/(\S*).git/)[2];

  let proPath = lib + '/' + projectName;

  let isExist = fs.existsSync(proPath) //判断文件是否存在
  if(!isExist){
    signale.info('start clone '+ url + '\n');

    spawn(git, clone, url, proPath).then(()=>{
      signale.success('clone success !')
      // 删除.git
      cleanFile(proPath + '/.git').then(()=>{
        signale.success('clean .git success!')
      }).catch((err)=>{
        signale.error('clean .git error \n' + err)
      })

    })
  }else {
    signale.info(`${projectName} is  exist !`)
  }

}
