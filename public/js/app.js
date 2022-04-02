const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('firstP')
const messageTwo = document.getElementById('secondP')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address='+search.value).then((response)=>{
    response.json().then((data)=>{
       if(data.error){
           messageOne.textContent = data.error
       }
       else{
           messageOne.textContent = data.location
           messageTwo.textContent = data.forecast
       }
    })
})
})
