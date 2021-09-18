import React,{useEffect} from 'react'

export const ShowRecord = (props) => {
    useEffect(
        () => {

        },[props.item]
    )
    return (
        <tr className="">
            <td className="">{props.item.uid ? props.item.uid : ''}</td>
            <td className="">{props.item.show_name}</td>
            <td className="">{props.item.production}</td>
            <button className="ui button" onClick={() => {
               console.log("inside showrec")
               console.log("props.item in showrec: ",props.item)
                let newShow = [
                   props.item.uid,
                    props.item.show_name,
                    props.item.production
                ]
                console.log("new show passed to setcurrentshow: ",newShow)
               props.setCurrentShow(newShow)
                props.setActionsModal(!props.editModal)

                
            } }>
                <i className="bars icon"></i>
            </button>
        </tr>


    )
}