import React from "react";

function ListItem(props){

	return (
		<li className="list-group-item">
			{props.myText}
			<span
				onClick={() => {
					props.deleteItem(props.itemIndex)
				}} 
				className="glyphicon glyphicon-remove pull-right">
			</span>
		</li>
		)
}

export default ListItem;

