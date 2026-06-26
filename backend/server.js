const express = require("express");
const path = require("path");
const session = require("express-session");

const app = express();

app.use(express.json());

app.use(session({

    secret:"birthday-secret",

    resave:false,

    saveUninitialized:false,

    cookie:{

        httpOnly:true,

        maxAge:10 * 60 * 1000,

        secure: process.env.NODE_ENV === "production",

        sameSite:"lax"

    }

}));

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});

app.post("/verify", (req, res) => {

    const { name } = req.body;

    if (
        name &&
        name.toLowerCase() === "rushi"
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


app.listen(3000, () => {

    console.log("Server Running...");

});