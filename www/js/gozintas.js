var gozintas = {
	billModifier : {
		wine : false,
		reductions : false,
		extras : false
	},
	billPath : '',
	splitBy : '',
	foodAmount : '',
	taxAmount : '',
	totalAmount : '',
	wineAmount : '',
	carryOutAmount: '',
	peopleInParty : '',
	tipAmount : '0.15',
	validatePrice: function(price){
		var re = /^[0-9]+(\.[0-9]{2})?$/;
		return re.test(price);
	},
	calculateTip: function(){
		return parseFloat(+this.tipAmount * (+this.foodAmount + +this.taxAmount)).toFixed(2)
	},
	calculateTipIndividual: function(){
		return parseFloat(this.calculateTip()/(+this.peopleInParty)).toFixed(2)
	},
	calculateTotal: function(){
		return parseFloat(+this.foodAmount + +this.taxAmount + +this.calculateTip()).toFixed(2)
	},
	calculateTotalIndividual: function(){
		return parseFloat(+this.calculateTotal()/(+this.peopleInParty)).toFixed(2)
	},
	splitBillPath : function() {
		this.billPath = 'split-bill'
	},
	determineTipPath :  function() {
		this.billPath = 'determine-tip'
	},
	isOnSplitBillPath : function() {
		return this.billPath == 'split-bill'
	},
	isOnDetermineTipPath : function(){
		return this.billpath == 'determine-tip'
	},
	splitByIndividual : function() {
		this.splitBy = 'individual'
	},
	splitByGroup : function() {
		this.splitBy = 'group'
	},
	storeFoodAmount: function(value){
		this.foodAmount = value
	},
	storeTaxAmount: function(value){
		this.taxAmount = value
	},
	storeTotalAmount: function(value){
		this.totalAmount = value
	},
	storePeopleInParty: function(value){
		this.peopleInParty = value
	},
	storeTipAmount: function(value){
		this.tipAmount = value;
	},
	isSplitingByIndividual : function(){
		return this.splitBy == 'individual'
	},
	isSplitingByGroup : function(){
		return this.splitPath == 'group'
	},
	showSplitTipButtons : function(){
	    if(this.isOnSplitBillPath()){
	        showButton = ".links-split";
	        hideButton = ".links-tip";
	    }else{
	        showButton = ".links-tip";
	        hideButton = ".links-split";
	    }
	    $(showButton).show();
	    $(hideButton).hide();
	},
	showPageFourButton: function(){
        if(gozintas.isSplitingByIndividual()){
            $("#next_button_page4").attr("href", "#fiveb");
        }else{
            $("#next_button_page4").attr("href", "#five")
        }
	},
	showPageFiveButtons: function(){
        if(!gozintas.billModifier.wine){
            $(".page5.wine_tip").hide();
            $(".page5.wine").hide();
        }
        if(!gozintas.billModifier.reductions){
            $(".page5.reductions").hide();
        }
        if(!gozintas.billModifier.extras){
            $(".page5.extras").hide();
        }
	}
}
