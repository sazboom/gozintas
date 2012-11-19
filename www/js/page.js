var Page = {

	js : {
		page2: function() {
			$('#total_amount_input').on('change', function() {
				Gozintas.totalBill = parseFloat($(this).val())
			})
			$('#total_tax_amount_input').on('change', function() {
				Gozintas.totalTax = parseFloat($(this).val())
			})

		}
	}

}

