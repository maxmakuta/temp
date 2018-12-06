import React from "react";
import ListItem from "./item";
import webService from "./webservice";

export default class List extends React.Component {
	constructor(){
		super();
		this.state = {
			dataArr: [],
			userText: "",
			showField: false,
			sortOrder: "nosort",
			filterTerm: "",
			result: null,
			time: "",
		}
		this.getText = this.getText.bind(this);
		this.addNote = this.addNote.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.showField = this.showField.bind(this);
		this.setSort = this.setSort.bind(this);
		this.setFilter = this.setFilter.bind(this);
		this.getWeather = this.getWeather.bind(this);
	}

	componentDidMount(){ 
		setInterval(this.getWeather, 3000);
	}

	showField(){
		this.setState({showField: !this.state.showField})
	}

	removeNote(id){
		let dataArr = [...this.state.dataArr];
		let newArr = dataArr.filter( item => {
			return item.id !== id;
		});
		this.setState({dataArr: newArr});
	}

	getText(e){
		let userText = e.target.value;
		this.setState({userText}); 
	}

	genId(){
		this.uId = this.uId || 0;
		return this.uId++;
	}

	addNote(e){		
		e.preventDefault();
		if(this.state.userText){
			let arr = [...this.state.dataArr];
			let noteObj = {
				text: this.state.userText,
				id: this.genId(),
			}
			arr.push(noteObj);
			this.setState({dataArr: arr, userText: "", showField: false}, () => console.log(this.state));
		}

	}

	setFilter({target:{value:filterTerm}}){
		this.setState({filterTerm}); 
	}

	setSort(e){
		this.setState({sortOrder: e.target.value}, () => console.log(this.state));
	}

	getWeather(){
		let wUrl = "http://api.openweathermap.org/data/2.5/forecast?q=Minsk,by&units=metric&APPID=875012f111377f30bfe2073d73e59ee8";
		webService.getData(wUrl)
		.then( result => this.setState({result: result, time: Date.now()}, () => console.log(this.state)), err => console.log(err) )
	}

	render(){
		let notesArr = [...this.state.dataArr];
		if(this.state.sortOrder == "up"){
			notesArr.sort( (noteOne, noteTwo) => {
				if(noteOne.text > noteTwo.text) {
					return 1
				}
				else {
					return -1
				}
			} )
		}
		else if(this.state.sortOrder == "down"){
			notesArr.sort( (noteOne, noteTwo) => {
				if(noteOne.text > noteTwo.text) {
					return -1
				}
				else {
					return 1
				}
			} )
		}

		let filteredArr = notesArr.filter( item => {
			return item.text.indexOf(this.state.filterTerm) == 0
		} );

		let items = filteredArr.map( (item, index) => {
			return (<ListItem 
						key={item.id} 
						myText={item.text}
						itemIndex={item.id}
						deleteItem={this.removeNote}
					/>)
		} );

		return (
			<div className="col-xs-12 col-md-4 col-md-offset-4">
				<ul className="list-group">
					<li
						style={{display: this.state.showField ? "none" : "block"}} 
						className="list-group-item">
						<button 
							onClick={this.showField}
							className="btn btn-success"
							>
							New Note
						</button>
					</li>
					<li 
						className="list-group-item"
						style={{display: this.state.showField ? "block" : "none"}}
					>
						<div>
							<form 
								className="input-group"
								onSubmit={this.addNote}
							>
							<input
								onChange={this.getText} 
								className="form-control" 
								type="text"
								value={this.state.userText} 
							/>
							<span className="input-group-btn">
								<button className="btn btn-default">Add note</button>
							</span>
							</form>
						</div>				
					</li>
					<li className="list-group-item">
						<div className="form-group">
							<select 
								className="form-control"
								onChange={this.setSort}
							>
								<option value="nosort">No Sort</option>
								<option value="up">A-Z</option>
								<option value="down">Z-A</option>
							</select>
							<input onChange={this.setFilter} type="text" className="form-control" />
						</div>
					</li>
					<li className="list-group-item">
						<p className="list-group-item-text">
							 Temperature is: {this.state.result ? this.state.result.list[0].main.temp : "Loading temp"}  Data is: {this.state.result ? this.state.result.list[0].dt_txt : "Loading data"}
						</p>
						<p className="list-group-item-text">
							 Temperature is: {this.state.result ? this.state.result.list[8].main.temp : "Loading temp"}  Data is: {this.state.result ? this.state.result.list[8].dt_txt : "Loading data"}
						</p>
						<p className="list-group-item-text">
							 Temperature is: {this.state.result ? this.state.result.list[16].main.temp : "Loading temp"}  Data is: {this.state.result ? this.state.result.list[16].dt_txt : "Loading data"}
						</p>
						<p className="list-group-item-text">
							 Temperature is: {this.state.result ? this.state.result.list[24].main.temp : "Loading temp"}  Data is: {this.state.result ? this.state.result.list[24].dt_txt : "Loading data"}
						</p>
						<p className="list-group-item-text">
							 Temperature is: {this.state.result ? this.state.result.list[32].main.temp : "Loading temp"}  Data is: {this.state.result ? this.state.result.list[32].dt_txt : "Loading data"}
						</p>
						
					</li>
					{items} 
				</ul>
			</div>
		)
	}
};



