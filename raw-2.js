var game_TEXT = "";
var text_array = []; 									//KeyCode of texts 
var dom_text = document.querySelector("#txt");			
var dom_showcase = document.querySelector("#showcase");
var scanner = document.querySelector("#scanner");		
var checker = document.querySelector("#checker");
var checker1 = document.querySelector("#checker1");
var CanSkip = true; 									//daraagiin ug ruu shiljij boloh
var Wrong_Chars = 0 ;									//Escape darsan tohioldold hedii boltol CanSkip n true utgatai boloh 
var words = game_TEXT.split(" ");
var current_iterator = 0 ;
var Least_iterator = 0;									//Uunees dooshoo backspace darwal current iterator heregjihgv
														//Space daraad daraagiin ug ruu shiljihed ashiglana
scanner.addEventListener("keypress",keyPush);
scanner.addEventListener("keydown",backspace);

//Initialize
readTextFile();

function readTextFile() {
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "hello.txt", true);
	rawFile.onreadystatechange = function() 
	{
		if (rawFile.readyState === 4) 
		{
			var allText = rawFile.responseText;
			game_TEXT = allText;
			dom_text.innerHTML = game_TEXT;
			text_array = game_TEXT.split('').map( function(char){		//CharToKeyCode
				return char.charCodeAt(0);
			});			
		}
	}
	rawFile.send();
}

function backspace(e)
{
	if (e.keyCode == 8 && current_iterator > Least_iterator )
	{		
		if ( Wrong_Chars == Least_iterator )			
		{
			checker.innerHTML = "yes";
			CanSkip = true;
		}
		if ( current_iterator > Least_iterator )
		{
			Wrong_Chars--;			
			current_iterator--;
		}
	}
	
	if ( e.keyCode == 32 && e.keyCode == text_array[current_iterator] )
	{
		CanSkip = true;	
		checker.innerHTML = "ok";
		scanner.value = "";
		Least_iterator = current_iterator;
		current_iterator++;
	}
	checker1.innerHTML = current_iterator;
}

function keyPush(e)
{

	if ( (e.keyCode >= 65 && e.keyCode <= 90 ) || (e.keyCode >= 96 && e.keyCode <= 105 ) || ( e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 1040 && e.keyCode <= 1305))
	{
		if ( e.keyCode == text_array[current_iterator] && CanSkip )
		{
			checker.innerHTML = "ok";
			CanSkip = true;
		}
		else
		{
			checker.innerHTML = "nope";
			CanSkip = false;
			Wrong_Chars++;
		}
		current_iterator++;
		checker1.innerHTML = current_iterator + " || " + Least_iterator;
	}	
}	
