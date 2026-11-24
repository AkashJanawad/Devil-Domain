// Approved handcrafted campaign levels 51–100. Loaded before campaign.js.
window.FORGE_CONTENT.levels.push(...[
  {
    "schemaVersion": 1,
    "id": 51,
    "season": 2,
    "name": "THE BELL TOWER",
    "seed": 51,
    "targetDifficulty": "MEDIUM",
    "spawn": {
      "x": 55,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 884,
          "y": 436
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 230,
        "h": 40
      },
      {
        "x": 260,
        "y": 310,
        "w": 130,
        "h": 16
      },
      {
        "x": 440,
        "y": 245,
        "w": 140,
        "h": 16
      },
      {
        "x": 650,
        "y": 500,
        "w": 310,
        "h": 40
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Spring",
        "args": [
          150,
          500,
          {
            "power": -1000,
            "w": 60
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          490,
          235,
          "bell"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 650,
            "y": 0,
            "w": 24,
            "h": 500
          },
          "bell"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          750,
          500,
          60,
          {
            "x": 690,
            "y": 280,
            "w": 30,
            "h": 220
          },
          {
            "delay": 0.22
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          230,
          540,
          420,
          {
            "size": 32
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 52,
    "season": 2,
    "name": "BORROWED FLOOR",
    "seed": 52,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 55,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 887,
          "y": 416
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 190,
        "h": 40
      },
      {
        "x": 540,
        "y": 260,
        "w": 230,
        "h": 16
      },
      {
        "x": 790,
        "y": 480,
        "w": 170,
        "h": 60
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 210,
            "y": 460,
            "w": 120,
            "h": 16
          },
          {
            "toX": 430,
            "toY": 290,
            "speed": 150,
            "phase": 0.66
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 660,
            "y": 65,
            "w": 54,
            "h": 42
          },
          {
            "x": 550,
            "y": 130,
            "w": 35,
            "h": 130
          },
          {
            "shakeTime": 0.6,
            "floorY": 260
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          725,
          212,
          800,
          432,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          840,
          480,
          36
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          190,
          540,
          600,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 53,
    "season": 2,
    "name": "AFTER YOU",
    "seed": 53,
    "targetDifficulty": "EASY",
    "spawn": {
      "x": 55,
      "y": 188
    },
    "exit": {
      "positions": [
        {
          "x": 475,
          "y": 286
        },
        {
          "x": 875,
          "y": 356
        }
      ],
      "options": {
        "fleeDist": 65
      }
    },
    "platforms": [
      {
        "x": 0,
        "y": 220,
        "w": 160,
        "h": 16
      },
      {
        "x": 440,
        "y": 350,
        "w": 120,
        "h": 16
      },
      {
        "x": 720,
        "y": 420,
        "w": 240,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "CollapseFloor",
        "args": [
          {
            "x": 240,
            "y": 290,
            "w": 120,
            "h": 16
          },
          {
            "x": 205,
            "y": 100,
            "w": 50,
            "h": 200
          },
          {
            "delay": 0.6,
            "shakeTime": 0.25
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          0,
          540,
          720,
          {
            "size": 28
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 54,
    "season": 2,
    "name": "TWO SIGNATURES",
    "seed": 54,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 55,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 900,
          "y": 436
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 960,
        "h": 40
      },
      {
        "x": 140,
        "y": 430,
        "w": 90,
        "h": 16
      },
      {
        "x": 270,
        "y": 365,
        "w": 90,
        "h": 16
      },
      {
        "x": 360,
        "y": 300,
        "w": 100,
        "h": 16
      },
      {
        "x": 585,
        "y": 430,
        "w": 90,
        "h": 16
      },
      {
        "x": 720,
        "y": 360,
        "w": 100,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Button",
        "args": [
          390,
          290,
          "first"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 500,
            "y": 0,
            "w": 24,
            "h": 500
          },
          "first"
        ]
      },
      {
        "type": "Button",
        "args": [
          755,
          350,
          "second"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 840,
            "y": 0,
            "w": 24,
            "h": 500
          },
          "second"
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 600,
            "y": 210,
            "w": 50,
            "h": 40
          },
          {
            "x": 550,
            "y": 300,
            "w": 30,
            "h": 200
          },
          {
            "shakeTime": 0.55,
            "floorY": 500
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          700,
          500,
          55,
          {
            "x": 650,
            "y": 300,
            "w": 25,
            "h": 200
          },
          {
            "delay": 0.3
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 55,
    "season": 2,
    "name": "PRESSURE POST",
    "seed": 55,
    "targetDifficulty": "MEDIUM",
    "spawn": {
      "x": 55,
      "y": 268
    },
    "exit": {
      "positions": [
        {
          "x": 885,
          "y": 246
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 300,
        "w": 210,
        "h": 16
      },
      {
        "x": 440,
        "y": 300,
        "w": 100,
        "h": 16
      },
      {
        "x": 540,
        "y": 0,
        "w": 24,
        "h": 540
      },
      {
        "x": 580,
        "y": 500,
        "w": 150,
        "h": 40
      },
      {
        "x": 800,
        "y": 310,
        "w": 160,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Conveyor",
        "args": [
          {
            "x": 210,
            "y": 300,
            "w": 230,
            "h": 16
          },
          {
            "dir": 1,
            "force": 75
          }
        ]
      },
      {
        "type": "Crusher",
        "args": [
          330,
          65,
          {
            "topY": 35,
            "floorY": 300,
            "period": 2.1,
            "phase": 1.3,
            "hold": 0.2,
            "upSpeed": 320
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          255,
          300,
          42
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          475,
          252,
          595,
          452,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 630,
            "y": 350,
            "w": 38,
            "h": 35
          },
          {
            "x": 580,
            "y": 330,
            "w": 60,
            "h": 170
          },
          {
            "shakeTime": 0.5,
            "floorY": 500
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          675,
          500,
          {
            "power": -1000,
            "w": 50
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          730,
          540,
          230,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 56,
    "season": 2,
    "name": "THE LOW ROAD",
    "seed": 56,
    "targetDifficulty": "MEDIUM",
    "spawn": {
      "x": 870,
      "y": 118
    },
    "exit": {
      "positions": [
        {
          "x": 55,
          "y": 416
        }
      ]
    },
    "platforms": [
      {
        "x": 760,
        "y": 150,
        "w": 200,
        "h": 16
      },
      {
        "x": 400,
        "y": 320,
        "w": 160,
        "h": 16
      },
      {
        "x": 0,
        "y": 480,
        "w": 350,
        "h": 60
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 480,
            "y": 240,
            "w": 115,
            "h": 16
          },
          {
            "toX": 710,
            "speed": 130,
            "phase": 0.35
          }
        ]
      },
      {
        "type": "Saw",
        "args": [
          [
            {
              "x": 440,
              "y": 280
            },
            {
              "x": 660,
              "y": 280
            }
          ],
          {
            "speed": 110,
            "r": 17
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          430,
          272,
          290,
          432,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          155,
          480,
          60,
          {
            "x": 260,
            "y": 310,
            "w": 30,
            "h": 170
          },
          {
            "delay": 0.2
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          350,
          540,
          610,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 57,
    "season": 2,
    "name": "SPLIT SECOND",
    "seed": 57,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 55,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 885,
          "y": 206
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 180,
        "h": 40
      },
      {
        "x": 230,
        "y": 425,
        "w": 85,
        "h": 16
      },
      {
        "x": 600,
        "y": 330,
        "w": 60,
        "h": 16
      },
      {
        "x": 700,
        "y": 270,
        "w": 260,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 350,
            "y": 390,
            "w": 115,
            "h": 16
          },
          {
            "toX": 570,
            "toY": 300,
            "speed": 140,
            "phase": 0.65
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 520,
            "y": 70,
            "len": 470,
            "vertical": true,
            "period": 1.9,
            "warn": 0.4,
            "fire": 0.45,
            "phase": 0.15
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 780,
            "y": 60,
            "w": 48,
            "h": 40
          },
          {
            "x": 700,
            "y": 100,
            "w": 35,
            "h": 170
          },
          {
            "shakeTime": 0.6,
            "floorY": 270
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          840,
          270,
          45,
          {
            "x": 735,
            "y": 100,
            "w": 30,
            "h": 170
          },
          {
            "delay": 0.45
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          180,
          540,
          780,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 58,
    "season": 2,
    "name": "A DOOR WITH AMBITION",
    "seed": 58,
    "targetDifficulty": "MEDIUM",
    "spawn": {
      "x": 55,
      "y": 448
    },
    "exit": {
      "positions": [
        {
          "x": 275,
          "y": 356
        },
        {
          "x": 550,
          "y": 236
        },
        {
          "x": 865,
          "y": 116
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "platforms": [
      {
        "x": 0,
        "y": 480,
        "w": 150,
        "h": 60
      },
      {
        "x": 390,
        "y": 360,
        "w": 90,
        "h": 16
      },
      {
        "x": 520,
        "y": 300,
        "w": 110,
        "h": 16
      },
      {
        "x": 680,
        "y": 240,
        "w": 90,
        "h": 16
      },
      {
        "x": 800,
        "y": 180,
        "w": 160,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Spring",
        "args": [
          100,
          480,
          {
            "power": -800,
            "w": 45
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 240,
            "y": 420,
            "w": 110,
            "h": 16
          },
          {
            "delay": 0.65
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          575,
          300,
          40,
          {
            "x": 490,
            "y": 150,
            "w": 40,
            "h": 150
          },
          {
            "delay": 0.4
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          150,
          540,
          810,
          {
            "size": 28
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 59,
    "season": 2,
    "name": "UNDER THE CONTRACT",
    "seed": 59,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 55,
      "y": 128
    },
    "exit": {
      "positions": [
        {
          "x": 55,
          "y": 416
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 160,
        "w": 300,
        "h": 16
      },
      {
        "x": 380,
        "y": 95,
        "w": 100,
        "h": 16
      },
      {
        "x": 500,
        "y": 160,
        "w": 460,
        "h": 16
      },
      {
        "x": 0,
        "y": 220,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 480,
        "w": 960,
        "h": 60
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "CollapseFloor",
        "args": [
          {
            "x": 300,
            "y": 160,
            "w": 200,
            "h": 16
          },
          {
            "x": 260,
            "y": 0,
            "w": 35,
            "h": 160
          },
          {
            "delay": 0.7,
            "shakeTime": 0.2
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          410,
          85,
          "permit"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 560,
            "y": 0,
            "w": 24,
            "h": 160
          },
          "permit"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          850,
          112,
          850,
          432,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 620,
            "y": 236,
            "len": 244,
            "vertical": true,
            "period": 1.8,
            "warn": 0.35,
            "fire": 0.45,
            "phase": 0.2
          }
        ]
      },
      {
        "type": "Crusher",
        "args": [
          400,
          65,
          {
            "topY": 236,
            "floorY": 480,
            "period": 2.3,
            "phase": 0.4,
            "hold": 0.18,
            "upSpeed": 310
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          190,
          480,
          65,
          {
            "x": 285,
            "y": 300,
            "w": 30,
            "h": 180
          },
          {
            "delay": 0.25
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 60,
    "season": 2,
    "name": "CROWN OF CINDERS",
    "seed": 60,
    "targetDifficulty": "EXPERT",
    "spawn": {
      "x": 865,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 55,
          "y": 186
        }
      ]
    },
    "platforms": [
      {
        "x": 740,
        "y": 500,
        "w": 220,
        "h": 40
      },
      {
        "x": 550,
        "y": 340,
        "w": 180,
        "h": 16
      },
      {
        "x": 0,
        "y": 270,
        "w": 960,
        "h": 16
      },
      {
        "x": 700,
        "y": 180,
        "w": 260,
        "h": 16
      },
      {
        "x": 0,
        "y": 250,
        "w": 280,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Spring",
        "args": [
          760,
          500,
          {
            "power": -1000,
            "w": 55
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 660,
            "y": 288,
            "w": 40,
            "h": 30
          },
          {
            "x": 705,
            "y": 286,
            "w": 30,
            "h": 214
          },
          {
            "shakeTime": 0.65,
            "floorY": 540
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          560,
          292,
          830,
          132,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 560,
            "y": 200,
            "w": 100,
            "h": 16
          },
          {
            "delay": 0.55
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 340,
            "y": 230,
            "w": 110,
            "h": 16
          },
          {
            "toX": 440,
            "speed": 100,
            "phase": 0.3
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 480,
            "y": 0,
            "len": 270,
            "vertical": true,
            "period": 1.9,
            "warn": 0.4,
            "fire": 0.4,
            "phase": 0.3
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          220,
          240,
          "crown"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 120,
            "y": 0,
            "w": 24,
            "h": 250
          },
          "crown"
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          0,
          540,
          740,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 61,
    "season": 2,
    "name": "FUSE GALLERY",
    "seed": 61,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 50,
      "y": 228
    },
    "exit": {
      "positions": [
        {
          "x": 44,
          "y": 416
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 260,
        "w": 165,
        "h": 16
      },
      {
        "x": 210,
        "y": 195,
        "w": 110,
        "h": 16
      },
      {
        "x": 520,
        "y": 155,
        "w": 160,
        "h": 16
      },
      {
        "x": 740,
        "y": 220,
        "w": 220,
        "h": 16
      },
      {
        "x": 0,
        "y": 280,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 480,
        "w": 960,
        "h": 60
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 365,
            "y": 220,
            "w": 105,
            "h": 16
          },
          {
            "delay": 0.55
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          585,
          145,
          "arm"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          870,
          172,
          845,
          432,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 600,
            "y": 296,
            "len": 184,
            "vertical": true,
            "period": 1.8,
            "warn": 0.4,
            "fire": 0.45
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          305,
          480,
          68,
          {
            "x": 420,
            "y": 296,
            "w": 40,
            "h": 184
          },
          {
            "delay": 0.26
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 140,
            "y": 296,
            "w": 24,
            "h": 184
          },
          "arm"
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 62,
    "season": 2,
    "name": "COUNTERWEIGHT QUAY",
    "seed": 62,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 50,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 900,
          "y": 171
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 360,
        "h": 40
      },
      {
        "x": 365,
        "y": 365,
        "w": 125,
        "h": 16
      },
      {
        "x": 710,
        "y": 235,
        "w": 250,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 250,
            "y": 145,
            "w": 85,
            "h": 68
          },
          {
            "x": 125,
            "y": 250,
            "w": 35,
            "h": 250
          },
          {
            "shakeTime": 0.18,
            "floorY": 500
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 500,
            "y": 345,
            "w": 105,
            "h": 16
          },
          {
            "toX": 630,
            "toY": 260,
            "speed": 110,
            "phase": 0.44
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          730,
          225,
          "quay"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 854,
            "y": 0,
            "w": 22,
            "h": 235
          },
          "quay"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          808,
          235,
          36,
          {
            "x": 712,
            "y": 80,
            "w": 32,
            "h": 155
          },
          {
            "delay": 0.28
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          360,
          540,
          600,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 63,
    "season": 2,
    "name": "STAMP COLLECTOR",
    "seed": 63,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 50,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 315,
          "y": 266
        },
        {
          "x": 875,
          "y": 426
        }
      ],
      "options": {
        "fleeDist": 65
      }
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 245,
        "h": 40
      },
      {
        "x": 290,
        "y": 330,
        "w": 135,
        "h": 16
      },
      {
        "x": 650,
        "y": 360,
        "w": 105,
        "h": 16
      },
      {
        "x": 765,
        "y": 490,
        "w": 195,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Spring",
        "args": [
          160,
          500,
          {
            "w": 65,
            "power": -1000
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 485,
            "y": 270,
            "w": 110,
            "h": 16
          },
          {
            "delay": 0.53
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          515,
          260,
          "post"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 715,
            "y": 0,
            "w": 22,
            "h": 490
          },
          "post"
        ]
      },
      {
        "type": "Crusher",
        "args": [
          807,
          48,
          {
            "topY": 190,
            "floorY": 490,
            "period": 2.35,
            "phase": 0.6,
            "upSpeed": 360,
            "hold": 0.2
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          245,
          540,
          520,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 64,
    "season": 2,
    "name": "ROUND TRIP FARE",
    "seed": 64,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 50,
      "y": 448
    },
    "exit": {
      "positions": [
        {
          "x": 895,
          "y": 416
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 480,
        "w": 635,
        "h": 60
      },
      {
        "x": 765,
        "y": 480,
        "w": 195,
        "h": 60
      },
      {
        "x": 0,
        "y": 245,
        "w": 500,
        "h": 16
      },
      {
        "x": 535,
        "y": 185,
        "w": 130,
        "h": 16
      },
      {
        "x": 0,
        "y": 280,
        "w": 960,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Teleporter",
        "args": [
          305,
          432,
          330,
          197,
          {
            "twoWay": true
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          600,
          175,
          "fare"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 505,
            "y": 296,
            "w": 22,
            "h": 184
          },
          "fare"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          420,
          480,
          52,
          {
            "x": 544,
            "y": 65,
            "w": 30,
            "h": 120
          },
          {
            "delay": 0.35
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          635,
          540,
          130,
          {
            "size": 35
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 65,
    "season": 2,
    "name": "PAPER MILL",
    "seed": 65,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 865,
      "y": 258
    },
    "exit": {
      "positions": [
        {
          "x": 42,
          "y": 386
        }
      ]
    },
    "platforms": [
      {
        "x": 765,
        "y": 290,
        "w": 195,
        "h": 16
      },
      {
        "x": 578,
        "y": 330,
        "w": 105,
        "h": 16
      },
      {
        "x": 232,
        "y": 390,
        "w": 105,
        "h": 16
      },
      {
        "x": 0,
        "y": 450,
        "w": 100,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "WindZone",
        "args": [
          {
            "x": 525,
            "y": 175,
            "w": 230,
            "h": 215
          },
          {
            "force": 80,
            "trigger": {
              "x": 715,
              "y": 90,
              "w": 40,
              "h": 280
            }
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 360,
            "y": 365,
            "w": 115,
            "h": 16
          },
          {
            "toX": 465,
            "speed": 100,
            "phase": 0.32
          }
        ]
      },
      {
        "type": "Saw",
        "args": [
          [
            {
              "x": 350,
              "y": 265
            },
            {
              "x": 380,
              "y": 348
            }
          ],
          {
            "speed": 78,
            "r": 16
          }
        ]
      },
      {
        "type": "Conveyor",
        "args": [
          {
            "x": 100,
            "y": 450,
            "w": 95,
            "h": 16
          },
          {
            "dir": 1,
            "force": 65
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 136,
            "y": 255,
            "w": 38,
            "h": 38
          },
          {
            "x": 265,
            "y": 210,
            "w": 40,
            "h": 180
          },
          {
            "shakeTime": 0.5,
            "floorY": 450
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          195,
          540,
          765,
          {
            "size": 28
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 66,
    "season": 2,
    "name": "LANTERN RELAY",
    "seed": 66,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 50,
      "y": 448
    },
    "exit": {
      "positions": [
        {
          "x": 42,
          "y": 116
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 480,
        "w": 205,
        "h": 60
      },
      {
        "x": 565,
        "y": 480,
        "w": 88,
        "h": 16
      },
      {
        "x": 720,
        "y": 480,
        "w": 240,
        "h": 60
      },
      {
        "x": 690,
        "y": 205,
        "w": 270,
        "h": 16
      },
      {
        "x": 450,
        "y": 145,
        "w": 135,
        "h": 16
      },
      {
        "x": 0,
        "y": 180,
        "w": 205,
        "h": 16
      },
      {
        "x": 0,
        "y": 255,
        "w": 960,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 215,
            "y": 446,
            "w": 125,
            "h": 16
          },
          {
            "toX": 615,
            "speed": 160,
            "phase": 0.72
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 495,
            "y": 271,
            "len": 269,
            "vertical": true,
            "period": 2.35,
            "warn": 0.4,
            "fire": 0.42,
            "phase": 0.02
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          870,
          432,
          850,
          157,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Pendulum",
        "args": [
          580,
          12,
          {
            "len": 145,
            "amp": 0.63,
            "speed": 1.8,
            "r": 14
          }
        ]
      },
      {
        "type": "CollapseFloor",
        "args": [
          {
            "x": 270,
            "y": 175,
            "w": 105,
            "h": 16
          },
          {
            "x": 395,
            "y": 30,
            "w": 40,
            "h": 200
          },
          {
            "delay": 0.62,
            "shakeTime": 0.2
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          205,
          540,
          515,
          {
            "size": 32
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 67,
    "season": 2,
    "name": "THE TRAPDOOR ORGAN",
    "seed": 67,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 50,
      "y": 158
    },
    "exit": {
      "positions": [
        {
          "x": 900,
          "y": 261
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 190,
        "w": 190,
        "h": 16
      },
      {
        "x": 310,
        "y": 190,
        "w": 145,
        "h": 16
      },
      {
        "x": 0,
        "y": 240,
        "w": 455,
        "h": 16
      },
      {
        "x": 565,
        "y": 190,
        "w": 90,
        "h": 16
      },
      {
        "x": 300,
        "y": 480,
        "w": 430,
        "h": 60
      },
      {
        "x": 755,
        "y": 400,
        "w": 92,
        "h": 16
      },
      {
        "x": 865,
        "y": 325,
        "w": 95,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "BlinkPlatform",
        "args": [
          {
            "x": 210,
            "y": 140,
            "w": 85,
            "h": 16
          },
          {
            "period": 1.8,
            "onFrac": 0.76,
            "phase": 0.05
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          390,
          180,
          "organ"
        ]
      },
      {
        "type": "CollapseFloor",
        "args": [
          {
            "x": 455,
            "y": 190,
            "w": 110,
            "h": 16
          },
          {
            "x": 410,
            "y": 30,
            "w": 35,
            "h": 190
          },
          {
            "delay": 0.22,
            "shakeTime": 0.15
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 675,
            "y": 0,
            "w": 22,
            "h": 480
          },
          "organ"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          600,
          480,
          47,
          {
            "x": 480,
            "y": 310,
            "w": 50,
            "h": 170
          },
          {
            "delay": 0.32
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          730,
          540,
          230,
          {
            "size": 28
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 68,
    "season": 2,
    "name": "AFTERIMAGE",
    "seed": 68,
    "targetDifficulty": "HARD",
    "spawn": {
      "x": 45,
      "y": 448
    },
    "exit": {
      "positions": [
        {
          "x": 269,
          "y": 351
        },
        {
          "x": 535,
          "y": 246
        },
        {
          "x": 889,
          "y": 141
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "platforms": [
      {
        "x": 0,
        "y": 480,
        "w": 165,
        "h": 60
      },
      {
        "x": 500,
        "y": 310,
        "w": 150,
        "h": 16
      },
      {
        "x": 830,
        "y": 205,
        "w": 130,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "BlinkPlatform",
        "args": [
          {
            "x": 228,
            "y": 415,
            "w": 115,
            "h": 16
          },
          {
            "period": 2,
            "onFrac": 0.76,
            "phase": 0.02
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 365,
            "y": 375,
            "w": 90,
            "h": 16
          },
          {
            "toX": 405,
            "toY": 323,
            "speed": 80,
            "phase": 0.33
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 535,
            "y": 120,
            "w": 42,
            "h": 38
          },
          {
            "x": 490,
            "y": 120,
            "w": 35,
            "h": 190
          },
          {
            "shakeTime": 0.65,
            "floorY": 310
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          615,
          310,
          {
            "power": -975,
            "w": 50
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          165,
          540,
          795,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 69,
    "season": 2,
    "name": "COUNTERSIGN",
    "seed": 69,
    "targetDifficulty": "EXPERT",
    "spawn": {
      "x": 55,
      "y": 173
    },
    "exit": {
      "positions": [
        {
          "x": 45,
          "y": 436
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 205,
        "w": 175,
        "h": 16
      },
      {
        "x": 232,
        "y": 145,
        "w": 105,
        "h": 16
      },
      {
        "x": 385,
        "y": 90,
        "w": 150,
        "h": 16
      },
      {
        "x": 590,
        "y": 185,
        "w": 370,
        "h": 16
      },
      {
        "x": 0,
        "y": 235,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 500,
        "w": 960,
        "h": 40
      },
      {
        "x": 615,
        "y": 435,
        "w": 100,
        "h": 16
      },
      {
        "x": 460,
        "y": 375,
        "w": 105,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Button",
        "args": [
          465,
          80,
          "sig1"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 663,
            "y": 0,
            "w": 22,
            "h": 185
          },
          "sig1"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          855,
          137,
          845,
          452,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 694,
            "y": 258,
            "w": 42,
            "h": 40
          },
          {
            "x": 765,
            "y": 310,
            "w": 35,
            "h": 190
          },
          {
            "shakeTime": 0.5,
            "floorY": 500
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          480,
          365,
          "sig2"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 318,
            "y": 251,
            "w": 22,
            "h": 249
          },
          "sig2"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          175,
          500,
          65,
          {
            "x": 260,
            "y": 300,
            "w": 30,
            "h": 200
          },
          {
            "delay": 0.24
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 70,
    "season": 2,
    "name": "THE LAST CARILLON",
    "seed": 70,
    "targetDifficulty": "EXPERT",
    "spawn": {
      "x": 48,
      "y": 468
    },
    "exit": {
      "positions": [
        {
          "x": 60,
          "y": 126
        }
      ]
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 220,
        "h": 40
      },
      {
        "x": 270,
        "y": 365,
        "w": 140,
        "h": 16
      },
      {
        "x": 755,
        "y": 380,
        "w": 205,
        "h": 16
      },
      {
        "x": 710,
        "y": 190,
        "w": 250,
        "h": 16
      },
      {
        "x": 530,
        "y": 125,
        "w": 110,
        "h": 16
      },
      {
        "x": 320,
        "y": 185,
        "w": 130,
        "h": 16
      },
      {
        "x": 0,
        "y": 190,
        "w": 260,
        "h": 16
      },
      {
        "x": 0,
        "y": 240,
        "w": 960,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "traps": [
      {
        "type": "Spring",
        "args": [
          143,
          500,
          {
            "power": -980,
            "w": 55
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 440,
            "y": 377,
            "w": 110,
            "h": 16
          },
          {
            "toX": 630,
            "speed": 140,
            "phase": 0.45
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 602,
            "y": 256,
            "len": 284,
            "vertical": true,
            "period": 1.85,
            "warn": 0.4,
            "fire": 0.48,
            "phase": 0.2
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          885,
          332,
          845,
          142,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          570,
          115,
          "last"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 235,
            "y": 0,
            "w": 23,
            "h": 190
          },
          "last"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          146,
          190,
          48,
          {
            "x": 285,
            "y": 30,
            "w": 35,
            "h": 170
          },
          {
            "delay": 0.35
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          220,
          540,
          740,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 71,
    "season": 2,
    "name": "LOOSE THREAD",
    "seed": 71,
    "spawn": {
      "x": 52,
      "y": 208
    },
    "platforms": [
      {
        "x": 0,
        "y": 240,
        "w": 200,
        "h": 16
      },
      {
        "x": 248,
        "y": 175,
        "w": 108,
        "h": 16
      },
      {
        "x": 415,
        "y": 112,
        "w": 120,
        "h": 16
      },
      {
        "x": 593,
        "y": 175,
        "w": 102,
        "h": 16
      },
      {
        "x": 758,
        "y": 235,
        "w": 135,
        "h": 16
      },
      {
        "x": 0,
        "y": 490,
        "w": 335,
        "h": 50
      },
      {
        "x": 468,
        "y": 490,
        "w": 492,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 818,
          "y": 171
        },
        {
          "x": 65,
          "y": 426
        }
      ],
      "options": {
        "fleeDist": 65
      }
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          465,
          102,
          "thread"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 188,
            "y": 256,
            "w": 22,
            "h": 234
          },
          "thread"
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 595,
            "y": 260,
            "len": 230,
            "vertical": true,
            "period": 1.85,
            "warn": 0.42,
            "fire": 0.48,
            "phase": 0.18
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          246,
          490,
          48,
          {
            "x": 470,
            "y": 280,
            "w": 35,
            "h": 210
          },
          {
            "delay": 0.24
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          335,
          540,
          133,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 72,
    "season": 2,
    "name": "DOVETAIL",
    "seed": 72,
    "spawn": {
      "x": 45,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 255,
        "h": 40
      },
      {
        "x": 297,
        "y": 340,
        "w": 308,
        "h": 16
      },
      {
        "x": 602,
        "y": 180,
        "w": 228,
        "h": 16
      },
      {
        "x": 275,
        "y": 155,
        "w": 105,
        "h": 16
      },
      {
        "x": 0,
        "y": 180,
        "w": 205,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 693,
          "y": 116
        },
        {
          "x": 46,
          "y": 116
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "traps": [
      {
        "type": "Spring",
        "args": [
          163,
          500,
          {
            "w": 58,
            "power": -985
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          534,
          340,
          {
            "w": 65,
            "power": -1010
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 392,
            "y": 188,
            "w": 108,
            "h": 16
          },
          {
            "delay": 0.8
          }
        ]
      },
      {
        "type": "Saw",
        "args": [
          [
            {
              "x": 228,
              "y": 144
            },
            {
              "x": 250,
              "y": 183
            }
          ],
          {
            "speed": 85,
            "r": 13
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          90,
          180,
          38,
          {
            "x": 241,
            "y": 30,
            "w": 40,
            "h": 150
          },
          {
            "delay": 0.27
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          255,
          540,
          705,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 73,
    "season": 2,
    "name": "THE INSPECTION PIT",
    "seed": 73,
    "spawn": {
      "x": 866,
      "y": 305
    },
    "platforms": [
      {
        "x": 765,
        "y": 337,
        "w": 195,
        "h": 16
      },
      {
        "x": 585,
        "y": 390,
        "w": 110,
        "h": 16
      },
      {
        "x": 425,
        "y": 445,
        "w": 100,
        "h": 16
      },
      {
        "x": 0,
        "y": 500,
        "w": 358,
        "h": 40
      },
      {
        "x": 0,
        "y": 240,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 185,
        "w": 245,
        "h": 16
      },
      {
        "x": 305,
        "y": 130,
        "w": 104,
        "h": 16
      },
      {
        "x": 472,
        "y": 185,
        "w": 124,
        "h": 16
      },
      {
        "x": 670,
        "y": 175,
        "w": 290,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 881,
          "y": 111
        }
      ]
    },
    "traps": [
      {
        "type": "Crusher",
        "args": [
          615,
          47,
          {
            "topY": 258,
            "floorY": 390,
            "period": 1.84,
            "hold": 0.15,
            "phase": 0.53,
            "upSpeed": 270
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 267,
            "y": 280,
            "w": 46,
            "h": 42
          },
          {
            "x": 350,
            "y": 315,
            "w": 48,
            "h": 185
          },
          {
            "shakeTime": 0.46,
            "floorY": 500
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          165,
          490,
          "inspect"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          60,
          452,
          72,
          137,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 541,
            "y": 0,
            "len": 240,
            "vertical": true,
            "period": 1.95,
            "warn": 0.4,
            "fire": 0.45
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 745,
            "y": 0,
            "w": 24,
            "h": 175
          },
          "inspect"
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          358,
          540,
          602,
          {
            "size": 28
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 74,
    "season": 2,
    "name": "NEEDLE VALVE",
    "seed": 74,
    "spawn": {
      "x": 48,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 230,
        "h": 40
      },
      {
        "x": 255,
        "y": 425,
        "w": 110,
        "h": 16
      },
      {
        "x": 740,
        "y": 415,
        "w": 220,
        "h": 16
      },
      {
        "x": 0,
        "y": 260,
        "w": 960,
        "h": 16
      },
      {
        "x": 665,
        "y": 180,
        "w": 295,
        "h": 16
      },
      {
        "x": 330,
        "y": 125,
        "w": 110,
        "h": 16
      },
      {
        "x": 0,
        "y": 190,
        "w": 250,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 43,
          "y": 126
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          290,
          415,
          "inlet"
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 380,
            "y": 411,
            "w": 118,
            "h": 16
          },
          {
            "toX": 628,
            "speed": 135,
            "phase": 0.6
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 568,
            "y": 276,
            "len": 264,
            "vertical": true,
            "period": 2.1,
            "warn": 0.4,
            "fire": 0.42,
            "phase": 0.16
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 785,
            "y": 276,
            "w": 22,
            "h": 139
          },
          "inlet"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          880,
          367,
          820,
          132,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 512,
            "y": 178,
            "w": 94,
            "h": 16
          },
          {
            "delay": 0.54
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          145,
          190,
          47,
          {
            "x": 265,
            "y": 10,
            "w": 35,
            "h": 180
          },
          {
            "delay": 0.28
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          230,
          540,
          730,
          {
            "size": 32
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 75,
    "season": 2,
    "name": "SUNDIAL STEPS",
    "seed": 75,
    "spawn": {
      "x": 48,
      "y": 458
    },
    "platforms": [
      {
        "x": 0,
        "y": 490,
        "w": 180,
        "h": 50
      },
      {
        "x": 222,
        "y": 420,
        "w": 108,
        "h": 16
      },
      {
        "x": 498,
        "y": 290,
        "w": 140,
        "h": 16
      },
      {
        "x": 800,
        "y": 250,
        "w": 160,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 257,
          "y": 356
        },
        {
          "x": 545,
          "y": 226
        },
        {
          "x": 887,
          "y": 186
        }
      ],
      "options": {
        "fleeDist": 62
      }
    },
    "traps": [
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 365,
            "y": 356,
            "w": 96,
            "h": 16
          },
          {
            "delay": 0.45
          }
        ]
      },
      {
        "type": "Pendulum",
        "args": [
          647,
          53,
          {
            "len": 160,
            "amp": 0.68,
            "speed": 1.9,
            "r": 16
          }
        ]
      },
      {
        "type": "BlinkPlatform",
        "args": [
          {
            "x": 670,
            "y": 236,
            "w": 80,
            "h": 16
          },
          {
            "period": 1.8,
            "onFrac": 0.72,
            "phase": 0.17
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 830,
            "y": 76,
            "w": 42,
            "h": 34
          },
          {
            "x": 742,
            "y": 92,
            "w": 52,
            "h": 170
          },
          {
            "shakeTime": 0.56,
            "floorY": 250
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          180,
          540,
          780,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 76,
    "season": 2,
    "name": "FIRE ESCAPE",
    "seed": 76,
    "spawn": {
      "x": 50,
      "y": 173
    },
    "platforms": [
      {
        "x": 0,
        "y": 205,
        "w": 250,
        "h": 16
      },
      {
        "x": 299,
        "y": 142,
        "w": 125,
        "h": 16
      },
      {
        "x": 468,
        "y": 205,
        "w": 98,
        "h": 16
      },
      {
        "x": 705,
        "y": 205,
        "w": 25,
        "h": 16
      },
      {
        "x": 730,
        "y": 0,
        "w": 22,
        "h": 540
      },
      {
        "x": 0,
        "y": 265,
        "w": 566,
        "h": 16
      },
      {
        "x": 0,
        "y": 490,
        "w": 730,
        "h": 50
      },
      {
        "x": 752,
        "y": 500,
        "w": 208,
        "h": 40
      },
      {
        "x": 850,
        "y": 305,
        "w": 110,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 893,
          "y": 241
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          360,
          132,
          "escape"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 566,
            "y": 205,
            "w": 139,
            "h": 16
          },
          "escape"
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 455,
            "y": 281,
            "len": 209,
            "vertical": true,
            "period": 1.85,
            "warn": 0.42,
            "fire": 0.45,
            "phase": 0.25
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          251,
          490,
          57,
          {
            "x": 555,
            "y": 290,
            "w": 40,
            "h": 200
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          70,
          442,
          757,
          452,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          796,
          500,
          {
            "w": 47,
            "power": -1010
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 77,
    "season": 2,
    "name": "THE GLASSBLOWER",
    "seed": 77,
    "spawn": {
      "x": 247,
      "y": 458
    },
    "platforms": [
      {
        "x": 0,
        "y": 490,
        "w": 450,
        "h": 50
      },
      {
        "x": 300,
        "y": 425,
        "w": 115,
        "h": 16
      },
      {
        "x": 218,
        "y": 358,
        "w": 95,
        "h": 16
      },
      {
        "x": 0,
        "y": 390,
        "w": 145,
        "h": 16
      },
      {
        "x": 450,
        "y": 0,
        "w": 24,
        "h": 540
      },
      {
        "x": 474,
        "y": 500,
        "w": 486,
        "h": 40
      },
      {
        "x": 570,
        "y": 335,
        "w": 130,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 45,
          "y": 326
        }
      ]
    },
    "traps": [
      {
        "type": "Teleporter",
        "args": [
          249,
          310,
          890,
          452,
          {
            "twoWay": true
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          774,
          500,
          {
            "w": 60,
            "power": -980
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          599,
          325,
          "glass"
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 861,
            "y": 220,
            "w": 38,
            "h": 45
          },
          {
            "x": 575,
            "y": 200,
            "w": 70,
            "h": 135
          },
          {
            "shakeTime": 0.48,
            "floorY": 500
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 170,
            "y": 0,
            "w": 22,
            "h": 490
          },
          "glass"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          91,
          390,
          35,
          {
            "x": 178,
            "y": 240,
            "w": 35,
            "h": 180
          },
          {
            "delay": 0.3
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 78,
    "season": 2,
    "name": "DEAD LETTER LIFT",
    "seed": 78,
    "spawn": {
      "x": 48,
      "y": 458
    },
    "platforms": [
      {
        "x": 0,
        "y": 490,
        "w": 180,
        "h": 50
      },
      {
        "x": 438,
        "y": 300,
        "w": 112,
        "h": 16
      },
      {
        "x": 801,
        "y": 285,
        "w": 159,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 902,
          "y": 221
        }
      ]
    },
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 200,
            "y": 452,
            "w": 103,
            "h": 16
          },
          {
            "toX": 345,
            "toY": 327,
            "speed": 112,
            "phase": 0.65
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 575,
            "y": 240,
            "w": 78,
            "h": 16
          },
          {
            "delay": 0.49
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 664,
            "y": 305,
            "w": 83,
            "h": 16
          },
          {
            "toX": 716,
            "speed": 75,
            "phase": 0.32
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 772,
            "y": 60,
            "len": 480,
            "vertical": true,
            "period": 1.95,
            "warn": 0.45,
            "fire": 0.5,
            "phase": 0.09
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 850,
            "y": 75,
            "w": 45,
            "h": 40
          },
          {
            "x": 752,
            "y": 125,
            "w": 36,
            "h": 185
          },
          {
            "shakeTime": 0.52,
            "floorY": 285
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          180,
          540,
          780,
          {
            "size": 32
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 79,
    "season": 2,
    "name": "CARBON COPY",
    "seed": 79,
    "spawn": {
      "x": 50,
      "y": 458
    },
    "platforms": [
      {
        "x": 0,
        "y": 490,
        "w": 547,
        "h": 50
      },
      {
        "x": 680,
        "y": 490,
        "w": 280,
        "h": 50
      },
      {
        "x": 0,
        "y": 255,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 195,
        "w": 240,
        "h": 16
      },
      {
        "x": 292,
        "y": 134,
        "w": 100,
        "h": 16
      },
      {
        "x": 455,
        "y": 190,
        "w": 505,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 891,
          "y": 126
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          238,
          480,
          "pressureA",
          {
            "w": 92,
            "momentary": true
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 385,
            "y": 271,
            "w": 20,
            "h": 219
          },
          "pressureA",
          {
            "closeSpeed": 0.64
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          855,
          442,
          72,
          147,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          494,
          190,
          46,
          {
            "x": 830,
            "y": 295,
            "w": 38,
            "h": 195
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          600,
          180,
          "pressureB",
          {
            "w": 80,
            "momentary": true
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 746,
            "y": 0,
            "w": 20,
            "h": 190
          },
          "pressureB",
          {
            "closeSpeed": 0.78
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 808,
            "y": 0,
            "len": 190,
            "vertical": true,
            "period": 1.95,
            "warn": 0.4,
            "fire": 0.46,
            "phase": 0.15
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          547,
          540,
          133,
          {
            "size": 32
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 80,
    "season": 2,
    "name": "NIGHT WATCH",
    "seed": 80,
    "spawn": {
      "x": 50,
      "y": 180
    },
    "platforms": [
      {
        "x": 0,
        "y": 212,
        "w": 188,
        "h": 16
      },
      {
        "x": 245,
        "y": 149,
        "w": 106,
        "h": 16
      },
      {
        "x": 423,
        "y": 103,
        "w": 125,
        "h": 16
      },
      {
        "x": 610,
        "y": 165,
        "w": 105,
        "h": 16
      },
      {
        "x": 767,
        "y": 210,
        "w": 135,
        "h": 16
      },
      {
        "x": 0,
        "y": 250,
        "w": 865,
        "h": 16
      },
      {
        "x": 733,
        "y": 500,
        "w": 227,
        "h": 40
      },
      {
        "x": 530,
        "y": 374,
        "w": 143,
        "h": 16
      },
      {
        "x": 0,
        "y": 490,
        "w": 235,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 826,
          "y": 146
        },
        {
          "x": 47,
          "y": 426
        }
      ],
      "options": {
        "fleeDist": 65
      }
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          472,
          93,
          "watch"
        ]
      },
      {
        "type": "Pendulum",
        "args": [
          580,
          18,
          {
            "len": 137,
            "amp": 0.6,
            "speed": 1.82,
            "r": 14
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          777,
          500,
          {
            "w": 52,
            "power": -931
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 265,
            "y": 452,
            "w": 105,
            "h": 16
          },
          {
            "toX": 419,
            "speed": 118,
            "phase": 0.5
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 361,
            "y": 266,
            "len": 274,
            "vertical": true,
            "period": 2.1,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.18
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 199,
            "y": 266,
            "w": 21,
            "h": 224
          },
          "watch"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          122,
          490,
          41,
          {
            "x": 237,
            "y": 285,
            "w": 43,
            "h": 225
          },
          {
            "delay": 0.26
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          235,
          540,
          498,
          {
            "size": 32
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 81,
    "season": 2,
    "name": "THE SWITCHBACK ARCHIVE",
    "seed": 81,
    "spawn": {
      "x": 48,
      "y": 458
    },
    "platforms": [
      {
        "x": 0,
        "y": 490,
        "w": 205,
        "h": 50
      },
      {
        "x": 245,
        "y": 420,
        "w": 110,
        "h": 16
      },
      {
        "x": 402,
        "y": 355,
        "w": 128,
        "h": 16
      },
      {
        "x": 585,
        "y": 418,
        "w": 120,
        "h": 16
      },
      {
        "x": 760,
        "y": 480,
        "w": 200,
        "h": 60
      },
      {
        "x": 0,
        "y": 245,
        "w": 960,
        "h": 16
      },
      {
        "x": 650,
        "y": 170,
        "w": 310,
        "h": 16
      },
      {
        "x": 400,
        "y": 112,
        "w": 125,
        "h": 16
      },
      {
        "x": 0,
        "y": 170,
        "w": 290,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 80,
          "y": 106
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          444,
          345,
          "archive"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 803,
            "y": 261,
            "w": 22,
            "h": 219
          },
          "archive"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          884,
          432,
          835,
          122,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          183,
          170,
          45,
          {
            "x": 851,
            "y": 285,
            "w": 34,
            "h": 195
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 575,
            "y": 0,
            "len": 245,
            "vertical": true,
            "period": 2.1,
            "warn": 0.45,
            "fire": 0.46,
            "phase": 0.1
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          205,
          540,
          555,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 82,
    "season": 2,
    "name": "COUNTERWEIGHT POST",
    "seed": 82,
    "spawn": {
      "x": 873,
      "y": 458
    },
    "platforms": [
      {
        "x": 790,
        "y": 490,
        "w": 170,
        "h": 50
      },
      {
        "x": 347,
        "y": 315,
        "w": 145,
        "h": 16
      },
      {
        "x": 0,
        "y": 385,
        "w": 250,
        "h": 16
      },
      {
        "x": 0,
        "y": 250,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 180,
        "w": 195,
        "h": 16
      },
      {
        "x": 245,
        "y": 115,
        "w": 113,
        "h": 16
      },
      {
        "x": 420,
        "y": 170,
        "w": 125,
        "h": 16
      },
      {
        "x": 610,
        "y": 110,
        "w": 108,
        "h": 16
      },
      {
        "x": 780,
        "y": 180,
        "w": 180,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 867,
          "y": 116
        }
      ]
    },
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 640,
            "y": 422,
            "w": 118,
            "h": 16
          },
          {
            "toX": 505,
            "toY": 325,
            "speed": 125,
            "phase": 0.8
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          399,
          305,
          "post"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 271,
            "y": 266,
            "w": 22,
            "h": 274
          },
          "post"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          75,
          337,
          57,
          132,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 836,
            "y": 22,
            "w": 42,
            "h": 34
          },
          {
            "x": 725,
            "y": 0,
            "w": 40,
            "h": 200
          },
          {
            "shakeTime": 0.6,
            "floorY": 180
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          250,
          540,
          540,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 83,
    "season": 2,
    "name": "THE DOUBLE HELIX",
    "seed": 83,
    "spawn": {
      "x": 887,
      "y": 468
    },
    "platforms": [
      {
        "x": 700,
        "y": 500,
        "w": 260,
        "h": 40
      },
      {
        "x": 410,
        "y": 325,
        "w": 185,
        "h": 16
      },
      {
        "x": 285,
        "y": 500,
        "w": 270,
        "h": 40
      },
      {
        "x": 125,
        "y": 310,
        "w": 125,
        "h": 16
      },
      {
        "x": 0,
        "y": 470,
        "w": 190,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 78,
          "y": 406
        }
      ]
    },
    "traps": [
      {
        "type": "Spring",
        "args": [
          748,
          500,
          {
            "w": 60,
            "power": -995
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          458,
          315,
          "helix"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 326,
            "y": 341,
            "w": 22,
            "h": 159
          },
          "helix"
        ]
      },
      {
        "type": "Spring",
        "args": [
          375,
          500,
          {
            "w": 58,
            "power": -1000
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          154,
          262,
          840,
          237,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 776,
            "y": 285,
            "w": 151,
            "h": 16
          },
          {
            "delay": 0.85
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          875,
          237,
          160,
          422,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          106,
          470,
          32,
          {
            "x": 830,
            "y": 170,
            "w": 38,
            "h": 115
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          190,
          540,
          95,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 84,
    "season": 2,
    "name": "THE SILENT FOUNDRY",
    "seed": 84,
    "spawn": {
      "x": 48,
      "y": 238
    },
    "platforms": [
      {
        "x": 0,
        "y": 270,
        "w": 185,
        "h": 16
      },
      {
        "x": 242,
        "y": 210,
        "w": 128,
        "h": 16
      },
      {
        "x": 430,
        "y": 275,
        "w": 110,
        "h": 16
      },
      {
        "x": 603,
        "y": 215,
        "w": 130,
        "h": 16
      },
      {
        "x": 794,
        "y": 215,
        "w": 110,
        "h": 16
      },
      {
        "x": 0,
        "y": 330,
        "w": 850,
        "h": 16
      },
      {
        "x": 680,
        "y": 500,
        "w": 280,
        "h": 40
      },
      {
        "x": 444,
        "y": 436,
        "w": 130,
        "h": 16
      },
      {
        "x": 0,
        "y": 500,
        "w": 320,
        "h": 40
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 867,
          "y": 151
        },
        {
          "x": 70,
          "y": 436
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "traps": [
      {
        "type": "Crusher",
        "args": [
          284,
          44,
          {
            "topY": 65,
            "floorY": 210,
            "period": 2.05,
            "hold": 0.16,
            "phase": 0.36,
            "upSpeed": 280
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          644,
          205,
          "cast"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 192,
            "y": 346,
            "w": 23,
            "h": 154
          },
          "cast"
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 592,
            "y": 346,
            "len": 194,
            "vertical": true,
            "period": 2,
            "warn": 0.45,
            "fire": 0.46,
            "phase": 0.12
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          271,
          500,
          37,
          {
            "x": 610,
            "y": 350,
            "w": 35,
            "h": 150
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          320,
          540,
          360,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 85,
    "season": 2,
    "name": "BORROWED SECONDS",
    "seed": 85,
    "spawn": {
      "x": 52,
      "y": 458
    },
    "platforms": [
      {
        "x": 0,
        "y": 490,
        "w": 355,
        "h": 50
      },
      {
        "x": 399,
        "y": 420,
        "w": 128,
        "h": 16
      },
      {
        "x": 625,
        "y": 300,
        "w": 120,
        "h": 16
      },
      {
        "x": 802,
        "y": 175,
        "w": 158,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 876,
          "y": 111
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          182,
          480,
          "seconds",
          {
            "w": 95,
            "momentary": true
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 310,
            "y": 0,
            "w": 20,
            "h": 490
          },
          "seconds",
          {
            "closeSpeed": 0.62
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 539,
            "y": 359,
            "w": 85,
            "h": 16
          },
          {
            "delay": 0.7
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 727,
            "y": 238,
            "w": 88,
            "h": 16
          },
          {
            "delay": 0.7
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 841,
            "y": 20,
            "w": 38,
            "h": 34
          },
          {
            "x": 765,
            "y": 90,
            "w": 34,
            "h": 190
          },
          {
            "shakeTime": 0.64,
            "floorY": 175
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          355,
          540,
          605,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 86,
    "season": 2,
    "name": "UNDER THE ORCHARD",
    "seed": 86,
    "spawn": {
      "x": 46,
      "y": 218
    },
    "platforms": [
      {
        "x": 0,
        "y": 250,
        "w": 193,
        "h": 16
      },
      {
        "x": 249,
        "y": 185,
        "w": 112,
        "h": 16
      },
      {
        "x": 423,
        "y": 245,
        "w": 116,
        "h": 16
      },
      {
        "x": 605,
        "y": 182,
        "w": 115,
        "h": 16
      },
      {
        "x": 780,
        "y": 250,
        "w": 180,
        "h": 16
      },
      {
        "x": 0,
        "y": 300,
        "w": 960,
        "h": 16
      },
      {
        "x": 730,
        "y": 490,
        "w": 230,
        "h": 50
      },
      {
        "x": 0,
        "y": 490,
        "w": 263,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 76,
          "y": 426
        }
      ]
    },
    "traps": [
      {
        "type": "Teleporter",
        "args": [
          871,
          202,
          855,
          442,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 315,
            "y": 459,
            "w": 135,
            "h": 16
          },
          {
            "toX": 597,
            "speed": 155,
            "phase": 0.2
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 669,
            "y": 320,
            "w": 38,
            "h": 34
          },
          {
            "x": 700,
            "y": 320,
            "w": 35,
            "h": 170
          },
          {
            "shakeTime": 0.55,
            "floorY": 490
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          162,
          490,
          42,
          {
            "x": 281,
            "y": 320,
            "w": 35,
            "h": 170
          },
          {
            "delay": 0.27
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          263,
          540,
          467,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 87,
    "season": 2,
    "name": "THE PRISM LOCK",
    "seed": 87,
    "spawn": {
      "x": 55,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 259,
        "h": 40
      },
      {
        "x": 300,
        "y": 320,
        "w": 160,
        "h": 16
      },
      {
        "x": 515,
        "y": 255,
        "w": 145,
        "h": 16
      },
      {
        "x": 0,
        "y": 200,
        "w": 195,
        "h": 16
      },
      {
        "x": 253,
        "y": 133,
        "w": 115,
        "h": 16
      },
      {
        "x": 432,
        "y": 190,
        "w": 125,
        "h": 16
      },
      {
        "x": 621,
        "y": 125,
        "w": 108,
        "h": 16
      },
      {
        "x": 795,
        "y": 180,
        "w": 165,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 878,
          "y": 116
        }
      ]
    },
    "traps": [
      {
        "type": "Spring",
        "args": [
          155,
          500,
          {
            "w": 62,
            "power": -1010
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          551,
          245,
          "prism"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          613,
          207,
          75,
          152,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 587,
            "y": 0,
            "len": 200,
            "vertical": true,
            "period": 2,
            "warn": 0.44,
            "fire": 0.44,
            "phase": 0.15
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 752,
            "y": 0,
            "w": 22,
            "h": 540
          },
          "prism"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          840,
          180,
          36,
          {
            "x": 591,
            "y": 205,
            "w": 33,
            "h": 50
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          259,
          540,
          701,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 88,
    "season": 2,
    "name": "THE EMPTY BALCONY",
    "seed": 88,
    "spawn": {
      "x": 865,
      "y": 468
    },
    "platforms": [
      {
        "x": 740,
        "y": 500,
        "w": 220,
        "h": 40
      },
      {
        "x": 554,
        "y": 310,
        "w": 163,
        "h": 16
      },
      {
        "x": 280,
        "y": 270,
        "w": 115,
        "h": 16
      },
      {
        "x": 0,
        "y": 430,
        "w": 192,
        "h": 16
      },
      {
        "x": 130,
        "y": 300,
        "w": 25,
        "h": 130
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 600,
          "y": 246
        },
        {
          "x": 69,
          "y": 366
        }
      ],
      "options": {
        "fleeDist": 62
      }
    },
    "traps": [
      {
        "type": "Spring",
        "args": [
          783,
          500,
          {
            "w": 60,
            "power": -1010
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 417,
            "y": 350,
            "w": 105,
            "h": 16
          },
          {
            "toY": 267,
            "speed": 85,
            "phase": 0.5
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 185,
            "y": 345,
            "w": 94,
            "h": 16
          },
          {
            "delay": 0.7
          }
        ]
      },
      {
        "type": "Saw",
        "args": [
          [
            {
              "x": 228,
              "y": 397
            },
            {
              "x": 285,
              "y": 440
            }
          ],
          {
            "speed": 80,
            "r": 14
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          192,
          540,
          548,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 89,
    "season": 2,
    "name": "THE FLOODGATE",
    "seed": 89,
    "spawn": {
      "x": 52,
      "y": 198
    },
    "platforms": [
      {
        "x": 0,
        "y": 230,
        "w": 220,
        "h": 16
      },
      {
        "x": 282,
        "y": 165,
        "w": 118,
        "h": 16
      },
      {
        "x": 461,
        "y": 225,
        "w": 122,
        "h": 16
      },
      {
        "x": 645,
        "y": 160,
        "w": 115,
        "h": 16
      },
      {
        "x": 815,
        "y": 230,
        "w": 145,
        "h": 16
      },
      {
        "x": 0,
        "y": 280,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 490,
        "w": 275,
        "h": 50
      },
      {
        "x": 475,
        "y": 430,
        "w": 143,
        "h": 16
      },
      {
        "x": 760,
        "y": 490,
        "w": 200,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 877,
          "y": 426
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          685,
          150,
          "flood"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 787,
            "y": 0,
            "w": 20,
            "h": 280
          },
          "flood"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          875,
          182,
          54,
          442,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          179,
          490,
          43,
          {
            "x": 848,
            "y": 0,
            "w": 30,
            "h": 230
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 335,
            "y": 468,
            "w": 90,
            "h": 16
          },
          {
            "delay": 0.7
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 687,
            "y": 296,
            "len": 244,
            "vertical": true,
            "period": 2.05,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.2
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          275,
          540,
          485,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 90,
    "season": 2,
    "name": "CLOSING THE VAULT",
    "seed": 90,
    "spawn": {
      "x": 46,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 183,
        "h": 40
      },
      {
        "x": 474,
        "y": 390,
        "w": 151,
        "h": 16
      },
      {
        "x": 680,
        "y": 320,
        "w": 125,
        "h": 16
      },
      {
        "x": 837,
        "y": 205,
        "w": 80,
        "h": 16
      },
      {
        "x": 676,
        "y": 150,
        "w": 106,
        "h": 16
      },
      {
        "x": 505,
        "y": 210,
        "w": 110,
        "h": 16
      },
      {
        "x": 0,
        "y": 265,
        "w": 625,
        "h": 16
      },
      {
        "x": 812,
        "y": 500,
        "w": 148,
        "h": 40
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 888,
          "y": 141
        },
        {
          "x": 894,
          "y": 436
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 215,
            "y": 463,
            "w": 119,
            "h": 16
          },
          {
            "toX": 353,
            "toY": 413,
            "speed": 125,
            "phase": 0.5
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          526,
          380,
          "vault"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 625,
            "y": 265,
            "w": 187,
            "h": 16
          },
          "vault"
        ]
      },
      {
        "type": "Spring",
        "args": [
          727,
          320,
          {
            "w": 57,
            "power": -960
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 805,
            "y": 0,
            "len": 265,
            "vertical": true,
            "period": 2.1,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.12
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          839,
          500,
          35,
          {
            "x": 892,
            "y": 250,
            "w": 40,
            "h": 200
          },
          {
            "delay": 0.32
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          183,
          540,
          629,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 91,
    "season": 2,
    "name": "THE TURNSTILE",
    "seed": 91,
    "spawn": {
      "x": 365,
      "y": 468
    },
    "platforms": [
      {
        "x": 280,
        "y": 500,
        "w": 320,
        "h": 40
      },
      {
        "x": 665,
        "y": 330,
        "w": 295,
        "h": 16
      },
      {
        "x": 0,
        "y": 255,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 190,
        "w": 210,
        "h": 16
      },
      {
        "x": 575,
        "y": 130,
        "w": 110,
        "h": 16
      },
      {
        "x": 750,
        "y": 200,
        "w": 210,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 871,
          "y": 136
        }
      ]
    },
    "traps": [
      {
        "type": "Spring",
        "args": [
          518,
          500,
          {
            "w": 60,
            "power": -990
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          738,
          320,
          "turn"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          877,
          282,
          63,
          142,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 250,
            "y": 195,
            "w": 120,
            "h": 16
          },
          {
            "toX": 425,
            "toY": 175,
            "speed": 140,
            "phase": 0.65
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 610,
            "y": 0,
            "len": 255,
            "vertical": true,
            "period": 2.15,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.17
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 775,
            "y": 0,
            "w": 21,
            "h": 255
          },
          "turn"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          838,
          200,
          36,
          {
            "x": 841,
            "y": 270,
            "w": 35,
            "h": 60
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          600,
          540,
          360,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 92,
    "season": 2,
    "name": "HIGH WATER MARK",
    "seed": 92,
    "spawn": {
      "x": 874,
      "y": 88
    },
    "platforms": [
      {
        "x": 800,
        "y": 120,
        "w": 160,
        "h": 16
      },
      {
        "x": 629,
        "y": 185,
        "w": 112,
        "h": 16
      },
      {
        "x": 450,
        "y": 255,
        "w": 120,
        "h": 16
      },
      {
        "x": 86,
        "y": 390,
        "w": 135,
        "h": 16
      },
      {
        "x": 0,
        "y": 500,
        "w": 200,
        "h": 40
      },
      {
        "x": 760,
        "y": 260,
        "w": 200,
        "h": 16
      },
      {
        "x": 760,
        "y": 276,
        "w": 22,
        "h": 264
      },
      {
        "x": 782,
        "y": 500,
        "w": 178,
        "h": 40
      },
      {
        "x": 837,
        "y": 410,
        "w": 123,
        "h": 16
      },
      {
        "x": 809,
        "y": 355,
        "w": 70,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 812,
          "y": 291
        }
      ]
    },
    "traps": [
      {
        "type": "Crusher",
        "args": [
          664,
          42,
          {
            "topY": 20,
            "floorY": 185,
            "period": 2.05,
            "hold": 0.16,
            "phase": 0.42,
            "upSpeed": 280
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 272,
            "y": 323,
            "w": 115,
            "h": 16
          },
          {
            "delay": 0.7
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          52,
          452,
          790,
          452,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 906,
            "y": 215,
            "w": 36,
            "h": 34
          },
          {
            "x": 20,
            "y": 405,
            "w": 90,
            "h": 95
          },
          {
            "shakeTime": 0.6,
            "floorY": 500
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          200,
          540,
          560,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 93,
    "season": 2,
    "name": "SPLIT DECISION",
    "seed": 93,
    "spawn": {
      "x": 300,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 460,
        "h": 40
      },
      {
        "x": 249,
        "y": 420,
        "w": 143,
        "h": 16
      },
      {
        "x": 460,
        "y": 0,
        "w": 24,
        "h": 540
      },
      {
        "x": 484,
        "y": 500,
        "w": 476,
        "h": 40
      },
      {
        "x": 490,
        "y": 270,
        "w": 145,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 52,
          "y": 436
        }
      ]
    },
    "traps": [
      {
        "type": "Teleporter",
        "args": [
          333,
          372,
          836,
          452,
          {
            "twoWay": true
          }
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 673,
            "y": 439,
            "w": 115,
            "h": 16
          },
          {
            "toY": 324,
            "speed": 115,
            "phase": 0.2
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          536,
          260,
          "split"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 181,
            "y": 0,
            "w": 22,
            "h": 500
          },
          "split"
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          111,
          500,
          42,
          {
            "x": 216,
            "y": 330,
            "w": 32,
            "h": 170
          },
          {
            "delay": 0.28
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 816,
            "y": 240,
            "w": 40,
            "h": 35
          },
          {
            "x": 500,
            "y": 150,
            "w": 120,
            "h": 120
          },
          {
            "shakeTime": 0.65,
            "floorY": 500
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 94,
    "season": 2,
    "name": "PAPER MOON",
    "seed": 94,
    "spawn": {
      "x": 48,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 245,
        "h": 40
      },
      {
        "x": 330,
        "y": 330,
        "w": 125,
        "h": 16
      },
      {
        "x": 510,
        "y": 265,
        "w": 116,
        "h": 16
      },
      {
        "x": 831,
        "y": 200,
        "w": 129,
        "h": 16
      },
      {
        "x": 641,
        "y": 368,
        "w": 119,
        "h": 16
      },
      {
        "x": 360,
        "y": 480,
        "w": 170,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 873,
          "y": 136
        },
        {
          "x": 426,
          "y": 416
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "traps": [
      {
        "type": "Spring",
        "args": [
          175,
          500,
          {
            "w": 58,
            "power": -990
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          553,
          255,
          "moon"
        ]
      },
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 655,
            "y": 248,
            "w": 108,
            "h": 16
          },
          {
            "toX": 708,
            "toY": 222,
            "speed": 90,
            "phase": 0.4
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 480,
            "y": 340,
            "w": 21,
            "h": 140
          },
          "moon"
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 370,
            "y": 370,
            "w": 36,
            "h": 35
          },
          {
            "x": 777,
            "y": 80,
            "w": 38,
            "h": 200
          },
          {
            "shakeTime": 0.65,
            "floorY": 480
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          245,
          540,
          715,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 95,
    "season": 2,
    "name": "THE LONG FUSE",
    "seed": 95,
    "spawn": {
      "x": 50,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 295,
        "h": 40
      },
      {
        "x": 355,
        "y": 440,
        "w": 120,
        "h": 16
      },
      {
        "x": 535,
        "y": 440,
        "w": 150,
        "h": 16
      },
      {
        "x": 0,
        "y": 265,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 170,
        "w": 215,
        "h": 16
      },
      {
        "x": 470,
        "y": 125,
        "w": 130,
        "h": 16
      },
      {
        "x": 722,
        "y": 190,
        "w": 238,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 878,
          "y": 126
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          363,
          430,
          "fuse",
          {
            "w": 98,
            "momentary": true
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 503,
            "y": 281,
            "w": 21,
            "h": 259
          },
          "fuse",
          {
            "closeSpeed": 0.72
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          612,
          392,
          67,
          122,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 280,
            "y": 180,
            "w": 122,
            "h": 16
          },
          {
            "delay": 0.7
          }
        ]
      },
      {
        "type": "Saw",
        "args": [
          [
            {
              "x": 662,
              "y": 153
            },
            {
              "x": 687,
              "y": 207
            }
          ],
          {
            "speed": 85,
            "r": 14
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          804,
          190,
          40,
          {
            "x": 578,
            "y": 281,
            "w": 32,
            "h": 159
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          295,
          540,
          665,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 96,
    "season": 2,
    "name": "OFF THE RECORD",
    "seed": 96,
    "spawn": {
      "x": 50,
      "y": 208
    },
    "platforms": [
      {
        "x": 0,
        "y": 240,
        "w": 185,
        "h": 16
      },
      {
        "x": 492,
        "y": 180,
        "w": 155,
        "h": 16
      },
      {
        "x": 735,
        "y": 245,
        "w": 225,
        "h": 16
      },
      {
        "x": 0,
        "y": 300,
        "w": 960,
        "h": 16
      },
      {
        "x": 790,
        "y": 490,
        "w": 170,
        "h": 50
      },
      {
        "x": 450,
        "y": 475,
        "w": 125,
        "h": 16
      },
      {
        "x": 0,
        "y": 490,
        "w": 190,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 57,
          "y": 426
        }
      ]
    },
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 220,
            "y": 235,
            "w": 125,
            "h": 16
          },
          {
            "toX": 365,
            "toY": 207,
            "speed": 125,
            "phase": 0.65
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          539,
          170,
          "record"
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 699,
            "y": 0,
            "w": 22,
            "h": 300
          },
          "record"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          877,
          197,
          859,
          442,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 745,
            "y": 320,
            "w": 36,
            "h": 35
          },
          {
            "x": 820,
            "y": 100,
            "w": 30,
            "h": 145
          },
          {
            "shakeTime": 0.65,
            "floorY": 490
          }
        ]
      },
      {
        "type": "BlinkPlatform",
        "args": [
          {
            "x": 635,
            "y": 422,
            "w": 105,
            "h": 16
          },
          {
            "period": 2,
            "onFrac": 0.78,
            "phase": 0.12
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 264,
            "y": 433,
            "w": 116,
            "h": 16
          },
          {
            "delay": 0.72
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          190,
          540,
          600,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 97,
    "season": 2,
    "name": "THE BACKDRAFT",
    "seed": 97,
    "spawn": {
      "x": 52,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 960,
        "h": 40
      },
      {
        "x": 0,
        "y": 300,
        "w": 960,
        "h": 16
      },
      {
        "x": 730,
        "y": 200,
        "w": 230,
        "h": 16
      },
      {
        "x": 552,
        "y": 140,
        "w": 115,
        "h": 16
      },
      {
        "x": 378,
        "y": 205,
        "w": 115,
        "h": 16
      },
      {
        "x": 206,
        "y": 140,
        "w": 115,
        "h": 16
      },
      {
        "x": 0,
        "y": 200,
        "w": 145,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 53,
          "y": 136
        }
      ]
    },
    "traps": [
      {
        "type": "Button",
        "args": [
          185,
          490,
          "draft"
        ]
      },
      {
        "type": "Crusher",
        "args": [
          428,
          48,
          {
            "topY": 332,
            "floorY": 500,
            "period": 2.1,
            "hold": 0.16,
            "phase": 0.3,
            "upSpeed": 290
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 700,
            "y": 316,
            "w": 21,
            "h": 184
          },
          "draft"
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          879,
          452,
          850,
          152,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 518,
            "y": 0,
            "len": 300,
            "vertical": true,
            "period": 2.1,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.12
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          102,
          200,
          30,
          {
            "x": 824,
            "y": 316,
            "w": 33,
            "h": 184
          },
          {
            "delay": 0.3
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 98,
    "season": 2,
    "name": "MISSING RUNG",
    "seed": 98,
    "spawn": {
      "x": 48,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 190,
        "h": 40
      },
      {
        "x": 390,
        "y": 370,
        "w": 170,
        "h": 16
      },
      {
        "x": 625,
        "y": 180,
        "w": 335,
        "h": 16
      },
      {
        "x": 600,
        "y": 260,
        "w": 360,
        "h": 16
      },
      {
        "x": 600,
        "y": 276,
        "w": 23,
        "h": 264
      },
      {
        "x": 650,
        "y": 500,
        "w": 115,
        "h": 40
      },
      {
        "x": 845,
        "y": 500,
        "w": 115,
        "h": 40
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 891,
          "y": 436
        }
      ]
    },
    "traps": [
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 243,
            "y": 435,
            "w": 106,
            "h": 16
          },
          {
            "delay": 0.75
          }
        ]
      },
      {
        "type": "Spring",
        "args": [
          476,
          370,
          {
            "w": 58,
            "power": -1010
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          858,
          132,
          677,
          452,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          878,
          500,
          35,
          {
            "x": 796,
            "y": 310,
            "w": 30,
            "h": 190
          },
          {
            "delay": 0.35
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          190,
          540,
          655,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 99,
    "season": 2,
    "name": "THE LAST RECEIPT",
    "seed": 99,
    "spawn": {
      "x": 53,
      "y": 198
    },
    "platforms": [
      {
        "x": 0,
        "y": 230,
        "w": 190,
        "h": 16
      },
      {
        "x": 470,
        "y": 168,
        "w": 140,
        "h": 16
      },
      {
        "x": 720,
        "y": 230,
        "w": 240,
        "h": 16
      },
      {
        "x": 0,
        "y": 290,
        "w": 960,
        "h": 16
      },
      {
        "x": 0,
        "y": 490,
        "w": 295,
        "h": 50
      },
      {
        "x": 355,
        "y": 425,
        "w": 140,
        "h": 16
      },
      {
        "x": 560,
        "y": 490,
        "w": 400,
        "h": 50
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 891,
          "y": 426
        }
      ]
    },
    "traps": [
      {
        "type": "Conveyor",
        "args": [
          {
            "x": 232,
            "y": 210,
            "w": 115,
            "h": 16
          },
          {
            "dir": 1,
            "force": 70
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 365,
            "y": 230,
            "w": 76,
            "h": 16
          },
          {
            "delay": 0.72
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          515,
          158,
          "receipt"
        ]
      },
      {
        "type": "FallBlock",
        "args": [
          {
            "x": 768,
            "y": 65,
            "w": 38,
            "h": 35
          },
          {
            "x": 510,
            "y": 30,
            "w": 70,
            "h": 138
          },
          {
            "shakeTime": 0.65,
            "floorY": 230
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          882,
          182,
          63,
          442,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 649,
            "y": 306,
            "w": 22,
            "h": 184
          },
          "receipt"
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 754,
            "y": 306,
            "len": 184,
            "vertical": true,
            "period": 2.05,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.1
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          806,
          490,
          40,
          {
            "x": 844,
            "y": 45,
            "w": 32,
            "h": 185
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          295,
          540,
          265,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  },
  {
    "schemaVersion": 1,
    "id": 100,
    "season": 2,
    "name": "THE HUNDREDTH DOOR",
    "seed": 100,
    "spawn": {
      "x": 48,
      "y": 468
    },
    "platforms": [
      {
        "x": 0,
        "y": 500,
        "w": 180,
        "h": 40
      },
      {
        "x": 470,
        "y": 315,
        "w": 160,
        "h": 16
      },
      {
        "x": 730,
        "y": 180,
        "w": 230,
        "h": 16
      },
      {
        "x": 640,
        "y": 260,
        "w": 320,
        "h": 16
      },
      {
        "x": 690,
        "y": 500,
        "w": 270,
        "h": 40
      },
      {
        "x": 355,
        "y": 450,
        "w": 130,
        "h": 16
      },
      {
        "x": -40,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 960,
        "y": -200,
        "w": 40,
        "h": 940
      },
      {
        "x": 0,
        "y": -20,
        "w": 960,
        "h": 20
      }
    ],
    "exit": {
      "positions": [
        {
          "x": 530,
          "y": 251
        },
        {
          "x": 850,
          "y": 116
        },
        {
          "x": 52,
          "y": 436
        }
      ],
      "options": {
        "fleeDist": 60
      }
    },
    "traps": [
      {
        "type": "MovingPlatform",
        "args": [
          {
            "x": 204,
            "y": 450,
            "w": 112,
            "h": 16
          },
          {
            "toX": 350,
            "toY": 340,
            "speed": 130,
            "phase": 0.64
          }
        ]
      },
      {
        "type": "Button",
        "args": [
          519,
          305,
          "hundred"
        ]
      },
      {
        "type": "Spring",
        "args": [
          568,
          315,
          {
            "w": 56,
            "power": -960
          }
        ]
      },
      {
        "type": "Teleporter",
        "args": [
          901,
          132,
          853,
          452,
          {
            "twoWay": false
          }
        ]
      },
      {
        "type": "Gate",
        "args": [
          {
            "x": 787,
            "y": 276,
            "w": 22,
            "h": 224
          },
          "hundred"
        ]
      },
      {
        "type": "Laser",
        "args": [
          {
            "x": 642,
            "y": 276,
            "len": 264,
            "vertical": true,
            "period": 2.1,
            "warn": 0.45,
            "fire": 0.45,
            "phase": 0.14
          }
        ]
      },
      {
        "type": "CrumblePlatform",
        "args": [
          {
            "x": 550,
            "y": 475,
            "w": 85,
            "h": 16
          },
          {
            "delay": 0.75
          }
        ]
      },
      {
        "type": "PopSpikes",
        "args": [
          116,
          500,
          37,
          {
            "x": 206,
            "y": 350,
            "w": 35,
            "h": 150
          },
          {
            "delay": 0.3
          }
        ]
      },
      {
        "type": "StaticSpikes",
        "args": [
          180,
          540,
          510,
          {
            "size": 30
          }
        ]
      }
    ],
    "checkpoints": []
  }
]);
