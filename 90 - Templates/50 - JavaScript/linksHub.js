

/* This will expand a list, and indent each sub-list item accordingly */
listChildren = (children, offset = "" ) => {
    let result = ""
    for (const child of children) {
      /*result += offset + "- " +
         (child.task ? `[${ child.status ?? " "}] ` : "" ) +
         child.text + "<br>"*/
        result += `${offset}- ${child.text}\n`
        
      
      if (child.children.length)
        result += listChildren(child.children, offset + "  ") 
    }
    return result
  }

cur=dv.current()
const { linksFolder } = input;

console.log(linksFolder)

/* We expect our meetings to have the frontmatter property noteType to be meeting */
const pages = dv.pages(`"${linksFolder}"`).where(p => p.file.path.startsWith(linksFolder));

// Log our pages for debug
console.log(pages)


// Rows will be the table output
let rows=[]

pages.forEach((page, index) => {

    /* This works, but the spacing CSS is ugly with too much spaing between 
      list items. Instead, for now gathering it but not leveraging it.

      Instead, just using a block link to the list to be displayed as
      a hover popup
    */
    let linksList=page.file.lists.find((element) => element.text.includes("Links"))??[]
    console.log(linksList)
    linksChildren=listChildren(linksList.children)

    
    rows.push([
        dv.fileLink(page.file.name,false,page.file.name),
        linksChildren
    ])
    console.log(index)
    console.log(page)
})

dv.table(["Category","Links"],rows)

/* These styles are an attent to fix list formatting issues with listChildren().
  This was not as effective as hoped
*/
const styles = `
.dv-daily-meetings-summary .table-view-table ul > li + li {
    margin-top: 0.5em; 
}

.dv-daily-meetings-summary .table-view-table ul > li {
    margin-top: 0.5em; 
}

.dv-daily-meetings-summary .table-view-table td {
    font-size: calc(var(--font-adaptive-normal) * 0.8); 
}
`

var styleSheet = document.createElement("style")
styleSheet.type = "text/css"
styleSheet.innerText = styles
document.head.appendChild(styleSheet)
