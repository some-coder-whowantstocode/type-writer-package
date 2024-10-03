import React, { useState, useEffect } from 'react';
import { generateText } from './helper';
var Button = function () {
    var _a = useState(""), text = _a[0], settext = _a[1];
    useEffect(function () {
        var output = generateText(true, false, false, false, 38);
        settext(output);
    }, []);
    return (React.createElement("div", null,
        text,
        React.createElement("button", { onClick: function () {
                var output = generateText(true, false, false, false, 38);
                settext(output);
            } }, "generate")));
};
export default Button;
//# sourceMappingURL=index.js.map