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

var winCounter = 0;

//objects
var obiWan = {
    //object name
    name:"obiWan",
    //DOM Id name
    dom: "obi-wan",
    HP: 120,
    //boolean if this jedi is selected
    mainCharacter: false,
    //boolean for if this jedi is not selected and is therefore an enemy
    enemy: false,
    //base attack (increases)
    baseAttack: 8,
    //counter attack (does not increase)
    counterAttack: 8,
    defeated:false,
    update: function(){
        $("#obi-wan p").text(this.HP);
    },
    
    //runs if the character is an enemy that is defeated
    defeat: function(){
        $("#obi-wan").addClass("hidden");
        this.defeated = true;
        currentEnemy = undefined;
    },

    reset:function(){
        this.HP = 120;
        this.mainCharacter = false;
        this.enemy = false;
        this.baseAttack = 8;
        this.defeated = false;
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
    HP:140,
    maxHP:140,
    baseAttack:9,
    counterAttack:9,
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
        this.HP = 140;
        this.mainCharacter = false;
        this.enemy = false;
        this.baseAttack = 9;
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
    HP:140,
    maxHP:140,
    baseAttack:9,
    counterAttack:9,
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
        this.HP = 140;
        this.mainCharacter = false;
        this.enemy =false;
        this.baseAttack = 9;
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
    HP:180,
    baseAttack:12,
    counterAttack:12,
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
        this.HP = 180;
        this.mainCharacter = false;
        this.enemy = false;
        this.baseAttack = 12;
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

function selectCurrentEnemy(chosen){

    for(i = 0; i < jediObj.length; i++){
        if(jediObj[i].dom === chosen){
            var element = $(jediDOM[i]).detach();
            $("#fight-section").append(element);
            return jediObj[i]; 
        }
    };
};

function attack() {
    currentEnemy.HP -= yourJedi.baseAttack;
    yourJedi.HP -= currentEnemy.counterAttack;
    yourJedi.baseAttack += yourJedi.counterAttack;
    console.log("Your HP: " + yourJedi.HP + " Enemy HP:  " + currentEnemy.HP);
    yourJedi.update();
    currentEnemy.update();
    if(currentEnemy.HP <= 0) {
        currentEnemy.defeat();
        checkWin();
    } else if (yourJedi.HP <= 0) {
        loseGame();
    }

}

function checkWin(){
    winCounter = 0;

    for(i = 0; i < jediObj.length; i++){
        if(jediObj[i].defeated === true){
            winCounter++; //THIS IS HTE ISSUE!!!!!!!!!!!!!!!
        }
    }
    if(winCounter >= 3){
        alert("you win!");
        $("#reset").removeClass("hidden");
        winCounter = 0;

    }

}

function loseGame(){
    alert("you lose");
    $("#reset").removeClass("hidden");

}

function resetGame(){
    jediChosen = false;
    yourJedi = undefined;
    currentEnemy = undefined;
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

        if(currentEnemy != undefined && currentEnemy.dom === chosen){
            $("#attack").removeClass("hidden");
        }


    });

    $("#attack").on("click", function(){

        attack();
    });

    $("#reset").on("click", function(){

        resetGame();
    });


})

//moves selected character to "your character" id, moves rest to "enemies" id

//selects object based on character picked

//attack button function. determines if attack button has been previously clicked, determines if an attack can be carried out as a result

//carries out attacks, counter attacks and HP 
