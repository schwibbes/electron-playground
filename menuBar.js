const electron = require('electron');
function menuBar(main_window) {
  var application_menu = [
    {
      label: 'menu1',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'refresh',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            main_window.reload();
          }
        },

        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            electron.dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] });
          }
        },
        {
          label: 'dev-tools',
          submenu: [
            {
              label: 'show',
              accelerator: 'CmdOrCtrl+D',
              click: () => {
                main_window.openDevTools();
              }
            },
            {
              label: 'hide',
              accelerator: 'CmdOrCtrl+E',
              click: () => {
                main_window.closeDevTools();
              }
            }
          ]
        }
      ]
    }
  ];
  menu = electron.Menu.buildFromTemplate(application_menu);
  electron.Menu.setApplicationMenu(menu);
}
exports.menuBar = menuBar;
