function Group () {
	    this.wine = false
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
	billPath : '',
	splitBy : '',
	peopleInParty : 0,
	billModifier : {
		wine : false,
		reductions : false,
		extras : false
	},
	total : {
		withoutReduction : 0,
		taxAmount : 0,
		amount : 0
	},
	individual : {
		total : 0.00, /*total amount per individual*/
		tax : 0.00,   /*tax amount per individual*/
		tip : 0.00    /*tip amount per individual*/
	},
	tip : {
		general : 0.15,  /*percent, used for food tip and drink/desert/etc tip*/
		wine : 0.15,     /*percent, used for wine tip*/
		carryout : 0.15, /*percent, used for carryout tip*/
		tax : 0.15       /*percent, used for tax tip*/
	},
	calculateTip: function(){
		/* Calculates the tip for a group by taking all the different food totals (wine, food/drink, carryout) and multiplying by their percentage tip (.1, .3, etc). So the calculation is FoodTotal*FoodTipRate + WineTotal*WineTipRate + CarryTotal*CarryTipRate = total tip amount for group*/
		if(groups.length == 1){
			return parseFloat(+groups[0].foodTotal*Gozintas.tip.general + +groups[0].wineTotal*Gozintas.tip.wine + +groups[0].carryOutTotal*Gozintas.tip.carryout + +Gozintas.total.taxAmount*Gozintas.tip.tax)
		}else{
			return parseFloat(+this.tipAmount * (+this.total.amount)).toFixed(2)
		}
	},
	calculateTipIndividual: function(){
		/*Takes calculateTip above and divides it by the number of people in the groups party*/
		if(groups.length == 1){
			return parseFloat(this.calculateTip()/(+groups[0].peopleInParty)).toFixed(2)
		}else{
			return 0
		}
	},
	calculateTotal: function(){
		if((this.billPath == "split-bill" && this.splitBy == "individual") || this.billPath == "determine-tip"){
			return parseFloat(+this.total.amount + +this.calculateTip()).toFixed(2)
		}
		return parseFloat(+this.total.amount + +this.total.taxAmount + +this.calculateTip()).toFixed(2)
	},
	calculateTotalIndividual: function(){
		if(groups.length ==1){
			return parseFloat(+this.calculateTotal()/(+groups[0].peopleInParty)).toFixed(2)
		}else{
			return 0
		}
	},
	calculatePeopleInParty: function(){
		Gozintas.peopleInParty = 0;
	    for(var i=0; i<groups.length; i++){
	        Gozintas.peopleInParty = +Gozintas.peopleInParty + groups[i].peopleInParty;
	    }
	},
	calculateTotalWithoutReduction: function(){
		Gozintas.total.withoutReduction = Gozintas.total.amount
        for(var i=0; i<groups.length; i++){
            if(groups[i].extras){
                Gozintas.total.withoutReduction = (+Gozintas.total.withoutReduction - +groups[i].foodTotal).toFixed(2)
            }
            if(groups[i].carryout){
                Gozintas.total.withoutReduction = (+Gozintas.total.withoutReduction - +groups[i].carryOutTotal).toFixed(2)
            }
            if(groups[i].wine){
                Gozintas.total.withoutReduction = (+Gozintas.total.withoutReduction - +groups[i].wineTotal).toFixed(2)
            }
        }
	},
	calculateTaxAndTotal: function(){
	    for(var i=0; i<groups.length; i++){
	        var totalAddition = 0
	        if(groups[i].extras){
	            totalAddition = totalAddition + +groups[i].foodTotal
	        }
	        if(groups[i].carryout){
	            totalAddition = totalAddition + +groups[i].carryOutTotal
	        }
	        if(groups[i].wine){
	            totalAddition = totalAddition + +groups[i].wineTotal
	        }
	        groups[i].total = (+Gozintas.individual.total * +groups[i].peopleInParty + +totalAddition).toFixed(2)
	        groups[i].taxTotal = (+Gozintas.individual.tax * +groups[i].peopleInParty).toFixed(2)
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
            $("#next_button_page4").attr("href", "#page5b");
        }else{
            $("#next_button_page4").attr("href", "#page5")
        }
	},
	showPageFourPercentages: function(){
		if(Gozintas.splitBy == "individual"){
			if(groups[0].wine){
	            $("#page4 #wine_tip").show();
	        }else{
	        	$("#page4 #wine_tip").hide();
	        }
	        if(groups[0].carryout){
	            $("#page4 #carry_tip").show();
	        }else{
	        	$("#page4 #carry_tip").hide();
	        }
		}else{
			if(Gozintas.splitBy == "group"){
				for(var i = 0; i<groups.length; i++){
					wineCount = 0
					carryoutCount = 0
					extraCount = 0
					if(groups[i].wine){
						wineCount = wineCount + 1
					}
					if(groups[i].carryout){
						carryoutCount = carryoutCount + 1
					}
					if(groups[i].extras){
						extraCount = extraCount + 1
						Gozintas.billModifier.extras = true
					}

				}

				if(wineCount > 0 ){
					Gozintas.billModifier.wine = true
		            $("#page4 #wine_tip").show();
		        }else{
		        	$("#page4 #wine_tip").hide();
		        }
		        if(carryoutCount > 0){
		            $("#page4 #carry_tip").show();
		        }else{
		        	$("#page4 #carry_tip").hide();
		        }
		    }
		}


	},
	showPageFiveInputs: function(){
        $("#page5b input#individuals_in_party").val(groups[0].peopleInParty);
        $("#page5b input#food_total").val("$"+groups[0].foodTotal);
        $("#page5b input#wine_total").val("$"+groups[0].wineTotal);
        $("#page5b input#carryout_total").val("$"+groups[0].carryOutTotal);
        $("#page5b .food_total label").text("Food Total ("+(Gozintas.tip.general*100).toFixed()+"% tip rate)")
        $("#page5b .wine_total label").text("Wine Total ("+(Gozintas.tip.wine*100).toFixed()+"% tip rate)")
        $("#page5b .carryout_total label").text("Carry-out Total ("+(Gozintas.tip.carryout*100).toFixed()+"% tip rate)")
        $("#page5b .tax_total label").text("Tax ("+(Gozintas.tip.tax*100).toFixed()+"% tip rate)")
        $("#page5b input#tax_total").val("$"+Gozintas.total.taxAmount);

        $("#page5b input#tip_total").val("$"+Gozintas.calculateTip());
        $("#page5b input#total").val("$"+Gozintas.calculateTotal());
        $("#page5b input#tip_individual").val("$"+Gozintas.calculateTipIndividual());
        $("#page5b input#total_individual").val("$"+Gozintas.calculateTotalIndividual());
		if(Gozintas.splitBy == "individual"){
			if(Gozintas.billPath == "determine-tip")
	        {
	        	$(".page5.determine_tip").show();
	        	$("#page5b .wine_total").hide();
	        	$("#page5b .carryout_total").hide();
	        	$(".ui-grid-a").hide();

	        }else{
	        	if(groups[0].wine){
	        		$("#page5b .wine_total").show();
	        	}else{
	        		$("#page5b .wine_total").hide();
	        	}
				if(groups[0].carryout){
					$("#page5b .carryout_total").show();
				}else{
					$("#page5b .carryout_total").hide();
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
	showPageFiveGroupInputs: function(group_number){
        if(groups[group_number].wine){
            $("#page5 #group-"+(group_number+1)+" #wine_amount_container").show()
            $("#page5 #group-"+(group_number+1)+" #wine_amount").val(groups[group_number].wineTotal)
        }else{
            $("#page5 #group-"+(group_number+1)+" #wine_amount_container").hide()
        }
        if(groups[group_number].carryout){
            $("#page5 #group-"+(group_number+1)+" #carry_out_amount_container").show()
            $("#page5 #group-"+(group_number+1)+" #carry_out_amount").val(groups[group_number].carryOutTotal)
        }else{
            $("#page5 #group-"+(group_number+1)+" #carry_out_amount_container").hide()
        }
        if(groups[group_number].extras){
            $("#page5 #group-"+(group_number+1)+" #drinks_deserts_amount_container").show()
            $("#page5 #group-"+(group_number+1)+" #drinks_deserts_amount").val(groups[group_number].foodTotal)
        }else{
            $("#page5 #group-"+(group_number+1)+" #drinks_deserts_amount_container").hide()
        }

	},
	handleKeyups: function(page){
		if(page == 3){
			var three_classes = [{id: "#group_nickname", input:"text", attribute:"nickname"},{id:"#people_in_group", input:"integer", attribute:"peopleInParty"},{id:"#drinks_deserts_etc",input:"money", attribute:"foodTotal", bool:"extras"},{id:"#wine_amount",input:"money", attribute:"wineTotal", bool:"wine"},{id:"#carry_out_amount",input:"money", attribute:"carryOutTotal", bool:"carryout"},{id:"#fair_reduction",input:"money", attribute:"reductionTotal", reduction:"reductions"}]
			$.each(three_classes, function(index, value) { 
				$("#page3 "+value["id"]).live("keyup",function(){
	            	group = $(this).parent().parent().parent().attr("class").split(" ")[0]
	            	parentClass = "#"+group+" ";
		            groupNum = parseFloat(group.split("-")[1])
		            if(value["input"] == "text"){
		            	input = $(parentClass+value["id"]).val();
		            	store = "groups["+(groupNum-1)+"]."+value["attribute"]+" = '"+input+"'"
		            }
		            else if(value["input"] == "integer"){
		            	input = $(parentClass+value["id"]).val()
		            	if(input.length == 0){ 
		            		input = 0
		            	}else{
		            		input = parseFloat($(parentClass+value["id"]).val()).toFixed();
		            	}
		            	store = "groups["+(groupNum-1)+"]."+value["attribute"]+" = "+input
		            }else if(value["input"] == "money"){
		            	input = $(parentClass+value["id"]).val()
		            	if(input.length == 0){ 
		            		input = 0
		            		bool = "groups["+(groupNum-1)+"]."+value["bool"]+" = false"
		            	}else{
		            		input = parseFloat($(parentClass+value["id"]).val()).toFixed(2);
		            		if(input <=0){
		            			bool = "groups["+(groupNum-1)+"]."+value["bool"]+" = false"
		            		}else{
		            			bool = "groups["+(groupNum-1)+"]."+value["bool"]+" = true"
		            		}
		            	}
						store = "groups["+(groupNum-1)+"]."+value["attribute"]+" = "+input
						eval(bool)
		            }

		            eval(store)

		            if(value["id"] == "#group_nickname"){
		            	elToRemove = $("#page3 "+parentClass+"h3 span.ui-btn-text");
			            final_elToRemove = $("#page5 "+parentClass+"h3 span.ui-btn-text");
			            if(final_elToRemove.length == 0){
			                final_elToRemove = $("#page5 "+parentClass+"h3");
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
