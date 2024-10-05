'use client';
import React, { useState, useEffect, useRef } from 'react';
import { generateText, matchText, wpm } from './helper';
import styles from './index.module.css';
var Button = function () {
    var _a = useState(""), text = _a[0], settext = _a[1];
    var _b = useState(""), inputtext = _b[0], setiptext = _b[1];
    var _c = useState([]), checkedtext = _c[0], checktext = _c[1];
    var _d = useState(false), focused = _d[0], setfocus = _d[1];
    var _e = useState(true), time = _e[0], settime = _e[1];
    var _f = useState(false), symbols = _f[0], setsymbols = _f[1];
    var _g = useState(false), numbers = _g[0], setnumbers = _g[1];
    var _h = useState(false), brackets = _h[0], setbrackets = _h[1];
    var _j = useState(20), reps = _j[0], setreps = _j[1];
    var _k = useState(0), initialtime = _k[0], setinit = _k[1];
    var _l = useState(0), mistakes = _l[0], setmistakes = _l[1];
    var _m = useState(false), start = _m[0], setstart = _m[1];
    var barRef = useRef(null);
    var lastelem = useRef(null);
    var count = useRef(0);
    var reset = function () {
        settext('');
        setiptext("");
        checktext([]);
        var output = generateText(numbers, symbols, brackets, reps);
        settext(output);
        setinit(0);
        setmistakes(0);
        setstart(false);
    };
    var text_addons = [
        {
            name: "# numbers",
            value: numbers,
            func: function () {
                setnumbers(!numbers);
            }
        },
        {
            name: "@ symbols",
            value: symbols,
            func: function () {
                setsymbols(!symbols);
            }
        },
        {
            name: "{} brackets",
            value: brackets,
            func: function () {
                setbrackets(!brackets);
            }
        }
    ];
    var typing_type = [
        {
            name: 'A words',
            value: false,
            func: function () {
                time && settime(false);
            }
        },
        {
            name: 'T time',
            value: true,
            func: function () {
                !time && settime(true);
            }
        }
    ];
    var num_options = [20, 40, 80, 160];
    useEffect(function () {
        reset();
    }, [numbers, symbols, brackets, time, reps]);
    useEffect(function () {
        if (initialtime >= reps) {
            wpm(initialtime, inputtext.length, mistakes);
            reset();
        }
    }, [initialtime, reps]);
    useEffect(function () {
        var timeid;
        if (time && start) {
            timeid = setInterval(function () {
                setinit(function (pervstate) { return pervstate + 1; });
            }, 1000);
        }
        return function () {
            clearInterval(timeid);
        };
    }, [time, start]);
    useEffect(function () {
        var output = matchText(inputtext, text);
        checktext(output);
        var elem = lastelem.current;
        var bar = barRef.current;
        var len = Math.max(0, inputtext.length - 1);
        var pos = elem.children[len] && elem.children[len].getBoundingClientRect();
        if (pos) {
            if (inputtext.length == 0) {
                bar.style.left = "".concat(pos.left, "px");
                bar.style.top = "".concat(pos.y, "px");
            }
            else {
                // if(bar.style.top !== `${pos.y}px`){
                //     settext.substring()
                //     console.log(bar.style.top , `${pos.y}px`)
                //     console.log(elem.children)
                // }
                bar.style.left = "".concat(pos.right, "px");
                bar.style.top = "".concat(pos.y, "px");
            }
        }
    }, [inputtext, text]);
    var controller = function () {
        return (React.createElement("label", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles.controller },
            text_addons.map(function (elem, i) { return (React.createElement("p", { key: "".concat(i, "th addon"), style: {
                    color: elem.value ? 'yellow' : "gray"
                }, onClick: function () { return elem.func(); } }, elem.name)); }),
            React.createElement("p", { className: styles.bars }),
            typing_type.map(function (elem, i) { return (React.createElement("p", { key: "".concat(i, "th type"), style: {
                    color: elem.value === time ? 'yellow' : "gray"
                }, onClick: function () { return elem.func(); } }, elem.name)); }),
            React.createElement("p", { className: styles.bars }),
            num_options.map(function (elem, i) { return (React.createElement("p", { key: "".concat(i, "th value"), style: {
                    color: reps === elem ? "yellow" : "gray",
                }, onClick: function () { return setreps(elem); } }, elem)); })));
    };
    return (React.createElement("div", { className: styles.page },
        controller(),
        React.createElement("p", null, initialtime),
        React.createElement("div", { onMouseDown: function (e) { return e.preventDefault(); }, className: styles.textfield },
            React.createElement("label", { ref: lastelem, className: styles.textspace, htmlFor: "textinput" },
                checkedtext.map(function (type, i) { return (React.createElement("span", { key: "".concat(i, "th checked"), style: {
                        color: type === 't' ? 'white' : 'rgb(186, 66, 66)',
                        paddingLeft: '5px'
                    } }, text[i] === " " ? inputtext[i] : text[i])); }),
                text.substring(checkedtext.length).split('').map(function (elem, i) { return (React.createElement("span", { key: "".concat(i, "th text"), style: {
                        paddingLeft: '5px'
                    } }, elem)); })),
            React.createElement("label", { htmlFor: "textinput", className: "".concat(styles.textcover, " ").concat(focused ? styles.hide : '') }, "click here to continue")),
        React.createElement("textarea", { id: 'textinput', onFocus: function () {
                setfocus(true);
            }, onBlur: function () {
                setfocus(false);
            }, className: styles.textarea, onChange: function (e) {
                if (!start) {
                    setstart(true);
                }
                if (e.nativeEvent.inputType === "insertText" && e.target.value[count.current] !== text[count.current]) {
                    setmistakes(function (prevstate) { return prevstate + 1; });
                }
                if (e.nativeEvent.inputType === "insertText" || e.nativeEvent.inputType === 'deleteContentBackward' || e.nativeEvent.inputType === 'deleteWordBackward') {
                    count.current += 1;
                    setiptext(e.target.value);
                }
                if (inputtext.length === text.length) {
                    wpm(initialtime, inputtext.length, mistakes);
                    reset();
                    return;
                }
            }, value: inputtext, name: "" }),
        React.createElement("button", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles.btn, onClick: function () {
                var output = generateText(numbers, symbols, brackets, reps);
                settext(output);
                checktext([]);
                setiptext("");
            } }, "generate"),
        text &&
            React.createElement("span", { className: styles.bar, ref: barRef }, "|")));
};
export default Button;
//# sourceMappingURL=index.js.map