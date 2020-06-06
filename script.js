let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i=1; i<101; i++ ) {
	let excel = document.createElement('div');
	field.appendChild(excel);
	excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 10;

 for (let i = 0; i<excel.length;i++) { 
 	if (x>10) {
 		x = 1;
 		y--;
 	}
 	excel[i].setAttribute('posX', x);
 	excel[i].setAttribute('posY', y);
 	x++;
 }

function generateSnake() {
	let posX = Math.round(Math.random() * (10 - 3) + 3);
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return[posX, posY];
}
let coordinats = generateSnake();
let snakeBody = [document.querySelector('[posX = "' + coordinats[0] + '"][posY = "' +
 coordinats[1] + '"]'),document.querySelector('[posX = "' + (coordinats[0]-1) + '"][posY = "' +
 coordinats[1] + '"]'),document.querySelector('[posX = "' + (coordinats[0]-2) + '"][posY = "' +
 coordinats[1] + '"]')];

 for (let i = 0; i < snakeBody.length;i++) {
 	snakeBody[i].classList.add('snakeBody');

 }
 snakeBody[0].classList.add('head');



let mouse;
function createMouse(){
	function generateMouse() {
	let posX = Math.round(Math.random() * (10 - 3) + 3);
	let posY = Math.round(Math.random() * (10 - 1) + 1);
	return[posX, posY];
	}

	let mouseCoordinats = generateMouse();
	
	mouse = document.querySelector('[posX = "' + mouseCoordinats[0] + '"][posY = "' +
 mouseCoordinats[1] + '"]');

	while(mouse.classList.contains('snakeBody')){
		let mouseCoordinats = generateMouse();
		mouse = document.querySelector('[posX = "' + mouseCoordinats[0] + '"][posY = "' +
 mouseCoordinats[1] + '"]');
	}


	mouse.classList.add('mouse');
}
createMouse();


 let  direction = 'right';
 let steps = 'false';
 let input = document.createElement('input');
 document.body.appendChild(input);
 input.style.cssText = ' margin:auto; margin-top:40px; font-size:20px; display:block;';

 let score = 0;
 input.value = `Ваши очки: ${score}`;


function move(){
	let snakeCoordinats = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
	snakeBody[0].classList.remove('head');
	snakeBody[snakeBody.length-1].classList.remove('snakeBody');
	snakeBody.pop();


	if(direction == 'right'){

	if(snakeCoordinats[0] < 10) {
		snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinats[0]+1) + '"][posY = "' +
 		snakeCoordinats[1] + '"]'));
	}
	else{
		snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' +
 snakeCoordinats[1] + '"]'));
	}
} else if(direction == 'left'){

	if(snakeCoordinats[0] > 1) {
		snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinats[0]-1) + '"][posY = "' +
 		snakeCoordinats[1] + '"]'));
	}
	else{
		snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' +
 snakeCoordinats[1] + '"]'));
	}
}
else if(direction == 'up'){

	if(snakeCoordinats[1] < 10) {
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinats[0] + '"][posY = "' +
 		(+snakeCoordinats[1] + 1) + '"]'));
	}
	else{
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinats[0] + '"][posY = "1"]'));
	}
}
else if(direction == 'down'){

	if(snakeCoordinats[1] > 1) {
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinats[0] + '"][posY = "' +
 		(snakeCoordinats[1] - 1) + '"]'));
	}
	else{
		snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinats[0] + '"][posY = "10"]'));
	}
}

if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0]
.getAttribute('posY') == mouse.getAttribute('posY')) {
	mouse.classList.remove('mouse');
	let a = snakeBody[snakeBody.length-1].getAttribute('posX');
	let b = snakeBody[snakeBody.length-1].getAttribute('posY');
	snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b +  '"]'));
		createMouse();
		score++;
		input.value = `Ваши очки: ${score}`;
	}



	if (snakeBody[0].classList.contains('snakeBody')) {
		setTimeout( () => {
			alert(`Игра окончена! Ваши очки: ${score} `);

		},200);
		clearInterval(interval);
		snakeBody[0].style.background = 'url(img/snakeGameOver.jpg) center no-repeat';
		snakeBody[0].style.bacgkroundSize = 'cover ';
	}


	snakeBody[0].classList.add('head');
	 for (let i = 0; i < snakeBody.length; i++) {
 		snakeBody[i].classList.add('snakeBody');

	 }
	 steps = true;



}
let interval = setInterval(move, 300);


window.addEventListener('keydown', function (e) {
	if( steps == true) {
	if (e.keyCode == 37 && direction != 'right' ) {
		direction = 'left';
		steps = false;
		
	}
	else if (e.keyCode == 38 && direction != 'down'){
		direction = 'up';
		steps = false;
		
	}
	else if (e.keyCode == 39 && direction != 'left'){
		direction = 'right';
		steps = false;
		
	}
	else if (e.keyCode == 40 && direction != 'up'){
		direction = 'down';
		steps = false;
		
	}
}});