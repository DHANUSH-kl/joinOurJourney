
$(document).ready(function() {
    console.log("Document is ready, initializing autocomplete...");

    let locations = {};

    // Load the locations data from the JSON file
    $.getJSON('locations.json', function(data) {
        locations = data;
        console.log("Locations data loaded:", locations);
    }).fail(function() {
        console.error("Failed to load JSON file.");
    });

    // Autocomplete for States and Cities
    $("#startingLocation").autocomplete({
        source: function(request, response) {
            let results = [];
            let stateMatches = [];
            let cityMatches = [];

            // Search states and cities
            $.each(locations, function(state, cities) {
                if (state.toLowerCase().startsWith(request.term.toLowerCase())) {
                    stateMatches.push({ label: state, category: "States" });
                    $.each(cities, function(index, city) {
                        cityMatches.push({ label: city, category: state });
                    });
                } else {
                    $.each(cities, function(index, city) {
                        if (city.toLowerCase().startsWith(request.term.toLowerCase())) {
                            cityMatches.push({ label: city, category: state });
                        }
                    });
                }
            });

            // Combine state and city matches, showing states first
            results = stateMatches.concat(cityMatches);
            response(results);
        },
        minLength: 1,
        focus: function(event, ui) {
            $("#startingLocation").val(ui.item.label);
            return false;
        },
        select: function(event, ui) {
            $("#startingLocation").val(ui.item.label);
            return false;
        }
    }).autocomplete("instance")._renderItem = function(ul, item) {
        // Customize the appearance of each suggestion item
        return $("<li>")
            .append("<div><strong>" + item.label + "</strong><br><small>" + item.category + "</small></div>")
            .appendTo(ul);
    };
});