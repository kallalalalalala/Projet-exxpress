const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to check working hours
function checkWorkingHours(req, res, next) {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hour = now.getHours();
    
    // Check if it's Monday to Friday and between 9 and 17
    if (day >= 0 && day <= 5 && hour >= 9 && hour < 17) {
        next();
    } else {
        res.send('The web application is only available during working hours (Monday to Friday, 9 AM to 5 PM).');
    }
}

// Set the view engine to Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Apply the middleware to all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
    res.render('home.pug', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
