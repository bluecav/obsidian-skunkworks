---
folder: 80 - Reference (Work)/10 - Obsidian/Styling
icon: 
tags: ""
title: Reddit Anuppuchin Customization
---

#reddit post on his usage after a year: https://www.reddit.com/r/ObsidianMD/comments/16pgs7e/update_one_month_of_using_obsidian_for_high_school/?utm_source=share&utm_medium=web2x&context=3

#youtube video on #anuppuccin theme customization: https://youtu.be/YDKYJG5eAnE?si=u7HTMUOrz0NCTLok

Using the #pomodoro plugin:
https://www.reddit.com/r/ObsidianMD/comments/16pgs7e/comment/k1tr4fg/?utm_source=share&utm_medium=web2x&context=3
```tracker  
searchType: frontmatter  
searchTarget: pomodoros  
folder: Folder/Folder  
line:  
title: Pomodoro Tracker  
lineColor: steelblue  
```

#css snippet to modify the #style-header :
https://www.reddit.com/r/ObsidianMD/comments/12kfo7j/comment/jg2gdgv/?utm_source=share&utm_medium=web2x&context=3
```
body {
--h1-size: 1.42em;
--h2-size: 1.33em;  
--h3-size: 1.25em;  
--h4-size: 1.17em;  
--h5-size: 1.12em;  
--h6-size: 1.12em;  
}
```

Forced #style-custom-accent :
https://www.reddit.com/r/ObsidianMD/comments/12kfo7j/comment/jg2dj1j/?utm_source=share&utm_medium=web2x&context=3
```ad-note
title: CSS Snippet
Next, select Rose Pine for Light Theme Flavor and Frappe for Dark Theme Flavor.

Set both Light and Dark theme accent to Teal, the colour is customized in the CSS.

Turn on Forced Custom Accents.
~~~
{  
"anuppuccin-theme-settings@@anuppuccin-theme-light": "ctp-rosepine-light",  
"anuppuccin-theme-settings@@anuppuccin-theme-dark": "ctp-frappe",  
"anuppuccin-theme-settings@@anuppuccin-light-theme-accents": "ctp-accent-light-teal",  
"anuppuccin-theme-settings@@anuppuccin-theme-accents": "ctp-accent-teal",  
"anuppuccin-theme-settings@@anuppuccin-accent-toggle": true,  
"anuppuccin-theme-settings@@ctp-custom-peach@@light": "#DD7F67",  
"anuppuccin-theme-settings@@ctp-custom-teal@@dark": "#11B7C5",  
"anuppuccin-theme-settings@@ctp-custom-teal@@light": "#1A7DA4",  
"anuppuccin-theme-settings@@ctp-custom-subtext1@@light": "#EE653A",  
"anuppuccin-theme-settings@@ctp-custom-subtext0@@dark": "#FB35D8",  
"anuppuccin-theme-settings@@ctp-custom-subtext0@@light": "#0C9FCE",  
"anuppuccin-theme-settings@@ctp-custom-overlay2@@dark": "#0AD1D0",  
"anuppuccin-theme-settings@@ctp-custom-overlay2@@light": "#353535",  
"anuppuccin-theme-settings@@ctp-custom-overlay1@@dark": "#FFA600",  
"anuppuccin-theme-settings@@ctp-custom-overlay1@@light": "#692525",  
"anuppuccin-theme-settings@@ctp-custom-overlay0@@dark": "#4CFFD2",  
"anuppuccin-theme-settings@@ctp-custom-overlay0@@light": "#0C9FCE",  
"anuppuccin-theme-settings@@ctp-custom-surface2@@light": "#E03F3F",  
"anuppuccin-theme-settings@@anp-active-line": "anp-no-highlight",  
"anuppuccin-theme-settings@@anp-callout-select": "anp-callout-sleek",  
"anuppuccin-theme-settings@@anp-callout-color-toggle": true,  
"anuppuccin-theme-settings@@anp-custom-checkboxes": true,  
"anuppuccin-theme-settings@@anp-speech-bubble": true,  
"anuppuccin-theme-settings@@tag-radius": 2,  
"anuppuccin-theme-settings@@anp-color-transition-toggle": true,  
"anuppuccin-theme-settings@@anp-cursor": "pointer",  
"anuppuccin-theme-settings@@anp-toggle-scrollbars": true,  
"anuppuccin-theme-settings@@anp-editor-font-source": "\"\"",  
"anuppuccin-theme-settings@@anp-editor-font-lp": "\"\"",  
"anuppuccin-theme-settings@@bold-weight": "700",  
"anuppuccin-theme-settings@@anp-font-live-preview-wt": "400",  
"anuppuccin-theme-settings@@anp-header-color-toggle": true,  
"anuppuccin-theme-settings@@anp-header-divider-color-toggle": true,  
"anuppuccin-theme-settings@@h1-weight": 700,  
"anuppuccin-theme-settings@@h2-weight": 700,  
"anuppuccin-theme-settings@@h3-weight": 700,  
"anuppuccin-theme-settings@@h4-weight": 700,  
"anuppuccin-theme-settings@@h5-weight": 700,  
"anuppuccin-theme-settings@@h6-size": 1.1,  
"anuppuccin-theme-settings@@h6-weight": 700,  
"anuppuccin-theme-settings@@anp-decoration-toggle": true,  
"anuppuccin-theme-settings@@anp-custom-bg-brightness-light": 0.7,  
"anuppuccin-theme-settings@@anp-custom-bg-blur-light": 5,  
"anuppuccin-theme-settings@@anp-custom-bg-card-fg-opacity-light": 0.4,  
"anuppuccin-theme-settings@@anp-custom-bg-brightness-dark": 0.7,  
"anuppuccin-theme-settings@@anp-custom-bg-blur-dark": 5,  
"anuppuccin-theme-settings@@anp-custom-bg-card-fg-opacity-dark": 0.4,  
"anuppuccin-theme-settings@@anp-colorful-frame": true,  
"anuppuccin-theme-settings@@anp-colorful-frame-opacity": 1,  
"anuppuccin-theme-settings@@anp-collapse-folders": true,  
"anuppuccin-theme-settings@@anp-file-icons": true,  
"anuppuccin-theme-settings@@anp-file-label-align": "0",  
"anuppuccin-theme-settings@@anp-alt-rainbow-style": "anp-full-rainbow-color-toggle",  
"anuppuccin-theme-settings@@anp-rainbow-folder-bg-opacity": 0.9,  
"anuppuccin-theme-settings@@anp-simple-rainbow-title-toggle": true,  
"anuppuccin-theme-settings@@anp-simple-rainbow-indentation-toggle": true,  
"anuppuccin-theme-settings@@anp-alt-tab-style": "anp-safari-tab-toggle",  
"anuppuccin-theme-settings@@anp-depth-tab-opacity": 0.6,  
"anuppuccin-theme-settings@@anp-depth-tab-gap": 10,  
"anuppuccin-theme-settings@@anp-safari-tab-animated": true,  
"anuppuccin-theme-settings@@anp-layout-select": "anp-border-layout"  
}
~~~

```


His plugins:
```ad-note
title: Plugins

Plugins i'm using :

- Banners

- Calendar

- Callout Manager

- Homepage

- Periodic Notes

- Style Settings

- Templater

- Tracker

```


Reddit Link regarding customizing #style-header and #style-css-classes 
https://www.reddit.com/r/ObsidianMD/comments/16pgs7e/comment/k4vqq9c/?utm_source=share&utm_medium=web2x&context=3

```ad-note
title: Reddit Snippet

Now to address your specific question- to target note elements, like the headers for example, make css rules targeting those html elements. These will be applied to all notes automatically. Note that I had to use "!important" for each rule in order for it to be picked up by Obsidian. There's probably a more elegant way like finding the exact class that applies to Obsidian headers, but for me this works. e.g.

~~~
h1 {
    color: green !important;
    font-size: 2.8rem !important;
}
h2 {
    color: blue !important;
    font-size: 2.1rem !important;
}
~~~

Now go back to Setting>Appearance and scroll down to CSS Snippets and click the little refresh button. Your css file will appear. Click the toggle button next to it to have it automatically be included in all notes.

---

The thing that had me hung up was the `cssclasses` attribute for the notes frontmatter. That isn't required unless you want to define specific css classes in your snippets file and specify which notes (through the inclusion of the class name as a value to `cssclasses` in a note's frontmatter.

e.g.

~~~
.my-notes {
    color: #ffffff;
}
~~~

and in your note's frontmatter include `cssclasses: my-notes`, then that rule will be applied to that note.

```