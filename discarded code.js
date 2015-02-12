$('.use-button').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());
        var edge = parseInt($(this).parent().prev().find('.edge-value').val());

        if (value - 3 + edge > 0) {
            $(this).parent().prev().find('.current-value').val(value - 3 + edge);
        }
        else {
            alert("Hey: you can't do this to yourself!");
        }

        save_values();
        return false;
    });

    $('.use-button-two').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());
        var edge = parseInt($(this).parent().prev().find('.edge-value').val());

        if (value - 6 + edge > 0) {
            $(this).parent().prev().find('.current-value').val(value - 6 + edge);
        }
        else {
            alert("Hey: you can't do this to yourself!");
        }
        save_values();
        return false;
    });
