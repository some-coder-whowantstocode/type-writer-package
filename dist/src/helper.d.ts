interface match {
    store: Array<Array<string>>;
    wrongwords: number;
    total: number;
    correct: number;
}
export declare const generateText: (numbers: boolean, symbols: boolean, size: number) => Array<string>;
export declare const matchText: (input: Array<string>, target: Array<string>, store: Array<Array<string>>) => match;
export declare const wpm: (time: number, correctcharacters: number, totalcharacters: number, all: number, allwrong: number) => {
    wpm: number;
    raw_wpm: number;
    accuracy: number;
};
export {};
