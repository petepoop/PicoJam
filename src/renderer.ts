import type { Pixel, GameObject } from "./types";
import {onGameObjectClicked} from "./gameManager"

const width = 30;
const height = 15;

let pixels: Pixel[][] = []

export function initWorld(){
    initPixels()

    let text = ""
    text = renderPixels(text)

    document.getElementById("world-text")!.innerText = text

    addClickEvents()
}

export function renderWorld(gameObjects: GameObject[]){
    clearPixels()

    for (let i = 0; i < gameObjects.length; i++){
        pasteGameObject(gameObjects[i]!, i)
    }

    editPixels()
}

function initPixels() {
    pixels = []
    let row: Pixel[] = [];
    for (let y = 0; y < height; y++) {
        row = []
        for (let x = 0; x < width; x++) {
            row.push({
                x: x,
                y: y,
                color: "blue",
                char: "0",
                gameObjectId: -1
            });
        }
        pixels.push(row)
    }
}


function clearPixels() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            pixels[y]![x]!.color = "blue"
            pixels[y]![x]!.char = "0"
            pixels[y]![x]!.gameObjectId = -1
        }
    }
}

function pasteGameObject(gameObject: GameObject, id: number){
    gameObject.sprite.forEach((spritePixel) => {
        const x = gameObject.x + spritePixel.x
        const y = gameObject.y + spritePixel.y

        if (x >= 0 && x < width && y >= 0 && y < height){
            pixels[y]![x]! = {
                x: x,
                y: y,
                color: spritePixel.color,
                char: spritePixel.char,
                gameObjectId: id
            }
        }
    });
}

function renderPixels(text: string){
    text += "-".repeat(width + 2) + "<br>"
    for (let y = height - 1; y >= 0; y--) {
        text += "|"
        for (let x = 0; x < width; x++) {
            const pixel = pixels[y]![x]!
            text += `<span id=x${x}y${y} style=\"color:${pixel.color}\">${pixel.char}</span>`
        }
        text += "|<br>"
    }
    text += "-".repeat(width + 2) + "<br>"
    return text
}

function editPixels(){
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelText = document.getElementById(`x${x}y${y}`)!
            pixelText.style.color = pixels[y]![x]!.color
            pixelText.innerText = pixels[y]![x]!.char
        }
    }
}

function addClickEvents(){
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const pixelText = document.getElementById(`x${x}y${y}`)!
            pixelText.onclick = () => {onPixelClicked(pixels[y]![x]!)}
        }
    }
}

function onPixelClicked(pixel: Pixel){
    if (pixel.gameObjectId !== -1){
        onGameObjectClicked(pixel.gameObjectId);
    }
}