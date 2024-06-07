---
folder: 80 - Reference (Work)/10 - Obsidian/Dataview
tags: ""
title: Dataview Snippets
---

## Lists

> [!NOTE]+ ## List items with a certain word
> # Basic
> 
> List all bullet points that contain the word "ipsum"
> 
> ```
> LIST L.text
> FROM "10 Example Data/dailys"
> FLATTEN file.lists AS L
> WHERE icontains(L.text, "ipsum")
> ```
> 
> # Variant
> 
> list without file link
> 
> ```
> LIST WITHOUT ID L.text
> FROM "10 Example Data/dailys"
> FLATTEN file.lists AS L
> WHERE icontains(L.text, "ipsum")
> ```
> 
> list - grouping by file
> 
> ```
> LIST rows.L.text
> FROM "10 Example Data/dailys"
> FLATTEN file.lists AS L
> WHERE icontains(L.text, "ipsum")
> GROUP BY file.link
> ```

## List file free (1 level deep)
```
dataview
list rows.file.link
FROM ""
sort file.name asc
group by file.folder
sort file.name asc 
```


## Links:
- https://s-blu.github.io/obsidian_dataview_example_vault/20%20Dataview%20Queries/List%20all%20list%20items%20with%20a%20certain%20word/
-