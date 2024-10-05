"use client"; // Add this line at the top

import React, { useEffect, useState, useRef } from 'react';
import styles from './result.module.css'
// import Highcharts from 'highcharts';

const Result = ({ data }) => {
    const [wpm, setwpm] = useState([]);
    const [raw_wpm, setrwpm] = useState([]);
    const [accuracy, setaccuracy] = useState([]);
    const [time, settime] = useState([]);

    const box = useRef(null);

    useEffect(() => {
        if(!data) return;
        console.log(data)
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

        // Highcharts.chart('container', {
        //     chart: {
        //         type: 'spline'
        //     },
        //     title: {
        //         text: 'speed and accuracy'
        //     },
        //     subtitle:{
        //         text:"wpm"
        //     },
        //     xAxis: {
        //         categories: secs,
        //         accessibility: {
        //             description: 'Months of the year'
        //         }
        //     },
        //     yAxis: {
        //         title: {
        //             text: 'wpm'
        //         }
        //     },
        //     tooltip: {
        //         crosshairs: true,
        //         shared: true
        //     },
        //     plotOptions: {
        //         spline: {
        //             marker: {
        //                 radius: 4,
        //                 lineColor: '#666666',
        //                 lineWidth: 1
        //             }
        //         }
        //     },
        //     series: [{
        //         name: 'wpm',
        //         data: wpm
        //     },
        //     {
        //         name: 'raw_wpm',
        //         data: raw_wpm
        //     },
        //     {
        //         name: 'accuracy',
        //         data: accuracy
        //     }]
        // });
    }, [ data]);

    const generateGraph =(y : Array<any>, x : Array<any>)=>{
        try {
            if(x.length ==0 || y.length == 0 || !box.current) return;
        const wholeelem = box.current.getBoundingClientRect();
        const maxwidth = wholeelem.width ;
        const dist = Math.round(maxwidth / (x.length+1));
        const maxheight = wholeelem.height ;
        const biggest_wpm = Math.max(...y) + 20;
        const distwpm = Math.round(biggest_wpm/(y.length+1));
        const yval = new Array();
        for(let i=0;i<=biggest_wpm;i+=distwpm){
            yval.push(i);
        }

        y = y.map((i)=>{
            return (i/biggest_wpm) * 100
        })
        const disty = Math.round(maxheight/yval.length) ;
        return (
            <>
                <div
                className={styles.yaxis}
                >
                    {
                        y.map((i,index)=>(
                            <p
                            key={`${index}-y`}
                            style={{
                                position: 'absolute',
                                left: `${(index * dist) + dist}px`,
                                bottom: `${(i/100) * maxheight}px`,
                                height: '4px',
                                width: '4px',
                                borderRadius:'50%',
                                backgroundColor: 'black'
                            }}
                        ></p>
                        ))
                    }
                    {
                        yval.map((i,index)=>(
                            <p
                            style={{
                                position:'absolute',
                                left:'0px',
                                bottom:`${(index * disty) }px`
                            }}
                            key={i+"th ykey"}
                            >{i}</p>
                        ))
                    }
                </div>
                <div 
                style={{
                    position: 'absolute',
                    bottom: '30px',
                    height: '4px',
                    right:'0px',
                    width:`100%`,
                    backgroundColor: 'black'
                }}
                ></div>
                <div 
                style={{
                    position: 'absolute',
                    left: '40px',
                    width: '4px',
                    bottom:"30px",
                    height:`100%`,
                    backgroundColor: 'black'
                }}
                ></div>
                <div className={styles.xaxis}>
                {
                    x.map((i,index)=>(
                        <p
                        style={{
                            position:'absolute',
                            bottom:'0px',
                            left:`${(index * dist) + dist}px`
                        }}
                        key={i+"th xaxiskey"}
                        >{i}</p>
                    ))
                }
                </div>
            </>
        )
        } catch (error) {
            console.log(error);
        }
    }
    

    return (
        <div
            className={styles.graph}
            ref={box}
            >
        {
        data &&  generateGraph(wpm,time)
        }
        </div>
    );
};

export default Result;
