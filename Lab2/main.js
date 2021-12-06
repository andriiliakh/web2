window.onload = () => {
	checkLCNull();
	get(-1);
	
	var stage;
	var form_menu = document.querySelector("#page_choise");
	form_menu.addEventListener("change", function(e) {
		let target = e.target;
		let message;
		switch (target.id) {
			case 'port':
				stage = 0;
				break;
			case 'ship':
				stage = 1;
				break;
			case 'marina':
				stage = 2;
				break;
			case 'som':
				stage = 3;
				break;
		}
		render(stage);
	});
	var form_create = document.querySelector("#form_create");
	form_create.addEventListener("submit", function(e) {
		switch (stage) {
			case 0:
				let ID0 = form_create.elements['ID'].value;
				form_create.elements['ID'].value='';
				let Name0 = form_create.elements['Name'].value;
				form_create.elements['Name'].value='';
				let Country0 = form_create.elements['Country'].value;
				form_create.elements['Country'].value='';
				let Address0 = form_create.elements['Address'].value;
				form_create.elements['Address'].value='';
				add_port(ID0,Name0,Country0,Address0);
				break;
			case 1:
				let ID1 = form_create.elements['ID'].value;
				form_create.elements['ID'].value='';
				let Name1 = form_create.elements['Name'].value;
				form_create.elements['Name'].value='';
				let Country1 = form_create.elements['Country'].value;
				form_create.elements['Country'].value='';
				let Capacity1 = form_create.elements['Capacity'].value;
				form_create.elements['Capacity'].value='';
				add_ship(ID1,Name1,Country1,Capacity1);
				break;
			case 2:
				let ID2 = form_create.elements['ID'].value;
				form_create.elements['ID'].value='';
				let Port_ID2 = form_create.elements['Port_ID'].value;
				form_create.elements['Port_ID'].value='';
				let Capacity2 = form_create.elements['Capacity'].value;
				form_create.elements['Capacity'].value='';
				add_marina(ID2,Port_ID2,Capacity2);
				break;
			case 3:
				let ID3 = form_create.elements['ID'].value;
				form_create.elements['ID'].value='';
				let Ship_ID3 = form_create.elements['Ship_ID'].value;
				form_create.elements['Ship_ID'].value='';
				let Marina_ID3 = form_create.elements['Marina_ID'].value;
				form_create.elements['Marina_ID'].value='';
				add_ship_on_marina(ID3,Ship_ID3,Marina_ID3);
				break;
		}
		render_table(stage);
		e.preventDefault();
	});
}


function render(t_id) {
	render_create(t_id);
	render_table(t_id);
}

function render_table(t_id){
	let element = document.querySelector("#show_table");
	element.innerHTML = '';
	{
		let res = '';
		switch(t_id){
			case 0:
				if(Ports.length ===0){
					res = 'Empty List of Ports';
				}
				break;
			case 1:
				if(Ships.length ===0){
					res = 'Empty List of Ships';
				}
				break;
			case 2:
				if(Marinas.length ===0){
					res = 'Empty List of Marinas';
				}
				break;
			case 3:
				if(Ship_on_marinas.length ===0){
					res = 'Empty List of Ships on Marinas';
				}
				break;
		}
		if(res !== ''){
			const p = document.createElement('p');
			p.innerHTML = res;
			element.append(p);
			return;
		}
		
	}
	const table = document.createElement('table');
	
	//Генерація заголовків колонок
	const thead = document.createElement('thead');
	table.append(thead);
	const tr = document.createElement('tr');
	thead.append(tr);
	let h_des = getNameFields(t_id);
	h_des.push("Actions");
	
	for(let i=0; i<h_des.length; i++) {
		const th = document.createElement('th');
		th.innerHTML = h_des[i];
		tr.append(th);
	}
	
	const tbody = document.createElement('tbody');
	table.append(tbody);
	element.append(table);
		switch(t_id){
		case 0:
			for (let element of Ports) {
				let id = element.ID;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","delete_port("+id+");render_table("+t_id+")");
				td.append(del);
				const edit = document.createElement('button');
				edit.setAttribute("type","button");
				edit.innerHTML = "Edit";
				edit.setAttribute("onclick","edit_port("+id+");");
				td.append(edit);
				tr.append(td);
			}
			break;
		case 1:
			for (let element of Ships) {
				let id = element.ID;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","delete_ship("+id+");render_table("+t_id+")");
				td.append(del);
				const edit = document.createElement('button');
				edit.setAttribute("type","button");
				edit.innerHTML = "Edit";
				edit.setAttribute("onclick","edit_ship("+id+");");
				td.append(edit);
				tr.append(td);
			}
			break;
		case 2:
			for (let element of Marinas) {
				let id = element.ID;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","delete_marina("+id+");render_table("+t_id+")");
				td.append(del);
				const edit = document.createElement('button');
				edit.setAttribute("type","button");
				edit.innerHTML = "Edit";
				edit.setAttribute("onclick","edit_marina("+id+");");
				td.append(edit);
				tr.append(td);
			}
			break;
		case 3:
			for (let element of Ship_on_marinas) {
				let id = element.ID;
				const tr = document.createElement('tr');
				tbody.append(tr);
				for(let key in element) {
					const td = document.createElement('td');
					td.innerHTML = element[key];
					tr.append(td);
				}
				const td = document.createElement('td');
				const del = document.createElement('button');
				del.setAttribute("type","button");
				del.innerHTML = "Delete";
				del.setAttribute("onclick","delete_ship_on_marina("+id+");render_table("+t_id+")");
				td.append(del);
				tr.append(td);
			}
			break;
	}
}

function render_create(t_id){
	let element = document.querySelector("#create");
	element.innerHTML = '';
	
	let h_des = getNameFields(t_id);
	
	for(let i = 0; i < h_des.length; i++){
		const div = document.createElement('div');
		div.className += "menu_option";
		const label = document.createElement('label');
		label.setAttribute("for", h_des[i]);
		label.innerHTML = h_des[i]+":";
		div.append(label);
		
		const input = document.createElement('input');
		input.setAttribute("type","text");
		input.setAttribute("id",h_des[i]);
		input.setAttribute("name",h_des[i]);
		div.append(input);
		element.append(div);
	}
	const div = document.createElement('div');
	div.className += "menu_option";
	const submit = document.createElement("input");
	submit.setAttribute("type","submit");
	submit.setAttribute("value","Submit");
	submit.setAttribute("id","Submit"+t_id);
	div.append(submit);
	element.append(div);
}

function getNameFields(t_id){
	let t_obj;
	switch(t_id){
		case 0:
			t_obj = new Port();
			break;
		case 1:
			t_obj = new Ship();
			break;
		case 2:
			t_obj = new Marina();
			break;
		case 3:
			t_obj = new Ship_on_marina();
			break;
	}
	return Object.keys(t_obj);
}

function gen_rep1(){
	let marina_id = document.querySelector("#rep1").value;
	document.querySelector("#rep1").value = '';
	if(find_marina(marina_id)==undefined){
		alert("Error! Enter ID of an existing marina.");
		location.reload();
		return;
	}
	const header = document.querySelector("#header");
	header.innerHTML="";
	const cont = document.querySelector("#content");
	cont.innerHTML="";
	let res = find_all_ships_on_marina(marina_id);
	if(res !== null){
		cont.innerHTML += res.toString();
	} else {
		cont.innerHTML += "No ships";
	}
	const exit_btn = document.createElement("input");
	exit_btn.setAttribute("value", "Back");
	exit_btn.setAttribute("type", "button");
	exit_btn.setAttribute("onclick","location.reload();");
	exit_btn.className+="mar";
	document.body.append(exit_btn);
}
function gen_rep2(){
	let port_id = document.querySelector("#rep2").value;
	document.querySelector("#rep2").value = '';
	if(find_port(port_id)==undefined){
		alert("Error! Enter ID of an existing port.");
		location.reload();
		return;
	}
	const header = document.querySelector("#header");
	header.innerHTML="";
	const cont = document.querySelector("#content");
	cont.innerHTML="";
	let res = find_all_ships_on_port(port_id);
	if(res !== undefined){
		cont.innerHTML += res.toString();
	} else {
		cont.innerHTML += "No ships";
	}
	const exit_btn = document.createElement("input");
	exit_btn.setAttribute("value", "Back");
	exit_btn.setAttribute("type", "button");
	exit_btn.setAttribute("onclick","location.reload();");
	exit_btn.className+="mar";
	document.body.append(exit_btn);
}

// Бібліотека
class Port{
	constructor(ID,Name,Country,Address){
		this.ID = ID;
		this.Name = Name;
		this.Country = Country;
		this.Address = Address;
	}
}

class Ship{
	constructor(ID,Name,Country,Capacity){
		this.ID = ID;
		this.Name = Name;
		this.Country = Country;
		this.Capacity = Capacity;
	}
}

class Marina{//пристань
	constructor(ID,Port_ID,Capacity){
		this.ID = ID;
		this.Port_ID = Port_ID;
		this.Capacity = Capacity;
	}
}

class Ship_on_marina{
	constructor(ID,Ship_ID,Marina_ID){
		this.ID = ID;
		this.Ship_ID = Ship_ID;
		this.Marina_ID = Marina_ID;
	}
}
var Ports = new Array(0);
var Ships = new Array(0);
var Marinas = new Array(0);
var Ship_on_marinas = new Array(0);

function upload(id){
	switch(id){
		case -1:
			localStorage.setItem('p', JSON.stringify(Ports));
			localStorage.setItem('s', JSON.stringify(Ships));
			localStorage.setItem('m', JSON.stringify(Marinas));
			localStorage.setItem('som', JSON.stringify(Ship_on_marinas));
			break;
		case 0:
			localStorage.setItem('p', JSON.stringify(Ports));
			break;
		case 1:
			localStorage.setItem('s', JSON.stringify(Ships));
			break;
		case 2:
			localStorage.setItem('m', JSON.stringify(Marinas));
			break;
		case 3:
			localStorage.setItem('som', JSON.stringify(Ship_on_marinas));
			break;
	}
}
function get(id){
	switch(id){
		case -1:
			Ports = JSON.parse(localStorage.getItem('p'));
			Ships = JSON.parse(localStorage.getItem('s'));
			Marinas = JSON.parse(localStorage.getItem('m'));
			Ship_on_marinas = JSON.parse(localStorage.getItem('som', Ship_on_marinas));
			break;
		case 0:
			Ports = JSON.parse(localStorage.getItem('p'));
			break;
		case 1:
			Ships = JSON.parse(localStorage.getItem('s'));
			break;
		case 2:
			Marinas = JSON.parse(localStorage.getItem('m'));
			break;
		case 3:
			Ship_on_marinas = JSON.parse(localStorage.getItem('som', Ship_on_marinas));
			break;
	}
}
function checkLCNull(){
	if(localStorage.getItem('p') == undefined){
		upload(0);
	}
	if(localStorage.getItem('s') == undefined){
		upload(1);
	}
	if(localStorage.getItem('m') == undefined){
		upload(2);
	}
	if(localStorage.getItem('som') == undefined){
		upload(3);
	}
}

function cleanLC(){
	localStorage.removeItem('p');
	localStorage.removeItem('s');
	localStorage.removeItem('m');
	localStorage.removeItem('som');
}

//Додавання
function add_port(ID,Name,Country,Address){
	if(find_port(ID)==undefined){
		Ports.push(new Port(ID,Name,Country,Address));
		upload(0);
		return;
	}
	alert('Error. Port ' + ID + ' has already been created. It must be unique!');
}
function add_ship(ID,Name,Country,Capacity){
	if(find_ship(ID)==undefined){
		Ships.push(new Ship(ID,Name,Country,Capacity));
		upload(1);
		return;
	}
	alert('Error. Ship ' + ID + ' has already been created. It must be unique!');
}
function add_marina(ID,Port_ID,Capacity){
	if(find_marina(ID)!==undefined){
		alert('Error. Marina ' + ID + ' has already been created. It must be unique!');
		return;
	}
	if(find_port(Port_ID)!==undefined){
		Marinas.push(new Marina(ID,Port_ID,Capacity));
		upload(2);
		return;
	}
	alert('Error. Port ' + Port_ID + ' not found');
}
function add_ship_on_marina(ID,Ship_ID,Marina_ID){
	if(find_som(ID)!==undefined){
		alert('Error. Ship on marina record ID ' + ID + ' has already been created. It must be unique!');
		return;
	}
	if(find_ship(Ship_ID)==undefined){
		alert('Error. Ship ' + Ship_ID + ' not found!');
		return;
	} 
	if(find_marina(Marina_ID)==undefined){
		alert('Error. Marina ' + Marina_ID + ' not found!');
		return;
	}
	if(!is_marina_free(Marina_ID)){
		alert('Error. Marina ' + Marina_ID + ' is full!');
		return;
	} 
	let t = is_ship_on_marina(Ship_ID);
	if(t == -1){
		Ship_on_marinas.push(new Ship_on_marina(ID,Ship_ID,Marina_ID));
		upload(3);
		return;
	}
	alert('Error. Ship ' + Ship_ID + ' is on ' + t + ' marina!');
}

//Видалення
function delete_port(ID){
	get(0);
	if(Marinas.filter(m => m.Port_ID == ID).length === 0){
		Ports = Ports.filter(p => p.ID != ID);
		upload(0);
		return;
	}
	alert('Error. Port cannot be deleted. Marina found!');
}
function delete_ship(ID){
	get(1);
	let t = is_ship_on_marina(ID);
	if(t == -1){
		Ships = Ships.filter(s => s.ID != ID);
		upload(1);
		return;
	}
	alert('Error. Ship cannot be deleted. Ship is on ' + t + ' marina!');
}
function delete_marina(ID){
	get(2);
	if(find_all_ships_on_marina(ID).length === 0){
		Marinas = Marinas.filter(m => m.ID!=ID);
		upload(2);
		return;
	}
	alert('Error. Marina cannot be deleted. Ship/ships is on marina!');
}
function delete_ship_on_marina(ID){
	get(3);
	Ship_on_marinas = Ship_on_marinas.filter(sm => (sm.ID!=ID));
	upload(3);
}

//Пошук
function find_port(criteria){
	get(0);
	return Ports.find(p => p.ID==criteria);
}
function find_ship(criteria){
	get(1);
	return Ships.find(s => s.ID==criteria);
}
function find_marina(criteria){
	get(2);
	return Marinas.find(m => m.ID==criteria);
}
function find_som(criteria){
	get(3);
	return Ship_on_marinas.find(som => som.ID==criteria);
}
function find_all_ships_on_marina(marina){
	get(3);
	let sm = Ship_on_marinas.filter(sm => sm.Marina_ID==marina);
	let res = new Array(0);
	sm.forEach(element => res.push(element.Ship_ID));
	return res;
}
function is_ship_on_marina(ship){
	get(3);
	let t = Ship_on_marinas.find(sm => sm.Ship_ID == ship);
	if(t!==undefined){
		return t.Marina_ID;
	}
	return -1;
}
function is_marina_free(marina){
	get(2);
	let max = Marinas.find(m => m.ID==marina).Capacity;
	let actual = find_all_ships_on_marina(marina).length;
	if(max > actual){
		return true;
	}
	return false;
}
function find_all_ships_on_port(port){
	get(2);
	let marinas_on_port = Marinas.filter(m => m.Port_ID==port);
	let res = new Array(0);
	marinas_on_port.forEach(element => 
	{res.push(...find_all_ships_on_marina(element.ID))});
	return res;
}

//Редагування
function edit_port(criteria){
	get(0);
	let t = find_port(criteria);
	const cont = document.querySelector("#content");
	cont.innerHTML = "";
	const div_head = document.createElement("div");
	div_head.className+="name";
	div_head.innerHTML="Editing";
	cont.append(div_head);
	const div_menu = document.createElement("div");
	div_menu.className+="menu";
	cont.append(div_menu);
	
	let h_des = getNameFields(0);
	for(let i = 0; i < h_des.length; i++){
		const div_opt = document.createElement('div');
		div_opt.className += "menu_option";
		const label = document.createElement('label');
		label.setAttribute("for", h_des[i]);
		label.innerHTML = h_des[i]+":";
		div_opt.append(label);
		
		const input = document.createElement('input');
		input.setAttribute("type","text");
		input.setAttribute("id",h_des[i]);
		input.setAttribute("name",h_des[i]);
		input.setAttribute("value",t[h_des[i]]);
		div_opt.append(input);
		div_menu.append(div_opt);
	}
	const div_btn = document.createElement('div');
	div_btn.className += "menu_option";
	const btn = document.createElement("button");
	btn.setAttribute("type","button");
	btn.innerHTML = "Submit Changes";
	btn.setAttribute("onclick","change_port("+criteria+")");
	div_menu.append(btn);
}
function change_port(criteria){
	let ID0 = document.querySelector('#ID').value;
	let Name0 = document.querySelector('#Name').value;
	let Country0 = document.querySelector('#Country').value;
	let Address0 = document.querySelector('#Address').value;
	let t = find_port(criteria);
	t.ID=ID0;
	t.Name=Name0;
	t.Country=Country0;
	t.Address=Address0;
	upload(0);
	document.querySelector('#port').checked=false;
	location.reload();
}

function edit_ship(criteria){
	get(1);
	let t = Ships.find(s => s.ID==criteria);
	const cont = document.querySelector("#content");
	cont.innerHTML = "";
	const div_head = document.createElement("div");
	div_head.className+="name";
	div_head.innerHTML="Editing";
	cont.append(div_head);
	const div_menu = document.createElement("div");
	div_menu.className+="menu";
	cont.append(div_menu);
	
	let h_des = getNameFields(1);
	for(let i = 0; i < h_des.length; i++){
		const div_opt = document.createElement('div');
		div_opt.className += "menu_option";
		const label = document.createElement('label');
		label.setAttribute("for", h_des[i]);
		label.innerHTML = h_des[i]+":";
		div_opt.append(label);
		
		const input = document.createElement('input');
		input.setAttribute("type","text");
		input.setAttribute("id",h_des[i]);
		input.setAttribute("name",h_des[i]);
		input.setAttribute("value",t[h_des[i]]);
		div_opt.append(input);
		div_menu.append(div_opt);
	}
	const div_btn = document.createElement('div');
	div_btn.className += "menu_option";
	const btn = document.createElement("button");
	btn.setAttribute("type","button");
	btn.innerHTML = "Submit Changes";
	btn.setAttribute("onclick","change_ship("+criteria+")");
	div_menu.append(btn);
	upload(1);
}
function change_ship(criteria){
	let ID0 = document.querySelector('#ID').value;
	let Name0 = document.querySelector('#Name').value;
	let Country0 = document.querySelector('#Country').value;
	let Capacity0 = document.querySelector('#Capacity').value;
	let t = find_ship(criteria);
	t.ID=ID0;
	t.Name=Name0;
	t.Country=Country0;
	t.Capacity=Capacity0;
	upload(1);
	document.querySelector('#ship').checked=false;
	location.reload();
}

function edit_marina(criteria){
	get(2);
	let t = Marinas.find(m => m.ID==criteria);
	const cont = document.querySelector("#content");
	cont.innerHTML = "";
	const div_head = document.createElement("div");
	div_head.className+="name";
	div_head.innerHTML="Editing";
	cont.append(div_head);
	const div_menu = document.createElement("div");
	div_menu.className+="menu";
	cont.append(div_menu);
	
	let h_des = getNameFields(2);
	for(let i = 0; i < h_des.length; i++){
		const div_opt = document.createElement('div');
		div_opt.className += "menu_option";
		const label = document.createElement('label');
		label.setAttribute("for", h_des[i]);
		label.innerHTML = h_des[i]+":";
		div_opt.append(label);
		
		const input = document.createElement('input');
		input.setAttribute("type","text");
		input.setAttribute("id",h_des[i]);
		input.setAttribute("name",h_des[i]);
		input.setAttribute("value",t[h_des[i]]);
		div_opt.append(input);
		div_menu.append(div_opt);
	}
	const div_btn = document.createElement('div');
	div_btn.className += "menu_option";
	const btn = document.createElement("button");
	btn.setAttribute("type","button");
	btn.innerHTML = "Submit Changes";
	btn.setAttribute("onclick","change_marina("+criteria+")");
	div_menu.append(btn);
	upload(2);
}
function change_marina(criteria){
	let ID0 = document.querySelector('#ID').value;
	let Port_ID0 = document.querySelector('#Port_ID').value;
	let Capacity0 = document.querySelector('#Capacity').value;
	let t = find_marina(criteria);
	t.ID=ID0;
	t.Port_ID=Port_ID0;
	t.Capacity=Capacity0;
	upload(2);
	document.querySelector('#marina').checked=false;
	location.reload();
}