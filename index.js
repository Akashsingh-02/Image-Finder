const fs = require('fs')
const express = require('express');

const path = require('path');
const app = express();

const port = process.env.PORT || 5000;				

app.set('view engine', 'pug')
app.set('views', './views')

app.use('/static',express.static(path.join(__dirname,'public')))

app.get('/getimages', (req, res) => {
    let images = getImagesFromDir(path.join(__dirname,'public'))

    res.render('index',{title:'Image Finder', images:images})
})

function getImagesFromDir(dirPath){
    let allImages = []

    let files = fs.readdirSync(dirPath)

    for(let i in files){
        let file = files[i]
        let fileLocation = path.join(dirPath, file)

        var stat = fs.statSync(fileLocation)

        if(stat && stat.isFile() && ['.jpg', '.png'].indexOf(path.extname(fileLocation)) !== -1){
            allImages.push('static/'+file)
        }
    }

    return allImages
}

app.get('/', (req, res) => { res.send(`for Image Finder go to getimages`) })

app.listen(port, () => {
    console.log(`Running server on PORT ${port}...`);
})
