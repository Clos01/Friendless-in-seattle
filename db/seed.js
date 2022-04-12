module.exports = (db) => {
  db.User.create({
    firstName: 'Adam',
    email: 'adam@gates.com',
    password: process.env.ADMIN_USER_PWD,
    interest_id: 1,
    isAdmin: true
  }).then(() => {
    db.User.create({
      firstName: 'Uma',
      email: 'uma@pearson.com',
      password: process.env.USER_PWD,
      interest_id: 1,
      isAdmin: false
    }).then(() => {
      db.Example.create({
        text: 'Sample item',
        description: 'Adam can\'t see this',
        UserId: 2
      });
    });
  });
  db.Interest.create({
    interest_name: 'Working Out'
  });
};
