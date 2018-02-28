//global variables


//creates an array of jedi, for purposes of determining characters
var jedi = ["obiWan", "lukeSkywalker", "darthVader", "theEmperor"];
//array of jedi ID names as they relate to the DOM
var jediDOM = ["#obi-wan", "#luke-skywalker", "#darth-vader", "#the-emperor"]



//condition of whether a jedi has been chosen
var jediChosen = false;
//keeps track of the jedi you chose
var yourJedi;
//keeps track of the jedi you are fighting
var currentEnemy;
//keeps track of all the enemies defeated
var winCounter = 0;

//objects
var obiWan = {
    //object name
    name:"obiWan",
    //DOM Id name
    dom: "obi-wan",
    HP: 85,
    //boolean if this jedi is selected
    mainCharacter: false,
    //boolean for if this jedi is not selected and is therefore an enemy
    enemy: false,
    //base attack (increases)
    baseAttack: 7,
    attackIncrease: 7,
    //counter attack (does not increase)
    counterAttack: 20,
    defeated:false,
    //updates HP on the DOM every time damage is taken
    update: function(){
        $("#obi-wan p").text(this.HP);
    },
    
    //runs if the character is an enemy that is defeated
    defeat: function(){
        $("#obi-wan").addClass("hidden");
        this.defeated = true;
        currentEnemy = undefined;
    },
    //resets character attributes after the game is over
    reset:function(){
        this.HP = 85;
        this.mainCharacter = false;
        this.enemy = false;
        this.baseAttack = 7;
        this.defeated = false;
        //moves the character icon back to it's original spot
        var element = $(jediDOM[0]).detach();
        $("#start-characters").append(element);
        $("#" + this.dom).removeClass("hidden");
        $("#" + this.dom  + " p").text(this.HP);

    }

};

var darthVader = {
    name: "darthVader",
    dom: "darth-vader",
    mainCharacter: false,
    enemy: false,
    HP:130,
    maxHP:130,
    baseAttack:6,
    attackIncrease:6,
    counterAttack:4,
    defeated:false,

    update: function(){
        $("#darth-vader p").text(this.HP);
    },

    defeat: function(){
        $("#darth-vader").addClass("hidden");
        this.defeated = true;
        currentEnemy = undefined;
    }, 
    
    reset:function(){
        this.HP = 130;
        this.mainCharacter = false;
        this.enemy = false;
        this.baseAttack = 6;
        this.defeated = false;
        var element = $("#" + this.dom).detach();
        $("#start-characters").append(element);
        $("#" + this.dom).removeClass("hidden");
        $("#" + this.dom  + " p").text(this.HP);

    }

}


var lukeSkywalker = {
    name: "lukeSkywalker",    
    dom: "luke-skywalker",
    mainCharacter: false,
    enemy: false,
    HP:135,
    maxHP:135,
    baseAttack:5,
    attackIncrease: 5,
    counterAttack:5,
    defeated:false,

    update: function(){
        $("#luke-skywalker p").text(this.HP);
    },

    defeat: function(){
        $("#luke-skywalker").addClass("hidden");
        this.defeated = true;
        currentEnemy = undefined;
    },
    
    reset:function(){
        this.HP = 135;
        this.mainCharacter = false;
        this.enemy =false;
        this.baseAttack = 5;
        this.defeated = false;
        var element = $("#" + this.dom).detach();
        $("#start-characters").append(element);
        $("#" + this.dom).removeClass("hidden");
        $("#" + this.dom  + " p").text(this.HP);

    } 

}

var theEmperor = {
    name: "theEmperor",
    dom: "the-emperor",
    mainCharacter: false,
    enemy: false,
    HP:160,
    baseAttack:2,
    attackIncrease:2,
    counterAttack:10,
    defeated:false,

    
    update: function(){
        $("#the-emperor p").text(this.HP);

    },

    defeat: function(){
        $("#the-emperor").addClass("hidden");
        this.defeated = true;
        currentEnemy = undefined;
    },
    
    reset:function(){
        this.HP = 160;
        this.mainCharacter = false;
        this.enemy = false;
        this.baseAttack = 2;
        this.defeated = false;
        var element = $("#" + this.dom).detach();
        $("#start-characters").append(element);
        $("#" + this.dom).removeClass("hidden");
        $("#" + this.dom  + " p").text(this.HP);

    }

}

//array of jedi objects. used to apply rules to multiple jedis and refer them to their DOM counterparts.
//in the future maybe these can be wrapped in one big game object like the hangman solution.
var jediObj = [obiWan, lukeSkywalker, darthVader, theEmperor];


//functions

//function for sorting your enemies. takes a parameter of chosen (based on the id of the clicked item)
function selectCharacter(chosen){
    //cycles through the jedi object array
    for(i = 0; i <jediObj.length; i++){
        //refers to the dom property in each object to see if it matches the id of the html element clicked
        if(jediObj[i].dom === chosen){
            //sets the main character 
            jediObj[i].mainCharacter = true;
            return jediObj[i];
        };
    };
};

//takes the rest of the characters you selected and moves them to the enemy box
function enemySort(){
    for(i = 0; i < jedi.length; i++){
        if(jedi[i] != yourJedi.name.toString()) {
            jediObj[i].enemy = true;
            var element = $(jediDOM[i]).detach();
            $("#enemies").append(element); 
            //currentEnemy = jediObj[i];
        };
    };
};

//checks 
function isEnemy(chosen){
    if(yourJedi.dom != chosen){
        return true;
    }
};

//selects the enemy that you clicked
function selectCurrentEnemy(chosen){
    //ties the id you clicked to it's corresponding object
    //cylces throug the jediObj array, matches the .dom property with the id of the clicked item
    for(i = 0; i < jediObj.length; i++){
        if(jediObj[i].dom === chosen){
            var element = $(jediDOM[i]).detach();
            $("#fight-section").append(element);
            return jediObj[i]; 
        }
    };
};

//attack function 
function attack() {
    //subtacts your base attack from the enemies HP
    currentEnemy.HP -= yourJedi.baseAttack;
    //subtracts the enemy's counter attack from your HP
    yourJedi.HP -= currentEnemy.counterAttack;
    //increas your attack
    yourJedi.baseAttack += yourJedi.attackIncrease;
    console.log("Your HP: " + yourJedi.HP + " Enemy HP:  " + currentEnemy.HP);
    //runs the update method

    //runs the update method for your enemy
    currentEnemy.update();
    //checks to see if you have defeated the enemy
    if (yourJedi.HP <= 0) {
        loseGame();
        yourJedi.update();
    } else if (currentEnemy.HP <= 0) {
        currentEnemy.defeat();
        checkWin();
    //checks to see if you have lost all your HP     
    } else {
        yourJedi.update(); 
    }

}

//checks to see if you have defeated all your enemies
function checkWin(){
    winCounter = 0;
    //cylces through the object array. checks the defeated status of each jedi
    //if three of the jedis have a defeated property of "true", it is assumed that you have won
    //winCounter is reset because the function is run each time a jedi is defeated.
    for(i = 0; i < jediObj.length; i++){
        if(jediObj[i].defeated === true){
            winCounter++; 
        }
    }
    if(winCounter >= 3){
        winGame();
        winCounter = 0;
    }

}

//win and losegame function. simply displas a message and displays the reset button
function winGame(){
    alert("you win!");
    $("#reset").removeClass("hidden");
}

function loseGame(){
    alert("you lose");
    $("#reset").removeClass("hidden");

}

//runs if the reset button is pushed
function resetGame(){
    //resets global variables
    jediChosen = false;
    yourJedi = undefined;
    currentEnemy = undefined;
    //cycles through jedi object array. runs the reset method for each jedi
    for(i = 0; i<jediObj.length; i++){
        jediObj[i].reset();
    }
    
};


//click event to select character to initiate the game
$(document).ready(function(){
    var chosen;
    $(".character" ).on("click", function(){
        chosen = $(this).attr('id');
        
        //when a character is clicked. the first thing that is determined is if the jedi has been chosen yet
        if(jediChosen == false) {
            var element = $("#" + chosen).detach();
            $("#your-character").append(element);
            yourJedi = selectCharacter(chosen); 
            jediChosen = true;
            enemySort();
        }
        
        //if hte jedi has been chosen, it determines if an enemy has been chosen, and if not, whether the character you selected
        //can be chosen as an enemy. 
        if(currentEnemy === undefined && isEnemy(chosen) == true) {
            currentEnemy = selectCurrentEnemy(chosen);;
        } 
        
        //condition to display the attack button if the enemy has been chosen
        if(currentEnemy != undefined && currentEnemy.dom === chosen){
            $("#attack").removeClass("hidden");
        }


    });
    //click event for attack button
    $("#attack").on("click", function(){

        attack();
    });
    //click event for reset button
    $("#reset").on("click", function(){

        resetGame();
    });


})

