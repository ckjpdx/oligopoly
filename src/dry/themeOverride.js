const themeOverride = {
  palette: {
    type: 'dark',
    primary: {
      main: '#ff7cf4',
    },
    secondary: {
      main: '#b67cff',
    },
    neutral: {
      main: '#2C3539'
    }
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
    MuiList: {
      root: {
        textTransform: 'uppercase'
      }
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
        background: 'rgba(40,40,40,0.95)',
        width: '50vw',
        minWidth: 310
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
        minWidth: 60,
        textTransform: 'uppercase'
      }
    },
    MuiGrid: {
      item: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }
    },
    MuiDivider: {
      root: {
        margin: '15px auto',
        width: '90%'
      }
    },
    MuiBottomNavigationAction: {
      wrapper: {
        fontSize: '1.5em'
      },
      label: {
        fontSize: '1.25em'
      }
    },
    MuiPaper: {
      root: {
        width: '100%',
        // margin: '2px 0'
      }
    }
  }
};

export default themeOverride;
