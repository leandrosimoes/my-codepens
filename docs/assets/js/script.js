'use strict';

(function () {
    var articles = document.getElementsByTagName('article');
    for (var i = 0; i < articles.length; i++) {
        var element = articles[i];
        element.addEventListener('click', function (event) {
            var t = event.target;
            if (!!t && !!t.dataset && !!t.dataset.url) {
                window.open(t.dataset.url, '_blank');
            } else {
                console.log('no data-url found');
            }
        });
    }
})();