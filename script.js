let selector = document.getElementById('movies')
let hall = document.getElementById('hall')
let price = +selector.value
let sumSeatsHtml = document.getElementById('seatsresult')
let sumPriceHtml = document.getElementById('priceresult')



// Updates total price and seats info
function updater () {
    let selected = document.querySelectorAll('.column .seat.selected')

    let selectedCount = +selected.length
    let totalPrice = selectedCount * price
    sumSeatsHtml.innerText = selectedCount
    sumPriceHtml.innerText = totalPrice
}

// update selector event
selector.addEventListener('change',(e) => {
    price = e.target.value
    updater()
})

// Select seat event
hall.addEventListener('click',(e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updater()
    }
})

