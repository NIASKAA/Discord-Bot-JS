const weaponList = require('../models/enemyWeapon')
const Weapon = require('../classes/weaponStat')
const enemyStats = require('../models/enemyStats')
const enemyList = require('../models/enemyList')

class Enemy {
    constructor () {
      // Enemy
      this.modifier = enemyStats[Math.floor(Math.random() * enemyStats.length)]
      this.enemy = enemyList[Math.floor(Math.random() * 4) + 0].encounters[Math.floor(Math.random() * enemyList[Math.floor(Math.random() * 4) + 0].encounters.length)];
      this.name = this.modifier.name + ' ' + this.enemy.name
      this.health = this.enemy.health
      this.image = this.enemy.image

      // Enemy Weapon
      const randomType = random(weaponList.types)
      const weapon = new Weapon(randomType)
      this.weaponDamage = parseFloat(weapon.damage * this.modifier.modifier).toFixed(2)
      this.weaponAccuracy = weapon.accuracy
      this.weaponCritical = weapon.critical
      this.weaponName = weapon.name
      this.weaponValue = weapon.value
  
      this.value = ((parseFloat(this.health) + parseFloat(this.weaponDamage)) / 2).toFixed(2)
    }
  
    dynamicDamage (value) {
      return value = parseFloat(this.weaponDamage - (this.weaponDamage / 2) + Math.random(this.weaponDamage)).toFixed(2)
    }

  }
  
  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }
  module.exports = Enemy