let button = document.querySelector("#explore")
button.addEventListener("click", ()=>{
    let display = document.querySelector(".movies")
    display.style.display = "block"
})
function displayData(movie){
    let show = document.createElement("div")
    show.className="show"
    show.innerHTML=`
    <div class="left"><img src="${movie.poster}"></div>
    <div class="right">
    <h2>${movie.title}</h2>
    <p>${movie.runtime} minutes</p>
    <p> Showtime: ${movie.showtime}</p>
    <p>Theatre capacity ${movie.capacity}</p>
    <p id="ticketsSold-${movie.id}">Tickets sold : ${movie.tickets_sold}</p>
    <button id="buy-btn-${movie.id}"> Buy ticket.</button></div>`
    document.querySelector(".container").appendChild(show)
   
    // Updating tickets and patching
    let ticketBtn = document.querySelector(`#buy-btn-${movie.id}`)
    ticketBtn.addEventListener('click', ()=>{
        movie.tickets_sold +=1
       let ticket= document.getElementById(`ticketsSold-${movie.id}`)
       ticket.innerText= `Tickets sold : ${movie.tickets_sold}`
      if( movie.tickets_sold >= movie.capacity){
        ticket.innerText =`Tickets sold : No more Tickets`
        movie.tickets_sold = movie.capacity
    
      }
         fetch(`http://localhost:3000/films/${movie.id}`,{
                 method:"PATCH",
                 headers:{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({tickets_sold: movie.tickets_sold})
             })

     })
}

function getData(){
    fetch("http://localhost:3000/films")
    .then((response)=>{
        response.json()
        .then(films=>films.forEach(movie=>displayData(movie)))
    })
}
getData()


