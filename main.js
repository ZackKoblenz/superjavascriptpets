Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

//Root Class
    class Pet {
        constructor(type, effect, attack, health, level, description, tier, perk){
            this.type = type;
            this.effect = effect;
            this.attack = attack;
            this.health = health;
            this.level = level;
            this.description = description;
            this.tier = tier;
            this.perk = perk;
            this.rollable = true;
            this.cost = 3;
            this.xp = 0;
            this.id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        }
        sell(gold, gameBoard){
            gold++
            this.removePet(gameBoard, this.positionCheck(gameBoard))
        }
        faint(gameBoard){
            this.removePet(gameBoard, this.positionCheck(gameBoard))
        }
        rePosition(gameBoard, initialPosition, newPosition){
            let holdingVariable = gameBoard[initialPosition]
            gameBoard.splice(initialPosition, 1)
            gameBoard.splice(newPosition, 0, holdingVariable)
        }

        //Reposition example:
        // this.rePosition(gameBoard, positionCheck(gameBoard), 2)
        removePet(gameBoard, position){
            gameBoard.splice(position, 1)
        }
        positionCheck(gameBoard){
            for(let i = 0; i < gameBoard.length; i++){
                if(gameBoard[i].id === this.id){
                    return i
                }
            }
        }
        levelUp(){
            if(this.xp == 2){
                this.level = 2
            }
            if(this.xp == 5){
                this.level = 3
            }
        }
        //incomplete function vvv
        combine(xp){
            this.levelUp()
        }
        checkDeath(gameBoard){
            if(this.health <= 0){
                this.faint(gameBoard)
                return true
            }
        }
    }
    class Food {
        constructor(perk, attack, health, holdable, tier){
            this.perk = perk;
            this.attack = attack;
            this.health = health;
            this.holdable = holdable;
            this.tier = tier;
        }

    }
//Group Classes
    class summonPet extends Pet {
        constructor(summons, summonAnimal){
            super()
            this.effect = "summon"
            this.summons = summons;
            this.summonAnimal = summonAnimal;
        }
        faint(gameBoard){
            this.removePet(gameBoard, this.positionCheck(gameBoard))
            let summonArray = []
            for (let i = 0; i < this.summons; i++){
                gameBoard.push(eval(this.summonAnimal))
            }
            // Checking Array is filled with Summoned Pet Objects
            //console.log(summonArray)

            // Testing Death Inheritance

            // for (let i = 0; i < summonArray.length; i++){
            //     summonArray[i].death()
            // }
            
        }
    }

    class statsPet extends Pet {
        constructor(attackIncrease, healthIncrease){
            super()
            this.effect = "stats"
            this.attackIncrease = attackIncrease;
            this.healthIncrease = healthIncrease;
        }
        faint(gameBoard){
            //setTimeout(() => {
                let pickPet = gameBoard.random()
                pickPet.health += this.attackIncrease * this.level
                pickPet.attack += this.healthIncrease * this.level
                this.removePet(gameBoard, this.positionCheck(gameBoard))
            //}, 3000)

            // console.log("stats pet died for you")
        }

    }

    class goldPet extends Pet {
        constructor(gold){
            super()
            this.effect = "gold"
            this.gold = gold
        }
        giveGold(gold){
            gold += this.gold
        }
    }

    class startOfRoundPet extends Pet {
        constructor(){
            super()
            this.effect = "startOfRound"
        }
        onRoundStart(){

        }
    }

    class startOfBattlePet extends Pet {
        constructor(){
            super()
            this.effect = "startOfBattle"
        }
        onBattleStart(){

        }
    }

    class faintPet extends Pet {
        constructor(){
            super()
            this.effect = "faint"
        }
        onFaint(){

        }
    }
//Individual Classes
    class Sheep extends summonPet {
        constructor(){
            super()
            this.type = "sheep"
            this.health = 2;
            this.attack = 2;
            this.summons = 2;
            this.summonAnimal = "new Ram()"
            this.level = 1;
            this.tier = 3;
            this.description = "Faint - summon two  2/2 Rams"
        }

    }

    class Ram extends Pet {
        constructor(level){
            super()
            this.type = "ram"
            this.health = 2
            this.attack = 2
            this.level = level;
            this.tier = 1;
            this.rollable = false;
        }
    }

    class Ant extends statsPet {
        constructor(){
            super()
            this.type = "ant"
            this.attack = 2
            this.health = 2
            this.level = 1
            this.tier = 1
            this.rollable = true;
            this.description = "Faint - Give Random Friend +1 A, +1 H"
            this.attackIncrease = 1
            this.healthIncrease = 1
        }

    }
    //Faint Function is Jank as of 2am Sat Jun 24
    class Hedgehog extends Pet {
        constructor(){
            super()
            this.type = "hedgehod"
            this.level = 1
            this.abilityDamage = 2 * this.level
            //more hedgehog specific stats
        }

        faint(gameBoard, enemyGameboard){
            for (let i = 0; i < enemyGameboard.length; i++){
                enemyGameboard[i].health -= this.abilityDamage
                gameBoard[i].health -= this.abilityDamage
                if(enemyGameboard[i].health <= 0){
                    enemyGameboard[i].checkDeath(enemyGameboard)
                }
                if(gameBoard[i].health <= 0){
                    gameBoard[i].checkDeath(gameBoard)
                }
            }
            // for (let i = 0; i < enemyGameboard.length; i++){
            //     enemyGameboard[i].checkDeath(enemyGameboard)
            //     gameBoard[i].checkDeath(gameBoard)
            // }
        }
    }
//Food Classes
    class Apple extends Food{
        constructor(){
            super()
            this.attack = 1
            this.health = 1
            this.tier = 1
        }
    }
//Shop Classes
    let turtlePack = ["new Sheep()", "new Ram()", "new Ant()"]
    let turtlePackFood = ["new Apple()"]

    class Shop{
        constructor(petPlots, foodPlots, gold, tier, round){
            this.petPlots = petPlots; 
            this.foodPlots = foodPlots;
            this.gold = gold;
            this.tier = tier;
            this.round = round;
            this.roll = this.roll()
            this.initialRoll = this.roll;
        }
        buy(){

        }
        roll(){
            let arrayOfPets = []
            let arrayOfFood = []
            for (let i = 0; i < this.petPlots; i++){
                let pickedPet = eval(turtlePack.random())
                if(pickedPet.rollable === true && pickedPet.tier <= this.tier){
                    arrayOfPets.push(pickedPet)
                }else{
                    i--
                }
            }
            for (let i = 0; i < this.foodPlots; i++){
                let pickedFood = eval(turtlePackFood.random())
                if(pickedFood.tier <= this.tier){
                    arrayOfFood.push(pickedFood)
                }else{
                    i--
                }
            }

            let objectOfPetsAndFood = {
                pets: arrayOfPets,
                food: arrayOfFood
            }
            return objectOfPetsAndFood
        }
        freeze(){
            // I currently have no idea how to write the logic for this
            // Currently I replace the whole shop roll with ... this.roll okay got it
            // this.roll = this.roll()
            // the freeze function will add the frozen boolean to an item in the shop
            // im thinking we change the arrayofpets and arrayoffood to objects with a frozen property
            // from there the loops that fill the objects also check if there are any frozen property items in the 
            // this.roll 
        }
    }
//Game Loop Logic
let wins = 0
let health = 5
let round = 1
let gold = 10
let gameBoard = [new Pet("Gorilla", 10, 10, 2, "is a gorilla", 4),new Pet("Gorilla", 10, 10, 2, "is a gorilla", 4),new Pet("Gorilla", 10, 10, 2, "is a gorilla", 4),new Pet("Gorilla", 10, 10, 2, "is a gorilla", 4),new Pet("Gorilla", 10, 10, 2, "is a gorilla", 4)]// shop(gold, round).initialRoll
    function main(){
        console.log("game running")
        while(wins < 10 && health > 0 && round <= 1){
            // gameBoard = shop(gold, round).roll()
           // console.log(gameBoard)
            console.log(`Current Round ${round}`)
            match()
            console.log(`Current wins: ${wins}`)
            console.log(`Upcoming round ${round}`)
        }
        //let shop = new Shop(4, gold, 3, round);
        //let enemyGameboard = shop.roll();
        //GameLoop Test
            // console.log(gameBoard)
            // gameBoard[1].faint(gameBoard)
            // console.log(gameBoard)
        //Hedgehog Test
            // //console.log(enemyGameboard)
            // let hedge = new Hedgehog()
            // console.log(`Friendly:`)
            // console.log(gameBoard)
            // console.log(`Enemy:`)
            // console.log(enemyGameboard)
            // hedge.faint(gameBoard, enemyGameboard)
            // console.log(`Friendly:`)
            // console.log(gameBoard)
            // console.log(`Enemy:`)
            // console.log(enemyGameboard)

    }

    function match(){
        console.log("match started")
        let winBool = false;
        let opponentGameBoard = findOpponent()
        let gameBoardCopy = []
        for(let i = 0; i < gameBoard.length; i++){
            gameBoardCopy.push(gameBoard[i])
        }
        fight(gameBoardCopy, opponentGameBoard)
        if(typeof(gameBoardCopy.at(0)) == "undefined" && typeof(opponentGameBoard.at(0)) == "undefined"){
            console.log("draw")
        }
        else if(typeof(gameBoardCopy.at(0)) == "undefined"){
            health--
            console.log("loss")
        }
        else{
            winBool = true
            wins++
            console.log("win")
        }
        if(wins === 10){
            winCondition(gameBoard)
        }
        else if(health === 0){
            loseCondition(gameBoard)
        }else {
            round++
        }
    }
    function findOpponent(){
        console.log("finding opponent...")
        //Reminder that eventually health stage should be taken into account for finding opponent team
        let healthCheck = health;
        let opponentShop = shop()
        //let opponentShop = new Shop(5, 10, tier, currentRound)
        let opponentGameBoard = opponentShop.initialRoll.pets
        console.log("opponent team generated")
        return opponentGameBoard
    }
    function shop(){
        //make gold dynamic to account for gold pets
        let tier = 1
        let petPlots = 0
        let foodPlots = 0

        if(round < 5){
            petPlots = 3
            foodPlots = 1
        }
            else if(round < 9){
                petPlots = 4
                foodPlots = 2
            }
                else{
                    petPlots = 5
                    foodPlots = 2
                }

        if(round > 12){
            tier = 6
        }
            else if(round == 1){
                tier = 1
            }
                else{
                    tier = round / 2 
                }
        //Make Shop Plots dynamic (first param)
        let shop = new Shop(petPlots, foodPlots, gold, tier, round)
        console.log("game board generated")
        console.log(shop)
        return shop
    }

    function fight(gameBoardCopy, opponentGameBoard){
        console.log("fight started")
        //console.log(gameBoard, opponentGameBoard)
        while(typeof(gameBoardCopy[0]) != "undefined" && typeof(opponentGameBoard[0]) != "undefined"){
            // Write Code To Simulate Fight
                console.log("Before Fight: ")
                console.log(gameBoard[0].health)
                console.log(gameBoardCopy[0].health)
                gameBoardCopy[0].health -= opponentGameBoard[0].attack
                opponentGameBoard[0].health -= gameBoardCopy[0].attack
                gameBoardCopy[0].attack -= 2
                console.log("Attack Check: ")
                console.log(gameBoard)
                console.log(gameBoardCopy)
                console.log("Before Check Death: ")
                console.log(gameBoard[0].health)
                console.log(gameBoardCopy[0].health)
                gameBoardCopy[0].checkDeath(gameBoardCopy)
                opponentGameBoard[0].checkDeath(opponentGameBoard)
                console.log("After Check Death: ")
                console.log(gameBoard[0].health)
                console.log(gameBoardCopy[0].health)
            // Here to ending if statement may not be propper fighting logic. 
            // Flesh out how a proper fight should be simulated
            // both players attack at the same time
            // if one player no longer has pets, the round is over
            // let i = 0
            // let j = 0
            // while (i < gameBoardCopy.length){
            //     gameBoardCopy[i].health -= opponentGameBoard[j].attack
            //     opponentGameBoard[j].health -= gameBoardCopy[i].attack
            //     if(gameBoardCopy[i].checkDeath(gameBoardCopy)){
            //         i++
            //     }
            //     if(typeof(gameBoardCopy[i]) == "undefined"){
            //         break
            //     }
            //     if(opponentGameBoard[j].checkDeath(opponentGameBoard)){
            //         j++
            //     }
            //     if(typeof(opponentGameBoard[j]) == "undefined"){
            //         break
            //     }
            // }

            //create slowdown options to allow fight to be watchable and not an instant calculation
            if (typeof(gameBoardCopy[0]) == "undefined" || typeof(opponentGameBoard[0]) == "undefined"){
                console.log("gameboard empty, player loss")
                break
            }
        }
    }
    function winCondition(gameBoard){
        console.log(`congratulations, you won with the following team on round ${round}`)
        console.log(gameBoard)
    }
    function loseCondition(gameBoard){
        // let finalGameBoard = JSON.stringify(gameBoard)
        // console.log(`you lost with team ${finalGameBoard}`)
        console.log(`Unfortunately you lost, you lost with the following team on round ${round}`)
        console.log(gameBoard)
    }

main()