function billModel() {
    var self = this;
    self.total = ko.observable(0).extend({ min: 0, required: true});
    self.tax = ko.observable(0).extend({ min: 0});  
    self.tip = {
        general: ko.observable(5).extend({ min: 0}),
        wine: ko.observable(10).extend({ min: 0}),
        tax: ko.observable(15).extend({ min: 0}),
        carryout: ko.observable(20).extend({ min: 0})
    }

    self.groups = ko.observableArray([
        new groupModel("Group-1", 0)
    ]);

    self.addGroup = function() {
        nextGroup = self.groups().length+1
        self.groups.push(new groupModel("Group-"+nextGroup, 0))
    }

    self.removeGroup = function(group) { self.groups.remove(group) }

    self.addFormattedPrice = function(formattedName, variable)
    {
        self[formattedName] = ko.computed({
            read: function () {
                return '$' + self[variable]().toFixed(2);
            },
            write: function (value) {
                // Strip out unwanted characters, parse as float, then write the raw data back to the underlying "price" observable
                value = parseFloat(value.replace(/[^\.\d]/g, ""));
                self[variable](isNaN(value) ? 0 : value); // Write to underlying storage
            },
            owner: self
        });
    }

    self.addFormattedPrice('formattedTotal', 'total');
    self.addFormattedPrice('formattedTax', 'tax');

}

function groupModel(nickname, peopleInParty) {
    var self = this;
    self.peopleInParty = ko.observable(peopleInParty).extend({ min: 0, required: true});
    self.nickname = ko.observable(nickname).extend({ minLength: 3, maxLength: 10, required: true});

    self.drinks_deserts = ko.observable("0").extend({ min: 0, required: false});
    self.wine = ko.observable("0").extend({ min: 0, required: false});
    self.carryout = ko.observable("0").extend({ min: 0, required: false});
}

function appViewModel() {
    var self = this;
    self.bill = new billModel();
    self.group = new groupModel();

};

ko.applyBindings(new appViewModel());