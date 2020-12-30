function createNav() {

    let nav_div = $("<div></div");
    nav_div.css({"width": "100%", "height": "100%", "float": "", "background": background_charcoal});

    let logout_button = $("<div></div");
    logout_button.css({"float": "right", "font-size": "65%", "width": "15%",
                    "height": "100%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    let cross_sym = "<b>LOGOUT</b>";
    logout_button.html(cross_sym);
    addHover(logout_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(logout_button);
    
    let stock_lookup_button = createDiv("15%", "100%", "right", "stock_lookup");
    stock_lookup_button.css({"float": "right", "font-size": "65%", "width": "15%",
                    "height": "100%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    stock_lookup_button.html("<b>STOCK LOOKUP</b>");
    addHover(stock_lookup_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(stock_lookup_button);
    
    

    logout_button.click(function() {

        //console.log(content_div.val());

        $.ajax({
            url: "/logout",
            async: true,
            type: 'POST', 
            //data: {userID: user_id, content: content_div.val(), month: month, date: date, year: year},
            success: function(result){
                console.log("CALLBACK of POST LOGOUT AJAX")
                if (result == "logout_success") {
                    // should redirect to login page
                    window.location.href="/login?status=-3"
                }
                //console.log(result);
                // should be redirected to login since req.session wouldn't contain userid after sesion delete
                //window.location.href="/calendar";

                /*
                $("#todo_section").html(createTodoSection(date, month, year));
                let updated_calendar = createCalendar(current_month, current_year);
                $("#calendar_div").html(updated_calendar);
                */
            }
                
        });



    });

    return nav_div;
}


// TODO: prompt user to confirm logout
function createLogoutPrompt() {

    let nav_div = $("<div></div");
    nav_div.css({"width": "80%", "height": "80%", "float": "", "background": background_charcoal});

}