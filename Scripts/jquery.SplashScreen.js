/*!
 * jQuery Splash Screen plugin
 * Version 1.00.0-2015.02.03
 * Requires jQuery
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 */


(function (window, document, undefined) {

    $.SplashScreen = function (options) {

        var settings = $.extend({
            id: 'splashscreen',
            desktop: true,
            mobile: true,
            forceLoader: false,
            queryParameter: 'loader',
            progressCount: false,
            progressCountId: 'status',
            progressBar: false,
            progressBarId: 'progress',
            timeOut: 2200
        }, options);

        function id(v) { return document.getElementById(v); }

        function loadSplashScreen() {

            var qstring = getQueryStringVars(window.location.href);

            if (settings.forceLoader) {
                settings.forceLoader = qstring[settings.queryParameter] != null
								&& qstring[settings.queryParameter] != ""
								&& (qstring[settings.queryParameter] == "true" ||
									qstring[settings.queryParameter] == "t" ||
									qstring[settings.queryParameter] == "1") ? true : false;
            }

            if (settings.mobile) {
                settings.mobile = $.DetectMobile() != null ? $.DetectMobile() : false;
            }

            if (settings.mobile || settings.desktop || settings.forceLoader) {

                var overly = id(settings.id),
				    img = document.images,
                    progCount = id(settings.progressCountId),
                    progBar = id(settings.progressBarId),
				    c = 0;
                totalImages = img.length;

                function imgLoaded() {
                    c += 1;

                    if (settings.progressBar) {
                        var percentage = ((100 / totalImages * c) << 0) + "%";
                        progBar.style.width = percentage;
                    }

                    if (settings.progressCount) {
                        progCount.innerHTML = "Loading " + percentage;
                    }

                    if (c === totalImages) {
                        setTimeout(function () { return pageLoadCompleted() }, settings.timeOut);
                    }
                }

                function pageLoadCompleted() {
                    overly.style.opacity = 0;
                    overly.style.display = "none";
                }

                for (var i = 0; i < totalImages; i++) {
                    var tImg = new Image();
                    tImg.onload = imgLoaded;
                    tImg.onerror = imgLoaded;
                    tImg.src = img[i].src;
                }
            }
            else {
                id(settings.id).style.display = "none";
            }
        }

        function getQueryStringVars(url) {
            var vars = [], hash;
            var hashes = url.slice(url.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        try {
            document.addEventListener('DOMContentLoaded', loadSplashScreen(), false);
        }
        catch (ex) {
            console.log(ex.message);
        }
    }

    //detecting mobile phone
    $.DetectMobile = function () {
        var isMobile = {
            Android: function () {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function () {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function () {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function () {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function () {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        return isMobile.any();
    }

})(window, document);
