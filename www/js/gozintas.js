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
	peopleInParty : '',
	tipAmount : '0.15',
	validatePrice: function(price){
		var re = /^[0-9]+(\.[0-9]{2})?$/;
		return re.test(price);
	},
	calculateTip: function(){
		return +this.tipAmount * (+this.foodAmount + +this.taxAmount)
	},
	calculateTipIndividual: function(){
		return this.calculateTip()/(+this.peopleInParty)
	},
	calculateTotal: function(){
		return (+this.foodAmount + +this.taxAmount + this.calculateTip())
	},
	calculateTotalIndividual: function(){
		return this.calculateTotal()/(+this.peopleInParty)
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
