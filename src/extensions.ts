declare global {
    interface Number {
        isSuccessful(): boolean;
    }

    interface String {
        isBlankOrNull(): boolean
    }

}

Number.prototype.isSuccessful = function(): boolean {
    return this >= 200 && this < 300
}

String.prototype.isBlankOrNull = function(): boolean {
    return this == "" || this == null
}

export {};
