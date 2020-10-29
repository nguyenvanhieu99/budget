var budgetController=(function(){
	var x=23;

	var add =function(a){
		return x*a;
	}
	return{
		publicTest:function(b){
			return add(b);
		}
	}

})();
var UIController =(function(){
	
	//write some code here;
	var DOMstring={
		inputType:'.add__type',
		iputDescription:'.add__description',
		inputValue:'.add__value',
		inputBtn:'.add__btn'
	}
	return{
		getinput:function(){
			return{
				 type :document.querySelector(DOMstring.inputType).value,//will be either inc or exp
				description :document.querySelector(DOMstring.iputDescription).value,
				value:document.querySelector(DOMstring.inputValue).value
			}
		}
		getDOMstrings:function(){
			return DOMstring;
		}
	}	

})();

var controller=(function(budgetCtrl,UICtrl)
{
	var DOM=UICtrl.getDOMstrings();
	var ctrlAddItem=function(){
		//1.
		var input=UICtrl.getinput();
		console.log(input);

	};
	document.querySelector('.add__btn').addEventListener('click',function(){
		//1.Get the field input data
		var input= UICtrl.getinput();
		console.log(input);
		//2.add the itemm to the budget controller
		//add the item to theo UI
		//4. Calcular the budget
		//5. Display the budget on the UI
		//
	});
	document.addEventListener('keypress', function(event){
		if(event.keyCode=== 13 || event.which===13){
			ctrlAddItem();
			console.log("ENTER was pressed");
		}
	})

	

})(budgetController,UIController);
