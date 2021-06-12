import {bindThis} from "./common"

export function applyExtension() {
    String.prototype.padLeft = bindThis(padLeft)
}

export function padLeft(value, length, padChar=" ") {
    
}
