/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR CONVEX DATABASE !!!!!!!
============================================
============================================
*/

const connectDB = require('./config/db')
const { items, users } = require('./data/data')
const Item = require('./models/Item')
const User = require('./models/User')

const seedAll = async () => {

  console.log('\nDatabase seeding started...');

  try {
    await Item.deleteMany();
    const insertedItems = await Item.insertMany(items);
    console.log(`  [i] Inserted ${insertedItems.length} items`);

    await User.deleteMany();

    const insertedUsers = await User.insertMany(users);
    console.log(`  [i] Inserted ${insertedUsers.length} users`);
    console.log('[v] Completed successfully');
    process.exit(0);

  } catch (e) {
    console.log('[x] Seeding error')
    console.log(e.message)
    process.exit(1);

  }

}


connectDB().then(() => {
  seedAll()
});