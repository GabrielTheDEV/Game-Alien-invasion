const cenario = document.querySelector('.cenario')  // Cenario

const playerImg = document.querySelector('#player')  // imagem da nave
const alienImg = document.querySelectorAll('.alien')  // imagem dos aliens

//BOTÃO DE START  - Va para baixo para acessar a função startGame
const btnStart = document.querySelector('button')

let position_X  = 0  // posição horizontal
let position_Y = 0  // posição vertical

 // Score do jogo retorna quantas naves foram destruidas
let Score_AliensDestroyed = 0 

const rendeScore = setInterval( () =>{ 
    document.querySelector('#kill-point').innerText = Score_AliensDestroyed
}, 60)


const controls = () => {
    const key = { } // Rastreiar se a tecla foi ou não pressionada

    document.addEventListener('keydown', e => key[ e.keyCode ] = true )   
    document.addEventListener('keyup', e => key[ e.keyCode ] = false )

    const keyUP = 87  // Tecla W 
    const keyDOWN = 83 // Tecla S
    // const keyRIGHT = 68 // Tecla D
    // const keyLEFT = 65 // Tecla A
    const keyAttack = 74 // Tecla J

    const smoothPlayerMovement = () =>{
        // key [ keycode ] 
        if( key[keyUP]){
            position_Y-= 1 
        }
        // if( key[keyRIGHT]){
        //     position_X += 1
        // }
        if( key[keyDOWN]){
            position_Y +=1
        }
        // if( key[keyLEFT]){
        //     position_X -=1
        // }
        if( key[keyAttack] ){
            bullets()      
        }

        playerImg.style.top = position_Y +'%'  //Movimento vertical da nave.
        // playerImg.style.left = position_X +'%' //Movimento horizontal da nave .
    
        requestAnimationFrame( smoothPlayerMovement)
    } 
    smoothPlayerMovement()   
}

const aliens = () => {  
    const alien = document.createElement('div')
    alien.className = 'alien'   

    const random =  Math.floor(Math.random() * 81) + 5 // Retorna um número inteiro entre 10 e 90
    alien.style.top = random +'%'
        //console.log(random)

    cenario.appendChild(alien)
    moveAliens(alien)

    // checkPlayerCollision( playerImg , alien) 
}

const moveAliens = (obj) => {
   
    let i = 100
    const move_x = setInterval(() =>{
        i-= 1
        obj.style.left = i + '%'
       
        if (i === 0) {         
            clearInterval(move_x)
            obj.remove()
            console.log('saiu da area')
        }
        
    }, 60)
    
}

const bullets = () => {

    const bullet = document.createElement('div')
    bullet.className = 'balas'

    cenario.appendChild(bullet)
  
    bullet.style.left = position_X +'%'   
    bullet.style.top = position_Y + 7 + '%'

    const audio = ()=>{
        const shotAudio = document.createElement('audio')
            shotAudio.src = './audios/efeitos/shots.mp3'
            shotAudio.autoplay = true
            bullet.appendChild(shotAudio)

    }
    moveBullets(bullet)
    audio()

}               

const moveBullets = (obj) =>{

    // let PlayerPosition = playerImg.getBoundingClientRect().left
    let x = position_X

    const move = setInterval(()=>{
        x+=1
        obj.style.left = x + '%'

        if(x == 100){
            clearInterval(move) 
            obj.remove() 
        }
        else{
            const aliens = document.querySelectorAll('.alien');  
            aliens.forEach(alien => 
                checkBulletCollision(obj, alien)
                
            );  // Atribuindo a função de checar colição para cada alien gerado
        }

    }, 20)    
}

const checkPlayerCollision = (p , a) =>{
    
    if(!a) {return } // Verifica se bala ou alien existe

    const playerRect = p.getBoundingClientRect();
    const alienRect = a.getBoundingClientRect();
    
    const player_X = playerRect.left;
    const player_Y = playerRect.top;
    const playerWidth = playerRect.width;
    const playerHeight = playerRect.height;
     
    const alien_X = alienRect.left;
    const alien_Y = alienRect.top;
    const alienWidth = alienRect.width;
    const alienHeight = alienRect.height;

    // console.log('tudo certo')        

    // console.log(`player -> altura: ${playerHeight} largura: ${playerWidth} posição X : ${player_X} posição Y : ${player_Y}`)
    // console.log(`Alien -> altura: ${alienHeight} largura: ${alienWidth} posição X : ${alien_X} posição Y : ${alien_Y}`)

    if( player_X < alien_X + alienWidth && 
        player_X + playerWidth > alien_X &&
        player_Y < alien_Y + alienHeight &&
        player_Y + playerHeight > alien_Y
    ){
    gameOver()
            
    }
}

const checkBulletCollision = ( b, a )=>{
    

    if(!b || !a) {return } // Verifica se bala ou alien existe

    const bulletRect = b.getBoundingClientRect();
    const alienRect = a.getBoundingClientRect();

    const bullet_X = bulletRect.left;
    const bullet_Y = bulletRect.top;
    const bulletWidth = bulletRect.width;
    const bulletHeight = bulletRect.height;

    const alien_X = alienRect.left;
    const alien_Y = alienRect.top;
    const alienWidth = alienRect.width;
    const alienHeight = alienRect.height;

    // console.log(`Bullet -> altura: ${bulletHeight} largura: ${bulletWidth} posição X : ${bullet_X} posição Y : ${bullet_Y}`)
    // console.log(`Alien -> altura: ${alienHeight} largura: ${alienWidth} posição X : ${alien_X} posição Y : ${alien_Y}`)

    if( bullet_X < alien_X + alienWidth &&
        bullet_X + bulletWidth > alien_X &&
        bullet_Y < alien_Y + alienHeight &&
        bullet_Y + bulletHeight > alien_Y
    ){
        
        updateScore()
        a.remove()
        b.remove()
    }
}

const updateScore = () =>{ 

    const audio = () =>{
        const efeito = document.createElement('audio')  
        efeito.src = './audios/efeitos/coin.mp3'
        efeito.autoplay = true
        document.body.appendChild(efeito) 

        efeito.remove()
    }
    audio()

    Score_AliensDestroyed +=1
}

let gameRunning = false

btnStart.addEventListener('click' , startGame)
  
function startGame(){
    if(gameRunning){
        return 
    }

    gameRunning = true
    // console.log(gameRunning)

    btnStart.style.display = 'none' 

    const audioStart = () => {
        const instrumental = document.createElement('audio')
        instrumental.id = 'themeGame'
        instrumental.src = './audios/A Theme For Space (8bit music).mp3'
        instrumental.autoplay = true
        instrumental.loop = true
        document.body.appendChild(instrumental)

    }
    audioStart()
    controls()   // desbloqueia a movimentação 
    const spawn = setInterval(aliens, 1000)  // Gerador de aliens  
    
    const collisionCheckInterval = setInterval(() => {
        const aliens = document.querySelectorAll('.alien');
        aliens.forEach(alien => checkPlayerCollision(playerImg, alien));
    }, 100); // Verifica a colisão a cada 100 milissegundos
}

function gameOver(obj){

    gameRunning = false
    // console.log(gameRunning)

    btnStart.style.display = 'block'

    const audio = () =>{
        const instrumental = document.createElement('audio')
        instrumental.src = './audios/efeitos/gameOver.mp3'
        instrumental.autoplay = true

    }
    audio()
    const audioTheme = document.getElementById('themeGame')
    audioTheme.remove()
 
    
}




