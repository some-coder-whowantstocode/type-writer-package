# @vik_9827/Type-Writer: A Typing Test Component

## Overview

The `type-writer` npm package is a React component designed to provide a typing test experience. It offers customizable options for different typing modes, including letters only, letters with numbers, and symbols. Additionally, it features a timed mode to challenge users. Upon completion, the component displays a graph illustrating typing speed, accuracy, and raw speed.

## Installation

To install the `type-writer` package, use the following command in your terminal:

```bash
npm install @vik_9827/type-writer
```
## Usage

Import the TypeWriter component into your React application:

```bash
import TypeWriter from '@vik_9827/type-writer/dist/bundle';
```

Use the TypeWriter component in your JSX:

```bash
<TypeWriter/>
```
## Features
* Customizable typing modes
* Timed typing tests
* Real-time typing speed and accuracy tracking
* Graph visualization of typing performance
* Adjustable number of repetitions
* customizable design

## Customization Options:
* custommode: Enable this to customize the text block.
* custominput: Provide a custom string to use for the typing test.
* countbytime: Set to true to count by time, false to count by words. Default is time.
* repetition: Set the custom time in seconds (minimum 10, default is 20).


## Passing props
Now, you can add a couple of customizations to the TypeWriter component :

```
    custommode: boolean;
    custominput: string;
    countbytime: boolean;
    repetition: number;
    customStyle: object;
    getdata: function
```

## All available custom styling

* ```bg``` : background color of whole component.
* ```text``` : text color.
* ```correct``` : correct text color in text area. 
* ```wrong``` : background color.
* ```important``` : hihgligting any text or any important text color.
* ```btn_bg``` : background color of all buttons.
* ```btn_txt``` : text color of all buttons.
* ```ctrl_bg``` : background color of the controller for text area.
* ```ctrl_text``` : text color of the controller.
* ```bar_col``` : color of the bar that follows text in text area.

## Example code 

### simple usage


```
"use client"
import TypeWriter from '@vik_9827/type-writer/dist/bundle';

const component =()=>{

    const data=(prop : object)=>{
    console.log(prop);
    }

    return(
        <TypeWriter />
    )
}
```

### Custom usage

```
"use client"
import TypeWriter from '@vik_9827/type-writer/dist/bundle';

const component =()=>{

    const data=(prop : object)=>{
    console.log(prop);
    }

    return(
        <TypeWriter
        custommode={true}
        custominput="Your custom string here"
        countbytime={false}
        repetition={30}
        customStyle={{}}
        getdata={data}
        />
    )
}
```


## Contributing
Contributions to the type-writer package are welcome! Please feel free to submit pull requests or issues on the [GitHub repository](https://github.com/some-coder-whowantstocode/type-writer-package).

## License
This project is licensed under the ``` ISC ``` License.
