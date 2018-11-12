## Install Backend Rely
* 查看python安装的包: python3 -m pip list
* 查看npm安装的包: npm list -g --depth 0
```
1. Install Python
python --version: 3.7.1
2. Install pip
1)wget https://files.pythonhosted.org/packages/c2/d7/90f34cb0d83a6c5631cf71dfe64cc1054598c843a92b400e55675cc2ac37/pip-18.1-py2.py3-none-any.whl
python -m pip install pip-18.1-py2.py3-none-any.whl
2)curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
python get-pip.py
3. Install Django
*在线:pip install django=2.0.9

*离线:(https://www.djangoproject.com/download/)
1)wget https://files.pythonhosted.org/packages/f8/0e/2365ddc010afb3d79147f1dd544e5ee24bf4ece58ab99b16fbb465ce6dc0/pytz-2018.7-py2.py3-none-any.whl
pip install pytz-2018.7-py2.py3-none-any.whl
2)wget https://www.djangoproject.com/download/2.0.9/tarball/
cd Django-2.0.9
python setup.py install

4. Install (在Django层注入header解决跨域问题)
在线:pip install django-cors-headers
离线:
wget https://files.pythonhosted.org/packages/cc/7e/83ba784ad2b95317bbbed915f0888d7d1cd8dc3d2e4b8ddec8fbc4c3e800/django_cors_headers-2.4.0-py2.py3-none-any.whl
pip install django_cors_headers-2.4.0-py2.py3-none-any.whl

* pip install djangorestframework-3.7.7-py2.py3-none-any.whl
```

## Install Frontend Rely

```
1. Install node and npm
2. Install vue
3. download webpack template to project directory
wget https://github.com/vuejs-templates/webpack/archive/1.3.1.zi
```

## Install Database
```
1. Install MySQL Server
download packages: https://dev.mysql.com/downloads/mysql/5.7.html#downloads
wget https://dev.mysql.com/get/Downloads/MySQLInstaller/mysql-installer-community-5.7.24.0.msi

windows系统上mysql 5.7开启远程连接
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '密码' WITH GRANT OPTION;
FLUSH PRIVILEGES;

2. Install pymysql for python connect mysql server(不好用)
wget https://files.pythonhosted.org/packages/a7/7d/682c4a7da195a678047c8f1c51bb7682aaedee1dca7547883c3993ca9282/PyMySQL-0.9.2-py2.py3-none-any.whl
pip install PyMySQL-0.9.2-py2.py3-none-any.whl
增加：vim /usr/lib/python3.4/site-packages/django/db/backends/mysql/base.py
    import pymysql
    pymysql.install_as_MySQLdb()
3. Install mysqlclient for python connect mysql server
* 地址: https://www.lfd.uci.edu/~gohlke/pythonlibs/#mysqlclient
```

## Create Project 

```
1. create django project
django-admin startproject AuthAdmin
2. create django app
cd AuthAdmin
python manage.py startapp backend
3. create vue app
vue init ./webpack-1.3.1 frontend
```

## Develop
1. package vuejs project
```
cd AuthAdmin/frontend
npm install
npm run build
```

2.
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

无法访问:
报错:provisional headers are shown
no-referrer-when-downgrade
解决:https://blog.csdn.net/lyn1772671980/article/details/82386005
```

## Run
1. database
login: mysql -h127.0.0.1 -P3306 -uroot -p
create: create database authadmin character set utf8;

2. create data
python manage.py makemigrations appname
python manage.py migrate appname


error: django.db.utils.OperationalError: (1050, "Table '表名' already exists）
resolve: python manage.py migrate myapp --fake

npm install --save-dev axios@0.18.0
npm install --save-dev qs
npm install sass-loader@6.0.0 --save-dev
npm install ajv@6.0.0 --save-dev

set SASS_BINARY_PATH=D:\Develop\package\win32-x64-64_binding.node
npm install node-sass@4.10.0 --save-dev

npm install --save-dev element-ui
npm install --save-dev font-awesome@4.7.0


