
import {InvestigatorListEntry} from '../types';

export const investigatorClassColor = {
	all: '#ffffff',
	guardian: "#2B80C5",
	seeker: "#FF8F3F",
	rogue:"#107116",
	mystic:"#5D5593",
	survivor:"#CC3038",
	neutral:"#808080",
}

export const investigatorByFaction = {
	'guardian' : ["01001", "02001", "03001", "04001", "98010", "06001", "07001", "60101"],
	'seeker':  ["01002", "02002", "03002", "04002", "05002", "06002", "07002", "98007", "60201"],
	'rogue': ["01003", "02003", "03003", "04003", "05003", "06003", "07003", "60301"],
	'survivor': ["01005", "02005", "03005", "04005", "05005", "06005", "98013", "60501"],
	'mystic': ["01004", "02004", "03004", "04004", "05004", "05006", "06004", "98016", "60401"],
	'neutral': ["03006"],
}


export const lookupInvestigator = (code: string) => {
	const investigator: InvestigatorListEntry = investigatorList.find(item => item.code === code);
	investigator.color = investigatorClassColor[investigator.faction_code]
	return investigator
}



export const investigatorList = [
    {
                "name": "Roland Banks",
        "code": "01001",
        "faction_code": "guardian",
        "deck_options": [
            {"faction":["guardian", "neutral"], "level":{"min":0, "max":5} },
            {"faction":["seeker"], "level":{"min":0, "max":2} }
        ],},
        {
                    "name": "Daisy Walker",
        "code": "01002",
        "faction_code": "seeker",
        "deck_options": [
            {"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
            {"faction":["mystic"], "level":{"min":0, "max":2} }
        ],
        },
        {
                    "name": "\"Skids\" O'Toole",
        "code": "01003",
        "faction_code": "rogue",
        "deck_options": [
            {"faction":["rogue", "neutral"], "level":{"min":0, "max":5} },
            {"faction":["guardian"], "level":{"min":0, "max":2} }
        ],
        },
        {
                    "name": "Agnes Baker",
        "code": "01004",
        "faction_code": "mystic",
        "deck_options": [
            {"faction":["mystic", "neutral"], "level":{"min":0, "max":5} },
            {"faction":["survivor"], "level":{"min":0, "max":2} }
        ],
        },
        {
                    "name": "Wendy Adams",
        "code": "01005",
        "faction_code": "survivor",
        "deck_options": [
            {"faction":["survivor", "neutral"], "level":{"min":0, "max":5} },
            {"faction":["rogue"], "level":{"min":0, "max":2} }
        ],
        },
            {
        "name": "Zoey Samaras",
        "code": "02001",
        "faction_code": "guardian",
        "deck_options": [
            {"faction":["guardian", "neutral"], "level":{"min":0, "max":5} },
                {"level":{"min":0, "max":0}, "limit":5, "error": "You cannot have more than 5 cards that are not Guardian or Neutral"}
            ],
    },
    {

        "name": "Rex Murphy",
        "code": "02002",
        "faction_code": "seeker",
        "deck_options": [
            {"not": true, "trait": ["fortune"] },
            {"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
            {"level":{"min":0, "max":0}, "limit":5, "error": "You cannot have more than 5 cards that are not Seeker or Neutral"}
        ],
    },
    {
        "name": "Jenny Barnes",
        "code": "02003",
        "faction_code": "rogue",
        "deck_options": [
            {"faction":["rogue", "neutral"], "level":{"min":0, "max":5} },
            {"level":{"min":0, "max":0}, "limit":5, "error": "You cannot have more than 5 cards that are not Rogue or Neutral"}
        ],
    },
    {
        "name": "Jim Culver",
        "code": "02004",
        "faction_code": "mystic",
        "deck_options": [
            {"faction":["mystic", "neutral"], "level":{"min":0, "max":5} },
            {"level":{"min":0, "max":0}, "limit":5,  "error": "You cannot have more than 5 cards that are not Mystic or Neutral"}
        ],
    },
    {
        "name": "\"Ashcan\" Pete",
        "code": "02005",
        "faction_code": "survivor",
        "deck_options": [
            {"faction":["survivor", "neutral"], "level":{"min":0, "max":5} },
            {"level":{"min":0, "max":0}, "limit":5,  "error": "You cannot have more than 5 cards that are not Survivor or Neutral"}
        ],
    },
    	{

		"name": "Mark Harrigan",
		"code": "03001",
		"faction_code": "guardian",
		"deck_options": [
			{"faction":["guardian", "neutral"], "level":{"min":0, "max":5} },
			{"trait":["tactic"], "level":{"min":0, "max":0} }
		],
	},
	{

		"name": "Minh Thi Phan",
		"code": "03002",
		"faction_code": "seeker",
		"deck_options": [
			{"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["survivor"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Sefina Rousseau",
		"code": "03003",
		"faction_code": "rogue",
		"deck_options": [
			{"faction":["rogue", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["mystic"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Akachi Onyele",
		"code": "03004",
		"faction_code": "mystic",
		"deck_options": [
			{"faction":["mystic", "neutral"], "level":{"min":0, "max":5} },
			{"uses":["charges"], "level":{"min":0, "max": 4} },
			{"trait":["occult"], "level":{"min":0, "max":0} }
		],
	},
	{
		"name": "William Yorick",
		"code": "03005",
		"faction_code": "survivor",
		"deck_options": [
			{"faction":["survivor", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["guardian"], "level":{"min":0, "max":2} }
		],
	},
	{

		"name": "Lola Hayes",
		"code": "03006",
		"faction_code": "neutral",
		"deck_options": [
			{"faction":["survivor", "guardian", "seeker", "rogue", "mystic"], "level":{"min":0, "max":3}, "atleast":{"factions":3, "min": 7}, "error": "You must have at least 7 cards from 3 different factions" },
			{"faction":["neutral"], "level":{"min":0, "max":5} }
		],
	},
           {
        "name": "Leo Anderson",
        "code": "04001",
        "faction_code": "guardian",
        "deck_options": [
            {"faction":["guardian", "neutral"], "level":{"min":0, "max":5} },
            {"faction":["rogue"], "level":{"min":0, "max":2} }
        ],
    },
    {
        "name": "Ursula Downs",
        "faction_code": "seeker",
        "code": "04002",
        "deck_options": [
            {"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
            {"trait":["relic"], "level":{"min":0, "max":4} }
        ],
    },
    {
        "name": "Finn Edwards",
        "code": "04003",
        "faction_code": "rogue",
        "deck_options": [
            {"trait":["illicit"], "level":{"min":0, "max":5} },
            {"faction":["rogue"], "level":{"min":0, "max":3} },
            {"faction":["neutral"], "level":{"min":0, "max":5} },
            {"faction":["seeker", "survivor"], "level":{"min":0, "max":0}, "limit":5 }
        ],
    },
    {
        "name": "Father Mateo",
        "code": "04004",
        "faction_code": "mystic",
        "deck_options": [
            {"faction":["mystic", "neutral"], "level":{"min":0, "max":5} },
            {"trait":["blessed"], "level":{"min":0, "max":3} }
        ],
    },
    {
      "name": "Calvin Wright",
      "code": "04005",
      "faction_code": "survivor",
      "deck_options": [
            {"faction":["survivor", "neutral"], "level":{"min":0, "max":5} },
            {"trait":["spirit"], "level":{"min":0, "max":3} }
        ],
    },
    	{
		"name": "Carolyn Fern",
		"faction_code": "guardian",
		"code": "98010",
		"deck_options": [
			{"not": true, "trait": ["weapon"], "level":{"min":1, "max":5} },
			{"faction":["guardian"], "level":{"min":0, "max":3} },
			{"faction":["neutral"], "level":{"min":0, "max":5} },
			{"text":["[Hh]eals? (that much )?((\\d+|all) damage (from that asset )?(and|or) )?((\\d+|all) )?horror"], "level":{"min":0, "max":5} },
			{"faction":["seeker", "mystic"], "level":{"min":0, "max":1}, "limit":15, "error": "You cannot have more than 15 level 0-1 Seeker and/or Mystic cards"}
		],
	},
	{
		"name": "Joe Diamond",
		"code": "05002",
		"faction_code": "seeker",
		"deck_options": [
			{"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["guardian"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Preston Fairmont",
		"code": "05003",
		"faction_code": "rogue",
		"deck_options": [
			{"not": true, "trait": ["illicit"] },
			{"faction":["rogue", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["survivor"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Diana Stanley",
		"code": "05004",
		"faction_code": "mystic",
		"deck_options": [
			{"faction":["mystic", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["guardian"], "level":{"min":0, "max":2} }
		],
	},
	{
		"code": "05005",
		"name": "Rita Young",
		"faction_code": "survivor",
		"deck_options": [
			{"trait":["trick"], "level":{"min":0, "max":3} },
			{"faction":["survivor", "neutral"], "level":{"min":0, "max":5} }
		],
	},
	{
		"name": "Marie Lambeau",
		"code": "05006",
		"faction_code": "mystic",
		"deck_options": [
			{"trait":["spell"], "level":{"min":0, "max":5} },
			{"faction":["mystic"], "level":{"min":0, "max":3} },
			{"faction":["neutral"], "level":{"min":0, "max":5} },
			{"trait":["occult"], "level":{"min":0, "max":0} },
			{"faction":["seeker","survivor"],"level":{"min":0, "max":0}, "limit":5}
		],
    },
    
    	{
		"name": "Tommy Muldoon",
		"code": "06001",
		"faction_code": "guardian",
		"deck_options": [
			{"faction":["guardian", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["survivor"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Mandy Thompson",
		"code": "06002",
		"faction_code": "seeker",
		"deck_options": [
			{"name": "Deck Size", "deck_size_select": ["30", "40", "50"], "faction": [] },
			{"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
			{"name":"Secondary Class", "faction_select":["mystic","rogue","survivor"], "level":{"min":0, "max":1}, "type": ["event","skill"], "limit": 10 }
		],
	},
	{
		"name": "Tony Morgan",
		"code": "06003",
		"faction_code": "rogue",
		"deck_options": [
			{"faction":["rogue", "neutral"], "level":{"min":0, "max":5} },
			{"name":"Secondary Class", "faction_select":["guardian","seeker","survivor"], "level":{"min":0, "max":1}, "type": ["event","skill"], "limit": 10 }
		],
	},
	{
		"name": "Luke Robinson",
		"code": "06004",
		"faction_code": "mystic",
		"deck_options": [
			{"faction":["mystic", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["seeker"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Patrice Hathaway",
		"code": "06005",
		"faction_code": "survivor",
		"deck_options": [
			{"faction":["survivor", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["mystic"], "level": {"min":0, "max":2} }
		],
	},

    	{
		"name": "Sister Mary",
		"code": "07001",
		"faction_code": "guardian",
		"deck_options": [
			{"faction":["guardian", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["mystic"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Amanda Sharpe",
		"code": "07002",
		"faction_code": "seeker",
		"deck_options": [
			{"faction":["seeker", "neutral"], "level":{"min":0, "max":5} },
			{"trait":["practiced"], "type":["skill"], "level":{"min":0, "max":3} }
		],
	},
	{
		"name": "Trish Scarborough",
		"code": "07003",
		"faction_code": "rogue",
		"deck_options": [
			{"faction":["rogue", "neutral"], "level":{"min":0, "max":5} },
			{"faction":["seeker"], "level":{"min":0, "max":2} }
		],
	},
	{
		"name": "Dexter Drake",
		"code": "98016",
		"faction_code": "mystic",
		"deck_options": [
			{ "faction": ["mystic", "neutral"], "level": { "min": 0, "max": 5 } },
			{ "faction": ["rogue"], "level": { "min": 0, "max": 2 } }
		],
	},
	{
		"name": "Norman Withers",
		"code": "98007",
		"faction_code": "seeker",
		"deck_options": [
		],
	},
	{
		"name": "Silas Marsh",
		"code": "98013",
		"faction_code": "survivor",
		"deck_options": [
		    {"faction":["survivor", "neutral"], "level":{"min":0, "max":5} },
		    {"trait":["innate"], "level":{"min":0, "max":2} }
		],
    	},
        
    {
        "name": "Winifred Habbamock",
        "code": "60301",
        "faction_code": "rogue",
        "deck_options": [
            {"faction":["rogue", "neutral"], "level":{"min":0, "max":5} }
        ],
    },
    {
		"name": "Nathaniel Cho",
		"code": "60101",
		"faction_code": "guardian",
		"deck_options": [
				{"faction":["guardian", "neutral"], "level":{"min":0, "max":5} }
		],
    },
    {
		"name": "Jacqueline Fine",
		"code": "60401",
		"faction_code": "mystic",
		"deck_options": [
			{"faction":["mystic", "neutral"], "level":{"min":0, "max":5} }
		],
    },
    {
		"name": "Harvey Walters",
		"code": "60201",
		"faction_code": "seeker",
		"deck_options": [
			{"faction":["seeker", "neutral"], "level":{"min":0, "max":5} }
		],
    },
    {
		"name": "Stella Clark",
		"code": "60501",
		"faction_code": "survivor",
		"deck_options": [
			{"faction":["survivor", "neutral"], "level":{"min":0, "max":5} }
		],
    },
]