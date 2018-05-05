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
window.Lube = (function($, ns) {
    // 1. ECMA-262/5
    'use strict';

    // 2. CONFIGURATION
    var cfg = {
        patterns: {
            mobile: new RegExp(
                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i
            ),
            mobile2: new RegExp(
                /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/
            ),
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
        equalHeight: function(elements) {
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
        convertQsToLiteral: function(qs, keyDelimiter, valDelimiter) {
            var arrParams,
                obj = {};

            if (qs && qs.length) {
                keyDelimiter = keyDelimiter || cfg.delimiter.key;
                valDelimiter = valDelimiter || cfg.delimiter.val;
                arrParams = qs.split(keyDelimiter);

                $.each(arrParams, function(i, pair) {
                    var arrPair = pair.split(valDelimiter),
                        key = arrPair[0],
                        val = arrPair[1];

                    obj[key] = val;
                });
            }

            return obj;
        },

        getStringFromTime: function(time) {
            let hours = time.hours + '';
            hours = hours.length === 1 ? '0' + hours : hours;

            let minutes = time.minutes + '';
            minutes = minutes.length === 1 ? '0' + minutes : minutes;

            return hours + ':' + minutes;
        },
        getStringFromTimeSpan: function(timeS, timeE) {
            return this.getStringFromTime(timeS) + ' - ' + this.getStringFromTime(timeE);
        },
        getTimeSpanFromString: function(timeString) {
            let stringSplit = timeString.split(':');
            return {
                hours: parseInt(stringSplit[0]),
                minutes: parseInt(stringSplit[1])
            };
        },
        compareTimeObjects: function(a, b) {
            return a.hours === b.hours && a.minutes === b.minutes;
        },
        getTimeObjectFromDate: function(date) {
            return {
                hours: date.getHours(),
                minutes: date.getMinutes(),
                date: date
            };
        },
        convertDateToYearMonthDay: function(date) {
            return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        },
        convertTimeObjectToDate: function(timeObject, dateObject) {
            let newDate = new Date(dateObject.getTime());

            newDate.setHours(timeObject.hours);
            newDate.setMinutes(timeObject.minutes);
            newDate.setSeconds(0);
            newDate.setMilliseconds(0);

            return newDate;
        },
        compareDateForSameDay: function(a, b) {
            if (a.getFullYear() === b.getFullYear()) {
                if (a.getMonth() === b.getMonth()) {
                    if (a.getDate() === b.getDate()) {
                        return true;
                    }
                }
            }
            return false;
        },
        deleteNullProperties: function(object) {
            for (var property in object) {
                if (object.hasOwnProperty(property)) {
                    if (object[property] === null) {
                        delete object[property];
                    }
                }
            }
            return object;
        },
        convertParametersToObject: function(query) {
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
        getQueryStringObject: function() {
            let query = window.location.search.substring(1);
            return this.convertParametersToObject(query);
        },
        gotoDayOfWeek: function(date, dayOfWeek) {
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
})(window.jQuery, window.Lube || {});
