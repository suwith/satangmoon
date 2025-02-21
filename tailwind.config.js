/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./public/index.html",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'main': "url('./assets/background.svg')",
                'card': "url('./assets/card_with_blank.svg')",
            },
            screens: {
                'xs': '320px',  // 아이폰 SE, 작은 화면 지원
                'sm': '414px',  // 기본 모바일 (iPhone 14 Pro 등)
                'md': '768px',  // 태블릿
                'lg': '1024px', // 작은 데스크탑
                'xl': '1280px', // 일반 데스크탑
            },
        },
    },
    plugins: [],
};
