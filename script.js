let selector = document.getElementById('movies')
let hall = document.getElementById('hall')
let seats = document.querySelectorAll('.column .seat:not(.occupied)')
let price = +selector.value
let sumSeatsHtml = document.getElementById('seatsresult')
let sumPriceHtml = document.getElementById('priceresult')

populateUI()

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

// Updates total price and seats info
function updater () {
    let selected = document.querySelectorAll('.column .seat.selected')

    let selectedCount = +selected.length
    let totalPrice = selectedCount * price
    sumSeatsHtml.innerText = selectedCount
    sumPriceHtml.innerText = totalPrice

    const seatIndex = [...selected].map((seat => [...seats].indexOf(seat)))

    localStorage.setItem('selectedSeats', JSON.stringify(seatIndex))
    
    console.log(seatIndex)
}



// update selector event
selector.addEventListener('change',(e) => {
    price = e.target.value
    let selected = document.querySelectorAll('.column .seat.selected')
    for (let i = 0; selected.length > i; i++) {
        selected[i].classList.remove('selected')
    }
    
    setMovieData(e.target.selectedIndex, e.target.value)

    updater()
})


// get data from locar storage of user selected seats, movies and prices and populate UI
function populateUI () {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat,index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null) {
        selector.selectedIndex = selectedMovieIndex
    }
    

    const totalPrice = localStorage.getItem('selectedMoviePrice')
    if (selectedSeats !== null && selectedSeats.length > 0) {
        sumPriceHtml.innerText = totalPrice * selectedSeats.length
        sumSeatsHtml.innerText = selectedSeats.length
    }

    console.log(totalPrice)
}



// Select seat event
hall.addEventListener('click',(e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updater()
    }
})

