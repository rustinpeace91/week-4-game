//global variables


//creates an array of jedi, for purposes of determining characters
var jedi = ["obiWan", "lukeSkywalker", "darthVader", "theEmperor"]
var jediChosen = false;
var yourJedi;
var currentEnemy; 

//objects
var obiWan = {
    name:"obi wan",
    dom: "obi-wan",
    HP: 120,
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

//functions




//click event to select character to initiate the game
$("#obi-wan").on("click", function(){
    alert("I've been clicked");
});
//moves selected character to "your character" id, moves rest to "enemies" id
//selects object based on character picked
//attack button function. determines if attack button has been previously clicked, determines if an attack can be carried out as a result
//carries out attacks, counter attacks and HP 
