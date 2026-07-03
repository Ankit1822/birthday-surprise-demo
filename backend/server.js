const express = require("express");
const path = require("path");
const session = require("express-session");



const app = express();

app.set("trust proxy", 1);

app.use(express.json());


app.use(session({
    secret: "birthday-secret",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 10 * 60 * 1000
    }
}));


app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});

app.post("/verify", (req, res) => {

    console.log("verify request received:", req.body);

    const { name } = req.body;

    if (
        name &&
        name.toLowerCase() === "xyz"
    ) {

        req.session.loggedIn = true;

        return res.json({
            success: true
        });

    }

    res.status(401).json({
        success: false
    });

});

app.get("/gallery/:fileName", (req, res) => {

    if (!req.session.loggedIn) {
        return res.status(401).send("Unauthorized");
    }

    const fileName = path.basename(req.params.fileName);

    const allowed = [
        ".jpg",
        ".jpeg",
        ".png",
        ".webp"
    ];

    const ext = path.extname(fileName).toLowerCase();

    if (!allowed.includes(ext)) {
        return res.status(403).send("Invalid File");
    }

    const filePath = path.join(
        __dirname,
        "../private/img",
        fileName
    );

    res.sendFile(filePath, err => {

        if (err) {
            res.status(404).send("Image Not Found");
        }

    });

});

app.get("/music/:fileName", (req, res) => {

    if (!req.session.loggedIn) {
        return res.status(401).send("Unauthorized");
    }

    const fileName = path.basename(req.params.fileName);
    const allowed = [ 
    ".mp3",
    ".wav",
    ".ogg"
];

const ext =
path.extname(fileName).toLowerCase();

if(!allowed.includes(ext)){

    return res.status(403).send("Invalid File");

}

const filePath = path.join(
    __dirname,
    "../private/music",
    fileName
);

    res.sendFile(filePath, (err) => {

        if (err) {
            res.status(404).send("Music Not Found");
        }

    });

});

app.post("/logout", (req, res) => {

    req.session.destroy(() => {

        res.json({
            success: true
        });

    });

});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});