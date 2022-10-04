import grapesjs from "grapesjs";
import gjsBlockBasic from "grapesjs-blocks-basic";
import $ from "jquery";
import grapesjsBlockBootstrap from "grapesjs-blocks-bootstrap4";
import grapesjsPluginExport from "grapesjs-plugin-export";
import grapesjsStyleBg from "grapesjs-style-bg";

import {
  addEditorCommand,
  deviceManager,
  layerManager,
  panels,
  scripts,
  selectorManager,
  storageSetting,
  styleManager,
  styles,
  // toggleSidebar,
  traitManager,
} from "./geditor_utils";

const geditorConfig = (assets, pageId) => {
  $(".panel__devices").html("");
  $(".panel__basic-actions").html("");
  $(".panel__editor").html("");
  $("#blocks").html("");
  $("#styles-container").html("");
  $("#layers-container").html("");
  $("#trait-container").html("");

  // Content for Preview
  const navbar = $("#navbar");
  const mainContent = $("#main-content");
  const panelTopBar = $("#main-content > .navbar-light");

  const editor = grapesjs.init({
    container: "#editor",
    blockManager: {
      appendTo: "#blocks",
    },
    styleManager: styleManager,
    layerManager: layerManager,
    traitManager: traitManager,
    selectorManager: selectorManager,
    panels: panels,
    deviceManager: deviceManager,
    assetManager: { assets: assets, upload: true },
    storageManager: storageSetting(pageId),
    canvas: {
      styles: styles,
      scripts: scripts,
    },
    plugins: [
      gjsBlockBasic,
      grapesjsBlockBootstrap,
      grapesjsPluginExport,
      grapesjsStyleBg,
    ],
    pluginsOpts: {
      gjsBlockBasic: {},
      grapesjsBlockBootstrap: {},
      grapesjsPluginExport: {},
      grapesjsStyleBg: {},
    },
  });

  addEditorCommand(editor);

  const domc = editor.DomComponents

  domc.addType('image-block', {
    extend: 'default',
    model: {
      defaults: function () {
        return {
          name: 'Background image',
          type: 'image-block',
          tagName: 'div',
          void: false,
          droppable: true
        }
      }
    },
    view: {
      init () {
        this.listenTo(this.model, 'active', this.onActive)
        this.listenTo(this.model, 'change:src', this.updateImage)
      },
      events: {
        dblclick: 'onActive'
      },
      onActive () {
        editor.runCommand('open-assets', {
          target: this.model,
          types: ['image'],
          accept: 'image/*'
        })
      },
      updateImage (model, url) {
        if (url) {
          const style = model.getStyle()

          model.setStyle({
            'background-image': style['background-color'] || `url("${url}")`,
            'background-size': style['background-size'] || 'cover',
            'background-position': style['background-position'] || 'center center',
            'background-repeat': style['background-repeat'] || 'no-repeat',
            'min-height': style['min-height'] || '200px'
          })
        }
      }
    }
  })

  const bm = editor.BlockManager

  bm.add('image-block', {
    label: 'Background Image',
    category: 'Basic',
    content: {
      type: 'image-block',
      activeOnRender: true,
      style: {
        'background-image': `url('http://localhost:8080/api/assets')`,
        'min-height': '200px',
        'background-size': 'cover',
        'background-position': 'center center',
        'background-repeat': 'no-repeat'
      }
    }
  })
  editor.on("run:preview", () => {
    console.log("It will trigger when we click on preview icon");
    // This will be used to hide border
    editor.stopCommand("sw-visibility");
    // This will hide the sidebar view
    navbar.removeClass("sidebar");
    // This will make the main-content to be full width
    mainContent.removeClass("main-content");

    // This will hide top panel where we have added the button
    panelTopBar.addClass("d-none");
  });
  editor.on("stop:preview", () => {
    // This event is reverse of the above event.
    console.log("It will trigger when we click on cancel preview icon");
    editor.runCommand("sw-visibility");
    navbar.addClass("sidebar");
    mainContent.addClass("main-content");
    panelTopBar.removeClass("d-none");
  });
  editor.on("component:selected", (component) => {
    const newTool = {
      icon: "fa fa-plus-square",
      title: "Check Toolbar",
      commandName: "new-tool-cmd",
      id: "new-tool",
    };

    const defaultToolbar = component.get("toolbar");
    const checkAlreadyExist = defaultToolbar.find(
      (toolbar) => toolbar.command === newTool.commandName
    );
    if (!checkAlreadyExist) {
      defaultToolbar.unshift({
        id: newTool.id,
        attributes: { class: newTool.icon, title: newTool.title },
        command: newTool.commandName,
      });
      component.set("toolbar", defaultToolbar);
    }
  });

  setTimeout(() => {
    let categories = editor.BlockManager.getCategories();
    categories.each((category) => category.set("open", false));
  }, 1000);
  return editor;
};


export default geditorConfig;