window.addEventListener('load', () => {

    /* Анимация боковых фигур */
    let bg1 = document.getElementById('bg1');
    let bg1__wrap = document.querySelector('.bg1__wrap');
    let wrap_anim_el_left = document.querySelectorAll('.wrap_anim_el_left div');
    let wrap_anim_el_right = document.querySelectorAll('.wrap_anim_el_right div');
    setTimeout(() => startAnimate(wrap_anim_el_left), 5000);
    setTimeout(() => startAnimate(wrap_anim_el_right), 8000);

    function startAnimate(el_container) {
        let img_parent_width = bg1.naturalWidth - (bg1.naturalWidth - bg1.clientWidth);
        let img_parent_height = bg1.naturalHeight - (bg1.naturalHeight - bg1.clientHeight);
        /*console.log(bg1.naturalWidth);
        console.log(bg1.clientWidth);
        console.log(window.getComputedStyle(bg1).left);
        console.log(window.getComputedStyle(bg1).width);*/
        el_container.forEach(item => {
            item.style.backgroundSize = `${img_parent_width}px ${img_parent_height}px`;
            let rect = item.getBoundingClientRect();
            item.style.backgroundPositionX = '-' + rect.left + 'px';
            item.style.backgroundPositionY = '-' + rect.top + 'px';
        });
    }

    // Меня бэк на фигурах по ресайзу
    let screen_width = window.innerWidth
    window.addEventListener('resize', (e) => {
        let res = screen_width - e.target.innerWidth
        if (res > 100) {
            setTimeout(() => startAnimate(wrap_anim_el_left), 500);
            setTimeout(() => startAnimate(wrap_anim_el_right), 500);
        }
        if (res < -100) {
            setTimeout(() => startAnimate(wrap_anim_el_left), 1000);
            setTimeout(() => startAnimate(wrap_anim_el_right), 1000);
        }
    })

    /* Анимация текста */
    let header = document.querySelector('#header path');
    startAnimateText()
    function startAnimateText() {
        let i = 0
        let idInterval = setInterval(() => {
            if (i < 870) {
                i += 3;
                header.style.strokeDasharray = `${i}px`;
            } else {
                header.style.strokeDasharray = `870px`;
                clearInterval(idInterval);
                backAnimateText()
            }
        }, 50)
    }

    //console.log(header.getTotalLength()); // 10256.8759765625 Длина всей записи
    // 810px stroke-dasharray заполнение
    // stroke-dashoffset просто бегают туда сюда

    function backAnimateText() {
        let i = 870
        let idInterval = setInterval(() => {
            if (i > 100) {
                i -= 3;
                header.style.strokeDasharray = `${i}px`;
            } else {
                header.style.strokeDasharray = `100px`;
                clearInterval(idInterval);
                startAnimateText();
            }
        }, 50);
    }
});