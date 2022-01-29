//cria variaveis 
var trex, trexCorrendo, chao, imagemChao, subChao, nuvem, nuvemimg, cacto, cacto1, cacto2, cacto3, cacto4, cacto5, cacto6, escolherCacto, tempoJogo, trexColidiu,fimDeJogo, reiniciar,imagemFim, imagemReiniciar, somPulo, somMorte, somCheckpoint;   

const Jogar = 1
const Encerrar = 0
var estadoJogo = Jogar


function preload(){
//seleciona 3 imagens para fazer a animação de corrida do trex
trexCorrendo = loadAnimation("trex1.png","trex2.png","trex3.png") 
trexColidiu = loadAnimation("trex_collided.png")  
//carrega a imagen do chao
  imagemChao = loadImage("ground2.png")
  nuvemimg = loadImage("cloud.png")
  cacto1 = loadImage("obstacle1.png")
  cacto2= loadImage("obstacle2.png")
  cacto3= loadImage("obstacle3.png")
  cacto4= loadImage("obstacle4.png")
  cacto5= loadImage("obstacle5.png")
  cacto6= loadImage("obstacle6.png")
  
  imagemFim = loadImage("gameOver.png")
imagemReiniciar = loadImage("restart.png")
  
  somPulo = loadSound("jump.mp3")
  somMorte = loadSound("die.mp3")
  somCheckpoint = loadSound("checkPoint.mp3")
}

function setup() {
createCanvas(600,200) 
//cria o sprite do trex e faz a animação de "movimento"
trex = createSprite(50,100,20,40)
trex.addAnimation("correndo",trexCorrendo) 
trex.addAnimation("colidiu",trexColidiu)
trex.scale = 0.5
  
//cria o sprtie do chao e da a animação dele 
chao = createSprite(200,180,500,10)  
chao.addAnimation("chao",imagemChao)  
  
//cria o sprite do chao e o deixa invisivel
subChao= createSprite(200,190,500,10)
subChao.visible = false

fimDeJogo = createSprite(300,80,30,30)
fimDeJogo.addAnimation("fimdejogo", imagemFim)  
fimDeJogo.scale = 0.5
  
reiniciar = createSprite(300,120,30,30)  
reiniciar.addAnimation("reiniciar", imagemReiniciar)
reiniciar.scale = 0.5  
  
tempoJogo = 0 

trex.setCollider("circle", 0,0,40)
trex.debug = false
  
grupoDeCactos = new Group()  
grupoDeNuvens = new Group()
}

function draw() {
background(180)
  
text("Tempo: "+tempoJogo,475,30) 


if(estadoJogo == Jogar){
tempoJogo+=1  
fimDeJogo.visible = false
reiniciar.visible = false  
  //da a velocidade do chao e o faz repetir quando chega na coordenada 0
if(tempoJogo > 0 && tempoJogo % 100 == 0){
  somCheckpoint.play()
    
}  
chao.velocityX = -(3 + tempoJogo / 100) 
if(chao.x < 0){
  chao.x = chao.width /2
}
  //quando pressionar espaço o trex pula
  if(keyDown("space") && trex.y > 161){
  trex.velocityY = -10
  somPulo.play()  
}
//faz o trex voltar para o chao apos pular
trex.velocityY = trex.velocityY + 0.5   

gerarNuvens()
gerarCactos()

if(grupoDeCactos.isTouching(trex)){
  estadoJogo = Encerrar
  somMorte.play()
}  
}else if(estadoJogo == Encerrar){
chao.velocityX = 0  
fimDeJogo.visible = true
reiniciar.visible = true 
  
grupoDeNuvens.setVelocityXEach(0)  
grupoDeCactos.setVelocityXEach(0)    

grupoDeNuvens.setLifetimeEach(-1)
grupoDeCactos.setLifetimeEach(-1) 

trex.changeAnimation("colidiu",trexColidiu)
trex.velocityY = 0  
}  


   
//faz o trex colidir com o subchao
trex.collide(subChao)  
  
if(mousePressedOver(reiniciar) ){
 restart()
  
}
  
drawSprites()  
 
}

function gerarNuvens(){
  if(frameCount %60 == 0){
  nuvem = createSprite(600,100,50,10)
  nuvem.velocityX = -3
  nuvem.addAnimation("nuvem passando",nuvemimg)
  nuvem.y = Math.round(random(60,100))
  nuvem.depth = trex.depth
  trex.depth = trex.depth + 1  
  nuvem.scale = random(0.5,1.1)      
  nuvem.lifetime = 300  
  grupoDeNuvens.add(nuvem)  
}  
}

function gerarCactos(){
if(frameCount %60 == 0){
  cacto = createSprite(600,165,10,40)
  cacto.velocityX = -(3 + tempoJogo / 100)
  escolherCacto = Math.round(random(1,6))
  switch(escolherCacto){
    case 1: cacto.addImage(cacto1)
      cacto.scale = 0.5
      break;
    case 2: cacto.addImage(cacto2)
      cacto.scale = 0.5
      break;  
    case 3: cacto.addImage(cacto3)
      cacto.scale = 0.5
      break;
    case 4: cacto.addImage(cacto4)
      cacto.scale = 0.5
      break;
    case 5: cacto.addImage(cacto5)
      cacto.scale = 0.5
      break;
    case 6: cacto.addImage(cacto6)
      cacto.scale = 0.4
      break;
    default : break;
  }

  cacto.lifetime = 300
  grupoDeCactos.add(cacto)
}
    
}

function restart(){
 estadoJogo = Jogar
 fimDeJogo.visible = false 
 reiniciar.visible = false 
 grupoDeCactos.destroyEach()
 grupoDeNuvens.destroyEach() 
 trex.changeAnimation("correndo", trexCorrendo)
 tempoJogo = 0 
}