'use client'
import english from '../static/english.json' assert { type: 'json' };


export const generateText = (numbers: boolean, symbols: boolean ) : Array<string> =>{
    const output = [];

    for(let i = 0;i < 200;i++){
        let pos = Math.round(Math.random() * (english.words.length -1));
        output.push(english.words[pos]);
    }
    return output;

}

export const matchText = (input: Array<string>, target: Array<string>, store: Array<Array<string>>) : Array<Array<string>> => {
    for(let i=0;i <input.length;i++){
        for(let j=0;j<input[i].length;j++){
            if(input[i][j] === target[i][j]){
                store[i][j] = "T";
            }else{
                store[i][j] = "F";
            }
        }
    }
    return store;
}

export const wpm = ( time : number, words : number, mistakes : number )  =>{
    const time_in_minute = time / 60;
    const raw_wpm : number = Math.round(words / time_in_minute) || 0;
    const accuracy : number =  Math.round(((words - mistakes) / words) * 100) || 0;
    const wpm : number = raw_wpm * (accuracy/100);
    return {
        wpm,
        raw_wpm,
        accuracy
    }
}