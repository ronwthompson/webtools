document.getElementById('engSelect').addEventListener("click", function() { //switch between eng to kor keyboards
    document.getElementById('engSelect').classList.add('active');
    document.getElementById('korSelect').classList.remove('active');
});

document.getElementById('korSelect').addEventListener("click", function() {
    document.getElementById('korSelect').classList.add('active');
    document.getElementById('engSelect').classList.remove('active');
});

function insertAtCaret(text) { //inserts text at cursor location in textarea (or replaces text if text is selected)
    var txtarea = document.getElementById('displayedText');
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + text + back;
    caretPos = caretPos + text.length;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
}

function backAtCaret() { //backspace text at cursor location in textarea (or deletes text if text is selected)
    var txtarea = document.getElementById('displayedText');
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos-1);
    var back = (txtarea.value).substring(txtarea.selectionEnd, txtarea.value.length);
    txtarea.value = front + back;
    caretPos = caretPos-1;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
}

function deleteAtCaret() { //backspace text at cursor location in textarea (or deletes text if text is selected)
    var txtarea = document.getElementById('displayedText');
    var scrollPos = txtarea.scrollTop;
    var caretPos = txtarea.selectionStart;

    var front = (txtarea.value).substring(0, caretPos);
    var back = (txtarea.value).substring(txtarea.selectionEnd+1, txtarea.value.length);
    txtarea.value = front + back;
    caretPos = caretPos;
    txtarea.selectionStart = caretPos;
    txtarea.selectionEnd = caretPos;
    txtarea.focus();
    txtarea.scrollTop = scrollPos;
}

document.onkeypress = function(e) { //keyboard press listener
	clickButton(e.key);
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
			console.log('Tab');
			break;
		case 'CapsLock':
			console.log('Caps Lock');
			break;
		case 'Enter':
			clickButton('\n');
			break;
		case 'Shift':
			console.log('Shift');
			break;
		case 'Control':
			console.log('Control');
			break;
		case 'Alt':
			console.log('Alt');
			break;
	}
}

var key = document.getElementsByClassName("key");

var makeListeners = function() {
	clickButton(this.getAttribute("id"));
}

for (var i = 0; i < key.length; i++) { //put a click listener on each key
	key[i].addEventListener('click', makeListeners, false);
}

function clickButton(buttonId) { //onscreen clicks
	var charToAdd = '';
	switch(buttonId){ //non-alpha chars
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
			console.log('BS');
			break;
		case 'tab':
			console.log('TAB');
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
			console.log('Caps');
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
	}
	if ((document.getElementById('engSelect').className).indexOf('active') > -1) { //english characters
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
	} else if ((document.getElementById('korSelect').className).indexOf('active') > -1) { //korean characters
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
	insertAtCaret(charToAdd);
}