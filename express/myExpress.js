// 自己实现express的部分功能
let http = require("http");
let url = require("url");
let methods = require("methods"); // 第三方模块
function application() {
    // /student/1001/zs  /student/([^/]*)/(([^/]*))
    let app = (req,res)=>{
        let {pathname} = url.parse(req.url); //pathname真实请求路径
        let reqMethod = req.method.toLowerCase();// //reqMethod真实请求方法
        console.log(pathname,reqMethod);
        for(let i=0; i<app.routes.length; i++) {
            let layer = app.routes[i];
            let {path,method,handler}  = layer;
            if(path.params) {
                // 获取参数
                let [,...lists] = pathname.match(path);// lists ['1001','zs']
                req.params = path.params.reduce(function(prev,next,index) {
                    prev[next] = lists[index];
                    return prev;
                },{});
                console.log(req.params);
                return handler(req,res);
            }
            if((path === pathname || path === "*")  && (method === reqMethod || method === "all")) {
                return handler(req,res);
            }
        }
        res.setHeader("Content-Type","text/html;charset=utf8");
        // Cannot GET /hello123
        res.end(`Cannot GET ${pathname}`);
    }
    app.routes = [];
    methods.push("all");
    methods.forEach((method)=>{
        // [{},{},{path:"*",method:"get",handler:fun...}]
        app[method] = function(path,handler) {
            // 动态路由 /student/:id/:name     
            let params = [];
            if(path.includes(":")) {
                path = path.replace(/:([^/]*)/g,function() {
                    params.push(arguments[1]);
                    return '([^/]*)';
                });
                path = new RegExp(path);
                path.params = params; // ["id","name"]
            }
            let layer = {
                path,
                method,
                handler
            }
            this.routes.push(layer);
        }
    });   
    app.listen = function(port,handler) {
        // 底层还是原生node代码
        http.createServer(
            (req,res)=>{// 一旦有请求 会执行此处
                app(req,res);
            }
        ).listen(port,handler);
    }

    return app;
}

module.exports = application;