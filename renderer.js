const width = 30;
const height = 15;

let pixels = []


clearPixels()

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
    text = renderPixel(document.getElementById("world-text"), text)

    document.getElementById("world-text").innerHTML = text
}

function renderPixel(element, text){
    text += "0".repeat(width + 2) + "<br>"
    for (let y = height - 1; y >= 0; y--) {
        text += "0"
        for (let x = 0; x < width; x++) {
            const pixel = pixels[y][x]
            text += `<span style=\"color:${pixel.color}\">${pixel.char}</span>`
        }
        text += "0<br>"
    }
    text += "0".repeat(width + 2) + "<br>"
    return text
}
