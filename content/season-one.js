window.FORGE_CONTENT = {
  "schemaVersion": 1,
  "packageVersion": 1,
  "levels": [
    {
      "schemaVersion": 1,
      "id": 41,
      "season": 1,
      "name": "BELT UNDER FIRE",
      "seed": 41051,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 1,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "Conveyor",
          "args": [
            {
              "x": 160,
              "y": 480,
              "w": 280,
              "h": 60
            },
            {
              "dir": 1,
              "force": 90
            }
          ]
        },
        {
          "type": "Turret",
          "args": [
            940,
            410,
            {
              "period": 1.7,
              "speed": 240
            }
          ]
        },
        {
          "type": "FallBlock",
          "args": [
            {
              "x": 600,
              "y": 40,
              "w": 65,
              "h": 50
            },
            {
              "x": 480,
              "y": 300,
              "w": 30,
              "h": 180
            },
            {
              "shakeTime": 0.55
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 42,
      "season": 1,
      "name": "CROSSWIND DELIVERY",
      "seed": 41054,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 4,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
        {
          "x": 0,
          "y": 480,
          "w": 350,
          "h": 60
        },
        {
          "x": 620,
          "y": 480,
          "w": 340,
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
        }
      ],
      "traps": [
        {
          "type": "Teleporter",
          "args": [
            280,
            432,
            640,
            432,
            {
              "twoWay": false
            }
          ]
        },
        {
          "type": "WindZone",
          "args": [
            {
              "x": 620,
              "y": 320,
              "w": 270,
              "h": 160
            },
            {
              "force": -65,
              "trigger": {
                "x": 630,
                "y": 320,
                "w": 30,
                "h": 160
              }
            }
          ]
        },
        {
          "type": "Pendulum",
          "args": [
            790,
            40,
            {
              "len": 380,
              "amp": 0.65,
              "speed": 1.5,
              "r": 16
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            687,
            480,
            60,
            {
              "x": 570,
              "y": 320,
              "w": 30,
              "h": 160
            },
            {
              "delay": 0.35
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 43,
      "season": 1,
      "name": "THE MOVING VERDICT",
      "seed": 41053,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 3,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "SlidingHole",
          "args": [
            0,
            960,
            {
              "gapW": 80,
              "startGap": 750,
              "speed": 105,
              "trigger": {
                "x": 180,
                "y": 300,
                "w": 30,
                "h": 180
              }
            }
          ]
        },
        {
          "type": "FallBlock",
          "args": [
            {
              "x": 430,
              "y": 40,
              "w": 65,
              "h": 50
            },
            {
              "x": 310,
              "y": 300,
              "w": 30,
              "h": 180
            },
            {
              "shakeTime": 0.5
            }
          ]
        },
        {
          "type": "Saw",
          "args": [
            [
              {
                "x": 720,
                "y": 180
              },
              {
                "x": 720,
                "y": 430
              }
            ],
            {
              "speed": 120,
              "r": 18
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 44,
      "season": 1,
      "name": "FALSE SHELTER",
      "seed": 41055,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 5,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "FakeDoor",
          "args": [
            320,
            416,
            {
              "label": "shelter"
            }
          ]
        },
        {
          "type": "Laser",
          "args": [
            {
              "x": 480,
              "y": 100,
              "len": 380,
              "vertical": true,
              "period": 2.8,
              "warn": 0.7,
              "fire": 0.4
            }
          ]
        },
        {
          "type": "Conveyor",
          "args": [
            {
              "x": 600,
              "y": 480,
              "w": 210,
              "h": 60
            },
            {
              "dir": -1,
              "force": 100
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            820,
            480,
            45,
            {
              "x": 730,
              "y": 320,
              "w": 25,
              "h": 160
            },
            {
              "delay": 0.5
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 45,
      "season": 1,
      "name": "GUST AND HAMMER",
      "seed": 41050,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 0,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "WindZone",
          "args": [
            {
              "x": 280,
              "y": 300,
              "w": 220,
              "h": 180
            },
            {
              "force": 70,
              "trigger": {
                "x": 200,
                "y": 320,
                "w": 30,
                "h": 160
              }
            }
          ]
        },
        {
          "type": "Crusher",
          "args": [
            430,
            70,
            {
              "topY": 40,
              "period": 2.5,
              "phase": 0.2
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            673,
            480,
            60,
            {
              "x": 570,
              "y": 320,
              "w": 30,
              "h": 160
            },
            {
              "delay": 0.35
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 46,
      "season": 1,
      "name": "WIND OVER NOTHING",
      "seed": 41056,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 6,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
        {
          "x": 0,
          "y": 480,
          "w": 350,
          "h": 60
        },
        {
          "x": 490,
          "y": 480,
          "w": 470,
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
        }
      ],
      "traps": [
        {
          "type": "CollapseFloor",
          "args": [
            {
              "x": 350,
              "y": 480,
              "w": 140,
              "h": 60
            },
            {
              "x": 280,
              "y": 300,
              "w": 30,
              "h": 180
            },
            {
              "delay": 0.25
            }
          ]
        },
        {
          "type": "WindZone",
          "args": [
            {
              "x": 280,
              "y": 300,
              "w": 220,
              "h": 180
            },
            {
              "force": 70,
              "trigger": {
                "x": 200,
                "y": 320,
                "w": 30,
                "h": 160
              }
            }
          ]
        },
        {
          "type": "Pendulum",
          "args": [
            720,
            40,
            {
              "len": 390,
              "amp": 0.7,
              "speed": 1.4,
              "r": 16
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            678,
            480,
            60,
            {
              "x": 570,
              "y": 320,
              "w": 30,
              "h": 160
            },
            {
              "delay": 0.35
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 47,
      "season": 1,
      "name": "THE LATE SHIFT",
      "seed": 41058,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 8,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
        {
          "x": 0,
          "y": 480,
          "w": 300,
          "h": 60
        },
        {
          "x": 560,
          "y": 480,
          "w": 400,
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
        }
      ],
      "traps": [
        {
          "type": "MovingPlatform",
          "args": [
            {
              "x": 300,
              "y": 450,
              "w": 120,
              "h": 16
            },
            {
              "toX": 450,
              "speed": 85,
              "pause": 0.4
            }
          ]
        },
        {
          "type": "Turret",
          "args": [
            940,
            395,
            {
              "period": 2,
              "speed": 220
            }
          ]
        },
        {
          "type": "Crusher",
          "args": [
            730,
            60,
            {
              "topY": 40,
              "trigger": {
                "x": 640,
                "y": 300,
                "w": 30,
                "h": 180
              }
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            675,
            480,
            60,
            {
              "x": 570,
              "y": 320,
              "w": 30,
              "h": 160
            },
            {
              "delay": 0.35
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 48,
      "season": 1,
      "name": "SWITCH IN THE WIND",
      "seed": 41052,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 2,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "WindZone",
          "args": [
            {
              "x": 280,
              "y": 300,
              "w": 220,
              "h": 180
            },
            {
              "force": 70,
              "trigger": {
                "x": 200,
                "y": 320,
                "w": 30,
                "h": 160
              }
            }
          ]
        },
        {
          "type": "Button",
          "args": [
            520,
            470,
            "wind"
          ]
        },
        {
          "type": "Gate",
          "args": [
            {
              "x": 740,
              "y": 300,
              "w": 24,
              "h": 180
            },
            "wind"
          ]
        },
        {
          "type": "Laser",
          "args": [
            {
              "x": 620,
              "y": 100,
              "len": 380,
              "vertical": true,
              "period": 2.7,
              "warn": 0.6,
              "fire": 0.4
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            671,
            480,
            60,
            {
              "x": 570,
              "y": 320,
              "w": 30,
              "h": 160
            },
            {
              "delay": 0.35
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 49,
      "season": 1,
      "name": "FINAL NOTICE",
      "seed": 41059,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 9,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "Button",
          "args": [
            230,
            470,
            "a"
          ]
        },
        {
          "type": "Gate",
          "args": [
            {
              "x": 350,
              "y": 300,
              "w": 22,
              "h": 180
            },
            "a"
          ]
        },
        {
          "type": "FallBlock",
          "args": [
            {
              "x": 500,
              "y": 40,
              "w": 70,
              "h": 50
            },
            {
              "x": 400,
              "y": 300,
              "w": 25,
              "h": 180
            },
            {
              "shakeTime": 0.55
            }
          ]
        },
        {
          "type": "Button",
          "args": [
            640,
            470,
            "b"
          ]
        },
        {
          "type": "Gate",
          "args": [
            {
              "x": 780,
              "y": 300,
              "w": 22,
              "h": 180
            },
            "b"
          ]
        },
        {
          "type": "Turret",
          "args": [
            940,
            390,
            {
              "period": 1.9,
              "speed": 220
            }
          ]
        },
        {
          "type": "PopSpikes",
          "args": [
            687,
            480,
            60,
            {
              "x": 570,
              "y": 320,
              "w": 30,
              "h": 160
            },
            {
              "delay": 0.35
            }
          ]
        }
      ],
      "checkpoints": []
    },
    {
      "schemaVersion": 1,
      "id": 50,
      "season": 1,
      "name": "REVERSE THE VERDICT",
      "seed": 41057,
      "targetDifficulty": "HARD",
      "theme": "minimal",
      "concept": 7,
      "spawn": {
        "x": 55,
        "y": 440
      },
      "exit": {
        "positions": [
          {
            "x": 884,
            "y": 416
          }
        ]
      },
      "platforms": [
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
        }
      ],
      "traps": [
        {
          "type": "InvertZone",
          "args": [
            {
              "x": 220,
              "y": 0,
              "w": 280,
              "h": 480
            }
          ]
        },
        {
          "type": "Button",
          "args": [
            380,
            470,
            "verdict"
          ]
        },
        {
          "type": "Gate",
          "args": [
            {
              "x": 620,
              "y": 300,
              "w": 24,
              "h": 180
            },
            "verdict"
          ]
        },
        {
          "type": "FallBlock",
          "args": [
            {
              "x": 740,
              "y": 40,
              "w": 70,
              "h": 50
            },
            {
              "x": 650,
              "y": 300,
              "w": 25,
              "h": 180
            },
            {
              "shakeTime": 0.6
            }
          ]
        }
      ],
      "checkpoints": []
    }
  ]
};
