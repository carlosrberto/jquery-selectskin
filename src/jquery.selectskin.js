/*
* jQuery SelectSkin
* http://carlosroberto.name/
*
* Copyright (c) 2012 Carlos Roberto Gomes Junior
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 0.1
*/

(function($) {
    var isBadBrowser = $.browser.msie && $.browser.version < 7;
    var defaults = {};
    
    function SelectSkin (select, options) {
        
        if ( isBadBrowser || !select.tagName || select.tagName && select.tagName.toLowerCase() !== 'select' ) {
            return;
            // throw new Error("SelectSkin expect a select element as first parameter, "+select.tagName+" was given")
        };
        
        if ( options ) {
            this.settings = $.extend(defaults, options);            
        } else {
            this.settings = defaults;
        }
        
        this.selectDOM = select;
        this.select = $(select);
        this.wrapper = $('<div>', { 'class' : 'select-skin' });
        this.mask = $('<div>', { 'class' : 'select-skin-mask' });
        this.textClip = $('<div>', { 'class' : 'select-skin-text-clip' });
        this.text = $('<div>', { 'class' : 'select-skin-text' });
        
        // init methods
        this.createDOM();
        this.setStyles();
        this.changeText();
                
        // events
        this.select.bind('change', $.proxy(this.changeHandler, this));
    };
    
    SelectSkin.prototype = {
        createDOM : function() {
            this.select.after(this.wrapper);
            this.select.appendTo(this.wrapper);
            this.textClip.append(this.text);
            this.mask.append(this.textClip);            
            this.wrapper.append(this.mask);
        },
        
        setStyles: function() {
            this.select.css({
                'width' : '100%',
                'opacity' : 0
            });
        },
        
        changeText : function() {
            this.text.text(this.selectDOM.options[this.selectDOM.selectedIndex].text);
        },
        
        changeHandler : function(event) {
            this.changeText();
        }
    };
    
    $.fn.SelectSkin = function(options) {
        this.each(function() {
            $(this).data('SelectSkin', new SelectSkin(this));
        });
    }
})(jQuery);