const request = require("request")

const forecast = (latitude , longitude , callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=3f5b353a4e12d84c1d238f784f3a0fad&query='+latitude+','+longitude 
    request({url , json:true} , (error,{body})=>{
        if(error){
            callback({
                error: 'Unable to connect to weather service!'
            },undefined)
        }
        else if(body.error){
            callback({
                error: 'Unable to find location'
            },undefined)   
        }
        else{
            callback(undefined,`Temperature now : ${body.current.temperature} degress out, It feels like: ${body.current.feelslike} dgress`)
        }
    })
}

module.exports = forecast