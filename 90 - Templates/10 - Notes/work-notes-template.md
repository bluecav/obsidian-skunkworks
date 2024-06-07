---
creation_date: 2024-04-11
cssclasses:
  - table-100
  - max
folder: 90 - Templates/10 - Notes
icon: FasBook
meetingTemplate: 90 - Templates/10 - Notes/meeting-template.md
showFolderContents: false
tags: 
title: work-notes-template
---

- ~ DATE:  `= this.creation_date`
	- % The css classes `table-100` and `max` should be in the `cssclasses` fromtmatter

```dataviewjs
dv.view("/90 - Templates/50 - JavaScript/noteUtils");

cur=dv.current()
if(cur.showFolderContents) {
	dv.paragraph(`## Contents of ${cur.folder}:`)
	dv.view("90 - Templates/50 - JavaScript/dvCustomFileTree",{topFolder: cur.folder})
} else {
	dv.paragraph("")
}
```

```dataviewjs
dv.view("/90 - Templates/50 - JavaScript/meetingTable");
dv.container.className += " dv-daily-meetings-summary"
console.log("done")
```
- $ Use the cssclasses `cards` and `cards-cover` if using the minimal theme to convert rows into cards

- ; Action Items ^actionsBlock
```tasks
not done
group by filename 
sort by due reverse 
sort by description
```

- ^ Notes:: <% tp.file.title %> ^notesBlock
	- 




