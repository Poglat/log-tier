/*
SPDX-License-Identifier: GPL-3.0-only
Copyright (c) 2026 Poglat
*/

const fileInput = document.getElementById("fileInput")! as HTMLInputElement
const inputSection = document.getElementById("imageSelection")!
const rankSection = document.getElementById("rankImages")!
const tierContainer = document.getElementById("tierContainer")!


const read_files: string[] = []

fileInput.addEventListener('change', startTier)

function startTier() {
    inputSection.hidden = true
    rankSection.hidden = false

    if (fileInput.files) {
        console.log(fileInput.files.length)
        for (let x = 0; x < fileInput.files.length; x++) {
            let url = URL.createObjectURL(fileInput.files[x])
            read_files.push(url)

            createImg(x)
        }
    }
}


function createImg(elementIndex: number) {
    let img = document.createElement("img")
    img.loading = "lazy"
    img.src = read_files[elementIndex];
    tierContainer.appendChild(img)
}
