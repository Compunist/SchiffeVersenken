'use strict';
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#gameboardHome')
		.addEventListener('click', markFieldH);

        var SchiffeH = [2, 3, 3, 4, 5],
            SchiffsIndex = 4,
            Schiffgroesse,
            NumSchiffsFelder = 0,
            SchiffsFelder = [],  
            fields = document.querySelectorAll('#gameboardHome button'); // fields ist die Liste unserer Felder


        function markFieldH(e) {
            var field = e.target;
            var  letzterClick,
                 nachbarn = [],
                 fi = parseInt(e.target.id);
            
            hintH.innerText = 'Platziere Dein ' + SchiffeH[SchiffsIndex] + 'er Schiff, Zelle für Zelle.';
            Schiffgroesse = SchiffeH[SchiffsIndex];

            if ((NumSchiffsFelder > 0) && (NumSchiffsFelder < Schiffgroesse)) {  // es werden die nächsten nachbarn in Ausdehnunge Richtung ermittelt und wieder enabled   
                if (fi == letzterClick+1) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach rechts 
                    if (!fields[fi+1].hasAttribute('disabled')) {
                        nachbarn.push((fi+1));
                        fields[fi+1].setAttribute('aria-label', "v");
                        fields[fi+1].setAttribute('disabled', null);                   } // rechter nachbar
                    if (!fields[SchiffsFelder[0]-1].hasAttribute('disabled')) {
                        nachbarn.push((SchiffsFelder[0]-1));
                        fields[SchiffsFelder[0]-1].setAttribute('aria-label', "v");
                        fields[SchiffsFelder[0]-1].setAttribute('disabled', null);} // links angrenzend 
                    fields[letzterClick-11].setAttribute('disabled', 'disabled');   // disable senkrechte Nachbarn
                    fields[letzterClick+11].setAttribute('disabled', 'disabled');          
                }         
                if (fi == letzterClick-1) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach links
                    if (!fields[fi-1].hasAttribute('disabled')) {
                        nachbarn.push((fi-1));
                        fields[fi-1].setAttribute('aria-label', "v");
                        fields[fi-1].setAttribute('disabled', null);                   } // linker nachbar
                    if (!fields[SchiffsFelder[NumSchiffsFelder]+1].hasAttribute('disabled')) {
                        nachbarn.push((SchiffsFelder[NumSchiffsFeld]+1));
                        fields[SchiffsFelder[NumSchiffsFeld]+1].setAttribute('aria-label', "v");
                        fields[SchiffsFelder[NumSchiffsFeld]+1].setAttribute('disabled', null);} // rechts angrenzend 
                    fields[letzterClick-11].setAttribute('disabled', 'disabled');   // disable senkrechte Nachbarn
                    fields[letzterClick+11].setAttribute('disabled', 'disabled');          
                }
                if (fi == letzterClick+11) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach unten 
                    if (fi < 110 && !fields[fi+11].hasAttribute('disabled')) {
                        nachbarn.push((fi+11));
                        fields[fi+11].setAttribute('aria-label', "v");
                        fields[fi+11].setAttribute('disabled', null);                   } // unterer nachbar
                    if (!fields[SchiffsFelder[0]-11].hasAttribute('disabled')) {
                        nachbarn.push((SchiffsFelder[0]-11));
                        fields[SchiffsFelder[0]-11].setAttribute('aria-label', "v");
                        fields[SchiffsFelder[0]-11].setAttribute('disabled', null);} // oben angrenzend 
                    fields[letzterClick-1].setAttribute('disabled', 'disabled');   // disable waagrechte Nachbarn
                    fields[letzterClick+1].setAttribute('disabled', 'disabled');          
                }         
                if (fi == letzterClick-11) { // ermittle die Richtung in welcher sich das Boot ausdehnt{  // Ausdehnung nach oben
                    if (!fields[fi-11].hasAttribute('disabled')) {
                        nachbarn.push((fi-11));
                        fields[fi-11].setAttribute('aria-label', "v");
                        fields[fi-11].setAttribute('disabled', null);                   } // oberer nachbar
                    if ((SchiffsFelder[NumSchiffsFelder]+11) < 110 && !fields[SchiffsFelder[NumSchiffsFelder]+11].hasAttribute('disabled')) {
                        nachbarn.push((SchiffsFelder[NumSchiffsFeld]+11));
                        fields[SchiffsFelder[NumSchiffsFeld]+11].setAttribute('aria-label', "v");
                        fields[SchiffsFelder[NumSchiffsFeld]+11].setAttribute('disabled', null);} // unten angrenzend 
                    fields[letzterClick-1].setAttribute('disabled', 'disabled');   // disable senkrechte Nachbarn
                    fields[letzterClick+1].setAttribute('disabled', 'disabled');          
                }                
  
                // das gwählte Feld wird gesetzt  
                field.setAttribute('aria-label', "y");
                field.setAttribute('disabled', 'disabled');
            }            
            if (NumSchiffsFelder == 0) {      // alle Felder sind verfügbar
                letzterClick = fi;
                SchiffsFelder.push(fi);
                // es werden alle Felder die noch nicht disabled sind mit dem label 'l' als locked gekenzeichnet.
                for (var i = 0; i < fields.length; i++) {
                    if (!fields[i].hasAttribute('disabled')) {
                        fields[i].setAttribute('aria-label', "l");
                    }
                }  
                // das gewählte Feld wird gesetzt  
                field.setAttribute('aria-label', "y");
                field.setAttribute('disabled', 'disabled');
                // jetzt werden alle angrenzenden Felder ermittelt und das 'locked label durch ein v =  valid ersetzt
                if (!fields[fi-1].hasAttribute('disabled')) {nachbarn.push((fi-1));fields[fi-1].setAttribute('aria-label', "v");   } // linker nachbar
                if (!fields[fi+1].hasAttribute('disabled')) {nachbarn.push((fi+1));fields[fi+1].setAttribute('aria-label', "v");} // rechter nachbar                
                if (!fields[fi-11].hasAttribute('disabled')) { nachbarn.push((fi-11)); fields[fi-11].setAttribute('aria-label', "v");} // oberer nachbar
                if (fi < 110 && !fields[fi+11].hasAttribute('disabled')) { nachbarn.push((fi+11)); fields[fi+11].setAttribute('aria-label', "v");} // unterer nachbar
                 
                // alle Felder die nicht angrenzen jetzt also locked sind werden jetzt disabled um ungültige clicks zu verhindern.                
                for (var i = 0; i < fields.length; i++) {
                    if (fields[i].getAttribute('aria-label') == "l") {
                        fields[i].setAttribute('disabled', 'disabled');
                    }
                }
            }
            if (NumSchiffsFelder < Schiffgroesse) {NumSchiffsFelder ++;}
            else {
                NumSchiffsFelder = 0; 
                if (SchiffsIndex > 0) { SchiffsIndex--;}
                else {  // alle Schiffe sind plaziert das Feld wird versiegelt
                    for (var i = 0; i < fields.length; i++) {
                        fields[i].setAttribute('disabled', 'disabled');
                    }
                }

            }    
        }


        document.querySelector('#gameboardEnemy')
		.addEventListener('click', markFieldE);

        function markFieldE(e) {
            var field = e.target;
            field.setAttribute('aria-label', "o");
            field.setAttribute('disabled', 'disabled');
        }


});