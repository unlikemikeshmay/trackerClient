import React from 'react';

const ToolItem = (props) => {
console.log("items")
/* console.log(props.items) */

return (
<tr className="">
    <td className="">{props.item.uid}</td>
    <td className="">{props.item.toolname}</td>
    <td className="">{props.item.description}</td>
    <td className="">{props.item.lastusersignout}</td>
    <td className="">{props.item.showname}</td>
    <td className="">{props.item.signouttime}</td>
    <td className="">{props.item.currentuserid}</td>
    <td className="">{props.item.lastusersignout}</td>
</tr> 
)
}
export default ToolItem;