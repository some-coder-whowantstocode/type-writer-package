"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './result.module.css'

const Result = ({ data, timelimit }) => {
    const [wpm, setwpm] = useState([]);
    const [raw_wpm, setrwpm] = useState([]);
    const [accuracy, setaccuracy] = useState([]);
    const [time, settime] = useState([]);
    const [graphsize, setsize] = useState({h:window.innerHeight /2,w:window.innerWidth/1.3,x:50,y:50})
    const avgval = useRef({accuracy:0});

    const canvasref = useRef(null);

    useEffect(() => {
        if(!data) return;
        const secs = new Array(), w = new Array(), acc = new Array(), raw_w = new Array();
        let wpm=0,raw=0,accuracy=0;
        for(let i=0;i<data.length;i++){
            secs.push(i+1);
            w.push(data[i].wpm);
            acc.push(data[i].accuracy);
            raw_w.push(data[i].raw_wpm);
            accuracy += data[i].accuracy;
        }
        avgval.current.accuracy = Math.max(Math.round(accuracy / acc.length),0);
        setwpm(w);
        setrwpm(raw_w);
        setaccuracy(acc);
        settime(secs);
    }, [ data]);

    useEffect(()=>{
        generateGraph();
    },[wpm, raw_wpm, accuracy, time])

    useEffect(()=>{
        const handleResize =()=>{
            setsize({h:window.innerHeight /2,w:window.innerWidth,x:0,y:100})
        }
        window.addEventListener("resize",handleResize);

        return()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])

    const generateGraphdots = (context, maxheight, maxgivenwpm, spaceX, height, points, color )=>{
        try {
        const pos = new Array();
        context.strokeWidth = 2;
        
        const path = new Path2D();
        points.map((i, index) => {
        const percentage = Math.round((i / maxgivenwpm) * 100);
        const x = index * spaceX + spaceX;
        const y = height - ((percentage / 100) * maxheight) - 19;
        pos.push({ x, y, i });
            
        if (index === 0) {
            path.moveTo(spaceX, height -19)
            path.lineTo(x,y);
        }
        if (index > 0) {
        path.lineTo(x,y);
            
        }
    });
        path.lineTo(pos[pos.length - 1].x , height - 19);
        path.lineTo(spaceX , height  - 19)
        path.closePath();
        context.fillStyle = color
        context.fill(path)
        context.closePath();

        pos.map(({x,y,i},index)=>{
            context.beginPath();
            context.arc(x, y, i >0 ? 2 : 1, 0, 2 * Math.PI, false);
            context.fillStyle = 'gold';
            context.fill();
            context.strokeStyle = 'gold';
            context.stroke();
            context.closePath();
            if(index > 0){
                context.moveTo(pos[index - 1].x, pos[index - 1].y);
                context.lineTo(x, y);
                context.strokeStyle = 'gold';
                context.stroke();
            }
        })

    } catch (error) {
        console.log(error);
    }
    }
    const generateGraph = () => {
        try {
            if (!canvasref.current) return;
            const canvas = canvasref.current;
            const spaceX = (canvas.width/10) -3;
            canvas.height = graphsize.h;
            canvas.width = graphsize.w;
            const context = canvas.getContext('2d');
            context.fillStyle = 'rgb(52, 48, 48)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '0.9rem Roboto';
            context.fillStyle = 'gray';

            // write time stamps in x axis
            
            for (let i = 1; i <= 10; i++) {
            context.beginPath();
            context.fillStyle = 'gold';
            context.fill();
            context.strokeStyle = 'gold';
            context.stroke();
            context.fillStyle = 'gray';
            context.fillText(i, i * spaceX + spaceX - 5, canvas.height);
            }
            
            // draw x line
            context.lineWidth = 1;
            context.beginPath();
            context.strokeStyle = 'gray';
            context.moveTo(spaceX, graphsize.h - 19);
            context.lineTo(graphsize.w - 29, graphsize.h - 19);
            context.stroke();

            // creating y axis
            const height = canvas.height;
            const number_of_elems = 4;
            const distY = (height - 80) / number_of_elems;
            let valY ;
            let maxgivenwpm;
            if(raw_wpm.length > 0){
                maxgivenwpm = Math.max(...raw_wpm) ;
                const maxWpm = (maxgivenwpm / number_of_elems) * number_of_elems;
                valY = Math.round(maxWpm / number_of_elems);
            }else{
                maxgivenwpm = 100;
                valY = 10;
            }
            
            for (let i = 1; i <= number_of_elems; i++) {
            context.beginPath();
            context.fillStyle = 'gray';
            context.fill();
            context.strokeStyle = 'gray';
            context.stroke();
            context.fillStyle = 'gray';
            context.fillText(i * valY, 16, height -  i * distY);
            }
            
            // draw y line
            context.beginPath();
            context.strokeStyle = 'gray';
            context.moveTo(spaceX, graphsize.h - 19);
            context.lineTo(spaceX,  60);
            context.stroke();
            
          // generate points

            console.log(wpm, raw_wpm)
        const maxheight = canvas.height - 120;
        raw_wpm && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, raw_wpm , '#5b5757');
        wpm && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, wpm, '#3333336e' );
        
        } catch (error) {
        console.log(error);
        }

    };
    

    

    return (
        <>
                <canvas 
                ref={canvasref} 
                height={graphsize.h} 
                width={graphsize.w}
                ></canvas>
                <div
                className={styles.data}
                >
                    <div>
                    wpm 
                        <p>
                        {wpm.length > 0 ? wpm[wpm.length -1] : 0}
                        </p>
                    </div>
                    <div>
                    raw 
                        <p>
                        {raw_wpm.length > 0 ? raw_wpm[raw_wpm.length -1] : 0}
                        </p>
                    </div>
                    <div> 
                    accuracy 
                        <p>
                        {avgval.current.accuracy}     
                        </p>
                    </div>
                    <div> 
                    time 
                        <p>
                        {timelimit + "s" || 0 + "s"}
                        </p>
                    </div>
                </div>
                </>
    );
};

export default Result;
