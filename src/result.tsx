"use client";

import React, { useEffect, useState, useRef } from 'react';
import styles from './result.module.css'

const Result = ({ data, timelimit, styling, setdata }) => {
    const [wpm, setwpm] = useState([]);
    const [raw_wpm, setrwpm] = useState([]);
    const [accuracy, setaccuracy] = useState([]);
    const [time, settime] = useState([]);
    const [graphsize, setsize] = useState({h:window.innerHeight /2,w:window.innerWidth,x:50,y:50})

    const avgval = useRef({accuracy:0});
    const canvasdata = useRef(null);

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
        setdata && setdata({
            wpm: w.length > 0 ? w[w.length -1] : 0,
            raw_wpm: raw_w.length > 0 ? raw_w[raw_w.length -1] : 0,
            accuracy: avgval.current.accuracy,
            time: timelimit + "s" || 0 + "s"
        })
        
    }, [ data]);

    useEffect(()=>{
        generateGraph();
    },[wpm, raw_wpm, accuracy, time])

    useEffect(()=>{
        const handleResize =()=>{
            if(!canvasref.current || !canvasdata.current) return;
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvasdata.current.width;
            tempCanvas.height = canvasdata.current.height;
            const tempContext = tempCanvas.getContext('2d');
            const canvas = canvasref.current;
            const context = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight / 2;
            tempContext.putImageData(canvasdata.current, 0, 0)
            const dataURL = tempCanvas.toDataURL();
            
            const img = new Image();
            img.src = dataURL;
            
            img.onload = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);                
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        }
        window.addEventListener("resize",handleResize);

        return()=>{
            window.removeEventListener('resize',handleResize);
        }
    },[])


    // const  calculateControlPoints =(dataPoints)=> {
    //     const controlPoints = [];
    //     const x0 = dataPoints[0].x;
    //     const y0 = dataPoints[0].y;
    //     for (let i = 1; i < dataPoints.length - 1; i++) {
    //     const x1 = dataPoints[i - 1].x;
    //     const y1 = dataPoints[i - 1].y;
    //     const x2 = dataPoints[i].x;
    //     const y2 = dataPoints[i].y;
    //     const x3 = dataPoints[i + 1].x;
    //     const y3 = dataPoints[i + 1].y;
        
    //       const controlX1 = x1 + 0.5 * (x2 - x0);
    //       const controlY1 = y1 + 0.5 * (y2 - y0);
    //       const controlX2 = x2 + 0.5 * (x3 - x1);
    //       const controlY2 = y2 + 0.5 * (y3 - y1);

            
    //         controlPoints.push([controlX1, controlY1, controlX2, controlY2]);
    //     }
    //     return controlPoints;
    //     }

    const generateGraphdots = (context, maxheight, maxgivenwpm, spaceX, height, points, color )=>{
        try {
        const pos = new Array();
        context.strokeWidth = 2;
        
        const path = new Path2D();
        //color the graph area
        points.length > 0
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

        // draw the points 
        // const controlpoints = calculateControlPoints(pos);
        // console.log('hi',controlpoints)

        pos.map(({x,y,i},index)=>{
            context.beginPath();
            context.arc(x, y, i >0 ? 2 : 1, 0, 2 * Math.PI, false);
            context.fillStyle = styling.important;
            context.fill();
            context.strokeStyle = styling.important;
            context.stroke();
            context.closePath();
            if(index > 0){
                context.moveTo(pos[index - 1].x, pos[index - 1].y);
                context.lineTo(x, y);
                context.strokeStyle = styling.important;
                context.stroke();
            }
        })

        //  draw the lines 
        // context.moveTo(pos[0].x,pos[0].y);
        // for(let i=1;i<pos.length;i++){
        //     const x1 = pos[i - 1].x;
        //     const y1 = pos[i - 1].y;
        //     const x2 = pos[i].x;
        //     const y2 = pos[i].y;
        //     const controlX1 = controlpoints[i - 1][0];
        //     const controlY1 = controlpoints[i - 1][1];
        //     const controlX2 = controlpoints[i][0];
        //     const controlY2 = controlpoints[i][1];
        //     context.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, x2, y2);
        //     context.strokeStyle = 'gold';
        //     context.stroke();
        // }
        // context.closePath();


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
            context.fillStyle = styling.bg;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '0.9rem Roboto';
            context.fillStyle = styling.text;

            // write time stamps in x axis
            
            for (let i = 1; i <= 10; i++) {
            context.beginPath();
            context.fillStyle = styling.important;
            context.fill();
            context.strokeStyle = styling.important;
            context.stroke();
            context.fillStyle = styling.text;
            context.fillText(i, i * spaceX + spaceX - 5, canvas.height);
            }
            
            // draw x line
            context.lineWidth = 1;
            context.beginPath();
            context.strokeStyle = styling.text;
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
            context.fillStyle = styling.text;
            context.fill();
            context.strokeStyle = styling.text;
            context.stroke();
            context.fillStyle = styling.text;
            context.fillText(i * valY, 16, height -  i * distY);
            }
            
            // draw y line
            context.beginPath();
            context.strokeStyle = styling.text;
            context.moveTo(spaceX, graphsize.h - 19);
            context.lineTo(spaceX,  60);
            context.stroke();
            
          // generate points

        const maxheight = canvas.height - 120;
        raw_wpm.length > 0 && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, raw_wpm , '#5b5757');
        wpm.length > 0 && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, wpm, '#3333336e' );
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        canvasdata.current = imageData;
        
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
                    <div
                    style={{
                        color:styling.text
                    }}
                    >
                    wpm 
                        <p
                        style={{
                            color:styling.important
                        }}
                        >
                        {wpm.length > 0 ? wpm[wpm.length -1] : 0}
                        </p>
                    </div>
                    <div
                    style={{
                        color:styling.text
                    }}
                    >
                    raw 
                        <p
                        style={{
                            color:styling.important
                        }}
                        >
                        {raw_wpm.length > 0 ? raw_wpm[raw_wpm.length -1] : 0}
                        </p>
                    </div>
                    <div
                    style={{
                        color:styling.text
                    }}
                    > 
                    accuracy 
                        <p
                        style={{
                            color:styling.important
                        }}
                        >
                        {avgval.current.accuracy}     
                        </p>
                    </div>
                    <div
                    style={{
                        color:styling.text
                    }}
                    > 
                    time 
                        <p
                        style={{
                            color:styling.important
                        }}
                        >
                        {timelimit + "s" || 0 + "s"}
                        </p>
                    </div>
                </div>
                </>
    );
};

export default Result;
