const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('../models/campgrounds');
const cities = require('./cities');
const helpers = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async() => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location:`${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(helpers.descriptors)} ${sample(helpers.places)}`
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("Database connection closed");
})