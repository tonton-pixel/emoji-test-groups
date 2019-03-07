const emojiTestGroups = require ('.');
//
for (let group of emojiTestGroups)
{
    console.log (group.name);
    for (let subgroup of group.subgroups)
    {
        console.log ("    " + subgroup.name);
    }
}
//
