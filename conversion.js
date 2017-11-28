var fs=require('fs')

//filePath='Rubric.txt';
function readremarksfile(filePath,cb)
{
  fs.readFile(filePath,'utf-8',function(err,data)
  {
  if(err)
  {
    cb(err);
  }
  else
  {  data2=data.toString().split(/\r?\n/);
      var array=data2;
      cb(0,array);
    }
});}

//readremarksfile("./Rubric.txt",function(err,data)
//{
  //if(err)
  //{
    //console.log(err);
  //}
  //else{
    //console.log(data);
  //}
//});
