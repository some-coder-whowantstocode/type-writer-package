'use client'
import english from '../static/english.json' assert { type: 'json' };
import number from '../static/number.json' assert { type: 'json' };
import symbol from '../static/symbols.json' assert { type: 'json'};

interface match {
    store: Array<Array<string>>,
    wrongwords: number,
    total:number,
    correct:number
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
    let wrongwords = 0, total = 0, correct= 0;
    for (let i = 0; i < input.length; i++) {
        if (input[i] !== target[i]) wrongwords++;
        for (let j = 0; j < input[i].length; j++) {
            total++;
            if (input[i][j] === target[i][j]) {
                correct++;
                store[i][j] = "T";
            } else {
                store[i][j] = "F";
            }
        }
    }
    return { store, wrongwords, total, correct };
}

export const wpm = (time: number, correctcharacters: number, totalcharacters:number, all:number, allwrong:number) => {
    try {
        const timeInMinutes = time/60;
        const raw_wpm = Math.round((totalcharacters/5) / timeInMinutes) || 0;
        const accuracy = Math.round(((all - allwrong)/all) * 100) || 0 ;

        const effective_wpm = Math.round((correctcharacters/5) / timeInMinutes) || 0;

        return {
            wpm: effective_wpm,
            raw_wpm,
            accuracy,
        };
    } catch (error) {
        console.log(error);
    }
};
