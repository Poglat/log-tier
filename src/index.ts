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
const tableContainer = document.getElementById("tableContainer")!

const read_files: string[] = []
const spacing = getTierSize(6)
const tierMarkers: HTMLHeadingElement[] = []

let l: number, r: number, m: number;

const DefaultTiers = [["S", "red"], ["A", "orange"], ["B", "yellow"], ["C", "green"], ["D", "aqua"], ["F", "purple"]]

resetMarks()

fileInput.addEventListener('change', startTier)
challenger.addEventListener('click', () => { stepSort(true) })
incumbent.addEventListener('click', () => { stepSort(false) })


function resetMarks() {
    for (let x = 0; x < tierMarkers.length; x++) {
        let element = tierMarkers[0]
        tierContainer.removeChild(element)
    };
    for (let x = 0; x < DefaultTiers.length; x++) {
        let element = DefaultTiers[x]
        addTier(element, spacing[x])
    };
    setTierSize(6)
}


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

    const shuffleIn = document.getElementById("shuffleIn") as HTMLInputElement

    if (shuffleIn.checked) {
        for (let i = read_files.length - 1; i > 0; i--) {
            let rand = Math.floor(Math.random() * (i + 1))
            let b = read_files[i]
            read_files[i] = read_files[rand]
            read_files[rand] = b
        }
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

    placeMarks()
}


function placeMarks() {
    let total = 0
    spacing.forEach(element => {
        total += element
    });
    let percentagePosition = 0
    for (let x = 1; x < tierMarkers.length; x++) {
        percentagePosition += (spacing[x - 1]) / total
        let space = Math.round(percentagePosition * tierContainer.getElementsByTagName("img").length)
        tierContainer.insertBefore(tierMarkers[x], tierContainer.getElementsByTagName("img")[space])
    }
}


function erfApprox(x: number) { // necessary for normal distribution calc
    let val = 1;
    if (x < 0) { // approx only works with x>=0
        val *= -1
        x *= -1
    }
    let t = 1 / (1 + 0.3275911 * x)
    x = (
        1 - (
            0.254829592 * t +
            -0.284496736 * t ** 2 +
            1.421413741 * t ** 3 +
            -1.453152027 * t ** 4 +
            1.061405429 * t ** 5
        ) * Math.E ** -(x ** 2)
    )
    return val * x // fix sign
}


function getSpread(sx: number) {
    return erfApprox(sx / Math.sqrt(2))
}


function getTierSize(tiers: number): number[] {
    const sx_range = 3
    // Greater range means accurately representing normal distribution, largely empty to infinity, with massive central spike
    // Lower range means more equal spread, less truly accurate, more visually accurate to bell curve 

    if (tiers % 2 == 1) {
        // Create evens twice as large, then shrink to even
        const even_size = getTierSize(tiers * 2)
        const odd_sizes = []
        for (let x = 0; x < even_size.length; x += 2) {
            odd_sizes.push(even_size[x] + even_size[x + 1])
        }
        return odd_sizes
    }
    tiers /= 2
    let previous = 0
    let currentRange
    let isolated
    const sizes = []
    let total = 0
    for (let x = 1; x < (tiers + 1); x++) {
        currentRange = getSpread((x / tiers) * sx_range)
        isolated = (currentRange - previous) / 2

        previous = currentRange
        total += isolated

        sizes.push(isolated)
        sizes.unshift(isolated)
    }
    total *= 2
    // Normalize tiers
    for (let x = 0; x < sizes.length; x++) {
        sizes[x] = sizes[x] / total
    }
    return sizes;
}


function setTierSize(tiers: number) {
    while (spacing.length > 0) {
        spacing.pop()
    }

    const newSizes = getTierSize(tiers)

    const settingInput = tableContainer.getElementsByClassName("rowContainer")
    for (let x = 0; x < newSizes.length; x++) {
        spacing.push(newSizes[x])
        let target = settingInput[x + 1].getElementsByTagName("input")[1]
        target.value = newSizes[x].toString()
    }
}


function addTierSetting(rowName: string, color: string, tierSize: number) {
    let settingRow = document.createElement("div")
    settingRow.className = "rowContainer";
    settingRow.innerHTML = `
    <input class="rowName"></input>
    <select class="rowColor">
        <option value="red">Red</option>
        <option value="orange">Orange</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="aqua">Aqua</option>
        <option value="blue">Blue</option>
        <option value="purple">Purple</option>
        <option value="indigo">Indigo</option>
        <option value="gray">Gray</option>
        <option value="white">White</option>
    </select>
    <input class="rowSize"></input>
`
    const title = settingRow.getElementsByTagName("input")[0]
    title.value = rowName
    title.addEventListener("input", (event) => {
        const target = event.target as HTMLInputElement
        const parent = target.parentElement as HTMLDivElement
        const index = Array.from(tableContainer.getElementsByClassName("rowContainer")).indexOf(parent) - 1

        const markTarget = tierContainer.getElementsByClassName("tierMark")[index]
        markTarget.innerHTML = target.value
    })

    const mcColor = settingRow.getElementsByTagName("select")[0]
    mcColor.value = color
    mcColor.addEventListener("change", (event => {
        const target = event.target as HTMLSelectElement
        mcColorChange(target)
    }))

    const size = settingRow.getElementsByTagName("input")[1]
    size.value = tierSize.toString();
    size.addEventListener("input", (event => {
        const target = event.target as HTMLInputElement
        const parent = target.parentElement as HTMLDivElement
        const index = Array.from(tableContainer.getElementsByClassName("rowContainer")).indexOf(parent) - 1

        target.value = enforceNumber(target.value)
        spacing[index] = parseFloat(target.value)
        placeMarks()
    }))

    tableContainer.appendChild(settingRow)
    mcColorChange(mcColor)
}


function mcColorChange(target: HTMLSelectElement) {
    target.className = 'rowColor'
    target.classList.add(target.value)

    const parent = target.parentElement as HTMLDivElement
    const index = Array.from(tableContainer.getElementsByClassName("rowContainer")).indexOf(parent) - 1

    const markTarget = tierContainer.getElementsByClassName("tierMark")[index]
    markTarget.className = "tierMark"
    markTarget.classList.add(target.value)
}


function enforceNumber(sizeValue: string): string {
    const regex = /^[0-9]*\.?[0-9]*$/

    if (!regex.test(sizeValue)) {
        sizeValue = sizeValue.slice(0, -1)
    }
    return sizeValue;
}


function resetTiers() {
    const rowChildren = tableContainer.getElementsByClassName("rowContainer")
    while (rowChildren.length > 1) {
        tableContainer.removeChild(rowChildren[1])
    }

    const headerChildren = tierContainer.getElementsByClassName("tierMark")
    while (headerChildren.length > 0) {
        tierContainer.removeChild(headerChildren[0])
    }

    while (tierMarkers.length > 0) {
        tierMarkers.pop()
    }

    resetMarks()
    placeMarks()
}


function makeCurve() {
    const length = tierMarkers.length
    setTierSize(length)
    placeMarks()
}


function removeTier() {
    const settingsRows = tableContainer.getElementsByClassName("rowContainer")

    if (settingsRows.length <= 1) {
        return
    }
    spacing.pop()
    tableContainer.removeChild(settingsRows[settingsRows.length - 1])

    tierContainer.removeChild(tierMarkers[tierMarkers.length - 1])
    tierMarkers.pop()
    placeMarks()
}


function addTier(nameColor: string[] = ["new", "white"], spacing: number = 0) {
    let newH2 = document.createElement("h2")
    newH2.innerHTML = nameColor[0]
    newH2.classList.add("tierMark")
    tierMarkers.push(newH2)
    tierContainer.insertBefore(newH2, tierContainer.children[0]) // all placed in s position, non s tiers positioned later
    placeMarks() // FIXME: should be run outside of the loop
    addTierSetting(nameColor[0], nameColor[1], spacing)
}