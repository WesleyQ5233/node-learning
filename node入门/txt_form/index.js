/**
 * Created by Administrator on 2016/8/27.
 */
var server = require('./server');
var router = require('./router');
var requestHandlers = require('./requestHandlers');

//现在我们已经确定将一系列请求处理程序通过一个对象来传递，并且需要使用松耦合的方式将这个对象注入到route（）函数中

var handle = {};//handle是一些请求处理程序的集合，以动词命名让我们在路由中使用更流畅的表达式
handle['/'] = requestHandlers.start;
handle['/start'] = requestHandlers.start;
handle['/upload'] = requestHandlers.upload;
/*handle['/goodsDetail'] = requestHandlers.goodsDetail;
handle['/cart'] = requestHandlers.cart;*/

//start server
server.start(router.route, handle);



