# Emoji Test Groups

## Description

This Node module returns a JSON-compatible array literal containing a hierarchy of all groups and subgroups of either component or fully-qualified (keyboard) emoji characters, as extracted from the Emoji 13.1 data file [emoji-test.txt](https://unicode.org/Public/emoji/13.1/emoji-test.txt), but using more user-friendly names.

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
const emojiTestGroups = require ('emoji-test-groups');
for (let group of emojiTestGroups)
{
    console.log (group.name);
    for (let subgroup of group.subgroups)
    {
        console.log ("    " + subgroup.name);
    }
}
```

### Getting the list of emoji characters of a given group and subgroup

```javascript
const emojiTestGroups = require ('emoji-test-groups');
const groupName = "Symbols";
const subgroupName = "Alphanum"
for (let group of emojiTestGroups)
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

Copyright © 2018-2020 Michel MARIANI.
