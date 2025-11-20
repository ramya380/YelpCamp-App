if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

// mongoose.connect('mongodb://localhost:27017/Project')
//    .then(()=>{
//       console.log("CONNECTION OPEN");
//    })
//    .catch(err=>{
//       console.log("ohh noo error");
//       console.log(err);
//    })

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/Project';
mongoose.connect(dbUrl)
   .then(()=>{
      console.log("CONNECTION OPEN");
   })
   .catch(err=>{
      console.log("ohh noo error");
      console.log(err);
   })
const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '66c61a9f075ce65c508ad389',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: `https://picsum.photos/400?random=${Math.random()}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images:[
                {
                    url: 'https://res.cloudinary.com/dgjnpv1h1/image/upload/v1724267188/YelpCamp/spntup2ohrwxuefzfnsh.jpg',
                    filename: 'YelpCamp/spntup2ohrwxuefzfnsh'
                
                  },
                  {
                    url: 'https://res.cloudinary.com/dgjnpv1h1/image/upload/v1724267196/YelpCamp/cehsqg5hog9etsmsrgzw.jpg',
                    filename: 'YelpCamp/cehsqg5hog9etsmsrgzw'
                    
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})