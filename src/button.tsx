'use client'
import React, {useState, useEffect, useRef, useCallback} from 'react';
import { generateText, matchText, wpm } from './helper';
import styles from './index.module.css'
import Result from './result';


const Button = ()=>{


    const [text, settext] = useState([]);
    const [inputtext, setiptext]  = useState([]);
    const [checkedtext, checktext] = useState([]);
    const [focused, setfocus] = useState(false);
    const [time, settime] = useState(true);
    const [symbols, setsymbols] = useState(false);
    const [numbers, setnumbers] = useState(false);
    const [reps, setreps] = useState(20);
    const [initialtime, setinit] = useState(0);
    const [start, setstart] = useState(false);
    const [show, setshow] = useState(false);
    const [details, setdetails] = useState([]);
    const [resultshow, setresult] = useState(false);

    const barRef = useRef(null);
    const lastelem = useRef(null);
    const currenttop = useRef(0);
    const bartop = useRef(0);
    const mistakes = useRef(0);
    const inputcount = useRef(0);
    const timecount = useRef(0);
    const limitation = useRef(0);
    const currentword = useRef("");
    const lettercount = useRef("");
    const wordcount = useRef(0);

    const reset = ()=>{
        settext('');
        setiptext([]);
        checktext([]);
        let output : Array<string> = generateText(numbers, symbols);
        settext(output);
        setinit(0);
        timecount.current = 0;
        mistakes.current = 0;
        limitation.current = 0;
        setstart(false);
        currenttop.current = 0;
        setdetails([]);
        lettercount.current = 0;
        wordcount.current = 0;
        currentword.current = ""
    }

    const text_addons = [
        {
            name:"# numbers",
            value:numbers,
            func(){
                setnumbers(!numbers);
            }
        }
        , 
        {
            name:"@ symbols",
            value:symbols,
            func(){
                setsymbols(!symbols);
            }
        }
    ]

    const typing_type = [
        {
            name:'A words',
            value:false,
            func(){
                time && settime(false);
            }
        },
        {
            name:'T time',
            value:true,
            func(){
                !time && settime(true);
            }
        }
    ]

    const num_options = [1, 40, 80, 160]

    useEffect(()=>{
        inputcount.current = inputtext.length;
    },[inputtext])

    useEffect(()=>{
    reset();
    },[numbers, symbols , time, reps]);

    useEffect(()=>{
        timecount.current = initialtime;
        if(initialtime >= reps){
            let data = wpm(initialtime, inputcount.current, mistakes.current);
            setdetails(prev=>[...prev,data])
            setresult(true);
            reset();
        }
    },[initialtime, reps])

  

    useEffect(()=>{
        try {
            
        let timeid;
        if(time && start){
            const countdown = (reps)/10;
            timeid = setInterval(() => {
                setinit(pervstate => pervstate+1);
                limitation.current ++;
                if(limitation.current < countdown){
                    return;
                }
                limitation.current = 0;
                let data = wpm(timecount.current, inputcount.current, mistakes.current);
                setdetails(prev=>[...prev,data])
            },1000 );
    
        }
        return ()=>{
            clearInterval(timeid);
        }

        
    } catch (error) {
        console.log(error);
    }
    },[time, start])

    useEffect(()=>{
        if(text && lastelem.current && barRef.current){
            const elem = lastelem.current;
            const bar = barRef.current;
            const pos = elem.children[0] && elem.children[0].getBoundingClientRect();
            if(!pos) return;
            bar.style.left = `${pos.left}px`;
            !bar.style.top  && (
                bar.style.top = `${pos.y}px`,
                bartop.current = bar.style.top = `${pos.y}px`
            );
            elem.style.top = '0px'
        }
    },[text])

    useEffect(()=>{
        try {
            let output = matchText(inputtext, text);
            checktext(output);
            const bar = barRef.current;
            const len = inputcount.current;
            const elem = lastelem.current;
            if(!elem || !len || !bar) return;
            const i = lettercount.current 
            const pos = elem.children[i] && elem.children[i]?.getBoundingClientRect();
            if(pos ){
                if(inputcount.current === 0){
                    bar.style.left = `${pos.left}px`;
                    bar.style.top = bartop.current;
                }else{
                    let top = Math.round(Number(bar.style.top.replace(/px$/, ''))), newTop = Math.round(pos.y);
                    if( top !== newTop ){
                        let val = Math.round(Number(elem.style.top.replace(/px$/, '')));
                        currenttop.current += top - newTop;
                        elem.style.top = currenttop.current + "px";
                    }
                    bar.style.left = `${pos.left}px`;
                }
            }

            
        } catch (error) {
            console.log(error)
        }
    },[inputtext, text]);

    const controller =()=>{
        if(text){
            return (
                <label
                htmlFor='textinput'
                onMouseDown={(e) => e.preventDefault()}
                className={styles.controller}
                style={{
                    opacity:`${(show) ? 0 : 1 }`
                }}
                >
                    {
                    text_addons.map((elem,i)=>(
                        <p
                        key={`${i}th addon`}
                        style={{
                            color:elem.value ? 'yellow' : "gray"
                        }}
                        onClick={()=>elem.func()}
                        >
                        {elem.name}
                        </p>
                    ))
                    }
                    <p className={styles.bars}></p>
                    {
                        typing_type.map((elem,i)=>(
                            <p
                            key={`${i}th type`}
                            style={{
                                color:elem.value === time ? 'yellow' : "gray"
                            }}
                            onClick={()=>elem.func()}
                            >{elem.name}</p>
                        ))
                    }
                    <p className={styles.bars}></p>
                    {
                        num_options.map((elem,i)=>(
                            <p
                            key={`${i}th value`}
                            style={{
                                color:reps === elem ? "yellow" : "gray",
                            }}
                            onClick={()=>setreps(elem)}
                            >
                                {elem}
                            </p>
                        ))
                    }
                </label>
            )
        }
        
    }

    return (
        <>
        {
            resultshow ?
            <Result data={details}/>
            :
            <div
            className={styles.page}
            
            >
                {
                    controller()
                }
                    <p 
                    style={{
                        opacity:`${(show) ? 1 : 0 }`,
                        color:'gold'
                    }}
                    >
                    {initialtime}
                    </p> 
    
                <div
                onMouseDown={(e) => e.preventDefault()}
                onMouseLeave={(e)=>setshow(false)}
                className={styles.textfield}>
                <label
                ref={lastelem}
                className={styles.textspace}
                htmlFor="textinput"
                >
                    
                    {
                        
                        checkedtext.map((type,i)=>(
                            <>
                            {
                                text[i].length > type.length 
                                ?
                                text[i].split('').map((t,j)=>(
                                    <span 
                                    key={`${i}${j}th checked`}
                                    style={{
                                        color: type.length > j ? type[j] === 't' ? 'white' : 'rgb(186, 66, 66)' : 'gray',
                                        marginRight: j=== text[i].length -1 && "10px",
                                        marginLeft: j=== 0 && "10px"
                                    }}
                                    >{!text[i][j] ? inputtext[i][j] : text[i][j]}</span>
                                ))
                                :
                                type.map((t,j)=>(
                                    <span 
                                    key={`${i}${j}th checkedeee`}
                                    style={{
                                        color: t === 't' ? 'white' : 'rgb(186, 66, 66)',
                                        marginRight: j=== text[i].length -1 && "10px",
                                        marginLeft: j=== 0 && "10px"
                                    }}
                                    >{!text[i][j] ? inputtext[i][j] : text[i][j]}</span>
                                ))
                            }
                            </>
                        ))
                    }
                    
                    
            {
                text.slice(Math.max(0,checkedtext.length),text.length).map((elem, i)=>(
                    <>
                    {
                        elem.split('').map((l,j)=>(
                            <span
                            key={`${i}${j}th text`}
                            style={{
                                marginRight: j=== text[i].length -1 && "10px",
                                marginLeft: j=== 0 && "10px"
                            }}
                            >
                                {l}
                            </span>
                        ))
                    }
                   
                    </>
                    
                ))            
            }
                    
                </label>
                <label
                htmlFor="textinput"   
                className={`${styles.textcover} ${focused ? styles.hide : ''}`}
                >
                    click here to continue
                </label>
                </div>
    
                <textarea 
                id='textinput'
                onFocus={()=>{
                    setfocus(true);
                }}
                onBlur={()=>{
                    setfocus(false);
                }}
                className={styles.textarea}
                onChange={(e)=>{
                    if(!start){
                        setstart(true);
                    }
                    if(!show){
                        setshow(true)
                    }
                        if(e.nativeEvent.inputType === "insertText"){
                            const ip = [...inputtext];
                            if(e.nativeEvent.data === " "){
                                if(currentword.current.length < 1) return;
                                if(text[wordcount.current].length > currentword.current.length){
                                    lettercount.current += text[wordcount.current].length -  currentword.current.length;
                                }
                                currentword.current = "";
                                wordcount.current ++;
                                ip.push(currentword.current)
                                const elem = lastelem.current;
                                const bar = barRef.current;
                                if(elem && bar){
                                    console.log(lettercount.current)
                                    const pos = elem.children[lettercount.current ] && elem.children[lettercount.current ]?.getBoundingClientRect();
                                    bar.style.left = `${pos.right}px`;
                                }
                            }else{
                                lettercount.current ++;
                                currentword.current += e.nativeEvent.data;
                                // if(currentword.current.length < text[inputcount.])
                                if(ip)
                                    ip.pop();
                                    ip.push(currentword.current)
                            }
                            // if(text[inputtext.length-1].startsWith(inputtext[inputtext.length-1])){
                            //     mistakes.current +=1;
                            // }
                            setiptext(ip);
                            }else if(e.nativeEvent.inputType === 'deleteContentBackward' ){
                            let iptext = [...inputtext];
                            const word = iptext[iptext.length-1];
                            lettercount.current--;
                            if(word.length === 0){
                                iptext.pop();
                                currentword.current = iptext[iptext.length-1]
                            }else{
                                currentword.current = currentword.current.slice(0,currentword.current.length - 1)
                                iptext.pop();
                                iptext.push(currentword.current)
                            }
                            
                            setiptext(iptext);
                        }
                    
                }}
                value={inputtext}
                name="" 
                ></textarea>
            <button  
                htmlFor='textinput'
                onMouseDown={(e) => e.preventDefault()}
            className={styles.btn}
            style={{
                opacity:`${(show) ? 0 : 1 }`,
            }}
            onClick={async()=>{
                let output : Array<string> = await generateText(numbers, symbols);
                settext(output);
                checktext([]);
                setiptext("");
                reset();
            }}>
                generate
            </button>
            {
                        text && 
                        <span
                    className={styles.bar}
                    ref={barRef}
                    >
                        |
                    </span>
                    }
            </div>
        }
        </>
    )
}

export default Button;