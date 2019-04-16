const db = require('./models');

const users_list = [
{
    fullName:"Leanne Graham",
    email:"Sincere@april.biz",
    dob: "2/11/1988",
    products:"Rose",

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
    products:'Rose',
},

];


const flowers_list = [

    {
        name: "Aconite",
        img:"https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/winter-aconite-720790.jpg",
        price: "$12",
        season: "Early Spring",
        orders: 12,
    },
    {
        name: "Ageratum",
        img: "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/ageratum-773201.jpg",
        price:"$11",
        season: "Mid‑Summer - Mid‑Fall",
        orders: 15,
    },
    {
        name: "Allium",
        img: "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/purple-882161.jpg",
        price:"$11",
        season: "Late Spring - Mid‑Summer",
        orders: 11,
    },
    {
        name: "Anemone",
        img: "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/summer-anemone-224501.jpg",
        price: "$10",
        season: "Mid Spring - Mid‑Fall",
        orders:10,
    },

];





const orders_list = [
    {
    userId: 1,
    quantity: 3,
    price: "$100",
    productId:12,

},
{
    userId: 2,
    quantity: 4,
    price: "$200",
    productId:13,

},
{
    userId: 3,
    quantity: 6,
    price: "$300",
    productId:14,

},
{
    userId:4,
    quantity: 7,
    price: "$500",
    productId:15,

},
];




db.User.deleteMany({}, (err, users) => {
    if (err) return console.log(err);
    console.log('removed all users');
    db.User.create(users_list, (err, users) => {
      if (err) return console.log(err);
      console.log('recreated all users');
      console.log(`created ${users.length} users`);

      db.Flower.deleteMany({}, (err, flowers) => {
        if (err) return console.log(err);
        console.log('removed all flowers');

        flowers_list.forEach(flowerData => {
          const user = new db.User({
            title: flowerData.title,
            image: flowerData.image,
            releaseDate: flowerData.releaseDate
          });

          db.User.findOne({name: flowerData.user}, (err, foundUser) => {
            console.log(`found user  ${foundUser.name} for flower ${flower.title}`);
            if (err) return console.log(err);

            flower.user = foundUser;
            flower.save((err, savedFlower) => {
              if (err) return console.log(err);
              console.log(`saved ${savedFlower.title} by ${foundUser.name}`);
            });
          });
        });
      });
    });
  });