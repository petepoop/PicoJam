import type {Pixel, GameObject, Event} from "./types.js";
import {initWorld, renderWorld} from "./renderer.js";
import {getRandInt} from "./utills.js";
import {nf} from "./formatter.js";

let gameObjects: GameObject[] = []
let events: Event[] = []

let event_ongoing = false


//Resources
let gold = 0
let followers = 0
let faith = 0
let ores = 0
let research = 0

let gold_per_tick = 0
let followers_per_tick = 0
let faith_per_tick = 0
let ores_per_tick = 0
let research_per_tick = 0


export function onStart(){
    loadAssets()
    initGameObjects()
    initWorld()
}

export function onTick(){
    if (!events) return

    //Add game loop here
    //Mock game loop-----------
    gameObjects[0]!.y += 1
    if (gameObjects[0]!.y > 10){
        gameObjects[0]!.y = 2
    }
    //---------------------------

    //1 in X chance of an event each tick, since ticks take 500ms
    if(getRandInt(1,20) === 1){
        //TODO finish events
        if(!event_ongoing){
            let ev= gameEvent()
            console.log(ev?.title)
            //set to false after player resolves the event
            event_ongoing = true
        }
    }

    renderWorld(gameObjects)
}

export function resourceTick(){
    calcResources()
}

export function onGameObjectClicked(gameObjectID: number){
    console.log("Clicked " + gameObjects[gameObjectID])
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

function createSquareSprite(size: number){
    let pixels: Pixel[] = []
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            pixels.push({
                x: x,
                y: y,
                color: "red",
                char: "+",
                gameObjectId: -1
            });
        }
    }
    return pixels
}

function calcResources() {
/*TODO calculate resources here based on upgrades, research, etc. e.g,
gold_per_tick = base + (2 * Farm level) * 1.00 + (1*research_bonus_percent) * FarmToggled (boolean on whether or not a building is enabled)
*/
    gold_per_tick = 0.2

    gold += gold_per_tick

    followers_per_tick = 0

    followers += followers_per_tick

    //see in Desmos if you want the full picture. Research should improve this formula. Adjust as needed
    faith_per_tick = followers >= 100 ? Math.floor(Math.sqrt(followers) * 0.2) : 0

    faith += faith_per_tick

    ores_per_tick = 0

    ores += ores_per_tick

    //Research should only increment if the player is actively researching something
    /*if(researching){
        research_per_tick = base + (2 * Library level) * 1.00 + (1*research_bonus_percent) * LibraryToggled
    }else{
        research_per_tick = 0
    }
    */
    research += research_per_tick

    if(gold < 0){
        gold = 0;
    }

    if(followers < 0){
        followers = 0;
    }

    if(faith < 0){
        faith = 0;
    }

    if(ores < 0){
        ores = 0;
    }

    if(research < 0){
        research = 0;
    }

    displayResources()
}

function displayResources(){
    let text = document.getElementById("goldDisplay")!
    text.innerText = "Gold: " + nf(gold)
    
    if(followers > 0){
        text = document.getElementById("followersDisplay")!
        text.innerText = "Followers: " + nf(followers)
    }else{
        text = document.getElementById("followersDisplay")!
        text.innerText = "???"
    }

    if(faith > 0){
        text = document.getElementById("faithDisplay")!
        text.innerText = "Faith: " + nf(faith)
    }else if(followers > 0){
        text = document.getElementById("faithDisplay")!
        text.innerText = "???"
    }else{
        text = document.getElementById("faithDisplay")!
        text.innerText = " "
    }

    if(ores > 0){
        text = document.getElementById("oresDisplay")!
        text.innerText = "Ores: " + nf(ores)
    }else if(faith > 0){
        text = document.getElementById("oresDisplay")!
        text.innerText = "???"
    }else{
        text = document.getElementById("oresDisplay")!
        text.innerText = " "
    }


    //TODO display research
}

async function loadAssets() {
    const response = await fetch('../eventsData.json')
    const data = await response.json()
    events = data.events
}

function gameEvent(): Event {
    let totalWeight = events.reduce((sum, event) => sum + event.weight, 0)
    let random = Math.random() * totalWeight
    let weightSum = 0
    
    for (let event of events) {
        weightSum += event.weight
        if (random <= weightSum) {
            return event
        }
    }
    return events[0]! //Returning something so can set return type as non null
}