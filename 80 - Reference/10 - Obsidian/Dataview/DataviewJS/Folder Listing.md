---
cssclasses:
  - list-cards
  - cards-16-9
  - cards
folder: 80 - Reference (Work)/10 - Obsidian/Dataview/DataviewJS
tags: ""
title: Folder Listing
---

# Listing files as a tree structure list

```dataviewjs
const cur = dv.current()

//let dir = cur.file.folder;
let dir ="";

let processed = [];
let title = "# Contents: " + dir;

function listRecursive(folder, depth) {
	let files = [];
	
	// All pages in the scope of the current path
	let pages = dv.pages('"' + folder + '"')
	
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

# Also a list, but a cleaner version of the above, with headers going deeper per depth
```dataviewjs
const cur = dv.current()

//let folder = cur.file.folder;
let folder="";
let pages = dv.pages('"' + folder + '"');

// Create a new array to store the sorted groups
let sortedGroups = [];

// Set the initial header level to 3
let headerLevel = 3;

var re = new RegExp("^" + folder + "/","");

// Iterate through the groups, and push the root group first
console.log(re)
console.log(cur.file.folder.replace(re, ""))
for (let group of pages.groupBy(b => b.file.folder.replace(re, ""))) {
    if (group.key === folder) {
    console.log("key: " + group.key + " folder: " + folder)
        sortedGroups.unshift(group);
    } else {
        sortedGroups.push(group);
    }
}
console.log(sortedGroups)

for (let group of sortedGroups) {
    // Split the group key by '/' to check the number of subfolders
    let subfolders = group.key.split('/');
    // Increase the header level for each subfolder
    console.log(subfolders)
    let indentation = "  ".repeat(subfolders.length)
    headerLevel += subfolders.length - 1;
    dv.header(headerLevel, group.key);
    dv.list(group.rows.file.link); 
    // Reset the header level for the next group
    headerLevel = 3;
}
```

# Card View
```dataviewjs
function collectFiles(folderPath, level) {
    // Get all pages in the specified folder and any subfolders
    const pages = dv.pages(`"${folderPath}"`).where(p => p.file.path.startsWith(folderPath));

    // Group pages by their parent folder
    const groupedByFolder = pages.groupBy(p => p.file.folder);

    // Array to hold all file data
    let fileData = [];

    // Iterate through groups, each representing a folder
    for (let folder of groupedByFolder) {
        // Check if we are in the same folder
        if (folder.key === folderPath) {
	        if ( folderPath == "") {
	        	dv.header(3,"/")
	        } else {
	    	    dv.header(3,folderPath)
	        }

	        fileData=[];
            folder.rows.forEach(page => {
                //fileData.push({ link: page.file.link, created: page.file.ctime });

				fileData.push({
					link: page.file.link,
					level: level,
					created: page.file.ctime
				});
             });               
            dv.table(["Link:", "Created On:"], fileData.map(f => [f.link,f.level, f.created.toFormat("yyyy-MM-dd")]));
        } else {
            // Recursive call to handle subfolders
            fileData = fileData.concat(collectFiles(folder.key, level + 1));
        }
    }

    return fileData;
}

// Define the top-level folder
let topFolder = "";  // Adjust this path according to your structure
let files = collectFiles(topFolder, 0);



```

# CArd view with one card per folder


```dataviewjs
function collectFiles(folderPath, level) {
    // Get all pages in the specified folder and any subfolders
    const pages = dv.pages(`"${folderPath}"`).where(p => p.file.path.startsWith(folderPath));

    // Group pages by their parent folder
    const groupedByFolder = pages.groupBy(p => p.file.folder);

    // Array to hold all file data
    let fileList = [];
    let tableData = [];
    

    // Iterate through groups, each representing a folder
    for (let folder of groupedByFolder) {
        // Check if we are in the same folder
        if (folder.key === folderPath) {
	        
	        if ( folderPath == "") {
	        	folderPath="/"
	        }


	        tableData=[];
	        fileList=[];
            folder.rows.forEach(page => {

				fileList.push(page.file.link + " (" + page.file.ctime.toFormat("yyyy-MM-dd") + ")<br>" );
            });
			console.log(folderPath + ": " + fileList)
            tableData.push({
	            folder: folderPath,
	            depth: level,
	            files: fileList
            })

        } else {
            // Recursive call to handle subfolders
            tableData = tableData.concat(collectFiles(folder.key, level + 1));
        }
    }
    dv.table(["Folder:", "Depth:", "Files:"], tableData.map(f => [f.folder,f.depth, f.files]));
    return tableData;
}

// Define the top-level folder
let topFolder = "";  // Adjust this path according to your structure
let files = collectFiles(topFolder, 0);


```


# MAssed cardview without the folders broken out, kind of ugly
```dataviewjs
function collectFiles(folderPath, level) {
    // Get all pages in the specified folder and any subfolders
    const pages = dv.pages(`"${folderPath}"`).where(p => p.file.path.startsWith(folderPath));

    // Group pages by their parent folder
    const groupedByFolder = pages.groupBy(p => p.file.folder);

    // Array to hold all file data
    let fileData = [];

    // Iterate through groups, each representing a folder
    for (let folder of groupedByFolder) {
        let firstEntry = true;  // Flag to mark the first entry in a new folder
        if (folder.key === folderPath) {
            folder.rows.forEach(page => {
                // Get the file name only from the file path
                const fileName = page.file.name;
                fileData.push({
                    folder: firstEntry ? folder.key : "",  // Only display folder for the first file
                    link: "[[" + page.file.path + "|" + fileName + "]]",
                    level: level,
                    created: page.file.ctime
                });
                firstEntry = false;  // Set flag to false after the first entry
            });
        } else {
            // Recursive call to handle subfolders
            fileData = fileData.concat(collectFiles(folder.key, level + 1));
        }
    }

    return fileData;
}

// Define the top-level folder
let topFolder = "";  // Adjust this path according to your structure
let files = collectFiles(topFolder, 0);

// Output the data as a table
dv.table(["Folder", "File", "Depth", "Created"], files.map(f => [f.folder, f.link, f.level, f.created.toFormat("yyyy-MM-dd")]));

```

# Fifth didn't work
```dataviewjs
const rootFolder = ""; // Change to your desired starting folder path

function renderFolder(folderPath, level) {
    dv.header(3, folderPath.split("/").pop()); // Displays the folder name as a header

    const pages = dv.pages(`"${folderPath}"`)
        .where(p => p.file.folder === folderPath); // Filter pages in this folder only

    const subFolders = new Set();

    for (let page of pages) {
        if (page.file.folder !== folderPath) {
            subFolders.add(page.file.folder); // Collect unique subfolder paths
        } else {
            dv.list([[page.file.link, page.file.name]]); // Display file as a link
        }
    }

    // Recurse into subfolders
    subFolders.forEach(subFolder => {
        dv.paragraph(" "); // Adds a line break for indentation
        dv.el("div", renderFolder(subFolder, level + 1), { style: `margin-left: ${level * 20}px` });
    });
}

renderFolder(rootFolder, 0);

```