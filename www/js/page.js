var Page = {

	js : {
		page1: function() {

		},

		page2: function() {
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


		},

		page5: function() {

		},

		page5b: function() {

		}


	}

}

