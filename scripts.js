//Global vars to submit
var startDate = new Date("2022-05-01");
var endDate = new Date("2022-05-01");

//Submit Function 
function submit() {
    let name = $('#name').val().trim().replaceAll(' ','_');
    name = name.replaceAll('.','');
    name = name.replaceAll('#','');
    name = name.replaceAll('$','');
    name = name.replaceAll('[','');
    name = name.replaceAll(']','');
    name = name.replaceAll('{','');
    name = name.replaceAll('}','');
    let avai = $('#avai').val();
    
    if (name != null && name != "" && startDate != null && endDate != null) {
        let daylist = getDaysArray(startDate, endDate);
        daylist.forEach(function dateSubmit(item) {
            console.log(item);
            window.submitToDB(name,getDateString(item),avai)
            location.reload()
        })
    } else {
        alert("Es wurde kein Name eingetragen oder kein Datum ausgewählt.")
    }
}

//Get Days Array
function getDaysArray(start, end) {
    for(var arr=[],dt=new Date(start); dt<=end; dt.setDate(dt.getDate()+1)){
        arr.push(new Date(dt));
    }
    return arr;
};

//Get Date String
function getDateString(date) {
    const offset = date.getTimezoneOffset()
    date = new Date(date.getTime() - (offset*60*1000))
    return date.toISOString().split('T')[0]
}

//Get Date String for German
function getGermanDateString(date) {
    let datArr = getDateString(date).split('-');
    return datArr[2] + '.' + datArr[1] + '.' + datArr[0];

}

// Show Calendar from DB Data
// Iterate through every name for every name through every saved date. Get
// Date and Availability
function showCalendar(data) {
    dayDate = 0;
    //all dates in range from 2022-05-01 to 2022-09-30
    let allDates = getDaysArray(new Date('2022-05-01'), new Date('2022-09-30'));
        $('#calendar thead').append('<th class="headcol"><b>Datum<b></th>');
    allDates.forEach(function(item) {
        if(Math.ceil(dayDate/7)%2 != 0) {
            $('#calendar thead').append('<th class="head"><b>' + getGermanDateString(item) + '</b></th>');
        } else {
            $('#calendar thead').append('<th class="head greybg"><b>' + getGermanDateString(item) + '</b></th>');
        }
        dayDate++;
    })

    Object.keys(data).forEach(function(name) {
        let newName = name.replaceAll('_',' ');
        $('#calendar tbody').append('<tr id=' + name + '><td class="headcol"><b>' + newName + '</b></td></tr>');

        allDates.forEach(function(item) {
            if(data[name].hasOwnProperty(getDateString(item))) {
                $('#calendar #' + name).append('<td style="background-color:' + Object.values(data[name][getDateString(item)]) + '"></td>');
            } else {
                $('#calendar #' + name).append('<td style="background-color:#efefef"></td>');
            }
        })
    })
}