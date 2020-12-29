function createDiv(width, height, float, id) {

    let div = $("<div></div");
    div.css({"width": width, "height": height, "float": float});
    div.attr("id", id);
    return div;
}