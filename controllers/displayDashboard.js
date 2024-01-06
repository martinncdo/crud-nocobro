import fs from "node:fs/promises";
import path from "node:path";

const displayDashboard = async (req, res) => {
    try {
        const html = await fs.readFile(path.resolve("views/admin.html"), { encoding: 'utf8' });
        const js = await fs.readFile(path.resolve("views/script.js"), { encoding: 'utf8' });
        const css = await fs.readFile(path.resolve("views/style.css"), { encoding: 'utf8' });

        res.status(200).json({
            "html": html,
            "js": js,
            "css": css
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error.' });
    }
};

export default displayDashboard;