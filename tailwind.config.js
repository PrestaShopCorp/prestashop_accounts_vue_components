module.exports = {
  prefix: "acc-",
  important: '#psaccounts',
  purge: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyan: {
          ligther: "#dbe6e9",
          darker: "#6c868e",
          blue: "#fafbfc",
        },
        gray: {
          darker: "#363a41",
        },
        primary: {
          DEFAULT: "#25b9d7",
          hover: "#7cd5e7",
          active: "#21a6c1",
        },
        success: {
          DEFAULT: '#4CBB6C',
          lighter: "#cbf2d4",
          darker: "#53d572",
        },
        danger: {
          lighter: "#fbc6c3",
          darker: "#f44336",
        },
        warning: {
          lighter: "#fffbd3",
          darker: "#fab000",
        },
        info: {
          lighter: "#beeaf3",
          darker: "#25b9d7",
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'Helvetica', 'Arial', 'sans-serif'],
      },
      zIndex: {
        1500: '1500',
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["disabled"],
      borderColor: ["disabled"],
      cursor: ["disabled"],
      textColor: ["disabled"],
    },
  },
  plugins: [],
};
