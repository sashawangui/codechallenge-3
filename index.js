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
    <button class="buy-btn" data-id="${movie.id}"> Buy ticket. </button></div>`
    document.querySelector(".container").appendChild(show)
    console.log(show)
}

function getData(){
    fetch("http://localhost:3000/films")
    .then((response)=>{
        response.json()
        .then(films=>films.forEach(movie=>displayData(movie)))
    })
}
getData()