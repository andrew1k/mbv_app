// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import {createVuetify} from 'vuetify'
import {md3} from 'vuetify/blueprints'

export default createVuetify({
    blueprint: md3,
    defaults: {
      global: {},
      VCard: {
        elevation: 0,
        rounded: 'xl',
        ripple: false,
      },
      VCardActions: {
        VBtn: {
          variant: 'flat',
          size: 'large',
        },
      },
      VBtn: {
        elevation: 0,
        variant: 'flat',
      },

      VChipGroup: {
        variant: 'flat',
      },
      VChip: {
        size: 'large',
        rounded: 'pill',
        pill: true,
      },
      VTextField: {
        variant: 'outlined',
      },
      VTextarea: {
        variant: 'outlined',
      },
      VSelect: {
        variant: 'outlined',
      },
      VFileInput: {
        variant: 'outlined',
      },
    },
    theme: {
      themes: {
        mbvLight: {
          dark: false,
          colors: {
            background: '#e4e6e8', // eceff1
            surface: '#ffffff',
            contrast: '#1C1B1F',
            primary: '#37474F', // 9C27B0
            secondary: '#CB9821',
            error: '#D28782',
            info: '#1B78AF',
            success: '#8B9D77',
            warning: '#EBC678',
            worship: '#df1f26',
            worshipSec: '#ee9623',
            fellowship: '#e28126',
            fellowshipSec: '#f9a926',
            discipleship: '#058341',
            discipleshipSec: '#97c93d',
            ministry: '#815125',
            ministrySec: '#d2873e',
            evangelism: '#2674bb',
            evangelismSec: '#0cbde8',
          },
        },
        mbvDark: {
          dark: true,
          colors: {
            background: '#1C1B1F',
            surface: '#49454F', // 264653
            primary: '#D0BCFF',
            contrast: '#ffffff',
            // primary: '#2a9d8f',
            secondary: '#CCC2DC',
            // secondary: '#f4a261',
            error: '#F2B8B5',
            // error: '#e76f51',
            info: '#4F378B',
            // info: '#0cbde8',
            success: '#97c93d',
            warning: '#e9c46a',
            worship: '#df1f26',
            worshipSec: '#ee9623',
            fellowship: '#e28126',
            fellowshipSec: '#f9a926',
            discepleship: '#058341',
            discepleshipSec: '#97c93d',
            ministry: '#815125',
            ministrySec: '#d2873e',
            evangelism: '#2674bb',
            evangelismSec: '#0cbde8',
          },
        },
      },
    },
  },
)
