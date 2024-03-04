const client = require('./client')
const path = require('path')
const fs=require('fs')

const {
  fetchProducts,
  createProduct
} = require('./products');

const {
  updateUser,
  createUser,
  authenticate,
  fetchAllCustomers,
  findUserByToken,
  updateVipStatus,
  resetPassword,
  fetchAddress,
  updateAddress
} = require('./auth');

const {
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  fetchOrders,
  fetchAllOrders
} = require('./cart');

const {
  createReview,
  fetchReviews
} = require('./reviews')

const {
  createWishlistItem,
  fetchWishlistItems,  
  deleteWishlistItem
} = require('./wishlist');
const { get } = require('http');

//load product images
const loadImage = (filepath)=>{
  return new Promise((resolve,reject)=>{
    const fullPath=path.join(__dirname,filepath);

    //read file
    fs.readFile(fullPath,'base64',(err,result)=>{
        if(err){
          reject(err) //sends back the error msg
        }else{
          resolve(`data:image/jpg;base64,${result}`) //read file and send back
        }
    })

  })
}

// add price and description into the products table..//add firstname and lastname to users table//add img to Product table
// added vip boolean into the users table
// modified vip boolean to price in the products table

const seed = async()=> {
  // const babyBabyCake_image = await loadImage('https://photos.app.goo.gl/9fvcHFD1t3YcGJKw6');
  // const beatlesCake_image = await loadImage('https://photos.app.goo.gl/EkHCY6rBoWRHaNNg7');
  // const candyAisleCake_image = await loadImage('https://photos.app.goo.gl/qdfoh9YZbj4h9rir8');
  // const chocolateStripesCake_image = await loadImage('https://photos.app.goo.gl/v4QJDpemLgATtYz2A');
  // const christmasTrainCakes_image = await loadImage('https://photos.app.goo.gl/r1iPMnKmkM9oghrW7');
  // const coconutCupcake_image = await loadImage('https://photos.app.goo.gl/uq67CDN5t2PFAtuf6');
  // const cupcakeLetters_image = await loadImage('https://photos.app.goo.gl/kXJ4AVvVDjwS37tp8');
  // const earlGreyCupcakes_image = await loadImage('https://photos.app.goo.gl/zQqjcNAq7fZHai6v6');
  // const elmoCupcakes_image = await loadImage('https://photos.app.goo.gl/7CdtpzJbY9De1Z5R9');
  // const fairyCake_image = await loadImage('https://photos.app.goo.gl/yFQPpZ1ojeYTnMzJ7');
  // const flashCake_image = await loadImage('https://photos.app.goo.gl/EceLNka2erToYNwz8');
  // const flowerCake_image = await loadImage('https://photos.app.goo.gl/aDT4SpkNCHhTTVdDA');
  // const flowerpotCupcakes_image = await loadImage('https://photos.app.goo.gl/4KuMjK8rvJzxBfPJ9');
  // const goldBlackCake_image = await loadImage('https://photos.app.goo.gl/GN2aPxHRu1rTXDEw5');
  // const halloweenCupcakes_image = await loadImage('https://photos.app.goo.gl/VVViS3X8tTC6PZUW8');
  // const helloKitty_image = await loadImage('https://photos.app.goo.gl/bUg1hPMbEVRzPyq28');
  // const keylimeCupcakes_image = await loadImage('https://photos.app.goo.gl/jmN4eCRRD5bjPCq68');
  // const maybeImCrazyCake_image = await loadImage('https://photos.app.goo.gl/JhMZ1hGnAafGL7ui9');
  // const mistletoeCake_image = await loadImage('https://photos.app.goo.gl/x6jKVEvZo6b86ftK7');
  // const mountainCake_image = await loadImage('https://photos.app.goo.gl/ZZ7PwaQjq4v19R1w7');
  // const oreoCake_image = await loadImage('https://photos.app.goo.gl/JVwp9EeeCkZLX4GDA');
  // const pooEmoji_image = await loadImage('https://photos.app.goo.gl/HcT6BwDqFRfwi8ra7');
  // const prettyInPinkCupcake_image = await loadImage('https://photos.app.goo.gl/z1wT7mkdLzavbHZk8');
  // const princessCake_image = await loadImage('https://photos.app.goo.gl/F7t4XE7XZRivzZHv5');
  // const rainbowCake_image = await loadImage('https://photos.app.goo.gl/jvJVLn3ukLyvR2aa8');
  // const skittlesCake_image = await loadImage('https://photos.app.goo.gl/Rfx5EBCGW9sPNPBZA');
  // const smallWeddingCake_image = await loadImage('https://photos.app.goo.gl/eWrzRw1wAczrGACF8');
  // const snowHouseCake_image = await loadImage('https://photos.app.goo.gl/7gAteaWMjx2G7zKZ6');
  // const soccerDirtCake_image = await loadImage('https://photos.app.goo.gl/PobgQ529WWHBFuZi7');
  // const thanksgivingCake_image = await loadImage('https://photos.app.goo.gl/fvKtVmTf6ovSMpMc6');
  // const unicornCake_image = await loadImage('https://photos.app.goo.gl/NYY2EHoEHpvgLb1z8');
  // const valentinesDayCake_image = await loadImage('https://photos.app.goo.gl/F2WtRkYry32MH13w5');
  // const weddingCake_image = await loadImage('https://photos.app.goo.gl/TVki5Q84KQsoqREt7');
  // const koalaCake_image = await loadImage('https://photos.app.goo.gl/bbV8n8J69gnMkSG86');


  const SQL = `
    DROP TABLE IF EXISTS wishlist;
    DROP TABLE IF EXISTS line_items;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS orders;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS reviews;
    

    CREATE TABLE users(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      firstname VARCHAR(100) NOT NULL,
      lastname VARCHAR(100) NOT NULL,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      is_admin BOOLEAN DEFAULT false NOT NULL,
      is_vip BOOLEAN DEFAULT false NOT NULL,
      address_line1 VARCHAR(25),
      address_line2 VARCHAR(25),
      city VARCHAR(15),
      state VARCHAR(15),
      zip_code NUMERIC (5),
      phone NUMERIC (10)
    );

    CREATE TABLE products(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      name VARCHAR(100) UNIQUE NOT NULL,
      price NUMERIC NOT NULL,
      description TEXT NOT NULL,
      category VARCHAR(100),
      vip_price NUMERIC DEFAULT 0 NOT NULL,
      product_image TEXT
    );

    CREATE TABLE orders(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      is_cart BOOLEAN NOT NULL DEFAULT true,
      user_id UUID REFERENCES users(id) NOT NULL
    );

    CREATE TABLE line_items(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      product_id UUID REFERENCES products(id) NOT NULL,
      order_id UUID REFERENCES orders(id) NOT NULL,
      quantity INTEGER DEFAULT 1,
      CONSTRAINT product_and_order_key UNIQUE(product_id, order_id)
    );

    CREATE TABLE reviews(
      id UUID PRIMARY KEY,
      created_at TIMESTAMP DEFAULT now(),
      title VARCHAR(255) NOT NULL,
      comments VARCHAR(255) NOT NULL,
      ratings NUMERIC NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CHECK (ratings>0 AND ratings<6)
    );

    CREATE TABLE wishlist(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) NOT NULL,
      product_id UUID REFERENCES products(id) NOT NULL,
      CONSTRAINT user_and_product_key UNIQUE(user_id, product_id)
    );

  `;
  await client.query(SQL);

  //Added VIP status
  //Added firstname & lastname to columns to table
  const [moe, lucy, ethyl] = await Promise.all([
    createUser({firstname: "Moesha", lastname: "Norwood", username: 'moe', password: '1234', is_admin: false, is_vip: false }),
    createUser({ firstname: "Lucinda", lastname: "Hall", username: 'lucy', password: '1234', is_admin: false, is_vip: true }),
    createUser({ firstname: "Ethyleen", lastname: "Sims", username: 'ethyl', password: '1234', is_admin: true, is_vip: true })
  ]);

  //Added addresses for all current users
  await Promise.all([
    updateAddress({ user_id: moe.id, address_line1: "4482 Lady Bug Dr", city: "Bronx", state: "NY", zip_code: "10458", phone: "3125554892" }),
    updateAddress({ user_id: lucy.id, address_line1: "3730 Hartland Ave", city: "Fond Du Lac", state: "WI", zip_code: "54935", phone: "8155552773" }),
    updateAddress({ user_id: ethyl.id, address_line1: "13 Ersel St", address_line2: "Apt. 5", city: "Smithboro", state: "IL", zip_code: "62284", phone: "6305551024" })
  
  ]);

  //Added price and description
  //Modified VIP booleans to VIP prices
  //Added category to each product
  const [foo, bar, bazz,quq] = await Promise.all([

    createProduct({ name: "Another World: Serpent's Shadow", price: 59.99, description: "Welcome to the treacherous realm of 'Another World: Serpent's Shadow,' where darkness reigns and serpentine creatures slither in the shadows. In this immersive board game, players are thrust into a world shrouded in mystery and danger, where survival depends on wit, cunning, and the ability to outmaneuver lurking threats.", vip_price: 0, category:'board games', productImage: 'https://dl.dropboxusercontent.com/s/3matlyuxgc2yg00asrj6v/another-world.jpg?rlkey=t2bnbkrl4q7nw8rc5ntvecpst&dl=0'}),
    createProduct({ name: 'Aquarium', price: 45.99, description: 'Embark on an exhilarating journey into the mesmerizing depths of the ocean with "Aquarium Adventure." In this immersive board game, players delve into the vibrant and mysterious world of sea creatures, where every turn brings new challenges and discoveries.', vip_price:0, category:'board games', productImage: 'https://dl.dropboxusercontent.com/s/6k46lio721cagrv82vces/aquairum.jpg?rlkey=ge0a74cntw5ktulukg4x439a8&dl=0' }),
    createProduct({ name: 'Bad Monkey', price: 64.99, description: 'Prepare to enter a whimsical world where gears and gadgets intertwine with mischievous monkeys in "Bad Monkey: Clockwork Conundrum." In this steampunk-themed board game, players are transported to a bustling metropolis where inventive contraptions, daring escapades, and, of course, the antics of the infamous Bad Monkey await.', vip_price:0, category:'board games', productImage: 'https://dl.dropboxusercontent.com/s/cajbg231hnd6hususaw11/bad-monkey.jpg?rlkey=5jnvsxcqwoh20xo0ueuz3xr73&dl=0' }),
    createProduct({ name: 'Who Passed the Beans', price: 45.99, description: 'Welcome to the hilarious and chaotic world of "Who Passed the Beans?" – the ultimate card game for bean enthusiasts and mischief-makers alike! In this uproarious game, players take on the roles of mischievous beans trying to pass gas without getting caught, all while trying to pin the blame on their unsuspecting fellow players.', vip_price:0, category:'card games', productImage: 'https://dl.dropboxusercontent.com/s/w4n1eaqe6t2g75hbvsc61/beans.jpg?rlkey=exktt1csaxiydk3cp9soyqzl2&dl=0' }),
    createProduct({ name: "Believe: The Dark Sorcerer's Conquest", price: 45.99, description: "Dive into a world shrouded in darkness and magic, where the fate of kingdoms hangs in the balance. 'Believe: The Dark Sorcerer's Conquest' beckons players to embark on an epic quest to thwart the sinister schemes of the malevolent sorcerer known only as Believe. In this immersive board game, players must band together to overcome challenges, gather ancient artifacts, and ultimately confront the forces of evil threatening to engulf the realm.", vip_price:0, category:'board games', productImage: 'https://dl.dropboxusercontent.com/s/cv9lu9s7fmy5p272v8h45/believe.jpg?rlkey=u0tfz82ym0wktvlremoe64wyu&dl=0' }),
        
  ]);

  let orders = await fetchOrders(ethyl.id);
  let cart = orders.find(order => order.is_cart);
  let lineItem = await createLineItem({ order_id: cart.id, product_id: foo.id});
  lineItem.quantity++;
  await updateLineItem(lineItem);
  lineItem = await createLineItem({ order_id: cart.id, product_id: bar.id});
  cart.is_cart = false;
  await updateOrder(cart);

   //create review records
   await Promise.all([
    createReview({ title:'Disappointed',comments: 'Cake was very soggy.	', ratings : 1,product_id: foo.id}),
    createReview({ title:'Awesome',comments: 'Oh! Heavenly cake !',ratings : 5,product_id: foo.id }),
    createReview({ title:'Loved it',comments: 'Was a hit at the bday party',ratings : 5,product_id: bar.id }),
    createReview({ title:'Good',comments: 'what a wonderfully dellicious cake.	',ratings : 4 ,product_id: quq.id}),
  ]);

  //Created wishlist items for current users
  await Promise.all([
    createWishlistItem({ user_id: moe.id, product_id: bar.id }),
    createWishlistItem({ user_id: moe.id, product_id: bazz.id }),
    createWishlistItem({ user_id: lucy.id, product_id: bazz.id })
  ]);
  
};

module.exports = {
  fetchProducts,
  fetchOrders,
  fetchLineItems,
  fetchAllLineItems,
  createLineItem,
  updateLineItem,
  deleteLineItem,
  updateOrder,
  authenticate,  
  findUserByToken,
  seed,
  fetchReviews,
  createUser,
  fetchAllCustomers,
  fetchAllOrders,
  updateUser,
  createWishlistItem,
  fetchWishlistItems,
  deleteWishlistItem,
  updateVipStatus,
  resetPassword,
  fetchAddress,
  updateAddress,
  client
};
