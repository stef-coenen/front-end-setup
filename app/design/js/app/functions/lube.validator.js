/**
 * @author       [Stef Coenen]
 * @date         [2016]
 * @namespace    [Lube.validator]
 * @type         [Functions]
 * @requires     [jQuery, Lube]
 * @revision     [0.1]
 */

// @param ($): window.jQuery
// @param (ns): window.Lube
window.Lube = (function($, ns) {
    // 1. ECMA-262/5
    'use strict';

    // 2. CONFIGURATION
    var cfg = {
        cache: {
            formGroup: '.form-group'
        },
        classes: {
            hasError: 'is-invalid',
            hasSuccess: 'is-valid'
        },
        data: {
            required: 'required',
            pattern: 'pattern',
            match: 'match',
            action: 'action',
            name: 'name'
        }
    };

    // 3. FUNCTIONS OBJECT
    ns.validator = {
        validateInput: function(input) {
            let settings = cfg,
                data = settings.data,
                cache = settings.cache,
                classes = settings.classes,
                inputVal = input.val(),
                formGroup = input.closest(cache.formGroup);

            formGroup.removeClass(classes.hasSuccess);
            formGroup.removeClass(classes.hasError);

            // Required check
            let required = input.attr(data.required);
            if (required && (!inputVal || inputVal.length === 0)) {
                formGroup.addClass(classes.hasError);
                return false;
            }

            // Pattern check
            let pattern = input.attr(data.pattern);
            if (pattern) {
                let regex = new RegExp(pattern);
                if (!regex.test(inputVal)) {
                    formGroup.addClass(classes.hasError);
                    return false;
                }
            }

            // Match check
            let match = input.data(data.match);
            if (match) {
                let matchElement = $(match);
                if (inputVal !== matchElement.val()) {
                    formGroup.addClass(classes.hasError);
                    return false;
                }
            }

            formGroup.addClass(classes.hasSuccess);
            return true;
        }
    };

    // 4. NAMESPACE
    return ns;
})(window.jQuery, window.Lube || {});
