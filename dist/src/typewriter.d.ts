import React from 'react';
interface customstyles {
    bg?: string;
    text?: string;
    correct?: string;
    wrong?: string;
    important?: string;
    btn_bg?: string;
    btn_txt?: string;
    ctrl_bg?: string;
    ctrl_text?: string;
    bar_col?: string;
}
interface Typewriterprops {
    custommode?: boolean;
    custominput?: string;
    countbytime?: boolean;
    repetation?: number;
    customStyle?: customstyles;
    setdata?: Function;
}
declare const TyperWriter: React.FC<Typewriterprops>;
export default TyperWriter;
