"use client";
import React, { useEffect, useState, useRef } from 'react';
import styles from './result.module.css';
var Result = function (_a) {
    var data = _a.data, timelimit = _a.timelimit;
    var _b = useState([]), wpm = _b[0], setwpm = _b[1];
    var _c = useState([]), raw_wpm = _c[0], setrwpm = _c[1];
    var _d = useState([]), accuracy = _d[0], setaccuracy = _d[1];
    var _e = useState([]), time = _e[0], settime = _e[1];
    var _f = useState({ h: window.innerHeight / 2, w: window.innerWidth / 1.3, x: 50, y: 50 }), graphsize = _f[0], setsize = _f[1];
    var avgval = useRef({ accuracy: 0 });
    var canvasref = useRef(null);
    useEffect(function () {
        if (!data)
            return;
        var secs = new Array(), w = new Array(), acc = new Array(), raw_w = new Array();
        var wpm = 0, raw = 0, accuracy = 0;
        for (var i = 0; i < data.length; i++) {
            secs.push(i + 1);
            w.push(data[i].wpm);
            acc.push(data[i].accuracy);
            raw_w.push(data[i].raw_wpm);
            accuracy += data[i].accuracy;
        }
        avgval.current.accuracy = Math.max(Math.round(accuracy / acc.length), 0);
        setwpm(w);
        setrwpm(raw_w);
        setaccuracy(acc);
        settime(secs);
    }, [data]);
    useEffect(function () {
        generateGraph();
    }, [wpm, raw_wpm, accuracy, time]);
    useEffect(function () {
        var handleResize = function () {
            setsize({ h: window.innerHeight / 2, w: window.innerWidth, x: 0, y: 100 });
        };
        window.addEventListener("resize", handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    var generateGraphdots = function (context, maxheight, maxgivenwpm, spaceX, height, points, color) {
        try {
            var pos_1 = new Array();
            context.strokeWidth = 2;
            var path_1 = new Path2D();
            points.map(function (i, index) {
                var percentage = Math.round((i / maxgivenwpm) * 100);
                var x = index * spaceX + spaceX;
                var y = height - ((percentage / 100) * maxheight) - 19;
                pos_1.push({ x: x, y: y, i: i });
                if (index === 0) {
                    path_1.moveTo(spaceX, height - 19);
                    path_1.lineTo(x, y);
                }
                if (index > 0) {
                    path_1.lineTo(x, y);
                }
            });
            path_1.lineTo(pos_1[pos_1.length - 1].x, height - 19);
            path_1.lineTo(spaceX, height - 19);
            path_1.closePath();
            context.fillStyle = color;
            context.fill(path_1);
            context.closePath();
            pos_1.map(function (_a, index) {
                var x = _a.x, y = _a.y, i = _a.i;
                context.beginPath();
                context.arc(x, y, i > 0 ? 2 : 1, 0, 2 * Math.PI, false);
                context.fillStyle = 'gold';
                context.fill();
                context.strokeStyle = 'gold';
                context.stroke();
                context.closePath();
                if (index > 0) {
                    context.moveTo(pos_1[index - 1].x, pos_1[index - 1].y);
                    context.lineTo(x, y);
                    context.strokeStyle = 'gold';
                    context.stroke();
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    var generateGraph = function () {
        try {
            if (!canvasref.current)
                return;
            var canvas = canvasref.current;
            var spaceX = (canvas.width / 10) - 3;
            canvas.height = graphsize.h;
            canvas.width = graphsize.w;
            var context = canvas.getContext('2d');
            context.fillStyle = 'rgb(52, 48, 48)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '0.9rem Roboto';
            context.fillStyle = 'gray';
            // write time stamps in x axis
            for (var i = 1; i <= 10; i++) {
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
            var height = canvas.height;
            var number_of_elems = 4;
            var distY = (height - 80) / number_of_elems;
            var valY = void 0;
            var maxgivenwpm = void 0;
            if (raw_wpm.length > 0) {
                maxgivenwpm = Math.max.apply(Math, raw_wpm);
                var maxWpm = (maxgivenwpm / number_of_elems) * number_of_elems;
                valY = Math.round(maxWpm / number_of_elems);
            }
            else {
                maxgivenwpm = 100;
                valY = 10;
            }
            for (var i = 1; i <= number_of_elems; i++) {
                context.beginPath();
                context.fillStyle = 'gray';
                context.fill();
                context.strokeStyle = 'gray';
                context.stroke();
                context.fillStyle = 'gray';
                context.fillText(i * valY, 16, height - i * distY);
            }
            // draw y line
            context.beginPath();
            context.strokeStyle = 'gray';
            context.moveTo(spaceX, graphsize.h - 19);
            context.lineTo(spaceX, 60);
            context.stroke();
            // generate points
            console.log(wpm, raw_wpm);
            var maxheight = canvas.height - 120;
            raw_wpm && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, raw_wpm, '#5b5757');
            wpm && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, wpm, '#3333336e');
        }
        catch (error) {
            console.log(error);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("canvas", { ref: canvasref, height: graphsize.h, width: graphsize.w }),
        React.createElement("div", { className: styles.data },
            React.createElement("div", null,
                "wpm",
                React.createElement("p", null, wpm.length > 0 ? wpm[wpm.length - 1] : 0)),
            React.createElement("div", null,
                "raw",
                React.createElement("p", null, raw_wpm.length > 0 ? raw_wpm[raw_wpm.length - 1] : 0)),
            React.createElement("div", null,
                "accuracy",
                React.createElement("p", null, avgval.current.accuracy)),
            React.createElement("div", null,
                "time",
                React.createElement("p", null, timelimit + "s" || 0 + "s")))));
};
export default Result;
//# sourceMappingURL=result.js.map