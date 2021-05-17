'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markField);

        function markField(e) {
            var field = e.target;
            field.setAttribute('aria-label', "x");
            field.setAttribute('disabled', 'disabled');
            current = 1 - current;
            hint.innerText = 'Spieler ' + players[current] + ' ist am Zug.';
            checkIfCompleted();
        }


});