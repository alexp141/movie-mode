import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  &, &.light-mode {
  /* Grey */
  --color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;


  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

    --background-color: var(--color-purple-dark-90);
    --sidebar-background-color: #191230;
    --color-form-input: #16161a;
    --color-white: #fffffe;
    --color-stroke: #010101;

    --color-purple-light-10: #8c6bf2;
    --color-purple-light-20: #997bf3;
    --color-purple-light-30: #a58cf5;
    --color-purple-light-40: #b29cf6;
    --color-purple-light-50: #bfadf8;
    --color-purple-light-60: #ccbdf9;
    --color-purple-light-70: #d9cefb;
    --color-purple-light-80: #e5defc;
    --color-purple-light-90: #f2effe;
    --color-purple: #7f5af0;
    --color-purple-dark-10: #7251d8;
    --color-purple-dark-20: #6648c0;
    --color-purple-dark-30: #593fa8;
    --color-purple-dark-40: #4c3690;
    --color-purple-dark-50: #402d78;
    --color-purple-dark-60: #332460;
    --color-purple-dark-70: #261b48;
    --color-purple-dark-80: #191230;
    --color-purple-dark-90: #0d0918;


  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
  

    --image-grayscale: 0;
  --image-opacity: 100%;


  }
  
  &.dark-mode {
    --color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;


--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
  }
  
  /* Indigo */
  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;
  
  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;


}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.1s, border 0.1s;
}

html {
  font-size: 62.5%;
}


body {
  font-family: "Poppins", sans-serif;
  color: var(--color-white);
  background-color: var(--background-color);

  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}



button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

/* select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
} */

/* input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--purple);
  outline-offset: -1px;
} */

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  /* For dark mode */
  max-width: 100%;
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

`;

export default GlobalStyles;

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
