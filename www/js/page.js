var Page = {

	js : {
		page1: function() {

		},

		page2: function() {
            $("#page2").live(
                "pagebeforeshow",
                function () {
                    Gozintas.showSplitTipButtons();
                }
            );
			$("#page2 #total_amount_input").on("change", function() {
				Gozintas.totalAmount = parseFloat($(this).val()).toFixed(2)
				console.log(Gozintas.totalAmount)
			})
			$("#page2 #total_tax_amount_input").on("change", function() {
				Gozintas.taxAmount = parseFloat($(this).val()).toFixed(2)
				console.log(Gozintas.taxAmount)
			})

		},

		page3: function() {
			Gozintas.handleKeyups(3);
		},


		page3b: function() {

            $("#page3b").live('pageshow',function(){
                groups.length = 1
                groups[0] = new Group();
                $("#page3b #drinks_deserts_etc").val(Gozintas.totalAmount-Gozintas.taxAmount);
                $("#page3b #people_in_party").focusout(function() {
                    groups[0].peopleInParty = parseFloat($(this).val());
                });
            });
            $("#page3b").live("keyup",function(){
                parentClass = "#page3b";
                peopleInParty = parseFloat($(parentClass+" #people_in_party").val())
                wineTotal = parseFloat($(parentClass+" #wine_amount").val()).toFixed(2);
                carryOut = parseFloat($(parentClass+" #carry_out_amount").val()).toFixed(2);

                if(carryOut == "NaN"){
                    carryOut = 0
                }
                if(wineTotal == "NaN"){
                    wineTotal = 0
                }
                console.log(peopleInParty+" "+wineTotal+" "+carryOut);

                groups[0].peopleInParty = peopleInParty
                groups[0].wineTotal = wineTotal;
                groups[0].carryOutTotal = carryOut
                groups[0].foodTotal = +Gozintas.totalAmount - +Gozintas.taxAmount
                newFoodTotal = Gozintas.totalAmount-Gozintas.taxAmount-groups[0].wineTotal-groups[0].carryOutTotal -groups[0].reductionTotal;
                groups[0].foodTotal = newFoodTotal

                if(groups[0].foodTotal > 0){
                    groups[0].extras =true;
                }else{
                    groups[0].extras = false
                }
                if(groups[0].wineTotal > 0){
                    groups[0].wine = true
                }else{
                    groups[0].wine = false
                }
                if(groups[0].carryOutTotal > 0){
                    groups[0].carryout = true
                }else{
                    groups[0].carryout = false
                }

                $("#page3b #drinks_deserts_etc").val(+newFoodTotal.toFixed(2));
            })

		},

		page4: function() {

            $("#page4").live(
                "pagebeforeshow",
                function(){
                    Gozintas.showPageFourPercentages();
                    Gozintas.showPageFourButton();
                    $("#page4 #tip_rate").focusout(function() {
                        Gozintas.tipAmount = parseFloat($(this).val());
                    });
                    $("#page4 #tax_tip_rate").focusout(function() {
                        Gozintas.taxTipAmount = parseFloat($(this).val());
                    });
                    $("#page4 #wine_tip_rate").focusout(function() {
                        Gozintas.wineTipAmount = parseFloat($(this).val());
                    });
                    $("#page4 #carry_tip_rate").focusout(function() {
                        Gozintas.carryTipAmount = parseFloat($(this).val());
                    });
                    $("#page4 #tax_tip_rate").focusout(function() {
                        Gozintas.taxTipAmount = parseFloat($(this).val());
                    });
                }
            );


		},

		page5: function() {
            $("#page5").live(
                "pagebeforeshow",
                function () {
                    Gozintas.calculatePeopleInParty()
                    Gozintas.calculateTotalWithoutReduction()
                    Gozintas.totalIndividual = (+Gozintas.totalWithoutReduction/Gozintas.peopleInParty).toFixed(2)
                    Gozintas.totalTaxIndividual = (+Gozintas.taxAmount/Gozintas.peopleInParty).toFixed(2)
                    Gozintas.calculateTaxAndTotal()

                    for(var i=0; i<groups.length; i++){
                        five_foodTotal = (+groups[i].total- +groups[i].taxTotal - +groups[i].foodTotal - groups[i].carryOutTotal - groups[i].wineTotal).toFixed(2)
                        five_tipTotal = ((+five_foodTotal)*Gozintas.tipAmount + +groups[i].foodTotal*Gozintas.tipAmount + +groups[i].carryOutTotal*Gozintas.carryTipAmount + +groups[i].wineTotal*Gozintas.wineTipAmount + +groups[i].taxTotal*Gozintas.taxTipAmount).toFixed(2)
                        five_finalTotal = +groups[i].total + +five_tipTotal;
                        $("#page5 #group-"+(i+1)+" #individuals_in_party").val(groups[i].peopleInParty)
                        $("#page5 #group-"+(i+1)+" #total").val(five_finalTotal)
                        $("#page5 #group-"+(i+1)+" .food_total label").text("Food Total ("+(Gozintas.tipAmount*100).toFixed()+"% tip rate)")
                        $("#page5 #group-"+(i+1)+" #food_total").val(+five_foodTotal)
                        
                       $("#page5 #group-"+(i+1)+" #drinks_deserts_amount_container label").text("Drinks/Deserts/Etc ("+(Gozintas.tipAmount*100).toFixed()+"% tip rate)")

                       $("#page5 #group-"+(i+1)+" #wine_amount_container label").text("Wine ("+(Gozintas.wineTipAmount*100).toFixed()+"% tip rate)")

                       $("#page5 #group-"+(i+1)+" #carry_out_amount_container label").text("Carry-out for group ("+(Gozintas.carryTipAmount*100).toFixed()+"% tip rate)")
                        $("#page5 #group-"+(i+1)+" #total_individual").val((+five_finalTotal/+groups[i].peopleInParty).toFixed(2))
                        $("#page5 #group-"+(i+1)+" .tax_total label").text("Tax for group ("+(Gozintas.taxTipAmount*100).toFixed()+"% tip rate)")
                        $("#page5 #group-"+(i+1)+" #tax_total").val(+groups[i].taxTotal)
                        
                        $("#page5 #group-"+(i+1)+" #tip_total").val(five_tipTotal)
                        $("#page5 #group-"+(i+1)+" #tip_individual").val((five_tipTotal/groups[i].peopleInParty).toFixed(2))
                        Gozintas.showPageFiveGroupInputs(i);
                    }

                    $(".page5.total input").val($("#total_amount_input").val())
                    $(".page5.tax input").val($("#total_tax_amount_input").val())
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
            );

		},

		page5b: function() {
            $("#page5b").live(
                "pagebeforeshow",
                function () {
                    if(Gozintas.billPath == "determine-tip" || (Gozintas.billPath == "split-tip" && Gozintas.splitBy == "individual")){
                        groups[0].foodTotal = +Gozintas.totalAmount - +Gozintas.taxAmount
                    }

                    Gozintas.showPageFiveInputs();
                }
            );
		}


	}

}

