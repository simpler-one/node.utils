import {applyExtensions} from "./common"

export function applyAllExtensions() {
    applyExtensions(String.prototype, {
        padLeft,
    })
}

export function padLeft(value, length, padChar=" ") {
    
}
