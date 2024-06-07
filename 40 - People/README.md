---
folder: 40 - People
tags: ""
title: README
---

# New files are created for each person using the  [[people-mention-page]] template
- @ This uses the [@ Symbol Linking plugin](obsidian://show-plugin?id=at-symbol-linking)
- @ Create references to new users by starting a name with an `@` sign
- @ Spaces are not supported, so you will want names like `@John.Doe` if you need to include first and last names

## Current JS based DV View:
- ~ Uses [[dvLocatePersonReferences.js]] 
- Adds the #cssClass `dv-locate-person-references`  for styling purposes

## Older query based approach:
```
~~~query
block:(#<% tp.file.title.replace("@","") %>  OR @<% tp.file.title.replace("@","") %>)
~~~
```


[[foo moose|@foo.moose]]
