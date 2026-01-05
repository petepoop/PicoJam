gameObjects = []


function onStart(){
    initGameObjects()
    renderWorld(gameObjects)
}

function onTick(){

}

function initGameObjects(){
    gameObjects.push({
        name: "mock_object1",
        x: 5,
        y: 5,
        sprite: createSquareSprite(4)
    })

    gameObjects.push({
        name: "mock_object2",
        x: 20,
        y: 5,
        sprite: createSquareSprite(6)
    })
}

function createSquareSprite(size){
    pixels = []
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            pixels.push({
                x: x,
                y: y,
                color: "red",
                char: 0
            });
        }
    }
    return pixels
}