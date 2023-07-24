const express = require('express');
const app = express();
const port = 3000;

const qns = require('./manager/qns.json')

app.set('view engine', 'ejs');
app.use(express.static('views'));
app.get('/', (req, res) => {
  res.render('index');
});

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

app.use((req, res) => {
  res.status(404).send('Page not found');

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



function runQn() {
    let questions = 5;

}

function askQn() {

}