// Toggles 'on/off' the pop-up screen and scroll
function onOff(){
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
} 

// Checks if all of the necessary information was correctly inserted.
// If there's an error, it'll display an alert message.
function checkFields(event) {
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link"
    ]

    const isEmpty = valuesToCheck.find(function(value) {

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty) {
        event.preventDefault()
        alert("Por favor, preencha todos os campos.")
    }
}