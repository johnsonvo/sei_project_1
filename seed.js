const db = require('./models');
const newUser = [
{   
    fullName:"Leanne Graham",
    email:"Sincere@april.biz",
    dob: "2/11/1988",
    products:Rose,
},
{  
    fullName:"Ervin Howell",
    email:"Shanna@melissa.tv",
    dob: "2/09/1900",
    products:"Sunflower",
},
{  
    fullName:"Clementine Bauch",
    email:"Nathan@yesenia.net",
    dob: "12/1/1957",
    products:"Canation",
},
{   
    fullName:"Patricia Lebsack",
    email:"Julianne.OConner@kory.org",
    dob: "15/08/2000",
    products:Rose,
},

];


db.User.create(newUser, (err,savedUser)=>{
    if(err) {
        return console.log(err);
    }
    console.log(`save new user: ${savedUser}`);
});