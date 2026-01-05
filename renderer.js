const width = 30;
const height = 15;

let pixels = []

function renderWorld(gameObjects){
    clearPixels()

    for (let i = 0; i < gameObjects.length; i++){
        pasteGameObject(gameObjects[i], i)
    }

    let text = ""
    text = renderPixels(document.getElementById("world-text"), text)
    document.getElementById("world-text").innerHTML = text

    addClickEvents()
}

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
                char: 0,
                gameObjectId: -1
            });
        }
        pixels.push(row)
    }
}

function pasteGameObject(gameObject, id){
    gameObject.sprite.forEach((spritePixel) => {
        const x = gameObject.x + spritePixel.x
        const y = gameObject.y + spritePixel.y

        if (x >= 0 && x < width && y >= 0 && y < height){
            pixels[y][x] = {
                x: x,
                y: y,
                color: spritePixel.color,
                char: spritePixel.char,
                gameObjectId: id
            }
        }
    });
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
            pixelText.onclick = () => {onPixelClicked(pixels[y][x])}
        }
    }
}

function onPixelClicked(pixel){
    if (pixel.gameObjectId !== -1){
        onGameObjectClicked(gameObjects[pixel.gameObjectId])
    }
}