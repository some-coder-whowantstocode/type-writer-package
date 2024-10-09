interface match {
    store: Array<Array<string>>;
    wrongwords: number;
}
export declare const generateText: (numbers: boolean, symbols: boolean) => Array<string>;
export declare const matchText: (input: Array<string>, target: Array<string>, store: Array<Array<string>>) => match;
export declare const wpm: (time: number, words: number, mistakes: number) => {
    wpm: number;
    raw_wpm: number;
    accuracy: number;
};
export {};
