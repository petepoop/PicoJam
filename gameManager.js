gameObjects = []


function onStart(){
    initGameObjects()
    renderWorld(gameObjects)
}

function getrandint(min, max){
    return Math.floor(Math.random() * ((max - min + 1) + min))
}

function onTick(){
    //Add game loop here
    //Mock game loop-----------
    gameObjects[0].y += 1
    if (gameObjects[0].y > 10){
        gameObjects[0].y = 2
    }
    //---------------------------

    //1 in 2500 chance of an event each tick, since ticks take 500ms
    if(getrandint(1,2500) == 1){
        //TODO new event
    }

    renderWorld(gameObjects)
}

function onGameObjectClicked(gameObject){
    console.log("Clicked " + gameObject.name)
}

function initGameObjects(){
    gameObjects.push({
        name: "mock_object1",
        x: 5,
        y: 2,
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