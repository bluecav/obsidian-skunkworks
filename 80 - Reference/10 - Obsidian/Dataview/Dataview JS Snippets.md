---
folder: 80 - Reference/10 - Obsidian/Dataview
tags: ""
title: Dataview JS Snippets
---

## Lists

> [!NOTE]+ ## List content with word
> # Simple version: 
> ```
> const word = "John.Doe" // <-- Type your search between the ""
> // We need to double-escape \b here so it's correctly fed into RegExp after the concatenation (as "\b" and not as "b").
> const regex = new RegExp("\\b" + word + "\\b", "gi")
> // Query pages and crawl their raw data content 
> const pages = await Promise.all(
>     dv.pages()
>     .map(async (page) => {
>         const content = await dv.io.load(page.file.path);
>         // Map pages to a custom object - if you want to have more infos in the
>         // table below, you need to add them here!
>         return {
>             link: page.file.link,
>             count: ( content.match(regex) || []).length
>         };
>     })
> )
> // Render the result table 
> dv.table(
>         ["Note", `Matches for "${word}"`],
>             pages
>             .filter(p => p.count)
>             .sort((a, b) => b.count - a.count)
>             .map(p => [p.link, p.count])  
>     );
> ```
> # Include content around it
> ```
> const word = "but"
> 
> const regex = new RegExp("(\\S+\\s?){0,2}(\\b"+word+"\\b)(\\s\\S+){0,2}", "gi")
> const pages = await Promise.all(
>     dv.pages('"30 Dataview Resources"')
>     .map(async (page) => {
>         const content = await dv.io.load(page.file.path);
>         const matches = content.match(regex);
>         return {
>             link: page.file.link,
>             count: ( matches || []).length,
>             matches
>         };
>     })
> )
> 
> dv.table(
>         ["Note", "Count", `Matches for "${word}"`],
>             pages
>             .filter(p => p.count)
>             .sort((a, b) => b.count - a.count)
>             .map(p => [p.link, p.count, p.matches])  
>     );
> ```


# Trick for controlling the dataviewjs table column widths:

```javascript
this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td:first-child").forEach(s => s.style.width ="75%");

```

# List files with formatting

```javascript
dataviewjs

function generateRainbowColors(numColors) {
    let colors = [];
    for (let i = 0; i < numColors; i++) {
        // Calculate the hue that varies from 0 to 360
        let hue = (i / numColors) * 360;
        // Create the HSL color string
        colors.push(`hsl(${hue}, 85%, 85%)`);
    }
    return colors;
}

// Example usage: Generate 10 rainbow colors
const rainbowColors = generateRainbowColors(20);

function collectFiles(folderPath, level, lastAddedFolder) {
    const pages = dv.pages(`"${folderPath}"`).where(p => p.file.path.startsWith(folderPath));
    const groupedByFolder = pages.groupBy(p => p.file.folder);
    let fileData = [];
    let currentFolderDisplayed = lastAddedFolder; // Keep track of the last folder added to the table

    for (let group of groupedByFolder) {
        if (group.key === folderPath) {
            group.rows.forEach((page, index) => {
                // Handle root directory explicitly
                let actualFolderPath = folderPath || "/";
                let folderName = actualFolderPath;
                let folderRow = true;
                //let folderName = (actualFolderPath !== currentFolderDisplayed) ? actualFolderPath : "";
                //let folderName = (actualFolderPath !== currentFolderDisplayed) ? actualFolderPath : actualFolderPath;
                if (actualFolderPath !== currentFolderDisplayed) {

	                //console.log(`Changed ${currentFolderDisplayed} to ${actualFolderPath}`)
	                
                } else {
	                folderName = "├──";
	                folderRow = false;
                }


                fileData.push({
                    folder: folderName,
                    folderDisplay: folderName,
                    name: page.name,
                    path: page.file.name,
                    link: page.file.link,
                    level: level,
                    folderRow: folderRow,
                    created: page.file.ctime.toFormat("yyyy-MM-dd")
                });
                if (folderName) currentFolderDisplayed = actualFolderPath; // Update last added folder
            });
        } else {
            fileData = fileData.concat(collectFiles(group.key, level + 1, currentFolderDisplayed));
        }
    }

    return fileData;
}

function renderRows(rows) {
	let lastFolder=null;
	let colorIndex=0;
	let fileData=[];
	rows.forEach( file => {
		if (file.folder !== lastFolder) { 
			// Move to next color if it's a new folder 
			if (lastFolder !== null) colorIndex = (colorIndex + 1) % rainbowColors.length; 
			lastFolder = file.folder; 
		}
		if ( f.folder == "") { f.folder = " ";}
		fileData.push({
			folder: file.folder,
			folderDisplay: file.folder,
			link: file.link,
			name: file.name,
			path: file.path,
			level: file.level,
			folderRow: file.folderRow,
			created: file.created,
			color: rainbowColors[colorIndex],
		});
	});
return fileData;
}

const cur = dv.current();
let topFolder = "";  
// Adjust this path according to your structure, use "" for root
let files = renderRows(collectFiles(topFolder, 0, ""));


// Display the table once with all data
dv.table(["Folder", "Link","Created On"], files.map(f => [
	`<span style=\"display: block; border-radius:5px; padding:2px 5px; background-color: ${f.color}; color: black; \">${f.folder}</span>`, 
	`<span style=\"display: block; border-radius:5px; padding:2px 5px; background-color: ${f.color}; color: black;\">${f.link}</span>`, 
	`<span style=\"display: block; border-radius:5px; padding:2px 5px; background-color: ${f.color}; color: black;\">${f.created}</span>`]
	));


this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td:first-child").forEach(s => s.style.width ="50%");


this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td").forEach(s => s.style.border ="1px");
this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td").forEach(s => s.style.padding ="1px");

this.container.querySelectorAll(".table-view-table").forEach(s => s.style.border ="1px");


```
