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



function createDay(empty, date, weekday) {


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
        date_div.css({"height": "20%", "width": "100%", "font-size": "12%"});
        date_div.text(date);
        day_x.append(date_div);
        day_x.data("date", date);


        let date_string = getDateString(current_year, current_month, date);
        if (forecast.hasOwnProperty(date_string)) {
            let weather_div = $("<div></div");
            weather_div.css({"height": "21%", "width": "100%", "background": background_blue, "margin-bottom": "2%"});
            let weather_num_div = $("<div></div");
            weather_num_div.css({"height": "100%", "width": "auto", "font-size": "1%", "float": "left"});
            weather_div.append(weather_num_div);
            let weather_icon = $("<img>");
            weather_icon.css({"height": "100%", "width": "auto", "float": "right"});
            weather_div.append(weather_icon);
            weather_num_div.append( forecast[date_string]["temp"] + temp_unit );
            weather_icon.attr("src", 'static/pictures/weather_icons/' + forecast[date_string]["weather"]["icon"] + ".png");
            day_x.append(weather_div);
        }



        // test fetch todo for a specific day
        $.ajax({
            url: "/todo",
            async: true,
            type: 'POST', 
            data: {userID: user_id, year: current_year, month: current_month, date: date},
            success: function(result){
                console.log("CALLBACK of POST TODO AJAX")
                let list = result["todos"];
                //console.log(result["todos"]);

                for (let item in list) {
                    //console.log(list[item]["content"]);
                    let todo = $("<div></div>");
                    todo.css({"background": background_todo, "height": "19%", "width": "100%", "font-size": "10%", "margin-bottom": "2%"});
                    todo.append(list[item]["content"]);
                    day_x.append(todo);
                }

            }
                
        });



        addHover(day_x, {"background": "rgba(214, 192, 133)"}, {"background": "rgba(109,189,181,0.95)"});
        day_x.click(function() {
            //console.log(forecast);
            //let date_string = current_year + "-" + current_month + "-" + day_x.data("date");
            console.log(date_string);
            current_date = $(this).data("date");
            //console.log($(this).data("date"));
            //$("#calendar_div").html(createCalendar($(this).data("month"), $("#year_div").data("year")));
            //$("#month_div").data("month", $(this).data("month"));
            //$("#month_div").text(months_string_long[month]);
            $("#day_div").html(createDayView(current_date, current_month, current_year, weekday));

            $("#calendar_div").animate(
                {width: "0%", height: "0%"},
                100
            )
            $("#month_year_div").animate(
                {width: "0%", height: "0%"},
                100
            )
            $("#day_div").animate(
                {width: `${day_view_width}` + "%", height: `${day_view_height}` + "%"},
                100
            )
        })
        

    }

    return day_x;
}


function createDayView(date, month, year, weekday) {

    //console.log(date, month, year);
    let day_view = $("<div></div>");
    day_view.css({"font-size": "100%", "background": "rgba(109,189,181,0.8)", "width": "100%", "height": "90%"
                });

    let exit_div = createTopRightButtonDiv('\u00D7');
    day_view.append(exit_div);
    let date_string = getDateString(year, month, date);
    let weather_div = $("<div></div");
        weather_div.css({"height": "10%", "width": "100%", "font-size": "", "background": background_blue});
        
        let date_div = $("<div></div");
        date_div.css({"height": "100%", "width": "33%", "float": "left", "font-size": "215%", "padding": "0%", "line-height": "250%", "margin": "0"});
        let week_day = $("<div></div");
        week_day.css({"background": "", "height": "50%", "width": "100%", "font-size": "50%", "padding": "0%", "line-height": "200%", "margin": "0%"});
        week_day.append(weekday);
        date_div.append(week_day);
        let full_date = $("<div></div");
        full_date.css({"height": "50%", "width": "100%", "font-size": "50%", "padding": "0%", "line-height": "110%"});
        full_date.append(month + "/" + date + "/" + year);
        date_div.append(full_date);
        weather_div.append(date_div);
        day_view.append(weather_div);

    if (forecast.hasOwnProperty(date_string)) {

        /*
        let weather_div = $("<div></div");
        weather_div.css({"height": "10%", "width": "100%", "font-size": "large", "background": background_blue});
        
        let date_div = $("<div></div");
        date_div.css({"height": "100%", "width": "30%", "float": "left", "font-size": "215%", "padding": "0%", "line-height": "180%"});
        date_div.append(month + "/" + date + "/" + year);
        weather_div.append(date_div);

        */

        let weather_num_div = $("<div></div");
        weather_num_div.css({"height": "100%", "width": "auto", "float": "right"});
        
        let weather_icon = $("<img>");
        weather_icon.css({"height": "100%", "width": "auto", "float": "right", "display": "flex", "padding": "0%"});
        weather_div.append(weather_icon);
        weather_div.append(weather_num_div);
        let main_stat = $("<div></div>");
        main_stat.css({"float": "left", "font-size": "155%", "width": "auto", "line-height": "160%" });
        main_stat.append(forecast[date_string]["temp"] + temp_unit);
        weather_num_div.append(main_stat);
        let small_stats = $("<div></div>");
        small_stats.css({"padding-top": "5%", "padding-left": "0%", "width": "auto", "font-size": "0.9vh", "line-height": "150%"});
        small_stats.append( 
                                "<div style=\"padding:0%\">" + "<b>HIGH:</b>" + forecast[date_string]["max_temp"] + temp_unit + "</div>" + 
                                "<div style=\"padding:0%\">" + "<b>LOW:</b>" + forecast[date_string]["min_temp"] + temp_unit + "</div>" +
                                "<div style=\"padding:0%\">" + "<b>HUM:</b>" + forecast[date_string]["rh"] + "%" + "</div>" + 
                                "<div style=\"padding:0%\">" + "<b>PRECIP:</b>" + forecast[date_string]["precip"] + "mm" + "</div>" );
        weather_num_div.append(small_stats);
        
        
       //weather_num_div.append(forecast[date_string]["temp"] + temp_unit  +
       //"<h4 style=\"\">" + forecast[date_string]["temp"] + temp_unit + "</h2>" + 
       //"<h4 style=\"\">" + forecast[date_string]["temp"] + temp_unit + "</h2>"

        //);
        weather_icon.attr("src", 'static/pictures/weather_icons/' + forecast[date_string]["weather"]["icon"] + ".png");

    }

    let day_main_div = $("<div></div");
    day_main_div.css({"width": "100%", "height": "87%", "background": ""});
    day_view.append(day_main_div);
    let todo_section = $("<div></div");
    todo_section.attr("id", "todo_section");
    todo_section.css({"width": "100%", "height": "50%", "float": "", "background": ""});
    todo_section.html(createTodoSection(date, month, year));
    day_main_div.append(todo_section);

    let news_section = $("<div></div");
    news_section.attr("id", "news_section");
    news_section.css({"width": "100%", "height": "50%", "float": "", "background": ""});
    news_section.html(createNewsSection(date, month, year));
    day_main_div.append(news_section);

    return day_view;

}


function createNewsSection(date, month, year) {

    let news_section = $("<div></div");
    news_section.css({"width": "100%", "height": "100%","background": background_charcoal});

    let news_search = $("<div></div>");
    news_search.css({"background": background_todo, "height": "8%", "width": "100%", "font-size": "1.5vh", "margin-top": "0.5%", "margin-bottom": "0.5%"});
    let search_button = $("<div></div>");
    search_button.css({"width": "4%", "height": "90%", "background": background_search_news, "float": "left", "text-align": "center", "font-size": "80%", "line-height": "140%", "border-radius": "", "margin": "0.25%"});
    search_button.append("<b>\u27A4</b>"); 

    addHover(search_button, {"background": background_search_news_hover}, {"background": background_search_news});

    

    news_search.append(search_button);
    let content_div = $("<input></input>");
    content_div.css({"width": "95%", "height": "100%", "background": "white", "float": "right", "border": "none"});
    news_search.append(content_div);
    news_section.append(news_search);

    let news_results = $("<div></div>");
    news_results.css({"background": "", "height": "90%", "width": "100%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%"});
    news_results.attr("id", "news_results");
    news_section.append(news_results);

    /*
    let url_results = $("<div></div>");
    url_results.css({"background": "", "height": "100%", "width": "75%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%", "float": "left"});
    url_results.attr("id", "url_results");
    news_results.append(url_results);

    */

    // populate result box with user-specified news results for this day
    // if this day is <30 days past current date, news for current date will be displayed instead

    content_div.on("keypress", function(key) {
        if ((key.which === 13) && $(this).val() != "") {
            newsAjax(content_div.val(), news_results);
        }
    })

    search_button.click(function() {
        newsAjax(content_div.val(), news_results);
    });

    // by default displays this day's news revolving around user's city of origin
    // if this day is <30 days past current date or is a future date, news for current date will be displayed instead
    let out_of_range = pastOneMonth(month, date, year) == 1 || futureDate(month, date, year) == 1;
    let news_month = (out_of_range) ? live_month : month;
    let news_date = (out_of_range) ? live_date : date;
    let news_year = (out_of_range) ? live_year : year;

    console.log("past one month:" ,pastOneMonth(month, date, year));

    //console.log(news_month, news_date, news_year);
    let news_full_date = getDateString(news_year, news_month, news_date);
    console.log(news_full_date);

    newsAjax(convertToQuery(user_city), news_results);

    return news_section;

}

function newsAjax(query, element) {

    //console.log(query);

    $.ajax({
        url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=" + query + "&pageNumber=1&pageSize=20&autoCorrect=true&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
        method: "GET",
        headers: {
            "x-rapidapi-key": "9f8d618d05mshf500f0090b3d22bp1df82bjsnf64295ed4f46",
            "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
        },
        async: true,
        success: function(result){
                element.html("");
            for (let article in result["value"]) {
                //console.log(result);
                element.append(createArticle(result["value"][article]));
            }
      }});


}

function createArticle(article) {
    let article_div = $("<div></div");
    article_div.css({"width": "100%", "margin-top": "0.5%", "margin-bottom": "0.5%", "background": background_todo});
    //console.log(article);
    let url_div = $("<div></div>");
    url_div.css({"background": "", "height": "100%", "width": "100%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%", "float": ""});
    url_div.attr("id", "url_results");

    let article_link = $("<a></a>");
    article_link.attr("href", article["url"]);
    article_link.append(article["description"]);
    url_div.append(article_link);
    article_div.append(url_div);

    let image_div = $("<div></div>");
    image_div.css({"background": "", "height": "auto", "width": "100%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%", "float": ""});
    let image = $("<img>");
    image.attr("src", article["image"]["url"]);
    image.css({"width": "100%", "height": "auto"});
    article_div.append(image);

    return article_div;
}

function createTodoSection(date, month, year) {

    let todo_section = $("<div></div");
    todo_section.css({"width": "100%", "height": "100%","background": background_charcoal});

    let add_todo = createAddTodo(date, month, year);
    todo_section.append(add_todo);

    let todo_results = $("<div></div>");
    todo_results.css({"background": "", "height": "88%", "width": "100%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%"});
    todo_results.attr("id", "todo_results");
    todo_section.append(todo_results);

    $.ajax({
        url: "/todo",
        async: true,
        type: 'POST', 
        data: {userID: user_id, year: current_year, month: current_month, date: date},
        success: function(result){
            //console.log("CALLBACK of POST TODO AJAX")
            let list = result["todos"];
            //console.log(result["todos"]);

            for (let item in list) {
                //console.log(list[item]);
                let todo = createTodoItem(list[item]["content"], list[item]["todoID"], date, month, year);
                todo_results.append(todo);
            }

        }
            
    });

    return todo_section;
}


function createAddTodo(date, month, year) {

    let todo = $("<div></div>");
    todo.css({"background": background_todo, "height": "8%", "width": "100%", "font-size": "1.5vh", "margin-top": "0.5%", "margin-bottom": "0.5%"});
    let add_button = $("<div></div>");
    add_button.css({"width": "4%", "height": "90%", "background": background_add_todo, "float": "left", "text-align": "center", "font-size": "65%", "line-height": "170%", "border-radius": "", "margin": "0.25%"});
    add_button.append("<b>\u2795</b>"); 
    addHover(add_button, {"background": background_add_todo_hover}, {"background": background_add_todo});
    todo.append(add_button);
    let content_div = $("<input></input>");
    content_div.css({"width": "95%", "height": "100%", "background": "white", "float": "right", "border": "none"});
    todo.append(content_div);


    content_div.on("keypress", function(key) {
        if ((key.which === 13) && $(this).val() != "") {
            $.ajax({
                url: "/todo/insert",
                async: true,
                type: 'POST', 
                data: {userID: user_id, content: content_div.val(), month: month, date: date, year: year},
                success: function(result){
                    console.log("CALLBACK of POST INSERT TODO AJAX")
                    console.log(result);
    
                    $("#todo_section").html(createTodoSection(date, month, year));
                    let updated_calendar = createCalendar(current_month, current_year);
                    $("#calendar_div").html(updated_calendar);
                }
                    
            });
        }
    })

    add_button.click(function() {

        console.log(content_div.val());

        $.ajax({
            url: "/todo/insert",
            async: true,
            type: 'POST', 
            data: {userID: user_id, content: content_div.val(), month: month, date: date, year: year},
            success: function(result){
                console.log("CALLBACK of POST INSERT TODO AJAX")
                console.log(result);

                $("#todo_section").html(createTodoSection(date, month, year));
                let updated_calendar = createCalendar(current_month, current_year);
                $("#calendar_div").html(updated_calendar);
            }
                
        });



    });
    

    return todo;



}

function createTodoItem(content, todo_id, date, month, year) {

    let todo = $("<div></div>");
    todo.css({"background": background_todo, "height": "10%", "width": "100%", "font-size": "1.5vh", "margin-top": "0.5%", "margin-bottom": "0.5%"});
    let delete_button = $("<div></div>");
    delete_button.css({"width": "4%", "height": "90%", "background": background_delete_todo, "float": "left", "text-align": "center", "font-size": "100%", "line-height": "", "border-radius": "", "margin": "0.25%"});
    delete_button.append("<b>\u2717</b>");

    addHover(delete_button, {"background": background_delete_todo_hover}, {"background": background_delete_todo});
    

    let update_button = $("<div></div>");
    update_button.css({"width": "4%", "height": "90%", "background": background_update_todo, "float": "left", "text-align": "center", "font-size": "100%", "line-height": "", "border-radius": "", "margin": "0.25%"});
    update_button.append("<b>\u2713</1>");

    addHover(update_button, {"background": background_update_todo_hover}, {"background": background_update_todo});

    todo.append(delete_button); 
    todo.append(update_button);
    let content_div = $("<input></input>");
    content_div.css({"width": "90%", "height": "100%", "background": "white", "float": "right", "border": "none"});
    //let actual_content = $("<textarea></textarea");
    //actual_content.css({"width": "auto%", "height": "100%", "background": "white", "float": "right", "border": "none"});
    content_div.attr("value", content);
    todo.append(content_div);


    delete_button.click(function() {

        console.log(todo_id);

        $.ajax({
            url: "/todo/delete",
            async: true,
            type: 'POST', 
            data: {todoID: todo_id},
            success: function(result){
                console.log("CALLBACK of POST DELETE TODO AJAX")
                console.log(result);

                $("#todo_section").html(createTodoSection(date, month, year));
                let updated_calendar = createCalendar(current_month, current_year);
                $("#calendar_div").html(updated_calendar);
            }
                
        });



    });


    content_div.on("keypress", function(key) {
        if ((key.which === 13) && $(this).val() != "") {
            $.ajax({
                url: "/todo/update",
                async: true,
                type: 'POST', 
                data: {content: content_div.val(), todoID: todo_id},
                success: function(result){
                    console.log("CALLBACK of POST UPDATE TODO AJAX")
                    console.log(result);
                    $("#todo_section").html(createTodoSection(date, month, year));
                    let updated_calendar = createCalendar(current_month, current_year);
                    $("#calendar_div").html(updated_calendar);
                }
                    
            });    
        }
    })


    update_button.click(function() {

        console.log(content_div.val());

        $.ajax({
            url: "/todo/update",
            async: true,
            type: 'POST', 
            data: {content: content_div.val(), todoID: todo_id},
            success: function(result){
                console.log("CALLBACK of POST UPDATE TODO AJAX")
                console.log(result);
                $("#todo_section").html(createTodoSection(date, month, year));
                let updated_calendar = createCalendar(current_month, current_year);
                $("#calendar_div").html(updated_calendar);
            }
                
        });


    });

    return todo;
}

function pastOneMonth(month, date, year) {

    let last_month = (live_month == 1) ? 12 : (live_month - 1);

    console.log(live_month, last_month, month);

    if (year < live_year - 1) {
        return 1;
    }

    else if (year == live_year - 1) {
        if (live_month == 1) {
            if (month < last_month) {
                return 1;
            }
            else if (month == last_month) {
                if (date < live_date) {
                    return 1;
                }
            }
        }

        else {
            return 1;
        }

    }

    else if (year == live_year && month != 1) {
        if (month < last_month) {
            //console.log(month, last_month);
            return 1;
        }
        else if (month == last_month) {
            if (date < live_date) {
                return 1;
            }
        }
    }

    return 0;
} 


function futureDate(month, date, year) {

    if (year > live_year) {
        return 1;
    }

    else if (year == live_year) {
        if (month > live_month) {
            return 1;
        }
        else if (month == live_month) {
            // *** possibly to be safe account for time zone differences
            if (date > live_date) {
                return 1;
            }
        }
    }

    return 0;
}
