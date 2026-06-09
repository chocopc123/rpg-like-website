export const S = {
    home: {
        loc:  "📍 玄関ホール",
        msg:  "ここは冒険者 CHOCO のアトリエ。\nなにを調べますか？",
        cmds: [
            { t:"つよさ をみる",     to:"skills"  },
            { t:"さくひん をみる",   to:"works"   },
            { t:"れんらく する",     to:"contact" },
            { t:"ものがたり をきく", to:"about"   }
        ]
    },
    skills: {
        loc:  "📍 修練の間",
        msg:  "CHOCO の ちからを しらべた。\n\n🎨 フロントエンド ★★★★☆\n⚙ バックエンド   ★★★☆☆\n☁ インフラ       ★★☆☆☆\n💡 アイデア       ★★★★☆\n🤖 AI活用         ★★★★☆",
        cmds: [
            { t:"さらにくわしく", to:"skills2" },
            { t:"もどる",         to:"home"    }
        ]
    },
    skills2: {
        loc:  "📍 修練の間・深部",
        msg:  "そうび と アイテム……\n\n🖥 VS Code / Antigravity\n🌐 TypeScript / Next.js / Tailwind CSS\n☁ Vercel / GCP\n🤖 Gemini / Claude",
        cmds: [
            { t:"もどる",    to:"skills" },
            { t:"トップへ", to:"home"   }
        ]
    },
    works: {
        loc:  "📍 宝物庫",
        msg:  "これまでの冒険の記録……\n\n🍑 コギ尻ポートフォリオサイト\n🌱 たねログ - 家庭菜園記録アプリ\n🏘️ sakanakaVillage - トライアルランドHP\netc...",
        cmds: [
            { t:"GitHub をひらく", fn: function(){ window.open("https://github.com/chocopc123","_blank", "noopener,noreferrer"); } },
            { t:"もどる",          to:"home" }
        ]
    },
    contact: {
        loc:  "📍 伝書鳩の塔",
        msg:  "CHOCO に ことづてを たのんだ。\n\n📧 choco.rgi.duck@gmail.com\n🐦 @choco_rgi_duck",
        cmds: [
            { t:"メールをおくる", fn: function(){ location.href="mailto:choco.rgi.duck@gmail.com"; } },
            { t:"Xをひらく",     fn: function(){ window.open("https://x.com/choco_rgi_duck","_blank", "noopener,noreferrer"); } },
            { t:"もどる",         to:"home" }
        ]
    },
    about: {
        loc:  "📍 記録の書架",
        msg:  "冒険者は 長野の山里に生まれ、\n2021年に卒業し Web業界を旅して数年。\nバイク・スノーボード・カラオケ・ゲームを\nこよなく愛する エンジニア。\n日々 思いつくままに コードを紡ぐ。",
        cmds: [
            { t:"もどる", to:"home" }
        ]
    }
};
