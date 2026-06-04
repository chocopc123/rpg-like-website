import { S } from './data.js';

let cur_scene = "home";
let sel_idx   = 0;
let typing    = false;
let type_tid  = null;
let busy      = false;

const msgEl  = document.getElementById("msg");
const tcur   = document.getElementById("tcur");
const arrow  = document.getElementById("arrow");
const cmdWin = document.getElementById("cmdWin");
const locEl  = document.getElementById("loc");
const ov     = document.getElementById("ov");
const msgWin = document.getElementById("msgWin");
const curEl  = document.getElementById("cursor");

document.addEventListener("mousemove", (e) => {
    curEl.style.left = `${e.clientX}px`;
    curEl.style.top  = `${e.clientY}px`;
});

function renderCmds() {
    const cmds = S[cur_scene].cmds;
    cmdWin.innerHTML = "";
    cmds.forEach((cmd, idx) => {
        const div = document.createElement("div");
        div.className = `cmd${idx === sel_idx ? " on" : ""}`;
        div.textContent = cmd.t;
        div.addEventListener("mouseenter", () => {
            sel_idx = idx;
            renderCmds();
        });
        div.addEventListener("click", () => {
            sel_idx = idx;
            renderCmds();
            execCmd();
        });
        cmdWin.appendChild(div);
    });
}

function execCmd() {
    if (busy) return;
    const cmd = S[cur_scene].cmds[sel_idx];
    if (!cmd) return;
    cmdWin.style.borderColor = "#fff";
    setTimeout(() => { cmdWin.style.borderColor = "#c8b870"; }, 120);
    if (cmd.fn) cmd.fn();
    else if (cmd.to) goScene(cmd.to);
}

function goScene(key) {
    if (busy) return;
    busy = true;
    ov.classList.add("on");
    setTimeout(() => {
        cur_scene = key;
        sel_idx   = 0;
        locEl.textContent = S[key].loc;
        renderCmds();
        ov.classList.remove("on");
        busy = false;
        setTimeout(() => {
            typeMsg(S[key].msg, null);
        }, 80);
    }, 300);
}

function typeMsg(text, done) {
    clearTimeout(type_tid);
    msgEl.textContent = "";
    tcur.style.display = "inline-block";
    arrow.classList.remove("show");
    typing = true;

    // Array.fromでサロゲートペアも正しく1文字ずつ分割
    const chars = Array.from(text);
    let i = 0;

    function tick() {
        if (i >= chars.length) {
            typing = false;
            tcur.style.display = "none";
            arrow.classList.add("show");
            if (done) done();
            return;
        }
        const ch = chars[i++];
        if (ch === "\n") {
            msgEl.appendChild(document.createElement("br"));
        } else {
            msgEl.appendChild(document.createTextNode(ch));
        }
        type_tid = setTimeout(tick, ch === "\n" ? 55 : 32);
    }
    tick();
}

function skipType() {
    if (!typing) return;
    clearTimeout(type_tid);
    typing = false;
    tcur.style.display = "none";
    arrow.classList.add("show");

    msgEl.textContent = "";
    const lines = S[cur_scene].msg.split("\n");
    lines.forEach((line, index) => {
        msgEl.appendChild(document.createTextNode(line));
        if (index < lines.length - 1) {
            msgEl.appendChild(document.createElement("br"));
        }
    });
}

document.addEventListener("keydown", (e) => {
    const len = S[cur_scene].cmds.length;
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (typing) skipType(); else execCmd();
    } else if (e.key === "Escape") {
        if (cur_scene !== "home") goScene("home");
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const step = len > 2 ? 2 : 1;
        sel_idx = (sel_idx - step + len) % len;
        renderCmds();
    } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const step = len > 2 ? 2 : 1;
        sel_idx = (sel_idx + step) % len;
        renderCmds();
    } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        sel_idx = (sel_idx - 1 + len) % len;
        renderCmds();
    } else if (e.key === "ArrowRight") {
        e.preventDefault();
        sel_idx = (sel_idx + 1) % len;
        renderCmds();
    }
});

function bindDpad(id, dir) {
    const el = document.getElementById(id);
    function act(e) {
        e.preventDefault();
        const len = S[cur_scene].cmds.length;
        const step = len > 2 ? 2 : 1;
        if      (dir === "up")    sel_idx = (sel_idx - step + len) % len;
        else if (dir === "down")  sel_idx = (sel_idx + step) % len;
        else if (dir === "left")  sel_idx = (sel_idx - 1 + len) % len;
        else if (dir === "right") sel_idx = (sel_idx + 1) % len;
        renderCmds();
    }
    el.addEventListener("touchstart", act, { passive: false });
    el.addEventListener("click", act);
}

bindDpad("dU", "up");
bindDpad("dD", "down");
bindDpad("dL", "left");
bindDpad("dR", "right");

const btnA = document.getElementById("btnA");
const handleBtnA = (e) => {
    if (e && e.type === "touchstart") e.preventDefault();
    if (typing) skipType(); else execCmd();
};
btnA.addEventListener("touchstart", handleBtnA, { passive: false });
btnA.addEventListener("click", handleBtnA);

const btnB = document.getElementById("btnB");
const handleBtnB = (e) => {
    if (e && e.type === "touchstart") e.preventDefault();
    if (cur_scene !== "home") goScene("home");
};
btnB.addEventListener("touchstart", handleBtnB, { passive: false });
btnB.addEventListener("click", handleBtnB);

const handleMsgWin = (e) => {
    if (typing) {
        if (e && e.type === "touchstart") e.preventDefault();
        skipType();
    }
};
msgWin.addEventListener("touchstart", handleMsgWin, { passive: false });
msgWin.addEventListener("click", handleMsgWin);

goScene("home");
