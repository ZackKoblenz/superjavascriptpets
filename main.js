Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

//Root Class
    class Pet {
        constructor(type, attack, health, level, description, tier, id){
            this.type = type;
            this.attack = attack;
            this.health = health;
            this.level = level;
            this.description = description;
            this.tier = tier;
            this.rollable = true;
            this.cost = 3;
            this.xp = 0;
            this.id = Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
        }
        sell(){

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

//Group Classes
    class summonPet extends Pet {
        constructor(summons, summonAnimal){
            super()
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

            console.log("stats pet died for you")
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

//Shop Classes
    let turtlePack = ["new Sheep()", "new Ram()", "new Ant()"]

    class Shop{
        constructor(shopPlots, gold, tier, round){
            this.shopPlots = shopPlots; 
            this.gold = gold;
            this.tier = tier;
            this.round = round;
            this.initialRoll = this.roll();
        }
        buy(){

        }
        roll(){
            let arrayOfPets = []
            for (let i = 0; i < this.shopPlots; i++){
                let pickedPet = eval(turtlePack.random())
                if(pickedPet.rollable === true && pickedPet.tier <= this.tier){
                    arrayOfPets.push(pickedPet)
                }else{
                    i--
                }
            }
            return arrayOfPets
        }
    }
//Game Loop Logic
let wins = 0
let health = 5
let round = 1
let gold = 10
let gameBoard = shop(gold, round).initialRoll
    function main(){
        console.log("game running")
        while(wins < 10 && health > 0 && round < 100){
            gameBoard = shop(gold, round).roll()
            console.log(gameBoard)
            match(wins, gameBoard, round)
            console.log(wins)
            console.log(round)
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
    function shop(gold, currentRound){
        //make gold dynamic to account for gold pets
        let roundGold = gold
        let tier = 1
        if(currentRound > 12){
            tier = 6
        }else if(currentRound == 1){
            tier = 1
        }
        else{
            tier = currentRound / 2 
        }
        //Make Shop Plots dynamic (first param)
        let shop = new Shop(5, roundGold, tier, currentRound)
        console.log("game board generated")
        
        return shop
    }
    function match(wins, gameBoard, currentRound){
        console.log("match started")
        let winBool = false;
        let opponentGameBoard = findOpponent(currentRound)
        let gameBoardCopy = gameBoard.slice()
        fight(gameBoardCopy, opponentGameBoard)
        if(typeof(gameBoardCopy.at(0)) == "undefined" && typeof(opponentGameBoard.at(0)) == "undefined"){
            wins = wins
            console.log("draw")
        }
        else if(typeof(gameBoardCopy.at(0)) == "undefined"){
            wins = wins
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
    function findOpponent(currentRound){
        console.log("finding opponent...")
        //Reminder that eventually health stage should be taken into account for finding opponent team
        let healthCheck = health;
        let opponentShop = shop(10, currentRound)
        //let opponentShop = new Shop(5, 10, tier, currentRound)
        let opponentGameBoard = opponentShop.initialRoll
        console.log("opponent team generated")
        return opponentGameBoard
    }
    function fight(gameBoardCopy, opponentGameBoard){
        console.log("fight started")
        //console.log(gameBoard, opponentGameBoard)
        while(typeof(gameBoard[0]) != "undefined" || typeof(opponentGameBoard[0]) != "undefined"){
            // Write Code To Simulate Fight
            gameBoardCopy[0].health -= opponentGameBoard[0].attack
            opponentGameBoard[0].health -= gameBoardCopy[0].attack
            gameBoardCopy[0].checkDeath(gameBoardCopy)
            opponentGameBoard[0].checkDeath(opponentGameBoard)
            //create slowdown options to allow fight to be watchable and not an instant calculation
            if (typeof(gameBoardCopy[0]) == "undefined" || typeof(opponentGameBoard[0]) == "undefined"){
                console.log("gameboard empty, player loss")
                break
            }
        }
    }
    function winCondition(gameBoard){
        console.log(`congratulations, you won with team ${gameBoard}`)
    }
    function loseCondition(gameBoard){
        let finalGameBoard = JSON.stringify(gameBoard)
        console.log(`you lost with team ${finalGameBoard}`)
    }

main()