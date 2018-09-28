export const toEllipsis = (text,num) => {
    if(typeof text !== "string"){return};
    return text.length > num ? text.substr(0,num)+'...' : text;
}
export const toPrecent = (val) => {
    return `${(val*100).toFixed(2)}`;
}

export const getType = (obj) =>{
    let origin_type =  Object.prototype.toString.call(obj),
        Type = undefined;
    switch (origin_type){
        case "[object Array]":
            Type = "Array";
            break;
        case "[object Object]":
            Type = "Object";
            break;
        case "[object Function]":
            Type = "Function";
            break;
        case "[object Number]":
            Type = "Number";
            break;
        case "[object String]":
            Type = "String";
            break;
        default:
            Type = undefined;
    }
    return Type;
}