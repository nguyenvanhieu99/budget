var budgetController = function () {
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};
	var calculateTotal= function(type){
		var sum=0;
		data.allItem[type].forEach(function(current){
			sum=sum+current.value;
		});
		data.total[type]=sum;


	}

	var data =
		{
			allItem: {
				income: [],
				expense: []
			},
			total: {
				income: 0,
				expense: 0
			},
			budget:0,
			percentage:-1,


		}
	return{
		addItem: function (type, des, val) {
			var newItem, ID;

			if (data.allItem[type].length === 0) {
				ID = 0;
			}
			else {
				ID = data.allItem[type][data.allItem[type].length - 1].id + 1;
			};

			if (type === 'expense') {
				newItem = new Expense(ID, des, val);
			}
			else if (type === 'income') {
				newItem = new Income(ID, des, val);
			}

			//add to data
			data.allItem[type].push(newItem);
			return newItem;
		},
		calculateBudget:function(){
			//calculate total income and expense
			calculateTotal('expense');
			calculateTotal('income');	
			//calculate the budget :income -expense
			data.budget=data.total.income-data.total.expense;

			// calculate the percentage of income that we spent 
			if(data.total.income>0){
				data.percentage=Math.round(data.total.expense*100/data.total.income);

			}else {
				data.percentage=-1;
			}

		},
		getBudget:function(){
			return{
				budget:data.budget,
				totalInc:data.total.income,
				totalExp:data.total.expense,
				percentage:data.percentage
			}
		}
	}

}();

var UIController = (function () {

	//write some code here;
	var DOMstring = {
		inputType: '.add__type',
		iputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer:'.income__list',
		expensesContainer:'.expenses__list',
		budgetLabel:'.budget__value',
		incomeLabel:'.budget__income--value',
		expenseLabel:'.budget__expenses--value',
		percentageLabel:'.budget__expenses--percentage'



	}
	return {
		getinput: function () {
			return {
				type: document.querySelector(DOMstring.inputType).value,//will be either inc or exp
				description: document.querySelector(DOMstring.iputDescription).value,
				value:parseFloat( document.querySelector(DOMstring.inputValue).value)
			}
		},
		addListItem: function (obj, type) {
			var html,newHtml,element;
			//create html string with placehoder text
			if(type ==='income'){
				element=DOMstring.incomeContainer;
				html='  <div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete">  <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div>  </div>  </div>'
			}else{
				element=DOMstring.expensesContainer;
				html='<div class="item clearfix" id="expense-%id%">  <div class="item__description">%description%</div>  <div class="right clearfix">      <div class="item__value">%value%</div>  <div class="item__percentage">21%</div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button> </div>  </div>  </div>'
			} 
			//replace the placeholer tex with some actual data
			newHtml=html.replace('%id%',obj.id);
			newHtml= newHtml.replace('%description%',obj.description)	;
			newHtml=newHtml.replace('%value%',obj.value);
			//insert tho e html into the dom
			document.querySelector(element).insertAdjacentHTML('beforeend',newHtml);


		},
		remove:function () {
			document.querySelector()

		},
		clearField : function(){
			var field ,arrfield;
			field=document.querySelectorAll(DOMstring.iputDescription+', '+DOMstring.inputValue);
			arrfield=Array.prototype.slice.call(field);
			console.log("cho ham clear");
			arrfield.forEach(function(current,index,array){
				current.value="";

			});

		},
		displayBudget:function(obj){
			document.querySelector(DOMstring.budgetLabel).textContent=obj.budget;
			document.querySelector(DOMstring.incomeLabel).textContent=obj.totalInc;
			document.querySelector(DOMstring.expenseLabel).textContent=obj.totalExp;
			if(obj.percentage>0){
				document.querySelector(DOMstring.percentageLabel).textContent=obj.percentage+'%';


			}else {
				document.querySelector(DOMstring.percentageLabel).textContent='---';

			}
		},
		getDOMstrings: function () {
			return DOMstring;
		}

	}
})();

var controller = (function (budgetCtrl, UICtrl) {
	var setupEventListeners = function () {
		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputBtn).addEventListener('click', function () {
			var input = UICtrl.getinput();
			console.log(input);
		});
		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) { 

				ctrlAddItem();
				console.log("ENTER was pressed");
			}
		})

	}
	var updateBudget=function(){

		//1,Calculate the budget
		budgetCtrl.calculateBudget();

		//2,return the budget
		var budget=budgetCtrl.getBudget();

		//3,display budget on ui
		//console.log(budget);
		UICtrl.displayBudget(budget);

	}

	var ctrlAddItem = function () {
		var input, newItem;
		//1.Get the field input data
		input = UICtrl.getinput();
		console.log(input);
		if(input.description!==""&& !isNaN(input.value)&& input.value>0){
			//2.add the itemm to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			//add the item to theo UI
			UICtrl.addListItem(newItem,input.type);
			UICtrl.clearField();
			//4. Calcular the budget

			//5. Display the budget on the UI	
			updateBudget();


		}
	};
	return {
		init: function () {
			console.log("Application has start .");
			UICtrl.displayBudget({
				budget:0,
				totalInc:0,
				totalExp:0,
				percentage:-1
				
			});
			setupEventListeners();
		},
		testing: function () {
			console.log()
		}
	};

})(budgetController, UIController);

controller.init();
