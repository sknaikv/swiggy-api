const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const serverless = require('serverless-http');
// const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors())
app.use(express.static("public"));

// Serve images folder as static
app.use('public/images', express.static(path.join(__dirname, '..', 'images')));
app.use('public/images2', express.static(path.join(__dirname, '..', 'images2')));

// Sample categories data with local image URLs
const categories = [
  {
    id: 1,
    name: "biryani.jpg"
  },
  {
    id: 2,
    name: "burger.jpg"
  },
  {
    id: 3,
    name: "shawarma.jpg"
  },
  {
    id: 4,
    name: "pizza.jpg"
  },
  {
    id: 5,
    name: "chinease.jpg"
  },
  {
    id: 6,
    name: "cake.jpg"
  },
  {
    id: 7,
    name: "rolls.jpg"
  },
  {
    id: 8,
    name: "noodles.jpg"
  },
  {
    id: 9,
    name: "icecream.jpg"
  },
  {
    id: 10,
    name: "waffle.jpg"
  },
  {
    id: 11,
    name: "paratha.jpg"
  },
  {
    id: 12,
    name: "northindian.jpg"
  },
  {
    id: 13,
    name: "khichdi.jpg"
  },
  {
    id: 14,
    name: "momos.jpg"
  },
  {
    id: 15,
    name: "pasta.jpg"
  },
  {
    id: 16,
    name: "salad.jpg"
  },
  {
    id: 17,
    name: "juice.jpg"
  },
  {
    id: 18,
    name: "dosa.jpg"
  },
  {
    id: 19,
    name: "kebabs.jpg"
  },
  {
    id: 20,
    name: "pav-bhaji.jpg"
  }
];



// Route to fetch categories
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

//fetching toprest data from directory
app.get('/api/toprest',(req,res) =>{
  const filepath = path.join(__dirname,'data/restaurantChains.json');

  // Read the file
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // Parse JSON data
        try {
            const restaurantChains = JSON.parse(data);
            res.json(restaurantChains);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            res.status(500).send('Internal Server Error');
        }
    });
})

// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
module.exports = serverless(app);
