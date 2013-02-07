var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        // note that this is an event handler so the scope is that of the event
        // so we need to call app.report(), and not this.report()
        app.report('deviceready');
    },
    report: function(id) { 
        console.log("report:" + id);
        // hide the .pending <p> and show the .complete <p>
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    }


};

function addGroup()
{
    group_size = $("#page3 [class^='group-']").size();
    new_group = new Group()
    new_group.peopleInParty = 0;
    groups.push(new_group)
    $("<div data-role='collapsible' data-content-theme='c' data-theme='a' id ='group-"+(group_size+1)+"' class='group-"+(group_size+1)+" visible' data-routing='group.html'><h3>Group "+(group_size+1)+"</h3></div>").appendTo('.groups');
    $("<div data-role='collapsible' data-content-theme='c' data-theme='a' id ='group-"+(group_size+1)+"' class='group-"+(group_size+1)+" visible' data-routing='total.html'><h3>Group "+(group_size+1)+"</h3></div>").appendTo('.groups-final');
    result = loadPartials(".group-"+(group_size+1)+"[data-routing]", false);
    return result;
}

function removeGroup()
{
    group_size = $("#page3 [class^='group-']").size();
    if(group_size !=1)
    {
        $(".group-"+group_size).remove();
        groups.pop(new Group())
    }
}

function addExtra()
{

}


// function testAjaxGroup(){
//     group_size = $("#page3 [class^='group-']").size();
//     new_group = new Group()
//     new_group.peopleInParty = 0;
//     groups.push(new_group)
//     $this1 = $("<div data-role='collapsible' data-content-theme='c' data-theme='a' id ='group-"+(group_size+1)+"' class='group-"+(group_size+1)+" visible' data-routing='group.html'><h3>Group "+(group_size+1)+"</h3></div>")
//     $this1.appendTo('.groups');
//     $this2 = $("<div data-role='collapsible' data-content-theme='c' data-theme='a' id ='group-"+(group_size+1)+"' class='group-"+(group_size+1)+" visible' data-routing='total.html'><h3>Group "+(group_size+1)+"</h3></div>")
//     $this2.appendTo('.groups-final');
//     $.ajax({
//         url: "partials/_group.html",
//         dataType:'html',
//         async: false,
//         success: function(data){
//             console.log('hurr');
//             $this1.append(data);
//             $this1.trigger('create');
//         }
//     });
// }

function returnHome(){
    Gozintas.reset();
    $(':input').val('');
}