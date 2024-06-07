---
folder: 81 - Prototypes
tags: ""
title: External Journal References
---
# Usage:
Modify the frontmatter property for `externalJournalDir` 
```dataviewjs
let title = "Files";
let dir = '/Users/cavittca/Library/Mobile Documents/iCloud~md~obsidian/Documents/Chris Journal/80 - Reference';

let processed = [];

function listRecursive(folder, depth) {
	let files = [];
	
	// All pages in the scope of the current path
	let pages = dv.pages('"' + folder + '"')
	console.log(pages)
	
	// Collect files in the current folder here
	let currentFiles = "";
	
	pages.forEach(page => {
		if (page.file.folder === folder) {
			// Page is in current folder
			currentFiles += page.file.link + " | ";
		}
		else {
			// Page is in subfolder
			let nestedFolder = page.file.folder;
			
			// Make sure nested folder is direct child, not any other descendant from current folder
			let isChild = folder.split('/').length + 1 == nestedFolder.split('/').length;
			
			// Make sure we dont process sub-directories multiple times
			if (!processed.includes(nestedFolder) && isChild) {
				processed.push(nestedFolder);
				
				// Result of recursive call is a list, by adding it to the current list we recursively build a tree
				files.push(listRecursive(nestedFolder, depth + 1));
			}
		}
	});
	
	if (currentFiles.endsWith(" | "))
		currentFiles = currentFiles.slice(0, -3);
	
	// Add files in current folder at the start
	if (currentFiles !== "") files.unshift(currentFiles);
	
	// Add current folder name at the start
	let path = folder.split('/');
	path = path [path.length - 1];
	
	if (depth == 0) path = path;
	
	files.unshift("<h3>" + path + "</h3>");
	
	return files;
}

let files = listRecursive(dir, 0);

dv.header(3, title);
dv.list(files);
```