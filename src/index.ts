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
const octagon = document.getElementById("octagon")!

const read_files: string[] = []
// 02 14 34 34 14
const spacing = [0.02, 0.16, 0.5, 0.84, 0.98]
const tierMarkers: HTMLHeadingElement[] = []

let l: number, r: number, m: number;

["S", "A", "B", "C", "D", "F"].forEach(element => {
    let newH2 = document.createElement("h2")
    newH2.innerHTML = element
    newH2.classList.add("tierMark")
    newH2.id = element
    tierMarkers.push(newH2)
    tierContainer.appendChild(newH2)
}); // 2 14 34 34 14 2 spacing

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

    for (let x = 0; x < fileInput.files.length; x++) {
        let url = URL.createObjectURL(fileInput.files[x])
        read_files.push(url)
    }
    // For visual consistency, start the list with the 2nd file
    // >> in list a,b,c this displays [a] vs [b]
    tierContainer.appendChild(createImg(read_files[1]))
    read_files.splice(1, 1)
    resetSort()
}


function createImg(src: string): HTMLImageElement {
    let img = document.createElement("img")
    img.loading = "lazy"
    img.src = src;
    return img
}

function resetSort() {
    if (!read_files.length) {
        octagon.classList.add("hidden")
        return
    }
    l = 0
    r = tierContainer.getElementsByTagName('img').length - 1
    challenger.src = read_files.shift()!
    m = (l + r) >> 1
    incumbent.src = tierContainer.getElementsByTagName('img')[m].src
}


function stepSort(greater: boolean) {
    if (greater) {
        r = m - 1
    }
    else {
        l = m + 1
    }

    if (r < l) {
        let target = m + (greater ? 0 : 1)
        placeImg(target)

        resetSort()
        return
    }
    m = (l + r) >> 1
    incumbent.src = tierContainer.getElementsByTagName('img')[m].src
}

function placeImg(target: number) {
    let newImg = createImg(challenger.src)
    tierContainer.insertBefore(newImg, tierContainer.getElementsByTagName('img')[target])

    // Tier mark placement
    for (let x = 1; x < 6; x++) {
        let space = Math.round(spacing[x - 1] * tierContainer.getElementsByTagName("img").length)
        tierContainer.insertBefore(tierMarkers[x], tierContainer.getElementsByTagName("img")[space])
    }
}