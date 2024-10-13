export interface customstyles{
    bg?:string,
    text?:string,
    correct?:string,
    wrong?:string,
    important?:string,
    btn_bg?:string,
    btn_txt?:string,
    ctrl_bg?:string,
    ctrl_text?:string,
    bar_col?:string
}

export interface Typewriterprops {
    custommode?: boolean;
    custominput?: string;
    countbytime?: boolean;
    repetation?: number;
    customStyle?: customstyles;
    setdata?: Function;
}
