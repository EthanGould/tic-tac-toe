'use strict';

$(document).ready(function() {
	var module = {
		moveCount: 0,
		rows: $('.board__row'),
		cells: $('.board__cell'),
		board: { rows: [] }
	};

	// Add cells to board rows obj.
	module.board.rows[0] = { row: module.rows[0], cells: $(module.rows[0]).children() };
	module.board.rows[1] = { row: module.rows[1], cells: $(module.rows[1]).children() };
	module.board.rows[2] = { row: module.rows[2], cells: $(module.rows[2]).children() };

	module.eventHandlers = function() {
		module.cells.on('click', this.makeMove);
	};

	module.makeMove = function(event) {
		var $cell = $(event.target);
		var move = module.moveCount % 2 === 0 ? 'x' : 'o';
		
		if ( !$cell.is('.disabled') ) {
			$cell.addClass(move);
			// Increment move count to keep track of whos turn it is.
			module.moveCount++;
		};

		$cell.addClass('disabled');

		// After the 5th move, start watching for a winner.
		if (module.moveCount >= 4) {
			module.checkForWinner(move);
		}
		
	}

	module.checkForWinner = function(move) {
		// Check each column for vertical win.
		$.each([0,1,2], function(index, column) {
			module.checkVertical(move, column);
		});

		// Check each row for a hirizontal win.
		module.checkHorizontal(move);
		// Check each column for diagonal win.
		module.checkDiagonal(move);
	};

	module.checkHorizontal = function(move) {
		// Does x/o have 3 in a row, horizontally?
		$.each(module.rows, function(index, row) {
			if ( $(row).children('.' + move).length === 3 ) {
				$(row).children().addClass('winner');
				return false;
			}
		});
	};

	module.checkVertical = function(move, column) {
		var verticalCount = 0;
		// Check each row of the provided column.
		$.each(module.board.rows, function(index, row) {
			// If the cell of the column currently being checked is
			// already marked by the current users move (x/o) increment count.
			if ( $( $(row.cells[column])[0]).hasClass(move) ) {
				verticalCount++;
			}
		});

		// If we find 3 in a column, we have a winner vertically.
		if (3 === verticalCount) {
			$.each(module.board.rows, function(index, row) {
				// Marked the winning column's cells as winning cell.
				$(row.cells[column]).addClass('winner');
				module.cells.addClass('disabled');
			});
		}
	}

	module.checkDiagonal = function(move) {
		var diagonalCount = 0
		// Does x/o have 3 in a row, horizontally?
		$.each(module.rows, function(index, row) {
			if ( $(row.cells[index]).hasClass(move) ) {
				diagonalCount++;
			}
		});

		if (3 === diagonalCount) {
			$.each(module.rows, function(index, row) {
				// Marked the winning column's cells as winning cell.
				$(row.cells[index]).addClass('winner');
				module.cells.addClass('disabled');
			});
		}
	};

	module.eventHandlers();
})