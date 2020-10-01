This is a Simple ToDo Application created using <br>
 <ul>
    <li>JavaScript</li>
    <li>ExpressJS</li>
    <li>Template engine pug</li>
    <li>MongoDB</li>
 </ul>
     
This application was deployed on heroku [here](https://zakitodoapp.herokuapp.com)

# Configuration
### DataBase configuration

#### File config.js
In this application, I use mongoDB dataBase <br> 
To configure it, Add your connection string into the application config (config.js file)<br>
This is a helpful tutorial to get your connection String from mongoDB cloud ([Click here](https://www.youtube.com/watch?v=Ej05tq1220A))

```
        connectionString: 'Paste_Your_Connection_String_Here'
```

### Install the dependencies
First you should have Node installed ([install Node](https://nodejs.org/en/download/)) <br>
Open command line on the project directory and launch this command to install the dependencies
```shell script
npm install
```

# Start
Open command line on the project directory and launch this command to start the app on the localhost

```shell script
node server.js
```

#Demo

##Items list

<img alt="Items list" src="https://zakitodoapp.herokuapp.com/demo_image/to_do_list.png" style="text-align: center;">

##Add new item

<img alt="Add new item" src="https://zakitodoapp.herokuapp.com/demo_image/add-new-item.png" style="text-align: center;">

##Edit an existing item in the list

<img alt="Edit an existing item in the list" src="https://zakitodoapp.herokuapp.com/demo_image/edit-item.png" style="text-align: center;">

##Delete item from the list

<img alt="Delete item from the list" src="https://zakitodoapp.herokuapp.com/demo_image/delete_item.png" style="text-align: center;">


##Live Demo

you can check it with a live demonstration by clicking [here](https://zakitodoapp.herokuapp.com)
