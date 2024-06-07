/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => VaultTransferPlugin
});
module.exports = __toCommonJS(main_exports);

// src/commands.ts
var import_obsidian4 = require("obsidian");

// src/transfer.ts
var fs = __toESM(require("fs"));
var import_obsidian2 = require("obsidian");

// src/utils.ts
var import_obsidian = require("obsidian");
function showNotice(...message) {
  new import_obsidian.Notice(message.join(" "));
  console.log(message);
}

// src/transfer.ts
function removePartOfPath(settings, path2) {
  for (const part of settings.removePath) {
    path2 = path2.replace(RegExp(part, "gi"), "");
  }
  return (0, import_obsidian2.normalizePath)(path2);
}
async function transferNote(editor, file, app, settings, recursive, outputPath) {
  try {
    const settingsErrorShown = showErrorIfSettingsInvalid(settings);
    if (settingsErrorShown) {
      return;
    }
    const outputVault = (0, import_obsidian2.normalizePath)(settings.outputVault);
    const outputFolder = (0, import_obsidian2.normalizePath)(settings.outputFolder);
    const fileSystemAdapter = app.vault.adapter;
    if (!(fileSystemAdapter instanceof import_obsidian2.FileSystemAdapter)) {
      showNotice("Error: fileSystemAdapter is not an instance of FileSystemAdapter");
      return;
    }
    const thisVaultPath = fileSystemAdapter.getBasePath();
    const fileName = file.name;
    const fileDisplayName = file.basename;
    let outputFolderPath;
    if (!outputPath) {
      outputFolderPath = `${outputVault}/${outputFolder}`;
      outputPath = (0, import_obsidian2.normalizePath)(`${outputFolderPath}/${fileName}`);
      if (settings.recreateTree) {
        outputPath = (0, import_obsidian2.normalizePath)(`${outputFolderPath}/${file.path}`);
        outputPath = removePartOfPath(settings, outputPath);
      }
    } else {
      outputFolderPath = (0, import_obsidian2.normalizePath)(outputPath);
      outputPath = (0, import_obsidian2.normalizePath)(`${outputPath}/${fileName}`);
    }
    if (!recursive)
      showNotice(`Copying ${file.path} to ${outputPath}`);
    const folderExists = fs.existsSync(outputFolderPath);
    if (!folderExists) {
      showNotice(`Error: Directory does not exist at ${outputFolderPath}`);
      return;
    } else if (settings.recreateTree) {
      fs.mkdirSync((0, import_obsidian2.normalizePath)(outputPath.replace(fileName, "")), { recursive: true });
    }
    if (fs.existsSync(outputPath)) {
      if (settings.overwrite) {
        fs.unlinkSync(outputPath);
      } else {
        showNotice("Error: File already exists");
        return;
      }
    }
    copyAllAttachments(file, app, outputPath, thisVaultPath);
    fs.copyFileSync((0, import_obsidian2.normalizePath)(`${thisVaultPath}/${file.path}`), outputPath);
    if (settings.createLink) {
      const link = createVaultFileLink(fileDisplayName, outputVault);
      if (editor)
        editor.setValue(link);
      else
        await app.vault.modify(file, link);
    } else if (settings.deleteOriginal && !recursive) {
      app.vault.trash(file, settings.moveToSystemTrash);
    }
  } catch (e) {
    showNotice(`Error copying file`, e);
  }
}
function listToTransfer(file) {
  const files = file.children;
  const filesToTransfer = [];
  for (const file2 of files) {
    if (file2 instanceof import_obsidian2.TFile) {
      filesToTransfer.push(file2);
    } else if (file2 instanceof import_obsidian2.TFolder) {
      filesToTransfer.push(...listToTransfer(file2));
    }
  }
  return filesToTransfer;
}
function transferFolder(folder, app, settings, outputPath) {
  const files = listToTransfer(folder);
  for (const file of files) {
    transferNote(null, file, app, settings, true, outputPath);
    if (settings.deleteOriginal && !settings.createLink) {
      app.vault.trash(folder, settings.moveToSystemTrash);
    }
    showNotice(`Finished copying ${file.path}`);
  }
}
function insertLinkToOtherVault(editor, view, settings) {
  const settingsErrorShown = showErrorIfSettingsInvalid(settings);
  if (settingsErrorShown) {
    return;
  }
  if (view.file == null) {
    showNotice("Error: view.file is null");
    return;
  }
  const fileDisplayName = view.file.basename;
  const outputVault = settings.outputVault;
  const link = createVaultFileLink(fileDisplayName, outputVault);
  editor.replaceSelection(link);
}
function createVaultFileLink(fileDisplayName, outputVault) {
  const vaultPathArray = (0, import_obsidian2.normalizePath)(outputVault).split("/");
  const vaultName = vaultPathArray[vaultPathArray.length - 1];
  const urlOtherVault = encodeURI(vaultName);
  const urlFile = encodeURI(fileDisplayName);
  return `[${fileDisplayName}](obsidian://vault/${urlOtherVault}/${urlFile})`;
}
function showErrorIfSettingsInvalid(settings) {
  let message = null;
  if (settings.outputVault.trim().length == 0) {
    message = "Target vault has not been set.";
  }
  if (message != null) {
    showNotice(`Error: ${message}`);
    return true;
  }
  return false;
}
function copyAllAttachments(file, app, newVault, thisVaultPath) {
  var _a, _b;
  const attachments = (_b = (_a = app.metadataCache.getFileCache(file)) == null ? void 0 : _a.embeds) != null ? _b : [];
  for (const attachment of attachments) {
    const attachmentPath = app.metadataCache.getFirstLinkpathDest(attachment.link.replace(/#.*/, ""), file.path);
    if (attachmentPath) {
      const newAttachmentPath = (0, import_obsidian2.normalizePath)(`${newVault.replace(file.name, "")}/${attachmentPath.path}`);
      const oldAttachmentPath = (0, import_obsidian2.normalizePath)(`${thisVaultPath}/${attachmentPath.path}`);
      if (!fs.existsSync(newAttachmentPath.replace(attachmentPath.name, ""))) {
        fs.mkdirSync(newAttachmentPath.replace(attachmentPath.name, ""), { recursive: true });
      }
      fs.copyFileSync(oldAttachmentPath, newAttachmentPath);
    }
  }
}

// src/modals.ts
var import_obsidian3 = require("obsidian");
var fs2 = __toESM(require("fs"));
var FolderSuggestModal = class extends import_obsidian3.FuzzySuggestModal {
  constructor(plugin, app, settings, folder, toTransfer) {
    super(plugin.app);
    this.plugin = plugin;
    this.settings = settings;
    this.foldersList = folder;
    this.app = app;
    this.toTransfer = toTransfer;
  }
  getItems() {
    return this.foldersList;
  }
  getItemText(item) {
    return item.relPath;
  }
  onChooseItem(item, evt) {
    if (item.absPath.length == 0) {
      new CreateFolder(this.app, this.plugin, this.settings, item, this.toTransfer).open();
    } else {
      if (this.toTransfer instanceof import_obsidian3.TFolder) {
        transferFolder(this.toTransfer, this.app, this.settings, item.absPath);
      } else if (this.toTransfer instanceof import_obsidian3.TFile) {
        transferNote(null, this.toTransfer, this.app, this.settings, void 0, item.absPath);
      }
    }
  }
};
var CreateFolder = class extends import_obsidian3.Modal {
  constructor(app, plugin, settings, folder, toTransfer) {
    super(app);
    this.app = app;
    this.plugin = plugin;
    this.settings = settings;
    this.folder = folder;
    this.toTransfer = toTransfer;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.createEl("h2", { text: "Create new folder" });
    contentEl.createEl("p", { text: "Please enter the name of the folder you want to create" });
    new import_obsidian3.Setting(contentEl).setName("Folder name").setDesc("The folder will use the output vault as root").addText((text) => text.setPlaceholder("Folder name").setValue("").onChange(async (value) => {
      this.folder.relPath = value;
      this.folder.absPath = this.settings.outputVault + "/" + value;
    })).addButton((button) => {
      button.setButtonText("Create folder").onClick(async () => {
        fs2.mkdirSync((0, import_obsidian3.normalizePath)(this.folder.absPath), { recursive: true });
        if (this.toTransfer instanceof import_obsidian3.TFolder) {
          transferFolder(this.toTransfer, this.app, this.settings, this.folder.absPath);
        } else if (this.toTransfer instanceof import_obsidian3.TFile) {
          transferNote(null, this.toTransfer, this.app, this.settings, void 0, this.folder.absPath);
        }
        this.close();
      });
    });
  }
};

// src/commands.ts
var fs3 = __toESM(require("fs"));
var path = __toESM(require("path"));
function addCommands(plugin) {
  plugin.addCommand({
    id: "transfer-note-to-vault",
    name: "Transfer current note to other vault",
    editorCallback: (editor, view) => {
      if (view.file == null) {
        showNotice("Error: view.file is null");
        return;
      }
      transferNote(editor, view.file, plugin.app, plugin.settings);
    }
  });
  plugin.addCommand({
    id: "insert-link-to-note-in-vault",
    name: "Insert link to current note in other vault",
    editorCallback: (editor, view) => {
      insertLinkToOtherVault(editor, view, plugin.settings);
    }
  });
}
function addMenuCommands(plugin) {
  plugin.registerEvent(plugin.app.workspace.on("file-menu", (menu, file) => {
    menu.addItem((item) => {
      item.setTitle("Vault transfer").setIcon("arrow-right-circle");
      const submenu = item.setSubmenu();
      submenu.addItem((subitem) => {
        subitem.setTitle("Transfer").setIcon("arrow-right-circle").onClick(async () => {
          if (file instanceof import_obsidian4.TFolder) {
            transferFolder(file, plugin.app, plugin.settings);
          } else if (file instanceof import_obsidian4.TFile) {
            transferNote(null, file, plugin.app, plugin.settings);
          }
        });
        submenu.addItem((subitem2) => {
          subitem2.setTitle("Transfer to...").setIcon("arrow-right-circle").onClick(async () => {
            const folders = fs3.readdirSync(plugin.settings.outputVault).filter((file2) => fs3.statSync(plugin.settings.outputVault + "/" + file2).isDirectory()).filter((folder) => folder != plugin.app.vault.configDir).map((folder) => {
              return {
                absPath: plugin.settings.outputVault + "/" + folder,
                relPath: folder
              };
            });
            folders.push({
              absPath: plugin.settings.outputVault,
              relPath: path.basename(plugin.settings.outputVault)
            });
            folders.push({
              absPath: "",
              relPath: "Create new folder"
            });
            new FolderSuggestModal(plugin, plugin.app, plugin.settings, folders, file).open();
          });
        });
      });
    });
  }));
}

// src/main.ts
var import_obsidian6 = require("obsidian");

// src/settings.ts
var import_obsidian5 = require("obsidian");
var DEFAULT_SETTINGS = {
  outputVault: "",
  outputFolder: "",
  createLink: true,
  deleteOriginal: false,
  moveToSystemTrash: false,
  overwrite: false,
  recreateTree: false,
  removePath: []
};
var SettingTab = class extends import_obsidian5.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    new import_obsidian5.Setting(containerEl).setName("Path").setHeading();
    new import_obsidian5.Setting(containerEl).setName("Output vault").setDesc("The full file path to the other vault root folder.").addText((text) => text.setPlaceholder("C:/MyVault").setValue(this.plugin.settings.outputVault).onChange(async (value) => {
      this.plugin.settings.outputVault = (0, import_obsidian5.normalizePath)(value);
      await this.plugin.saveSettings();
    }));
    new import_obsidian5.Setting(containerEl).setName("Output folder").setDesc("The folder within the vault the file should be copied to.").addText((text) => text.setPlaceholder("Unsorted/Transfer").setValue(this.plugin.settings.outputFolder).onChange(async (value) => {
      this.plugin.settings.outputFolder = (0, import_obsidian5.normalizePath)(value);
      await this.plugin.saveSettings();
    }));
    new import_obsidian5.Setting(containerEl).setName("Recreate folder structure").setDesc("If set to true, the folder structure of the original file will be recreated in the new vault.").addToggle((toggle) => toggle.setValue(this.plugin.settings.recreateTree).onChange(async (value) => {
      this.plugin.settings.recreateTree = value;
      this.display();
      await this.plugin.saveSettings();
    }));
    if (this.plugin.settings.recreateTree) {
      new import_obsidian5.Setting(containerEl).setName("Remove folders from path").setDesc("Removes the specified folders from the output path, if present. Separate folders by using a comma or a new line. Names are case insensitive.").addTextArea((text) => text.setPlaceholder("RemoveThisFolder, AndThis").setValue(this.plugin.settings.removePath.join(", ")).onChange(async (value) => {
        const rawPaths = value.split(/[,\n]/);
        const cleanPaths = [];
        for (const path2 of rawPaths) {
          const trimmedPath = path2.trim();
          if (trimmedPath == "") {
            continue;
          }
          cleanPaths.push((0, import_obsidian5.normalizePath)(trimmedPath));
        }
        this.plugin.settings.removePath = cleanPaths;
        await this.plugin.saveSettings();
      }));
    }
    new import_obsidian5.Setting(containerEl).setName("Original file").setHeading();
    new import_obsidian5.Setting(containerEl).setName("Delete original").setDesc("If set to true, the original file will be deleted.").addToggle((toggle) => toggle.setValue(this.plugin.settings.deleteOriginal).onChange(async (value) => {
      this.plugin.settings.deleteOriginal = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    if (this.plugin.settings.deleteOriginal) {
      new import_obsidian5.Setting(containerEl).setName("Move to system trash").setDesc("If set to true, the original file will be moved to the system trash. Otherwise, it will be moved to the vault trash.").addToggle((toggle) => toggle.setValue(this.plugin.settings.moveToSystemTrash).onChange(async (value) => {
        this.plugin.settings.moveToSystemTrash = value;
        await this.plugin.saveSettings();
      }));
    }
    if (!this.plugin.settings.deleteOriginal) {
      new import_obsidian5.Setting(containerEl).setName("Create link").setDesc("Add a link to the new file in the new vault to the current note. If set to false, the file will be left unchanged.").addToggle((toggle) => toggle.setValue(this.plugin.settings.createLink).onChange(async (value) => {
        this.plugin.settings.createLink = value;
        await this.plugin.saveSettings();
        this.display();
      }));
    }
    new import_obsidian5.Setting(containerEl).setName("Other").setHeading();
    new import_obsidian5.Setting(containerEl).setName("Overwrite").setDesc("If set to false, the file will be skipped if it already exists in the other vault.").addToggle((toggle) => toggle.setValue(this.plugin.settings.overwrite).onChange(async (value) => {
      this.plugin.settings.overwrite = value;
      await this.plugin.saveSettings();
    }));
  }
};

// src/main.ts
var VaultTransferPlugin = class extends import_obsidian6.Plugin {
  async onload() {
    console.log("loading vault-transfer plugin");
    await this.loadSettings();
    addCommands(this);
    addMenuCommands(this);
    this.addSettingTab(new SettingTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  onunload() {
    console.log("unloading vault-transfer plugin");
  }
};
