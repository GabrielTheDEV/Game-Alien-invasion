const cenario = document.querySelector('.cenario')
const AtkArea = document.querySelector('#playerAttackArea')
const playerImg = document.querySelector('#player')
const alienImg = document.querySelector('.alien')

const checkBoxBullet = document.querySelector('#checkBoxBullet')
const btnStart = document.querySelector('button')


const controls = () => {

    const keyUP = 87  // Tecla W 
    const keyDOWN = 83 // Tecla S
    const keyRIGHT = 68 // Tecla D
    const keyLEFT = 65 // Tecla A
    const keyAttack = 74 // Tecla J
    
    let x  = 0
    let y = 0
    document.addEventListener('keydown', (e) =>{
    capture: true
    let key = e.keyCode 
        //alert(key)

        switch( key ){
            case keyUP :y-=4  
                break
            case keyRIGHT :x+=4  
                break
            case keyDOWN :y+=4 
                break
            case keyLEFT :x-=4 
                break
            case keyAttack:  player.attack() 
        }   
        AtkArea.style.top = y +'%'  //Movimento vertical da nave.
        AtkArea.style.left = x +'%' //Movimento horizontal da nave .
    })  
}

const player = {

    dano: 1,
    attack(){
       return bullets()  
    }

}

const aliens = () => {  

    const alien = document.createElement('div')
    alien.className = 'alien'   

    const random =  Math.floor(Math.random() * 81) + 5 // Retorna um número inteiro entre 10 e 90
    alien.style.top = random +'%'
        //console.log(random)

    cenario.appendChild(alien)
    moveAliens(alien)

    const bullet = document.querySelector('.balas')
    checkBulletCollision(bullet, alien) 

}

const moveAliens = (obj) => {
   
    let i = 100
    const move_x = setInterval(() =>{

        i-= 1
        obj.style.left = i + '%'
        if (i == 0) {         
            clearInterval(move_x)
            obj.remove()
        }    


    }, 60)

}

const bullets = () => {

    const bullet = document.createElement('div')
    bullet.className = 'balas'
    AtkArea.appendChild(bullet)

    const shotAudio = document.createElement('audio')
    shotAudio.src = './audios/efeitos/shots.mp3'
    shotAudio.autoplay = true

    bullet.appendChild(shotAudio)

    moveBullets(bullet)

    const aliens = document.querySelector('.alien')

    checkBulletCollision(bullet, aliens) 
        

}

const moveBullets = (obj) =>{
    let x =0
    const move = setInterval(()=>{
        x++
        obj.style.left = x + '%'

        if(x == 100){
            clearInterval(move)
            obj.remove() 

        }

    }, 20)    

}

const checkBulletCollision = ( b, a )=>{

    const bulletLength = b.getBoundingClientRect()
    const aliensLength = a.getBoundingClientRect()
    let vidas = 0

    if( bulletLength.left < aliensLength.right ||
        bulletLength.right > aliensLength.left ||
        bulletLength.top < aliensLength.bottom ||
        bulletLength.bottom > aliensLength.top
    ){
      vidas--
        
        updateScore()
        console.log(vidas)
        a.remove()

    }
   
 
}


const $_Score = (a) =>{


    const kills = []

    function addPoint(arr, point){

        arr.push(point)

        const audio = () =>{
            const efeito = document.createElement('audio')  
            efeito.src = './audios/efeitos/coin.mp3'
            efeito.autoplay = true
            document.body.appendChild(efeito)
            //alert('audio Ok')
            efeito.remove()
        }
        audio()
        

    }
    addPoint(kills, a)
    const killScore = document.querySelector('#kill-point').innerText = kills                  // <--- INCOMPLETO !!!
        
   
} 
$_Score(0)


function updateScore(){
    
    $_Score(1)
    
}


const gameOver = () =>{
    btnStart.style.display = 'block'

    const audio = () =>{
        const instrumental = document.createElement('audio')
        instrumental.src = './audios/efeitos/gameOver.mp3'
        instrumental.autoplay = true

    }
    audio()
    
}

btnStart.addEventListener('click' , () =>{
    btnStart.style.display = 'none' 

    const audioStart = () => {
        const instrumental = document.createElement('audio')
        instrumental.src = './audios/A Theme For Space (8bit music).mp3'
        instrumental.autoplay = true
        instrumental.loop = true
        document.body.appendChild(instrumental)

    }
    audioStart()
    controls()   // desbloqueia a movimentação 
    const spawn = setInterval(aliens, 2500)  // Gerador de aliens  

              
})




