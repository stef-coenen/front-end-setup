window.Lube = function ($, ns) {
    'use strict';

    var cfg = {
        cache: {},
        classes: {
            scrolling: 'scrolling'
        },
        events: {
            scroll: 'scroll',
            click: 'click'
        }
    };

    ns.Dom = {
        init: function () {
            var settings = cfg,
                classes = settings.classes,
                events = settings.events,
                cache = settings.cache;

            this.win = $(window);
            this.body = $(document.body);

            this.bindEvents(classes, events);
            this.windowsPhoneViewportFix();
            this.bindScrollTopEvent();
            this.bindDataHref();
        },

        bindEvents: function (classes, events) {
            var self = this,
                settings = cfg,
                cache = settings.cache;
        },

        windowsPhoneViewportFix: function () {
            // Copyright 2014-2015 Twitter, Inc.
            // Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
            if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
                var msViewportStyle = document.createElement('style');
                msViewportStyle.appendChild(document.createTextNode('@-ms-viewport{width:auto!important}'));
                document.querySelector('head').appendChild(msViewportStyle);
            }
        },
        bindScrollTopEvent: function () {
            var self = this;
            $('a[href="#top"]').click(function () {
                self.body.animate({
                    scrollTop: 0
                }, 'slow');
                return false;
            });
        },
        bindDataHref: function () {
            $('[data-href]').on('click', function (e) {
                if (!$(e.target).is('a')) {
                    window.location = $(this).data('href');
                    return false;
                }
            });
            $('[data-href]').on('mousedown', function (e) {
                if (!$(e.target).is('a') && e.which == 2) {
                    window.open($(this).data('href'), '_blank');
                    return false;
                }
            });
        }
    };

    return ns;
}(window.jQuery, window.Lube || {});

/**
 * @author       [Stef Coenen & Tim Vermaelen]
 * @date         [2016]
 * @namespace    [Lube.fn]
 * @type         [Functions]
 * @requires     [jQuery, Lube]
 * @revision     [0.1]
 */

// @param ($): window.jQuery
// @param (ns): window.Lube
window.Lube = function ($, ns) {
    // 1. ECMA-262/5
    'use strict';

    // 2. CONFIGURATION

    var cfg = {
        patterns: {
            mobile: new RegExp(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i),
            mobile2: new RegExp(/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/),
            tablet: new RegExp(/android|ipad|playbook|silk/i)
        },
        devices: {
            mobile: 'mobile',
            tablet: 'tablet',
            desktop: 'desktop'
        },
        delimiter: {
            key: '&',
            val: '='
        }
    };

    // 3. FUNCTIONS OBJECT
    ns.fn = {
        /**
         * @description Equally set height on items
         * @param {Object} elements : jquery list
         */
        equalHeight: function (elements) {
            var el = $(elements),
                len = el.length || 0,
                heighest = 0;

            if (len > 1) {
                while (len--) {
                    var h = el.eq(len).outerHeight(true);

                    if (h > heighest) {
                        heighest = h;
                    }
                }

                el.outerHeight(heighest);
            }
        },

        /**
         * @description Convert a query alike string to an object literal
         * @param {String} qs : a query string of key value pairs (without ?)
         * @param {String} keyDelimiter : character between values and keys
         * @param {String} valDelimiter : character between keys and values
         * @return {Object} obj : object literal representing the query string
         * @example: key1=val1&key2=val2&key3=val3
         */
        convertQsToLiteral: function (qs, keyDelimiter, valDelimiter) {
            var arrParams,
                obj = {};

            if (qs && qs.length) {
                keyDelimiter = keyDelimiter || cfg.delimiter.key;
                valDelimiter = valDelimiter || cfg.delimiter.val;
                arrParams = qs.split(keyDelimiter);

                $.each(arrParams, function (i, pair) {
                    var arrPair = pair.split(valDelimiter),
                        key = arrPair[0],
                        val = arrPair[1];

                    obj[key] = val;
                });
            }

            return obj;
        },

        getStringFromTime: function (time) {
            let hours = time.hours + '';
            hours = hours.length === 1 ? '0' + hours : hours;

            let minutes = time.minutes + '';
            minutes = minutes.length === 1 ? '0' + minutes : minutes;

            return hours + ':' + minutes;
        },
        getStringFromTimeSpan: function (timeS, timeE) {
            return this.getStringFromTime(timeS) + ' - ' + this.getStringFromTime(timeE);
        },
        getTimeSpanFromString: function (timeString) {
            let stringSplit = timeString.split(':');
            return {
                hours: parseInt(stringSplit[0]),
                minutes: parseInt(stringSplit[1])
            };
        },
        compareTimeObjects: function (a, b) {
            return a.hours === b.hours && a.minutes === b.minutes;
        },
        getTimeObjectFromDate: function (date) {
            return {
                hours: date.getHours(),
                minutes: date.getMinutes(),
                date: date
            };
        },
        convertDateToYearMonthDay: function (date) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        convertTimeObjectToDate: function (timeObject, dateObject) {
            let newDate = new Date(dateObject.getTime());

            newDate.setHours(timeObject.hours);
            newDate.setMinutes(timeObject.minutes);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);

            return newDate;
        },
        compareDateForSameDay: function (a, b) {
            if (a.getFullYear() === b.getFullYear()) {
                if (a.getMonth() === b.getMonth()) {
                    if (a.getDate() === b.getDate()) {
                        return true;
                    }
                }
            }
            return false;
        },
        deleteNullProperties: function (object) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    if (object[property] === null) {
                        delete object[property];
                    }
                }
            }
            return object;
        },
        convertParametersToObject: function (query) {
            var vars = query.split('&');
            var query_string = {};
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split('=');
                // If first entry with this name
                if (typeof query_string[pair[0]] === 'undefined') {
                    query_string[pair[0]] = decodeURIComponent(pair[1]);
                    // If second entry with this name
                } else if (typeof query_string[pair[0]] === 'string') {
                    var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
                    query_string[pair[0]] = arr;
                    // If third or later entry with this name
                } else {
                    query_string[pair[0]].push(decodeURIComponent(pair[1]));
                }
            }
            return query_string;
        },
        getQueryStringObject: function () {
            let query = window.location.search.substring(1);
            return this.convertParametersToObject(query);
        },
        gotoDayOfWeek: function (date, dayOfWeek) {
            date = new Date(date.getTime());
            let dateDay = date.getDay();

            if (dayOfWeek !== 0 && dateDay === 0) {
                date.setDate(date.getDate() - (7 - dayOfWeek));
            } else if (dateDay !== dayOfWeek) {
                date.setDate(date.getDate() - dateDay + dayOfWeek);
            }

            return date;
        }
    };

    // 4. NAMESPACE
    return ns;
}(window.jQuery, window.Lube || {});

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
window.Lube = function ($, ns) {
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
        validateInput: function (input) {
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
}(window.jQuery, window.Lube || {});

/**
 * [window.Lube]
 *
 * @author       [Stef Coenen]
 * @date         [2017]
 * @namespace    [Lube]
 * @requires     [jQuery]
 * @revision     [0.1]
 */

window.Lube = function ($, ns) {
    // 1. ECMA-262/5
    'use strict';

    // 2. LOAD COMPONENTS

    ns.components = function () {
        ns.Dom.init();
    };

    // 3. LOAD DATACOMPONENTS
    ns.dataComponentInitializer = function () {
        var dataComponents = $('[data-component]');
        for (var i = 0; i < dataComponents.length; i++) {
            var dataComponent = dataComponents.eq(i);
            var dataAttr = dataComponent.data('component');
            dataAttr = dataAttr.split('.');

            if (dataAttr.length >= 2) {
                var componentFunction = ns[dataAttr[1]];
                if (componentFunction) {
                    new componentFunction(dataComponent);
                }
            }
        }
    };

    // 4. ONCE THE DOM IS READY
    $(function () {
        ns.components();
        ns.dataComponentInitializer();
    });

    // 5. TRIGGER LOAD EVENT ON NS
    // This is required as of jQuery 3.0 as jQuery no longer
    //   supports load event binding form inside a ready event handler
    $(window).on('load', function () {
        $.ready.then(function () {
            $(ns).trigger('load');
        });
    });

    // // 6. REGISTER SW
    // if ('serviceWorker' in navigator) {
    //     // Register a service worker hosted at the root of the
    //     // site using the default scope.
    //     navigator.serviceWorker
    //         .register('/app/sw.js')
    //         .then(function(registration) {
    //             console.info('Service worker registration succeeded:', registration);
    //             registration.update();
    //         })
    //         .catch(function(error) {
    //             console.info('Service worker registration failed:', error);
    //         });
    // } else {
    //     console.info('Service workers are not supported.');
    // }

    // 8. GLOBALIZE NAMESPACE
    return ns;
}(window.jQuery, window.Lube || {});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImx1YmUuZG9tLmpzIiwibHViZS5mbi5qcyIsImx1YmUudmFsaWRhdG9yLmpzIiwibHViZS5zdHJhcG9uLmpzIl0sIm5hbWVzIjpbIndpbmRvdyIsIkx1YmUiLCIkIiwibnMiLCJjZmciLCJjYWNoZSIsImNsYXNzZXMiLCJzY3JvbGxpbmciLCJldmVudHMiLCJzY3JvbGwiLCJjbGljayIsIkRvbSIsImluaXQiLCJzZXR0aW5ncyIsIndpbiIsImJvZHkiLCJkb2N1bWVudCIsImJpbmRFdmVudHMiLCJ3aW5kb3dzUGhvbmVWaWV3cG9ydEZpeCIsImJpbmRTY3JvbGxUb3BFdmVudCIsImJpbmREYXRhSHJlZiIsInNlbGYiLCJuYXZpZ2F0b3IiLCJ1c2VyQWdlbnQiLCJtYXRjaCIsIm1zVmlld3BvcnRTdHlsZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwicXVlcnlTZWxlY3RvciIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvbiIsImUiLCJ0YXJnZXQiLCJpcyIsImxvY2F0aW9uIiwiZGF0YSIsIndoaWNoIiwib3BlbiIsImpRdWVyeSIsInBhdHRlcm5zIiwibW9iaWxlIiwiUmVnRXhwIiwibW9iaWxlMiIsInRhYmxldCIsImRldmljZXMiLCJkZXNrdG9wIiwiZGVsaW1pdGVyIiwia2V5IiwidmFsIiwiZm4iLCJlcXVhbEhlaWdodCIsImVsZW1lbnRzIiwiZWwiLCJsZW4iLCJsZW5ndGgiLCJoZWlnaGVzdCIsImgiLCJlcSIsIm91dGVySGVpZ2h0IiwiY29udmVydFFzVG9MaXRlcmFsIiwicXMiLCJrZXlEZWxpbWl0ZXIiLCJ2YWxEZWxpbWl0ZXIiLCJhcnJQYXJhbXMiLCJvYmoiLCJzcGxpdCIsImVhY2giLCJpIiwicGFpciIsImFyclBhaXIiLCJnZXRTdHJpbmdGcm9tVGltZSIsInRpbWUiLCJob3VycyIsIm1pbnV0ZXMiLCJnZXRTdHJpbmdGcm9tVGltZVNwYW4iLCJ0aW1lUyIsInRpbWVFIiwiZ2V0VGltZVNwYW5Gcm9tU3RyaW5nIiwidGltZVN0cmluZyIsInN0cmluZ1NwbGl0IiwicGFyc2VJbnQiLCJjb21wYXJlVGltZU9iamVjdHMiLCJhIiwiYiIsImdldFRpbWVPYmplY3RGcm9tRGF0ZSIsImRhdGUiLCJnZXRIb3VycyIsImdldE1pbnV0ZXMiLCJjb252ZXJ0RGF0ZVRvWWVhck1vbnRoRGF5IiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aCIsImdldERhdGUiLCJjb252ZXJ0VGltZU9iamVjdFRvRGF0ZSIsInRpbWVPYmplY3QiLCJkYXRlT2JqZWN0IiwibmV3RGF0ZSIsIkRhdGUiLCJnZXRUaW1lIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsInNldE1pbGxpc2Vjb25kcyIsImNvbXBhcmVEYXRlRm9yU2FtZURheSIsImRlbGV0ZU51bGxQcm9wZXJ0aWVzIiwib2JqZWN0IiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnZlcnRQYXJhbWV0ZXJzVG9PYmplY3QiLCJxdWVyeSIsInZhcnMiLCJxdWVyeV9zdHJpbmciLCJkZWNvZGVVUklDb21wb25lbnQiLCJhcnIiLCJwdXNoIiwiZ2V0UXVlcnlTdHJpbmdPYmplY3QiLCJzZWFyY2giLCJzdWJzdHJpbmciLCJnb3RvRGF5T2ZXZWVrIiwiZGF5T2ZXZWVrIiwiZGF0ZURheSIsImdldERheSIsInNldERhdGUiLCJmb3JtR3JvdXAiLCJoYXNFcnJvciIsImhhc1N1Y2Nlc3MiLCJyZXF1aXJlZCIsInBhdHRlcm4iLCJhY3Rpb24iLCJuYW1lIiwidmFsaWRhdG9yIiwidmFsaWRhdGVJbnB1dCIsImlucHV0IiwiaW5wdXRWYWwiLCJjbG9zZXN0IiwicmVtb3ZlQ2xhc3MiLCJhdHRyIiwiYWRkQ2xhc3MiLCJyZWdleCIsInRlc3QiLCJtYXRjaEVsZW1lbnQiLCJjb21wb25lbnRzIiwiZGF0YUNvbXBvbmVudEluaXRpYWxpemVyIiwiZGF0YUNvbXBvbmVudHMiLCJkYXRhQ29tcG9uZW50IiwiZGF0YUF0dHIiLCJjb21wb25lbnRGdW5jdGlv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Q0E3SSxNQUFBRixNQUFBLEVBQUFnQyxFQUFBLENBQUEsTUFBQSxFQUFBLFlBQUE7QUFDQTlCLFVBQUFrSixLQUFBLENBQUFDLElBQUEsQ0FBQSxZQUFBO0FBQ0FuSixjQUFBQyxFQUFBLEVBQUFtSixPQUFBLENBQUEsTUFBQTtBQUNBLFNBRkE7QUFHQSxLQUpBOztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBQW5KLEVBQUE7QUFDQSxDQTVEQSxDQTREQUgsT0FBQXdDLE1BNURBLEVBNERBeEMsT0FBQUMsSUFBQSxJQUFBLEVBNURBLENBQUEiLCJmaWxlIjoiYXBwbGliLmpzIiwic291cmNlc0NvbnRlbnQiOlsid2luZG93Lkx1YmUgPSAoZnVuY3Rpb24gKCQsIG5zKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGNmZyA9IHtcbiAgICAgICAgY2FjaGU6IHt9LFxuICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgICBzY3JvbGxpbmc6ICdzY3JvbGxpbmcnXG4gICAgICAgIH0sXG4gICAgICAgIGV2ZW50czoge1xuICAgICAgICAgICAgc2Nyb2xsOiAnc2Nyb2xsJyxcbiAgICAgICAgICAgIGNsaWNrOiAnY2xpY2snXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbnMuRG9tID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2V0dGluZ3MgPSBjZmcsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyA9IHNldHRpbmdzLmNsYXNzZXMsXG4gICAgICAgICAgICAgICAgZXZlbnRzID0gc2V0dGluZ3MuZXZlbnRzLFxuICAgICAgICAgICAgICAgIGNhY2hlID0gc2V0dGluZ3MuY2FjaGU7XG5cbiAgICAgICAgICAgIHRoaXMud2luID0gJCh3aW5kb3cpO1xuICAgICAgICAgICAgdGhpcy5ib2R5ID0gJChkb2N1bWVudC5ib2R5KTtcblxuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKGNsYXNzZXMsIGV2ZW50cyk7XG4gICAgICAgICAgICB0aGlzLndpbmRvd3NQaG9uZVZpZXdwb3J0Rml4KCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxUb3BFdmVudCgpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRGF0YUhyZWYoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBiaW5kRXZlbnRzOiBmdW5jdGlvbiAoY2xhc3NlcywgZXZlbnRzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3MgPSBjZmcsXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBzZXR0aW5ncy5jYWNoZTtcbiAgICAgICAgfSxcblxuICAgICAgICB3aW5kb3dzUGhvbmVWaWV3cG9ydEZpeDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gQ29weXJpZ2h0IDIwMTQtMjAxNSBUd2l0dGVyLCBJbmMuXG4gICAgICAgICAgICAvLyBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0lFTW9iaWxlXFwvMTBcXC4wLykpIHtcbiAgICAgICAgICAgICAgICB2YXIgbXNWaWV3cG9ydFN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBtc1ZpZXdwb3J0U3R5bGUuYXBwZW5kQ2hpbGQoXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdALW1zLXZpZXdwb3J0e3dpZHRoOmF1dG8haW1wb3J0YW50fScpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuYXBwZW5kQ2hpbGQobXNWaWV3cG9ydFN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYmluZFNjcm9sbFRvcEV2ZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICAkKCdhW2hyZWY9XCIjdG9wXCJdJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuYm9keS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAwXG4gICAgICAgICAgICAgICAgfSwgJ3Nsb3cnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYmluZERhdGFIcmVmOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCdbZGF0YS1ocmVmXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCEkKGUudGFyZ2V0KS5pcygnYScpKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICQodGhpcykuZGF0YSgnaHJlZicpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKCdbZGF0YS1ocmVmXScpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghJChlLnRhcmdldCkuaXMoJ2EnKSAmJiBlLndoaWNoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm9wZW4oJCh0aGlzKS5kYXRhKCdocmVmJyksICdfYmxhbmsnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBucztcbn0pKHdpbmRvdy5qUXVlcnksIHdpbmRvdy5MdWJlIHx8IHt9KTtcbiIsIi8qKlxuICogQGF1dGhvciAgICAgICBbU3RlZiBDb2VuZW4gJiBUaW0gVmVybWFlbGVuXVxuICogQGRhdGUgICAgICAgICBbMjAxNl1cbiAqIEBuYW1lc3BhY2UgICAgW0x1YmUuZm5dXG4gKiBAdHlwZSAgICAgICAgIFtGdW5jdGlvbnNdXG4gKiBAcmVxdWlyZXMgICAgIFtqUXVlcnksIEx1YmVdXG4gKiBAcmV2aXNpb24gICAgIFswLjFdXG4gKi9cblxuLy8gQHBhcmFtICgkKTogd2luZG93LmpRdWVyeVxuLy8gQHBhcmFtIChucyk6IHdpbmRvdy5MdWJlXG53aW5kb3cuTHViZSA9IChmdW5jdGlvbigkLCBucykge1xuICAgIC8vIDEuIEVDTUEtMjYyLzVcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyAyLiBDT05GSUdVUkFUSU9OXG4gICAgdmFyIGNmZyA9IHtcbiAgICAgICAgcGF0dGVybnM6IHtcbiAgICAgICAgICAgIG1vYmlsZTogbmV3IFJlZ0V4cChcbiAgICAgICAgICAgICAgICAvKGFuZHJvaWR8YmJcXGQrfG1lZWdvKS4rbW9iaWxlfGF2YW50Z298YmFkYVxcL3xibGFja2JlcnJ5fGJsYXplcnxjb21wYWx8ZWxhaW5lfGZlbm5lY3xoaXB0b3B8aWVtb2JpbGV8aXAoaG9uZXxvZCl8aXJpc3xraW5kbGV8bGdlIHxtYWVtb3xtaWRwfG1tcHxtb2JpbGUuK2ZpcmVmb3h8bmV0ZnJvbnR8b3BlcmEgbShvYnxpbilpfHBhbG0oIG9zKT98cGhvbmV8cChpeGl8cmUpXFwvfHBsdWNrZXJ8cG9ja2V0fHBzcHxzZXJpZXMoNHw2KTB8c3ltYmlhbnx0cmVvfHVwXFwuKGJyb3dzZXJ8bGluayl8dm9kYWZvbmV8d2FwfHdpbmRvd3MgKGNlfHBob25lKXx4ZGF8eGlpbm8vaVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIG1vYmlsZTI6IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICAgICAgLzEyMDd8NjMxMHw2NTkwfDNnc298NHRocHw1MFsxLTZdaXw3NzBzfDgwMnN8YSB3YXxhYmFjfGFjKGVyfG9vfHNcXC0pfGFpKGtvfHJuKXxhbChhdnxjYXxjbyl8YW1vaXxhbihleHxueXx5dyl8YXB0dXxhcihjaHxnbyl8YXModGV8dXMpfGF0dHd8YXUoZGl8XFwtbXxyIHxzICl8YXZhbnxiZShja3xsbHxucSl8YmkobGJ8cmQpfGJsKGFjfGF6KXxicihlfHYpd3xidW1ifGJ3XFwtKG58dSl8YzU1XFwvfGNhcGl8Y2N3YXxjZG1cXC18Y2VsbHxjaHRtfGNsZGN8Y21kXFwtfGNvKG1wfG5kKXxjcmF3fGRhKGl0fGxsfG5nKXxkYnRlfGRjXFwtc3xkZXZpfGRpY2F8ZG1vYnxkbyhjfHApb3xkcygxMnxcXC1kKXxlbCg0OXxhaSl8ZW0obDJ8dWwpfGVyKGljfGswKXxlc2w4fGV6KFs0LTddMHxvc3x3YXx6ZSl8ZmV0Y3xmbHkoXFwtfF8pfGcxIHV8ZzU2MHxnZW5lfGdmXFwtNXxnXFwtbW98Z28oXFwud3xvZCl8Z3IoYWR8dW4pfGhhaWV8aGNpdHxoZFxcLShtfHB8dCl8aGVpXFwtfGhpKHB0fHRhKXxocCggaXxpcCl8aHNcXC1jfGh0KGMoXFwtfCB8X3xhfGd8cHxzfHQpfHRwKXxodShhd3x0Yyl8aVxcLSgyMHxnb3xtYSl8aTIzMHxpYWMoIHxcXC18XFwvKXxpYnJvfGlkZWF8aWcwMXxpa29tfGltMWt8aW5ub3xpcGFxfGlyaXN8amEodHx2KWF8amJyb3xqZW11fGppZ3N8a2RkaXxrZWppfGtndCggfFxcLyl8a2xvbnxrcHQgfGt3Y1xcLXxreW8oY3xrKXxsZShub3x4aSl8bGcoIGd8XFwvKGt8bHx1KXw1MHw1NHxcXC1bYS13XSl8bGlid3xseW54fG0xXFwtd3xtM2dhfG01MFxcL3xtYSh0ZXx1aXx4byl8bWMoMDF8MjF8Y2EpfG1cXC1jcnxtZShyY3xyaSl8bWkobzh8b2F8dHMpfG1tZWZ8bW8oMDF8MDJ8Yml8ZGV8ZG98dChcXC18IHxvfHYpfHp6KXxtdCg1MHxwMXx2ICl8bXdicHxteXdhfG4xMFswLTJdfG4yMFsyLTNdfG4zMCgwfDIpfG41MCgwfDJ8NSl8bjcoMCgwfDEpfDEwKXxuZSgoY3xtKVxcLXxvbnx0Znx3Znx3Z3x3dCl8bm9rKDZ8aSl8bnpwaHxvMmltfG9wKHRpfHd2KXxvcmFufG93ZzF8cDgwMHxwYW4oYXxkfHQpfHBkeGd8cGcoMTN8XFwtKFsxLThdfGMpKXxwaGlsfHBpcmV8cGwoYXl8dWMpfHBuXFwtMnxwbyhja3xydHxzZSl8cHJveHxwc2lvfHB0XFwtZ3xxYVxcLWF8cWMoMDd8MTJ8MjF8MzJ8NjB8XFwtWzItN118aVxcLSl8cXRla3xyMzgwfHI2MDB8cmFrc3xyaW05fHJvKHZlfHpvKXxzNTVcXC98c2EoZ2V8bWF8bW18bXN8bnl8dmEpfHNjKDAxfGhcXC18b298cFxcLSl8c2RrXFwvfHNlKGMoXFwtfDB8MSl8NDd8bWN8bmR8cmkpfHNnaFxcLXxzaGFyfHNpZShcXC18bSl8c2tcXC0wfHNsKDQ1fGlkKXxzbShhbHxhcnxiM3xpdHx0NSl8c28oZnR8bnkpfHNwKDAxfGhcXC18dlxcLXx2ICl8c3koMDF8bWIpfHQyKDE4fDUwKXx0NigwMHwxMHwxOCl8dGEoZ3R8bGspfHRjbFxcLXx0ZGdcXC18dGVsKGl8bSl8dGltXFwtfHRcXC1tb3x0byhwbHxzaCl8dHMoNzB8bVxcLXxtM3xtNSl8dHhcXC05fHVwKFxcLmJ8ZzF8c2kpfHV0c3R8djQwMHx2NzUwfHZlcml8dmkocmd8dGUpfHZrKDQwfDVbMC0zXXxcXC12KXx2bTQwfHZvZGF8dnVsY3x2eCg1Mnw1M3w2MHw2MXw3MHw4MHw4MXw4M3w4NXw5OCl8dzNjKFxcLXwgKXx3ZWJjfHdoaXR8d2koZyB8bmN8bncpfHdtbGJ8d29udXx4NzAwfHlhc1xcLXx5b3VyfHpldG98enRlXFwtL1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHRhYmxldDogbmV3IFJlZ0V4cCgvYW5kcm9pZHxpcGFkfHBsYXlib29rfHNpbGsvaSlcbiAgICAgICAgfSxcbiAgICAgICAgZGV2aWNlczoge1xuICAgICAgICAgICAgbW9iaWxlOiAnbW9iaWxlJyxcbiAgICAgICAgICAgIHRhYmxldDogJ3RhYmxldCcsXG4gICAgICAgICAgICBkZXNrdG9wOiAnZGVza3RvcCdcbiAgICAgICAgfSxcbiAgICAgICAgZGVsaW1pdGVyOiB7XG4gICAgICAgICAgICBrZXk6ICcmJyxcbiAgICAgICAgICAgIHZhbDogJz0nXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gMy4gRlVOQ1RJT05TIE9CSkVDVFxuICAgIG5zLmZuID0ge1xuICAgICAgICAvKipcbiAgICAgICAgICogQGRlc2NyaXB0aW9uIEVxdWFsbHkgc2V0IGhlaWdodCBvbiBpdGVtc1xuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudHMgOiBqcXVlcnkgbGlzdFxuICAgICAgICAgKi9cbiAgICAgICAgZXF1YWxIZWlnaHQ6IGZ1bmN0aW9uKGVsZW1lbnRzKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSAkKGVsZW1lbnRzKSxcbiAgICAgICAgICAgICAgICBsZW4gPSBlbC5sZW5ndGggfHwgMCxcbiAgICAgICAgICAgICAgICBoZWlnaGVzdCA9IDA7XG5cbiAgICAgICAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGxlbi0tKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoID0gZWwuZXEobGVuKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaCA+IGhlaWdoZXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoZWlnaGVzdCA9IGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBlbC5vdXRlckhlaWdodChoZWlnaGVzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBkZXNjcmlwdGlvbiBDb252ZXJ0IGEgcXVlcnkgYWxpa2Ugc3RyaW5nIHRvIGFuIG9iamVjdCBsaXRlcmFsXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSBxcyA6IGEgcXVlcnkgc3RyaW5nIG9mIGtleSB2YWx1ZSBwYWlycyAod2l0aG91dCA/KVxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5RGVsaW1pdGVyIDogY2hhcmFjdGVyIGJldHdlZW4gdmFsdWVzIGFuZCBrZXlzXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSB2YWxEZWxpbWl0ZXIgOiBjaGFyYWN0ZXIgYmV0d2VlbiBrZXlzIGFuZCB2YWx1ZXNcbiAgICAgICAgICogQHJldHVybiB7T2JqZWN0fSBvYmogOiBvYmplY3QgbGl0ZXJhbCByZXByZXNlbnRpbmcgdGhlIHF1ZXJ5IHN0cmluZ1xuICAgICAgICAgKiBAZXhhbXBsZToga2V5MT12YWwxJmtleTI9dmFsMiZrZXkzPXZhbDNcbiAgICAgICAgICovXG4gICAgICAgIGNvbnZlcnRRc1RvTGl0ZXJhbDogZnVuY3Rpb24ocXMsIGtleURlbGltaXRlciwgdmFsRGVsaW1pdGVyKSB7XG4gICAgICAgICAgICB2YXIgYXJyUGFyYW1zLFxuICAgICAgICAgICAgICAgIG9iaiA9IHt9O1xuXG4gICAgICAgICAgICBpZiAocXMgJiYgcXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAga2V5RGVsaW1pdGVyID0ga2V5RGVsaW1pdGVyIHx8IGNmZy5kZWxpbWl0ZXIua2V5O1xuICAgICAgICAgICAgICAgIHZhbERlbGltaXRlciA9IHZhbERlbGltaXRlciB8fCBjZmcuZGVsaW1pdGVyLnZhbDtcbiAgICAgICAgICAgICAgICBhcnJQYXJhbXMgPSBxcy5zcGxpdChrZXlEZWxpbWl0ZXIpO1xuXG4gICAgICAgICAgICAgICAgJC5lYWNoKGFyclBhcmFtcywgZnVuY3Rpb24oaSwgcGFpcikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXJyUGFpciA9IHBhaXIuc3BsaXQodmFsRGVsaW1pdGVyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleSA9IGFyclBhaXJbMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBhcnJQYWlyWzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFN0cmluZ0Zyb21UaW1lOiBmdW5jdGlvbih0aW1lKSB7XG4gICAgICAgICAgICBsZXQgaG91cnMgPSB0aW1lLmhvdXJzICsgJyc7XG4gICAgICAgICAgICBob3VycyA9IGhvdXJzLmxlbmd0aCA9PT0gMSA/ICcwJyArIGhvdXJzIDogaG91cnM7XG5cbiAgICAgICAgICAgIGxldCBtaW51dGVzID0gdGltZS5taW51dGVzICsgJyc7XG4gICAgICAgICAgICBtaW51dGVzID0gbWludXRlcy5sZW5ndGggPT09IDEgPyAnMCcgKyBtaW51dGVzIDogbWludXRlcztcblxuICAgICAgICAgICAgcmV0dXJuIGhvdXJzICsgJzonICsgbWludXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0U3RyaW5nRnJvbVRpbWVTcGFuOiBmdW5jdGlvbih0aW1lUywgdGltZUUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0cmluZ0Zyb21UaW1lKHRpbWVTKSArICcgLSAnICsgdGhpcy5nZXRTdHJpbmdGcm9tVGltZSh0aW1lRSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFRpbWVTcGFuRnJvbVN0cmluZzogZnVuY3Rpb24odGltZVN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0cmluZ1NwbGl0ID0gdGltZVN0cmluZy5zcGxpdCgnOicpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBob3VyczogcGFyc2VJbnQoc3RyaW5nU3BsaXRbMF0pLFxuICAgICAgICAgICAgICAgIG1pbnV0ZXM6IHBhcnNlSW50KHN0cmluZ1NwbGl0WzFdKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGFyZVRpbWVPYmplY3RzOiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5ob3VycyA9PT0gYi5ob3VycyAmJiBhLm1pbnV0ZXMgPT09IGIubWludXRlcztcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0VGltZU9iamVjdEZyb21EYXRlOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhvdXJzOiBkYXRlLmdldEhvdXJzKCksXG4gICAgICAgICAgICAgICAgbWludXRlczogZGF0ZS5nZXRNaW51dGVzKCksXG4gICAgICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgY29udmVydERhdGVUb1llYXJNb250aERheTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGUuZ2V0RnVsbFllYXIoKSArICctJyArIChkYXRlLmdldE1vbnRoKCkgKyAxKSArICctJyArIGRhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICB9LFxuICAgICAgICBjb252ZXJ0VGltZU9iamVjdFRvRGF0ZTogZnVuY3Rpb24odGltZU9iamVjdCwgZGF0ZU9iamVjdCkge1xuICAgICAgICAgICAgbGV0IG5ld0RhdGUgPSBuZXcgRGF0ZShkYXRlT2JqZWN0LmdldFRpbWUoKSk7XG5cbiAgICAgICAgICAgIG5ld0RhdGUuc2V0SG91cnModGltZU9iamVjdC5ob3Vycyk7XG4gICAgICAgICAgICBuZXdEYXRlLnNldE1pbnV0ZXModGltZU9iamVjdC5taW51dGVzKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0U2Vjb25kcygwKTtcbiAgICAgICAgICAgIG5ld0RhdGUuc2V0TWlsbGlzZWNvbmRzKDApO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3RGF0ZTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcGFyZURhdGVGb3JTYW1lRGF5OiBmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICBpZiAoYS5nZXRGdWxsWWVhcigpID09PSBiLmdldEZ1bGxZZWFyKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYS5nZXRNb250aCgpID09PSBiLmdldE1vbnRoKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEuZ2V0RGF0ZSgpID09PSBiLmdldERhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0sXG4gICAgICAgIGRlbGV0ZU51bGxQcm9wZXJ0aWVzOiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIHByb3BlcnR5IGluIG9iamVjdCkge1xuICAgICAgICAgICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmplY3RbcHJvcGVydHldID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgb2JqZWN0W3Byb3BlcnR5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBvYmplY3Q7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbnZlcnRQYXJhbWV0ZXJzVG9PYmplY3Q6IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gICAgICAgICAgICB2YXIgdmFycyA9IHF1ZXJ5LnNwbGl0KCcmJyk7XG4gICAgICAgICAgICB2YXIgcXVlcnlfc3RyaW5nID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFpciA9IHZhcnNbaV0uc3BsaXQoJz0nKTtcbiAgICAgICAgICAgICAgICAvLyBJZiBmaXJzdCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcXVlcnlfc3RyaW5nW3BhaXJbMF1dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHNlY29uZCBlbnRyeSB3aXRoIHRoaXMgbmFtZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFyciA9IFtxdWVyeV9zdHJpbmdbcGFpclswXV0sIGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKV07XG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5X3N0cmluZ1twYWlyWzBdXSA9IGFycjtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhpcmQgb3IgbGF0ZXIgZW50cnkgd2l0aCB0aGlzIG5hbWVcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBxdWVyeV9zdHJpbmdbcGFpclswXV0ucHVzaChkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBxdWVyeV9zdHJpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIGdldFF1ZXJ5U3RyaW5nT2JqZWN0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBxdWVyeSA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29udmVydFBhcmFtZXRlcnNUb09iamVjdChxdWVyeSk7XG4gICAgICAgIH0sXG4gICAgICAgIGdvdG9EYXlPZldlZWs6IGZ1bmN0aW9uKGRhdGUsIGRheU9mV2Vlaykge1xuICAgICAgICAgICAgZGF0ZSA9IG5ldyBEYXRlKGRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICAgIGxldCBkYXRlRGF5ID0gZGF0ZS5nZXREYXkoKTtcblxuICAgICAgICAgICAgaWYgKGRheU9mV2VlayAhPT0gMCAmJiBkYXRlRGF5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gKDcgLSBkYXlPZldlZWspKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0ZURheSAhPT0gZGF5T2ZXZWVrKSB7XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXREYXRlKGRhdGUuZ2V0RGF0ZSgpIC0gZGF0ZURheSArIGRheU9mV2Vlayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkYXRlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIDQuIE5BTUVTUEFDRVxuICAgIHJldHVybiBucztcbn0pKHdpbmRvdy5qUXVlcnksIHdpbmRvdy5MdWJlIHx8IHt9KTtcbiIsIi8qKlxuICogQGF1dGhvciAgICAgICBbU3RlZiBDb2VuZW5dXG4gKiBAZGF0ZSAgICAgICAgIFsyMDE2XVxuICogQG5hbWVzcGFjZSAgICBbTHViZS52YWxpZGF0b3JdXG4gKiBAdHlwZSAgICAgICAgIFtGdW5jdGlvbnNdXG4gKiBAcmVxdWlyZXMgICAgIFtqUXVlcnksIEx1YmVdXG4gKiBAcmV2aXNpb24gICAgIFswLjFdXG4gKi9cblxuLy8gQHBhcmFtICgkKTogd2luZG93LmpRdWVyeVxuLy8gQHBhcmFtIChucyk6IHdpbmRvdy5MdWJlXG53aW5kb3cuTHViZSA9IChmdW5jdGlvbigkLCBucykge1xuICAgIC8vIDEuIEVDTUEtMjYyLzVcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICAvLyAyLiBDT05GSUdVUkFUSU9OXG4gICAgdmFyIGNmZyA9IHtcbiAgICAgICAgY2FjaGU6IHtcbiAgICAgICAgICAgIGZvcm1Hcm91cDogJy5mb3JtLWdyb3VwJ1xuICAgICAgICB9LFxuICAgICAgICBjbGFzc2VzOiB7XG4gICAgICAgICAgICBoYXNFcnJvcjogJ2lzLWludmFsaWQnLFxuICAgICAgICAgICAgaGFzU3VjY2VzczogJ2lzLXZhbGlkJ1xuICAgICAgICB9LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICByZXF1aXJlZDogJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgIHBhdHRlcm46ICdwYXR0ZXJuJyxcbiAgICAgICAgICAgIG1hdGNoOiAnbWF0Y2gnLFxuICAgICAgICAgICAgYWN0aW9uOiAnYWN0aW9uJyxcbiAgICAgICAgICAgIG5hbWU6ICduYW1lJ1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIDMuIEZVTkNUSU9OUyBPQkpFQ1RcbiAgICBucy52YWxpZGF0b3IgPSB7XG4gICAgICAgIHZhbGlkYXRlSW5wdXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgICAgICBsZXQgc2V0dGluZ3MgPSBjZmcsXG4gICAgICAgICAgICAgICAgZGF0YSA9IHNldHRpbmdzLmRhdGEsXG4gICAgICAgICAgICAgICAgY2FjaGUgPSBzZXR0aW5ncy5jYWNoZSxcbiAgICAgICAgICAgICAgICBjbGFzc2VzID0gc2V0dGluZ3MuY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBpbnB1dFZhbCA9IGlucHV0LnZhbCgpLFxuICAgICAgICAgICAgICAgIGZvcm1Hcm91cCA9IGlucHV0LmNsb3Nlc3QoY2FjaGUuZm9ybUdyb3VwKTtcblxuICAgICAgICAgICAgZm9ybUdyb3VwLnJlbW92ZUNsYXNzKGNsYXNzZXMuaGFzU3VjY2Vzcyk7XG4gICAgICAgICAgICBmb3JtR3JvdXAucmVtb3ZlQ2xhc3MoY2xhc3Nlcy5oYXNFcnJvcik7XG5cbiAgICAgICAgICAgIC8vIFJlcXVpcmVkIGNoZWNrXG4gICAgICAgICAgICBsZXQgcmVxdWlyZWQgPSBpbnB1dC5hdHRyKGRhdGEucmVxdWlyZWQpO1xuICAgICAgICAgICAgaWYgKHJlcXVpcmVkICYmICghaW5wdXRWYWwgfHwgaW5wdXRWYWwubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5hZGRDbGFzcyhjbGFzc2VzLmhhc0Vycm9yKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFBhdHRlcm4gY2hlY2tcbiAgICAgICAgICAgIGxldCBwYXR0ZXJuID0gaW5wdXQuYXR0cihkYXRhLnBhdHRlcm4pO1xuICAgICAgICAgICAgaWYgKHBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKHBhdHRlcm4pO1xuICAgICAgICAgICAgICAgIGlmICghcmVnZXgudGVzdChpbnB1dFZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybUdyb3VwLmFkZENsYXNzKGNsYXNzZXMuaGFzRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBNYXRjaCBjaGVja1xuICAgICAgICAgICAgbGV0IG1hdGNoID0gaW5wdXQuZGF0YShkYXRhLm1hdGNoKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGxldCBtYXRjaEVsZW1lbnQgPSAkKG1hdGNoKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5wdXRWYWwgIT09IG1hdGNoRWxlbWVudC52YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3JtR3JvdXAuYWRkQ2xhc3MoY2xhc3Nlcy5oYXNFcnJvcik7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvcm1Hcm91cC5hZGRDbGFzcyhjbGFzc2VzLmhhc1N1Y2Nlc3MpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gNC4gTkFNRVNQQUNFXG4gICAgcmV0dXJuIG5zO1xufSkod2luZG93LmpRdWVyeSwgd2luZG93Lkx1YmUgfHwge30pO1xuIiwiLyoqXG4gKiBbd2luZG93Lkx1YmVdXG4gKlxuICogQGF1dGhvciAgICAgICBbU3RlZiBDb2VuZW5dXG4gKiBAZGF0ZSAgICAgICAgIFsyMDE3XVxuICogQG5hbWVzcGFjZSAgICBbTHViZV1cbiAqIEByZXF1aXJlcyAgICAgW2pRdWVyeV1cbiAqIEByZXZpc2lvbiAgICAgWzAuMV1cbiAqL1xuXG53aW5kb3cuTHViZSA9IChmdW5jdGlvbiAoJCwgbnMpIHtcbiAgICAvLyAxLiBFQ01BLTI2Mi81XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gMi4gTE9BRCBDT01QT05FTlRTXG4gICAgbnMuY29tcG9uZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbnMuRG9tLmluaXQoKTtcbiAgICB9O1xuXG4gICAgLy8gMy4gTE9BRCBEQVRBQ09NUE9ORU5UU1xuICAgIG5zLmRhdGFDb21wb25lbnRJbml0aWFsaXplciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRhdGFDb21wb25lbnRzID0gJCgnW2RhdGEtY29tcG9uZW50XScpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFDb21wb25lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGF0YUNvbXBvbmVudCA9IGRhdGFDb21wb25lbnRzLmVxKGkpO1xuICAgICAgICAgICAgdmFyIGRhdGFBdHRyID0gZGF0YUNvbXBvbmVudC5kYXRhKCdjb21wb25lbnQnKTtcbiAgICAgICAgICAgIGRhdGFBdHRyID0gZGF0YUF0dHIuc3BsaXQoJy4nKTtcblxuICAgICAgICAgICAgaWYgKGRhdGFBdHRyLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBvbmVudEZ1bmN0aW9uID0gbnNbZGF0YUF0dHJbMV1dO1xuICAgICAgICAgICAgICAgIGlmIChjb21wb25lbnRGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBuZXcgY29tcG9uZW50RnVuY3Rpb24oZGF0YUNvbXBvbmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8vIDQuIE9OQ0UgVEhFIERPTSBJUyBSRUFEWVxuICAgICQoZnVuY3Rpb24gKCkge1xuICAgICAgICBucy5jb21wb25lbnRzKCk7XG4gICAgICAgIG5zLmRhdGFDb21wb25lbnRJbml0aWFsaXplcigpO1xuICAgIH0pO1xuXG4gICAgLy8gNS4gVFJJR0dFUiBMT0FEIEVWRU5UIE9OIE5TXG4gICAgLy8gVGhpcyBpcyByZXF1aXJlZCBhcyBvZiBqUXVlcnkgMy4wIGFzIGpRdWVyeSBubyBsb25nZXJcbiAgICAvLyAgIHN1cHBvcnRzIGxvYWQgZXZlbnQgYmluZGluZyBmb3JtIGluc2lkZSBhIHJlYWR5IGV2ZW50IGhhbmRsZXJcbiAgICAkKHdpbmRvdykub24oJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICQucmVhZHkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKG5zKS50cmlnZ2VyKCdsb2FkJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gLy8gNi4gUkVHSVNURVIgU1dcbiAgICAvLyBpZiAoJ3NlcnZpY2VXb3JrZXInIGluIG5hdmlnYXRvcikge1xuICAgIC8vICAgICAvLyBSZWdpc3RlciBhIHNlcnZpY2Ugd29ya2VyIGhvc3RlZCBhdCB0aGUgcm9vdCBvZiB0aGVcbiAgICAvLyAgICAgLy8gc2l0ZSB1c2luZyB0aGUgZGVmYXVsdCBzY29wZS5cbiAgICAvLyAgICAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcbiAgICAvLyAgICAgICAgIC5yZWdpc3RlcignL2FwcC9zdy5qcycpXG4gICAgLy8gICAgICAgICAudGhlbihmdW5jdGlvbihyZWdpc3RyYXRpb24pIHtcbiAgICAvLyAgICAgICAgICAgICBjb25zb2xlLmluZm8oJ1NlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbiBzdWNjZWVkZWQ6JywgcmVnaXN0cmF0aW9uKTtcbiAgICAvLyAgICAgICAgICAgICByZWdpc3RyYXRpb24udXBkYXRlKCk7XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgLy8gICAgICAgICAgICAgY29uc29sZS5pbmZvKCdTZXJ2aWNlIHdvcmtlciByZWdpc3RyYXRpb24gZmFpbGVkOicsIGVycm9yKTtcbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vIH0gZWxzZSB7XG4gICAgLy8gICAgIGNvbnNvbGUuaW5mbygnU2VydmljZSB3b3JrZXJzIGFyZSBub3Qgc3VwcG9ydGVkLicpO1xuICAgIC8vIH1cblxuICAgIC8vIDguIEdMT0JBTElaRSBOQU1FU1BBQ0VcbiAgICByZXR1cm4gbnM7XG59KSh3aW5kb3cualF1ZXJ5LCB3aW5kb3cuTHViZSB8fCB7fSk7XG4iXX0=
