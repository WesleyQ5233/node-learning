/**
 * Created by Administrator on 2016/8/27.
 */
/*要展示用户输入的内容，需要将postData传递给请求处理程序*/
function route(handle, pathname, response, postData) {
    console.log("About to route a request for" + pathname);
    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, postData);
    } else {
        console.log("No request handler found for" + pathname);
        response.writeHead(404, {'Content-Type':'text/plain'});
        response.write('404 Not Found');
        response.end();
    }
}

exports.route = route;

/*
*首先检查给定的路径对应的请求处理程序是否存在，如果存在就直接调用相应的处理函数
*
* 并且我们可以用从关联数组中获取元素一样的方式从传递的对象中获取请求处理函数，因此
* 就有了简洁流畅的形如 handle[pathname]() 的表达式， 仿佛就像在说“嗨，请帮我处理这个路径”
* */