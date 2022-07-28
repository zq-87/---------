(function(){
  function foo(num1,num2){
    return num1 + num2;
  }
  console.log(foo(1,2));

})();
(function(){
 var res = [1,2,3,4].map(function(item){
  return item * 10;
 })
  console.log(res);

})();
(function(){
  function baz(num1,num2,num3){
    return num1 + num2 + num3;
  }
  console.log(baz(1,2,3));
  console.log('wadas')
})();