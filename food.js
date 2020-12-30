class Food{
    constructor(){

        this.image = loadImage("Milk.png");
        this.foodStock = 0;
        this.lastFed;
    }

    display(){
       var x = 80;
       var y = 100;

       imageMode(CENTER);
       

       if(this.foodStock != 0){
           for(var i = 0; i < this.foodStock; i++) {
               if(i % 10 == 0 ){
                   x = 80;
                   y = y + 50;
               }
               
               image(this.image,x,y,50,50);
               x = x + 30;
           }
       }

    }
    getFoodStock(){

        return this.foodStock;
    }
    
    updateFoodStock(foodStock){

        this.foodStock = foodStock;
    }

    
}