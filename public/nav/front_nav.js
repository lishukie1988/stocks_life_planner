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
    
    let calendar_button = createDiv("16.66%", "100%", "left", "calendar");
    calendar_button.css({"font-size": "65%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    calendar_button.html("<b>CALENDAR PLANNER</b>");
    addHover(calendar_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(calendar_button);

    let stock_lookup_button = createDiv("16.66%", "100%", "left", "stock_lookup");
    stock_lookup_button.css({"font-size": "65%", "width": "15%",
                    "height": "100%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    stock_lookup_button.html("<b>STOCK LOOKUP</b>");
    addHover(stock_lookup_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(stock_lookup_button);
    

    let portfolio_button = createDiv("16.66%", "100%", "left", "portfolio");
    portfolio_button.css({"font-size": "65%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    portfolio_button.html("<b>STOCKS PORTFOLIO</b>");
    addHover(portfolio_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(portfolio_button);

    let net_worth_button = createDiv("16.66%", "100%", "left", "net_worth");
    net_worth_button.css({"font-size": "65%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    net_worth_button.html("<b>NET WORTH</b>");
    addHover(net_worth_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(net_worth_button);

    let messages_button = createDiv("16.66%", "100%", "left", "messages");
    messages_button.css({ "font-size": "65%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    messages_button.html("<b>MESSAGES</b>");
    addHover(messages_button, {"background": background_teal_clear}, {"background": background_day_clear});
    nav_div.append(messages_button);

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
            }
                
        });



    });


    stock_lookup_button.click(function() {

        window.location.href="/stock_lookup"
        //console.log(content_div.val());

    });

    calendar_button.click(function() {

        window.location.href="/calendar"
        //console.log(content_div.val());

    });

    portfolio_button.click(function() {

        window.location.href="/stocks_portfolio"
        //console.log(content_div.val());

    });

    net_worth_button.click(function() {

        window.location.href="/net_worth"
        //console.log(content_div.val());

    });

    return nav_div;
}


// TODO: prompt user to confirm logout
function createLogoutPrompt() {

    let nav_div = $("<div></div");
    nav_div.css({"width": "80%", "height": "80%", "float": "", "background": background_charcoal});

}