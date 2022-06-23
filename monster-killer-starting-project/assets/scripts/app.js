const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const enteredValue = prompt("Maximum life for you and the monster.", "100");

let chosenMaxLife = enteredValue;

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0){
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function reset(){
    currentPlayerHealth = chosenMaxLife;
    currentMonsterHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound(){
    const initialPlayerHealth = currentPlayerHealth;
    const monsterDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= monsterDamage;

    if (currentPlayerHealth <= 0 && hasBonusLife){
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("You would be dead but the bonus life saved you!");
    }

    if (currentPlayerHealth > 0 && currentMonsterHealth <= 0){
        alert("You won!");
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0){
        alert("You lost!");
    }
    else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0){
        alert("You have a draw!");
    }

    if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0){
        reset();
    }
}

function attackMonster(mode){
    let maxDamage;

    if (mode === "ATTACK"){
        maxDamage = ATTACK_VALUE;
    }
    else if (mode === "STRONG_ATTACK"){
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const playerDamage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= playerDamage;
    endRound();
}

function attackHandler(){
    attackMonster("ATTACK")
}

function strongAttackHandler(){
    attackMonster("STRONG_ATTACK")
}

function healPlayerHandler(){
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE){
        alert("You can't heal to more than your max initial health.");
    }
    else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    endRound();
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);