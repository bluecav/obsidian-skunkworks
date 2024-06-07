

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

/* We expect our meetings to have the frontmatter property noteType to be meeting */
let pages=dv.pages().where(p => p.file.folder === cur.file.folder && p.noteType === "meeting")

// Log our pages for debug
console.log(pages)

// Rows will be the table output
let rows=[]

pages.forEach((page, index) => {
    const meetingName = page["meeting-name"];
    const meetingDate = page["meeting-date"];
    let attendees = ""

    // How many entries were listed on the attendees:: inline property?
    let numAttendees=attendees.length
    console.log(page.attendees)


    /* Add each attendee, but we need to add an HTML <br> tag
      afterwards to format it properly.

      If no attendees, we catch it
    */
    try {
      page.attendees.forEach((attendee, index) => {
          attendees+=attendee
          if (index<=numAttendees) {
              attendees+=",<br>"
          }
      })
    }
    catch(err) {
      attendees="None Listed"
    }


    /* This works, but the spacing CSS is ugly with too much spaing between 
      list items. Instead, for now gathering it but not leveraging it.

      Instead, just using a block link to the list to be displayed as
      a hover popup
    */
    let agendaList=page.file.lists.find((element) => element.text.includes("Agenda"))??[]
    agendaChildren=listChildren(agendaList.children)

    let agendaBlock="[[" + page.file.name + "#^agendaBlock|Agenda]]"
    let notesBlock="[[" + page.file.name + "#^notesBlock|Notes]]"
    let actionsBlock="[[" + page.file.name + "#^actionsBlock|Action Items]]"
    
    rows.push([
        dv.fileLink(page.file.name,false,meetingName),
        meetingDate,
        attendees,
        agendaBlock,
        actionsBlock,
        notesBlock
    ])
    console.log(index)
    console.log(page)
})

dv.table(["Meeting Name", "Meeting Date", "Attendees", "Agenda","Action Items","Notes"],rows)

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
