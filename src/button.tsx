'use client'
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import { generateText, matchText, wpm } from './helper';
import styles from './index.module.css'
import Result from './result';


const Button = ()=>{


    const [originalText, setoriginal] = useState([]);
    const [inputText, setinput] = useState([]);
    const [textmap, setmap] = useState([]);
    const [show, setshow] = useState(false);
    const [focused, setfocus] = useState(false);
    const [initialtime, setinit] = useState(0);
    const [symbols, setsymbols] = useState(false);
    const [numbers, setnumbers] = useState(false);
    const [time, settime] = useState(true);
    const [reps, setreps] = useState(7);
    const [resultshow, setresult] = useState(false);
    const [details, setdetails] = useState([]);
    const [start, setstart] = useState(false);

    const TextareaRef = useRef(null);
    const currentwordlocation = useRef(0);
    const updateRef = useRef(false);
    const barRef = useRef(null);
    const currenttop = useRef(null);
    const timecount = useRef(0);
    const limitation = useRef(0);
    const mistakes = useRef(0);
    const unitdata = useRef({words:0, mistakes: 0});
    const updatedetails = useRef(false);

    const restart = ()=>{
        try{
            const i = originalText.length;
            const tmap = new Array(i).fill("").map((t,i)=>new Array(originalText[i].length).fill("N"));
            setmap(tmap);
            setinput([""]);
            setstart(false);
            setresult(false);
            currentwordlocation.current = 0;
            updatedetails.current = false;
            updateRef.current = false;
            setdetails([]);
            setinit(0)
            currenttop.current = null;
            setshow(false)
        }catch(err){
            console.log("Error occured while initiating",err);
        }
    }

    const initiate = ()=>{
        try{
            const text = generateText(true, true);
            setoriginal(text);
            const i = text.length;
            const tmap = new Array(i).fill("").map((t,i)=>new Array(text[i].length).fill("N"));
            setmap(tmap);
            setinput([""]);
            setstart(false);
            setresult(false);
            currentwordlocation.current = 0;
            updatedetails.current = false;
            updateRef.current = false;
            setdetails([]);
            setinit(0);
            currenttop.current = null;
            setshow(false);
            unitdata.current.words = 0;
            unitdata.current.mistakes = 0;
        }catch(err){
            console.log("Error occured while initiating",err);
        }
    }

    useEffect(()=>{
        try {
            initiate();
        } catch (error) {
            console.log("Error occured at first UE block.",error);
        }
    },[numbers, symbols])

    useEffect(()=>{
        try {
            if(!updateRef.current) return;
            const {store, wrongwords}  = matchText(inputText, originalText, [...textmap]);
            setmap(store);
            unitdata.current.mistakes = Math.max(wrongwords - mistakes.current, 0 );
            mistakes.current = wrongwords;
        } catch (error) {   
            console.log(error);
        }finally{
            updateRef.current = false;
        }
    },[inputText, originalText, textmap])

    useEffect(()=>{
        try {
            if(!TextareaRef.current  || !barRef.current) return;
                const lines = TextareaRef.current;
                const words = lines?.children;
                if(!words) return;
                const i = currentwordlocation.current;
                const word = words[i]?.children;
                if(!word) return;
                const j = inputText[currentwordlocation.current].length;
                const letter = word[Math.max(j - 1,0)]?.getBoundingClientRect();
                if(!letter) return;
                const bar = barRef.current;
                const top = Math.round(Number(bar.style.top.replace(/px$/, '')));
                const newTop = Math.round(letter.y);
                if(!currenttop.current){
                    currenttop.current += top - newTop;
                    bar.style.top = `${letter.top}px`; 
                }else{
                    if( top !== newTop ){
                        currenttop.current +=  top - newTop;
                        lines.style.top = currenttop.current + "px";
                    }
                }
                if(j === 0){
                    bar.style.left = `${letter.left }px`;
                    
                }else{
                    bar.style.left = `${letter.right}px`;
                }
            
        } catch (error) {
            console.log(error);
        }finally{
            updateRef.current = false;
        }
    },[inputText, originalText, textmap])

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

    const num_options = [20, 40, 80, 160]

    useEffect(()=>{
        timecount.current = initialtime;
        if(!start) return;
        if(initialtime >= reps){
            let data = wpm(initialtime, currentwordlocation.current, mistakes.current );
            console.log(currentwordlocation.current,mistakes.current)
            setdetails(prev=>[...prev,data])
            setresult(true);
            setstart(false);
            setinit(0);
        }else{
            if(updatedetails.current){
                let data = wpm(reps/10, unitdata.current.words, unitdata.current.mistakes );
                unitdata.current.words = 0;
                unitdata.current.mistakes = 0;
                setdetails(prev=>[...prev,data])
                updatedetails.current = false;
            }
        }
    },[initialtime, reps, start])

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
                updatedetails.current = true;
            },1000 );
    
        }
        return ()=>{
            clearInterval(timeid);
        }

        
    } catch (error) {
        console.log(error);
    }
    },[time, start])

    const controller =()=>{
        if(originalText){
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
            <div
            className={styles.graph}
            style={{
                backgroundColor:'rgb(52, 48, 48)'
            }}
            >
            <Result data={details} timelimit={reps} />
            <button  
                htmlFor='textinput'
                onMouseDown={(e) => e.preventDefault()}
            className={styles.btn}
            onClick={async()=>{
                initiate();
            }}>
                reset
            </button>
            </div>
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
                ref={TextareaRef}
                className={styles.textspace}
                htmlFor="textinput"
                >
                    
                    {
                        
                        textmap.map((region,i)=>(
                            <span
                            key={`${i}th checked`}
                            style={{
                                marginRight:"10px",
                            }}
                            >
                            {
                                region.map((p,j)=>(
                                    <span 
                                    key={`${i}${j}th checked`}
                                    style={{
                                        color: p === "N" ? 'gray'  : p === 'T' ? 'white' : 'rgb(186, 66, 66)',
                                        padding:'0px 2px',
                                        fontWeight:'400'
                                    }}
                                    >{!originalText[i][j] ? inputText[i][j] : originalText[i][j]}</span>
                                ))
                            }
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
                    setshow(false);
                }}

                className={styles.textarea}

                onChange={(e)=>{
                    try {
                        if(!start){
                            setstart(true);
                        }
                        setshow(true);
                        switch(e.nativeEvent.inputType){
                            case "insertText":
                                {
                                    updateRef.current = true;
                                    const {data} = e.nativeEvent;
                                    if(data === " "){
                                        const ip = [...inputText];
                                        if(ip[currentwordlocation.current].length < 1) return ;
                                        currentwordlocation.current ++;
                                        unitdata.current.words ++;
                                        ip.push("");
                                        setinput(ip);
                                    }else{
                                        const ip = [...inputText];
                                        let word = ip[currentwordlocation.current];
                                        word += data;
                                        ip[currentwordlocation.current] = word;
                                        setinput(ip);
                                    }
                                }
                            break;
    
                            case "deleteContentBackward":
                                {
                                    updateRef.current = true;
                                    const ip = [...inputText];
                                    let word = ip[currentwordlocation.current];
                                    const map = [...textmap];
                                    map[currentwordlocation.current][word.length -1] = "N";
                                    word = word.slice(0,word.length -1);
                                    ip[currentwordlocation.current] = word;
                                    setinput(ip);
                                    setmap(map);
                                    
                                }
                            break;
    
                            case "deleteWordBackward":
                                {
                                    updateRef.current = true;
                                    const ip = [...inputText];
                                    const map = [...textmap];
                                    map[currentwordlocation.current] = new Array(originalText[currentwordlocation.current].length).fill("N");
                                    if(currentwordlocation.current > 0){
                                        currentwordlocation.current --;
                                        ip.pop();
                                    }else{
                                        ip[currentwordlocation.current] = "";
                                    }
                                    setinput(ip);
                                    setmap(map);
                                }
                            break;
    
                            default:
                                console.log("unidentified case in textarea change: ",e.nativeEvent.inputType);
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    }
                }

                value={inputText}

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
                initiate();
            }}>
                generate
            </button>
            {
                        textmap && 
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