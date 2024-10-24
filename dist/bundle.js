import React, { useState, useRef, useEffect } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
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
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var name$2 = "english";
var noLazyMode$2 = true;
var orderedByFrequency$2 = true;
var words$2 = [
	"the",
	"be",
	"of",
	"and",
	"a",
	"to",
	"in",
	"he",
	"have",
	"it",
	"that",
	"for",
	"they",
	"I",
	"with",
	"as",
	"not",
	"on",
	"she",
	"at",
	"by",
	"this",
	"we",
	"you",
	"do",
	"but",
	"from",
	"or",
	"which",
	"one",
	"would",
	"all",
	"will",
	"there",
	"say",
	"who",
	"make",
	"when",
	"can",
	"more",
	"if",
	"no",
	"man",
	"out",
	"other",
	"so",
	"what",
	"time",
	"up",
	"go",
	"about",
	"than",
	"into",
	"could",
	"state",
	"only",
	"new",
	"year",
	"some",
	"take",
	"come",
	"these",
	"know",
	"see",
	"use",
	"get",
	"like",
	"then",
	"first",
	"any",
	"work",
	"now",
	"may",
	"such",
	"give",
	"over",
	"think",
	"most",
	"even",
	"find",
	"day",
	"also",
	"after",
	"way",
	"many",
	"must",
	"look",
	"before",
	"great",
	"back",
	"through",
	"long",
	"where",
	"much",
	"should",
	"well",
	"people",
	"down",
	"own",
	"just",
	"because",
	"good",
	"each",
	"those",
	"feel",
	"seem",
	"how",
	"high",
	"too",
	"place",
	"little",
	"world",
	"very",
	"still",
	"nation",
	"hand",
	"old",
	"life",
	"tell",
	"write",
	"become",
	"here",
	"show",
	"house",
	"both",
	"between",
	"need",
	"mean",
	"call",
	"develop",
	"under",
	"last",
	"right",
	"move",
	"thing",
	"general",
	"school",
	"never",
	"same",
	"another",
	"begin",
	"while",
	"number",
	"part",
	"turn",
	"real",
	"leave",
	"might",
	"want",
	"point",
	"form",
	"off",
	"child",
	"few",
	"small",
	"since",
	"against",
	"ask",
	"late",
	"home",
	"interest",
	"large",
	"person",
	"end",
	"open",
	"public",
	"follow",
	"during",
	"present",
	"without",
	"again",
	"hold",
	"govern",
	"around",
	"possible",
	"head",
	"consider",
	"word",
	"program",
	"problem",
	"however",
	"lead",
	"system",
	"set",
	"order",
	"eye",
	"plan",
	"run",
	"keep",
	"face",
	"fact",
	"group",
	"play",
	"stand",
	"increase",
	"early",
	"course",
	"change",
	"help",
	"line"
];
var english = {
	name: name$2,
	noLazyMode: noLazyMode$2,
	orderedByFrequency: orderedByFrequency$2,
	words: words$2
};

var name$1 = "numbers";
var noLazyMode$1 = true;
var orderedByFrequency$1 = true;
var words$1 = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10",
	"11",
	"12",
	"13",
	"14",
	"15",
	"16",
	"17",
	"18",
	"19",
	"20",
	"21",
	"22",
	"23",
	"24",
	"25",
	"26",
	"27",
	"28",
	"29",
	"30",
	"31",
	"32",
	"33",
	"34",
	"35",
	"36",
	"37",
	"38",
	"39",
	"40",
	"41",
	"42",
	"43",
	"44",
	"45",
	"46",
	"47",
	"48",
	"49",
	"50",
	"51",
	"52",
	"53",
	"54",
	"55",
	"56",
	"57",
	"58",
	"59",
	"60",
	"61",
	"62",
	"63",
	"64",
	"65",
	"66",
	"67",
	"68",
	"69",
	"70",
	"71",
	"72",
	"73",
	"74",
	"75",
	"76",
	"77",
	"78",
	"79",
	"80",
	"81",
	"82",
	"83",
	"84",
	"85",
	"86",
	"87",
	"88",
	"89",
	"90",
	"91",
	"92",
	"93",
	"94",
	"95",
	"96",
	"97",
	"98",
	"99",
	"100",
	"123",
	"124",
	"125",
	"126",
	"127",
	"128",
	"129",
	"130",
	"131",
	"132",
	"133",
	"134",
	"135",
	"136",
	"137",
	"138",
	"139",
	"140",
	"141",
	"142",
	"143",
	"144",
	"145",
	"146",
	"147",
	"148",
	"149",
	"150",
	"151",
	"152",
	"153",
	"154",
	"155",
	"156",
	"157",
	"158",
	"159",
	"160",
	"161",
	"162",
	"163",
	"164",
	"165",
	"166",
	"167",
	"168",
	"169",
	"170",
	"171",
	"172",
	"173",
	"174",
	"175",
	"176",
	"177",
	"178",
	"179",
	"180",
	"181",
	"182",
	"2nd",
	"3rd",
	"4th",
	"5th",
	"6th",
	"7th",
	"8th",
	"9th",
	"10th",
	"11th",
	"12th",
	"13th",
	"14th",
	"15th",
	"16th",
	"17th",
	"18th",
	"19th",
	"20th",
	"21st",
	"22nd",
	"23rd",
	"24th",
	"25th",
	"26th",
	"27th",
	"28th",
	"29th",
	"30th",
	"31st",
	"32nd",
	"33rd",
	"34th",
	"35th",
	"36th",
	"37th",
	"38th",
	"39th",
	"40th",
	"41st",
	"183",
	"184",
	"185",
	"186",
	"187",
	"188",
	"189",
	"190",
	"191",
	"192",
	"193",
	"194",
	"195",
	"196",
	"197",
	"198",
	"199",
	"200",
	"42nd",
	"43rd",
	"44th",
	"45th",
	"46th",
	"47th",
	"48th",
	"49th",
	"101",
	"102",
	"103",
	"104",
	"105",
	"106",
	"107",
	"108",
	"109",
	"110",
	"111",
	"112",
	"113",
	"114",
	"115",
	"116",
	"117",
	"118",
	"119",
	"120",
	"121",
	"122",
	"50th",
	"51st",
	"52nd",
	"53rd",
	"54th",
	"55th",
	"56th",
	"57th",
	"58th",
	"59th",
	"60th"
];
var number = {
	name: name$1,
	noLazyMode: noLazyMode$1,
	orderedByFrequency: orderedByFrequency$1,
	words: words$1
};

var name = "numbers";
var noLazyMode = true;
var orderedByFrequency = true;
var words = [
	"!",
	"@",
	"#",
	"$",
	"%",
	"^",
	"&",
	"*",
	"()",
	"-",
	"_",
	"=",
	"+",
	"[]",
	"{}",
	"|",
	"\\",
	";",
	":",
	"''",
	"\"",
	",",
	".",
	"/",
	"<>",
	"?",
	"``",
	"~"
];
var symbol = {
	name: name,
	noLazyMode: noLazyMode,
	orderedByFrequency: orderedByFrequency,
	words: words
};

var generateText = function (numbers, symbols, size) {
    var _a;
    try {
        var output = [];
        var words = english.words;
        if (numbers) {
            words = __spreadArray(__spreadArray([], words, true), number.words, true);
        }
        if (symbols) {
            words = __spreadArray(__spreadArray([], words, true), symbol.words, true);
        }
        // suffle array
        for (var i = words.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [words[j], words[i]], words[i] = _a[0], words[j] = _a[1];
        }
        var checker = /[\[\]\(\)\{\}\"\'\<\>\`\'\'\'\']/g;
        var symboltest = /[\!\@\#\$\%\^\&\*\-\_\=\+\|\;\"\:\,\.\/\?\~]|(\(\))|(\[\])|(\{\})|(\<\>)|(\'\')|(\`\`)/g;
        for (var i = 0; i < size; i++) {
            var pos = Math.round(Math.random() * (words.length - 1));
            var word = words[pos];
            if (symboltest.test(word)) {
                var newpos = Math.round(Math.random() * (english.words.length - 1));
                if (checker.test(word)) {
                    word = word[0] + english.words[newpos] + word[1];
                }
                else {
                    word += english.words[newpos];
                }
            }
            output.push(word);
        }
        return output;
    }
    catch (error) {
        console.log(error);
    }
};
var matchText = function (input, target, store) {
    var wrongwords = 0;
    for (var i = 0; i < input.length; i++) {
        if (input[i] !== target[i])
            wrongwords++;
        for (var j = 0; j < input[i].length; j++) {
            if (input[i][j] === target[i][j]) {
                store[i][j] = "T";
            }
            else {
                store[i][j] = "F";
            }
        }
    }
    return { store: store, wrongwords: wrongwords };
};
var wpm = function (time, words, mistakes) {
    try {
        var timeInMinutes = time / 60;
        var raw_wpm = Math.round(words / timeInMinutes) || 0;
        var accuracy = words > 0 ? Math.max(Math.round(((words - mistakes) / words) * 100), 0) : 0;
        var mistakePenalty = mistakes > 0 ? Math.max((mistakes / words) * 100, 0) : 0;
        var effective_wpm = Math.max(Math.round(raw_wpm * (accuracy / 100) * ((100 - mistakePenalty) / 100)), 0);
        return {
            wpm: effective_wpm,
            raw_wpm: raw_wpm,
            accuracy: accuracy,
        };
    }
    catch (error) {
        console.log(error);
    }
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z$1 = ".index-module_page__e4R6n{\r\n    padding: 0;\r\n    margin: 0;\r\n    height: 100vh;\r\n    overflow-x: hidden;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    background-color: rgb(59, 59, 59);\r\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    position: relative;\r\n}\r\n\r\n.index-module_part__mxzWF{\r\n    overflow-x: hidden;\r\n    display: flex;\r\n    align-items: center;\r\n    flex-direction: column;\r\n    background-color: rgb(59, 59, 59);\r\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n    position: relative;\r\n    height: fit-content;\r\n}\r\n\r\n.index-module_graph__Kjafh{\r\n    height: 100vh;\r\n    width: 100vw;\r\n    position: absolute;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 100000;\r\n}\r\n\r\n.index-module_controller__sU6yo{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    border-radius: 0.7rem;\r\n    font-size: 0.8rem;\r\n    margin: 6rem 0 2rem 0rem;\r\n}\r\n\r\n.index-module_controller__sU6yo p{\r\n    margin: 0.5rem;\r\n    cursor: pointer;\r\n    box-sizing: border-box;\r\n}\r\n\r\n.index-module_textfield__Twesk{\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    flex-direction: column;\r\n    position: relative;\r\n    overflow: hidden;\r\n    box-shadow: inset 0px 1px 6px 0px rgb(52, 48, 48);\r\n    width: 100vw;\r\n\r\n}\r\n\r\n.index-module_textarea__cMW-q{\r\n    opacity: 0;\r\n    height: 0;\r\n    width: 0;\r\n}\r\n\r\n.index-module_textspace__kRbNE{\r\n    padding: 1rem;\r\n    margin: 1rem;\r\n    font-size: 1.4rem;\r\n    font-weight: 300;\r\n    word-break:break-all;\r\n    color: rgb(116, 108, 108);\r\n    height:5.2rem;\r\n    position: relative;\r\n    top: 0px;\r\n}\r\n\r\n\r\n.index-module_textcover__OvpTC{\r\n    position: absolute;\r\n    height: 100%;\r\n    width: 100vw;\r\n    color: white;\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: center;\r\n    background-color: rgba(50, 49, 49, 0.817);\r\n}\r\n\r\n.index-module_hide__wk9CD{\r\n    opacity: 0;\r\n}\r\n\r\n.index-module_btn__qo6sS{\r\n    background-color: rgba(81, 114, 152, 0.406);\r\n    color: white;\r\n    border: none;\r\n    padding: 0.5rem 1rem;\r\n    cursor: pointer;\r\n    margin: 1rem 0rem;\r\n    border-radius: 0.7rem;\r\n}\r\n.index-module_btn__qo6sS:hover{\r\n    background-color: rgba(109, 131, 155, 0.406);\r\n}\r\n\r\n.index-module_bar__kSGlx{\r\n    color: rgb(0, 126, 252);\r\n    font-weight: 200;\r\n    font-size: 1.4rem;\r\n    position: absolute;\r\n    transition:all 0.1s ;\r\n}\r\n\r\n.index-module_bars__hL5-Y{\r\n    background-color: gray;\r\n    height: 50%;\r\n    width: 2px;\r\n\r\n}";
var styles$1 = {"page":"index-module_page__e4R6n","part":"index-module_part__mxzWF","graph":"index-module_graph__Kjafh","controller":"index-module_controller__sU6yo","textfield":"index-module_textfield__Twesk","textarea":"index-module_textarea__cMW-q","textspace":"index-module_textspace__kRbNE","textcover":"index-module_textcover__OvpTC","hide":"index-module_hide__wk9CD","btn":"index-module_btn__qo6sS","bar":"index-module_bar__kSGlx","bars":"index-module_bars__hL5-Y"};
styleInject(css_248z$1);

var css_248z = "\r\n.result-module_data__0GyWr{\r\n    display: grid;\r\n    grid-template-columns: auto auto;\r\n    padding: 1rem;\r\n    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\r\n}\r\n.result-module_data__0GyWr div{\r\n    font-size: 1.3rem;\r\n    padding: 1rem 5rem;\r\n    color: gray;\r\n}\r\n.result-module_data__0GyWr div p{\r\n    color: gold;\r\n    font-size: 1.8rem;\r\n}";
var styles = {"data":"result-module_data__0GyWr"};
styleInject(css_248z);

var Result = function (_a) {
    var data = _a.data, timelimit = _a.timelimit, styling = _a.styling, setdata = _a.setdata;
    var _b = useState([]), wpm = _b[0], setwpm = _b[1];
    var _c = useState([]), raw_wpm = _c[0], setrwpm = _c[1];
    var _d = useState([]), accuracy = _d[0], setaccuracy = _d[1];
    var _e = useState([]), time = _e[0], settime = _e[1];
    var _f = useState({ h: window.innerHeight / 2, w: window.innerWidth, x: 50, y: 50 }), graphsize = _f[0]; _f[1];
    var avgval = useRef({ accuracy: 0 });
    var canvasdata = useRef(null);
    var canvasref = useRef(null);
    useEffect(function () {
        if (!data)
            return;
        var secs = new Array(), w = new Array(), acc = new Array(), raw_w = new Array();
        var accuracy = 0;
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
        setdata && setdata({
            wpm: w.length > 0 ? w[w.length - 1] : 0,
            raw_wpm: raw_w.length > 0 ? raw_w[raw_w.length - 1] : 0,
            accuracy: avgval.current.accuracy,
            time: timelimit + "s" || 0 + "s"
        });
    }, [data]);
    useEffect(function () {
        generateGraph();
    }, [wpm, raw_wpm, accuracy, time]);
    useEffect(function () {
        var handleResize = function () {
            if (!canvasref.current || !canvasdata.current)
                return;
            var tempCanvas = document.createElement('canvas');
            tempCanvas.width = canvasdata.current.width;
            tempCanvas.height = canvasdata.current.height;
            var tempContext = tempCanvas.getContext('2d');
            var canvas = canvasref.current;
            var context = canvas.getContext('2d');
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight / 2;
            tempContext.putImageData(canvasdata.current, 0, 0);
            var dataURL = tempCanvas.toDataURL();
            var img = new Image();
            img.src = dataURL;
            img.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
        };
        window.addEventListener("resize", handleResize);
        return function () {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
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
    var generateGraphdots = function (context, maxheight, maxgivenwpm, spaceX, height, points, color) {
        try {
            var pos_1 = new Array();
            context.strokeWidth = 2;
            var path_1 = new Path2D();
            //color the graph area
            points.length > 0;
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
            // draw the points 
            // const controlpoints = calculateControlPoints(pos);
            // console.log('hi',controlpoints)
            pos_1.map(function (_a, index) {
                var x = _a.x, y = _a.y, i = _a.i;
                context.beginPath();
                context.arc(x, y, i > 0 ? 2 : 1, 0, 2 * Math.PI, false);
                context.fillStyle = styling.important;
                context.fill();
                context.strokeStyle = styling.important;
                context.stroke();
                context.closePath();
                if (index > 0) {
                    context.moveTo(pos_1[index - 1].x, pos_1[index - 1].y);
                    context.lineTo(x, y);
                    context.strokeStyle = styling.important;
                    context.stroke();
                }
            });
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
            context.fillStyle = styling.bg;
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.font = '0.9rem Roboto';
            context.fillStyle = styling.text;
            // write time stamps in x axis
            for (var i = 1; i <= 10; i++) {
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
                context.fillStyle = styling.text;
                context.fill();
                context.strokeStyle = styling.text;
                context.stroke();
                context.fillStyle = styling.text;
                context.fillText(i * valY, 16, height - i * distY);
            }
            // draw y line
            context.beginPath();
            context.strokeStyle = styling.text;
            context.moveTo(spaceX, graphsize.h - 19);
            context.lineTo(spaceX, 60);
            context.stroke();
            // generate points
            var maxheight = canvas.height - 120;
            raw_wpm.length > 0 && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, raw_wpm, '#5b5757');
            wpm.length > 0 && generateGraphdots(context, maxheight, maxgivenwpm, spaceX, canvas.height, wpm, '#3333336e');
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            canvasdata.current = imageData;
        }
        catch (error) {
            console.log(error);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("canvas", { ref: canvasref, height: graphsize.h, width: graphsize.w }),
        React.createElement("div", { className: styles.data },
            React.createElement("div", { style: {
                    color: styling.text
                } },
                "wpm",
                React.createElement("p", { style: {
                        color: styling.important
                    } }, wpm.length > 0 ? wpm[wpm.length - 1] : 0)),
            React.createElement("div", { style: {
                    color: styling.text
                } },
                "raw",
                React.createElement("p", { style: {
                        color: styling.important
                    } }, raw_wpm.length > 0 ? raw_wpm[raw_wpm.length - 1] : 0)),
            React.createElement("div", { style: {
                    color: styling.text
                } },
                "accuracy",
                React.createElement("p", { style: {
                        color: styling.important
                    } }, avgval.current.accuracy)),
            React.createElement("div", { style: {
                    color: styling.text
                } },
                "time",
                React.createElement("p", { style: {
                        color: styling.important
                    } }, timelimit + "s" || 0 + "s")))));
};

var TyperWriter = function (_a) {
    var custommode = _a.custommode; _a.float; var custominput = _a.custominput, countbytime = _a.countbytime, repetation = _a.repetation, customStyle = _a.customStyle, setdata = _a.setdata, auto = _a.auto;
    var STYLE = (function () {
        return {
            bg: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.bg) || 'rgb(52, 48, 48)',
            text: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.text) || 'rgb(116, 108, 108)',
            correct: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.correct) || 'rgb(255, 255, 255)',
            wrong: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.wrong) || 'rgb(186, 66, 66)',
            important: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.important) || 'rgb(255, 196, 0)',
            btn_bg: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.important) || 'rgba(81, 114, 152, 0.406)',
            btn_txt: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.important) || 'white',
            ctrl_bg: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.important) || 'rgb(43, 39, 39)',
            ctrl_text: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.important) || 'gray',
            bar_col: (customStyle === null || customStyle === void 0 ? void 0 : customStyle.important) || 'rgb(0, 126, 252)'
        };
    })();
    var _b = useState([]), originalText = _b[0], setoriginal = _b[1];
    var _c = useState([]), inputText = _c[0], setinput = _c[1];
    var _d = useState([]), textmap = _d[0], setmap = _d[1];
    var _e = useState(false), show = _e[0], setshow = _e[1];
    var _f = useState(false), focused = _f[0], setfocus = _f[1];
    var _g = useState(0), initialtime = _g[0], setinit = _g[1];
    var _h = useState(false), symbols = _h[0], setsymbols = _h[1];
    var _j = useState(false), numbers = _j[0], setnumbers = _j[1];
    var _k = useState(true), time = _k[0], settime = _k[1];
    var _l = useState(20), reps = _l[0], setreps = _l[1];
    var _m = useState(false), resultshow = _m[0], setresult = _m[1];
    var _o = useState([]), details = _o[0], setdetails = _o[1];
    var _p = useState(auto ? true : false), start = _p[0], setstart = _p[1];
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
    var paragraphsize = 100;
    var currentparagraphsize = useRef(paragraphsize);
    var num_options = [20, 40, 80, 160];
    var initiate = function () {
        try {
            var text_1;
            if (custommode) {
                countbytime ? settime(countbytime) : settime(true);
                repetation && repetation > 10 ? setreps(repetation) : setreps(20);
                if (custominput)
                    text_1 = custominput.split(' ');
                text_1.length < 10 && (text_1 = generateText(numbers, symbols, paragraphsize));
            }
            else {
                text_1 = generateText(numbers, symbols, paragraphsize);
            }
            setoriginal(text_1);
            var i = text_1.length;
            var tmap = new Array(i).fill("").map(function (t, i) { return new Array(text_1[i].length).fill("N"); });
            setmap(tmap);
            setinput([""]);
            setstart(auto ? true : false);
            setresult(false);
            currentwordlocation.current = 0;
            currentparagraphsize.current = paragraphsize;
            updatedetails.current = false;
            updateRef.current = false;
            setdetails([]);
            setinit(0);
            currenttop.current = null;
            setshow(false);
            unitdata.current.words = 0;
            unitdata.current.mistakes = 0;
            TextareaRef.current.style = "";
            barRef.current.style = "";
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
    }, [numbers, symbols, time, reps]);
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
        if (currentwordlocation.current >= (2 / 3) * currentparagraphsize.current) {
            currentparagraphsize.current += paragraphsize;
            var text_2 = generateText(numbers, symbols, paragraphsize);
            setoriginal(function (prev) { return __spreadArray(__spreadArray([], prev, true), text_2, true); });
            var i = text_2.length;
            var tmap_1 = new Array(i).fill("").map(function (t, i) { return new Array(text_2[i].length).fill("N"); });
            setmap(function (prev) { return __spreadArray(__spreadArray([], prev, true), tmap_1, true); });
        }
    }, [inputText]);
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
    // useEffect(()=>{
    //     setfocus(false);
    // },[resultshow])
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
    useEffect(function () {
        timecount.current = initialtime;
        if (!start)
            return;
        if (initialtime >= reps) {
            var data_1 = wpm(initialtime, currentwordlocation.current, mistakes.current);
            setdetails(function (prev) { return __spreadArray(__spreadArray([], prev, true), [data_1], false); });
            setresult(true);
            setstart(false);
            setinit(0);
        }
        else {
            if (updatedetails.current) {
                var data_2 = wpm(initialtime, currentwordlocation.current, mistakes.current);
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
            return (React.createElement("label", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles$1.controller, style: {
                    opacity: "".concat((show) ? 0 : 1),
                    backgroundColor: STYLE.ctrl_bg
                } },
                text_addons.map(function (elem, i) { return (React.createElement("p", { key: "".concat(i, "th addon"), style: {
                        color: elem.value ? STYLE.important : STYLE.ctrl_text
                    }, onClick: function () { return elem.func(); } }, elem.name)); }),
                React.createElement("p", { className: styles$1.bars }),
                typing_type.map(function (elem, i) { return (React.createElement("p", { key: "".concat(i, "th type"), style: {
                        color: elem.value === time ? STYLE.important : STYLE.ctrl_text
                    }, onClick: function () { return elem.func(); } }, elem.name)); }),
                React.createElement("p", { className: styles$1.bars }),
                num_options.map(function (elem, i) { return (React.createElement("p", { key: "".concat(i, "th value"), style: {
                        color: reps === elem ? STYLE.important : STYLE.ctrl_text,
                    }, onClick: function () { return setreps(elem); } }, elem)); })));
        }
    };
    return (React.createElement(React.Fragment, null,
        resultshow &&
            React.createElement("div", { className: styles$1.graph, style: {
                    backgroundColor: STYLE.bg
                } },
                React.createElement(Result, { data: details, timelimit: reps, styling: STYLE, setdata: setdata }),
                React.createElement("button", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles$1.btn, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            initiate();
                            return [2 /*return*/];
                        });
                    }); } }, "reset")),
        React.createElement("div", { className: "".concat(styles$1.page), style: {
                backgroundColor: STYLE.bg
            } },
            !custommode && controller(),
            React.createElement("p", { style: {
                    opacity: "".concat((show) ? 1 : 0),
                    color: STYLE.important
                } }, initialtime),
            React.createElement("div", { onMouseDown: function (e) { return e.preventDefault(); }, onMouseLeave: function (e) { return setshow(false); }, className: styles$1.textfield },
                React.createElement("label", { ref: TextareaRef, className: styles$1.textspace, htmlFor: "textinput" }, textmap.map(function (region, i) { return (React.createElement("span", { key: "".concat(i, "th checked"), style: {
                        marginRight: "10px",
                    } }, region.map(function (p, j) { return (React.createElement("span", { key: "".concat(i).concat(j, "th checked"), style: {
                        color: p === "N" ? STYLE.text : p === 'T' ? STYLE.correct : STYLE.wrong,
                        padding: '0px 2px',
                        fontWeight: '400'
                    } }, !originalText[i][j] ? inputText[i][j] : originalText[i][j])); }))); })),
                React.createElement("label", { htmlFor: "textinput", className: "".concat(styles$1.textcover, " ").concat(focused ? styles$1.hide : '') }, "click here to continue")),
            React.createElement("textarea", { id: 'textinput', onFocus: function () {
                    setfocus(true);
                }, onBlur: function () {
                    setfocus(false);
                    setshow(false);
                }, className: styles$1.textarea, onChange: function (e) {
                    try {
                        if (resultshow)
                            return;
                        if (!start) {
                            setstart(true);
                        }
                        setshow(true);
                        switch (e.nativeEvent.inputType) {
                            case "insertText":
                                {
                                    updateRef.current = true;
                                    if (!time) {
                                        updatedetails.current = true;
                                    }
                                    var data = e.nativeEvent.data;
                                    if (data === " ") {
                                        if (!time) {
                                            setinit(function (prev) { return prev + 1; });
                                        }
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
                                    if (time) {
                                        updateRef.current = true;
                                        var ip = __spreadArray([], inputText, true);
                                        var word = ip[currentwordlocation.current];
                                        var map = __spreadArray([], textmap, true);
                                        if (word.length > 0) {
                                            map[currentwordlocation.current][word.length - 1] = "N";
                                            word = word.slice(0, word.length - 1);
                                            ip[currentwordlocation.current] = word;
                                        }
                                        else {
                                            currentwordlocation.current--;
                                            ip.pop();
                                        }
                                        setinput(ip);
                                        setmap(map);
                                    }
                                    else {
                                        var ip = __spreadArray([], inputText, true);
                                        var word = ip[currentwordlocation.current];
                                        var map = __spreadArray([], textmap, true);
                                        map[currentwordlocation.current][word.length - 1] = "N";
                                        word = word.slice(0, word.length - 1);
                                        ip[currentwordlocation.current] = word;
                                        setinput(ip);
                                        setmap(map);
                                    }
                                }
                                break;
                            case "deleteWordBackward":
                                {
                                    if (time) {
                                        updateRef.current = true;
                                        var ip = __spreadArray([], inputText, true);
                                        var map = __spreadArray([], textmap, true);
                                        map[currentwordlocation.current] = new Array(originalText[currentwordlocation.current].length).fill("N");
                                        if (currentwordlocation.current > 0) {
                                            if (ip[currentwordlocation.current].length > 0) {
                                                ip[currentwordlocation.current] = "";
                                            }
                                            else {
                                                currentwordlocation.current--;
                                                ip.pop();
                                            }
                                        }
                                        else {
                                            ip[currentwordlocation.current] = "";
                                        }
                                        setinput(ip);
                                        setmap(map);
                                    }
                                    else {
                                        var ip = __spreadArray([], inputText, true);
                                        var map = __spreadArray([], textmap, true);
                                        map[currentwordlocation.current] = new Array(originalText[currentwordlocation.current].length).fill("N");
                                        ip[currentwordlocation.current] = "";
                                        setinput(ip);
                                        setmap(map);
                                    }
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
            !custommode && React.createElement("button", { htmlFor: 'textinput', onMouseDown: function (e) { return e.preventDefault(); }, className: styles$1.btn, style: {
                    opacity: "".concat((show) ? 0 : 1),
                }, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        initiate();
                        return [2 /*return*/];
                    });
                }); } }, "generate"),
            textmap &&
                React.createElement("span", { className: styles$1.bar, ref: barRef }, "|"))));
};

export { TyperWriter as default };
