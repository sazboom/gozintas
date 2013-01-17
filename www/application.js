ko.extenders.formatPrice = function(target, option) {
    if(option){
        var formattedPrice = ko.computed({
            read: function () {
                return '$' + parseFloat(target()).toFixed(2);
            },
            write: function (value) {
                // Strip out unwanted characters, parse as float, then write the raw data back to the underlying "price" observable
                console.log(value);
                var current = target()
                value = parseFloat(value.replace(/[^\.\d]/g, ""));
                console.log("Now I'm "+value);
                target(isNaN(value) ? 0 : value); // Write to underlying storage
                target.valueHasMutated()
                console.log("Target is "+target());
            }
        });
        formattedPrice(target());
        console.log("First formatted price: "+formattedPrice);
        console.log("Second formatted price: "+formattedPrice());
        console.log("SSS"+target());
        return formattedPrice;
    }
}

ko.extenders.formatTip = function(target, option) {
    if(option){
        var formattedTip = ko.computed({
            read: function () {
                return parseFloat(target()).toFixed(0) + "%";
            },
            write: function (value) {
                // Strip out unwanted characters, parse as float, then write the raw data back to the underlying "price" observable
                value = parseFloat(value.replace(/[^\.\d]/g, ""));
                target(isNaN(value) ? 0 : value); // Write to underlying storage
            }
        });
        formattedTip(target());
        return formattedTip;
    }
}

function billModel() {
    var self = this;
    self.total = ko.observable("0").extend({ min: 0, required: true, formatPrice: true});
    self.tax = ko.observable("0").extend({ min: 0, formatPrice: true});  
    self.tip = {
        general: ko.observable("5").extend({ min: 0, formatTip: true}),
        wine: ko.observable("10").extend({ min: 0, formatTip: true}),
        tax: ko.observable("15").extend({ min: 0, formatTip: true}),
        carryout: ko.observable("20").extend({ min: 0, formatTip: true})
    }

    self.groups = ko.observableArray([
        new groupModel("Group-1", 0)
    ]);

    self.addGroup = function() {
        nextGroup = self.groups().length+1
        self.groups.push(new groupModel("Group-"+nextGroup, 0))
    }

    self.removeGroup = function(group) { self.groups.remove(group) }


}

function groupModel(nickname, peopleInParty) {
    var self = this;
    self.peopleInParty = ko.observable(peopleInParty).extend({ min: 0, required: true});
    self.nickname = ko.observable(nickname).extend({ minLength: 3, maxLength: 10, required: true});

    self.drinks_deserts = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.wine = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.carryout = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
}

function appViewModel() {
    var self = this;
    self.bill = new billModel();
    self.group = new groupModel();

};

ko.applyBindings(new appViewModel());