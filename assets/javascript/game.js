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

//objects
var obiWan = {
    name:"obiWan",
    dom: "obi-wan",
    HP: 120,
    mainCharacter: false,
    baseAttack: 8,
    counterAttack: 8,

    //note: maybe attacks and counter attacks should not be defined as methods. 
    attack: function(){
        //carries out attack
        //takes paramaters on enemy information for attack
        
        //adds 8 to base attack
        this.baseAttack += 8;
    },
    counterAttack: function(){
        //carries out counterAttack
        //checks to see HP left
    }

};

var darthVader = {
    name: "darthVader",
    dom: "darth-vader",
    HP:140,
    baseAttack:9,
    counterAttack:9
}

var lukeSkywalker = {
    name: "lukeSkywalker",    
    dom: "luke-skywalker",
    HP:140,
    baseAttack:9,
    counterAttack:9
}

var theEmperor = {
    name: "theEmperor",
    dom: "the-emperor",
    HP:140,
    baseAttack:9,
    counterAttack:9
}

//array of jedi objects if nessary
var jediObj = [obiWan, lukeSkywalker, darthVader, theEmperor];


//functions

//function for sorting your enemies
function selectCharacter(chosen){
    for(i = 0; i <jediObj.length; i++){
        if(jediObj[i].dom === chosen){
            return jediObj[i];
        }
    }
}

function enemySort(){
    for(i = 0; i < jedi.length; i++){
        if(jedi[i] != yourJedi.name.toString()) {
            var element = $(jediDOM[i]).detach();
            $("#enemies").append(element); 
        }
    }
}



//click event to select character to initiate the game
$(document).ready(function(){

    $(".character" ).on("click", function(){
        if(jediChosen == false) {
            var chosen = $(this).attr('id');
            var element = $("#" + chosen).detach();
            $("#your-character").append(element);
            yourJedi = selectCharacter(chosen); 
            alert("You have selected " + yourJedi.name + ". They have an HP of " + yourJedi.HP);
            jediChosen = true;
        }
    });
    /*$("#obi-wan").on("click", function(){
            if(jediChosen == false){
                var element = $("#obi-wan").detach();
                $("#your-character").append(element);
                yourJedi = obiWan;
                enemySort();
                jediChosen = true;
            }
        });

        $("#darth-vader").on("click", function(){
            if(jediChosen == false){
                var element = $("#darth-vader").detach();
                $("#your-character").append(element);
                yourJedi = darthVader;
                enemySort();
                jediChosen = true;
            };
        });
        
        $("#luke-skywalker").on("click", function(){
            if(jediChosen == false){
                var element = $("#luke-skywalker").detach();
                $("#your-character").append(element);
                yourJedi = lukeSkywalker;
                enemySort();
                jediChosen = true;
            }
        });
        
        $("#the-emperor").on("click", function(){
            if(jediChosen == false){
                var element = $("#the-emperor").detach();
                $("#your-character").append(element);
                yourJedi = theEmperor;
                enemySort();
                jediChosen = true;
            };
        });*/

})

//moves selected character to "your character" id, moves rest to "enemies" id

//selects object based on character picked

//attack button function. determines if attack button has been previously clicked, determines if an attack can be carried out as a result

//carries out attacks, counter attacks and HP 
