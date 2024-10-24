'use client'
import english from '../static/english.json' assert { type: 'json' };
import number from '../static/number.json' assert { type: 'json' };
import symbol from '../static/symbols.json' assert { type: 'json'};

interface match {
    store: Array<Array<string>>,
    wrongwords: number
}

export const generateText = (numbers: boolean, symbols: boolean, size: number): Array<string> => {
    try {
        const output = [];

        let words = english.words;

        if (numbers) {
            words = [...words, ...number.words];
        }

        if (symbols) {
            words = [...words, ...symbol.words];
        }

        // suffle array
        for (let i = words.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [words[i], words[j]] = [words[j], words[i]];
        }

        const checker = /[\[\]\(\)\{\}\"\'\<\>\`\'\'\'\']/g;
        const symboltest = /[\!\@\#\$\%\^\&\*\-\_\=\+\|\;\"\:\,\.\/\?\~]|(\(\))|(\[\])|(\{\})|(\<\>)|(\'\')|(\`\`)/g;

        for (let i = 0; i < size; i++) {
            let pos = Math.round(Math.random() * (words.length - 1));
            let word: string = words[pos];
            if (symboltest.test(word)) {
                let newpos = Math.round(Math.random() * (english.words.length - 1));
                if (checker.test(word)) {
                    word = word[0] + english.words[newpos] + word[1];
                } else {
                    word += english.words[newpos];
                }
            }
            output.push(word);
        }
        return output;
    } catch (error) {
        console.log(error);
    }
}

export const matchText = (input: Array<string>, target: Array<string>, store: Array<Array<string>>): match => {
    let wrongwords = 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== target[i]) wrongwords++;
        for (let j = 0; j < input[i].length; j++) {
            if (input[i][j] === target[i][j]) {
                store[i][j] = "T";
            } else {
                store[i][j] = "F";
            }
        }
    }
    return { store, wrongwords };
}

export const wpm = (time: number, words: number, mistakes: number) => {
    try {
        const timeInMinutes = time / 60;
        const raw_wpm = Math.round(words / timeInMinutes) || 0;

        const accuracy = words > 0 ? Math.max(Math.round(((words - mistakes) / words) * 100), 0) : 0;

        const mistakePenalty = mistakes > 0 ? Math.max((mistakes / words) * 100, 0) : 0;

        const effective_wpm = Math.max(Math.round(raw_wpm * (accuracy / 100) * ((100 - mistakePenalty) / 100)), 0);

        return {
            wpm: effective_wpm,
            raw_wpm,
            accuracy,
        };
    } catch (error) {
        console.log(error);
    }
};
