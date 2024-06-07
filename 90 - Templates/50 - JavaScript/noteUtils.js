
cur=dv.current()

const last_entry = await dv.tryQuery(`
	TABLE dateformat(file.ctime, "yyyy-MM-dd") as "Created", file.path, file.name
	FROM "10 - Daily Notes"
	WHERE (file.ctime < this.file.cday)
	SORT fileDate DESC
	LIMIT 1
`);

const last_values = last_entry.values[0];

let link_prev, link_next, link_prev_text, link_next_text

if (last_values) {
	let path_prev, datestring, filename;
	[, datestring, path_prev, filename] = last_values;

	const link_text = `${filename}`
	const link_path = path_prev
	link_prev = "[[" + link_path + "|" + link_text + "]]"
	link_next = `[[${link_path}|${link_text}]]`
	link_prev_text = `${filename} (${datestring})`
	//const link_prev = dv.fileLink(path_prev, false, link_text);
	//dv.paragraph(link_prev);

	
} else {
	const link_text = "No Prev Note"
	//const link_prev = `[[${link_path}|link_text]]`
	//const link_prev = dv.fileLink(this.file.path, false, link_text);
	link_prev_text = "No Previous Note";
	link_prev = link_prev_text
	
}
console.log(`Previous Daily Link: ${link_prev}`)
  
// ==============================
const latest_entry = await dv.tryQuery(`
	TABLE dateformat(file.ctime, "yyyy-MM-dd") as "Created", file.path, file.name
	FROM "10 - Daily Notes"
	WHERE (file.ctime > this.file.cday) AND (file.name != this.file.name)
	SORT fileDate ASC
	LIMIT 100
`);


latest_entry.values.forEach((value,index) => {
  console.log(value)
});
//console.log(`Next entries: ${latest_entry.values}`)
const latest_values = latest_entry.values[0];


if (latest_values) {
	let path_next, datestring, filename;
	[, datestring, path_next, filename] = latest_values;
	//const link_text = `${filename} (${datestring})`
	const link_text = `${filename}`
	const link_path = path_next
	link_next = `[[${link_path}|${link_text}]]`
	link_next_text = `${filename} (${datestring})`
	//const link_next = dv.fileLink(path_next, false, link_text);
	//dv.paragraph(link_prev);
	
} else {
	const link_text = "No Next Note"
	//const link_prev = dv.fileLink(this.file.path, false, link_text);
	link_next_text = "No Next Note";	
	link_next = link_next_text
	
}
console.log(`Next Daily Link: ${link_next}`)
// ===============================
  



let link_today_text=dv.date(dv.current().file.cday).toFormat('yyyy-MM-dd');
let link_today=dv.current().file.name + "(" + link_today_text + ")";

dv.paragraph(`
~~~meta-bind-button
label: Prev Daily Note
id: Prev
hidden: true
class: "button-10"
tooltip: " ${link_prev_text}"
style: primary
icon: arrow-big-left
action:
  type: open
  newTab: true
  link: "${link_prev}"
~~~ 

~~~meta-bind-button
label: Current Daily Note
id: Today
hidden: true
class: "button-11"
tooltip: "${link_today_text}"
style: primary
icon: calendar
action:
  type: open
  newTab: true
  link: "${link_today}"
~~~ 

~~~meta-bind-button
label: Next Daily Note
id: Next
hidden: true
class: "button-10"
tooltip: "${link_next_text}"
style: primary
icon: arrow-big-right
action:
  type: open
  newTab: true
  link: "${link_next}"
~~~ 

~~~meta-bind-button
label: Create Meeting Note
id: createMeeting
hidden: true
class: "button-10"
tooltip: Create Meeting Note
style: primary
icon: users
action:
  type: templaterCreateNote
  templateFile: ${cur.meetingTemplate}
  fileName: "New Meeting"
~~~

~~~meta-bind-button
label: Show Current Folder Contents?
id: showFolderContents
hidden: true
class: ""
tooltip: ""
style: primary
action:
  type: updateMetadata
  bindTarget: showFolderContents
  evaluate: true
  value: "x == null || !x ? true : false"
~~~ 


\`BUTTON[Prev]\` \`BUTTON[Today]\` \`BUTTON[createMeeting]\` \`BUTTON[Next]\`
<br>
Show Folder Contents? \`INPUT[toggle:showFolderContents]\`
`)

if(cur.showFolderContents) {
	dv.paragraph(`## Contents of ${cur.folder}:`)
	dv.view("90 - Templates/50 - JavaScript/dvCustomFileTree",{topFolder: cur.folder})
} else {
	dv.paragraph("")
}

const styles = `

.dataviewjs-paragraph-center {
	text-align: center;
}
.button-10 button {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	padding: 6px 14px;
	font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
	border-radius: 6px;
	border: none;
  
	color: #fff;
	background: linear-gradient(180deg, #4B91F7 0%, #367AF6 100%);
	 background-origin: border-box;
	box-shadow: 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
  }
  
  .button-10:focus {
	box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1.5px rgba(54, 122, 246, 0.25), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
	outline: 0;
  }
  
  
  
  .button-11 button {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	padding: 6px 14px;
	font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
	border-radius: 6px;
	color: #3D3D3D;
	background: #fff;
	border: none;
	box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1);
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
  }
  
  .button-11:focus {
	box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
	outline: 0;
  }
  
  
  .button-12 {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 6px 14px;
	font-family: -apple-system, BlinkMacSystemFont, 'Roboto', sans-serif;
	border-radius: 6px;
	border: none;
  
	background: #6E6D70;
	box-shadow: 0px 0.5px 1px rgba(0, 0, 0, 0.1), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.5), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.12);
	color: #DFDEDF;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
  }
  
  .button-12:focus {
	box-shadow: inset 0px 0.8px 0px -0.25px rgba(255, 255, 255, 0.2), 0px 0.5px 1px rgba(0, 0, 0, 0.1), 0px 0px 0px 3.5px rgba(58, 108, 217, 0.5);
	outline: 0;
  }
  
  .button-15 {
	background-image: linear-gradient(#42A1EC, #0070C9);
	border: 1px solid #0077CC;
	border-radius: 4px;
	box-sizing: border-box;
	color: #FFFFFF;
	cursor: pointer;
	direction: ltr;
	display: block;
	font-family: "SF Pro Text","SF Pro Icons","AOS Icons","Helvetica Neue",Helvetica,Arial,sans-serif;
	font-size: 17px;
	font-weight: 400;
	letter-spacing: -.022em;
	line-height: 1.47059;
	min-width: 30px;
	overflow: visible;
	padding: 4px 15px;
	text-align: center;
	vertical-align: baseline;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
	white-space: nowrap; 
  }
  
  .button-15:disabled {
	cursor: default;
	opacity: .3;
  }
  
  .button-15:hover {
	background-image: linear-gradient(#51A9EE, #147BCD);
	border-color: #1482D0;
	text-decoration: none;
  }
  
  .button-15:active {
	background-image: linear-gradient(#3D94D9, #0067B9);
	border-color: #006DBC;
	outline: none;
  }
  
  .button-15:focus {
	box-shadow: rgba(131, 192, 253, 0.5) 0 0 0 3px;
	outline: none;
  }

.button-43 button {
	background-image: linear-gradient(-180deg, #37AEE2 0%, #1E96C8 100%);
	border-radius: .5rem;
	box-sizing: border-box;
	color: #FFFFFF;
	display: inline-flex;
  
	justify-content: center;
	padding: 1rem 1.75rem;
	text-decoration: none;
	width: auto;
	border: 0;
	cursor: pointer;
	user-select: none;
	-webkit-user-select: none;
	touch-action: manipulation;
  }
  
  .button-43 button:hover {
	background-image: linear-gradient(-180deg, #1D95C9 0%, #17759C 100%);
  }
  
  @media (min-width: 768px) {
	.button-43 button {
	  padding: 1rem 2rem;
	}
  }
`

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)  


/* Old function to get info as a simpler list format */
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
            dv.table(["Link:", "Created On:"], fileData.map(f => [f.link, f.created.toFormat("yyyy-MM-dd")]));
            
        } else {
            // Recursive call to handle subfolders
            fileData = fileData.concat(collectFiles(folder.key, level + 1));
        }
    }

    return fileData;
}


/* How to call it:
// Define the top-level folder
const cur = dv.current()

let dir = cur.file.folder;

let topFolder = "";  // Adjust this path according to your structure
let files = collectFiles(topFolder, 0);
this.container.querySelectorAll(".table-view-table tbody.table-view-tbody tr td:first-child").forEach(s => s.style.width ="75%");
*/
