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
    this.taxTotal = 0
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
	totalTaxIndividual : 0,
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
			if(Gozintas.splitBy == "group"){
				for(var i = 0; i<groups.length; i++){
					if(groups[i].wine){
						Gozintas.billModifier.wine = true
					}
					if(groups[i].carryout){
						Gozintas.billModifier.carryout = true
					}
					if(groups[i].extras){
						Gozintas.billModifier.extras = true
					}

				}
				if(Gozintas.billModifier.wine){
		            $("#four #wine_tip").show();
		        }else{
		        	$("#four #wine_tip").hide();
		        }
		        if(Gozintas.billModifier.carryout){
		            $("#four #carry_tip").show();
		        }else{
		        	$("#four #carry_tip").hide();
		        }
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

        
	},
	handleKeyups: function(page){
		if(page == 3){
			var three_classes = [{id: "#group_nickname", input:"text", attribute:"nickname"},{id:"#people_in_group", input:"integer", attribute:"peopleInParty"},{id:"#drinks_deserts_etc",input:"money", attribute:"foodTotal"},{id:"#wine_amount",input:"money", attribute:"wineTotal"},{id:"#carry_out_amount",input:"money", attribute:"carryOutTotal"},{id:"#fair_reduction",input:"money", attribute:"reductionTotal"}]
			$.each(three_classes, function(index, value) { 
				$("#three "+value["id"]).live("keyup",function(){
	            	group = $(this).parent().parent().parent().attr("class").split(" ")[0]
	            	parentClass = "#"+group+" ";
		            groupNum = parseFloat(group.split("-")[1])
		            if(value["input"] == "text"){
		            	input = $(parentClass+value["id"]).val();
		            	store = "groups["+(groupNum-1)+"]."+value["attribute"]+" = '"+input+"'"
		            }
		            else if(value["input"] == "integer"){
		            	input = parseFloat($(parentClass+value["id"]).val()).toFixed();
		            	store = "groups["+(groupNum-1)+"]."+value["attribute"]+" = "+input
		            }else if(value["input"] == "money"){
		            	input = parseFloat($(parentClass+value["id"]).val()).toFixed(2);
						store = "groups["+(groupNum-1)+"]."+value["attribute"]+" = "+input
		            }

		            eval(store)
		            if(value["id"] == "#group_nickname"){
		            	elToRemove = $("#three "+parentClass+"h3 span.ui-btn-text");
			            final_elToRemove = $("#five "+parentClass+"h3 span.ui-btn-text");
			            if(final_elToRemove.length == 0){
			                final_elToRemove = $("#five "+parentClass+"h3");
			            }
			            children = elToRemove.children().detach();
			            finalChildren = final_elToRemove.children().detach();
			            elToRemove.html(input);
			            final_elToRemove.html(input);
			            elToRemove.append(children);
			            final_elToRemove.append(finalChildren);
		            }

	        	});
			});
		}
	}
}
