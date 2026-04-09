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

let l: number, r: number;

fileInput.addEventListener('change', startTier)
challenger.addEventListener('click', (event) => { stepSort(true) })
incumbent.addEventListener('click', (event) => { stepSort(false) })

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

    resetSort()
}


function createImg(src: string): HTMLImageElement {
    let img = document.createElement("img")
    img.loading = "lazy"
    img.src = src;
    return img
}

function resetSort() {
    l = 0
    r = tierContainer.childElementCount - 1
}


function stepSort(greater: boolean) {
    console.log("I AM STEWPPIPNG")
    let m = (l + r) >> 1

    console.log(`l ${l} r ${r} m ${m}`)

    if (greater) {
        r = m - 1
    }
    else {
        l = m + 1
    }

    if (r < l) {
        console.log("I AM FALLLINF")
        //if greater >> m+1, else m-1
        let target = m + (greater ? 0 : 1)
        let newImg = createImg(challenger.src)
        tierContainer.insertBefore(newImg, tierContainer.getElementsByTagName('img')[target])
        resetSort()
    }
}


for (let x = 0; x < 20; x++) {
    console.log(`${x}/2`)
    console.log(x >> 1)
}