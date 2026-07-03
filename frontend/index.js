const screens = document.querySelectorAll('.screen');

function showScreen(screenId){
    screens.forEach((screen) => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

const verifyBtn =
document.getElementById('verifyBtn');

const nameInput =
document.getElementById('nameInput');

const verifyMessage =
document.getElementById('verifyMessage');

// const Name = "XYZ"; // Replace with your desired name

verifyBtn.addEventListener("click", async () => {

    const enteredName =
    nameInput.value.trim();

    try{

        const response = await fetch("/verify",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                name:enteredName

            })

        });

        const data = await response.json();

        if(data.success){

            verifyMessage.textContent =
            "💖 Access Granted My Friend 💖";

            bgMusic.src = "/music/bgMusic.mp3";

bgMusic.load();

bgMusic.play();

            musicToggle.style.display = "block";

            setTimeout(()=>{

                showScreen("countdown");

                startCountdown();

            },1500);

        }else{

            verifyMessage.textContent =
            "😜 This surprise is only for someone special ❤️";

        }

    }catch(err){

        console.error(err);

        verifyMessage.textContent =
        "⚠️ Server Error";

    }

});

const countElement = document.getElementById('count');

function startCountdown() {
    let count = 3;
    
    countElement.textContent = count;

    const interval = setInterval(() => {
        count--;
        
        if(count > 0){
            countElement.textContent = count;
        } else {
            countElement.textContent = "🎉";
            clearInterval(interval);

            setTimeout(() => {
                showScreen('introScreen');
            }, 1000);
        }
    }, 1000);
}

const memories = [
{
    image:"gallery/img1.jpg",
    text:"❤️ The Day when I Met You after along time  ❤️"
},
{
    image:"/gallery/img2.jpg",
    text:"😊 Seating Together 😊"
},
{
    image:"/gallery/img3.jpg",
    text:"💖 A Beautiful Memory 💖"
},
{
    image:"/gallery/img4.jpg",
    text:"🌹 Forever Special 🌹"
},

];

const slideshowImage =
document.getElementById('slideshowImage');

const caption =
document.getElementById('caption');

let slideshowStarted = false;
let slideshowInterval;

function startSlideshow(){

    let current = 0;
    galleryNext.style.display = "none";

    slideshowImage.src =
    memories[0].image;

    caption.textContent =
    memories[0].text;

    slideshowImage.classList.add('zoom');

    slideshowInterval = setInterval(() => { 

        slideshowImage.classList.add('fade-out');

        setTimeout(() => {

            current++;

if(current >= memories.length){

    clearInterval(slideshowInterval);

   galleryNext.style.display = "inline-block";

setTimeout(()=>{

    galleryNext.classList.add("show");

},50);

    return;

}

            slideshowImage.src =
            memories[current].image;

            caption.textContent =
            memories[current].text;

            slideshowImage.classList.remove('fade-out');

            slideshowImage.classList.remove('zoom');

            void slideshowImage.offsetWidth;

            slideshowImage.classList.add('zoom');

        },500);

    },4000);

}

const nextIntroBtn =
document.getElementById('nextIntroBtn');

nextIntroBtn.addEventListener('click', () => {

    showScreen('giftScreen');

});

const giftBox = document.getElementById('giftBox');

giftBox.addEventListener('click' , () => {

    giftBox.textContent = '💖';

    confetti({
        particleCount: 200,
        spread: 120,
        origin:{y:0.6}
    });

    setTimeout(() => {

        confetti({
            particleCount:100,
            spread:180
        });

    },500);

   setTimeout(() => {

    showScreen('gallery');

    if(!slideshowStarted){
        startSlideshow();
        slideshowStarted = true;
    }

},2000);

});

const galleryNext = document.getElementById('galleryNext');
galleryNext.style.display = "none";
galleryNext.classList.remove("show");

galleryNext.addEventListener('click', () => {
    showScreen('quiz');
});

const quizBtns = document.querySelectorAll('.quizBtn');

quizBtns.forEach((btn) => {

    btn.addEventListener('click', () => {

        alert('Correct Answer 😂❤️');

        setTimeout(() => {
            showScreen('cakeScreen');
        }, 500);

    });

});

const flame = document.getElementById("flame");
const cake = document.getElementById("cake");
const cutCake = document.getElementById("cutCake");
const cakePiece =
document.getElementById("cakePiece");
const biteMessage =
document.getElementById("biteMessage");

const blowCandle = document.getElementById('blowCandle');

blowCandle.addEventListener("click",()=>{

    // Flame smoke banegi
    flame.innerHTML = "💨";

    // Blow button hide
    blowCandle.style.display = "none";

    setTimeout(()=>{

        // Smoke bhi gayab
        flame.style.display = "none";

        // Cut Cake button show
        cutCake.style.display = "inline-block";

    },1000);

});

cutCake.addEventListener("click",()=>{

    cake.classList.add("cut");

    // Cake 2 pieces
    cake.innerHTML="🍰 🍰";

    // Flying piece
    cakePiece.classList.add("show");

    setTimeout(()=>{

    biteMessage.classList.add("show");
    setTimeout(()=>{

    confetti({
        particleCount:100,
        spread:120
    });

},1800);

},1200);

    setTimeout(()=>{

    cakePiece.classList.remove("show");

    biteMessage.classList.remove("show");

},2500);

    setTimeout(()=>{

        showScreen("gameScreen");

        startGame();


    },3000);

});

const heart = document.getElementById('heart');
const gameArea = document.getElementById('gameArea');

const scoreElement =
document.getElementById('score');

const timerElement =
document.getElementById('timer');

let score = 0;
let timeLeft = 30;
let gameInterval;

function moveHeart(){

    const maxX =
gameArea.clientWidth -
heart.offsetWidth;

const maxY =


gameArea.clientHeight -
heart.offsetHeight;

    const randomX =
    Math.floor(Math.random() * maxX);

    const randomY =
    Math.floor(Math.random() * maxY);

    heart.style.left =
    `${randomX}px`;

    heart.style.top =
    `${randomY}px`;
}

heart.addEventListener('click', () => {

    score++;

    scoreElement.textContent =
    `Score: ${score}`;

   setTimeout(() => {
    moveHeart();
}, 200);

    if(score >= 15){

        clearInterval(gameInterval);

        alert(
            '🎉 You Won! Gift Unlocked!'
        );

        setTimeout(() => {

            showScreen('puzzleScreen');

        },1000);

    }

});

function startGame(){

    clearInterval(gameInterval);

    score = 0;
    timeLeft = 30;

    scoreElement.textContent =
    'Score: 0';

    timerElement.textContent =
    'Time: 30';

    moveHeart();

    gameInterval =
    setInterval(() => {

        timeLeft--;

        timerElement.textContent =
        `Time: ${timeLeft}`;

        if(timeLeft <= 0){

            clearInterval(
                gameInterval
            );

            if(score < 15){

                alert(
                    '😢 Time Khatam hogya! Try Again '
                );

                startGame();
            }
        }

    },1000);
}

const wheel =
document.getElementById('wheel');

const spinBtn = document.getElementById('spinBtn');
const wheelResult = document.getElementById('wheelResult');

const prizes = [
    "🍫 Chocolate",
    "💖 Special Message",
    "🎁 Surprise Gift",
    "🌟 Best Friend Award"
];

let currentRotation = 0;

spinBtn.addEventListener('click', () => {

    spinBtn.disabled = true;

    wheelResult.textContent =
    "🎡 Spinning...";

    const randomIndex = 2;
    

    const segmentAngle = 90;

    const targetAngle =
    randomIndex * segmentAngle;

    const finalRotation =
    (360 * 5) +
    (360 - targetAngle);

    currentRotation += finalRotation;

    wheel.style.transform =
    `rotate(${currentRotation}deg)`;

    setTimeout(() => {

        wheelResult.textContent =
        `🎉 ${prizes[randomIndex]}`;

        spinBtn.disabled = false;

        if(
            prizes[randomIndex]
            === "🎁 Surprise Gift"
        ){

            setTimeout(() => {
                showScreen('giftReveal');
            },1500);

        }

    },5000);

});

const typingText = document.getElementById('typingText');

const message =
`  Happy Birthday Dear Friend ❤️

Thank You For Being Such An Amazing My Best Friend.

May Your Day Be Filled With Happiness,
Laughter And Lots Of Beautiful Memories.
Thank You For Being Such An Amazing Friend.

Stay Happy,
Stay Blessed,
And Keep Smiling Always 😊💖`;

const cursor =
document.createElement('span');

cursor.classList.add('cursor');

cursor.textContent = "|";

function startTyping() {

    typingText.innerHTML = "";

    let index = 0;

    typingText.appendChild(cursor);

    const typingInterval = setInterval(() => {

        if(index < message.length){

            cursor.insertAdjacentText(
                'beforebegin',
                message.charAt(index)
            );

            index++;

        }else{

            clearInterval(typingInterval);

            startLoveMeter();

        }

    },50);

}

const loveFill =
document.getElementById('loveFill');

const lovePercent =
document.getElementById('lovePercent');

const roseScene =
document.getElementById("roseScene");

function startLoveMeter(){

    let percent = 0;

    const loveInterval =
    setInterval(() => {

        percent++;

        loveFill.style.width =
        `${percent}%`;

        lovePercent.textContent =
        `❤️ Friendship Meter: ${percent}%`;

        if(percent >= 100){

    clearInterval(
        loveInterval
    );

    // Main Blast
    confetti({
        particleCount:120,
        spread:360,
        origin:{ y:0.6 }
    });

    roseScene.classList.add("show");

setTimeout(()=>{

    roseScene.classList.remove("show");

    document
    .getElementById("grandFinale")
    .style.display="block";

},4000);

    // Extra Blasts
    setTimeout(() => {

        confetti({
            particleCount:60,
            spread:180
        });

    },800);

    setTimeout(() => {

        confetti({
            particleCount:200,
            spread:180
        });

    },1600);

}


    },40);

}

const openGiftBtn =
document.getElementById('openGiftBtn');

openGiftBtn.addEventListener('click', () => {

    showScreen('letterScreen');

});

const envelope =
document.getElementById('envelope');

const letterContent =
document.getElementById('letterContent');

const letterNextBtn =
document.getElementById('letterNextBtn');

envelope.addEventListener('click',()=>{

    envelope.classList.add("open");

    setTimeout(()=>{

        letterContent.classList.add("show");

    },700);

});

letterNextBtn.addEventListener('click',()=>{

    showScreen('finalScreen');

    startTyping(); 

    startBalloons();



});

const birthDate = new Date("2000-01-01");

function updateBirthdayCounter(){

    const now = new Date();

    const diff = now - birthDate;

    const years =
    Math.floor(
        diff /
        (1000*60*60*24*365.25)
    );

    const days =
    Math.floor(
        diff /
        (1000*60*60*24)
    );

    const hours =
    Math.floor(
        diff /
        (1000*60*60)
    );

    const seconds =
    Math.floor(diff/1000);

    document.getElementById('years').textContent =
    `✨ ${years} Years`;

    document.getElementById('days').textContent =
    `✨ ${days.toLocaleString()} Days`;

    document.getElementById('hours').textContent =
    `✨ ${hours.toLocaleString()} Hours`;

    document.getElementById('seconds').textContent =
    `✨ ${seconds.toLocaleString()} Seconds`;
}

updateBirthdayCounter();

setInterval(
    updateBirthdayCounter,
    1000
);

showScreen('welcome');

setInterval(() => {

    const heart = document.createElement('div');

    heart.classList.add('floating-heart');
    heart.innerHTML = '💖';

    heart.style.left =
    Math.random() * 100 + 'vw';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 6000);

}, 1500);

const bgMusic =
document.getElementById('bgMusic');

const musicToggle =
document.getElementById('musicToggle');


musicToggle.addEventListener('click',()=>{ 

    if(bgMusic.paused){

        bgMusic.play();

        musicToggle.textContent =
        "🔊 Music ON";

    }else{

        bgMusic.pause();

        musicToggle.textContent =
        "🔇 Music OFF";

    }

});
const replayBtn =
document.getElementById('replayBtn');

replayBtn.addEventListener("click", async()=>{

    await fetch("/logout",{

        method:"POST"

    });

    location.reload();

});

const balloonContainer =
document.getElementById("balloonContainer");

const balloons = [
    "🎈",
    "🎉",
    "💖",
    "🌹",
    "✨"
];

let balloonStarted = false;
let balloonInterval;

function startBalloons(){

    if(balloonStarted) return;

    balloonStarted = true;

    balloonInterval = setInterval(()=>{

        const balloon =
        document.createElement("div");

        balloon.classList.add("balloon");

        balloon.innerHTML =
        balloons[ 
            Math.floor(
                Math.random() *
                balloons.length
            )
        ];

        balloon.style.left =
        Math.random()*100 + "vw";

        balloon.style.animationDuration =
        (4 + Math.random()*3) + "s";

        balloonContainer.appendChild(balloon);

        setTimeout(()=>{

            balloon.remove();

        },7000);

    },500);

}


const puzzleSuccess =
document.getElementById("puzzleSuccess");


const leftHeart =
document.getElementById("leftHeart");

const rightHeart =
document.getElementById("rightHeart");

const svgPuzzle =
document.getElementById("svgPuzzle");

let isDragging = false;

rightHeart.addEventListener("mousedown", () => {

    isDragging = true;

    rightHeart.classList.add("dragging");

});

rightHeart.addEventListener("touchstart", () => {

    isDragging = true;

    rightHeart.classList.add("dragging");

});

document.addEventListener("mouseup", () => {

    isDragging = false;

    rightHeart.classList.remove("dragging");

});

document.addEventListener("touchend",()=>{

    isDragging = false;

    rightHeart.classList.remove("dragging");

});


document.addEventListener("mousemove",(e)=>{

    if(!isDragging) return;

    const area =
    document
    .getElementById("svgPuzzle");

    const rect =
    area.getBoundingClientRect();

    let x =
    e.clientX - rect.left - 70;

    let y =
    e.clientY - rect.top - 70;

    rightHeart.style.left =
    x + "px";

    rightHeart.style.top =
    y + "px";

    checkHeartJoin();

});

document.addEventListener("touchmove",(e)=>{

    if(!isDragging) return;

    const rect =
    svgPuzzle.getBoundingClientRect();

    const touch =
    e.touches[0];

    let x =
    touch.clientX - rect.left - 70;

    let y =
    touch.clientY - rect.top - 70;

    rightHeart.style.left = x + "px";
    rightHeart.style.top = y + "px";

    checkHeartJoin();

});

function checkHeartJoin(){

    const left =
    leftHeart.getBoundingClientRect();

    const right =
    rightHeart.getBoundingClientRect();

    const dx =
    (left.left + left.width/2) -
    (right.left + right.width/2);

    const dy =
    (left.top + left.height/2) -
    (right.top + right.height/2);

    const distance =
    Math.sqrt(dx*dx + dy*dy);

    // Magnet starts
    if(distance < 140){

        rightHeart.style.transform =
        "scale(1.08)";

    }
    else{
    rightHeart.style.transform = "scale(1)";
}

    if(distance < 70){

        isDragging = false;

        rightHeart.classList.remove("dragging");

       leftHeart.style.display = "none";
rightHeart.style.display = "none";

const fullHeart =
document.getElementById("fullHeart");

fullHeart.style.opacity = "1";
fullHeart.classList.add("heartbeat");
fullHeart.style.transform =
"translate(-50%,-50%) scale(1.2)";

        puzzleSuccess.style.opacity = "1";

        confetti({

            particleCount:180,

            spread:140

        });

        setTimeout(()=>{
            showScreen("bouquetScreen");
            startBouquetScene();

        },1800);

    }

}

const bouquet =
document.getElementById("bouquet");

const bouquetMessage =
document.getElementById("bouquetMessage");

const roseText =
document.querySelector(".rose-text");

const acceptRose =
document.getElementById("acceptRose");

function startBouquetScene(){

    bouquet.classList.remove("show");
    bouquetMessage.classList.remove("show");
    roseText.classList.remove("show");
    acceptRose.classList.remove("show");

    setTimeout(()=>{

        bouquet.classList.add("show");

    },100);

    setTimeout(()=>{

        bouquetMessage.classList.add("show");

    },1100);

    setTimeout(()=>{

        roseText.classList.add("show");

    },1900);

    setTimeout(()=>{

        acceptRose.classList.add("show");

    },2700);

}

acceptRose.addEventListener("click",()=>{

    confetti({

        particleCount:120,
        spread:120

    });

    setTimeout(()=>{

        showScreen("wheelScreen");

    },700);

});

