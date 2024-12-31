


export interface ButtonProps{
    varient:"primary" | "secondary",
    size:"sm" | "md" | "lg";
    text:string;
    startIcon?:any;
    endIcon?:any;
    onClick: () =>void;
}

const varientStyles = {
    "primary":"bg-purple-600 text-white",
    "secondary":"bg-purple-400 text-purple-600"
}

export const Button = (props:ButtonProps) => {
    return <button  className={varientStyles[props.varient]}>{props.text}</button>
}