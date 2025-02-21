const mongoose = require('mongoose');
const Campground = require('../models/campground');      //import moodel
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp') //yelp-camp db

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)]         //return a random element from the array


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '67af8210c1b05cd05299fca1',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/drzhwaew1/image/upload/v1739803196/YelpCamp/zienzafskiploccm0vq9.webp',
                    filename: 'YelpCamp/zienzafskiploccm0vq9',
                },
                {
                    url: 'https://res.cloudinary.com/drzhwaew1/image/upload/v1739803198/YelpCamp/stynomm0xnyeplhotsuy.jpg',
                    filename: 'YelpCamp/stynomm0xnyeplhotsuy',
                }],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut mollitia dignissimos non ab a suscipit quas maiores totam qui praesentium, dicta maxime, nesciunt sit, quia labore assumenda laborum nulla quae!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [ -92.17242669314146, 38.5773591521872 ]
              }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})