import React from 'react';
interface Typewriterprops {
    custommode: boolean;
    custominput: Array<string> | null | undefined;
}
declare const TyperWriter: React.FC<Typewriterprops>;
export default TyperWriter;
