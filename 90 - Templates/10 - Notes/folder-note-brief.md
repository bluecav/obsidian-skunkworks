---
cssclasses:
  - max
  - table-100
folder: 90 - Templates/10 - Notes
icon: FarNoteSticky
rainbowColorBorderWidth: "3"
rainbowColorLuminosity: "50"
rainbowColorSaturation: "15"
tags: 
title: folder-note-brief
usePrettyTable: true
---
- % If you want to switch to a more traditional table from dataview, uncheck the `usePrettyTable` property

```dataviewjs
	const cur=dv.current()
	let startFolder=cur.folder
	startFolder=""

	if(cur.usePrettyTable) {
		dv.container.className += " folder-note-brief-pretty"
	}
	dv.view("90 - Templates/50 - JavaScript/dvCustomFileTree",{topFolder: startFolder})
```

