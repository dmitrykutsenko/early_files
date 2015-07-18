function getNextCell(turn) {
    var cellsD = document.querySelectorAll('.cell');
    var cells = [[], [], [], [], []];
    var i;
	var j;
	var index;
    
	for (i = 0; i <= 2; i++) {
		for (var j = 0; j <= 2; j++) {			            
			var el = cellsD[i * 3 + j];
            if (el.classList.contains('x')) {
                cells[i][j] = 'x';
				cells[i][3] += 1;
				cells[3][j] = 1;
            }
            if (el.classList.contains('o')) {
                cells[i][j] = 'o';
				cells[i][4] += 1;
				cells[4][j] = +1;
            }			
			//console.log(JSON.stringify(cells));	
		}        	
    }
	
	if (turn <= 2) {
		if (!cellsD[4].classList.contains('x')) {			
			if (!cellsD[4].classList.contains('o')) {
				console.log(JSON.stringify(cells));
				return cellsD[4];
			}
		}
	}
		
    if ((cells[0][0] === cells[1][1]) && !cells[2][2]) {
		return cellsD[8];	
		}
	else if ((cells[1][1] === cells[2][2]) && !cells[0][0]) {
		return cellsD[0];
		}
	
	else if ((cells[2][0] === cells[1][1]) && !cells[0][2]) {
		return cellsD[2];
		}
	else if ((cells[1][1] === cells[0][2]) && !cells[2][0]) {
        return cellsD[6];
    }	
	
	for (i = 0; i <= 2; i++) {
		for (j = 0; j <= 2; j++) {
			
			if (cells[i][3]>=2) {
				if (cells[i][j]!=='x' && cells[i][j]!=='o') {
					return cellsD[i * 3 + j];
				}
			} 			
			else if (cells[3][j]>=2) {
				if (cells[i][j]!=='x' && cells[i][j]!=='o') {
					return cellsD[i * 3 + j];
				}
			}
			else {
				while (true) {
					index = String(Math.random())[3];
					if ( index !== '4' && Number(index) < 9 && !cellsD[Number(index)].classList.contains('x') && !cellsD[Number(index)].classList.contains('o') ) {
						return cellsD[Number(index)];
					}
				}
			}			
		}
	} 
}
