ko.extenders.formatPrice = function(target, option) {
    if(option){
        target.formattedPrice = ko.computed({
            read: function () {
                return '$' + parseFloat(target()).toFixed(2);
            },
            write: function (value) {
                // Strip out unwanted characters, parse as float, then write the raw data back to the underlying "price" observable
                value = parseFloat(value.replace(/[^\.\d]/g, ""));
                target(isNaN(value) ? 0 : Math.round(value*100)/100); // Write to underlying storage
                target.valueHasMutated()
            }
        });
        target.formattedPrice(target());
        return target;
    }
}

ko.extenders.formatTip = function(target, option) {
    if(option){
        target.formattedTip = ko.computed({
            read: function () {
                return parseFloat(target())*100 + "%";
            },
            write: function (value) {
                // Strip out unwanted characters, parse as float, then write the raw data back to the underlying tip observable
                value = parseFloat(value.replace(/[^\.\d]/g, ""));
                target(isNaN(value) ? 0 : value/100); // Write to underlying storage
            }
        });
        target.formattedTip(target());
        return target;
    }
}

function billModel() {
    var self = this;
    self.gozMode = ko.observable(false);
    self.total = ko.observable("0").extend({ min: 0, required: true, formatPrice: true});
    self.tax = ko.observable("0").extend({ min: 0, formatPrice: true});  
    self.tip = {
        general: ko.observable("5").extend({ min: 0, formatTip: true}),
        wine: ko.observable("10").extend({ min: 0, formatTip: true}),
        carryout: ko.observable("15").extend({ min: 0, formatTip: true}),
        tax: ko.observable("20").extend({ min: 0, formatTip: true})
    }

    // Initializing a group to be used for split individual and split group modes
    self.groups = ko.observableArray([
        new groupModel("Group-1", 0)
    ]);

    // Group additions, needed for computations

    self.groupWineTotal = ko.computed(function(){
        var total = 0;
        ko.utils.arrayForEach(self.groups(), function(group) {
            if(group.wine() > 0){
                total = total + group.wine();
           }
        });
        return total
    })

    self.groupGeneralTotal = ko.computed(function(){
        var total = 0;
        ko.utils.arrayForEach(self.groups(), function(group) {
            if(group.general() > 0){
                total = total + group.general();
           }
        });
        return total
    })

    self.groupCarryoutTotal = ko.computed(function(){
        var total = 0;
        ko.utils.arrayForEach(self.groups(), function(group) {
            if(group.carryout() > 0){
                total = total + group.carryout();
           }
        });
        return total
    })

    // Boolean checkers

    self.hasWine = ko.computed(function() {
        var bool = false;
        ko.utils.arrayForEach(self.groups(), function(group) {
            if(group.wine() > 0){
                bool = true;
           }
        });
        return bool
    });

    self.hasTax = ko.computed(function() {
        var bool = false;
        if(self.tax() > 0){
            bool = true;
        }
        return bool
    });

    self.hasGeneral = ko.computed(function() {
        var bool = false;
        if(self.gozMode() == 'determine-tip'){
            bool = true;
        }else{
            ko.utils.arrayForEach(self.groups(), function(group) {
                if(group.general() > 0){
                    bool = true;
                }
            });
        }
        return bool;
    });

    self.hasCarryout = ko.computed(function() {
        var bool = false;
        ko.utils.arrayForEach(self.groups(), function(group) {
            if(group.carryout() > 0){
                bool = true;
           }
        });
        return bool;
    });

    // Computations
    self.totalPeopleInAllGroups = ko.computed(function(){
        var peopleInParty = 0;
        ko.utils.arrayForEach(self.groups(), function(group) {
            peopleInParty = peopleInParty + parseFloat(group.peopleInParty());
        });
        return peopleInParty;
    });

    self.foodTotal = ko.computed(function(){
        return self.total() - self.groupGeneralTotal() - self.groupWineTotal() - self.groupCarryoutTotal();
    });

    self.setGroupDetails = ko.computed(function(){
        ko.utils.arrayForEach(self.groups(), function(group) {
            group.foodTotal = self.foodTotal() / self.groups().length
            group.taxTotal = self.tax() / self.groups().length

            group.carryoutTipTotal = group.carryout() * self.tip.carryout();
            group.wineTipTotal = group.wine() * self.tip.wine();
            group.generalTipTotal = group.foodTotal * self.tip.general();
        });

    });

    self.calculatedTotal = ko.computed(function(){
        return (Math.round((self.total() + self.tax() + self.total() * self.tip.general() + self.tax()*self.tip.tax())*100)/100);
    });

    self.calculatedTip = ko.computed(function(){
        return (Math.round((self.foodTotal()*self.tip.general() + self.groupWineTotal()*self.tip.wine() + self.groupCarryoutTotal()*self.tip.carryout() + self.tax()*self.tip.tax())*100)/100);
    });

    self.calculatedTipIndividual = ko.computed(function(){
        return self.calculatedTip()
    });


    // Group adding and removing for split-group mode

    self.addGroup = function() {
        nextGroup = self.groups().length+1
        self.groups.push(new groupModel("Group-"+nextGroup, 0))
    };

    self.removeGroup = function(group) { self.groups.remove(group) }


}

function groupModel(nickname, peopleInParty) {
    var self = this;
    self.peopleInParty = ko.observable(peopleInParty).extend({ min: 0, required: true});
    self.nickname = ko.observable(nickname).extend({ minLength: 3, maxLength: 10, required: true});

    self.foodTotal = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.taxTotal = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});

    self.carryoutTipTotal =  ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.wineTipTotal =  ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.generalTipTotal = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});

    self.tipTotal = ko.computed(function(){
       return self.carryoutTipTotal() + self.wineTipTotal() + self.generalTipTotal();
    });

    self.tipTotalIndividual = ko.computed(function(){
        var tipIndividual =  self.tipTotal() / self.peopleInParty()
        if(isNaN(tipIndividual)){
            return 0;
        }else{
            return tipIndividual;
        }

    })

    self.general = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.wine = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});
    self.carryout = ko.observable("0").extend({ min: 0, required: false, formatPrice: true});

}

function appViewModel() {
    var self = this;
    self.bill = new billModel();
    self.group = new groupModel();

};

ko.applyBindings(new appViewModel());