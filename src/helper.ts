import { wpmresp } from "./models";

export const generateText = (numbers: boolean, symbols: boolean, brackets: boolean, size:number) : string =>{
    const STORE = {
        letters:"abcdefghijklmnopqrstuvwxyz",
        numbers:"0123456789",
        symbols:"!@#$%^&*`~/?,.",
        brackets:"<>{}[]()"
    };

    let stringstore = "", output = "";
    size = Math.max(30, size);
        stringstore += STORE.letters;

    if(numbers){
        stringstore += STORE.numbers;
    }

    if(symbols){
        stringstore += STORE.symbols;
    }

    if(brackets){
        stringstore += STORE.brackets;
    }

    if(size <= 0 || stringstore.length == 0) return output;

    for(let i = 0;i < size;i++){
        let pos = Math.round(Math.random() * stringstore.length);
        output += stringstore[pos];
    }
    output.replace(/\s+/g, ' ').trim();
    return output;

}

export const matchText = (input: string, target: string) : Array<string> => {
    const ans = [];
    for(let i=0;i <input.length;i++){
        if(input[i] === target[i]){
            ans[i] = "t";
        }else{
            ans[i] = "f";
        }
    }
    
    return ans;
}

export const wpm = ( time : number, words : number, mistakes : number ) : wpmresp =>{
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