---
cssclasses:
  - cards
  - max
folder: 00 - Launchpad
linksFolder: 00 - Launchpad/00 - Link Pages
tags: ""
title: 10 - Links Hub
---

- ! This page relies on the plugins below:
	- @ MCL Multi Column.css from https://github.com/efemkay/obsidian-modular-css-layout
	- @ The [List Callout](obsidian://show-plugin?id=obsidian-list-callouts) plugin

```dataviewjs

cur=dv.current()
if(cur.linksFolder) {
	dv.paragraph(`- @ Links from ${cur.linksFolder}:`)
	dv.view("90 - Templates/50 - JavaScript/linksHub",{linksFolder: cur.linksFolder})
} else {
	dv.paragraph("")
}
```