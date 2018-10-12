const themeOverride = {
  palette: {
    type: 'dark',
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
        color: 'white',
        fontSize: '1.3em'
      }
    },
    MuiDialog: {
      paper: {
        margin: 0,
        background: 'rgba(40,40,40,0.95)'
      },
      paperWidthSm: {
        maxWidth: 'unset',
      },
    },
    MuiDialogContent: {
      root: {
        padding: 0
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
    },
    MuiDivider: {
      root: {
        margin: '15px 0'
      }
    }
  }
};

export default themeOverride;
