---
folder: 80 - Reference (Work)/10 - Obsidian/Styling
tags: ""
title: GUI Styling
---

```ad-help
title: Style File Explorer #style-file-explorer
https://forum.obsidian.md/t/add-horizontal-scrollbar-for-file-list/46370/7?u=adk-pinochle
~~~
.nav-files-container {
  overflow-x: auto;
}

.nav-file-title, .nav-folder-title {
  width: max-content;
}
~~~


```

```ad-note
title: Vertical stacked tabs from Discord
okay so it's probably got unforeseen weird breaking issues, but here's a CSS snippet i wrote once about this
~~~css
/* super scuffed attempt at horizontal stacked tabs */
body {
    --tab-stacked-text-writing-mode: ltr;
    --tab-stacked-header-width: 100%;
    --tab-stacked-border: 1px dashed var(--tab-outline-color);
}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container {
    flex-direction: column;
}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header {
    left: initial !important;
    right: initial !important;
    min-width: 100%;
    padding: 0 var(--size-4-3);
    border-bottom: var(--tab-stacked-border);
}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header .workspace-tab-header-inner {
    flex-direction: row-reverse;
    padding: var(--size-4-1) var(--size-4-1);
    gap: var(--size-4-2);
}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header .workspace-tab-header-inner .workspace-tab-header-inner-title {
    text-align: center;
    padding: 0 0 0 60px;

}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-leaf.mod-active {
    left: unset !important;
    min-width: 100% !important;
    flex: 1 1 auto;
    border-bottom: var(--tab-stacked-border);
}
.*workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-leaf:not(.mod-active) {*
    height: 0px;
}
.workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-tab-header:has(+ .workspace-leaf:not(.mod-active)) {
    flex: 0 0 fit-content;
}
~~~
```

```ad-note
title: Vertical stacked tabs
~~~css
/* @settings

name: Vertical Stacked Tab Settings
id: vertical-stacked-tabs
settings:
-
  id: touch-area-left
  title: Move scroll area to the left side
  type: class-toggle
-
  id: scrolling-headers
  title: Disable sticky headers
  type: class-toggle
-
  id: disable-diagonal-bars
  title: Disable touch area bars
  type: class-toggle
-
  id: touch-margin
  title: Touch background width
  description: How wide the side scrollbar is (rem)
  type: variable-number-slider
  default: 4
  min: 0
  max: 10
  step: 1
  format: rem
-
  id: workspace-page-height
  title: Page height
  description: How tall each page is
  type: variable-number-slider
  default: 80
  min: 25
  max: 100
  step: 5
-
  id: touch-background-light
  title: Light mode touch area color
  type: variable-color
  opacity: false
  format: hex
  default: '#aaa'
-
  id: touch-background-dark
  title: Dark mode touch area color
  type: variable-color
  opacity: false
  format: hex
  default: '#444'
-
  id: test-header-information
  title: Info
  type: heading
  level: 1
  collapsed: true
-
  id: vertical-stacked-tabs-description
  title:
  description: |
    Created by **FireIsGood#0733** in the Obsidian Members Group Discord. Ask in the `#appearance` channel for support.
    
    It is intended to make mobile stacked tabs appear vertical.
  type: info-text
  markdown: true
*/


/** Theme settings **/

/* Global variables */
body {
  --diagonal-bars: repeating-linear-gradient(-45deg, rgba(0,0,0,0.1) 0px 4px, transparent 4px 12px)
}
.theme-light {
  --touch-background: var(--touch-background-light, #aaa);
}
.theme-dark {
  --touch-background: var(--touch-background-dark, #444);
}
/* Left handed mode */
.is-mobile.touch-area-left .mod-stacked .workspace-tab-container > * {
  margin-left: auto;
}
/* Diagonal bars */
body:not(.disable-diagonal-bars).is-mobile .workspace-tab-container {
  background-image: var(--diagonal-bars);
}
body:not(.disable-diagonal-bars).touch-area-left.is-mobile .workspace-tab-container {
  background-image: linear-gradient(to left, var(--background-primary) 50%, transparent 50%),
  var(--diagonal-bars);
}


/** Main styles **/

/* Set page width */
.is-mobile .mod-vertical .mod-stacked .workspace-leaf,
.is-mobile .mod-stacked .workspace-tab-header {
  width: calc(100% - var(--touch-margin, 4rem) - var(--scrollbar-width, 0px)) !important;
  max-width: unset !important;
  min-width: unset !important;
  left: unset !important;
  right: unset !important;
}
.is-mobile.touch-area-left {
  --scrollbar-width: 12px;
}
/* Set page height */
.is-mobile .mod-vertical .mod-stacked .workspace-leaf {
  height: calc(var(--workspace-page-height, 80) * 1% - 48px) !important;
}
/* Set workspace direction */
.is-mobile .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container {
  flex-direction: column;
  overflow: hidden auto;
  background-color: var(--touch-background);
}


/** Misc changes **/

/* Add borders */
.is-mobile .mod-stacked .workspace-tab-container > .workspace-tab-header {
  border-top: 2px solid var(--background-secondary);
  box-shadow: 0 -4px 4px -2px rgba(0,0,0,.2) !important;
}
.is-mobile:not(.touch-area-left) .mod-stacked .workspace-tab-container > * {
  border-right: 2px solid var(--background-secondary);
}
.is-mobile.touch-area-left .mod-stacked .workspace-tab-container > * {
  border-left: 2px solid var(--background-secondary);
}
/* Fix hidden tabs */
.is-mobile .workspace .mod-root .workspace-tabs.mod-stacked .workspace-tab-container .workspace-leaf.is-hidden > * {
  display: initial;
}
/* Fix headers */
.is-mobile .mod-stacked .workspace-tab-header-inner {
  flex-direction: row !important;
  writing-mode: horizontal-tb;
  padding: 4px 10px !important;
  min-height: 48px;
}

.is-mobile:not(.scrolling-headers) .mod-stacked .workspace-tab-container > .workspace-tab-header {
  top: calc((var(--tab-index) - 1) * 50px);
}
.is-mobile:not(.scrolling-headers) .mod-stacked .workspace-tab-container > .workspace-leaf {
  top: calc(var(--tab-index) * 50px);
}

.markdown-preview-view {
  overscroll-behavior: contain;
}

/* Supports up to 25 tabs */
.workspace-tab-header:nth-child(1) {--tab-index: 1}
.workspace-leaf:nth-child(2) {--tab-index: 1}
.workspace-tab-header:nth-child(3) {--tab-index: 2}
.workspace-leaf:nth-child(4) {--tab-index: 2}
.workspace-tab-header:nth-child(5) {--tab-index: 3}
.workspace-leaf:nth-child(6) {--tab-index: 3}
.workspace-tab-header:nth-child(7) {--tab-index: 4}
.workspace-leaf:nth-child(8) {--tab-index: 4}
.workspace-tab-header:nth-child(9) {--tab-index: 5}
.workspace-leaf:nth-child(10) {--tab-index: 5}
.workspace-tab-header:nth-child(11) {--tab-index: 6}
.workspace-leaf:nth-child(12) {--tab-index: 6}
.workspace-tab-header:nth-child(13) {--tab-index: 7}
.workspace-leaf:nth-child(14) {--tab-index: 7}
.workspace-tab-header:nth-child(15) {--tab-index: 8}
.workspace-leaf:nth-child(16) {--tab-index: 8}
.workspace-tab-header:nth-child(17) {--tab-index: 9}
.workspace-leaf:nth-child(18) {--tab-index: 9}
.workspace-tab-header:nth-child(19) {--tab-index: 10}
.workspace-leaf:nth-child(20) {--tab-index: 10}
.workspace-tab-header:nth-child(21) {--tab-index: 11}
.workspace-leaf:nth-child(22) {--tab-index: 11}
.workspace-tab-header:nth-child(23) {--tab-index: 12}
.workspace-leaf:nth-child(24) {--tab-index: 12}
.workspace-tab-header:nth-child(25) {--tab-index: 13}
.workspace-leaf:nth-child(26) {--tab-index: 13}
.workspace-tab-header:nth-child(27) {--tab-index: 14}
.workspace-leaf:nth-child(28) {--tab-index: 14}
.workspace-tab-header:nth-child(29) {--tab-index: 15}
.workspace-leaf:nth-child(30) {--tab-index: 15}
.workspace-tab-header:nth-child(31) {--tab-index: 16}
.workspace-leaf:nth-child(32) {--tab-index: 16}
.workspace-tab-header:nth-child(33) {--tab-index: 17}
.workspace-leaf:nth-child(34) {--tab-index: 17}
.workspace-tab-header:nth-child(35) {--tab-index: 18}
.workspace-leaf:nth-child(36) {--tab-index: 18}
.workspace-tab-header:nth-child(37) {--tab-index: 19}
.workspace-leaf:nth-child(38) {--tab-index: 19}
.workspace-tab-header:nth-child(39) {--tab-index: 20}
.workspace-leaf:nth-child(40) {--tab-index: 20}
.workspace-tab-header:nth-child(41) {--tab-index: 21}
.workspace-leaf:nth-child(42) {--tab-index: 21}
.workspace-tab-header:nth-child(43) {--tab-index: 22}
.workspace-leaf:nth-child(44) {--tab-index: 22}
.workspace-tab-header:nth-child(45) {--tab-index: 23}
.workspace-leaf:nth-child(46) {--tab-index: 23}
.workspace-tab-header:nth-child(47) {--tab-index: 24}
.workspace-leaf:nth-child(48) {--tab-index: 24}
.workspace-tab-header:nth-child(49) {--tab-index: 25}
.workspace-leaf:nth-child(50) {--tab-index: 25}
~~~

```