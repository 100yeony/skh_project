#!/usr/bin/env node

const program = require('commander');
const execFile = require('child_process').execFile;
const exec = require('child_process').execSync;
const property = require('../../propertiesReader.js')
const cmds = require('../lib/cmds.js')


let ip;
let installDir;
let password     = property.get_password();
let rpmDirOrigin = property.get_rpm_dir_origin(); //프로젝트 폴더 rpm
let rpmDir       = property.get_rpm_dir(); //root/rpm
let package;
let stdout;


program
  .command('install')
  .option('-p, --package <pkg>')
  .option('-d, --database <dbname>')
  .option('-s, --server', `install into server, only can use to -p option`)
  .option('-n, --node', `install into node, only can use to -p option`)
  .action(function Action(opt){
    if(opt.server == true){
      ip = [property.get_serverIP()]
      installDir = property.get_server_install_dir(); //root/
    }else if(opt.node == true){
      ip = property.get_nodeIP().split(',');
      installDir = property.get_node_install_dir(); //root/
    }

    ip.forEach((i) => {
      console.log('-----------------------------------\n[info] IP address is', i);
        try{
          exec(`rpm -qa|grep sshpass`)
        }
        catch{
          //sshpass가 없을때 (최초 설치)
          exec(`${cmds.installCmd} ${rpmDirOrigin}${cmds.sshpassFile}`)
          console.log('[info] install sshpass to server Complete!');
        }
        if(opt.package == 'maven'){
          exec(`sshpass -p ${password} scp -r ${rpmDirOrigin}/${opt.package} root@${i}:${installDir}`)
          //maven home 잡아주기
          return 0;
        }else{
          exec(`sshpass -p ${password} scp -r ${rpmDirOrigin}/${opt.package} root@${i}:${installDir}`)
          console.log('[info] Sending rpm file to',i,'complete! Ready to install other package.');
          isInstalledPkg(i, opt, rpmDir);
        }
      })
    })

program.parse(process.argv)



function isInstalledPkg(i, opt, rpmDir){
  switch(opt.package){
    case 'git' :
      package = cmds.git;
      break;
    case 'java' :
      package = cmds.java;
      break;
    case 'sshpass' :
      package = cmds.sshpass;
      break;
    case 'python' :
      package = cmds.python;
      break;
    case 'maven' :
      package = cmds.maven;
      break;
    default :
      console.log('[ERROR]', opt.package,'is cannot be installed. Try again other package.');
      exec(`exit`)
      return 0;
  }
  try{
    stdout = exec(`sshpass -p ${password} ssh root@${i} "rpm -qa|grep ${package}"`)
    if(stdout!=null && opt.package != 'sshpass'){
      //sshpass가 이미 있는데 설치하라는 명령어가 들어오면 여기 지나가지 않음. 메인액션에서 끝남
      console.log('[info]',opt.package, 'is already installed.', '\n[info] Check the version is matching or not');
      versionCheck(i, opt, rpmDir);
    }
  }
  catch{
    //에러가 있으면 설치되지 않은 것. 명령어가 안먹음
    console.log('[info]',opt.package, 'is not installed');
    console.log('[info] Install', opt.package);
    installPackage(i, opt, rpmDir);
  }
}




function versionCheck(i, opt, rpmDir){
  console.log('[info] Start version check');
    switch(opt.package){
      case 'git' :
        var version = property.get_gitVersion()
        break;
      case 'maven' :
        var version = property.get_mavenVersion()
        break;
      case 'python' :
        var version = property.get_pythonVersion()
        break;
      case 'sshpass' :
        var version = property.get_sshpassVersion()
        break;
      case 'java' :
        var version = property.get_javaVersion()
        break;
    }
    stdout = exec(`sshpass -p ${password} ssh root@${i} "rpm -qa|grep ${package}"`).toString();
    if(stdout.includes(version)==true){
      console.log('[info] Version is matched. Exit.');
      exec(`exit`)
    }else if(stdout.includes(version)==false){
      console.log('[info] Version is not matched. Delete', opt.package);
      deletePackage(i, opt);
      console.log('[info] Install new version of', opt.package);
      installPackage(i, opt, rpmDir);
    }
  }



  function installPackage(i, opt, rpmDir){
     exec(`sshpass -p ${password} ssh root@${i} ${cmds.installCmd} ${rpmDir}${opt.package}/*`)
     console.log('[info]', opt.package, 'Installation complete!');
     exec(`rm -rf rpm`)
     console.log('rpm 폴더 삭제');
     exec(`exit`)
   }



 function deletePackage(i, opt){
   switch(opt.package){
     case 'java' :
       package = cmds.java
       break;
     case 'python' :
       package = cmds.python
       break;
     case 'git' :
       package = cmds.git
       break;
     case 'maven' :
       package = cmds.maven
       break;
     case 'sshpass' :
       package = cmds.sshpass
       break;
     }
    if(opt.package == 'java'||'maven'){
      exec(`sshpass -p ${password} ssh root@${i} ${cmds.yumDeleteCmd} ${package}*`)
    }else{
      exec(`sshpass -p ${password} ssh root@${i} ${cmds.deleteCmd} ${package}`)
    }
    console.log('[info]', opt.package, 'Deletion complete!');
    exec(`exit`)
  }
