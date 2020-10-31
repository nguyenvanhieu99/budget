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
		}
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
		expensesContainer:'.expenses__list'
	}
	return {
		getinput: function () {
			return {
				type: document.querySelector(DOMstring.inputType).value,//will be either inc or exp
				description: document.querySelector(DOMstring.iputDescription).value,
				value: document.querySelector(DOMstring.inputValue).value
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
	var ctrlAddItem = function () {
		var input, newItem;
		//1.Get the field input data
		input = UICtrl.getinput();
		console.log(input);

		//2.add the itemm to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);


		//add the item to theo UI
		UIController.addListItem(newItem,input.type);
		//4. Calcular the budget

		//5. Display the budget on the UI	

	};
	return {
		init: function () {
			console.log("Application has start .");
			setupEventListeners();
		},
		testing: function () {
			console.log()
		}
	};

})(budgetController, UIController);

controller.init();
