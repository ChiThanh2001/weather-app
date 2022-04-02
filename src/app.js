const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'index page',
        name: 'Lương Chí Thành'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helpMessage : 'You need help? Im here to help you',
        title: "Here to help",
        name: 'Lương Chí Thành'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:"Lương Chí Thành"
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You need to provide the address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(errorForecast,dataForecast)=>{
            if(errorForecast){
                return res.send({error: errorForecast})
            }
            res.send({
                address: req.query.address,
                forecast: dataForecast,
                location: data.location
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Yolo',
        error:'Help article not found',
        name:'Thành'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 page',
        error:'Page not found',
        name:'Thành'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})