'use client';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useState, useEffect, useRef } from 'react';
import { generateText, matchText, wpm } from './helper';
import styles from './index.module.css';
import Result from './result';
var Button = function () {
    var _a = useState([]), originalText = _a[0], setoriginal = _a[1];
    var _b = useState([]), inputText = _b[0], setinput = _b[1];
    var _c = useState([]), textmap = _c[0], setmap = _c[1];
    var _d = useState(false), show = _d[0], setshow = _d[1];
    var _e = useState(false), focused = _e[0], setfocus = _e[1];
    var _f = useState(0), initialtime = _f[0], setinit = _f[1];
    var _g = useState(false), symbols = _g[0], setsymbols = _g[1];
    var _h = useState(false), numbers = _h[0], setnumbers = _h[1];
    var _j = useState(true), time = _j[0], settime = _j[1];
    var _k = useState(7), reps = _k[0], setreps = _k[1];
    var _l = useState(false), resultshow = _l[0], setresult = _l[1];
    var _m = useState([]), details = _m[0], setdetails = _m[1];
    var _o = useState(false), start = _o[0], setstart = _o[1];
    var TextareaRef = useRef(null);
    var currentwordlocation = useRef(0);
    var updateRef = useRef(false);
    var barRef = useRef(null);
    var currenttop = useRef(null);
    var timecount = useRef(0);
    var limitation = useRef(0);
    var mistakes = useRef(0);
    var unitdata = useRef({ words: 0, mistakes: 0 });
    var updatedetails = useRef(false);
    var restart = function () {
        try {
            var i = originalText.length;
            var tmap = new Array(i).fill("").map(function (t, i) { return new Array(originalText[i].length).fill("N"); });
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
        }
        catch (err) {
            console.log("Error occured while initiating", err);
        }
    };
    var initiate = function () {
        try {
            var text_1 = generateText(true, true);
            setoriginal(text_1);
            var i = text_1.length;
            var tmap = new Array(i).fill("").map(function (t, i) { return new Array(text_1[i].length).fill("N"); });
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
        }
        catch (err) {
            console.log("Error occured while initiating", err);
        }
    };
    useEffect(function () {
        try {
            initiate();
        }
        catch (error) {
            console.log("Error occured at first UE block.", error);
        }
    }, [numbers, symbols]);
    useEffect(function () {
        try {
            if (!updateRef.current)
                return;
            var _a = matchText(inputText, originalText, __spreadArray([], textmap, true)), store = _a.store, wrongwords = _a.wrongwords;
            setmap(store);
            unitdata.current.mistakes = Math.max(wrongwords - mistakes.current, 0);
            mistakes.current = wrongwords;
        }
        catch (error) {
            console.log(error);
        }
        finally {
            updateRef.current = false;
        }
    }, [inputText, originalText, textmap]);
    useEffect(function () {
        var _a, _b;
        try {
            if (!TextareaRef.current || !barRef.current)
                return;
            var lines = TextareaRef.current;
            var words = lines === null || lines === void 0 ? void 0 : lines.children;
            if (!words)
                return;
            var i = currentwordlocation.current;
            var word = (_a = words[i]) === null || _a === void 0 ? void 0 : _a.children;
            if (!word)
                return;
            var j = inputText[currentwordlocation.current].length;
            var letter = (_b = word[Math.max(j - 1, 0)]) === null || _b === void 0 ? void 0 : _b.getBoundingClientRect();
            if (!letter)
                return;
            var bar = barRef.current;
            var top_1 = Math.round(Number(bar.style.top.replace(/px$/, '')));
            var newTop = Math.round(letter.y);
            if (!currenttop.current) {
                currenttop.current += top_1 - newTop;
                bar.style.top = "".concat(letter.top, "px");
            }
            else {
                if (top_1 !== newTop) {
                    currenttop.current += top_1 - newTop;
                    lines.style.top = currenttop.current + "px";
                }
            }
            if (j === 0) {
                bar.style.left = "".concat(letter.left, "px");
            }
            else {
                bar.style.left = "".concat(letter.right, "px");
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            updateRef.current = false;
        }
    }, [inputText, originalText, textmap]);
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
        timecount.current = initialtime;
        if (!start)
            return;
        if (initialtime >= reps) {
            var data_1 = wpm(initialtime, currentwordlocation.current, mistakes.current);
            console.log(currentwordlocation.current, mistakes.current);
            setdetails(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data_1], false); });
            setresult(true);
            setstart(false);
            setinit(0);
        }
        else {
            if (updatedetails.current) {
                var data_2 = wpm(reps / 10, unitdata.current.words, unitdata.current.mistakes);
                unitdata.current.words = 0;
                unitdata.current.mistakes = 0;
                setdetails(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data_2], false); });
                updatedetails.current = false;
            }
        }
    }, [initialtime, reps, start]);
    useEffect(function () {
        try {
            var timeid_1;
            if (time && start) {
                var countdown_1 = (reps) / 10;
                timeid_1 = setInterval(function () {
                    setinit(function (pervstate) { return pervstate + 1; });
                    limitation.current++;
                    if (limitation.current < countdown_1) {
                        return;
                    }
                    limitation.current = 0;
                    updatedetails.current = true;
                }, 1000);
            }
            return function () {
                clearInterval(timeid_1);
            };
        }
        catch (error) {
            console.log(error);
        }
    }, [time, start]);
    var controller = function () {
        if (originalText) {
            return (React.createElement("label", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles.controller, style: {
                    opacity: "".concat((show) ? 0 : 1)
                } },
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
        }
    };
    return (React.createElement(React.Fragment, null, resultshow ?
        React.createElement("div", { className: styles.graph, style: {
                backgroundColor: 'rgb(52, 48, 48)'
            } },
            React.createElement(Result, { data: details, timelimit: reps }),
            React.createElement("button", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles.btn, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        initiate();
                        return [2 /*return*/];
                    });
                }); } }, "reset"))
        :
            React.createElement("div", { className: styles.page },
                controller(),
                React.createElement("p", { style: {
                        opacity: "".concat((show) ? 1 : 0),
                        color: 'gold'
                    } }, initialtime),
                React.createElement("div", { onMouseDown: function (e) { return e.preventDefault(); }, onMouseLeave: function (e) { return setshow(false); }, className: styles.textfield },
                    React.createElement("label", { ref: TextareaRef, className: styles.textspace, htmlFor: "textinput" }, textmap.map(function (region, i) { return (React.createElement("span", { key: "".concat(i, "th checked"), style: {
                            marginRight: "10px",
                        } }, region.map(function (p, j) { return (React.createElement("span", { key: "".concat(i).concat(j, "th checked"), style: {
                            color: p === "N" ? 'gray' : p === 'T' ? 'white' : 'rgb(186, 66, 66)',
                            padding: '0px 2px',
                            fontWeight: '400'
                        } }, !originalText[i][j] ? inputText[i][j] : originalText[i][j])); }))); })),
                    React.createElement("label", { htmlFor: "textinput", className: "".concat(styles.textcover, " ").concat(focused ? styles.hide : '') }, "click here to continue")),
                React.createElement("textarea", { id: 'textinput', onFocus: function () {
                        setfocus(true);
                    }, onBlur: function () {
                        setfocus(false);
                        setshow(false);
                    }, className: styles.textarea, onChange: function (e) {
                        try {
                            if (!start) {
                                setstart(true);
                            }
                            setshow(true);
                            switch (e.nativeEvent.inputType) {
                                case "insertText":
                                    {
                                        updateRef.current = true;
                                        var data = e.nativeEvent.data;
                                        if (data === " ") {
                                            var ip = __spreadArray([], inputText, true);
                                            if (ip[currentwordlocation.current].length < 1)
                                                return;
                                            currentwordlocation.current++;
                                            unitdata.current.words++;
                                            ip.push("");
                                            setinput(ip);
                                        }
                                        else {
                                            var ip = __spreadArray([], inputText, true);
                                            var word = ip[currentwordlocation.current];
                                            word += data;
                                            ip[currentwordlocation.current] = word;
                                            setinput(ip);
                                        }
                                    }
                                    break;
                                case "deleteContentBackward":
                                    {
                                        updateRef.current = true;
                                        var ip = __spreadArray([], inputText, true);
                                        var word = ip[currentwordlocation.current];
                                        var map = __spreadArray([], textmap, true);
                                        map[currentwordlocation.current][word.length - 1] = "N";
                                        word = word.slice(0, word.length - 1);
                                        ip[currentwordlocation.current] = word;
                                        setinput(ip);
                                        setmap(map);
                                    }
                                    break;
                                case "deleteWordBackward":
                                    {
                                        updateRef.current = true;
                                        var ip = __spreadArray([], inputText, true);
                                        var map = __spreadArray([], textmap, true);
                                        map[currentwordlocation.current] = new Array(originalText[currentwordlocation.current].length).fill("N");
                                        if (currentwordlocation.current > 0) {
                                            currentwordlocation.current--;
                                            ip.pop();
                                        }
                                        else {
                                            ip[currentwordlocation.current] = "";
                                        }
                                        setinput(ip);
                                        setmap(map);
                                    }
                                    break;
                                default:
                                    console.log("unidentified case in textarea change: ", e.nativeEvent.inputType);
                            }
                        }
                        catch (error) {
                            console.log(error);
                        }
                    }, value: inputText, name: "" }),
                React.createElement("button", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles.btn, style: {
                        opacity: "".concat((show) ? 0 : 1),
                    }, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            initiate();
                            return [2 /*return*/];
                        });
                    }); } }, "generate"),
                textmap &&
                    React.createElement("span", { className: styles.bar, ref: barRef }, "|"))));
};
export default Button;
//# sourceMappingURL=button.js.map