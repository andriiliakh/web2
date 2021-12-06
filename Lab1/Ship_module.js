class Port{
	constructor(name,country,number,address){
		this.name = name;
		this.country = country;
		this.number = number;
		this.address = address;
	}
}

class Ship{
	constructor(name,country,number,capacity){
		this.name = name;
		this.country = country;
		this.number = number;
		this.capacity = capacity;
	}
}

class Marina{//пристань
	constructor(port_number,number,capacity){
		this.port_number = port_number;
		this.number = number;
		this.capacity = capacity;
	}
}

class Ship_on_marina{
	constructor(ship_number,marina_number){
		this.ship_number = ship_number;
		this.marina_number = marina_number;
	}
}
var Ports = new Array(0);
var Ships = new Array(0);
var Marinas = new Array(0);
var Ship_on_marinas = new Array(0);

//Додавання
function add_port(name,country,number,address){
	if(find_port(number)==undefined){
		Ports.push(new Port(name,country,number,address));
		return;
	}
	console.log('Error. Port ' + number + ' has already been created. It must be unique!');
}
function add_ship(name,country,number,capacity){
	if(find_ship(number)==undefined){
		Ships.push(new Ship(name,country,number,capacity));
		return;
	}
	console.log('Error. Ship ' + number + ' has already been created. It must be unique!');
}
function add_marina(port_number,number,capacity){
	if(find_marina(number)!==undefined){
		console.log('Error. Marina ' + number + ' has already been created. It must be unique!');
		return;
	}
	if(find_port(port_number)!==undefined){
		Marinas.push(new Marina(port_number,number,capacity));
		return;
	}
	console.log('Error. Port ' + port_number + ' not found');
}
function add_ship_on_marina(ship_number,marina_number){
	if(find_ship(ship_number)==undefined){
		console.log('Error. Ship ' + ship_number + ' not found!');
		return;
	} 
	if(find_marina(marina_number)==undefined){
		console.log('Error. Marina ' + marina_number + ' not found!');
		return;
	}
	if(!is_marina_free(marina_number)){
		console.log('Error. Marina ' + marina_number + ' is full!');
		return;
	} 
	if(is_ship_on_marina(ship_number) === -1){
		Ship_on_marinas.push(new Ship_on_marina(ship_number,marina_number));
		return;
	}
	console.log('Error. Ship ' + ship_number + ' is on ' + t + ' marina!');
}

//Видалення
function delete_port(number){
	if(Marinas.filter(m => m.port_number === number).length === 0){
		Ports = Ports.filter(p => p.number != number);
		return;
	}
	console.log('Error. Port cannot be deleted. Marina found!');
}
function delete_ship(number){
	if(is_ship_on_marina(number) === -1){
		Ships = Ships.filter(s => s.number != number);
		return;
	}
	console.log('Error. Ship cannot be deleted. Ship is on ' + t + ' marina!');
}
function delete_marina(number){
	if(find_all_ships_on_marina(number).length === 0){
		Marinas = Marinas.filter(m => m.number!=number);
		return;
	}
	console.log('Error. Marina cannot be deleted. Ship/ships is on marina!');
}
function delete_ship_on_marina(ship_number,marina_number){
	Ship_on_marinas = Ship_on_marinas.filter(sm => (sm.ship_number!=ship_number && 
	sm.marina_number!=marina_number));
}

//Пошук
function find_port(criteria){
	return Ports.find(p => p.name===criteria || p.number===criteria || p.address===criteria);
}
function find_ship(criteria){
	return Ships.find(s => s.name===criteria || s.number===criteria);
}
	function find_marina(criteria){
	return Marinas.find(m => m.number===criteria);
}
function find_all_ships_on_marina(marina){
	let sm = Ship_on_marinas.filter(sm => sm.marina_number===marina);
	let res = new Array(0);
	sm.forEach(element => res.push(find_ship(element.ship_number)));
	return res;
}
function is_ship_on_marina(ship){
	let t =Ship_on_marinas.find(sm => sm.ship_number ===ship);
	if(t!==undefined){
		return t.marina_number;
	}
	return -1;
}
function is_marina_free(marina){
	let max = Marinas.find(m => m.number===marina).capacity;
	let actual = find_all_ships_on_marina(marina).length;
	if(max > actual){
		return true;
	}
	return false;
}
function find_all_ships_on_port(port){
	let marinas_on_port = Marinas.filter(m => m.port_number===port);
	marinas_on_port.forEach(element => 
	{console.log('Marina ' +element.number + ':');
	console.log(find_all_ships_on_marina(element.number))}
	);
}

//Редагування
function edit_port(criteria,id_to_change,value){
	let t = Ports.find(p => p.name===criteria || p.number===criteria || p.address===criteria);
	switch(id_to_change){
		case 0:
		t.name = value;
		break;
		case 1:
		t.country = value;
		break;
		case 2:
		t.number = value;
		break;
		case 3:
		t.address = value;
		break;
		default:
	}
}
function edit_ship(criteria,id_to_change,value){
	let t = Ships.find(s => s.name===criteria || s.number===criteria);
	switch(id_to_change){
		case 0:
		t.name = value;
		break;
		case 1:
		t.country = value;
		break;
		case 2:
		t.number = value;
		break;
		case 3:
		t.capacity = value;
		break;
		default:
	}
}

process.stdout.write('\033c'); //очистити консоль

//Наповнення
add_port('Порт1','Україна',10001,'тут');
add_port('Порт2','Румунія',10002,'там');
add_port('Порт3','Італія',10003,'не тут');
add_port('Порт4','Турція',10004,'не там');

add_ship('Корабель1','Бразилія',20001,30);
add_ship('Корабель2','Україна',20002,25);
add_ship('Корабель3','Росія',20003,45);
add_ship('Корабель4','Румунія',20004,20);
add_ship('Корабель5','США',20005,50);
add_ship('Корабель6','ВБ',20006,40);
add_ship('Корабель7','Франція',20007,5);
add_ship('Корабель8','Франція',20008,10);

add_marina(10001,101,3);
add_marina(10001,102,2);
add_marina(10002,103,2);
add_marina(10002,104,4);
add_marina(10003,105,2);
add_marina(10003,106,1);
add_marina(10004,107,3);
add_marina(10004,108,2);
add_marina(10004,109,4);
add_marina(10004,110,5);

add_ship_on_marina(20001,102);
add_ship_on_marina(20002,101);
add_ship_on_marina(20003,104);
add_ship_on_marina(20004,103);
add_ship_on_marina(20005,107);
add_ship_on_marina(20006,108);
add_ship_on_marina(20007,105);
add_ship_on_marina(20008,109);


//Вивід
console.log(Ports);
con_split();

console.log(Ships);
con_split();

console.log(Marinas);
con_split();

console.log(Ship_on_marinas);
con_split();


add_ship("k2","USA",1111,8)
add_ship_on_marina(1111,101)

console.log(
find_all_ships_on_marina(101)
)


function con_split(){
	console.log('\n\n#######################################################################\n\n');
}