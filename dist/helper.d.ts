import { wpmresp } from "./models";
export declare const generateText: (numbers: boolean, symbols: boolean, brackets: boolean, size: number) => string;
export declare const matchText: (input: string, target: string) => Array<string>;
export declare const wpm: (time: number, words: number, mistakes: number) => wpmresp;
