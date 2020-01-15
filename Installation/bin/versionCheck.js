const execFile = require('child_process').execFile;
const exec = require('child_process').execSync;
var haveArg = true;  //false: 설치안됨, true: 설치됨



 async function versionCheck(arg){
  const child = execFile(arg, (err, stdout, stderr) => {
    if(Object.keys(err).includes('errno')==true){
      console.log('존재 유무 : 설치되지 않았습니다.');
      console.log('설치 시작');
      // return new Promise(function(resolve, reject){
      //   setTimeout(function(){
      //     resolve(false)
      //   }, 1000)
      // })
      // await haveArgIsFalse(haveArg);
      // console.log('Now : ', haveArg);
      
    }
    else if(typeof stderr == 'string'){

      //설치안됨 : stderr에 아무것도 안담김
      //설치됨 : typeof stderr == string

      // console.log(typeof stderr);
      // console.log(stdout);
      // console.log('stdout');
      // console.log(stderr);
      // console.log('haveArg 좀 바뀌어라');
      // const haveArg = true;

      console.log('존재 유무 : 이미 존재하는 패키지입니다.');
      console.log('실행 종료');

      // haveArgIsTrue(haveArg);
      // console.log('Now : ', haveArg);

      return 0;
    }
  })
}

function haveArgIsFalse(haveArg){
  // const haveArg = true;
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(false)
    }, 1000)
  })
}

function haveArgIsTrue(haveArg){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve(true)
    }, 1000)
  })
}

// function haveArgIsTrue(haveArg){
//   return Promise.resolve(true);
// }
//
// function haveArgIsFalse(haveArg){
//   return Promise.resolve(false);
// }

//
// function haveArgIsFalse(){
//   return new Promise(function(resolve, reject){
//     setTimeout(function(){
//       resolve(false)
//     }, 1000)
//   })
// }


module.exports = {
  haveArg,
  versionCheck,

  haveArgIsTrue,
  haveArgIsFalse
}
