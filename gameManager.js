gameObjects = []
let events = null

function onStart(){
    loadAssets()
    initGameObjects()
    renderWorld(gameObjects)
}

function get_rand_int(min, max){
    return Math.floor(Math.random() * ((max - min + 1) + min))
}

function onTick(){
    if (!events) return

    //Add game loop here
    //Mock game loop-----------
    gameObjects[0].y += 1
    if (gameObjects[0].y > 10){
        gameObjects[0].y = 2
    }
    //---------------------------

    //1 in 2500 chance of an event each tick, since ticks take 500ms
    if(get_rand_int(1,2) == 1){
        //TODO new event
        ev = gameEvent()
        console.log(ev.title)
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

async function loadAssets() {
    const response = await fetch('assets.json')
    const data = await response.json()
    events = data.events
}

function gameEvent() {
    let totalWeight = events.reduce((sum, event) => sum + event.weight, 0)
    let random = Math.random() * totalWeight
    let weightSum = 0
    
    for (let event of events) {
        weightSum += event.weight
        if (random <= weightSum) {
            return event
        }
    }
}