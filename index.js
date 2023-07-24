const express = require('express');
const app = express();
const port = 3000; // You can change this to any available port you prefer

const qns = require('./manager/qns.json')

app.set('view engine', 'ejs');
app.use(express.static('views'));
// Define routes
app.get('/', (req, res) => {
  res.render('index');
});

// Custom route example
app.get('/genqn', (req, res) => {
    let i = Math.floor(Math.random() * (qns.length-1 - 0 + 1)) + 0
    let qn = qns[i];
  res.send({
    question: qn.qn,
    answer: qn.answer,
    index: i
  });
});

app.get('/quiz', (req, res) => {
    res.render('quiz')
})

// 404 route
app.use((req, res) => {
  res.status(404).send('Page not found');

});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



function runQn() {
    let questions = 5;
    //Loop
}

function askQn() {

}