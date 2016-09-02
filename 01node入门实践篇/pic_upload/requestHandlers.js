/**
 * Created by Administrator on 2016/8/27.
 */
    /*然后，在此将数据包含在对upload请求的响应中*/
//var exec = require('child_process').exec;
var querystring = require('querystring');
var    fs = require('fs');
var    formidable = require('formidable');


function start(response) {//路由处理函数接受response参数，为了对请求作出直接的响应
    console.log('Request handler "start" was called.');
    /*  exec("ls -lah", function(error, stdout, stderr){
        response.writeHead(200, {"Content-Type":"text/plain"});
        response.write(stdout);
        response.end();
    });*/
/*    exec("find/",
        {timeout:10000, maxBuffer:20000*1024},
        function(error, stdout, stderr){
            response.writeHead(200, {"Content-Type":"text/plain"});
            response.write(stdout);
            response.end();
    });*/
  /*  var html = '<html><head><meta http-equiv="CONTENT-TYPE" content="text/html"charset="utf-8" /> </head>'
             +'<body><form action="/upload" method="post">'
             +'<textarea name="text" rows="20" cols="60"></textarea> '
             +'<input type="submit" value="Submit text" /></form></body></html> ';*/
    var html = '<html><head><meta http-equiv="CONTENT-TYPE" content="text/html"charset="utf-8" /> </head>'
        +'<body><form action="/upload" method="post" entype="multipart/form-data">'
        +'<input type="file" name="upload"> '
        +'<input type="submit" value="Upload file" /></form></body></html> ';
    response.writeHead(200, {"Content-Type":"text/html"});
    response.write(html);
    response.end();
}

function upload(response, request) {
    console.log('Request handler "upload" was called');

    var form = new formidable.IncomingForm();
    form.uploadDir = 'tmp';
    console.log("about to parse");
    form.parse(request, function(error, fields, files) {
        console.log(files.upload.path);
        try{
            fs.renameSync(files.upload.path, "tmp/test.jpg");
        }catch(e){
            console.log(e);
        }
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");
        response.end();
    });
}
/*
 好了现在我们可以接受post数据并在请求处理程序中处理该数据了，但是现在我们是把请求的整体消息体传递给了请求路由和请求处理程序
 我们感兴趣的是text字段
*/
//图片上传
function show(response) {//我们还需要将这新的处理程序，添加到index.js中的路由隐身表中：
    console.log("Request handler 'show' was called");
    fs.readFile("/tmp/test.png", "binary", function(error, file){
        if (error){
            response.writeHead(500, {"Content-Type":"text/plain"});
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {"Content-Type":"image/png"});
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;

