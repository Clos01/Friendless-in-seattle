// const db = require('../models');
module.exports = (db) =>{
  db.User.create({
    firstName: 'Admin',
    email: 'admin',
    password: process.env.ADMIN_USER_PWD,
    location: 'Raleigh',
    interest_id: 1,
    isAdmin: true
  }).then(() => {
    db.User.create({
      firstName: 'Uma',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD,
      location: 'Raleigh',
      interest_id: 1,
      isAdmin: false
    });
  });
  db.Interest.create({
    interest_name: 'Working Out'
  }).then(() => {
    db.Interest.create({
      interest_name: 'Hiking'
    }).then(() => {
      db.Interest.create({
        interest_name: 'Swimming'
      });
    });
  });
}