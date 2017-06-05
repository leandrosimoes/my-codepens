(() => {
    let articles = document.getElementsByTagName('article');
    for (let i = 0; i < articles.length; i++) {
        let element = articles[i];
        element.addEventListener('click', (event) => {
            let t = event.target;
            if(!!t && !!t.dataset && !!t.dataset.url) {
                window.open(t.dataset.url, '_blank');
            } else {
                console.log('no data-url found');
            }
        });        
    }
})();