import "../styles/Tasks.css"

interface Props {
    TaskHeading:string,
    TaskDescription:string,
    onClick?: (arg0: any) => any,
    Exit:boolean;
 }

export default function Tasks(props : Props){
    return(
        <div className={`Tasks ${props.Exit?"exit":""}`} onClick={props.onClick} >
            <h2>{props.TaskHeading}</h2>
            <h3>{props.TaskDescription}</h3>
        </div>
    )
}