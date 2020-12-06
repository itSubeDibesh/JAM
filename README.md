<p align="center">
 <img src="./logo/icon-512.png" width="100">
    <h1 align="center">
        <b>JAM (JavaScript API Maker)</b>
        <img align="center" alt="JavaScript" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />
        <img align="center" alt="MySQL" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/mysql/mysql.png" />
        <img align="center" alt="Node.js" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/nodejs/nodejs.png" />
        <img align="center" alt="Visual Studio Code" width="24px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />
    </h1>
</p>

# __Table of Contents__
1.  __[About JAM](#about-jam)__
    1. __[Todos](#todos)__
    1. __[Change Log](#change-log)__
1.  __[Requirements](#requirements)__
1.  __[Setup](#setup)__
1.  __[Creating API Endpoints](#creating-api-endpoints)__
1.  __[Registering Route](#registering-route)__
1.  __[Importing Route File](#importing-route-file)__
___
## About JAM
JAM(JavaScript API Maker) is a small API spitting framework build for rapid development. JAM is designed to simplify the API creation process.

### Todos
Collaborators are heartily welcome and will be credited properly so if you are willing to be one, all the todos of JAM are listed on [Todo File](/Todo.md).

### Change log
All the possible changes are logged on [Changes file](/Changes.md) and don't hesitate to have a glance.
___
## Requirements
As this project is built on JavaScript and Express all you need is [Node JS](https://nodejs.org/en/) and [XAMPP](https://www.apachefriends.org/index.html) or [MySQL](https://www.mysql.com) server.
___
## Setup
Setting up JAM is pretty easy.
1. Create a database on MySQL server
1. [Clone JAM fom github](https://github.com/itSubeDibesh/JAM.git) 
1. Rename [``.env.example``](/.env.example) file to ``.env``
1. Set Database Credentials in ``.env`` file as below 

```.env
# ------------------------------
# Database Configuration
# ------------------------------
    DB_HOST = localhost
    DB_USER = root
    DB_Password = root
    DB_NAME = mydatabase
    DB_PORT = 3306
# ------------------------------
```
And finally open the terminal pointing to the cloned directory and run ``npm install`` after the installation completes you are ready to set some API endpoints.
___
## Creating API Endpoints
Creating an API endpoint using the JAM framework is a piece of cake if you have your database created.
1. Open endopints folder, copy and rename [``demo.js``](/endpoints/demo.js) file to your table name in the database.
1. Open the renamed file and rename demo from this line as your file name ``const _table = new table('demo');``.
1. Open [`` route.conf.js``](/route.conf.js)
1. Copy ``app.use('/demo', demo);`` and paste it inside constructor.
2. Rename demo from ``app.use('/demo', demo);`` to your table name and also rename the ``import demo from "./endpoints/demo.js";`` demo from import to your table name.
1. Save all the changes and test your endpoint.

Your endpoint will look something like this http://localhost:8080/yourTableName. CRUD operations for the table have been assigned with the endpoint so you can use the following URLs to perform different actions as defined.

|  S.N |   Method |  Action   |    URL                |    Description                   |
|:-----|:---------|:----------|:----------------------|:---------------------------------|
|  1.  |   GET    |  ALL      | /table                | Sends all the data               |
|  2.  |   GET    | Paginate  | /table?count=10&page=4| Paginates data                   |
|  3.  |   GET    | Pick      | /table/{id}           | Picks Specific data              |
|  4.  |   POST   | Insert    | /table                | Insert data according to payload |
|  5.  |   PUT    | Update    | /table/{id}           | Updates data according to payload|
|  6.  |   DELETE | Delete    | /table/{id}           | Delets Specific data             |

<br>

__NOTE: Here table means your table name and Insert and update payload is not defined on the above table.__
If you want to make other endpoints you know the drill. Just create a new file in the endpoints folder and [register the route](#registering-route) in [`` route.conf.js``](/route.conf.js) like the first endpoint you created.
___
 ## Registering Route
 If you have successfully created your first endpoint then you might skip this section. If not then let me explain you in detail.

All the routes are registered on [`` route.conf.js``](/route.conf.js) file which is located on root directory. Open the __route.conf.js__ file and 
follow the steps.
1. Import the route file you created. If you have not imported the route file and stuck on importing it then don't worry just [click me](#importing-route-file).
1. After you import the file you need to register the imported file to create an endpoint. To register endpoint create a new line under constructor.
1. Copy and paste ``app.use('/demo', demo);`` on the new line and rename both demos with the imported filename.

That's it you have registered your route successfully.
___
## Importing Route File
Importing a file is quite easy all you need to do is copy and paste ``import demo from "./endpoints/demo.js";`` and replace both demos with your table name on [`` route.conf.js``](/route.conf.js)  file.
