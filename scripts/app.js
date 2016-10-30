'use strict';

$(document).ready(function() {
	var module = {
		moveCount: 0
	};

	module.eventHandlers = function() {
		$('.board__cell').on('click', this.makeMove);
	};

	module.makeMove = function(event) {
		var cell = $(event.target);
		var move = module.moveCount % 2 === 0 ? 'x' : 'o';
		cell.addClass(move);

		// After the 5th move, start watching for a winner.
		if (module.moveCount >= 4) {
			module.checkForWinner();
		}
		// Increment moveCount
		module.moveCount++;
	}

	module.checkForWinner = function() {
		console.log('chcking for winner!', module.moveCount);

		$.each($('.board__row'), function(index, row) {

			// Does 'x' have 3 in a row, horizontally?
			if ( $(row).children('.x').length === 3 ) {
				$(row).addClass('winner');
				console.log('x has won horitzontally', row);
				return false;

			// Does 'o' have 3 in a row, horizontally?
			} else if ( $(row).children('.o').length === 3 ) {
				$(row).addClass('winner');
				console.log('o has won horitzontally', row);
				return false;
			}
		});
	}

	module.eventHandlers();
})