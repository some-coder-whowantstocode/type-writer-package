'use client'
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import { generateText, matchText, wpm } from './helper';
import styles from './index.module.css'
import Result from './result';


const Button = ()=>{


    const [originalText, setoriginal] = useState([]);
    const [inputText, setinput] = useState([]);
    const [textmap, setmap] = useState([]);

    const TextareaRef = useRef(null);
    const currentwordlocation = useRef(0);
    const updateRef = useRef(false);
    const barRef = useRef(null);
    const currenttop = useRef(null);

    const restart = ()=>{

    }

    const initiate = ()=>{
        try{
            const text = generateText(true, true);
            setoriginal(text);
            const i = text.length, j = text[0].length;
            const tmap = new Array(i).fill("").map((t,i)=>new Array(text[i].length).fill("N"));
            setmap(tmap);
            setinput([""]);
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
    },[])

    useEffect(()=>{
        try {
            if(!updateRef.current) return;
            const newmap  = matchText(inputText, originalText, [...textmap]);
            setmap(newmap);
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
                    // bar.style.top = `${letter.top}px`; 
                }
            
        } catch (error) {
            console.log(error);
        }finally{
            updateRef.current = false;
        }
    },[inputText, originalText, textmap])

    // const [text, settext] = useState([]);
    // const [inputtext, setiptext]  = useState([]);
    // const [checkedtext, checktext] = useState([]);
    // const [focused, setfocus] = useState(false);
    // const [time, settime] = useState(true);
    // const [symbols, setsymbols] = useState(false);
    // const [numbers, setnumbers] = useState(false);
    // const [reps, setreps] = useState(20);
    // const [initialtime, setinit] = useState(0);
    // const [start, setstart] = useState(false);
    // const [show, setshow] = useState(false);
    // const [details, setdetails] = useState([]);
    // const [resultshow, setresult] = useState(false);
    // const [currentword, setword] = useState(false);

    // const barRef = useRef(null);
    // const lastelem = useRef(null);
    // const currenttop = useRef(0);
    // const bartop = useRef(0);
    // const mistakes = useRef(0);
    // const timecount = useRef(0);
    // const limitation = useRef(0);
    // // const currentword = useRef("");
    // const lettercount = useRef("");
    // const wordcount = useRef(0);

    // const reset = ()=>{
    //     settext('');
    //     setiptext([]);
    //     checktext([]);
    //     let output : Array<string> = generateText(numbers, symbols);
    //     settext(output);
    //     setinit(0);
    //     timecount.current = 0;
    //     mistakes.current = 0;
    //     limitation.current = 0;
    //     setstart(false);
    //     currenttop.current = 0;
    //     setdetails([]);
    //     lettercount.current = 0;
    //     wordcount.current = 0;
    //     // currentword.current = ""
    //     setword("");
    // }

    // const text_addons = [
    //     {
    //         name:"# numbers",
    //         value:numbers,
    //         func(){
    //             setnumbers(!numbers);
    //         }
    //     }
    //     , 
    //     {
    //         name:"@ symbols",
    //         value:symbols,
    //         func(){
    //             setsymbols(!symbols);
    //         }
    //     }
    // ]

    // const typing_type = [
    //     {
    //         name:'A words',
    //         value:false,
    //         func(){
    //             time && settime(false);
    //         }
    //     },
    //     {
    //         name:'T time',
    //         value:true,
    //         func(){
    //             !time && settime(true);
    //         }
    //     }
    // ]

    // const num_options = [1, 40, 80, 160]

    // useEffect(()=>{
    // reset();
    // },[numbers, symbols , time, reps]);

    // useEffect(()=>{
    //     timecount.current = initialtime;
    //     if(initialtime >= reps){
    //         let data = wpm(initialtime, lettercount.current, mistakes.current);
    //         setdetails(prev=>[...prev,data])
    //         setresult(true);
    //         reset();
    //     }
    // },[initialtime, reps])

  

    // useEffect(()=>{
    //     try {
            
    //     let timeid;
    //     if(time && start){
    //         const countdown = (reps)/10;
    //         timeid = setInterval(() => {
    //             setinit(pervstate => pervstate+1);
    //             limitation.current ++;
    //             if(limitation.current < countdown){
    //                 return;
    //             }
    //             limitation.current = 0;
    //             let data = wpm(timecount.current, lettercount.current, mistakes.current);
    //             setdetails(prev=>[...prev,data])
    //         },1000 );
    
    //     }
    //     return ()=>{
    //         clearInterval(timeid);
    //     }

        
    // } catch (error) {
    //     console.log(error);
    // }
    // },[time, start])

    // useEffect(()=>{
    //     if(text && lastelem.current && barRef.current){
    //         const elem = lastelem.current;
    //         const bar = barRef.current;
    //         const pos = elem.children[0] && elem.children[0].getBoundingClientRect();
    //         if(!pos) return;
    //         bar.style.left = `${pos.left}px`;
    //         !bar.style.top  && (
    //             bar.style.top = `${pos.y}px`,
    //             bartop.current = bar.style.top = `${pos.y}px`
    //         );
    //         elem.style.top = '0px'
    //     }
    // },[text])

    // useEffect(()=>{
    //     try {
    //         let output = matchText(inputtext, text);
    //         checktext(output);
    //         const bar = barRef.current;
    //         const len = lettercount.current;
    //         const elem = lastelem.current;
    //         if(!elem || !len || !bar) return;
    //         const i = wordcount.current 
    //         const word = elem.children[i];
    //         const j = Math.max(currentword.length-1,0)
    //         const pos = word.children[j] && word.children[j]?.getBoundingClientRect();
    //         console.log(word.children)
    //         if(pos ){
    //             if(lettercount.current === 0){
    //                 bar.style.left = `${pos.left}px`;
    //                 bar.style.top = bartop.current;
    //             }else{
    //                 let top = Math.round(Number(bar.style.top.replace(/px$/, ''))), newTop = Math.round(pos.y);
                    // if( top !== newTop ){
                    //     let val = Math.round(Number(elem.style.top.replace(/px$/, '')));
                    //     currenttop.current += top - newTop;
                    //     elem.style.top = currenttop.current + "px";
                    // }
    //                 bar.style.left = `${pos.left}px`;
    //             }
    //         }

            
    //     } catch (error) {
    //         console.log(error)
    //     }
    // },[inputtext, text,currentword]);

    // const controller =()=>{
    //     if(text){
    //         return (
    //             <label
    //             htmlFor='textinput'
    //             onMouseDown={(e) => e.preventDefault()}
    //             className={styles.controller}
    //             style={{
    //                 opacity:`${(show) ? 0 : 1 }`
    //             }}
    //             >
    //                 {
    //                 text_addons.map((elem,i)=>(
    //                     <p
    //                     key={`${i}th addon`}
    //                     style={{
    //                         color:elem.value ? 'yellow' : "gray"
    //                     }}
    //                     onClick={()=>elem.func()}
    //                     >
    //                     {elem.name}
    //                     </p>
    //                 ))
    //                 }
    //                 <p className={styles.bars}></p>
    //                 {
    //                     typing_type.map((elem,i)=>(
    //                         <p
    //                         key={`${i}th type`}
    //                         style={{
    //                             color:elem.value === time ? 'yellow' : "gray"
    //                         }}
    //                         onClick={()=>elem.func()}
    //                         >{elem.name}</p>
    //                     ))
    //                 }
    //                 <p className={styles.bars}></p>
    //                 {
    //                     num_options.map((elem,i)=>(
    //                         <p
    //                         key={`${i}th value`}
    //                         style={{
    //                             color:reps === elem ? "yellow" : "gray",
    //                         }}
    //                         onClick={()=>setreps(elem)}
    //                         >
    //                             {elem}
    //                         </p>
    //                     ))
    //                 }
    //             </label>
    //         )
    //     }
        
    // }

    return (
        <>
        {
            // resultshow ?
            // <Result data={details}/>
            // :
            <div
            className={styles.page}
            
            >
                {/* {
                    controller()
                }
                    <p 
                    style={{
                        opacity:`${(show) ? 1 : 0 }`,
                        color:'gold'
                    }}
                    >
                    {initialtime}
                    </p>  */}
    
                <div
                onMouseDown={(e) => e.preventDefault()}
                // onMouseLeave={(e)=>setshow(false)}
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
                // className={`${styles.textcover} ${focused ? styles.hide : ''}`}
                >
                    click here to continue
                </label>
                </div>
    
                <textarea 
                id='textinput'
                onFocus={()=>{
                    // setfocus(true);
                }}
                onBlur={()=>{
                    // setfocus(false);
                }}
                className={styles.textarea}
                onChange={(e)=>{
                    switch(e.nativeEvent.inputType){
                        case "insertText":
                            {
                                updateRef.current = true;
                                const {data} = e.nativeEvent;
                                if(data === " "){
                                    const ip = [...inputText];
                                    currentwordlocation.current += 1;
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
                                console.log(ip,currentwordlocation.current)
                                setinput(ip);
                                setmap(map);
                            }
                        break;

                        default:
                            console.log("unidentified case in textarea change: ",e.nativeEvent.inputType);
                    }
                    }
                }
                // onChange={(e)=>{
                //     if(!start){
                //         setstart(true);
                //     }
                //     if(!show){
                //         setshow(true)
                //     }
                //         if(e.nativeEvent.inputType === "insertText"){
                //             const ip = [...inputtext];
                //             if(e.nativeEvent.data !== " "){
                //                 let newword = currentword + e.nativeEvent.data;
                //                 setword(newword);
                //                 lettercount.current ++;
                //                 if(ip){
                //                     ip.pop();
                //                     ip.push(newword)
                //                 }
                //             }else{
                //                 lettercount.current = 0;
                //                 if(currentword.length < 1) return;
                //                 if(text[wordcount.current].length > currentword.length){
                //                     lettercount.current += text[wordcount.current].length -  currentword.length;
                //                 }
                //                 setword("");
                //                 wordcount.current ++;
                //                 ip.push("")
                //                 const elem = lastelem.current;
                //                 const bar = barRef.current;
                //                 if(elem && bar){
                //                     const pos = elem.children[wordcount.current ] && elem.children[wordcount.current ]?.getBoundingClientRect();
                //                     bar.style.left = `${pos.left}px`;
                //                 }
                //             }
                            
                //             setiptext(prev=>ip);
                //             }else if(e.nativeEvent.inputType === 'deleteContentBackward' ){
                //             let iptext = [...inputtext];
                //             if(currentword.length === 0){
                //                 iptext.pop();
                //                 setword(iptext[iptext.length -1] || "");
                //                 wordcount.current = Math.max(wordcount.current -1,0);
                //                 lettercount.current = iptext.length
                //             }else if(currentword.length === 1){
                //                 lettercount.current--;
                //                 iptext.pop();
                //                 setword(iptext[iptext.length -1] || "");
                //                 wordcount.current = Math.max(wordcount.current -1,0);
                //             }else{
                //                 lettercount.current--;
                //                 let newword = currentword.slice(0,currentword.length - 1);
                //                 setword(newword);
                //                 iptext.pop();
                //                 iptext.push(newword);
                //             }
                //             setiptext(iptext);
                //         }
                    
                // }}
                value={inputText}
                name="" 
                ></textarea>
            <button  
                htmlFor='textinput'
                onMouseDown={(e) => e.preventDefault()}
            className={styles.btn}
            style={{
                // opacity:`${(show) ? 0 : 1 }`,
            }}
            onClick={async()=>{
                // let output : Array<string> = await generateText(numbers, symbols);
                // settext(output);
                // checktext([]);
                // setiptext("");
                // reset();
            }}>
                generate
            </button>
            {
                        originalText && 
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