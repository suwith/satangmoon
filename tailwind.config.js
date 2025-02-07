/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'main': "url('./assets/bg2.jpg')",
            },
        },
    },
    plugins: [],
};
