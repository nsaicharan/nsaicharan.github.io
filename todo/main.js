var list = document.querySelector('#list');
var list2 = document.querySelector('#list2');


if (localStorage.getItem('lists')) {
	var saved = JSON.parse(localStorage.getItem('lists'));
} else {
	var saved = {
			todo: [],
			completed: []
		}
}

render();

document.querySelector('form').onsubmit = function(e){
	e.preventDefault();
	var value = e.target[0].value;

	if (value){
		saved.todo.unshift(value);
		
		local();
		render();
	}
	
	e.target[0].value = '';
}

function remove(index, id){

	var parent = document.querySelector("#"+id);
	var item = parent.childNodes[index];

	if (id == "list") {
		saved.todo.splice(index, 1);
	} else {
		saved.completed.splice(index, 1);
	}
	
	local();
	render();
}

function complete(index, id){
	
	var parent = document.querySelector("#"+id);
	var item = parent.childNodes[index].childNodes[1]; // Selects ".text" div
	var value = item.innerText;

	if (id == "list") {
		saved.todo.splice(index, 1);
		saved.completed.unshift(value);
		
	} else {
		saved.completed.splice(index, 1);
		saved.todo.unshift(value);
	}
	
	local();
	render();
}

//Insert into DOM
function render(){

	if (localStorage.getItem('lists')){

		list.innerHTML = '';
		for(i=0; i < saved.todo.length; i++){
			var item = saved.todo[i];
			list.innerHTML += `<li class="${i}">
								 <div class="text">${item}</div> 
								 <div class="buttons">
										<button onclick="remove(${i}, 'list')">DELETE</button>
										<button onclick="complete(${i}, 'list')">COMPLETED</button>
								</div>
							  </li>`
		}

		list2.innerText = '';
		for(j=0; j < saved.completed.length; j++){
			var item = saved.completed[j];
			list2.innerHTML += `<li class="${j}">
									<div class="text">${item}</div>
									<div class="buttons">
										<button onclick="remove(${j}, 'list2')">DELETE</button>
										<button onclick="complete(${j}, 'list2')">REDO</button>
									</div>
							   </li>`
		}
		
		console.log(saved);
	}
}

//Local Storage
function local(){
	localStorage.setItem('lists', JSON.stringify(saved));
}