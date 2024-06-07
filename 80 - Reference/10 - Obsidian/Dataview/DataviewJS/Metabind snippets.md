---
folder: 80 - Reference/10 - Obsidian/Dataview/DataviewJS
tags: ""
title: Metabind snippets
count: 7
---


```meta-bind-button
label: "+1"
hidden: true
id: "count-increment"
style: default
actions:
  - type: updateMetadata
    bindTarget: count
    evaluate: true
    value: x + 1
```
# Update meta buttons
```meta-bind-button
label: "-1"
hidden: true
id: "count-decrement"
style: default
actions:
  - type: updateMetadata
    bindTarget: count
    evaluate: true
    value: x - 1
```
```meta-bind-button
label: "Reset"
hidden: true
id: "count-reset"
style: default
actions:
  - type: updateMetadata
    bindTarget: count
    evaluate: false
    value: 0
```

`BUTTON[count-decrement, count-reset, count-increment]` `VIEW[{count}]`

let dv = app.plugins.plugins["dataview"].api;


```meta-bind-js-view

{attendees} as attendees
---
let dv = app.plugins.plugins["dataview"].api;
dv.paragraph("moose")
const attendeesStr = context.bound.attendees.map(x => `option(${x})`).join(", ");

const mightNeed = context.bound.attendees.filter( a => !app.metadataCache.getFirstLinkpathDest(a, "/people"))

const str = `\`INPUT[inlineSelect(${attendeesStr}):memory^selected]\`\n\n${mightNeed}`;

return engine.markdown.create(str);

```
