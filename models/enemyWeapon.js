module.exports = {
    types: [
      'sword',
      'axe',
      'pike',
      'dagger'
    ],
    sword: {
      damageMin: 2,
      damageMax: 4,
      valueMin: 100,
      valueMax: 1000,
      accuracyMin: 1,
      accuracyMax: 2,
      criticalMin: 0.3,
      criticalMax: 0.99,
      rarityMax: 'common'
    },
    axe: {
      damageMin: 3,
      damageMax: 6,
      valueMin: 100,
      valueMax: 1000,
      accuracyMin: 1.3,
      accuracyMax: 1.7,
      criticalMin: 0.3,
      criticalMax: 0.99,
      rarityMax: 'uncommon'
    },
    pike: {
      damageMin: 5,
      damageMax: 12,
      valueMin: 400,
      valueMax: 1000,
      accuracyMin: 1.1,
      accuracyMax: 1.6,
      criticalMin: 0.6,
      criticalMax: 0.99,
      rarityMax: 'rare'
    },
    dagger: {
      damageMin: 1,
      damageMax: 3,
      valueMin: 100,
      valueMax: 1000,
      accuracyMin: 2,
      accuracyMax: 3,
      criticalMin: 0.6,
      criticalMax: 0.99,
      rarityMax: 'common'
    },
    weapons: [{
      id: 1,
      name: 'pebble',
      damage: 2.2,
      critical: 0.2,
      accuracy: 2,
    },
    {
      id: 2,
      name: 'stick',
      damage: 2.4,
      critical: 0.2,
      accuracy: 3,
    },
    {
      id: 3,
      name: 'sword',
      damage: 3.7,
      critical: 0.9,
      accuracy: 4,
      value: 15
    },
    {
      id: 4,
      name: 'long sword',
      damage: 4.3,
      critical: 0.4,
      accuracy: 4,
    },
    {
      id: 5,
      name: 'pike',
      damage: 6,
      critical: 0.5,
      accuracy: 4,
    }
    ]
  }
  