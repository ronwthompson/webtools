document.getElementById('engSelect').addEventListener("click", function() { //switch between eng to kor keyboards
    document.getElementById('engSelect').classList.add('active');
    document.getElementById('korSelect').classList.remove('active');

    var y = document.getElementsByClassName('kor');
    for (var q = 0; q<y.length; q++){
    	y[q].classList.add('hidden');
    }

    var z = document.getElementsByClassName('eng');
    for (var q = 0; q<z.length; q++){
    	z[q].classList.remove('hidden');
    }
});

document.getElementById('korSelect').addEventListener("click", function() {
    document.getElementById('korSelect').classList.add('active');
    document.getElementById('engSelect').classList.remove('active');

    var y = document.getElementsByClassName('eng');
    for (var q = 0; q<y.length; q++){
    	y[q].classList.add('hidden');
    }

    var z = document.getElementsByClassName('kor');
    for (var q = 0; q<z.length; q++){
    	z[q].classList.remove('hidden');
    }
});

function insertAtCaret(text) { //inserts text at cursor location in textarea (or replaces text if text is selected)
    var txtarea = document.getElementById('displayedText');
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
	txtarea.selectionStart = caretPos;
	txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function selectCurrentKor() {
	var txtarea = document.getElementById('displayedText');
    var caretPos = txtarea.selectionEnd;

    txtarea.selectionStart = caretPos-1;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function deselect() {
	var txtarea = document.getElementById('displayedText');
    var caretPos = txtarea.selectionEnd;

    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function backAtCaret() { //backspace text at cursor location in textarea (or deletes text if text is selected)
    var txtarea = document.getElementById('displayedText');
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos-1);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + back;
    caretPos = caretPos-1;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function deleteAtCaret() { //backspace text at cursor location in textarea (or deletes text if text is selected)
    var txtarea = document.getElementById('displayedText');
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd+1, txtarea.value.length);
    txtarea.value = front + back;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
}

function previousChar() { //reports character before caret
	var txtarea = document.getElementById('displayedText');
    var caretPos = txtarea.selectionEnd;

    return (txtarea.value).substring(caretPos-1, caretPos);
}

function checkSelect() { //checks to see if any text is selected
	var txtarea = document.getElementById('displayedText');
	if (txtarea.selectionStart != txtarea.selectionEnd) {
		return true;
	} else {
		return false;
	}
}

var consonants = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
var thirdLetter = ['ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
var secondLetterExceps = ['ㅗ','ㅜ','ㅡ'];
var thirdLetterVowelv1 = ['ㅏ','ㅐ','ㅣ'];
var thirdLetterVowelv2 = ['ㅓ','ㅔ','ㅣ'];
var doubleContPrelims = ['ㄱ','ㄴ','ㄹ','ㅂ'];
var doubleContEndings = ['ㅅ','ㅈ','ㅎ','ㄱ','ㅁ','ㅂ','ㅌ','ㅍ','ㅎ'];

var intKorLetter = '';

function addLetterToChar(newLetter) { //adds korean letter to char
	if (consonants.indexOf(previousChar()) > -1 && consonants.indexOf(newLetter) == -1 && checkSelect() == true) { //move from 1 letter in char to 2 letters in char
		var firstLetter = (consonants.indexOf(previousChar()))*588;
		var seccondLetter = (newLetter.charCodeAt(0)-12623)*28;
		var offset = 44032;
		insertAtCaret(String.fromCharCode(firstLetter+seccondLetter+offset));
		selectCurrentKor();
		intKorLetter = newLetter;
	} else if (((previousChar().charCodeAt(0) - 44032) % 28) == 0 && checkSelect() == true) { //move from 2 letters in char to 3 letters in char (and 3->4 if second and third letter is a vowel)
		if (thirdLetter.indexOf(newLetter) > -1){ //if const
			var addLetter = previousChar().charCodeAt(0)+thirdLetter.indexOf(newLetter)+1;
			insertAtCaret(String.fromCharCode(addLetter));
			selectCurrentKor();
			intKorLetter = newLetter;
		} else if ((thirdLetterVowelv1.indexOf(newLetter) > -1 || thirdLetterVowelv2.indexOf(newLetter) > -1) && secondLetterExceps.indexOf(intKorLetter) > -1) { //if vowel exceptions
			if (secondLetterExceps.indexOf(intKorLetter) == 0 && (newLetter == 'ㅏ' || newLetter == 'ㅐ' || newLetter == 'ㅣ')){ //for ㅗ
				var addLetter = previousChar().charCodeAt(0)+(thirdLetterVowelv1.indexOf(newLetter)*28)+28;
				insertAtCaret(String.fromCharCode(addLetter));
				selectCurrentKor();
				intKorLetter = newLetter;
			} else if (secondLetterExceps.indexOf(intKorLetter) == 1 && (newLetter == 'ㅓ' || newLetter == 'ㅔ' || newLetter == 'ㅣ')) { //for ㅜ
				var addLetter = previousChar().charCodeAt(0)+(thirdLetterVowelv2.indexOf(newLetter)*28)+28;
				insertAtCaret(String.fromCharCode(addLetter));
				selectCurrentKor();
				intKorLetter = newLetter;
			} else if (intKorLetter == 'ㅡ' && newLetter == 'ㅣ') { //for ㅡ
				var addLetter = previousChar().charCodeAt(0)+28;
				insertAtCaret(String.fromCharCode(addLetter));
				selectCurrentKor();
				intKorLetter = newLetter;
			} else {
				insertAtCaret(newLetter);
				selectCurrentKor();
				intKorLetter = '';
				intKorLetter = newLetter;
			}
		} else {
			deselect();
			insertAtCaret(newLetter);
			intKorLetter = '';
		}
	} else if (doubleContPrelims.indexOf(intKorLetter) > -1 && doubleContEndings.indexOf(newLetter) > -1 && checkSelect() == true) { //if last letter is double cons
		switch (intKorLetter){
			case 'ㄱ':
				if (newLetter == 'ㅅ') {
					var addLetter = previousChar().charCodeAt(0)+2;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = '';
				}
				break;
			case 'ㄴ':
				if (newLetter == 'ㅈ') {
					var addLetter = previousChar().charCodeAt(0)+1;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅎ') {
					var addLetter = previousChar().charCodeAt(0)+2;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = '';
				}
				break;
			case 'ㄹ':
				if (newLetter == 'ㄱ') {
					var addLetter = previousChar().charCodeAt(0)+1;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅁ') {
					var addLetter = previousChar().charCodeAt(0)+2;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅂ') {
					var addLetter = previousChar().charCodeAt(0)+3;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅅ') {
					var addLetter = previousChar().charCodeAt(0)+4;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅌ') {
					var addLetter = previousChar().charCodeAt(0)+5;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅍ') {
					var addLetter = previousChar().charCodeAt(0)+6;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else if (newLetter == 'ㅎ') {
					var addLetter = previousChar().charCodeAt(0)+7;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = '';
				}
				break;
			case 'ㅂ':
				if (newLetter == 'ㅅ') {
					var addLetter = previousChar().charCodeAt(0)+1;
					insertAtCaret(String.fromCharCode(addLetter));
					deselect();
					intKorLetter = '';
				} else {
					deselect();
					insertAtCaret(newLetter);
					intKorLetter = '';
				}
				break;
		}
	} else {
		deselect();
		insertAtCaret(newLetter);
		intKorLetter = '';
	}
}

document.onkeypress = function(e) { //keyboard press listener
	clickButton(e.key.toLowerCase());
}

document.onkeydown = function(e) {
	switch(e.key){ //for non-print keyboard presses
		case '`':
			clickButton('tilda');
			break;
		case 'Backspace':
			backAtCaret();
			break;
		case 'Delete':
			deleteAtCaret();
			break;
		case 'Tab':
			clickButton('	');
			break;
		case 'CapsLock':
			if ((document.getElementById('capsLock').className).indexOf('active') == -1) {
				document.getElementById('capsLock').classList.add('active');
				shiftOn();
			} else {
				document.getElementById('capsLock').classList.remove('active');
				shiftOff();
			};
			break;
		case 'Enter':
			clickButton('\n');
			break;
		case 'Shift':
			document.getElementById('leftShift').classList.add('active');
			document.getElementById('rightShift').classList.add('active');
			shiftOn();
			break;
		case 'Control':
			console.log('Control');
			break;
		case 'Alt':
			console.log('Alt');
			break;
		case 'ArrowLeft':
			var txtarea = document.getElementById('displayedText');
		    var caretPos = txtarea.selectionEnd;
		    if (txtarea.selectionStart != caretPos){
		    	deselect();
		    	intKorLetter = '';
		    }
		    txtarea.selectionStart = caretPos-1;
		    txtarea.selectionEnd = caretPos-1;
		    txtarea.focus();
		    break;
		case 'ArrowRight':
			var txtarea = document.getElementById('displayedText');
		    var caretPos = txtarea.selectionEnd;
		    if (txtarea.selectionStart != caretPos){
		    	deselect();
		    	intKorLetter = '';
		    } else {
		    	txtarea.selectionStart = caretPos+1;
		    	txtarea.selectionEnd = caretPos+1;
		    }
		    txtarea.focus();
			break;
	}
	toggleActive(e.key, e.type);
}

document.onkeyup = function(e) {
	if (e.key == 'Shift'){
		document.getElementById('leftShift').classList.remove('active');
		document.getElementById('rightShift').classList.remove('active');
		if ((document.getElementById('capsLock').className).indexOf('active') == -1){
			shiftOff();
		}
	}
	toggleActive(e.key, e.type);
}

function toggleActive(whichKey, upOrDown) { //show onscreen which keys are being pressed
	if (whichKey != '`' &&
		whichKey != '-' &&
		whichKey != '=' &&
		whichKey != 'Backspace' &&
		whichKey != 'Tab' &&
		whichKey != '[' &&
		whichKey != ']' &&
		whichKey != '\\' &&
		whichKey != 'CapsLock' &&
		whichKey != ';' &&
		whichKey != "'" &&
		whichKey != 'Enter' &&
		whichKey != 'Shift' &&
		whichKey != ',' &&
		whichKey != '.' &&
		whichKey != '/' &&
		whichKey != 'Control' &&
		whichKey != 'Alt' &&
		whichKey != ' ') {
		if (upOrDown == 'keydown' && document.getElementById(whichKey) != null){
			document.getElementById(whichKey).classList.add('active');
		} else if (document.getElementById(whichKey) != null) {
			document.getElementById(whichKey).classList.remove('active');
		}
	} else {
		if (upOrDown == 'keydown'){
			switch (whichKey){
				case '`':
					document.getElementById('tilda').classList.add('active');
					break;
				case '-':
					document.getElementById('minus').classList.add('active');
					break;
				case '=':
					document.getElementById('equals').classList.add('active');
					break;
				case 'Backspace':
					document.getElementById('backspace').classList.add('active');
					break;
				case 'Tab':
					document.getElementById('tab').classList.add('active');
					break;
				case '[':
					document.getElementById('leftBracket').classList.add('active');
					break;
				case ']':
					document.getElementById('rightBracket').classList.add('active');
					break;
				case '\\':
					document.getElementById('frontSlash').classList.add('active');
					break;
				case ';':
					document.getElementById('semicolon').classList.add('active');
					break;
				case "'":
					document.getElementById('quote').classList.add('active');
					break;
				case 'Enter':
					document.getElementById('enter').classList.add('active');
					break;
				case ',':
					document.getElementById('comma').classList.add('active');
					break;
				case '.':
					document.getElementById('period').classList.add('active');
					break;
				case '/':
					document.getElementById('backSlash').classList.add('active');
					break;
				case ' ':
					document.getElementById('spacebar').classList.add('active');
					break;
			}
		} else {
			switch (whichKey){
				case '`':
					document.getElementById('tilda').classList.remove('active');
					break;
				case '-':
					document.getElementById('minus').classList.remove('active');
					break;
				case '=':
					document.getElementById('equals').classList.remove('active');
					break;
				case 'Backspace':
					document.getElementById('backspace').classList.remove('active');
					break;
				case 'Tab':
					document.getElementById('tab').classList.remove('active');
					break;
				case '[':
					document.getElementById('leftBracket').classList.remove('active');
					break;
				case ']':
					document.getElementById('rightBracket').classList.remove('active');
					break;
				case '\\':
					document.getElementById('frontSlash').classList.remove('active');
					break;
				case ';':
					document.getElementById('semicolon').classList.remove('active');
					break;
				case "'":
					document.getElementById('quote').classList.remove('active');
					break;
				case 'Enter':
					document.getElementById('enter').classList.remove('active');
					break;
				case ',':
					document.getElementById('comma').classList.remove('active');
					break;
				case '.':
					document.getElementById('period').classList.remove('active');
					break;
				case '/':
					document.getElementById('backSlash').classList.remove('active');
					break;
				case ' ':
					document.getElementById('spacebar').classList.remove('active');
					break;
			}
		}
	}
}

var key = document.getElementsByClassName("key");

var makeListeners = function() {
	clickButton(this.getAttribute("id"));
}

for (var i = 0; i < key.length; i++) { //put a click listener on each key
	key[i].addEventListener('click', makeListeners, false);
	key[i].addEventListener('mousedown', function(){
											this.classList.add('active');
											});
	key[i].addEventListener('mouseup', function(){
											this.classList.remove('active');
											});
}

function shiftOn () {
	if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //shift english keyboard display
		var y = document.getElementsByClassName('eng');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.add('hidden');
	    }

	    var z = document.getElementsByClassName('ecapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.remove('hidden');
	    }

	    var y = document.getElementsByClassName('norm');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.add('hidden');
	    }

	    var z = document.getElementsByClassName('ncapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.remove('hidden');
	    }
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //shift korean keyboard display
		var y = document.getElementsByClassName('noncapital');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.add('hidden');
	    }

	    var z = document.getElementsByClassName('kcapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.remove('hidden');
	    }

	    var y = document.getElementsByClassName('norm');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.add('hidden');
	    }

	    var z = document.getElementsByClassName('ncapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.remove('hidden');
	    }
	} 
}

function shiftOff () {
	if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //shift english keyboard display back to lower
		var y = document.getElementsByClassName('eng');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.remove('hidden');
	    }

	    var z = document.getElementsByClassName('ecapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.add('hidden');
	    }

	    var y = document.getElementsByClassName('norm');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.remove('hidden');
	    }

	    var z = document.getElementsByClassName('ncapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.add('hidden');
	    }
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //shift korean keyboard display back to lower
		var y = document.getElementsByClassName('noncapital');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.remove('hidden');
	    }

	    var z = document.getElementsByClassName('kcapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.add('hidden');
	    }

	    var y = document.getElementsByClassName('norm');
	    for (var q = 0; q<y.length; q++){
	    	y[q].classList.remove('hidden');
	    }

	    var z = document.getElementsByClassName('ncapital');
	    for (var q = 0; q<z.length; q++){
	    	z[q].classList.add('hidden');
	    }
	}
}

function clickButton(buttonId) { //onscreen clicks
	var charToAdd = '';
	if (((document.getElementById('capsLock').className).indexOf('active') == -1) && ((document.getElementById('leftShift').className).indexOf('active') == -1)) {
		switch(buttonId){ //non-alpha chars with no shift/caps
			case 'tilda':
				charToAdd = '`';
				break;
			case '1':
				charToAdd = '1';
				break;
			case '2':
				charToAdd = '2';
				break;
			case '3':
				charToAdd = '3';
				break;
			case '4':
				charToAdd = '4';
				break;
			case '5':
				charToAdd = '5';
				break;
			case '6':
				charToAdd = '6';
				break;
			case '7':
				charToAdd = '7';
				break;
			case '8':
				charToAdd = '8';
				break;
			case '9':
				charToAdd = '9';
				break;
			case '0':
				charToAdd = '0';
				break;
			case 'minus':
				charToAdd = '-';
				break;
			case 'equals':
				charToAdd = '=';
				break;
			case 'backspace':
				backAtCaret();
				break;
			case 'tab':
				charToAdd = '	';
				break;
			case 'leftBracket':
				charToAdd = '[';
				break;
			case 'rightBracket':
				charToAdd = ']';
				break;
			case 'frontSlash':
				charToAdd = '\\';
				break;
			case 'capsLock':
				if ((document.getElementById('capsLock').className).indexOf('active') == -1) {
					document.getElementById('capsLock').classList.add('active');
					shiftOn();
				} else {
					document.getElementById('capsLock').classList.remove('active');
					shiftOff();
				};
				break;
			case 'semicolon':
				charToAdd = ';';
				break;
			case 'quote':
				charToAdd = "'";
				break;
			case 'enter':
				charToAdd = '\n';
				break;
			case '\n':
				charToAdd = '\n';
				break;
			case 'leftShift':
				if ((document.getElementById('leftShift').className).indexOf('active') == -1) {
					document.getElementById('leftShift').classList.add('active');
					document.getElementById('rightShift').classList.add('active');
					shiftOn();
				} else {
					document.getElementById('leftShift').classList.remove('active');
					document.getElementById('rightShift').classList.remove('active');
					shiftOff();
				};
				break;
			case 'rightShift':
				if ((document.getElementById('rightShift').className).indexOf('active') == -1) {
					document.getElementById('leftShift').classList.add('active');
					document.getElementById('rightShift').classList.add('active');
					shiftOn();
				} else {
					document.getElementById('leftShift').classList.remove('active');
					document.getElementById('rightShift').classList.remove('active');
					shiftOff();
				};
				break;
			case 'comma':
				charToAdd = ',';
				break;
			case 'period':
				charToAdd = '.';
				break;
			case 'backSlash':
				charToAdd = '/';
				break;
			case 'spacebar':
				charToAdd = ' ';
				break;
			case '-':
				charToAdd = '-';
				break;
			case '=':
				charToAdd = '=';
				break;
			case '[':
				charToAdd = '[';
				break;
			case ']':
				charToAdd = ']';
				break;
			case '\\':
				charToAdd = '\\';
				break;
			case ';':
				charToAdd = ';';
				break;
			case '\'':
				charToAdd = "'";
				break;
			case ',':
				charToAdd = ',';
				break;
			case '.':
				charToAdd = '.';
				break;
			case '/':
				charToAdd = '/';
				break;
			case ' ':
				charToAdd = ' ';
				break;
			case '	':
				charToAdd = '	';
				break;
			case 'ArrowLeft':
				var txtarea = document.getElementById('displayedText');
			    var caretPos = txtarea.selectionEnd;
			    if (txtarea.selectionStart != caretPos){
			    	deselect();
			    	intKorLetter = '';
			    }
			    txtarea.selectionStart = caretPos-1;
			    txtarea.selectionEnd = caretPos-1;
			    txtarea.focus();
			    break;
			case 'ArrowRight':
				var txtarea = document.getElementById('displayedText');
			    var caretPos = txtarea.selectionEnd;
			    if (txtarea.selectionStart != caretPos){
			    	deselect();
			    	intKorLetter = '';
			    } else {
			    	txtarea.selectionStart = caretPos+1;
			    	txtarea.selectionEnd = caretPos+1;
			    }
			    txtarea.focus();
				break;
		}
		if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //english characters with no shift/caps
			switch(buttonId){
				case 'q':
					charToAdd = 'q';
					break;
				case 'w':
					charToAdd = 'w';
					break;
				case 'e':
					charToAdd = 'e';
					break;
				case 'r':
					charToAdd = 'r';
					break;
				case 't':
					charToAdd = 't';
					break;
				case 'y':
					charToAdd = 'y';
					break;
				case 'u':
					charToAdd = 'u';
					break;
				case 'i':
					charToAdd = 'i';
					break;
				case 'o':
					charToAdd = 'o';
					break;
				case 'p':
					charToAdd = 'p';
					break;
				case 'a':
					charToAdd = 'a';
					break;
				case 's':
					charToAdd = 's';
					break;
				case 'd':
					charToAdd = 'd';
					break;
				case 'f':
					charToAdd = 'f';
					break;
				case 'g':
					charToAdd = 'g';
					break;
				case 'h':
					charToAdd = 'h';
					break;
				case 'j':
					charToAdd = 'j';
					break;
				case 'k':
					charToAdd = 'k';
					break;
				case 'l':
					charToAdd = 'l';
					break;
				case 'z':
					charToAdd = 'z';
					break;
				case 'x':
					charToAdd = 'x';
					break;
				case 'c':
					charToAdd = 'c';
					break;
				case 'v':
					charToAdd = 'v';
					break;
				case 'b':
					charToAdd = 'b';
					break;
				case 'n':
					charToAdd = 'n';
					break;
				case 'm':
					charToAdd = 'm';
					break;
			}
		} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //korean characters with no shift/caps
			switch(buttonId){
				case 'q':
					charToAdd = 'ㅂ';
					break;
				case 'w':
					charToAdd = 'ㅈ';
					break;
				case 'e':
					charToAdd = 'ㄷ';
					break;
				case 'r':
					charToAdd = 'ㄱ';
					break;
				case 't':
					charToAdd = 'ㅅ';
					break;
				case 'y':
					charToAdd = 'ㅛ';
					break;
				case 'u':
					charToAdd = 'ㅕ';
					break;
				case 'i':
					charToAdd = 'ㅑ';
					break;
				case 'o':
					charToAdd = 'ㅐ';
					break;
				case 'p':
					charToAdd = 'ㅔ';
					break;
				case 'a':
					charToAdd = 'ㅁ';
					break;
				case 's':
					charToAdd = 'ㄴ';
					break;
				case 'd':
					charToAdd = 'ㅇ';
					break;
				case 'f':
					charToAdd = 'ㄹ';
					break;
				case 'g':
					charToAdd = 'ㅎ';
					break;
				case 'h':
					charToAdd = 'ㅗ';
					break;
				case 'j':
					charToAdd = 'ㅓ';
					break;
				case 'k':
					charToAdd = 'ㅏ';
					break;
				case 'l':
					charToAdd = 'ㅣ';
					break;
				case 'z':
					charToAdd = 'ㅋ';
					break;
				case 'x':
					charToAdd = 'ㅌ';
					break;
				case 'c':
					charToAdd = 'ㅊ';
					break;
				case 'v':
					charToAdd = 'ㅍ';
					break;
				case 'b':
					charToAdd = 'ㅠ';
					break;
				case 'n':
					charToAdd = 'ㅜ';
					break;
				case 'm':
					charToAdd = 'ㅡ';
					break;
			}
		};
	} else if (((document.getElementById('capsLock').className).indexOf('active') > -1) || ((document.getElementById('leftShift').className).indexOf('active') > -1)) {
		switch(buttonId){ //non-alpha chars with shift/caps
			case 'tilda':
				charToAdd = '~';
				break;
			case '1':
				charToAdd = '!';
				break;
			case '2':
				charToAdd = '@';
				break;
			case '3':
				charToAdd = '#';
				break;
			case '4':
				charToAdd = '$';
				break;
			case '5':
				charToAdd = '%';
				break;
			case '6':
				charToAdd = '^';
				break;
			case '7':
				charToAdd = '&';
				break;
			case '8':
				charToAdd = '*';
				break;
			case '9':
				charToAdd = '(';
				break;
			case '0':
				charToAdd = ')';
				break;
			case 'minus':
				charToAdd = '_';
				break;
			case 'equals':
				charToAdd = '+';
				break;
			case 'backspace':
				backAtCaret();
				break;
			case 'tab':
				charToAdd = '	';
				break;
			case 'leftBracket':
				charToAdd = '{';
				break;
			case 'rightBracket':
				charToAdd = '}';
				break;
			case 'frontSlash':
				charToAdd = '|';
				break;
			case 'capsLock':
				if ((document.getElementById('capsLock').className).indexOf('active') == -1) {
					document.getElementById('capsLock').classList.add('active');
					shiftOn();
				} else {
					document.getElementById('capsLock').classList.remove('active');
					shiftOff();
				};
				break;
			case 'semicolon':
				charToAdd = ':';
				break;
			case 'quote':
				charToAdd = '"';
				break;
			case 'enter':
				charToAdd = '\n';
				break;
			case '\n':
				charToAdd = '\n';
				break;
			case 'leftShift':
				if ((document.getElementById('leftShift').className).indexOf('active') == -1) {
					document.getElementById('leftShift').classList.add('active');
					document.getElementById('rightShift').classList.add('active');
					shiftOn();
				} else {
					document.getElementById('leftShift').classList.remove('active');
					document.getElementById('rightShift').classList.remove('active');
					shiftOff();
				};
				break;
			case 'rightShift':
				if ((document.getElementById('rightShift').className).indexOf('active') == -1) {
					document.getElementById('leftShift').classList.add('active');
					document.getElementById('rightShift').classList.add('active');
					shiftOn();
				} else {
					document.getElementById('leftShift').classList.remove('active');
					document.getElementById('rightShift').classList.remove('active');
					shiftOff();
				};
				break;
			case 'comma':
				charToAdd = '<';
				break;
			case 'period':
				charToAdd = '>';
				break;
			case 'backSlash':
				charToAdd = '?';
				break;
			case 'spacebar':
				charToAdd = ' ';
				break;
			case '-':
				charToAdd = '_';
				break;
			case '=':
				charToAdd = '+';
				break;
			case '[':
				charToAdd = '{';
				break;
			case ']':
				charToAdd = '}';
				break;
			case '\\':
				charToAdd = '|';
				break;
			case ';':
				charToAdd = ':';
				break;
			case '\'':
				charToAdd = '"';
				break;
			case ',':
				charToAdd = '<';
				break;
			case '.':
				charToAdd = '>';
				break;
			case '/':
				charToAdd = '?';
				break;
			case '~':
				charToAdd = '~';
				break;
			case '!':
				charToAdd = '!';
				break;
			case '@':
				charToAdd = '@';
				break;
			case '#':
				charToAdd = '#';
				break;
			case '$':
				charToAdd = '$';
				break;
			case '%':
				charToAdd = '%';
				break;
			case '^':
				charToAdd = '^';
				break;
			case '&':
				charToAdd = '&';
				break;
			case '*':
				charToAdd = '*';
				break;
			case '(':
				charToAdd = '(';
				break;
			case ')':
				charToAdd = ')';
				break;
			case '_':
				charToAdd = '_';
				break;
			case '+':
				charToAdd = '+';
				break;
			case '{':
				charToAdd = '{';
				break;
			case '}':
				charToAdd = '}';
				break;
			case '|':
				charToAdd = '|';
				break;
			case ':':
				charToAdd = ':';
				break;
			case '"':
				charToAdd = '"';
				break;
			case '<':
				charToAdd = '<';
				break;
			case '>':
				charToAdd = '>';
				break;
			case '?':
				charToAdd = '?';
				break;
			case ' ':
				charToAdd = ' ';
				break;
			case '	':
				charToAdd = '	';
				break;
			case 'ArrowLeft':
				var txtarea = document.getElementById('displayedText');
			    var caretPos = txtarea.selectionEnd;
			    if (txtarea.selectionStart != caretPos){
			    	deselect();
			    	intKorLetter = '';
			    }
			    txtarea.selectionStart = caretPos-1;
			    txtarea.selectionEnd = caretPos-1;
			    txtarea.focus();
			    break;
			case 'ArrowRight':
				var txtarea = document.getElementById('displayedText');
			    var caretPos = txtarea.selectionEnd;
			    if (txtarea.selectionStart != caretPos){
			    	deselect();
			    	intKorLetter = '';
			    } else {
			    	txtarea.selectionStart = caretPos+1;
			    	txtarea.selectionEnd = caretPos+1;
			    }
			    txtarea.focus();
				break;
		}
		if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //english characters with shift/caps
			switch(buttonId){
				case 'q':
					charToAdd = 'Q';
					break;
				case 'w':
					charToAdd = 'W';
					break;
				case 'e':
					charToAdd = 'E';
					break;
				case 'r':
					charToAdd = 'R';
					break;
				case 't':
					charToAdd = 'T';
					break;
				case 'y':
					charToAdd = 'Y';
					break;
				case 'u':
					charToAdd = 'U';
					break;
				case 'i':
					charToAdd = 'I';
					break;
				case 'o':
					charToAdd = 'O';
					break;
				case 'p':
					charToAdd = 'P';
					break;
				case 'a':
					charToAdd = 'A';
					break;
				case 's':
					charToAdd = 'S';
					break;
				case 'd':
					charToAdd = 'D';
					break;
				case 'f':
					charToAdd = 'F';
					break;
				case 'g':
					charToAdd = 'G';
					break;
				case 'h':
					charToAdd = 'H';
					break;
				case 'j':
					charToAdd = 'J';
					break;
				case 'k':
					charToAdd = 'K';
					break;
				case 'l':
					charToAdd = 'L';
					break;
				case 'z':
					charToAdd = 'Z';
					break;
				case 'x':
					charToAdd = 'X';
					break;
				case 'c':
					charToAdd = 'C';
					break;
				case 'v':
					charToAdd = 'V';
					break;
				case 'b':
					charToAdd = 'B';
					break;
				case 'n':
					charToAdd = 'N';
					break;
				case 'm':
					charToAdd = 'M';
					break;
			}
		} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //korean characters with shift/caps
			switch(buttonId){
				case 'q':
					charToAdd = 'ㅃ';
					break;
				case 'w':
					charToAdd = 'ㅉ';
					break;
				case 'e':
					charToAdd = 'ㄸ';
					break;
				case 'r':
					charToAdd = 'ㄲ';
					break;
				case 't':
					charToAdd = 'ㅆ';
					break;
				case 'y':
					charToAdd = 'ㅛ';
					break;
				case 'u':
					charToAdd = 'ㅕ';
					break;
				case 'i':
					charToAdd = 'ㅑ';
					break;
				case 'o':
					charToAdd = 'ㅒ';
					break;
				case 'p':
					charToAdd = 'ㅖ';
					break;
				case 'a':
					charToAdd = 'ㅁ';
					break;
				case 's':
					charToAdd = 'ㄴ';
					break;
				case 'd':
					charToAdd = 'ㅇ';
					break;
				case 'f':
					charToAdd = 'ㄹ';
					break;
				case 'g':
					charToAdd = 'ㅎ';
					break;
				case 'h':
					charToAdd = 'ㅗ';
					break;
				case 'j':
					charToAdd = 'ㅓ';
					break;
				case 'k':
					charToAdd = 'ㅏ';
					break;
				case 'l':
					charToAdd = 'ㅣ';
					break;
				case 'z':
					charToAdd = 'ㅋ';
					break;
				case 'x':
					charToAdd = 'ㅌ';
					break;
				case 'c':
					charToAdd = 'ㅊ';
					break;
				case 'v':
					charToAdd = 'ㅍ';
					break;
				case 'b':
					charToAdd = 'ㅠ';
					break;
				case 'n':
					charToAdd = 'ㅜ';
					break;
				case 'm':
					charToAdd = 'ㅡ';
					break;
			}
		};
	}
	if (charToAdd.charCodeAt(0) == 9 || //tab
		(charToAdd.charCodeAt(0) >= 32 && charToAdd.charCodeAt(0) <= 126) || //eng letters and numbers
		(charToAdd.charCodeAt(0) >= 186 && charToAdd.charCodeAt(0) <= 191) || //some symbols
		(charToAdd.charCodeAt(0) == 219 || charToAdd.charCodeAt(0) == 222) //more symbols
		) {
		insertAtCaret(charToAdd);
	} else if (charToAdd != '') {
		addLetterToChar(charToAdd);
		selectCurrentKor();
	}
}

//functions for korean character debugging

function charCodes(letter){
	return letter.charCodeAt(0);
}

function revCharCodes(num){
	return String.fromCharCode(num);
}