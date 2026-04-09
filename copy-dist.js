/*
SPDX-License-Identifier: GPL-3.0-only
Copyright (c) 2026 Poglat
*/

/*
    NOT GOOD!!!!
    this was quickly bodged together
    to create a fully functional dist,
    that does not make the program itself
    fully functional

    There is very likely a SIGNIFICANTLY
    better way to do this, but this is
    atleast "functional" for now

    run with `npm run build`
*/

const fs = require('fs')

if(fs.existsSync("dist")){
fs.rmSync("dist",{recursive: true, force: true})
}

fs.mkdirSync("dist")
fs.mkdirSync("dist/assets")

function copyFiles(target){
    let files=fs.readdirSync(`src${target}`);
    files.forEach(element => {
        if(!element.includes(".") || element.includes(".ts")){
            return
        }
        fs.copyFileSync(`src${target}/${element}`,`dist${target}/${element}`)
    });
}

copyFiles("")
copyFiles("/assets")