const functions = require("firebase-functions");
const express = require("express");
const path = require("path");
const admin = require("firebase-admin");
const { createHash } = require("crypto");

// https://stackoverflow.com/a/58409339/2430414
const serviceAccount = require("./private/serviceAcct.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://samples-1a1d1.firebaseio.com",
});

const app = express();

app.get("/trigger/:id", async (req, res) => {
    const { id } = req.params;

    console.log("clicked", id);

    if ("123456789".indexOf(id) === -1) {
        res.send(`Invalid. Num must be between 1 & 9 (incl.), found <${id}>`);
        return;
    }

    const docRef = admin.firestore().collection("squares").doc(id);
    const doc = await docRef.get();
    let letter, newLetter;

    if (!doc.exists) letter = "empty";
    else letter = doc.data().value;

    switch (letter) {
        case "X":
            newLetter = "empty";
            break;
        case "O":
            newLetter = "X";
            break;
        case "empty":
            newLetter = "O";
            break;
        default:
            newLetter = "empty";
    }

    await docRef.set({ value: newLetter });

    res.status(204).end();
});

app.get("/img/:id", async (req, res, next) => {
    const { id } = req.params;

    if ("123456789".indexOf(id) === -1) {
        res.send(`Invalid. Num must be between 1 & 9 (incl.), found <${id}>`);
        return;
    }

    const docRef = admin.firestore().collection("squares").doc(id);
    const doc = await docRef.get();
    let letter;

    if (!doc.exists) {
        letter = "empty";
        await docRef.set({ value: letter });
    } else {
        letter = doc.data().value || "empty";
    }

    // https://github.com/natemoo-re/natemoo-re/blob/4bc7d1330d94e73ae70468c40b6f487e987a7df2/api/blocks/%5Bnum%5D.ts
    const etag = `/imgs/${letter.toLowerCase()}_rect.svg`;

    var options = {
        root: path.join(__dirname, "public"),
        headers: {
            "Content-Type": "image/svg+xml",
            "Cache-Control": "no-cache, max-age=0",
            Etag: etag,
        },
    };
    res.sendFile(`/imgs/${letter.toLowerCase()}_rect.svg`, options, function (
        err
    ) {
        if (err) {
            next(err);
        } else {
            console.log("Sent file");
        }
    });

    return;
});

app.get("/", (req, res) => {
    res.send("home");
});

exports.app = functions.https.onRequest(app);
