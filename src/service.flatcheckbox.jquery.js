/****************************************************************************************************** 
 * A jquery plugin implementing a checkbox. 
 *
 * Version: 1.0.2
 *
 * Usage:
 *  - Element:
 *      <input id="myCheckbox" type="checkbox" @( (Model.ShowPassedActivities != 0) ? "checked" : "") />
 *      
 *  - Instantiation:
 *    1. With a label behind the checkbox
 *      $('#checkbox').flatcheckbox({ label: 'Show passed activities',
 *                                    onChecked: function () { ... },
 *                                    onUnChecked: function () { ... }
 *      });
 *    2. Without a label
 *      $('#checkbox').flatcheckbox({ onChecked: function () { ... },
 *                                    onUnChecked: function ( { ... }
 *      });
 *
 * Change history:
 *
 * Version 1.0.2 - Added method to uncheck the checkbox
 * Version 1.0.1 - Added method to change the label
 * Version 1.0.0 - First version.
 *
 * @requires jQuery 1.8.0 or later
 *
 * Copyright (c) Jos Huybrighs
 * swcomponents.cwwonline.be
 *
 * Licensed under the MIT license.
 * http://en.wikipedia.org/wiki/MIT_License
 *
 ******************************************************************************************************/
; (function ($, window, document, undefined) {

    var version = '1.0.2';
    var pluginName = "flatcheckbox";
    var defaults = {
        label: "",
        onChecked: function () { },
        onUnChecked: function () { }
    };

    function Plugin(element, options) {
        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this._checked = false;
        this._init();
    };

    Plugin.prototype = {

        _init: function () {
            var self = this;
            this._checked = $(this.element).prop('checked');
            $(this.element).hide();
            $(this.element).after('<div class="flcheckbox"><span class="ckbBox"></span><span class="ckbText">' + this.settings.label + '</span></div>');
            var $flchkbox = $(this.element).next();
            if (this._checked) {
                $flchkbox.addClass('flchecked');
            }
            $flchkbox.bind('click', function () {
                $flchkbox.toggleClass('flchecked');
                self._checked = !self._checked;
                $(self.element).prop('checked', self._checked);
                if (self._checked) {
                    self.settings.onChecked(self.element);
                }
                else {
                    self.settings.onUnChecked(self.element);
                }
            });
        },

        // label
        // Arguments:
        // - argsArray: An array where the first element is a string. It holds the new label text.
        label: function (argsArray) {
            var labelEl = $(this.element).next().find('.ckbText');
            labelEl.text(argsArray[0]);
        },

        // uncheck
        // Arguments: None
        uncheck: function (argsArray) {
            var $flchkbox = $(this.element).next();
            $flchkbox.removeClass('flchecked');
            this._checked = false;
            $(this.element).prop('checked', false);
            this.settings.onUnChecked(this.element);
        }

    };

    $.fn[pluginName] = function (methodOrOptions) {
        var instance = $(this).data(pluginName);
        if (instance &&
             methodOrOptions.indexOf('_') != 0) {
            return instance[methodOrOptions](Array.prototype.slice.call(arguments, 1));
        }
        if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            instance = new Plugin(this, methodOrOptions);
            $(this).data(pluginName, instance);
            return $(this);
        }
        $.error('Wrong call to ' + pluginName);
    };
})(jQuery, window, document);

