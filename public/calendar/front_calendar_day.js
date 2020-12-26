function getDateString(year, month, date) {
    let return_string = year + "-";
    let month_string;
    let date_string;
    if (month < 10) {
        month_string = "0" + month + "-";
    }
    else {
        month_string = month + "-";
    }
    if (date < 10) {
        date_string = "0" + date;
    }
    else {
        date_string = date;
    }
    return_string += month_string;
    return_string += date_string;
    return return_string;
}



function createDay(empty, date) {


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

        let date_div = $("<div></div");
        date_div.css({"height": "15%", "width": "100%", "font-size": "12%"});
        date_div.text(date);
        day_x.append(date_div);
        day_x.data("date", date);


        let date_string = getDateString(current_year, current_month, date);
        if (forecast.hasOwnProperty(date_string)) {
            let weather_div = $("<div></div");
            weather_div.css({"height": "35%", "width": "100%", "font-size": "25%", "background": background_blue});
            let weather_num_div = $("<div></div");
            weather_num_div.css({"height": "100%", "width": "auto", "font-size": "15%", "float": "left"});
            weather_div.append(weather_num_div);
            let weather_icon = $("<img>");
            weather_icon.css({"height": "100%", "width": "auto", "float": "right"});
            weather_div.append(weather_icon);
            weather_num_div.append( "<h6>" + forecast[date_string]["temp"] + temp_unit + "</h6>");
            weather_icon.attr("src", 'static/pictures/weather_icons/' + forecast[date_string]["weather"]["icon"] + ".png");
            day_x.append(weather_div);
        }


        // ***TODO:
        // - send AJAX to server to get TODO ITEMS for this day
        // - populate thumbnail for this day with retrieved items (if any)

        /*
        $.ajax({
            url: "/todo",
            async: true,
            type: 'POST', 
            data: {userID: user_id, year: current_year, month: current_month, date: date},
            success: function(result){
                console.log("CALLBACK of POST TODO AJAX")
                console.log(result);

            }
                
        });
        */


        addHover(day_x, {"background": "rgba(214, 192, 133)"}, {"background": "rgba(109,189,181,0.95)"});
        day_x.click(function() {
            //console.log(forecast);
            let date_string = current_year + "-" + current_month + "-" + day_x.data("date");
            console.log(date_string);
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


function createDayView(date, month, year) {

    //console.log(date, month, year);
    let day_view = $("<div></div>");
    day_view.css({"font-size": "50px", "background": "rgba(109,189,181,0.8)", "width": "100%", "height": "100%"
                });

    let exit_div = createTopRightButtonDiv('\u00D7');
    day_view.append(exit_div);
    let date_string = getDateString(year, month, date);
    if (forecast.hasOwnProperty(date_string)) {
        let weather_div = $("<div></div");
        weather_div.css({"height": "15%", "width": "100%", "font-size": "large", "background": background_blue});
        let weather_num_div = $("<div></div");
        weather_num_div.css({"height": "98%", "width": "auto", "float": "left"});
        weather_div.append(weather_num_div);
        let weather_icon = $("<img>");
        weather_icon.css({"height": "100%", "width": "auto", "float": "right", "display": "flex"});
        weather_div.append(weather_icon);
        let main_stat = $("<div></div>");
        main_stat.css({"float": "left", "font-size": "375%", "width": "auto"});
        main_stat.append(forecast[date_string]["temp"] + temp_unit);
        weather_num_div.append(main_stat);
        let small_stats = $("<div></div>");
        small_stats.css({"padding-top": "5%", "padding-left": "1%", "width": "auto", "font-size": "55%"});
        small_stats.append( 
                                "<div>" + "<b>HIGH:</b>" + forecast[date_string]["max_temp"] + temp_unit + "</div>" + 
                                "<div>" + "<b>LOW:</b>" + forecast[date_string]["min_temp"] + temp_unit + "</div>" +
                                "<div>" + "<b>HUM:</b>" + forecast[date_string]["rh"] + "%" + "</div>" + 
                                "<div>" + "<b>PRECIP:</b>" + forecast[date_string]["precip"] + "mm" + "</div>" );
        weather_num_div.append(small_stats);
        
        
       //weather_num_div.append(forecast[date_string]["temp"] + temp_unit  +
       //"<h4 style=\"\">" + forecast[date_string]["temp"] + temp_unit + "</h2>" + 
       //"<h4 style=\"\">" + forecast[date_string]["temp"] + temp_unit + "</h2>"

        //);
        weather_icon.attr("src", 'static/pictures/weather_icons/' + forecast[date_string]["weather"]["icon"] + ".png");
        day_view.append(weather_div);
    }
    day_view.append("Date: " + date + " Month: " + month + " Year: " + year);
    day_view.append("\nTown, City \n 15c \n Company 1: \n Company 2: \n Todo 1: \n Todo 2: ");
    return day_view;

}