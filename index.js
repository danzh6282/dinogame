const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 600;

var img_dino_list = [];
var img_back = new Image();
var img_cactus = new Image();
for (i = 1; i < 9; i++) {
    var img_dino = new Image();
    img_dino.src = 'img/Eevee' + i + '.png';
    img_dino_list.push(img_dino);
}
img_back.src = 'img/background.jpg'
img_cactus.src = 'img/cactus.png'

var dino = {
    x: 50,
    y: canvas.height - 150,
    width: 100,
    height: 100,
    index: 0,
    draw() {
        if (jump === false) {
            if (frame % 10 == 0) {
                this.index = (this.index + 1) % 8;
            }
            ctx.drawImage(img_dino_list[this.index], this.x, this.y, this.width, this.height)
        }
        else{
            ctx.drawImage(img_dino_list[3], this.x, this.y, this.width, this.height)
        }

    }
}

class Cactus {
    constructor() {
        this.x = canvas.width;
        this.y = canvas.height - 150;
        this.width = 100;
        this.height = 100;
    }
    draw() {

        ctx.drawImage(img_cactus, this.x, this.y, this.width, this.height)
    }
}

var jump = false;
var jump_cactus = false;
var step = -4;
var step_cactus = -4;
var frame = 0;
var cactus_list = [];
var animation;

function play() {
    animation = requestAnimationFrame(play);
    frame += 1;
    ctx.font = '30px Arial';
    ctx.fillStle = 'black';
    ctx.textAlign = 'center';

    if (frame % 240 == 1) {
        var cactus = new Cactus();
        cactus_list.push(cactus);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img_back, 0, 0, canvas.width, canvas.height)
    ctx.fillText("점수 : " + frame, canvas.width - 100, 100);

    cactus_list.forEach((a, i, o) => {
        if (a.x < -a.width) {
            o.splice(i, 1);
        }
        a.x -= 3;
        a.draw();
        collision(dino, a);
        if (jump_cactus === true){
            a.y += step_cactus;
            if (a.y <= 300){
                step_cactus *= -1
            }
            if(a.y === 450){
                jump_cactus = false
                step_cactus *= -1;
            }
        }
    })

    if (jump === true) {
        dino.y += step;
        if (dino.y <= 300) {
            step *= -1;
        }
        if (dino.y === 450) {
            jump = false;
            step *= -1;
        }
    }

    dino.draw();
}

play()

document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jump = true;
    }
    if (e.code === 'ArrowLeft'){
        dino.x -= 8
    }
    if (e.code === 'ArrowRight'){
        dino.x += 8
    }
    if (e.code === 'ArrowDown'){
        dino.y = canvas.height - 150
        jump = false
    }
})

function collision(dino, cactus) {
    ctx.font = '30px Arial';
    ctx.fillStle = 'red';
    ctx.textAlign = 'center';
    var x_len = cactus.x - (dino.x + dino.width);
    var y_len = cactus.y - (dino.y + dino.height);
    var y_len_2 = dino.y - (cactus.y + cactus.height);

    if (x_len < 20){
        var random = Math.floor(Math.random()*100 + 1);
        if(random == 5){
            jump_cactus = true
        }
    }

    if ((cactus.x > 50 && x_len < -50) && (y_len_2 < -50 && y_len < -50)) {
        ctx.fillText("Game Over!!!", canvas.width / 2, canvas.height / 2);
        cancelAnimationFrame(animation);
    }
}