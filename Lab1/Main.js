'use strict'
console.log('Lab 1')
//1
function separate_on_space(input){
 var temp = input.split(' ');
 return temp.filter(e =>  e);
}
//2
function sort_word(input){
 return input.trim().split('').sort((a, b) => a.localeCompare(b)).join('');;
}
//3
function nsd(in1,in2){
 var res;
 var limit = in1<in2?in1:in2;
 for(var i=1; i<=in1;i++){
  if(in1%i==0&&in2%i==0){
   res=i;
  }
 }
 return res;
}
//4
function mix_array(input){
  let temp =0;
  for(let i =0; i<input.length;i++){
    let i_1=Math.round(Math.random()*(input.length-1));
    let j_1=Math.round(Math.random()*(input.length-1));  
    [input[i_1],input[j_1]] =[input[j_1],input[i_1]]
  }
}
//5
function count_days (month, year) {
  return new Date(year, month, 0).getDate();
}
//6
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

function compare_user( a, b ) {
  if ( a.name < b.name ){
    return -1;
  }
  if ( a.name > b.name ){
    return 1;
  }
  return 0;
}

//1
var string = "this    is    test string";
console.log("ex1:"); 
console.log(separate_on_space(string));
//2
var word = "cbazyw";
console.log("ex2:");
console.log(sort_word(word));
//3
var number1= 20;
var number2= 40;
console.log("ex3:");
console.log(nsd(number1,number2));
//4
var arr=[34,66,23,56];
mix_array(arr);
console.log("ex4:") 
console.log(arr);
arr = ['dskf','qwe','pwqe','vcx'];
mix_array(arr);
console.log(arr);
//5
console.log("ex5:") 
console.log(count_days(2,1921));
console.log(count_days(2,2020));
//6
var names = [new User("Oleg", 10),new User("Andrij",19), new User("Orest",5)];
names.sort( compare_user );
console.log("ex6:"); 
console.log(names);

