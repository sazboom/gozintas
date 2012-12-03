var Page = {

	js : {
		page1: function() {

		},

		page2: function() {
			$('#total_amount_input').on('change', function() {
				Gozintas.totalAmount = parseFloat($(this).val()).toFixed(2)
				console.log(Gozintas.totalAmount)
			})
			$('#total_tax_amount_input').on('change', function() {
				Gozintas.taxAmount = parseFloat($(this).val()).toFixed(2)
				console.log(Gozintas.taxAmount)
			})

		},

		page3: function() {
		    $("#three .group_nickname").live('keyup',function(){
                group = $(this).parent().parent().parent().attr("class").split(" ")[0]
                parentClass = "."+group+" ";
                groupNum = parseFloat(group.split("-")[1])
                textInput = $(parentClass+'.group_nickname').val();
                groups[groupNum-1].nickname = textInput
                elToRemove = $("#three "+parentClass+"h3 span.ui-btn-text");
                final_elToRemove = $("#five "+parentClass+"h3 span.ui-btn-text");
                if(final_elToRemove.length == 0){
                    final_elToRemove = $("#five "+parentClass+"h3");
                }
                children = elToRemove.children().detach();
                finalChildren = final_elToRemove.children().detach();
                elToRemove.html(textInput);
                final_elToRemove.html(textInput);
                elToRemove.append(children);
                final_elToRemove.append(finalChildren);
            });

            $("#three #people_in_group").live('keyup',function(){
                group = $(this).parent().parent().parent().attr("class").split(" ")[0];
                parentClass = "."+group+" ";
                groupNum = parseFloat(group.split("-")[1])
                peopleInParty = parseFloat($(parentClass+'#people_in_group').val());
                groups[groupNum-1].peopleInParty = peopleInParty;
            })

            $("#three #drinks_deserts_etc").live('keyup',function(){
                group = $(this).parent().parent().parent().attr("class").split(" ")[0];
                parentClass = "."+group+" ";
                groupNum = parseFloat(group.split("-")[1])
                foodTotal = parseFloat($(parentClass+'#drinks_deserts_etc').val()).toFixed(2);
                groups[groupNum-1].foodTotal = foodTotal;
                if(groups[groupNum-1].foodTotal > 0){
                    groups[groupNum-1].extras = true
                    groups[groupNum-1].reduction = true
                }else{
                    if(groups[groupNum-1].foodTotal >=0 || groups[groupNum-1].carryOutTotal >=0 || groups[groupNum-1].wineTotal >= 0 || groups[groupNum-1].reductionTotal >= 0){
                        groups[groupNum-1].reduction = true
                    }else{
                        groups[groupNum-1].reduction = false
                        groups[groupNum-1].extras = false
                    }
                }
            })
            $("#three #wine_amount").live('keyup',function(){
                group = $(this).parent().parent().parent().attr("class").split(" ")[0];
                parentClass = "."+group+" ";
                groupNum = parseFloat(group.split("-")[1])
                wineTotal = parseFloat($(parentClass+'#wine_amount').val()).toFixed(2);
                groups[groupNum-1].wineTotal = wineTotal;
                if(groups[groupNum-1].wineTotal > 0){
                    groups[groupNum-1].wine = true
                    groups[groupNum-1].reduction = true
                }else{
                    groups[groupNum-1].wine = false
                    if(groups[groupNum-1].foodTotal >=0 || groups[groupNum-1].carryOutTotal >=0 || groups[groupNum-1].wineTotal >= 0 || groups[groupNum-1].reductionTotal >= 0){
                        groups[groupNum-1].reduction = true
                    }else{
                        groups[groupNum-1].reduction = false
                    }
                }
            })


            $("#three #carry_out_amount").live('keyup',function(){
                group = $(this).parent().parent().parent().attr("class").split(" ")[0];
                parentClass = "."+group+" ";
                groupNum = parseFloat(group.split("-")[1])
                carryOut = parseFloat($(parentClass+'#carry_out_amount').val()).toFixed(2);
                groups[groupNum-1].carryOutTotal = carryOut;
                if(groups[groupNum-1].carryOutTotal > 0){
                    groups[groupNum-1].carryout = true
                    groups[groupNum-1].reduction = true
                }else{
                    groups[groupNum-1].carryout = false
                    if(groups[groupNum-1].foodTotal >=0 || groups[groupNum-1].carryOutTotal >=0 || groups[groupNum-1].wineTotal >= 0 || groups[groupNum-1].reductionTotal >= 0){
                        groups[groupNum-1].reduction = true
                    }else{
                        groups[groupNum-1].reduction = false
                    }
                }
            })

            $("#three #fair_reduction").live('keyup',function(){
                group = $(this).parent().parent().parent().attr("class").split(" ")[0];
                parentClass = "."+group+" ";
                groupNum = parseFloat(group.split("-")[1])
                fairReduction = parseFloat($(parentClass+'#fair_reduction').val()).toFixed(2);
                groups[groupNum-1].reductionTotal = fairReduction;
                if(groups[groupNum-1].reductionTotal > 0){
                    groups[groupNum-1].reduction = true
                }else{
                    if(groups[groupNum-1].foodTotal >=0 || groups[groupNum-1].carryOutTotal >=0 || groups[groupNum-1].wineTotal >= 0 || groups[groupNum-1].reductionTotal >= 0){
                        groups[groupNum-1].reduction = true
                    }else{
                        groups[groupNum-1].reduction = false
                    }
                }
            })

		},


		page3b: function() {
            $("#three-b").live('keyup',function(){
                parentClass = "#three-b";
                peopleInParty = parseFloat($(parentClass+' #people_in_party').val())
                wineTotal = parseFloat($(parentClass+' #wine_amount').val()).toFixed(2);
                carryOut = parseFloat($(parentClass+' #carry_out_amount').val()).toFixed(2);

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

                $("#three-b #drinks_deserts_etc").val(+newFoodTotal.toFixed(2));
            })

		},

		page4: function() {


		},

		page5: function() {

		},

		page5b: function() {

		}


	}

}

