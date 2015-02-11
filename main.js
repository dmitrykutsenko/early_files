var multiplicationTableHolder = document.getElementById('multiplication-table');
var matrixHolder = document.getElementById('matrix');
var pascalTriangleHolder = document.getElementById('pascal-triangle');

matrixHolder.innerHTML =  render(matrix(10));
multiplicationTableHolder.innerHTML = render(multiplicationTable(10));
pascalTriangleHolder.innerHTML = render(pascal(10));

function multiplicationTable(size) {
	var table = [];
	///
	size = 10; //let it be = 10
	table.length = size;
	for (var i=1; i<=size; i++) {
		table[i-1] = new Array(size);
		for(var j=1; j<=size; j++) {
			table[i-1][j-1] = i * j;			
		}		
	}	
	///
    return table;
}

function matrix (size) {
    var matrix = [];
    ///
	size = 10; //let it be = 10 again
	matrix.length = size;
	for (var i=0; i<size; i++) {
		matrix[i] = new Array(size);
		for(var j=0; j<size; j++) {
			if (i==j)
				matrix[i][j] = 1;
			
			else if (j==size-i-1)
				matrix[i][j] = 2;

			else {
				if (i<size/2 && j>i && j<size-i)
					matrix[i][j] = 3;
				else if ( i>size/2 && j>size-i-1 && j<i)
					matrix[i][j] = 5;
				
				else if ( j<size/2)
					matrix[i][j] = 6;
				
				else
					matrix[i][j] = 4;
			}			
		}		
	}	
	///
    return matrix;
}

function pascal (size) {
    var triangle = [];
	///
	size = 10; //yes, it is = 10 again and again...
	triangle.length = size;
	for (var i=0; i<=size; i++) {
		triangle[i] = new Array(i);
		for(var j=0; j<i; j++) {
			if (j<=i){				
				if (j>=1 && triangle[i-1][j-1] && triangle[i-1][j]){
						triangle[i][j] = triangle[i-1][j-1] + triangle[i-1][j];
				}
				else triangle[i][j] = 1;
			}			
		}		
	}	
	///   
    return triangle;
}

function render (array) {
    var rowsQty = array.length;
    var result = [];
    for (var i = 0; i < rowsQty; i++) {
        var row = ['<tr><td>', array[i].join('</td><td>'), '</td></tr>'].join('');
        result.push(row);
    }
    return result.join('');
}