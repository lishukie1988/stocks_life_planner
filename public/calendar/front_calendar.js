let calendar_width = "100";
let calendar_height = "700";
let month_year_width = "100";
let month_year_height = "90";
let day_view_width = "100";
let day_view_height = "700";
let date = new Date();
let current_year = date.getFullYear();
let current_month = date.getMonth() + 1;
let current_date = date.getDate();
$(document).ready(function(){

    let date_string = "12252020"
    console.log(parseInt(date_string.slice(4,8), 10));

    /*
    $.ajax({
        //url: "https://api.weatherbit.io/v2.0/current?key=54ca63d4a7474c57a1879b3c4f71291b&postal_code=94501&country=US", 
        url: "https://api.weatherbit.io/v2.0/forecast/daily?key=54ca63d4a7474c57a1879b3c4f71291b&postal_code=94501&country=US",
        success: function(result){
            console.log(result);
      }});
      */


    let month_year_div = $("<div></div>");
    month_year_div.css({"width": `${month_year_width}`+ "%", "height": `${month_year_height}`+ "px"})
    month_year_div.attr("id", "month_year_div");
    let month_div = createMonth(current_month);
    month_year_div.append(month_div);
    let year_div = createYear(current_year);
    month_year_div.append(year_div);
    $("#main_container").append(month_year_div);


    let months_div = createMonths();
    $("#main_container").append(months_div);
    let years_div = createYears(current_year);
    $("#main_container").append(years_div);


    let day_div = $("<div></div>");
    day_div.css({"width": "0%", "height": "0px"});
    day_div.attr("id", "day_div");
    let day_view = createDayView(current_date, current_month, current_year);
    day_div.append(day_view);
    $("#main_container").append(day_div);


    let calendar_div = $("<div></div");
    calendar_div.css({"width": `${calendar_width}` + "%", "height": `${calendar_height}` + "px"})
    calendar_div.attr("id", "calendar_div");
    let current_calendar = createCalendar(12, 2020);
    calendar_div.html(current_calendar);
    $("#main_container").append(calendar_div);

  
  });


function createTopRightButtonDiv(unicode) {

    let exit_div = $("<div></div");
    exit_div.css({"width": "100%", "height": "30px"});

    let button_div = $("<div></div");
    button_div.css({"float": "right", "font-size": "18px", "width": "30px",
                    "height": "98%", "background": "rgba(109,189,181,0.95)",
                    "text-align": "center", "line-height": "140%"
                    });
    let test_sym = '\u00D7';
    button_div.text(test_sym);
    exit_div.append(button_div);


    addHover(button_div, {"background": "rgba(214, 192, 133, 0.95)"}, {"background": button_div.css("background")});
    button_div.click(function() {

        //current_date = $(this).data("date");
            //console.log($(this).data("date"));
            //$("#calendar_div").html(createCalendar($(this).data("month"), $("#year_div").data("year")));
            //$("#month_div").data("month", $(this).data("month"));
            //$("#month_div").text(months_string_long[month]);
            //$("#day_div").html(createDayView(current_date, current_month, current_year));

            $("#calendar_div").animate(
                {width: `${calendar_width}` + "%", height: `${calendar_height}` + "px"},
                100
            )
            $("#month_year_div").animate(
                {width: `${month_year_width}` + "%", height: `${month_year_height}` + "%"},
                100
            )
            $("#day_div").animate(
                {width: "0%", height: "0px"},
                100
            )

    })

    return exit_div;

}


function createDayView(date, month, year) {

    //console.log(date, month, year);
    let day_view = $("<div></div>");
    day_view.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "100%", "height": "100%"
                });

    let exit_div = createTopRightButtonDiv('\u00D7');
    day_view.append(exit_div);
    day_view.append("Date: " + date + " Month: " + month + " Year: " + year);
    day_view.append("\nTown, City \n 15c \n Company 1: \n Company 2: \n Todo 1: \n Todo 2: ");
    return day_view;

}


function createYears(year) {
    let years_div = $("<div></div>");
    years_div.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "0%", "height": "0px",
                    "margin-right": "auto" 
                });
    years_div.attr("id", "years_div");
    let input_year = $("<input/>").attr({type: "number", id: "year_input", name: "year_input", value: `${year}`, required : "true"});
    input_year.css({"background": "rgba(109,189,181,0.5)", "border": "0px",
                    "text-align": "center", "margin-left": "25%", "margin-top": "50px",
                    "width": "50%", "height": "100px"                
                    })
    input_year.attr("id", "input_year");

    input_year.on("keyup", function(key) {
        if ((key.which === 13 || key.which === 27) && $(this).val() != "") {
            console.log("enter pressed");
            current_year = $(this).val();
            $("#calendar_div").html(createCalendar(current_month, $(this).val()));
            $("#year_div").data("year", $(this).val());
            $("#year_div").text($(this).val());
            $("#calendar_div").animate(
                {width: calendar_width + "%", height: calendar_height + "px"},
                100
            )
            $("#years_div").animate(
                {width: "0%", height: "0px"},
                100
            )
            $("#month_year_div").animate(
                {width: month_year_width + "%", height: month_year_height + "px"},
                100
            )
        }
    })
    //years_div.text("123testing");
    years_div.append(input_year);
    return years_div;
}


function createMonths(month) {

    let months_div = $("<div></div>");
    months_div.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "0%", "height": "0px",
                    "margin-right": "auto" 
                });

                months_div.attr("id", "months_div");

    for (let x = 1; x < 13; x++) {
        months_div.append(createMonthChoice(x));
    }
    
    //months_div.hide();
    return months_div;

}


function createMonthChoice(month) {

    let months_string = {1: "JAN", 2: "FEB", 3: "MAR", 4: "APR",
    5: "MAY", 6: "JUN", 7: "JUL", 8: "AUG",
    9: "SEP", 10: "OCT", 11: "NOV", 12: "DEC"}
    let months_string_long = {1: "January", 2: "February", 3: "March", 4: "April",
    5: "May", 6: "June", 7: "July", 8: "August",
    9: "September", 10: "October", 11: "November", 12: "December"
}

    let div = $("<div></div>");
    div.css({"font-size": "25px", "background": "rgba(109,189,181,0.4)", "width": "25%", "height": "33%",
                    "float": "left", "margin": "auto", "text-align": "center"
                });
    

    div.data("month", month);
    //console.log(div.data("month"));
    div.text(months_string[month]); 

    addHover(div, {"background": "rgba(214, 192, 133, 0.5)"}, {"background": div.css("background")});
    div.click(function() {
        //$("month_div").animate(
        //    {width: "0px", height: "0px"},
        //    400
        //)
        //console.log("month choice clicked");
        current_month = $(this).data("month");
        $("#calendar_div").html(createCalendar($(this).data("month"), $("#year_div").data("year")));
        $("#month_div").data("month", $(this).data("month"));
        $("#month_div").text(months_string_long[month]);
        $("#calendar_div").animate(
            {width: calendar_width + "%", height: calendar_height + "px"},
            100
        )
        $("#months_div").animate(
            {width: "0%", height: "0px"},
            100
        )
        $("#month_year_div").animate(
            {width: month_year_width + "%", height: month_year_height + "px"},
            100
        )
    })



    
    return div;

}


function createYear(year) {

    let year_div = $("<div></div>");
    year_div.text(year);
    //year_div.attr("id", "year_div");
    year_div.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "29%",
                    "float": "right", "margin-right": "0.25%" 
                });
    year_div.attr("id", "year_div");
    year_div.data("year", year);

    addHover(year_div, {"background": "rgba(214, 192, 133, 0.5)"}, {"background": year_div.css("background")});
    year_div.click(function() {
        $("#calendar_div").animate(
            {width: "0px", height: "0px"},
            100
        )
        $("#years_div").animate(
            {width: "100%", height: "200px"},
            100
        )
        $("#month_year_div").animate(
            {width: "0%", height: "0px"},
            100
        )
    })



    return year_div;

}

function createMonth(month) {

    let months_string = {1: "January", 2: "February", 3: "March", 4: "April",
                            5: "May", 6: "June", 7: "July", 8: "August",
                            9: "September", 10: "October", 11: "November", 12: "December"
                        }

    let month_div = $("<div></div>");
    month_div.attr("id", "month_div");
    month_div.text(months_string[month]);
    month_div.data("month", month);
    month_div.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "69%",
                    "float": "left", "margin-left": "0.25%"
                });

    
    addHover(month_div, {"background": "rgba(214, 192, 133, 0.5)"}, {"background": month_div.css("background")});
    month_div.click(function() {
        $("#calendar_div").animate(
            {width: "0px", height: "0px"},
            100
        )
        $("#months_div").animate(
            {width: "100%", height: "200px"},
            100
        )
        $("#month_year_div").animate(
            {width: "0%", height: "0px"},
            100
        )
    })

    //console.log("month div created");
    return month_div;

}


/*
- returns a DOM element that is a calendar of specified month & year
*/
function createCalendar(month, year) {
    //let date_object = getDateObject(month, year);
    let date_object = getDateObject(month, year);
    /*
    let test_date_object = {1:4, 2:5, 3:6, 4:0, 5:1, 6:2, 7:3,
                            8:4, 9:5, 10:6, 11:0, 12:1, 13:2, 14:3,    
                            15:4, 16:5, 17:6, 18:0, 19:1, 20:2, 21:3,
                            22:4, 23:5, 24:6, 25:0, 26:1, 27:2, 28:3,
                            29:4, 30:5, 31:6};
                            */
    let calendar = $("<div></div>");
    //calendar_div.attr("id", "calendar_div");


    //calendar_div.css("padding", "1%");
    calendar.css("width", calendar_width + "%");
    calendar.css("height", calendar_height*0.99 + "px"); 
    //calendar_div.css("background", "yellow");
    
    let weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    let header = createWeekHeader();
    for (let day = 0; day < 7; day++) {
        let current_day = createHeaderDay(0);
        current_day.text(weekdays[day]);
        header.append(current_day);
    }   
    calendar.append(header);     

    let date_index = 1;
    
    for (let week = 0; week < 6; week++) {
        let current_week = createWeek();

        for (let day = 0; day < 7; day++) {
            let current_day;
            if ( (week == 0 && date_object[date_index] > day) || (date_index > Object.keys(date_object).length)) {
                
                current_day = createDay(-1);
                if (date_object[date_index] == day + 1) {
                    current_day.css("border-right", "groove");
                }
                //current_day.text("day" + day + "\nindex" + date_index + "\ndate" + test_date_object[date_index] + "blank");
            }
            else {
                let left = (day < 6) ? 0 : 1;
                current_day = createDay(left);
                current_day.text(date_index);
                current_day.data("date", date_index);

                date_index++;
            }
            //current_day.append("day" + day + "\ndate" + date_index + "\ndateday" + test_date_object[date_index] + "test" );
            current_week.append(current_day);
            //console.log(date_object[date_index] + (date_object[date_index] > 0));
            //date_index++;
        }
        calendar.append(current_week);
    } 
    
    return calendar;


}

function createWeekHeader() {
    let week_x = $("<div></div>");
    week_x.css("width", "100%");
    week_x.css("height", "5%");
    week_x.css("text-align", "center");
    //week_x.css("background", "rgba(58,105,100,0.95)"); // #3a6964 // 58, 105, 100
    return week_x;

}


function createWeek() {
    let week_x = $("<div></div>");
        week_x.css("width", "100%");
        week_x.css("height", "15%");
        //week_x.css("background", "rgba(39, 71, 68,10)");
        //week_x.css("background", "");
    return week_x;

}

function createHeaderDay() {
    let day_x = $("<div></div>");
    day_x.css("width", "14.25%");
    day_x.css("height", "95%");
    day_x.css("float", "left");
    day_x.css("background", "rgba(214, 192, 133)");
    return day_x;

}

function createDay(empty) {


    let day_x = $("<div></div>");
    day_x.css("width", "14.25%");
    day_x.css("height", "95%");
    day_x.css("float", "left");   
    day_x.css("background", "rgba(109,189,181,0.95)"); 
    //day_x.css("border": )
    if (empty == 0) {
        day_x.css("border-right", "groove");
    } 
    //day_x.css("border-color", "rgba(0,0,0,0)");


    if (empty >= 0) {
        addHover(day_x, {"background": "rgba(214, 192, 133)"}, {"background": "rgba(109,189,181,0.95)"});
        day_x.click(function() {
            current_date = $(this).data("date");
            //console.log($(this).data("date"));
            //$("#calendar_div").html(createCalendar($(this).data("month"), $("#year_div").data("year")));
            //$("#month_div").data("month", $(this).data("month"));
            //$("#month_div").text(months_string_long[month]);
            $("#day_div").html(createDayView(current_date, current_month, current_year));

            $("#calendar_div").animate(
                {width: "0%", height: "0px"},
                100
            )
            $("#month_year_div").animate(
                {width: "0%", height: "0px"},
                100
            )
            $("#day_div").animate(
                {width: `${day_view_width}` + "%", height: `${day_view_height}` + "px"},
                100
            )
        })
        




    }

    return day_x;
}

function addHover(element, on_css, off_css) {

    //let old_css = element.attr("style");
    $(element).hover(function() {
        $(this).css(on_css);
    },
    function() {
        $(this).css(off_css);
    });
}


/*
- returns an object containing dates & their corresponding weekday
- example: {1:5, 2:6, 3:0, 4:1} // where 0 = sunday, 1 = monday
*/
function getDateObject(month, year) {
    // array with prepopulated number of days in all months except feb
    let month_days = {1:31, 2:0, 3:31, 4:30, 5:31, 6:30, 7:31, 8:31, 9:30, 10:31, 11:30, 12:31};
    // determine if leap year: if so. feb has 29 days, non leap: 28
    let leap = year % 4 == 0 && ( year % 100 != 0 || (year & 100 == 0 && year & 400 == 0) );
    //console.log("leap year: " + leap + year);
    month_days[2] = (leap == true ) ? 28 : 29;
    // for each day in the resulted number of days in the input month, calculate its corresponding weekday
    let return_object = {};

    for (day = 1; day < month_days[month] + 1; day++) {
        return_object[day] = getWeekday(month, year, day, leap);
    }

    //console.log("month: " + month + " year: " + year)
    //console.log(return_object);
    return return_object;




}


function getWeekday(month, year, date, leap) {

    let yy = year % 100;
    let year_code = (yy + Math.floor(yy/4)) % 7;

    let month_codes = {1:0, 2:3, 3:3, 4:6, 5:1, 6:4, 7:6, 8:2, 9:5, 10:0, 11:3, 12:5}; 
    let leap_modifier = (leap == true && (month == 1 || month == 2) ) ? -1 : 0; 
    let century_codes = {17:4, 18:2, 19:0, 20:6, 21:4};
    let century = Math.floor(year/100);

    //console.log("yy:" + yy + " year_code:"+year_code + " leap_modifier" + leap_modifier + " century_code:" + century_codes[century] + " month_code" + month_codes[month]);

    let weekday = (year_code + month_codes[month] + century_codes[century] + date + leap_modifier) % 7;

    return weekday;


}