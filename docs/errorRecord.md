1. 数据库相关
error: django.db.utils.OperationalError: (1050, "Table '表名' already exists）
resolve: python manage.py migrate myapp --fake

2. vue前端问题
安装node-sass失败，可设置
set SASS_BINARY_PATH=D:\Develop\package\win32-x64-64_binding.node

3. 浏览器支持问题
error: requires a Promise polyfill in this browser
reason: IE9和一些低版本的高级浏览器对ES6新语法并不支持
resolve: npm install --save-dev babel-polyfill@6.26.0

4. 水平垂直居中
* 参考: https://www.cnblogs.com/Julia-Yuan/p/6648816.html
div{
    width:200px;
    height: 200px;
    background:green;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-100px;
    margin-top:-100px;
}

5. 背景
    background-image: url("../assets/image/background_blue_computer.jpg");
