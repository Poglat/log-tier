/*
SPDX-License-Identifier: GPL-3.0-only
Copyright (c) 2026 Poglat
*/

const fileInput = document.getElementById("fileInput")! as HTMLInputElement
const inputSection = document.getElementById("imageSelection")!
const rankSection = document.getElementById("rankImages")!
const tierContainer = document.getElementById("tierContainer")!
const challenger = document.getElementById("challenger")! as HTMLImageElement
const incumbent = document.getElementById("incumbent")! as HTMLImageElement

const read_files: string[] = []

fileInput.addEventListener('change', startTier)

function startTier() {
    if (!fileInput.files || fileInput.files.length == 1) {
        alert("You must give atleast 2 images to sort")
        return
    }

    inputSection.hidden = true
    rankSection.hidden = false

    console.log(fileInput.files.length)
    for (let x = 0; x < fileInput.files.length; x++) {
        let url = URL.createObjectURL(fileInput.files[x])
        read_files.push(url)
    }
    // For visual consistency, start the list with the 2nd file
    // in list a,b,c this displays [a] vs [b]
    challenger.src = read_files.shift()!
    incumbent.src = read_files[0]
    tierContainer.appendChild(createImg(read_files.shift()!))
}


function createImg(src: string): HTMLImageElement {
    let img = document.createElement("img")
    img.loading = "lazy"
    img.src = src;
    return img
}
