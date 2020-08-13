/**
 * Author: Gurjot Sandhu
 * last edited 2020-08-13
 * A basic four function calculator
 */

var m = document.getElementById('m')
var a = document.getElementById('a')
var d = document.getElementById('d')
var s = document.getElementById('s');
var se = document.getElementById('ce');
var back = document.getElementById('back');
var enter = document.getElementById('enter');
var neg = document.getElementById('neg');
var decimal = document.getElementById('decimal');

var buttons = [];

//Storing button ids for all the numbers in an array
for(var i = 0; i <= 9; i++){
	buttons[i] = document.getElementById(""+i);
}

//the div that diplays all the values 
var screen = document.getElementById('screen');

var operator = ['×','+','÷','−'];
var operatorNegDec = ['×','+','÷','−','-','.'];

var screenVal = "";
var isDecimal = false;

m.onclick = function(){
	if(validNextEntry()){
	updateScreen(operator[0]);
	scrollRight();
	}
}
a.onclick =function(){
	if(validNextEntry()){
		updateScreen(operator[1]);
		scrollRight();
	}
}
d.onclick = function(){
	if(validNextEntry()){
		updateScreen(operator[2]);
		scrollRight();
	}
}
s.onclick = function(){
	if(validNextEntry()){
		updateScreen(operator[3]);
		scrollRight();
	}
}
neg.onclick = function(){
	if(screenVal.charAt(screenVal.length-1) === '-' || isNum(screenVal.charAt(screenVal.length-1))){
		return false;
	}
	updateScreen('-');
	scrollRight();
}
decimal.onclick = function(){
	if((!validNextEntry() || screenVal.length ==0) && screenVal.charAt(screenVal.length-1) !== '.'){
		updateScreen('0.');
		scrollRight();
	}else if(isNum(screenVal.charAt(screenVal.length-1))){
		updateScreen('.');
		scrollRight();
	}
}

ce.onclick = function(){
	screenVal = "";
	screen.innerHTML = screenVal;
	allNums = [];
	allNumsPos = 0;
	operations = [];
	operationsPos = 0;
}

back.onclick = function(){
		screenVal = screenVal.slice(0,screenVal.length-1);
		screen.innerHTML = screenVal;
}

buttons[0].onclick = function(){
	updateScreen(0);
	scrollRight();
}
buttons[1].onclick = function(){
	updateScreen(1);
	scrollRight();
}
buttons[2].onclick = function(){
	updateScreen(2);
	scrollRight();
}
buttons[3].onclick = function(){
	updateScreen(3);
	scrollRight();
}
buttons[4].onclick = function(){
	updateScreen(4);
	scrollRight();
}
buttons[5].onclick = function(){
	updateScreen(5);
	scrollRight();
}
buttons[6].onclick = function(){
	updateScreen(6);
	scrollRight();
}
buttons[7].onclick = function(){
	updateScreen(7);
	scrollRight();
}
buttons[8].onclick = function(){
	updateScreen(8);
	scrollRight();
}
buttons[9].onclick = function(){
	updateScreen(9);
	scrollRight();
}

//adds to the screen what is passed through
function updateScreen(value){
	screenVal +=value;
	screen.innerHTML = screenVal;
}

//Checks to make sure the next entry is n
function validNextEntry(){
	if(screenVal.length === 0){
		return false;
	}
	for(var i = 0; i< operatorNegDec.length; i++){
		if(screenVal.charAt(screenVal.length-1) === operatorNegDec[i]){
			return false;
		}
	}
	return true;
}

//Checks to see if the given input is valid to compute (the first and last characters are numbers and if it contains an operator)
function validEntry(){
	if((isNum(Number(screenVal.charAt(0))) || screenVal.charAt(0) == '-') && isNum(Number(screenVal.charAt(screenVal.length-1))) ){
		for(var i = 0; i< screenVal.length-1; i++){
			for(var j = 0; j < operator.length; j++){
				if(screenVal[i] == operator[j]){
					return true;
				}
			}
		}
	}
	return false;

}

//Checks if the given char is a numeral or not
function isNum(value){
	if(screenVal.length == 0){
		return false;
	}
	for(var n = 0; n <= 9; n++){
		if(value == n){
			return true;
		}
	}
	return false;
}

//stores all the numbers as well as the operators inputted by the user
var allNums = [];
var allNumsPos = 0;
var numOfOp = 0;
var cut =0;

//Takes the given input (as a String)and breaks it down into its numbers and operators both stored in an array
function parseInt(){

	if(validEntry()){
		//Resets variables before proceeding
		allNums = [];
		allNumsPos = 0;

		for(var i = 0; i < screenVal.length; i++){
			for(var  j = 0; j < operator.length; j++){
				if(screenVal.charAt(i) == operator[j]){
					allNums[allNumsPos] = Number(screenVal.substring(cut,i));
					allNumsPos++;
					allNums[allNumsPos] = screenVal.charAt(i);
					allNumsPos++;
					numOfOp++;
					cut = i+1; 
				}
			}
		}
		allNums[allNumsPos] = Number(screenVal.slice(cut,screenVal.length));
		allNumsPos++;
		//Resets cut for future use
		cut =0;

	}
}

var result=0;

function Calculate(){
	var temp1;
	var temp2;


	if(validEntry()){

		for(var j = 1; j< allNums.length-1; j++){
			if(allNums[j] == operator[0]){
				temp1 = allNums[j-1];
				temp2 = allNums[j+1];
				allNums.splice(j-1,3,temp1*temp2);
				j=0;
				console.log(allNums);
			}else if(allNums[j]==operator[2]){
				temp1 = allNums[j-1];
				temp2 = allNums[j+1];
				allNums.splice(j-1,3,temp1/temp2);
				j=0;
				console.log(allNums);
			}
			
		}

		for(var k = 1; k< allNums.length-1;k++){
			if(allNums[k] == operator[1]){
				temp1 = allNums[k-1];
				temp2 = allNums[k+1];
				allNums.splice(k-1,3,temp1+temp2);
				k =0;
				console.log(allNums);
			} else if(allNums[k] == operator[3]){
				temp1 = allNums[k-1];
				temp2 = allNums[k+1];
				allNums.splice(k-1,3,temp1-temp2);
				k=0;
				console.log(allNums);
			}
		}
	}
	
}

enter.onclick = function(){
	if(!validEntry()){
		return;
	}
	for(var i = 0; i< operator.length; i++){
		if(screenVal.charAt(screenVal.length-1) === operator[i]){
			return;
		}
	}
	parseInt();
	Calculate();
	if(Math.abs(allNums[0]) <= 0.0000099 || Math.abs(allNums[0]) >= 100000000){
		screenVal = ""+allNums[0].toExponential(7);
		screen.innerHTML = screenVal;
		screen.scrollLeft = 0;
		
	}else if((Math.abs(allNums[0])%1).toString().length >= 12){
		screenVal = ""+allNums[0].toFixed(6);
		screen.innerHTML = screenVal;
		screen.scrollLeft = 0;
	}else{
		screenVal = ""+allNums[0];
		screen.innerHTML = screenVal;
		screen.scrollLeft = 0;
	}

	screenVal = ""+allNums[0];
}

function scrollRight(){
	screen.scrollLeft +=10000;
}
