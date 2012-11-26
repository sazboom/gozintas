var Page = {

	js : {
		page2: function() {
			$('#total_amount_input').on('change', function() {
				Gozintas.foodAmount = parseFloat($(this).val()).toFixed(2)
				console.log(Gozintas.foodAmount)
			})
			$('#total_tax_amount_input').on('change', function() {
				Gozintas.taxAmount = parseFloat($(this).val()).toFixed(2)
				console.log(Gozintas.taxAmount)
			})

		}
	}

}

