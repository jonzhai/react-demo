export const toEllipsis = (text,num) => {
    if(typeof text !== "string"){return};
    return text.length > num ? text.substr(0,num)+'...' : text;
}
export const toPrecent = (val) => {
    return `${(val*100).toFixed(2)}`;
}