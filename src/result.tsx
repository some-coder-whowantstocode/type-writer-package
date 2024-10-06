"use client"; // Add this line at the top

import React, { useEffect, useState, useRef } from 'react';
import styles from './result.module.css'

const Result = ({ data }) => {
    const [wpm, setwpm] = useState([]);
    const [raw_wpm, setrwpm] = useState([]);
    const [accuracy, setaccuracy] = useState([]);
    const [time, settime] = useState([]);
    const [graphsize, setsize] = useState({h:window.innerHeight /2,w:window.innerWidth,x:0,y:100})

    const box = useRef(null);
    const canvasref = useRef(null);

    useEffect(() => {
        if(!data) return;
        const secs = new Array(), w = new Array(), acc = new Array(), raw_w = new Array();
        for(let i=0;i<data.length;i++){
            secs.push(i+1);
            w.push(data[i].wpm);
            acc.push(data[i].accuracy);
            raw_w.push(data[i].raw_wpm);
        }
        console.log(w,raw_w,acc,secs)
        setwpm(w);
        setrwpm(raw_w);
        setaccuracy(acc);
        settime(secs);

    }, [ data]);

    useEffect(()=>{
        const handleResize =()=>{
            setsize({h:window.innerHeight /2,w:window.innerWidth,x:0,y:100})
        }
        window.addEventListener("resize",handleResize);

        return()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])

    const generateGraph = (x, y, raw_wpm) => {
        try {
        if (!canvasref.current) return;
        const canvas = canvasref.current;
        canvas.height = graphsize.h;
        canvas.width = graphsize.w;
        const context = canvas.getContext('2d');
        context.fillStyle = 'gray';
        context.fillRect(0, 0, canvas.width, canvas.height);
        const distX = (canvas.width - 40) / 11;
        context.font = '1rem Roboto';
        context.fillStyle = 'black';
    
        for (let i = 1; i <= 10; i++) {
            context.beginPath();
            context.arc(i * distX + distX, canvas.height - 19, 2, 0, 2 * Math.PI, false);
            context.fillStyle = 'gold';
            context.fill();
            context.strokeStyle = 'gold';
            context.stroke();
            context.fillStyle = 'black';
            context.fillText(i, i * distX + distX - 5, canvas.height);
        }
    
        context.lineWidth = 2;
        context.beginPath()
        context.strokeStyle = 'gold';
        context.moveTo(59, graphsize.h - 19);
        context.lineTo(graphsize.w -19, graphsize.h - 19);
        context.stroke();
            const distY = (canvas.height - 20) / 10;
            const maxgivenwpm = Math.max(...x);
            const maxWpm = (maxgivenwpm / 10) * 10;
            const valY = Math.round(maxWpm/5) || 10;
            for (let i = 1; i <= 5; i++) {
                context.beginPath();
                context.fillStyle = 'black';
                context.fill();
                context.strokeStyle = 'black';
                context.stroke();
                context.fillStyle = 'black';
                context.fillText(i * valY, 20, canvas.height - (i * distY + distY - 54));
            }
            

        context.beginPath()
        context.strokeStyle = 'black';
        context.moveTo(59, graphsize.h - 19);
        context.lineTo(59, canvas.height /3);
        context.stroke();
    
        //generate points

        const pos = new Array();

        context.strokeWidth = 2;
        x.map((i,index)=>{
            const maxheight = canvas.height/3;
            const percentage = (i /maxgivenwpm) * 100;
            const x = (index * distX) + distX, y = (canvas.height -  (maxheight/ 100) * percentage) - 39;
            pos.push({x,y});
            context.beginPath();
            context.arc(x, y, 2, 0, 2 * Math.PI, false);
            context.fillStyle = 'gold';
            context.fill();
            context.strokeStyle = 'gold';
            context.stroke();
            context.closePath();
            if(index >0){
                // context.beginPath();
                context.moveTo(pos[index-1].x,pos[index-1].y);
                context.lineTo(x,y);
                context.strokeStyle = 'gold';
                context.stroke();
            }
                
            })
            context.closePath();

            const rawpos = new Array();

            raw_wpm.map((i,index)=>{
                const maxheight = canvas.height/3;
                const percentage = (i /maxgivenwpm) * 100;
                const x = (index * distX) + distX, y = (canvas.height -  (maxheight/ 100) * percentage) - 39;
                rawpos.push({x,y});
                context.beginPath();
                context.arc(x, y, 2, 0, 2 * Math.PI, false);
                context.fillStyle = 'darkgray';
                context.fill();
                context.strokeStyle = 'darkgray';
                context.stroke();
                context.closePath();
                if(index >0){
                    context.moveTo(rawpos[index-1].x,rawpos[index-1].y);
                    context.lineTo(x,y);
                    context.strokeStyle = 'darkgray';
                    context.stroke();
                }
                    
                })
            
            context.closePath();
        
        } catch (error) {
            console.log(error)
        }
    };
    

    

    return (
        <div
            className={styles.graph}
            ref={box}
            >
                <canvas 
                ref={canvasref} 
                height={graphsize.h} 
                width={graphsize.w}
                style={{
                    position:'absolute',
                    left:`${graphsize.x}px`,
                    top:`${graphsize.y}px`
                }}
                ></canvas>
        {
        data &&  generateGraph(wpm, time, raw_wpm,)
        }
        </div>
    );
};

export default Result;
