const width = 30;
const height = 15;

let pixels = []

function clearPixels() {
    pixels = []
    let row;
    for (let y = 0; y < height; y++) {
        row = []
        for (let x = 0; x < width; x++) {
            row.push({
                x: x,
                y: y,
                color: "blue",
                char: 0
            });
        }
        pixels.push(row)
    }
}

function renderWorld(){
    let text = ""
    text = renderPixels(document.getElementById("world-text"), text)
    document.getElementById("world-text").innerHTML = text

    addClickEvents()
}

function renderPixels(element, text){
    text += "0".repeat(width + 2) + "<br>"
    for (let y = height - 1; y >= 0; y--) {
        text += "0"
        for (let x = 0; x < width; x++) {
            const pixel = pixels[y][x]
            text += `<span id=x${x}y${y} style=\"color:${pixel.color}\">${pixel.char}</span>`
        }
        text += "0<br>"
    }
    text += "0".repeat(width + 2) + "<br>"
    return text
}


function addClickEvents(){
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelText = document.getElementById(`x${x}y${y}`)
            pixelText.onclick = () => {onPixelClicked(x, y)}
        }
    }
}

function onPixelClicked(x, y){
    console.log(`clicked pixel x${x}y${y}`)
}