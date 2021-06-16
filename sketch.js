var thiefImg,policeImg,barrieImg,carImg,holeImg,bgImg
var road,thief,police,wall1,wall2
var gamestate="play"

function preload (){
    thiefImg=loadAnimation("thief1.png","thief3.png","thief2.png")
    policeImg=loadAnimation("cop3.png","cop2.png","cop1.png")
    barrieImg=loadImage("barrie.png")
    car1Img=loadImage("car1.png")
    car2Img=loadImage("car2.png")
    car3Img=loadImage("car3.png")
    holeImg=loadImage("hole.png")
    bgImg=loadImage("road.png")
    coneImg=loadImage("cone.png")
}

function setup(){
    createCanvas(550,400)
    
    road=createSprite(750,140)
    road.addImage(bgImg)
    road.scale=1.5
    road.velocityX=-3

    thief=createSprite(300,300)
    thief.addAnimation("running",thiefImg)
    //thief.debug=true
    thief.setCollider("rectangle",20,25,30,20)

    police=createSprite(150,350)
    police.addAnimation("chasing",policeImg)
    police.scale=0.5
    //police.debug=true
    police.setCollider("rectangle",-30,40,200,80)

    wall1=createSprite(375,250,750,10)
    wall2=createSprite(375,400,750,30)

    wall1.visible=false
    wall2.visible=false

    bG=new Group()
    cG=new Group()
    hG=new Group()
    carG=new Group()
}
function draw(){
    background(200)
    if(gamestate==="play"){
        if(road.x<0){
            road.x=720
        }
        thief.collide(wall1)
        thief.collide(wall2)
        
        if(keyDown("space")){
            thief.velocityY=-15
        }
        thief.velocityY += 0.8
    
        barriers()
        cones()
        //holes()
        cars()
    
        if(thief.isTouching(cG) || thief.isTouching(hG) || thief.isTouching(bG) || thief.isTouching(carG)){
            gamestate="end"
        }
    }
    else if(gamestate==="end"){
        cG.setVelocityXEach(0)
        bG.setVelocityXEach(0)
        hG.setVelocityXEach(0)
        carG.setVelocityXEach(0)
        road.velocityX=0

        cG.setLifetimeEach(-1)
        bG.setLifetimeEach(-1)
        hG.setLifetimeEach(-1)
        carG.setLifetimeEach(-1)

        thief.velocityY=0
        police.velocityX=1

        if(police.isTouching(thief)){
            background(0)
            textSize(25)
            fill("red")
            text("GAME OVER!!", 200,150)
            police.velocityX=0
            police.visible=false
            thief.visible=false
            road.destroy()
            cG.setLifetimeEach(0)
            bG.setLifetimeEach(0)
            hG.setLifetimeEach(0)
            carG.setLifetimeEach(0)
        }
    }
    drawSprites()
}

function barriers(){
    if(frameCount%290===0){
        var ran=Math.round(random(300,370))
        var barrier=createSprite(800,ran)
        barrier.addImage(barrieImg)
        barrier.velocityX=-3
        barrier.scale=0.13

        if(thief.y > barrier.y){
            thief.depth = barrier.depth+1
            police.depth = barrier.depth+1
        }
        else{
            barrier.depth = thief.depth +1
            barrier.depth = police.depth +1
        }
        barrier.lifetime=400
        bG.add(barrier)
        //barrier.debug=true
        barrier.setCollider("rectangle",0,60,120,20)
    }   
}
function cones(){
    if(frameCount%320===0){
        var ran=Math.round(random(300,370))
        var cone=createSprite(800,ran)
        cone.addImage(coneImg)
        cone.velocityX=-3
        cone.scale=0.1

        if(thief.y > cone.y){
            thief.depth = cone.depth+1
            police.depth = cone.depth+1
        }
        else{
            cone.depth = thief.depth +1
            cone.depth = police.depth +1
        }
        cone.lifetime=400
        cG.add(cone)
        //cone.debug=true
        cone.setCollider("rectangle",0,60,120,20)
    } 
}
function cars(){
    if(frameCount%370===0){
        var ran=Math.round(random(300,370))
        var car=createSprite(800,ran)
        var rand = Math.round(random(1,3));
        switch(rand) {
        case 1: car.addImage(car1Img);
                break;
        case 2: car.addImage(car2Img);
                break;
        case 3: car.addImage(car3Img);
                break;
        }
       
        car.velocityX=-3
        car.scale=0.25

        if(thief.y > car.y){
            thief.depth = car.depth+1
            police.depth = car.depth+1
        }
        else{
            car.depth = thief.depth +1
            car.depth = police.depth +1
        }
        car.lifetime=400
        carG.add(car)
        //car.debug=true
        car.setCollider("rectangle",-30,40,250,20)
    }
   
}
