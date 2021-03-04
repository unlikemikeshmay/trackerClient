import React from 'react';

const ToolItem = (props) => {
console.log("items")
/* console.log(props.items) */

return (
<tr className="">
    <td className="">id</td>
    <td className="">toolname</td>
    <td className="">desc</td>
    <td className="">showname</td>
    <td className="">lastusr</td>
    <td className="">lastusrsigntime</td>
    <td className="">currntuser</td>
    <td className="">currentusrsignout</td>
</tr> 
)
}
export default ToolItem;