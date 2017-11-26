const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World'));

app.get('/test', async(req, res) => {
    console.log("hello");
    await Timeouts();
    res.send('Hello2')
});






app.listen(3000, () => console.log("Example app listening on port 3000"));


function Timeouts() {
    return new Promise(res => {
        setTimeout(() => res(), 4000);
    })
}