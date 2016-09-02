/**
 * Created by Administrator on 2016/8/27.
 */
var http = require('http');
var url = require('url');
/*var router = require('router')*/

function start(route, handle) {//在start（）函数里添加了handle参数
    function onRequest(request, response) {
        //var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log('Request for' + pathname + 'has received');
        route(handle, pathname, response, request);//转而采取将request对象传递给请求路由的方式

     /*   request.setEncoding('utf8');

        request.addListener("data", function(postDataChunk){
            postData += postDataChunk;
            console.log("Received POST data chunk" + postDataChunk + ".");
        });
        request.addListener('end', function(){
            route(handle, pathname, response, postData);
        });*/
        /*最后我们将请求路由的调用移到end事件处理程序中，以确保它只会当所有数据接收完毕后才触发，并且只触发一次
        同时，还把post数据传递给请求路由，因为这些数据，请求处理程序会用到
        * 每个数据块到达的时候输出了日志，这对于最终生产环境来说是很不好的（触发多次）
        * */

        // route(handle, pathname, response);//并把handle对象最为第一个参数传递给了route()回调函数

    }

    http.createServer(onRequest).listen(8888);
    console.log('Server has started.');
}

exports.start = start;