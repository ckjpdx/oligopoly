const themeOverride = {
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
    primary: {
      main: '#ff7cf4',
    },
    secondary: {
      main: '#b67cff',
    },
  },
  typography: {
    fontFamily: 'Rajdhani',
    fontSize: 18
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 0,
      },
    },
    MuiListItemIcon: {
      root: {
        marginRight: 0
      }
    },
    MuiSvgIcon: {
      root: {
        verticalAlign: 'middle',
        color: 'white'
      }
    },
    MuiDialog: {
      paper: {
        margin: 0
      }
    },
    MuiSelect: {
      select: {
        minWidth: 60
      }
    },
    MuiGrid: {
      item: {
        textAlign: 'center'
      }
    }
  }
};

export default themeOverride;
