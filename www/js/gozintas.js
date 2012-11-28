function Group () {
    this.wine = false;
    this.reductions = false
    this.extras = false
    this.carryout = false
    this.nickname = ''
    this.peopleInParty = 1
    this.foodTotal = 0
    this.wineTotal = 0
    this.carryOutTotal = 0
    this.reductionTotal = 0
    this.tipTotal = 0
    this.total = 0
}

var groups = [new Group()]

var Gozintas = {
	billModifier : {
		wine : false,
		reductions : false,
		extras : false
	},
	totalWithoutReduction : 0,
	totalTax : 0,
	billPath : '',
	splitBy : '',
	foodAmount : 0,
	taxAmount : 0,
	totalIndividual : 0,
	tipIndividual : 0,
	totalAmount : 0,
	wineAmount : 0,
	carryOutAmount: 0,
	peopleInParty : 0,
	tipAmount : 0.15,
	wineTipAmount : 0.15,
	carryTipAmount : 0.15,
	taxTipAmount : 0.15,
	validatePrice: function(price){
		var re = /^[0-9]+(\.[0-9]{2})?$/;
		return re.test(price);
	},
	calculateTip: function(){
		if(groups.length == 1){
			return parseFloat(+groups[0].foodTotal*Gozintas.tipAmount + +groups[0].wineTotal*Gozintas.wineTipAmount + +groups[0].carryOutTotal*Gozintas.carryTipAmount + +Gozintas.taxAmount*Gozintas.taxTipAmount)
		}else{
			return parseFloat(+this.tipAmount * (+this.totalAmount)).toFixed(2)
		}
	},
	calculateTipIndividual: function(){
		if(groups.length == 1){
			return parseFloat(this.calculateTip()/(+groups[0].peopleInParty)).toFixed(2)
		}else{
			return 0
		}
	},
	calculateTotal: function(){
		if((this.billPath == "split-bill" && this.splitBy == "individual") || this.billPath == "determine-tip"){
			return parseFloat(+this.totalAmount + +this.calculateTip()).toFixed(2)
		}
		return parseFloat(+this.totalAmount + +this.taxAmount + +this.calculateTip()).toFixed(2)
	},
	calculateTotalIndividual: function(){
		if(groups.length ==1){
			return parseFloat(+this.calculateTotal()/(+groups[0].peopleInParty)).toFixed(2)
		}else{
			return 0
		}
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
        if(this.isSplitingByIndividual()){
            $("#next_button_page4").attr("href", "#fiveb");
        }else{
            $("#next_button_page4").attr("href", "#five")
        }
	},
	showPageFourPercentages: function(){
		if(Gozintas.splitBy == "individual"){
			if(groups[0].wine){
				console.log("yup wine")
	            $("#four #wine_tip").show();
	        }else{
	        	console.log("nope wine")
	        	$("#four #wine_tip").hide();
	        }
	        if(groups[0].carryout){
	        	console.log("yup carryout")
	            $("#four #carry_tip").show();
	        }else{
	        	console.log("nope carryout")
	        	$("#four #carry_tip").hide();
	        }
		}else{
			if(!Gozintas.billModifier.wine){
	            $("#four #wine_tip").hide();
	        }
	        if(!Gozintas.billModifier.extras){
	            $("#four #carry_tip").hide();
	        }
		}


	},
	showPageFiveInputs: function(){
		if(Gozintas.splitBy == "individual"){
			if(Gozintas.billPath == "determine-tip")
	        {
	        	$(".page5.determine_tip").show();
	        	$("#fiveb .wine_total").hide();
	        	$("#fiveb .carryout_total").hide();
	        	$(".ui-grid-a").hide();

	        }else{
	        	if(groups[0].wine){
	        		$("#fiveb .wine_total").show();
	        	}else{
	        		$("#fiveb .wine_total").hide();
	        	}
				if(groups[0].carryout){
					$("#fiveb .carryout_total").show();
				}else{
					$("#fiveb .carryout_total").hide();
				}
	        	$(".page5.determine_tip").hide();
	        	$(".ui-grid-a").show();
	        }
		}
        if(!Gozintas.billModifier.wine){
            $(".page5.wine_tip").hide();
            $(".page5.wine").hide();
        }
        if(!Gozintas.billModifier.reductions){
            $(".page5.reductions").hide();
        }
        if(!Gozintas.billModifier.extras){
            $(".page5.extras").hide();
        }

        
	}
}
