'use strict'

{
    class Panel {
        constructor() {
            const section = document.createElement('section');
            section.classList.add('panel');

            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();

            this.timeoutId = undefined;

            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP';
            this.stop.classList.add('stop', 'inactive'); //classを追加
            this.stop.addEventListener('click', () => {
                if (this.stop.classList.contains('inactive')){
                    return;
                }
                this.stop.classList.add('inactive');

                clearTimeout(this.timeoutId);

                panelsLeft--;

                if (panelsLeft === 0) {
                    checkResult();
                    spin.classList.remove('inactive');
                    panelsLeft = 3;
                }
            });


            section.appendChild(this.img);//sectionの子要素としてimgを追加
            section.appendChild(this.stop);

            const main = document.querySelector('main');
            main.appendChild(section);
        }

        getRandomImage() {
            const images = [
                'img/daiki.png',
                'img/hirokami_new.jpg',
                'img/hoshino.png',
                'img/inoue.png',
                'img/kubota.jpg',
                'img/tatsumi.png',
                'img/ono.png',
                'img/ypp.png',
                'img/ypp2.jpg',
                'img/yokoo.png',
            ];
            //imagesのランダムの要素番号を返す
            //Math floor は最大の整数値を返す
            //Math random　は0以上1未満で浮動小数店の擬似乱数を返す
            return images[Math.floor(Math.random() * images.length)]
        }

        spin() {
            this.img.src = this.getRandomImage();
            this.timeoutId = setTimeout(() => {
                this.spin();
            }, 50);
        }

        isUnmatched(p1, p2) {
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src
        }

        unmatch() {
            this.img.classList.add('unmatched');
        }

        opacityReset() {
            this.img.classList.add('opacityReset');
        }

        activate() {
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');

        }
    }


    function checkResult() {
        if (panels[0].isUnmatched(panels[1], panels[2])) {
            panels[0].unmatch();
        }

        if (panels[1].isUnmatched(panels[0], panels[2])) {
            panels[1].unmatch();
        }

        if (panels[2].isUnmatched(panels[0], panels[1])) {
            panels[2].unmatch();
        }


    }

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    let panelsLeft = 3;


    const spin = document.getElementById('spin');
    spin.addEventListener('click', function () {
        if (spin.classList.contains('inactive')) {
            return;
        }
        spin.classList.add('inactive');
        panels.forEach(panel => {
            panel.activate();
            panel.spin();
        })
    })



}