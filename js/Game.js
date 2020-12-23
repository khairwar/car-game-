class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];

    car1.addImage(whiteCar);
    car2.addImage(blueCar);
    car3.addImage(blackCar);
    car4.addImage(redCar);
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    player.getCarsAtEnd()

    if(allPlayers !== undefined){
      //var display_position = 100;
      background(ground)
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5)
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 300;
      var y;
      var z = 300

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        z+=250
        //position the cars a little away from each other in x direction
        x = displayWidth-z-allPlayers[plr].xdistance;
        
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x =x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
          fill("yellow")
          ellipse(x,y,100);
          fill("white")
          text(player.name,x-20,y+80)
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(keyIsDown(DOWN_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.xdistance +=10
      player.update();
    }
    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.xdistance -=10
      player.update();
    }

    drawSprites();

    if(player.distance == 5220){
      player.rank += 1;
      Player.updateRank(player.rank);
      player.update()
      gameState = 2;
    }
     

    

  }
  end(){
   console.log("game over");
   console.log(player.rank) 
   textSize(50)
   text(player.rank,displayWidth/2,camera.position.y-100)
  }

}
