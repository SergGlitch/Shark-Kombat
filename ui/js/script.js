const tapEl = document.querySelector('.game-display-main-tap');
const walletEl = document.querySelector('#wallet');
const levelBarEl = document.querySelector('.level-bar-percent');
const coinsToLvlUpEl = document.querySelector('#coins-to-lvl-up');
const earnCoinPerHour = document.querySelector('#earn-per-hour');
const earnPerTap = document.querySelector('#earn-per-tap');
const energyId = document.querySelector('#energy');
const rankId = document.querySelector('#rank-id');
const rankLvl = document.querySelector('#rank-lvl');
const skinImg = document.querySelector('#hamster-lvl-skin');
//Создаем переменную без значения;

let frameId; 
let intervalId;


let data = {
    coin_per_tap:1,
    level:0,
    wallet:0,
    rank:{
    i:0,
    ranks:['None','Beta','Rock','Bronze','Silver','Platinum','Gold','Diamond','Titan','Plasma']},
    skins:[
            './ui/assets/shark_1.png',
            './ui/assets/shark_2.png',
            './ui/assets/shark_3.png',
            './ui/assets/shark_4.png',
            './ui/assets/shark_5.png',
            './ui/assets/shark_6.png',
            './ui/assets/shark_7.png',
            './ui/assets/shark_8.png',
            './ui/assets/shark_9.png',
            './ui/assets/shark_10.png',
        ],
    coin_per_sec:1,
    energy:500
};

function energyRecovery(){
    setInterval(()=>{
        if(data.energy<500){
            data.energy++
            energyId.innerHTML = data.energy;
        }
    },1000)
}

function createCoinUi(e){
    let x = e.clientX / 5; 
    let y = e.clientY / 5;
    

    console.log(e)
    let img = document.createElement('img'); // Создаем тег IMG 
    img.src = './ui/assets/rock.png'; // указываем путь до изображения
 
    img.classList.add('design-coin'); // Добавляем класс
   

    img.style.left = x + 'px';
    img.style.top = y + 'px';


    tapEl.appendChild(img);
    
    let timeout = setTimeout(()=>{
        img.remove();
    },1950)
}


function  earnCoinPerSec(){
   
    intervalId = setInterval(()=>{
               data.wallet += data.coin_per_sec;
               walletEl.innerHTML=data.wallet;
    },1000)
      
 
}




function levelUp(){
    data.level>=1000? data.level = 0: data.level++;
    if(data.level>=1000){
        data.level = 0
        data.rank.i++;
        data.coin_per_tap++
        rankId.innerHTML = data.rank.ranks[data.rank.i],
        rankLvl.innerHTML = data.rank.i + 1;
        skinImg.src = data.skins[data.rank.i]
    }else{
        data.level++
    }
    levelBarEl.style.width = data.level + '%';

}


function handleTap(e){ 
     createCoinUi(e);
     levelUp()
     data.energy -= 1;
     energyId.innerHTML = data.energy;
     data.wallet += data.coin_per_tap; //Прибавляем к кошельку 1 монету += добавить к текущему значению
     walletEl.innerHTML=data.wallet;   //Обновляем значение кошелька
}


function update(){
    if(!intervalId){
        earnCoinPerSec()
        energyRecovery()
        console.log('Start')
    };

    if(data.level>=1000){}
}

function renderGame(){
  
    update();
    frameId = requestAnimationFrame(renderGame);
    
}




tapEl.addEventListener('click',(e)=>{
   // объект event - это объект события
   handleTap(e);

})





//Запуск рендера
renderGame();