const execFile = require('child_process').execFile;
const exec = require('child_process').execSync;
const property = require('../../propertiesReader.js')
const sshpassVersion = property.get_sshpass();


module.exports.sshpassInstall = () => {
  const child = execFile('sshpass', ['-V'], (err, stdout, stderr) => {
    // let isOk = versionCheck("1.06", "1.05");
    // if(isOk)
    // {
    //   return;
    // }
    // else{
    //   지우고
    //   까는 함수 호출
    // }

    if (err) {
      throw err;
    }
    
    try{
      if(stdout.includes(sshpassVersion)==true){
        console.log('이미 sshpass가 설치되어있습니다.');
      }

      else{
        console.log('설치된 sshpass와 버전이 달라 삭제 후 새로 설치합니다.');
        var exec = require('child_process').execSync;
        //기존 JAVA 삭제
        exec("rpm -e sshpass")
        //JAVA 설치
        exec("rpm -ivh sshpass-1.06-2.el7.x86_64.rpm");
      }
    }
    catch(exception){
      console.log('sshpass를 설치합니다.');

      exec("rpm -ivh sshpass-1.06-2.el7.x86_64.rpm");
    }

  });
}
