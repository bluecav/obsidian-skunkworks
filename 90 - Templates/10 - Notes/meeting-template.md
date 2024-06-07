---
folder: 90 - Templates/10 - Notes
icon: FasPeopleArrows
tags: 
title: meeting-template
subProject: 10 - Notes
noteType: meeting
---
<%* 
const meetingName = await tp.system.prompt("What is the title of this meeting?")
const date=new Date();
const today=date.getFullYear() + "-" + (date.getMonth() + 1).toString().padStart(2,"0") + "-" + date.getDate().toString().padStart(2,"0");

let fileName=`${meetingName} - ${today}`
console.log(`Renaming file to ${fileName}`)
await tp.file.rename(fileName)
-%>


# <% fileName %>
- ~ Metadata:
	- ; meeting-name:: <% meetingName %>
	- ; meeting-date:: <% today %>
	- ; attendees::  
	- ; project::  
	- ; tags:: #meeting 
	- ; meeting-link::  
	- ; slack-thread::  
	- ; attachments::


> [!multi-column]
>
>> [!note]+ Attendees:
>> ```dataview
>> TABLE WITHOUT ID replace(attendees, ", ", "<br>") as Attendees
>> FROM #meeting
>> WHERE file.name = this.file.name
>> WHERE contains(attendees, "")
>> SORT Attendees DESC
>> ```
>
>> [!warning]+ Tags
>> ```dataview
>> LIST file.tags
>> WHERE file.name = this.file.name
>> SORT file.tags DESC
>> ```
>
>> [!summary]+ Links
>> ```dataview
>> TABLE WITHOUT ID file.outlinks as Links
>> WHERE file.name = this.file.name
>> SORT Links DESC
>> ```


- & Agenda:: <% tp.file.title %> ^agendaBlock
	- 

- ^ Notes:: <% tp.file.title %> ^notesBlock
	- 

- ; Action Items ^actionsBlock
	- 