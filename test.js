const emojiGroups = require ('.');
//
for (let group of emojiGroups)
{
    console.log (group.name);
    for (let subgroup of group.subgroups)
    {
        console.log ("    " + subgroup.name);
    }
}
//
