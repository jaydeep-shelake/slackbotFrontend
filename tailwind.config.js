/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors:{
        'ss-blue': '#35FFFF',
        'ss-purple': '#7F3CDD',
        'ss-dark':'#000000',
        'ss-light-purple':'#D0BCFF',
        'ss-body':'#0a0a0a',
        'ss-dark-purple':'#381e72',
         'ss-gray':'#121114',
          'ss-light':'#4c4e52',
         'ss-black':'#1F1826',
         'ss-form':'#1E1E1E',
         'ss-alpha-purple':'#7f3cdd4e',
         'neutral-5': '#1C1B1F',
         'approved':'#57a99a6c',
         'rejected':'#bf282884',
         'pending':'#dbc32984',
         'neutral-10': '#1C1B1F',
      },
      fontFamily:{
        poppins:['Poppins','Oswald','Open+Sans']
      }
    },
  },
  plugins: [],

}
