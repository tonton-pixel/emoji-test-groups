# Emoji Test Groups

## Description

This NPM module returns a JSON-compatible array literal containing a hierarchy of all groups and subgroups of fully-qualified (keyboard) emoji characters, as extracted from the Unicode data file `emoji-test.txt`, but using more user-friendly names.

Please note that the following emoji characters are omitted, as mentioned in the data file header:

- 12 keycap bases: number sign '#', asterisk '*', digits '0' to '9'
- 26 singleton regional indicators: '🇦' to '🇿'

## Installing

Switch to your *project* directory (`cd`) then run:

```bash
npm install emoji-test-groups
```

## Testing

A basic test can be performed by running the following command line from the *package* directory:

```bash
npm test
```

## Examples

### Getting the names of all emoji groups and subgroups

```javascript
const emojiGroups = require ('emoji-test-groups');
for (let group of emojiGroups)
{
    console.log (group.name);
    for (let subgroup of group.subgroups)
    {
        console.log ("    " + subgroup.name);
    }
}
```

### Getting the list of characters of a given group and subgroup

```javascript
const emojiGroups = require ('emoji-test-groups');
const groupName = "Symbols";
const subgroupName = "Alphanum"
for (let group of emojiGroups)
{
    if (group.name === groupName)
    {
       for (let subgroup of group.subgroups)
        {
            if (subgroup.name === subgroupName)
            {
                console.log (JSON.stringify (subgroup.characters));
                break;
            }
        }
        break;
    }
}
```

## License

The MIT License (MIT).

Copyright © 2018 Michel MARIANI.
