'use client';
import english from '../static/english.json' assert { type: 'json' };
export var generateText = function (numbers, symbols) {
    var output = [];
    for (var i = 0; i < 200; i++) {
        var pos = Math.round(Math.random() * (english.words.length - 1));
        output.push(english.words[pos]);
    }
    return output;
};
export var matchText = function (input, target, store) {
    var wrongwords = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== target[i])
            wrongwords++;
        for (var j = 0; j < input[i].length; j++) {
            if (input[i][j] === target[i][j]) {
                store[i][j] = "T";
            }
            else {
                store[i][j] = "F";
            }
        }
    }
    return { store: store, wrongwords: wrongwords };
};
export var wpm = function (time, words, mistakes) {
    try {
        var timeInMinutes = time / 60;
        var raw_wpm = Math.round(words / timeInMinutes) || 0;
        var accuracy = words > 0 ? Math.max(Math.round(((words - mistakes) / words) * 100), 0) : 0;
        var wpm_1 = Math.max(Math.round(raw_wpm * (accuracy / 100)), 0);
        return {
            wpm: wpm_1,
            raw_wpm: raw_wpm,
            accuracy: accuracy,
        };
    }
    catch (error) {
        console.log(error);
    }
};
//# sourceMappingURL=helper.js.map