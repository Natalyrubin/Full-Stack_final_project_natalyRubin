const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const users = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    name: {
      first: "Sarah",
      middle: "Jane",
      last: "Connor",
    },
    phone: "050-1234567",
    email: "sarah.connor@example.com",
    password: bcrypt.hashSync('Sarah123!', 10),
    image: {
      url: "https://example.com/images/sarah",
      alt: "Sarah Profile",
    },
    address: {
      state: "California",
      country: "USA",
      city: "Los Angeles",
      street: "Sunset Blvd",
      houseNumber: 101,
      zip: "90001",
    },
    isAdmin: true,
    isCustomer: true,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    name: {
      first: "John",
      middle: "",
      last: "Doe",
    },
    phone: "050-2345678",
    email: "john.doe@example.com",
    password: bcrypt.hashSync('John123!', 10),
    image: {
      url: "https://example.com/images/john",
      alt: "John Profile",
    },
    address: {
      state: "New York",
      country: "USA",
      city: "New York City",
      street: "5th Avenue",
      houseNumber: 500,
      zip: "10001",
    },
    isAdmin: false,
    isCustomer: true,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    name: {
      first: "Alice",
      middle: "M",
      last: "Smith",
    },
    phone: "050-3456789",
    email: "alice.smith@example.com",
    password: bcrypt.hashSync('Alice123!', 10),
    image: {
      url: "https://example.com/images/alice",
      alt: "Alice Profile",
    },
    address: {
      state: "Texas",
      country: "USA",
      city: "Houston",
      street: "Main St",
      houseNumber: 200,
      zip: "77001",
    },
    isAdmin: false,
    isCustomer: true,
  }
];



const items = [
  {
    title: "Al Merrick High Performance Surfboard",
    description: "A top-of-the-line surfboard designed for advanced surfers seeking maximum performance.",
    category: "Surfboards",
    brand: "Al Merrick",
    image: {
      url: "https://www.surf-skateboards.com/media/catalog/product/cache/f62e7738b928f05ed3a01c955dd80bd7/_/c/_c_h_channel-islands-surfboards-ci-high-5.png",
      alt: "Al Merrick High Performance Surfboard Image",
    },
    reviews: {
      rating: 4.8,
      comment: "Incredible board! Handles great in all conditions.",
      reviewerName: "Mark Johnson",
    },
    price: 800,
    rating: 4.8,
    stock: true,
  },
  {
    title: "Al Merrick Groveler Surfboard",
    description: "Perfect for smaller waves, this board provides stability and ease of use for all skill levels.",
    category: "Surfboards",
    brand: "Al Merrick",
    image: {
      url: "https://cisurfboards.com/cdn/shop/products/four_feature.png?v=1619468654",
      alt: "Al Merrick Groveler Surfboard Image",
    },
    reviews: {
      rating: 4.6,
      comment: "Great for small waves, very fun and easy to ride.",
      reviewerName: "Laura Lee",
    },
    price: 750,
    rating: 4.6,
    stock: true,
  },
  {
    title: "Rusty High Performance Surfboard",
    description: "A durable and versatile surfboard ideal for high-performance surfing.",
    category: "Surfboards",
    brand: "Rusty",
    image: {
      url: "https://rustysurfboards.com/cdn/shop/files/Model8IL_a7679727-c003-47dd-91a4-c7461b34025a_5000x.jpg?v=1693955715",
      alt: "Rusty High Performance Surfboard Image",
    },
    reviews: {
      rating: 4.7,
      comment: "Super responsive and fast. Great for any wave condition.",
      reviewerName: "Chris Evans",
    },
    price: 780,
    rating: 4.7,
    stock: true,
  },
  {
    title: "Rusty Fish Surfboard",
    description: "A fish-style board that is perfect for catching waves and carving turns.",
    category: "Surfboards",
    brand: "Rusty",
    image: {
      url: "https://rustysurfboards.eu/cdn/shop/products/rusty-surfboards-fish-quatro-1_1200x.jpg?v=1675865721",
      alt: "Rusty Fish Surfboard Image",
    },
    reviews: {
      rating: 4.5,
      comment: "Great maneuverability and speed. Ideal for smaller surf.",
      reviewerName: "Emily Clark",
    },
    price: 720,
    rating: 4.5,
    stock: true,
  },
  {
    title: "Al Merrick Classic Longboard",
    description: "A classic longboard for a smooth and stylish ride on any wave.",
    category: "Surfboards",
    brand: "Al Merrick",
    image: {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4eMaHpVkNtDuU--5iH4BNtmJ4SgztDaw5HA&s",
      alt: "Al Merrick Classic Longboard Image",
    },
    reviews: {
      rating: 4.9,
      comment: "Perfect for cruising and catching small to medium waves. Very stable and fun.",
      reviewerName: "Jane Roberts",
    },
    price: 850,
    rating: 4.9,
    stock: true,
  }
];




module.exports = { users, items };