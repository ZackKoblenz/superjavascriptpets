Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }

//Root Class
    class Pet {
        constructor(attack, health, level, description, tier, id){
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
    function main(){
        let round = 1;
        let gold = 10
        let shop = new Shop(4, gold, 3, round);
        let gameBoard = shop.initialRoll;
        let enemyGameboard = shop.roll();
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

    // move reposition into pet class
    // add faint check to reposition
    // if pet is faint, removePet not move
        function rePosition(gameBoard, initialPosition, newPosition){
            let holdingVariable = gameBoard[initialPosition]
            gameBoard.splice(initialPosition, 1)
            gameBoard.splice(newPosition, 0, holdingVariable)
        }
    }



main()