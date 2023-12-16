import "./globals.css";

export const metadata = {
    title: "Trello 2.0",
    description: "Trello website clone",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="">{children}</body>
        </html>
    );
}
