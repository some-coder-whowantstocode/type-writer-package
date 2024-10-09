'use client'
import english from '../static/english.json' assert { type: 'json' };

interface match{
    store:Array<Array<string>>,
    wrongwords:number
}

export const generateText = (numbers: boolean, symbols: boolean ) : Array<string> =>{
    const output = [];

    for(let i = 0;i < 200;i++){
        let pos = Math.round(Math.random() * (english.words.length -1));
        output.push(english.words[pos]);
    }
    return output;

}

export const matchText = (input: Array<string>, target: Array<string>, store: Array<Array<string>>) : match => {
    let wrongwords = 0;
    for(let i=0;i <input.length;i++){
        if(input[i] !== target[i]) wrongwords ++;
        for(let j=0;j<input[i].length;j++){
            if(input[i][j] === target[i][j]){
                store[i][j] = "T";
            }else{
                store[i][j] = "F";
            }
        }
    }
    return {store,wrongwords};
}

export const wpm = (time: number, words: number, mistakes: number) => {
    try {
    const timeInMinutes = time / 60;
    const raw_wpm = Math.round(words / timeInMinutes) || 0;
    const accuracy = words > 0 ? Math.max(Math.round(((words - mistakes) / words) * 100), 0) : 0;
    const wpm = Math.max(Math.round(raw_wpm * (accuracy / 100)), 0);
    return {
        wpm,
        raw_wpm,
        accuracy,
    };
    } catch (error) {
        console.log(error)
    }
    };