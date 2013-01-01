function billModel() {
    self = this;
    self.total = ko.observable("0").extend({ min: 0, required: true});
    self.tax = ko.observable("0").extend({ min: 0});  

    self.groups = ko.observableArray([
        new groupModel("Group-1", 0)
    ]);

    self.addGroup = function() {
        nextGroup = self.groups().length+1
        this.groups.push(new groupModel("Group-"+nextGroup, 0))
    }

    self.removeGroup = function(group) { self.groups.remove(group) }
}

function groupModel(nickname, peopleInParty) {
    this.peopleInParty = ko.observable(peopleInParty).extend({ min: 0, required: true});
    this.nickname = ko.observable(nickname).extend({ minLength: 3, maxLength: 10, required: true});
}

function appViewModel() {
    this.bill = new billModel();
    this.group = new groupModel();

};

ko.applyBindings(new appViewModel());