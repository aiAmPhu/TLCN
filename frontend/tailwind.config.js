/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            keyframes: {
                popup: {
                    "0%": { transform: "scale(0.9)", opacity: "0" },
                    "100%": { transform: "scale(1)", opacity: "1" },
                },
            },
            scale: {
                200: "2", // Phóng to gấp 2 lần
                250: "2.5", // Phóng to gấp 2.5 lần
                300: "3", // Phóng to gấp 3 lần
                400: "4", // Phóng to gấp 4 lần
            },
            animation: {
                popup: "popup 0.3s ease-out",
            },
        },
    },
    plugins: [],
};
