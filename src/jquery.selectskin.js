(function($) {
    var ie, isBadBrowser, defaults;

    // nice way to detect IE
    // https://gist.github.com/padolsey/527683
    ie = (function(){
        var undef, v = 3, div = document.createElement('div');
        while (
            div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
            div.getElementsByTagName('i')[0]
        );
        return v > 4 ? v : undef;
    }());

    isBadBrowser = (typeof ie !== undefined && ie < 8);
    defaults = {};

    function SelectSkin (select, options) {

        if ( isBadBrowser || !select.tagName || select.tagName && select.tagName.toLowerCase() !== 'select' ) {
            return;
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
        this._createDOM();
        this._setStyles();
        this._changeText();

        // events
        this.select.on('change.SelectSkin', $.proxy(this._changeHandler, this));
    }

    SelectSkin.prototype = {
        _createDOM : function() {
            this.select.after(this.wrapper);
            this.select.appendTo(this.wrapper);
            this.textClip.append(this.text);
            this.mask.append(this.textClip);
            this.wrapper.append(this.mask);
        },

        _setStyles: function() {
            this.select.css({
                'width' : '100%',
                'opacity' : 0
            });
        },

        _removeStyles: function() {
            this.select.css({
                'width' : '',
                'opacity' : ''
            });
        },

        _changeText : function() {
            var selectedEl = this.selectDOM.options[this.selectDOM.selectedIndex];

            if ( typeof selectedEl !== "undefined" ) {
                this.text.text(selectedEl.text);
            } else {
                this.text.text('---');
            }
        },

        _changeHandler : function() {
            this._changeText();
        },

        update: function(){
            this._changeText();
        },

        empty: function() {
            this.select.empty();
            this.update();
        },

        append: function(html) {
            this.select.append(html);
            this.update();
        },

        prepend: function(html) {
            this.select.prepend(html);
            this.update();
        },

        reset: function(){
            this.selectDOM.selectedIndex = 0;
            this.update();
        },

        destroy: function() {
            this.select.off('.SelectSkin');
            this.wrapper.before(this.select);
            this._removeStyles();
            this.wrapper.remove();
            $.removeData(this.selectDOM, 'SelectSkin');
        }
    };

    $.fn.SelectSkin = function( method ) {
        var args = arguments;

        return this.each(function() {

            if ( !$.data(this, 'SelectSkin') ) {
                $.data(this, 'SelectSkin', new SelectSkin(this, method));
                return;
            }

            var api = $.data(this, 'SelectSkin');

            if ( typeof method === 'string' && method.charAt(0) !== '_' && api[ method ] ) {
                api[ method ].apply( api, Array.prototype.slice.call( args, 1 ) );
            } else {
                $.error( 'Method ' +  method + ' does not exist on jQuery.SelectSkin' );
            }
        });
    };
})(jQuery);
