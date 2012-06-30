/*
* jQuery SelectSkin
* http://carlosrberto.github.com/jquery-selectskin/
*
* Copyright (c) 2012 Carlos Roberto Gomes Junior
* http://carlosroberto.name/
* 
* Licensed under a Creative Commons Attribution 3.0 License
* http://creativecommons.org/licenses/by-sa/3.0/
*
* Version: 0.2
*/

(function($) {
    var isBadBrowser = $.browser.msie && $.browser.version < 7;
    var defaults = {};
    
    function SelectSkin (select, options) {
        
        if ( isBadBrowser || !select.tagName || select.tagName && select.tagName.toLowerCase() !== 'select' ) {
            return;
            // throw new Error("SelectSkin expect a select element as first parameter, "+select.tagName+" was given")
        }
        
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
    }
    
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
        
        changeHandler : function() {
            this.changeText();
        },
        
        update: function(){
            this.changeText();
        },
        
        reset: function(){
            this.selectDOM.selectedIndex = 0;
            this.update();    
        }
    };
    
    $.fn.SelectSkin = function( method ) {
        return this.each(function() {
            // TODO: find a way to do this better
            if ( !$(this).data('SelectSkin') ) {
                $(this).data('SelectSkin', new SelectSkin(this, method));
                return;
            }
            
            var api = $(this).data('SelectSkin');
            
            if ( api[ method ] ) {
                api[ method ].apply( api, Array.prototype.slice.call( arguments, 1 ) );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.SelectSkin' );
            }
        });
    };
})(jQuery);