
[
    {
        start : "2022-09-07 13:00:00-07:00",
        end : "2022-09-07 13:00:00-9:00"
    },
    {
        start : "2022-09-07 13:00:00-10:00",
        end : "2022-09-07 13:00:00-11:00"
    }
]

/* const timeLapse = end - start;
const timeColision = newStart -timelapse */

var start = new Date("2022-09-07 10:00:00-07:00");
var end = new Date("2022-09-07 12:00:00-07:00");

var newStart = new Date("2022-09-07 12:00:01-07:00");

var empezar = "";

if(newStart <= end && newStart >= start){
    empezar = "no"
}
else {
    empezar = "Si"
}