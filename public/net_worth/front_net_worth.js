function createMenuBar() {
    let menu_bar = createDiv("100%", "100%", "", "");
    let net_worth_button = createDiv("50%", "100%", "left", "");
    net_worth_button.css({"text-align": "center", "background": background_teal_clear, "margin-bottom": "0%" });
    net_worth_button.append("<b>NET WORTH</b>");
    let growth_rate_button = createDiv("50%", "100%", "right", "");
    growth_rate_button.css({"text-align": "center", "background": background_teal_clear, "margin-bottom": "0%" });
    growth_rate_button.append("<b>GROWTH RATE</b>");
    menu_bar.append(net_worth_button);
    menu_bar.append(growth_rate_button);


    net_worth_button.click(function() {
        $("#growth_rate_div").hide();
        $("#net_worth_div").show();
        
        //$("#net_worth_div").css({"height": "95%", "width": "100%"});
        //$("#growth_rate_div").css({"height": "0%", "width": "0%"});

    })
    growth_rate_button.click(function() {
        $("#net_worth_div").hide();
        $("#growth_rate_div").show();

    })
    return menu_bar; 

}


function createGraph(canvas_id, x, y_1, y_2, label_1, label_2, title) {

    var ctx = document.getElementById(canvas_id).getContext('2d');
    //ctx.css({"height": "100%"});

    var graph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: x,
            datasets: [{
              label: label_1,
              data: y_1,
              lineTension: 0,
              backgroundColor: background_update_todo
            }, {
              label: label_2,
              data: y_2,
              lineTension: 0,
              backgroundColor: background_day_clear
            }]
          },
        options: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: title,
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'lll',
              }
            }]
          }
        }
    });
    
}

function createTimeGraph(canvas_id, x, y_1, y_2, label1, label2) {

    var ctx = document.getElementById(canvas_id).getContext('2d');

    var graph = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["2000-12-12", "2000-12-13", "2000-12-14", "2001-01-15", "2001-02-15", "2001-03-15", "2001-04-15"],
            datasets: [{
              label: 'Actual',
              data: [120, 30, 40, 80],
              lineTension: 0,
              backgroundColor: background_update_todo
            }, {
              label: 'with 3 month forecast',
              data: [120, 30, 40, 80, 130, 140, 150],
              lineTension: 0,
              backgroundColor: background_day_clear
            }]
          },
        options: {
          legend: {
            display: true
          },
          title: {
            display: true,
            text: "Correct Usage of Time Scale (Passing Labels as Integers/Dates/Moments)",
          },
          scales: {
            xAxes: [{
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'lll',
              }
            }]
          }
        }
    });
    
}




function clearGraphDiv(canvas_id) {
    var fetched_canvas = document.getElementById(canvas_id);
    fetched_canvas.width = 0;
    fetched_canvas.height = 0;

}


function createSortBar() {
    let color = background_search_news;
    let sort_bar = createDiv("100%", "100%", "", "");
    sort_bar.css({"background": background_todo});
    let shares_owned = createStockColumnDiv("SHARES OWNED", color);
    let symbol = createStockColumnDiv("SYMBOL", color);
    let long_name = createStockColumnDiv("NAME", color);
    let current_price = createStockColumnDiv("PRICE", color);
    //current_price.append(stock_object["currentPrice"]);
    let high_price = createStockColumnDiv("DAY HIGH", color);
    //high_price.append(stock_object["highPrice"]);
    let low_price = createStockColumnDiv("DAY LOW", color);
    //low_price.append(stock_object["lowPrice"]);
    let price_change = createStockColumnDiv("DAY CHANGE", color);
    //price_change.append(stock_object["priceChange"]);

    sort_bar.append(shares_owned);
    sort_bar.append(symbol);
    sort_bar.append(long_name);
    sort_bar.append(current_price);
    sort_bar.append(high_price);
    sort_bar.append(low_price);
    sort_bar.append(price_change);

    return sort_bar;
}

function createStocksList() {
    let stocks_list = createDiv("100%", "100%", "", "");
    stocks_list.css({"background": background_day});
    //console.log("@ createStocksList");



    $.ajax({
        url: "/stocks_portfolio/stocks_list",
        async: true,
        type: 'POST', 
        data: {userID: user_id},
        success: function(result){
            console.log("CALLBACK of POST STOCKS_PORTFOLIO AJAX")
            console.log(result);
            for (let index in result) {
                stocks_list.append(createOwnedStocks(result[index]));
            }
            /*

            let list = result["todos"];
            //console.log(result["todos"]);

            for (let item in list) {
                //console.log(list[item]["content"]);
                let todo = $("<div></div>");
                todo.css({"background": background_todo, "height": "19%", "width": "100%", "font-size": "10%", "margin-bottom": "2%"});
                todo.append(list[item]["content"]);
                day_x.append(todo);
            }

            */

        }
            
    });


    return stocks_list;
}


function createOwnedStocks(stock_object) {

    let color = (stock_object["priceChange"] >= 0) ? background_update_todo : background_delete_todo;

    let owned_stock = createDiv("100%", "15%", "", "");
    owned_stock.css({"background": background_todo});
    let shares_owned = createStockColumnDiv(stock_object["sharesOwned"], color);
    let symbol = createStockColumnDiv(stock_object["symbol"], color);
    let long_name = createStockColumnDiv(stock_object["longName"], color);
    let current_price = createStockColumnDiv(stock_object["currentPrice"], color);
    //current_price.append(stock_object["currentPrice"]);
    let high_price = createStockColumnDiv(stock_object["highPrice"], color);
    //high_price.append(stock_object["highPrice"]);
    let low_price = createStockColumnDiv(stock_object["lowPrice"], color);
    //low_price.append(stock_object["lowPrice"]);
    let price_change = createStockColumnDiv(stock_object["priceChange"], color);
    //price_change.append(stock_object["priceChange"]);

    owned_stock.append(shares_owned);
    owned_stock.append(symbol);
    owned_stock.append(long_name);
    owned_stock.append(current_price);
    owned_stock.append(high_price);
    owned_stock.append(low_price);
    owned_stock.append(price_change);

    return owned_stock;
}


function createStockColumnDiv(content, color) {
    let column_div = createDiv("13.285%", "100%", "left", "");
    column_div.append(content);
    column_div.css({"margin-left": "0.5%", "margin-right": "0.5%", "background": color,
                    "text-align": "center", "font-style": "bold"
                    });
    return column_div;
}



// ==================================================================

function createSearchBar() {
    let search_div = createDiv("100%", search_bar_height, "", "search_div");
    search_div.css({"background": background_day, "margin": "0%"});
    let search_caption = createDiv("100%", "48%", "", "");
    search_caption.append("Please enter the symbol of the stock you are looking for.");
    search_div.append(search_caption);
    let stock_search = $("<div></div>");
    stock_search.css({"background": background_todo, "height": "50%", "width": "100%", "font-size": "1.5vh", "margin-top": "0.5%", "margin-bottom": "0.5%"});
    let search_button = $("<div></div>");
    search_button.css({"width": "9%", "height": "100%", "background": background_search_news, "float": "left", "text-align": "center", "font-size": "80%", "line-height": "140%", "border-radius": "", "margin": "0.25%"});
    search_button.append("<b>\u27A4</b>"); 

    addHover(search_button, {"background": background_search_news_hover}, {"background": background_search_news});

    
    let content_div = $("<input></input>");
    content_div.css({"width": "90%", "height": "100%", "background": "white", "float": "right", "border": "none"});
    stock_search.append(content_div);
    search_div.append(stock_search)
    stock_search.append(search_button);


    content_div.autocomplete({
        source: function(request, response) {
            
            
            $.ajax({
                //url: "https://api.teleport.org/api/cities/?search=" + request.term,
                //url: "https://api.teleport.org/api/cities/?search=" + request.term,
                "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete?q=" + content_div.val() + "&region=US",
	            "method": "GET",
                "headers": {
                    "x-rapidapi-key": "9f8d618d05mshf500f0090b3d22bp1df82bjsnf64295ed4f46",
                    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
                },
                success: function( data ) {
                    //console.log(data);
                    console.log(data["quotes"][0]["symbol"]);
                    let auto_result = [data["quotes"][0]["symbol"]];
                    //let auto_array = data["quotes"].map(x => x["exchange"]);
                    //console.log(auto_array);
                    response(auto_result);
                }
            });            
        }
    });

    search_button.click(function() {
        console.log("clicked");
        stockAjax(content_div.val(), $("#stock_data"));
    });

    return search_div;

}

function stockAjax(query, element) {

    //console.log(query);

    $.ajax({
        "async": true,
	    "crossDomain": true,
	    "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary?symbol=" + query + "&region=US",
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-key": "9f8d618d05mshf500f0090b3d22bp1df82bjsnf64295ed4f46",
		    "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
	    },
        async: true,
        success: function(result){
                console.log(element.attr("id"));
                console.log(result);
                console.log(result["symbol"]);
                element.html("");
                element.append(createStockData(result));
                //element.append(createArticle(result["value"][article]));
                //$("#stock_details_div").append(result);
                /*
                for (let article in result["value"]) {
                //console.log(result);
                element.append(createArticle(result["value"][article]));
                */
        }
      });


      $.ajax({
            "async": true,
            "crossDomain": true,
            "url": "https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/get-news?category=" + query + "&region=US",
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "9f8d618d05mshf500f0090b3d22bp1df82bjsnf64295ed4f46",
                "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com" 
            },
            async: true,
            success: function(result){
                    console.log("stock news results");
                    console.log(result);
                    $("#stock_news").html("");
                    $("#stock_news").append(createStockNews(result));
                    //element.append(createArticle(result["value"][article]));
                    //$("#stock_details_div").append(result);
                    /*
                    for (let article in result["value"]) {
                    //console.log(result);
                    element.append(createArticle(result["value"][article]));
                    */
        }
      });


}

function createArticle(article) {
    console.log("@ createArticle");
    if (article["main_image"] != null) {
        console.log(article["main_image"]["original_url"]);
    }
    let article_div = $("<div></div");
    article_div.css({"width": "100%", "margin-top": "0.5%", "margin-bottom": "0.5%", "background": background_todo});
    //console.log(article);
    let url_div = $("<div></div>");
    url_div.css({"background": "", "height": "100%", "width": "100%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%", "float": ""});
    url_div.attr("id", "url_results");

    let article_link = $("<a></a>");
    article_link.attr("href", article["link"]);
    article_link.append(article["summary"]);
    url_div.append(article_link);
    article_div.append(url_div);

    let image_div = $("<div></div>");
    image_div.css({"background": "", "height": "auto", "width": "100%", "font-size": "1.5vh", "margin-top": "1%", "margin-bottom": "0.5%", "float": ""});
    let image = $("<img>");
    if (article["main_image"] != null) {
        image.attr("src", article["main_image"]["original_url"]);
        //console.log(article["main_image"]["original_url"]);
    }
    //image.attr("src", article["main_image"]["original_url"]);
    image.css({"width": "100%", "height": "auto"});
    article_div.append(image);

    return article_div;
}

// stock_details_div is rendered on page load & empty by default
// stock_data is rendered on page load & empty by default
// stock_news is rendered on page load & empty by default
function createStockDetails() {
    let stock_details_div = createDiv("100%", stock_details_height, "", "stock_details_div");
    stock_details_div.css({"background": background_day, "margin": "0%"});
    let stock_data_div = createDiv("100%", "50%", "", "stock_data");
    let stock_news_div = createDiv("100%", "50%", "", "stock_news");
    stock_details_div.append(stock_data_div);
    stock_details_div.append(stock_news_div);

    return stock_details_div;

}

function createStockNews(data_object) {
    let stock_news_div = createDiv("100%", "100%", "");
    //stock_news_div.append("stock news div");
    console.log("@ createStockNews");
    //console.log(data_object["items"]);
    for (article in data_object["items"]["result"]) {
        stock_news_div.append(createArticle(data_object["items"]["result"][article]));
    }
    return stock_news_div;

}

function createStockData(data_object) {

    let stock_symbol = data_object["symbol"];
    let stock_price = data_object["price"]["regularMarketPrice"]["raw"];
    let stock_high = data_object["price"]["regularMarketDayHigh"]["raw"];
    let stock_low = data_object["price"]["regularMarketDayLow"]["raw"];
    let stock_summary = data_object["summaryProfile"]["longBusinessSummary"];
    let stock_change = data_object["price"]["regularMarketChangePercent"]["raw"].toFixed(2);
    let stock_name = data_object["price"]["longName"];

    let stock_data = createDiv("100%", "100%", "");
    let symbol_price_div = createDiv("33%", "100%", "left", "symbol_price_div");
    symbol_price_div.css({"text-align": "left", "background": background_todo, "font-size": "100%"});
    let summary_data_div = createDiv("67%", "100%", "right", "summary_data_div");
    symbol_price_div.css({"text-align": "center", "background": background_search_news, "font-size": "500%"});
    summary_data_div.css({"text-align": "left", "background": background_charcoal, "font-size": "100%"});
    //console.log("in createStoc")

    let symbol_div = createDiv("100%", "50%", "", "symbol_div");
    symbol_div.css({"font-size": "70%"});
    symbol_div.append(data_object["symbol"]); 
    symbol_price_div.append(symbol_div);
    let price_div = createDiv("100%", "25%", "", "price_div");
    price_div.css({"font-size": "35%"});
    symbol_price_div.append(price_div);
    //console.log(data_object["price"]["regularMarketPrice"]);
    //price_div.append("CURRENT PRICE:");
    price_div.append(data_object["price"]["regularMarketPrice"]["raw"]);
    let buy_source_div = createDiv("100%", "25%", "", "buy_source_div");
    buy_source_div.css({"font-size": "35%", "background": background_update_todo});
    buy_source_div.append("BUY FROM SOURCE");
    symbol_price_div.append(buy_source_div);


    let summary_div = createDiv("100%", "50%", "", "summary_div");
    summary_div.css({"text-align": "left", "background": background_todo, "font-size": "100%"});
    summary_div.append(data_object["summaryProfile"]["longBusinessSummary"]);
    summary_data_div.append(summary_div);
    stock_data.append(symbol_price_div);
    stock_data.append(summary_data_div);

    let data_div = createDiv("100%", "50%", "", "summary_div");
    data_div.css({"text-align": "left", "background": background_todo, "font-size": "100%"});
    let day_high = createDiv("30%", "100%", "left", "day_high");
    day_high.css({"font-size": "120%", "font-style": "bold", "margin": "auto", "text-align": "center"});
    let day_low = createDiv("30%", "100%", "left", "day_low");
    day_low.css({"font-size": "120%", "font-style": "bold", "margin": "auto", "text-align": "center"});
    let day_change = createDiv("30%", "100%", "left", "day_change");
    day_change.css({"font-size": "120%", "font-style": "bold", "margin": "auto", "text-align": "center"});
    day_high.append("DAY HIGH: ");
    day_low.append("DAY LOW: ");
    day_change.append("DAY CHANGE: ");
    day_high.append(data_object["price"]["regularMarketDayHigh"]["raw"]);
    day_low.append(data_object["price"]["regularMarketDayLow"]["raw"]);
    day_change.append(stock_change + "%");
    data_div.append(day_high);
    data_div.append(day_low);
    data_div.append(day_change);
    summary_data_div.append(data_div);
    // potential info:
    // - industry
    // - earnings q1-q4


    buy_source_div.click(function() {

        closeAnimate("#stock_details_div");
        closeAnimate("#search_div");
        console.log("clicked");
        //console.log(stock_symbol);
        $("#buy_div").html(createBuyWindow({"stock_symbol": stock_symbol, 
                                            "stock_name": stock_name, 
                                            "stock_summary": stock_summary, 
                                            "stock_price": stock_price, 
                                            "stock_high": stock_high, 
                                            "stock_low": stock_low, 
                                            "stock_change": stock_change}));

    });

    return stock_data;

}


function createBuyWindow(stock_stats) {
 
    console.log(stock_stats);
    //let buy_div = createDiv("100%", "25%", "left", "buy_div");
    let buy_window = createDiv("100%", "100%", "", "buy_window");
    buy_window.css({"background": background_day});
    /*
    buy_window.data({"stock_symbol": stock_stats.stock_symbol,
                        "stock_name": stock_stats.stock_name,
                        "stock_summary": stock_stats.stock_summary,
                        "stock_price": stock_stats.stock_price,
                        "stock_high": stock_stats.stock_high,
                        "stock_low": stock_stats.stock_low,
                        "stock_change": stock_stats.stock_change
    })
    */
    
    let form_div = createFormDiv();
    form_div.css({"height": "35%", "font-size": "100%"});

    let prompt = createDiv("100%", "25%", "left", "");
    prompt.css({"text-align": "center"});
    prompt.append("Please enter the number of shares you would like to buy:");

    //let input_div = createDiv("75%", "100%", "left", "");
    let input_quantity = createInputDiv();
    input_quantity.attr({type: "number", id: "buy_quantity", name: "buy_quantity", placeholder: "number of shares", required : "true"});
    input_quantity.css({"height": "95%", "width": "50%", "font-size": "100%", "float": "left", "position": "relative"});
    //input_div.append(input_quantity);
    //form_div.append(input_div);
    form_div.append(input_quantity);


    let exit_div = createButtonsDiv();
    exit_div.css({"width": "100%"});
    let exit_button = createButton("\u00D7", "right");
    exit_button.css({"width": "auto", "font-size": "25%"});
    exit_div.append(exit_button);

    let button_div = createDiv("50%", "25%", "", "");
    button_div.css({"margin-left": "25%"});
    let buy_button = createButton("MAKE PURCHASE", "left" );
    buy_button.css({"width": "100%", "text-align": "center"});
    button_div.append(buy_button);

    buy_window.append(exit_div);
    buy_window.append(prompt);
    buy_window.append(form_div);
    buy_window.append(button_div);

    buy_button.click(function() {

        var data = {quantity: input_quantity.val(), userID: user_id, symbol: stock_stats.stock_symbol, longName: stock_stats.stock_name,
            summary: stock_stats.stock_summary, currentPrice: stock_stats.stock_price, 
            highPrice: stock_stats.stock_low, lowPrice: stock_stats.stock_low, priceChange: stock_stats.stock_change
            };

        $.ajax({
            url: "/stock_lookup/buy",
            async: true,
            type: 'POST', 
            data: data,
            success: function(result){
                console.log("CALLBACK of POST LOGIN AJAX")
                console.log(result);
                if (result === "not_enough_balance") {
                    // hide buy_div & show not enough balance div / server problem
                    //window.location.href="login?status=-1";

                }

                else if (result === "purchase_success") {
                    // relocate to portfolio_page
                    //window.location.href="/calendar";
                }
                else { // mysql error
                    // hide buy_div & show not enough balance div / server problem
                    //window.location.href="login?status=-1";
                }
            }
                
        });
    })

    return buy_window;

}





// ==================================================================

let months_string_long = {1: "January", 2: "February", 3: "March", 4: "April",
    5: "May", 6: "June", 7: "July", 8: "August",
    9: "September", 10: "October", 11: "November", 12: "December"
}

function createScroll(float) {

    let scroll_button = $("<div></div");
    scroll_button.css({"width": "25%", "height": "100%", "background": background_teal_clear, "float": float,
                        "text-align": "center", "line-height": "100%"
                    })
    //scroll_button.attr("id", "scroll_div");
    let arrow = (float == "right") ? '\u27F9' : '\u27F8';
    scroll_button.append(arrow);

    let increment = (float == "left") ? -1 : 1;

    addHover(scroll_button, {"background": background_teal}, {"background": scroll_button.css("background")});

    scroll_button.click(function() {

        console.log("scroll clicked");
        console.log(current_month, increment);
        if (current_month == 1 && float == "left") {
            current_year = parseInt(current_year) - 1;
            $("#year_div").text(current_year);
            $("#year_div").data("year", current_year);
        }
        if (current_month == 12 && float == "right") {
            console.log("before addition: ", current_year);
            current_year = parseInt(current_year) + 1;
            console.log("line 25 current year: ", current_year);
            $("#year_div").text(current_year);
            $("#year_div").data("year", current_year);
        }

        current_month = (current_month + increment) % 12;
        current_month = (current_month == 0) ? 12 : current_month;
        

        //console.log("current month after: ", current_month);

        $("#calendar_div").animate(
            {width: "0%", height: "0%"},
            100
        )

        $("#calendar_div").html("");

        
        $("#month_year_div").animate(
            {width: "0%", height: "0%"},
            100
        )
        $("#month_div").text(months_string_long[current_month]);
        $("#month_div").data("month", current_month);

        $("#calendar_div").html(createCalendar(current_month, current_year));

        $("#calendar_div").animate(
            {width: `${calendar_width}` + "%", height: `${calendar_height}` + "%"},
            100
        )
        $("#month_year_div").animate(
            {width: `${month_year_width}` + "%", height: `${month_year_height}` + "%"},
            100
        )


    })

    return scroll_button;
}


function convertToQuery(input_string) {
    console.log(input_string);
    let split_array = input_string.split(" ");
    console.log(split_array);
    let output = "";
    for (let x = 0; x < split_array.length; x++) {
        output += split_array[x];
        if (x < split_array.length - 1) {
            output += "%20";
        } 
    }

    console.log(output);
    return output;

}


function createTopRightButtonDiv(unicode) {

    let exit_div = $("<div></div");
    exit_div.css({"width": "100%", "height": "3%", "float": "right"});

    let button_div = $("<div></div");
    button_div.css({"float": "right", "font-size": "100%", "width": "5%",
                    "height": "100%", "background": "rgba(109,189,181,0.95)",
                    "text-align": "center", "line-height": "100%"
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
                {width: `${calendar_width}` + "%", height: `${calendar_height}` + "%"},
                100
            )
            $("#month_year_div").animate(
                {width: `${month_year_width}` + "%", height: `${month_year_height}` + "%"},
                100
            )
            $("#day_div").animate(
                {width: "0%", height: "0%"},
                100
            )

    })

    return exit_div;

}


function createYears(year) {
    let years_div = $("<div></div>");
    years_div.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "0%", "height": "0%",
                    "margin-right": "auto" 
                });
    years_div.attr("id", "years_div");
    let input_year = $("<input/>").attr({type: "number", id: "year_input", name: "year_input", value: `${year}`, required : "true"});
    input_year.css({"background": "rgba(109,189,181,0.5)", "border": "0%",
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
                {width: calendar_width + "%", height: calendar_height + "%"},
                100
            )
            $("#years_div").animate(
                {width: "0%", height: "0%"},
                100
            )
            $("#month_year_div").animate(
                {width: month_year_width + "%", height: month_year_height + "%"},
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
    months_div.css({"font-size": "50px", "background": "rgba(109,189,181,0.5)", "width": "0%", "height": "0%",
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

    let div = $("<div></div>");
    div.css({"font-size": "25px", "background": "rgba(109,189,181,0.4)", "width": "25%", "height": "33%",
                    "float": "left", "margin": "auto", "text-align": "center"
                });
    

    div.data("month", month);
    //console.log(div.data("month"));
    div.text(months_string[month]); 

    addHover(div, {"background": "rgba(214, 192, 133, 0.5)"}, {"background": div.css("background")});
    div.click(function() {

        current_month = $(this).data("month");
        $("#calendar_div").html(createCalendar($(this).data("month"), $("#year_div").data("year")));
        $("#month_div").data("month", $(this).data("month"));
        $("#month_div").text(months_string_long[month]);
        $("#calendar_div").animate(
            {width: calendar_width + "%", height: calendar_height + "%"},
            100
        )
        $("#months_div").animate(
            {width: "0%", height: "0%"},
            100
        )
        $("#month_year_div").animate(
            {width: month_year_width + "%", height: month_year_height + "%"},
            100
        )
    })



    
    return div;

}


function createYear(year) {

    let year_div = $("<div></div>");
    year_div.text(year);
    //year_div.attr("id", "year_div");
    year_div.css({"font-size": "250%", "background": "rgba(109,189,181,0.5)", "width": "29%",
                    "float": "right", "margin-right": "0.25%" , "height": "100%"
                });
    year_div.attr("id", "year_div");
    year_div.data("year", year);

    addHover(year_div, {"background": "rgba(214, 192, 133, 0.5)"}, {"background": year_div.css("background")});
    year_div.click(function() {
        $("#calendar_div").animate(
            {width: "0%", height: "0%"},
            100
        )
        $("#years_div").animate(
            {width: "100%", height: "200px"},
            100
        )
        $("#month_year_div").animate(
            {width: "0%", height: "0%"},
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
    month_div.css({"font-size": "250%", "background": "rgba(109,189,181,0.5)", "width": "69%",
                    "float": "left", "margin-left": "0.25%", "height": "100%"
                });

    
    addHover(month_div, {"background": "rgba(214, 192, 133, 0.5)"}, {"background": month_div.css("background")});
    month_div.click(function() {
        $("#calendar_div").animate(
            {width: "0%", height: "0%"},
            100
        )
        $("#months_div").animate(
            {width: "100%", height: "200px"},
            100
        )
        $("#month_year_div").animate(
            {width: "0%", height: "0%"},
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
    calendar.css("height", "100%"); 
    //calendar_div.css("background", "yellow");
    
    let weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let weekdays_long = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
                
                current_day = createDay(-1, 0);
                if (date_object[date_index] == day + 1) {
                    current_day.css("border-right", "groove");
                }
                //current_day.text("day" + day + "\nindex" + date_index + "\ndate" + test_date_object[date_index] + "blank");
            }
            else {
                let left = (day < 6) ? 0 : 1;
                current_day = createDay(left, date_index, weekdays_long[day]);

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
        week_x.css("height", "15.6%");
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