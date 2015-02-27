var recoveryRolls = {
    currentAction: "1 Action",//First of the day
    bonus: 2,//Base 1st level value.
    extraRolls: 0,
    extraLeft: 0,
    makeRoll: function(){
        //This is a simple state machine
        switch (this.currentAction) {
            case "1 Action":
                if (this.extraLeft > 0){
                    this.extraLeft --;
                } else {
                    this.currentAction = "10 Minutes";
                }
                break;
            case "10 Minutes":
                this.currentAction = "1 Hour";
                break;
            case "1 Hour":
                this.currentAction = "10 Hours";
                break;
            default:
                this.currentAction = "1 Action";
                this.extraLeft = this.extraRolls;
                break;
        }
        
        return this.bonus + Math.floor((Math.random() * 6) + 1);
    },
    setExtraRolls: function(value){
        this.extraRolls = value;
        this.extraLeft = value;
        return true;
    },
    setCurrentAction: function(value){
        if (typeof(value) !== 'undefined'){
            this.currentAction = value;
        }
    },
    reset: function(newExtraRolls){
        this.currentAction = "1 Action";
        if (typeof(newExtraRolls) !== 'undefined'){
            this.extraRolls = newExtraRolls;
        }
        this.extraLeft = this.extraRolls;
        return this.currentAction;
    },
    showProgress: function(element){
        var nexttext = this.currentAction;
        if (this.currentAction === "1 Action" && this.extraRolls > 0){
            nexttext += ' - Extra: ' + this.extraLeft;
        }
        $(element).text(nexttext);
    }
};

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
            $('#value-shins').val(stats.ShinsValue);
            $('.recovery-bonus').val(stats.RecoveryBonus);
            
            recoveryRolls.bonus = stats.RecoveryBonus;
            recoveryRolls.extraRolls = stats.RecoveryExtraActions;
            recoveryRolls.extraLeft = stats.RecoveryExtraLeft;
            recoveryRolls.setCurrentAction(stats.RecoveryCurrent);
            $('.recovery-bonus').val(recoveryRolls.bonus);
            $('.extra-recovery').val(recoveryRolls.extraRolls);
            recoveryRolls.showProgress('.current-recovery');
            
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
    $('#value-shins').val("0");
    
    recoveryRolls.bonus = 2//Base 1st level value.
    recoveryRolls.reset(0);
    $('.recovery-bonus').val(recoveryRolls.bonus);
    $('.extra-recovery').val(recoveryRolls.extraRolls);
    recoveryRolls.showProgress('.current-recovery');

    save_values();
}

function save_values() {
    checkdepleting();
    
    //For others value, there is not a data layer, so there is no need to synchronize it. recoveryRolls is different, and must be kept to date.
    var extrarolls = parseInt($('.extra-recovery').val());
    if (extrarolls !== recoveryRolls.extraRolls){
        recoveryRolls.setExtraRolls(extrarolls);
    }
    
    var recoverybonus = parseInt($('.recovery-bonus').val());
    if (recoverybonus !== recoveryRolls.bonus){
        recoveryRolls.bonus = recoverybonus;
    }
    
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
            "IntellectEdge": $('#edge-intellect').val(),
            "ShinsValue": $('#value-shins').val(),
            "RecoveryBonus": recoveryRolls.bonus,
            "RecoveryExtraActions": recoveryRolls.extraRolls,
            "RecoveryExtraLeft": recoveryRolls.extraLeft,
            "RecoveryCurrent": recoveryRolls.currentAction
        }

        localStorage.setItem("NumenEmberStats", JSON.stringify(stats));
    }
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
        
        if (current < 3){
            $(item).toggleClass('almost-depleted', true);
        } else {
            $(item).toggleClass('almost-depleted', false);
        }
        
        if ($(item).prop('id') !== 'value-shins'){//Shins doesn't have a total or limit
            if (current === total){
                disablebutton($(item).parent().parent().next().find('.add-button'));
                disablebutton($(item).parent().parent().next().find('.add5-button'));
            } else {
                enablebutton($(item).parent().parent().next().find('.add-button'));
                enablebutton($(item).parent().parent().next().find('.add5-button'));
            }
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

function init_ui() {
    $('.chars').on('change', 'input', function() {
        save_values();
    });

    $('.chars').on('focus', 'input', function() {
        $(this).select();
    });
    
    $('.add-button').unbind('click').click(function() {
        var value = parseInt($(this).parent().prev().find('.current-value').val());
        
        if ($(this).parent().parent().parent().prop('id') === 'line-shins'){
            $(this).parent().prev().find('.current-value').val(value + 1);
        } else {
            var total = parseInt($(this).parent().prev().find('.total-value').val());
    
            if (value + 1 <= total) {
                $(this).parent().prev().find('.current-value').val(value + 1);
            }
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
        
        if ($(this).parent().parent().parent().prop('id') === 'line-shins'){
            $(this).parent().prev().find('.current-value').val(value + 5);
        } else {
            var total = parseInt($(this).parent().prev().find('.total-value').val());
    
            if (value + 5 <= total) {
                $(this).parent().prev().find('.current-value').val(value + 5);
            }
            else {
                if (value < total){
                    $(this).parent().prev().find('.current-value').val(total);
                }
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
            if ($(item).prop('id') !== 'value-shins') {
                var total = $(this).parent().prev().find('.total-value').val();
                $(this).val($(this).parent().prev().find('.total-value').val());
            }
        });
        
        if ($('.effort-panel').length > 0){
            hideeffortpanel($('.effort-panel'), $('.effort-panel').parent().find('.effort-button'));
        }
        
        $('.recovery-reset-button').trigger('click');
        
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
    
    $('.recovery-button').unbind('click').click(function() {
        var result = recoveryRolls.makeRoll();
        recoveryRolls.showProgress('.current-recovery');
        
        hiderecoveryresult(function(){
            showrecoveryresult(result);
        })

        save_values();
        return false;
    });
    
    $('.recovery-reset-button').unbind('click').click(function() {
        hiderecoveryresult();
        recoveryRolls.reset();
        $('.extra-recovery').val(recoveryRolls.extraRolls);
        recoveryRolls.showProgress('.current-recovery');
        
        save_values();
        return false;
    });
    
    $('.full-disclaimer').unbind('click').click(function() {
       if ($('.full-disclaimer-panel').is(':visible')){
           $('.full-disclaimer-panel').slideUp(400);
       } else {
           $('.full-disclaimer-panel').slideDown(400);
       }
    });
    
    $('.help-container>a').click(function(){
        showinfopanels();
    });
}

function showinfopanels(){
    $.each($('.info-panel'), function(index, item){
        $(item).slideDown(100);
    });
    
    $('.help-container>a').html('Hide help text');
    $('.help-container>a').unbind("click").click(function(){
        hideinfopanels();
    });
    return false;
}

function hideinfopanels(){
    $.each($('.info-panel'), function(index, item){
        $(item).slideUp(100);
    });
    
    $('.help-container>a').html('Show help text');
    $('.help-container>a').click(function(){
        showinfopanels();
    });
    
    return false;
}

function hidedisclaimer(){
    $('.full-disclaimer-panel').slideDown(400);
}

function calculate_effort(effort, edge){
    return -(edge - (3+((effort-1) * 2)));
}

function showeffortpanel(sender){
    var $box = $('<div class="effort-panel" style="display: none;">' +
                '<div class="effort-panel-values">' +
                'Lower by: <input type="number" class="effort-value" value="1" />' +
                '</div>' +
                '<div class="effort-panel-values">' +
                'You will spend: <span class="effort-preview">0</span>' +
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
        
        if (value - calculate_effort(selection, edge) > 0) {
            //First effort subtract 3, the other 2, and edge is subtracted from the total.
            //Value + Edge - (3+((selection-1)x2))
            $(sender).parent().prev().find('.current-value').val(value - calculate_effort(selection, edge));
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
    $box.slideDown(200, function(){
        $box.find('.effort-value').unbind('change').change(function(){
            var selection = parseInt($box.find('.effort-value').val());
            var value = parseInt($(sender).parent().prev().find('.current-value').val());
            var edge = parseInt($(sender).parent().prev().find('.edge-value').val());
            
            var expense = calculate_effort(selection, edge);
            $(this).parent().parent().find('.effort-preview').text(expense);
            if (value - expense < 0){
                $(this).toggleClass('almost-depleted', true);
                disablebutton($(this).parent().parent().find('.effort-ok'));
            } else {
                $(this).toggleClass('almost-depleted', false);
                enablebutton($(this).parent().parent().find('.effort-ok'));
            }
        });
        $box.find('.effort-value').focus();
    });
}

function hideeffortpanel(panel, opener, callback){
    $(panel).find('.effort-value').unbind('change');
    $(panel).slideUp(300, function () {
        $(this).remove().promise().done(function(){
            enablebutton($(opener));
            if (typeof callback !== 'undefined'){
                callback();
            }
        });
    });
}

function showrecoveryresult(value){
    //There is only one recovery panel, hence one button, so there is no need for sender parameter
    var $box = $('<div class="recovery-panel" style="display: none;">' +
                '<div class="recovery-panel-values">' +
                'Roll result: <span class="recovery-result">' + value.toString() + '</span>' +
                '</div>' +
                '<div class="recovery-panel-buttons">' +
                '<button type="button" class="recovery-ok button">Ok, fine</button>' +
                '</div>' +
                '</div>').appendTo($('.recovery-button').parent().parent().parent());
    
    $('.recovery-ok').unbind('click').click(function() {
        hiderecoveryresult();
        return false; 
    });
    
    //$box.show("slide", { direction: "up" }, 500, function(){
    $box.slideDown(300);
}

function hiderecoveryresult(callback){
    //There is only one recovery result panel, so there is no need for a panel parameter
    if ($('.recovery-panel').length > 0){
        $('.recovery-panel').slideUp(400, function () {
            $(this).remove().promise().done(function(){
                if (typeof callback !== 'undefined'){
                    callback();
                }
            });
        });
    } else {
        if (typeof callback !== 'undefined'){
            callback();
        }
    }
}