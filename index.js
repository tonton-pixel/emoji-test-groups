//
const fs = require ('fs');
const path = require ('path');
//
const subgroupNames =
{
    "face-smiling": "Face | Smiling",
    "face-affection": "Face | Affection",
    "face-tongue": "Face | Tongue",
    "face-hand": "Face | Hand",
    "face-neutral-skeptical": "Face | Neutral Skeptical",
    "face-sleepy": "Face | Sleepy",
    "face-unwell": "Face | Unwell",
    "face-hat": "Face | Hat",
    "face-glasses": "Face | Glasses",
    "face-concerned": "Face | Concerned",
    "face-negative": "Face | Negative",
    "face-costume": "Face | Costume",
    "cat-face": "Cat Face",
    "monkey-face": "Monkey Face",
    "emotion": "Emotion",
    "hand-fingers-open": "Hand | Fingers Open",
    "hand-fingers-partial": "Hand | Fingers Partial",
    "hand-single-finger": "Hand | Single Finger",
    "hand-fingers-closed": "Hand | Fingers Closed",
    "hands": "Hands",
    "hand-prop": "Hand Prop",
    "body-parts": "Body Parts",
    "person": "Person",
    "person-gesture": "Person | Gesture",
    "person-role": "Person | Role",
    "person-fantasy": "Person | Fantasy",
    "person-activity": "Person | Activity",
    "person-sport": "Person | Sport",
    "person-resting": "Person | Resting",
    "family": "Family",
    "person-symbol": "Person | Symbol",
    "skin-tone": "Skin Tone",
    "hair-style": "Hair Style",
    "animal-mammal": "Animal | Mammal",
    "animal-bird": "Animal | Bird",
    "animal-amphibian": "Animal | Amphibian",
    "animal-reptile": "Animal | Reptile",
    "animal-marine": "Animal | Marine",
    "animal-bug": "Animal | Bug",
    "plant-flower": "Plant | Flower",
    "plant-other": "Plant | Other",
    "food-fruit": "Food | Fruit",
    "food-vegetable": "Food | Vegetable",
    "food-prepared": "Food | Prepared",
    "food-asian": "Food | Asian",
    "food-marine": "Food | Marine",
    "food-sweet": "Food | Sweet",
    "drink": "Drink",
    "dishware": "Dishware",
    "place-map": "Place | Map",
    "place-geographic": "Place | Geographic",
    "place-building": "Place | Building",
    "place-religious": "Place | Religious",
    "place-other": "Place | Other",
    "transport-ground": "Transport | Ground",
    "transport-water": "Transport | Water",
    "transport-air": "Transport | Air",
    "hotel": "Hotel",
    "time": "Time",
    "sky & weather": "Sky & Weather",
    "event": "Event",
    "award-medal": "Award Medal",
    "sport": "Sport",
    "game": "Game",
    "arts & crafts": "Arts & Crafts",
    "clothing": "Clothing",
    "sound": "Sound",
    "music": "Music",
    "musical-instrument": "Musical Instrument",
    "phone": "Phone",
    "computer": "Computer",
    "light & video": "Light & Video",
    "book-paper": "Book | Paper",
    "money": "Money",
    "mail": "Mail",
    "writing": "Writing",
    "office": "Office",
    "lock": "Lock",
    "tool": "Tool",
    "science": "Science",
    "medical": "Medical",
    "household": "Household",
    "other-object": "Other Object",
    "transport-sign": "Transport | Sign",
    "warning": "Warning",
    "arrow": "Arrow",
    "religion": "Religion",
    "zodiac": "Zodiac",
    "av-symbol": "AV Symbol",
    "gender": "Gender",
    "math": "Math",
    "punctuation": "Punctuation",
    "currency": "Currency",
    "other-symbol": "Other Symbol",
    "keycap": "Keycap",
    "alphanum": "Alphanum",
    "geometric": "Geometric",
    "flag": "Flag",
    "country-flag": "Country Flag",
    "subdivision-flag": "Subdivision Flag"
};
//
// https://www.unicode.org/reports/tr51/
//
// Copy of https://unicode.org/Public/emoji/13.0/emoji-test.txt
//
function getEmojiGroups ()
{
    let result = [ ];
    let lines = fs.readFileSync (path.join (__dirname, 'data', 'emoji-test.txt'), { encoding: 'utf8' }).split ('\n');
    let groupName = "";
    let subgroupName = "";
    let matchFound;
    let subgroups;
    let characters;
    for (let line of lines)
    {
        if (line)
        {
            if (matchFound = line.match (/^# group: (.*)$/))
            {
                if (subgroupName)
                {
                    subgroups.push ({ name: subgroupName, characters: characters });
                }
                if (groupName)
                {
                    result.push ({ name: groupName, subgroups: subgroups });
                }
                groupName = matchFound[1];
                subgroups = [ ];
                subgroupName = "";
            }
            else if (matchFound = line.match (/^# subgroup: (.*)$/))
            {
                if (subgroupName)
                {
                    subgroups.push ({ name: subgroupName, characters: characters });
                }
                subgroupName = subgroupNames[matchFound[1]];
                characters = [ ];
            }
            else if (matchFound = line.match (/^#EOF$/))
            {
                if (subgroupName)
                {
                    subgroups.push ({ name: subgroupName, characters: characters });
                }
                if (groupName)
                {
                    result.push ({ name: groupName, subgroups: subgroups });
                }
            }
            else if (matchFound = line.match (/^#/))
            {
                // Ignore any other non-structured comments
            }
            else
            {
                let hashOffset = line.indexOf ('#');
                let data = line.substring (0, hashOffset);
                let fields = data.split (';');
                let codePoints = fields[0].trim ().split (' ');
                let status = fields[1].trim ();
                if ((status === "component") || (status === "fully-qualified"))
                {
                    let emojiString = "";
                    for (let codePoint of codePoints)
                    {
                        emojiString += String.fromCodePoint (parseInt (codePoint, 16));
                    }
                    characters.push (emojiString);
                }
            }
        }
    }
    return result;
}
//
module.exports = getEmojiGroups ();
//
