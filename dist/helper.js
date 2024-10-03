export var generateText = function (letters, numbers, symbols, brackets, size) {
    var STORE = {
        letters: "abcdefghijklmnopqrstuvwxyz",
        numbers: "0123456789",
        symbols: "!@#$%^&*`~/?,.",
        brackets: "<>{}[]()"
    };
    var stringstore = "", output = "";
    if (letters) {
        stringstore += STORE.letters;
    }
    if (numbers) {
        stringstore += STORE.letters;
    }
    if (symbols) {
        stringstore += STORE.letters;
    }
    if (brackets) {
        stringstore += STORE.letters;
    }
    if (size <= 0 || stringstore.length == 0)
        return output;
    for (var i = 0; i < size; i++) {
        var pos = Math.random() * stringstore.length;
        output += stringstore[pos];
    }
    return output;
};
//# sourceMappingURL=helper.js.map