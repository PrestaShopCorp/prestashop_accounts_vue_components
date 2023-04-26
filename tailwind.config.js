module.exports = {
  prefix: "acc-",
  important: '#psaccounts',
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue-focus': '#458FFF',
        grey: {
          50: '#FAFAFB', // Background grey in the DS
          100: '#EDEEF0', // Grey 50 in DS
          200: '#E1E0EB', // Decorative in DS
          300: '#D7D8D9', // Disabled in DS
          400: '#D2D4D9', // Grey 100 in DS
          500: '#C8D7E4', // Border Main in DS
          600: '#697180', // Grey 500 in DS
          900: '#363A41', // Font Main
        },
        success: {
          50: '#E4F0EA',
          100: '#BCDACA',
          500: '#21834D',
          700: '#18703D',
          900: '#0B5325',
        },
        warning: {
          50: '#FFF4E0',
          100: '#FFE3B3',
          500: '#FFA000',
          700: '#FF8E00',
          900: '#FF7300',
        },
        danger: {
          50: '#FAE7E8',
          100: '#F2C2C5',
          500: '#D5343C',
          700: '#CA272E',
          900: '#BA151A',
        },
        info: {
          50: '#E3EAFD',
          100: '#B9CAFA',
          500: '#174EEF',
          700: '#113DEB',
          900: '#0725E4',
        },
        primary: {
          get DEFAULT() {
            return this['800']
          },
          100: '#FFFFFF',
          200: '#F7F7F7',
          300: '#EEEEEE',
          400: '#DDDDDD',
          500: '#BBBBBB',
          600: '#5E5E5E',
          700: '#3F3F3D',
          800: '#1D1D1B',
        }
      },
      fontFamily: {
        primary: ['IBM Plex Sans', 'Helvetica', 'Verdana', 'sans-serif'],
      },
      zIndex: {
        1500: '1500',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled", "active"],
      borderColor: ["disabled", "active"],
      cursor: ["disabled"],
      textColor: ["disabled", "active"],
    },
  },
  plugins: [],
};
