var inquirer = require('inquirer');
var fs = require('fs');
const program = require('commander');
const property = require('../../propertiesReader.js')
const installDir = property.get_server_install_dir()
const fileDir1 = property.get_server_file1_dir()
const fileDir2 = property.get_server_file2_dir()

var dir1 = installDir+fileDir1;
var dir2 = installDir+fileDir2;
const PropertiesReader = require('properties-reader');

var fileproperties ='';

program
  .command('generate-wl')


program.parse(process.argv)
//파일 변경 옵션 선택
var qu1 = [
  {
    type : 'list',
    name : 'filetype',
    message : 'Please select the file type you want to check.',
    choices : ['YCSB','Graph']
  }
]
var qu2 = [
  {
    type : 'list',
    name : 'choice',
    message : 'What would you like to change?',
    choices : ['FileName','FileContents']
  },{
    type : 'list',
    name : 'original_name',
    message : 'Please select a file to change.',
    choices : []
  }
];
var qu3 = [
  {
    type : 'list',
    name : 'choice',
    message : 'What would you like to change?',
    choices : ['FileName','FileContents']
  },{
    type : 'list',
    name : 'original_name',
    message : 'Please select a file to change.',
    choices : []
  }
];

const filelist1 = fs.readdirSync(dir1);
const filelist2 = fs.readdirSync(dir2);
qu2[1].choices = filelist1;
qu3[1].choices = filelist2;
//변경할 파일의 새로운 이름 입력

var rename = [
  {
    type : 'input',
    name : 'new_name',
    message : 'Please enter a new name.'
  }
];

//YCSB 속성 입력
var q1 = [
  {
    type : 'input',
    name : 'Record_count',
    message : 'YCSB properties-Record count',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter : Number,
    default : ''
    }
  ,{
    type : 'input',
    name : 'Field_count',
    message : 'YCSB properties-Field count',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default : '',
  },{
    type : 'input',
    name : 'fieldlength',
    message : 'YCSB properties-Field length',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default : '',
  },{
    type : 'input',
    name : 'minfieldlength',
    message : 'YCSB properties-minfieldlength',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default : '',
  },{
    type : 'list',
    name : 'readallfields',
    message : 'YCSB properties-readallfields',
    choices : ['true','false'],
    default : '',
  },{
    type : 'list',
    name : 'writeallfields',
    message : 'YCSB properties-writeallfields',
    choices : ['true','false'],
    default : '',
  },{
    type : 'input',
    name : 'readproportion',
    message : 'YCSB properties-readproportion',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default :'' ,
  },{
    type : 'input',
    name : 'updateproportion',
    message : 'YCSB properties-updateproportion',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default :'',
  },{
    type : 'input',
    name : 'insertproportion',
    message : 'YCSB properties-insertproportion',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default : '',
  },{
    type : 'input',
    name : 'scanproportion',
    message : 'YCSB properties-scanproportion',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default : '',
  },{
    type : 'input',
    name : 'readmodifywriteproportion',
    message : 'YCSB properties-readmodifywriteproportion',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default : '',
  },{
    type : 'list',
    name : 'requestdistribution',
    message : 'YCSB properties-requestdistribution',
    choices : ['uniform','zipfian','hotspot','sequential','exponential','latest'],
    default :''
  },{
    type : 'input',
    name : 'minscanlength',
    message : 'YCSB properties-minscanlength',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default :''
  },
  {
    type : 'input',
    name : 'maxscanlength',
    message : 'YCSB properties-maxscanlength',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default :''
  },{
    type : 'list',
    name : 'scanlengthdistribution',
    message : 'YCSB properties-scanlengthdistribution',
    choices : ['uniform','zipfian','hotspot','sequential','exponential','latest'],
    default :''
  },{
    type : 'input',
    name : 'insertstart',
    message : 'YCSB properties-insertstart',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default :''
  }];
var q2 =[
    {
    type : 'input',
    name : 'insertcount',
    message : 'YCSB properties-insertcount',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      if(value === 'Record_count value'){
        return true;
      } else{
        return valid || 'Please enter a number';
      }
    },
    default : 'Record_count value'
  },{
    type : 'input',
    name : 'zeropadding',
    message : 'YCSB properties-zeropadding',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    filter: Number,
    default :''
  },{
    type : 'list',
    name : 'insertorder',
    message : 'YCSB properties-insertorder',
    choices : ['ordered','hashed'],
  },{
    type : 'input',
    name : 'fieldnameprefix',
    message : 'YCSB properties-fieldnameprefix',
    default :''
  },{
    type : 'checkbox',
    name : 'hdrhistogram_percentiles',
    message : 'hdrhistogram - percentiles',
    choices : [
      {
        name : 95,
        filter : Number,
        checked : true
      },{
        name : 99,
        filter : Number,
        checked : true
      },{
        name : 99.99,
        filter : Number
      },{
        name : 99.999,
        filter : Number
      },{
        name : 99.9999,
        filter : Number
      }
    ]
  },{
    type : 'list',
    name : 'hdrhistogram_fileoutput',
    message : 'hdrhistogram.fileoutput',
    choices : ['true','false'],
  },{
    type : 'input',
    name : 'histogram',
    message : 'histogram.buckets',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default :''
  },{
    type : 'input',
    name : 'timeseries',
    message : 'timeseries.granularity',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default :''
  }
];
// Graph benchmark 속성 입력
var q3 = [
  {
    type : 'input',
    name : 'Create_vertex',
    message : 'Create_vertex properties',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Update_vertex',
    message : 'Update_vertex properties',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Delete_vertex',
    message : 'Delete_vertex properties',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Create_edge',
    message : 'Create_edge properties',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Update_edge',
    message : 'Update_edge properties',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Delete_edge',
    message : 'Delete_edge properties',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'SSSP',
    message : 'SSSP',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Hard_Path',
    message : 'Hard_Path',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Aggregation',
    message : 'Aggregation',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  },
  {
    type : 'input',
    name : 'Neighbor2',
    message : 'Neighbor2',
    validate: function(value) {
      var valid = !isNaN(parseFloat(value));
      return valid || 'Please enter a number';
    },
    default : ''
  }
];

//실행
async function main2(){
  const answers = await inquirer.prompt(qu1);
  if(answers.filetype === 'YCSB'){
    console.log(answers);
    const answer = await inquirer.prompt(qu2);
      var fileproperties = PropertiesReader(dir1+answer.original_name);
      q1[0].default = fileproperties.path().Recordcount;
      q1[1].default = fileproperties._properties.Fieldcount;
      q1[2].default = fileproperties._properties.fieldlength;
      q1[3].default = fileproperties._properties.minfieldlength;
      q1[4].default = fileproperties._properties.readallfields;
      q1[5].default = fileproperties._properties.writeallfields;
      q1[6].default = fileproperties._properties.readproportion;
      q1[7].default = fileproperties._properties.updateproportion;
      q1[8].default = fileproperties._properties.insertproportion;
      q1[9].default = fileproperties._properties.scanproportion;
      q1[10].default = fileproperties._properties.readmodifywriteproportion;
      q1[11].default = fileproperties._properties.requestdistribution;
      q1[12].default = fileproperties._properties.minscanlength;
      q1[13].default = fileproperties._properties.maxscanlength;
      q1[14].default = fileproperties._properties.scanlengthdistribution;
      q1[15].default = fileproperties._properties.insertstart;
      q2[1].default = fileproperties._properties.zeropadding;
      q2[2].default = fileproperties._properties.insertorder;
      q2[3].default = fileproperties._properties.fieldnameprefix;
      q2[4].default = fileproperties._properties.hdrhistogram_percentiles;
      q2[5].default = fileproperties._properties.hdrhistogram_fileoutput;
      q2[6].default = fileproperties._properties.histogram;
      q2[7].default = fileproperties._properties.timeseries_granularity;
    if(answer.choice === 'FileName'){
      var fsExists = fs.existsSync(dir1+answer.original_name);
      if(fsExists){
        inquirer.prompt(rename).then(answer1 => {
          if(answer1){
            for(i=0;i<filelist1.length;i++){
                if(answer1.new_name == filelist1[i]){
                  console.log('The same name exists.');
                  return false;
                }
            }
            fs.rename(dir1+answer.original_name,dir1+answer1.new_name,(err) => {
              if(err) console.log(err);
              console.log('The name has been changed.');
            });
          }
          else {
            console.log('The file name does not exist.');
          }
        });
      }
    } else {
        inquirer.prompt(q1).then(answer2_1 => {
          q2[0].default = answer2_1.Record_count;
          inquirer.prompt(q2).then(answer2_1_1 => {
            if(answer2_1){
              var aa = ['type = '+answer2.type+'\n'+
              'Recordcount = '+answer2_1.Record_count+'\n'+
              'Fieldcount = '+answer2_1.Field_count+'\n'+
              'fieldlength = '+answer2_1.fieldlength+'\n'+
              'minfieldlength = '+answer2_1.minfieldlength+'\n'+
              'readallfields = '+answer2_1.readallfields+'\n'+
              'writeallfields = '+answer2_1.writeallfields+'\n'+
              'readproportion = '+answer2_1.readproportion+'\n'+
              'updateproportion = '+answer2_1.updateproportion+'\n'+
              'insertproportion = '+answer2_1.insertproportion+'\n'+
              'scanproportion = '+answer2_1.scanproportion+'\n'+
              'readmodifywriteproportion = '+answer2_1.readmodifywriteproportion+'\n'+
              'requestdistribution = '+answer2_1.requestdistribution+'\n'+
              'minscanlength = '+answer2_1.minscanlength+'\n'+
              'maxscanlength = '+answer2_1.maxscanlength+'\n'+
              'scanlengthdistribution = '+answer2_1.scanlengthdistribution+'\n'+
              'insertstart = '+answer2_1.insertstart+'\n'+
              'insertcount = '+answer2_1_1.insertcount+'\n'+
              'zeropadding = '+answer2_1_1.zeropadding+'\n'+
              'insertorder = '+answer2_1_1.insertorder+'\n'+
              'fieldnameprefix = '+answer2_1_1.fieldnameprefix+'\n'+
              'hdrhistogram_percentiles = '+answer2_1_1.hdrhistogram_percentiles+'\n'+
              'hdrhistogram_fileoutput = '+answer2_1_1.hdrhistogram_fileoutput+'\n'+
              'histogram = '+answer2_1_1.histogram+'\n'+
              'timeseries_granularity = '+answer2_1_1.timeseries+'\n'
            ];
              fs.readFile(dir+answer.original_name,'utf8',function(err,data){
                if(err) throw err;
                fs.writeFile(dir+answer.original_name,aa,function(err,data){
                  if(err) throw err;
                  console.log('The file has been modified successfully.');
                });
              });
            }
          });
        });
      };
    }else{
      const answer = await inquirer.prompt(qu3);
      var fileproperties = PropertiesReader(dir2+answer.original_name);
      q3[0].default = fileproperties._properties.Create_vertex;
      q3[1].default = fileproperties._properties.Update_vertex ;
      q3[2].default = fileproperties._properties.Delete_vertex ;
      q3[3].default = fileproperties._properties.Create_edge ;
      q3[4].default = fileproperties._properties.Update_edge ;
      q3[5].default = fileproperties._properties.Delete_edge ;
      q3[6].default = fileproperties._properties.SSSP ;
      q3[7].default = fileproperties._properties.Hard_Path ;
      q3[8].default = fileproperties._properties.Aggregation ;
      q3[9].default = fileproperties._properties.Neighbor2 ;
      if(answer.choice === 'FileName'){
        var fsExists = fs.existsSync(dir2+answer.original_name);
        if(fsExists){
          inquirer.prompt(rename).then(answer1 => {
            if(answer1){
              for(i=0;i<filelist2.length;i++){
                  if(answer1.new_name == filelist2[i]){
                    console.log('The same name exists.');
                    return false;
                  }
              }
              fs.rename(dir2+answer.original_name,dir2+answer1.new_name,(err) => {
                if(err) console.log(err);
                console.log('The name has been changed.');
              });
            }
            else {
              console.log('The file name does not exist.');
            }
          });
        }
      } else {
        inquirer.prompt(q3).then(answer2_2 => {
          if(answer2_2){
            var bb = ["type ="+answers.type+'\n'+
            "File name ="+answers.name+'\n'+
            "Create_vertex ="+answer2_2.Create_vertex+'\n'+
            "Update_vertex ="+answer2_2.Update_vertex+'\n'+
            "Delete_vertex ="+answer2_2.Delete_vertex+'\n'+
            "Create_edge ="+answer2_2.Create_edge+'\n'+
            "Update_edge ="+answer2_2.Update_edge+'\n'+
            "Delete_edge ="+answer2_2.Delete_edge+'\n'+
            "SSSP ="+answer2_2.SSSP+'\n'+
            "Hard_Path ="+answer2_2.Hard_Path+'\n'+
            "Aggregation ="+answer2_2.Aggregation+'\n'+
            "Neighbor2 ="+answer2_2.Neighbor2
          ];
          fs.readFile(dir2+answer.original_name,'utf8',function(err,data){
            if(err) throw err;
            fs.writeFile(dir2+answer.original_name,bb,function(err,data){
              if(err) throw err;
              console.log('The file has been modified successfully.');
            });
          });
        }
      });
    }
  }
}
module.exports.main2 = main2;
