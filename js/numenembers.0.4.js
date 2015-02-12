function logerror(error) {
    if (window.console) {
        console.log(error);
    }
}

function init_values() {
    try {
        if (localStorage && localStorage.getItem('NumenEmberStats')) {
            var stats = JSON.parse(localStorage.getItem('NumenEmberStats'));

            $('#total-might').val(stats.MightTotal);
            $('#value-might').val(stats.MightValue);
            $('#edge-might').val(stats.MightEdge);
            $('#total-speed').val(stats.SpeedTotal);
            $('#value-speed').val(stats.SpeedValue);
            $('#edge-speed').val(stats.SpeedEdge);
            $('#total-intellect').val(stats.IntellectTotal);
            $('#value-intellect').val(stats.IntellectValue);
            $('#edge-intellect').val(stats.IntellectEdge);
            
            checkdepleting();
        }
        else {
            reset_values();
        }
    }
    catch (thrownError) {
        logerror("init_values: " + thrownError.message);
        reset_values();
    }
}

function reset_values() {
    $('#total-might').val("0");
    $('#value-might').val("0");
    $('#edge-might').val("0");
    $('#total-speed').val("0");
    $('#value-speed').val("0");
    $('#edge-speed').val("0");
    $('#total-intellect').val("0");
    $('#value-intellect').val("0");
    $('#edge-intellect').val("0");

    save_values();
}

function disablebutton(button){
    button.toggleClass('button-disabled', true);
    button.prop('disabled', true);
}

function enablebutton(button){
    button.toggleClass('button-disabled', false);
    button.prop('disabled', false);
}

function checkdepleting(){
    $.each($('.current-value'), function(index, item){
        var current = parseInt($(item).val());
        var edge = parseInt($(item).parent().find('.edge-value').val());
        var total = parseInt($(item).parent().prev().find('.total-value').val());
        
        if (current - 3 + edge <= 0){
            $(item).toggleClass('almost-depleted', true);
        } else {
            $(item).toggleClass('almost-depleted', false);
        }
        
        if (current === total){
            disablebutton($(item).parent().parent().next().find('.add-button'));
            disablebutton($(item).parent().parent().next().find('.add5-button'));
        } else {
            enablebutton($(item).parent().parent().next().find('.add-button'));
            enablebutton($(item).parent().parent().next().find('.add5-button'));
        }
        
        var $container = $(item).parent().parent().parent().parent();
        
        if (current === 0){
            disablebutton($(item).parent().parent().next().find('.sub-button'));
            disablebutton($(item).parent().parent().next().find('.sub5-button'));
            if ($container.find('.effort-panel').length <= 0){
                disablebutton($container.find('.effort-button'));
            }
        } else {
            enablebutton($(item).parent().parent().next().find('.sub-button'));
            enablebutton($(item).parent().parent().next().find('.sub5-button'));
            if ($container.find('.effort-panel').length <= 0){
                enablebutton($container.find('.effort-button'));
            }
        }
    });
}

function save_values() {
    checkdepleting();
    
    if (localStorage) {
        var stats = {
            "MightTotal": $('#total-might').val(),
            "MightValue": $('#value-might').val(),
            "MightEdge": $('#edge-might').val(),
            "SpeedTotal": $('#total-speed').val(),
            "SpeedValue": $('#value-speed').val(),
            "SpeedEdge": $('#edge-speed').val(),
            "IntellectTotal": $('#total-intellect').val(),
            "IntellectValue": $('#value-intellect').val(),
            "IntellectEdge": $('#edge-intellect').val()
        }

        localStorage.setItem("NumenEmberStats", JSON.stringify(stats));
    }
}

function init_ui() {
    $('.chars').on('change', 'input', function() {
        save_values();
    });

    $('.chars').on('focus', 'input', function() {
        $(this).select();
    });

    $('.add-button').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());
        var total = parseInt($(this).parent().prev().find('.total-value').val());

        if (value + 1 <= total) {
            $(this).parent().prev().find('.current-value').val(value + 1);
        }

        save_values();
        return false;
    });

    $('.sub-button').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());

        if (value - 1 >= 0) {
            $(this).parent().prev().find('.current-value').val(value - 1);
        }
        save_values();
        return false;
    });

    $('.add5-button').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());
        var total = parseInt($(this).parent().prev().find('.total-value').val());

        if (value + 5 <= total) {
            $(this).parent().prev().find('.current-value').val(value + 5);
        }
        else {
            if (value < total){
                $(this).parent().prev().find('.current-value').val(total);
            }
        }

        save_values();
        return false;
    });

    $('.sub5-button').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());

        if (value - 5 >= 0) {
            $(this).parent().prev().find('.current-value').val(value - 5);
        }
        else if (value > 0) {
            $(this).parent().prev().find('.current-value').val(0);
        }
        
        save_values();
        return false;
    });

    $('.reset-button').unbind('click').click(function() {
        $(this).parent().prev().find('.current-value').val($(this).parent().prev().find('.total-value').val());
        
        var $container = $(this).parent().parent().parent();
        if ($container.find('.effort-panel').length > 0){
            hideeffortpanel($container.find('.effort-panel'), $(this).parent().find('.effort-button'), function() {
                save_values();
            });
        } else {
            save_values();
        }
        
        return false;
    });

    $('.reset-all-button').unbind('click').click(function() {
        $.each($('.current-value'), function(index, item) {
            var total = $(this).parent().prev().find('.total-value').val();
            $(this).val($(this).parent().prev().find('.total-value').val());
        });
        
        if ($('.effort-panel').length > 0){
            hideeffortpanel($('.effort-panel'), $('.effort-panel').parent().find('.effort-button'));
        }
        
        save_values();
        return false;
    });

    $('.effort-button').unbind('click').click(function() {
        var $sender = $(this);
        
        if ($('.effort-panel').length > 0){
            var mustshow = ($('.effort-panel').parent().prop('id') !== $sender.parent().parent().parent().prop('id'));
            
            hideeffortpanel($('.effort-panel'), $('.effort-panel').parent().find('.effort-button'), function () {
                if (mustshow){
                    showeffortpanel($sender);
                } 
            });
        } else {
            showeffortpanel($sender);
        }

        return false;
    });
    
    $('.full-disclaimer').unbind('click').click(function() {
       if ($('.full-disclaimer-panel').is(':visible')){
           $('.full-disclaimer-panel').slideUp(400);
       } else {
           $('.full-disclaimer-panel').slideDown(400);
       }
    });
}

function hidedisclaimer(){
    $('.full-disclaimer-panel').slideDown(400);
}

function showeffortpanel(sender){
    var $box = $('<div class="effort-panel" style="display: none;">' +
                '<div class="effort-panel-values">' +
                '<input type="number" class="effort-value" value="1" />' +
                '</div>' +
                '<div class="effort-panel-buttons">' +
                '<button type="button" class="effort-ok button">Go on!</button>' +
                '<button type="button" class="effort-cancel button">Not so fast</button>' +
                '</div>' +
                '</div>').appendTo($(sender).parent().parent().parent());
    
    disablebutton($(sender));
    
    $('.effort-ok').unbind('click').click(function() {
        var selection = parseInt($box.find('.effort-value').val());
        var value = parseInt($(sender).parent().prev().find('.current-value').val());
        var edge = parseInt($(sender).parent().prev().find('.edge-value').val());
        
        if (value + edge - (selection * 3) > 0) {
            //First effort subtract 3, the other 2, and edge is subtracted from the total.
            //Value + Edge - (3+((selection-1)x2))
            $(sender).parent().prev().find('.current-value').val(value + edge - (3+((selection-1) * 2)));
            save_values();
        }
                
       hideeffortpanel($box, $(sender));
       return false; 
    });

    $('.effort-cancel').unbind('click').click(function() {
       hideeffortpanel($box, $(sender));
       return false; 
    });
    
    //$box.show("slide", { direction: "up" }, 500, function(){
    $box.slideDown(300, function(){
        $box.find('.effort-value').focus();
    });
}

function hideeffortpanel(panel, opener, callback){
    $(panel).slideUp(400, function () {
        $(this).remove().promise().done(function(){
            enablebutton($(opener));
            if (typeof callback !== 'undefined'){
                callback();
            }
        });
    });
}