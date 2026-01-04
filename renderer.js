const width = 30;
const height = 15;


function renderWorld(){
    let text = ""
    text = renderBorders(document.getElementById("world-text"), text)

    document.getElementById("world-text").innerHTML = text
}

function renderBorders(element, text){
    text += "0".repeat(width + 2) + "<br>"
    for (let y = 0; y < height; y++) {
        text += "0"
        for (let x = 0; x < width; x++) {
            text += " "
        }
        text += "0<br>"
    }
    text += "0".repeat(width + 2) + "<br>"

    return text;
}