window.Lube = (function ($, ns) {
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
                msViewportStyle.appendChild(
                    document.createTextNode('@-ms-viewport{width:auto!important}')
                );
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
})(window.jQuery, window.Lube || {});
