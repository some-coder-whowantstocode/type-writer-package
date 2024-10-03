'use client'
import React, {useState, useEffect, useRef} from 'react';
import { generateText, matchText, wpm } from './helper';
import styles from './index.module.css'


const Button = ()=>{


    const [text, settext] = useState("");
    const [inputtext, setiptext]  = useState("");
    const [checkedtext, checktext] = useState([]);
    const [focused, setfocus] = useState(false);
    const [time, settime] = useState(true);
    const [symbols, setsymbols] = useState(false);
    const [numbers, setnumbers] = useState(false);
    const [brackets, setbrackets] = useState(false);
    const [reps, setreps] = useState(20);
    const [initialtime, setinit] = useState(0);
    const [mistakes, setmistakes] = useState(0);
    const [start, setstart] = useState(false);

    const barRef = useRef(null);
    const lastelem = useRef(null);
    const count = useRef(0);

    const reset = ()=>{
        settext('');
        setiptext("");
        checktext([]);
        let output : string = generateText(numbers, symbols, brackets, reps);
        settext(output);
        setinit(0);
        setmistakes(0);
        setstart(false);
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
        , 
        {
            name:"{} brackets",
            value:brackets,
            func(){
                setbrackets(!brackets);
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

    const num_options = [20, 40, 80, 160]

    useEffect(()=>{
    reset();
    },[numbers, symbols, brackets, time, reps]);

    useEffect(()=>{
        if(initialtime >= reps){
            wpm(initialtime, inputtext.length, mistakes);
            reset();
        }
    },[initialtime, reps])

    useEffect(()=>{
        let timeid;
        if(time && start){
            timeid = setInterval(() => {
                setinit(pervstate => pervstate+1);
            }, 1000);
    
        }
        return ()=>{
            clearInterval(timeid);
        }
    },[time, start])

    useEffect(()=>{
            let output = matchText(inputtext, text);
            checktext(output);
            const elem = lastelem.current;
            const bar = barRef.current;
            const len = Math.max(0, inputtext.length - 1);
            const pos = elem.children[len] && elem.children[len].getBoundingClientRect();
            if(pos){
                if(inputtext.length == 0){
                    bar.style.left = `${pos.left}px`;
                    bar.style.top = `${pos.y}px`;
                }else{
                    // if(bar.style.top !== `${pos.y}px`){
                    //     settext.substring()
                    //     console.log(bar.style.top , `${pos.y}px`)
                    //     console.log(elem.children)
                    // }
                    bar.style.left = `${pos.right}px`;
                    bar.style.top = `${pos.y}px`;
                }
            }
    },[inputtext, text]);

    const controller =()=>{
        return (
            <label
            htmlFor='textinput'
            onMouseDown={(e) => e.preventDefault()}
            className={styles.controller}
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

    return (
        <div
        className={styles.page}
        >
            {
                controller()
            }
            <p>
                {initialtime}
            </p>
            <div
            onMouseDown={(e) => e.preventDefault()}
            className={styles.textfield}>
            <label
            ref={lastelem}
            className={styles.textspace}
            htmlFor="textinput"
            >
                {
                    checkedtext.map((type,i)=>(
                        <span 
                        key={`${i}th checked`}
                        style={{
                            color: type === 't' ? 'white' : 'rgb(186, 66, 66)',
                            paddingLeft:'5px'
                        }}
                        >{text[i] === " " ? inputtext[i] : text[i]}</span>
                    ))
                }
                
                
        {
            text.substring(checkedtext.length).split('').map((elem, i)=>(
                <span
                key={`${i}th text`}
                        style={{
                            paddingLeft:'5px'
                        }}
                >
                    {elem}
                </span>
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
                if(inputtext.length >= text.length){
                    wpm(initialtime, inputtext.length, mistakes);
                    reset();
                    return;
                }
                    if(e.nativeEvent.inputType === "insertText" && e.target.value[count.current] !== text[count.current]){
                        setmistakes(prevstate=>prevstate +1);
                    }
                    count.current += 1;
                    setiptext(e.target.value);
            }}
            value={inputtext}
            name="" 
            ></textarea>
        <button  
            htmlFor='textinput'
            onMouseDown={(e) => e.preventDefault()}
        className={styles.btn}
        onClick={()=>{
            let output : string = generateText(numbers, symbols, brackets, reps);
            settext(output);
            checktext([]);
            setiptext("");
        }}>generate</button>
        {
                    text && 
                    <span
                className={styles.bar}
                ref={barRef}
                >|</span>
                }
        </div>
    )
}

export default Button;