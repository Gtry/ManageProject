# README.md

## 1. Develop Environment Prepare(Windows)
* 查看python安装的包: python3 -m pip list
* 查看npm安装的包: npm list -g --depth 0

### 1.1 Install Backend Rely
1. Install Python
```
python --version: 3.7.1
```
2. Install pip(任意方式)
```
1)wget https://files.pythonhosted.org/packages/c2/d7/90f34cb0d83a6c5631cf71dfe64cc1054598c843a92b400e55675cc2ac37/pip-18.1-py2.py3-none-any.whl
python -m pip install pip-18.1-py2.py3-none-any.whl
2)curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
```
3. Install Django
* 在线:pip install django==2.0.9
* 离线:(https://www.djangoproject.com/download/)
```
1)wget https://files.pythonhosted.org/packages/f8/0e/2365ddc010afb3d79147f1dd544e5ee24bf4ece58ab99b16fbb465ce6dc0/pytz-2018.7-py2.py3-none-any.whl
pip install pytz-2018.7-py2.py3-none-any.whl
2)wget https://www.djangoproject.com/download/2.0.9/tarball/
cd Django-2.0.9
python setup.py install
```

4. Install coresheads(在Django层注入header解决跨域问题)
* 在线:pip install django-cors-headers
* 离线:
```
wget https://files.pythonhosted.org/packages/cc/7e/83ba784ad2b95317bbbed915f0888d7d1cd8dc3d2e4b8ddec8fbc4c3e800/django_cors_headers-2.4.0-py2.py3-none-any.whl
pip install django_cors_headers-2.4.0-py2.py3-none-any.whl
```

5. Install restframework(会话认证系统使用)
* 离线: pip install djangorestframework-3.7.7-py2.py3-none-any.whl
* 在线: python3 -m pip install djangorestframework

### 1.2 Install Frontend Rely
```
1. Install node and npm
2. Install vue
3. download webpack template to project directory
wget https://github.com/vuejs-templates/webpack/archive/1.3.1.zip
```

### 1.3 Install Database
1. Install MySQL Server
```
download packages: https://dev.mysql.com/downloads/mysql/5.7.html#downloads
wget https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-5.7.24.0.msi

配置环境变量：
在Path中添加: C:\Program Files\MySQL\MySQL Server 5.7\bin;
```
2. Install mysqlclient for python connect mysql server
* 地址: https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient

3. Install pymysql for python connect mysql server(不建议，建议使用mysqlclient)
```
wget https://files.pythonhosted.org/packages/a7/7d/682c4a7da195a678047c8f1c51bb7682aaedee1dca7547883c3993ca9282/PyMySQL-0.9.2-py2.py3-none-any.whl
pip install PyMySQL-0.9.2-py2.py3-none-any.whl
增加：vim /usr/lib/python3.4/site-packages/django/db/backends/mysql/base.py
    import pymysql
    pymysql.install_as_MySQLdb()
```

## 2. Create Project Framework
```
1. create django project
	django-admin startproject AuthAdmin
2. create django app
	cd AuthAdmin
	python manage.py startapp backend
3. create vue app
	vue init ./packages/webpack-1.3.1 frontend
```

## 3. Develop
1. package vuejs project
```
cd AuthAdmin/frontend
npm install
npm run build
```

2. 后端配置
设置静态文件访问
```
TEMPLATES
        **'DIRS': ['frontend/dist']**

# Add for vuejs
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, "frontend/dist/static"),
]
```

设置跨域访问
```
INSTALLED_APPS
  corsheaders

MIDDLEWARE
  'corsheaders.middleware.CorsMiddleware',

CORS_ORIGIN_ALLOW_ALL = True
```

## 4. Dev Run
1. database
login: 
  mysql -h127.0.0.1 -P3306 -uroot -p
create: 
  create database authadmin character set utf8;
delete:
  drop database authadmin;
支持root用户允许远程连接mysql数据库:
  修改配置文件中bind-address为: bind-address = 0.0.0.0
  grant all privileges on *.* to 'root'@'%' identified by 'root' with grant option;
  flush privileges;

2. create data
python manage.py makemigrations backend
python manage.py migrate backend
python manage.py migrate

npm install --save-dev axios@0.18.0
npm install --save-dev sass-loader@6.0.0
npm install --save-dev node-sass@4.10.0
npm install --save-dev element-ui@2.4.10
npm install --save-dev vuex@3.0.1
npm install --save-dev font-awesome@4.7.0
npm install --save-dev babel-polyfill@6.26.0

```
暂未使用
npm install --save-dev ajv@6.0.0
```

## 5. Deploy
1. Install uwsgi
1) vim /etc/uwsgi/apps-enabled/uwsgi.ini
```
[uwsgi]

socket  = /etc/uwsgi/uwsgi.sock
chdir   = /root/ProjectManage
module  = AuthAdmin.wsgi:application

master  = true
processes = 4
workers = 5
pidfile = /etc/uwsgi/uwsgi.pid
static-map =  /static=/root/ProjectManage/frontend/dist

vacuum  = true
thunder-lock  = true
enable-threads  = true
daemonize = /etc/uwsgi/uwsgi.log
```
2) uwsgi --ini /etc/uwsgi/apps-enabled/uwsgi.ini

2. Install nginx
1) vim /etc/nginx/sited-enabled/default
```
upstream authadmin_pool {
    server unix:/etc/uwsgi/uwsgi.sock
}

server {
    listen 9003 default_server;
    listen [::]:9003 default_server ipv6only-on;

    server_name 10.6.13.34;

    location /admin {
        uwsgi_connect_timeout   3000;
        uwsgi_send_timeout      3000;
        uwsgi_read_timeout      3000;
        uwsgi_param Host        $host;
        uwsgi_param X-Real-IP   $remote_addr;
        uwsgi_param X-Forwarded-For $proxy_add_x_forwarded_for;
        uwsgi_param X-Forwarded-Proto   $http_x_forwarded_proto;
        include uwsgi_params;
        uwsgi_pass              authadmin_pool;
    }

    location /api {
        add_header              Access-Control-Allow-Origin *;
        add_header              Access-Control-Allow-Headers "Orgin, X-Requested-With, Content-Type, Accept";
        add_header              Access-Control-Allow-Methods "GET, POST, OPTIONS";
        uwsgi_connect_timeout   3000;
        uwsgi_send_timeout      3000;
        uwsgi_read_timeout      3000;
        uwsgi_param Host        $host;
        uwsgi_param X-Real-IP   $remote_addr;
        uwsgi_param X-Forwarded-For $proxy_add_x_forwarded_for;
        uwsgi_param X-Forwarded-Proto   $http_x_forwarded_proto;
        include uwsgi_params;
        uwsgi_pass              authadmin_pool;
    }

    location / {
        try_files $uri $uri @router;
        index index.html;
    }

    root /root/ProjectManage/frontend/dist/;
    index index.html;
    location $router {
        rewrite ^(.*)$ /index.html last;
    }
}
```
2) service nginx restart
