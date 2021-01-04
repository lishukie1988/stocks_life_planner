function createNav(button_id) {

    let nav_div = $("<div></div");
    nav_div.css({"width": "100%", "height": "100%", "float": "", "background": background_charcoal, "margin": "0%"});

    let logout_button = $("<div></div");
    logout_button.css({"float": "right", "font-size": "", "width": "15%",
                    "height": "100%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    logout_button.attr({"class": "nav_button", "id": "logout_button"});
    let cross_sym = "<b>LOGOUT</b>";
    logout_button.html(cross_sym);
    addHover(logout_button, {"background": background_teal}, {"background": background_day_clear});
    nav_div.append(logout_button);
    
    let calendar_button = createDiv("17.5%", "100%", "left", "calendar");
    calendar_button.css({"font-size": "", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });

    if (calendar_button.attr("id") == button_id) {
        calendar_button.css("background", background_teal);
    }
    calendar_button.attr("class", "nav_button");
    calendar_button.html("<b>CALENDAR PLANNER</b>");
    addHover(calendar_button, {"background": background_teal}, {"background": calendar_button.css("background")});
    nav_div.append(calendar_button);

    let stock_lookup_button = createDiv("17.5%", "100%", "left", "stock_lookup");
    stock_lookup_button.css({"font-size": "", "width": "15%",
                    "height": "100%", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    if (stock_lookup_button.attr("id") == button_id) {
        stock_lookup_button.css("background", background_teal);
    }
    stock_lookup_button.attr("class", "nav_button");
    stock_lookup_button.html("<b>STOCK MARKET</b>");
    addHover(stock_lookup_button, {"background": background_teal}, {"background": stock_lookup_button.css("background")});
    nav_div.append(stock_lookup_button);
    

    let portfolio_button = createDiv("17.5%", "100%", "left", "portfolio");
    portfolio_button.css({"font-size": "", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    if (portfolio_button.attr("id") == button_id) {
        portfolio_button.css("background", background_teal);
    }
    portfolio_button.attr("class", "nav_button");
    portfolio_button.html("<b>STOCKS PORTFOLIO</b>");
    addHover(portfolio_button, {"background": background_teal}, {"background": portfolio_button.css("background")});
    nav_div.append(portfolio_button);

    let net_worth_button = createDiv("17.5%", "100%", "left", "net_worth");
    net_worth_button.css({"font-size": "", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    if (net_worth_button.attr("id") == button_id) {
        net_worth_button.css("background", background_teal);
    }
    net_worth_button.attr("class", "nav_button");
    net_worth_button.html("<b>NET WORTH</b>");
    addHover(net_worth_button, {"background": background_teal}, {"background": net_worth_button.css("background")});
    nav_div.append(net_worth_button);

    let messages_button = createDiv("17.5%", "100%", "left", "messages");
    messages_button.css({ "font-size": "", "background": background_day_clear,
                    "text-align": "center", "line-height": "140%"
                    });
    
    messages_button.attr("class", "nav_button");
    messages_button.html("<b>MESSAGES</b>");
    addHover(messages_button, {"background": background_teal}, {"background": background_day_clear});
    //nav_div.append(messages_button);

    let user_balance = $(".main_container").data("balance").toFixed(2);
    let balance = createDiv("17.5%", "100%", "left", "balance");
    balance.css({ "font-size": "", "background": background_dark_yellow,
                    "text-align": "center", "line-height": "140%", "font-weight": "bold"
                    });

    balance.attr("class", "nav_button");
    balance.html("BAL: " + user_balance);
    
    nav_div.append(balance);


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