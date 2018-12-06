import React from "react";
import ReactDom from "react-dom";
import List from "./main";

let temp;
ReactDom.render(<List store={temp} />, document.getElementById("reactcontainer"));