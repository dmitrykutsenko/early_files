window.addEventListener('load', function handler(){
	var body = document.querySelector('body');
	var startNewGame = document.querySelector('.startNewGame');
	var field = document.querySelector('.field');
	var cells = document.querySelectorAll('.cell');
	var nextValue, winner, turnsSum;
	var winnerMessage = document.querySelector('.winner-message');
	
	function clearCells() {	
		winnerMessage.style.transition = '0.01s';	
		winnerMessage.style.visibility = 'hidden';
		winnerMessage.innerHTML = '';		
			for (var i = 0; i < cells.length; i++ ){
				if (cells[i].classList.contains('x')){
					cells[i].classList.remove('x');
				}
				else if (cells[i].classList.contains('o')){
					cells[i].classList.remove('o');
				}				
			}
			
		body.style.backgroundColor = '#eee';
		turnsSum = 0;
		nextValue = 'x';
		winner = false;			
		
		if (field ){		
			field.addEventListener('click', gaming);
		}
	}
	
	if (startNewGame) {
		if (cells && cells.length !== 0){
			startNewGame.addEventListener('click', clearCells)
		}
	}
	
	function awakeWinner() {
		winnerMessage.style.textAlign = 'center';
		winnerMessage.style.verticalAlign = 'middle';
		winnerMessage.style.fontFamily = 'arial';
		winnerMessage.innerHTML = ((winner == 'x') ? 'Крестик' : 'Нолик') + ' победил !';
		winnerMessage.style.visibility = 'visible';
		winnerMessage.style.top = '10px';
		winnerMessage.style.transform = 'scale(1.15)';
		winnerMessage.style.transition = '2s';		
		body.style.backgroundColor = '#FFD700';
		field.removeEventListener('click', gaming);
	}
	
	function gaming(el){
		if (!winner && el.target && el.target !== field && turnsSum < cells.length) {
			if (el.target.classList.length !== 0) {
				if (!el.target.classList.contains('row') && el.target.classList.contains('cell')) {			
					if (!(el.target.classList.contains('x') || el.target.classList.contains('o'))) {					
						
						turnsSum += 1;
						
						el.target.classList.add(nextValue);
						
						if (turnsSum >= 5) {
							winner = getWinner();
							if (winner) {
								if (winnerMessage){
									awakeWinner();
								}
							}
						}
						
						nextValue = (nextValue == 'x') ? 'o' : 'x';	
				
						function autoTurn() {
							nextCellO = getNextCell(turnsSum);
							if (nextCellO){
								turnsSum += 1;
								nextCellO.classList.add(nextValue);							
	
								if (turnsSum >= 5) {
									winner = getWinner();
									if (winner) {
										if (winnerMessage){
											awakeWinner();
										}
									}
								}
								nextValue = (nextValue == 'x') ? 'o' : 'x';									
							}	
							if (!winner) field.addEventListener('click', gaming);
						}							
						if (!winner && turnsSum < 9) {
							field.removeEventListener('click', gaming);
							setTimeout(autoTurn, 1000);
						}						
					}
				}
			}
		}
	}
})	