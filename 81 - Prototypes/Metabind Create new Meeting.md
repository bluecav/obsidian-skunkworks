---
folder: 81 - Prototypes
tags: ""
title: Metabind Create new Meeting
---
## Create Meeting:
~~~meta-bind
INPUT[text(
title(Meeting Name:),
defaultValue(Meeting),
class(meta-bind-full-width),
class(meta-bind-high),
placeholder(Enter the name for the meeting note)):memory^meetingName]
~~~

```meta-bind-js-view
{memory^meetingName} as meetingName
{frontmatter^meetingTemplate} as meetingTemplate
---

const date=new Date();
const today=date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");
 
let newMeetingName=`Unnamed Meeting ${today}`;
if(context.bound.meetingName != "") {
	newMeetingName=context.bound.meetingName;
}

const buttonString = `
~~~meta-bind-button
label: Create Meeting
hidden: false
title: "${newMeetingName}"
class: "button-43"
tooltip: "${newMeetingName}"
id: ""
style: primary
actions:
  - type: templaterCreateNote
    templateFile: "${context.bound.meetingTemplate}"
    fileName: "${newMeetingName}"
~~~
\`VIEW[{memory^meetingName}]\`
`
return engine.markdown.create(buttonString);

```
