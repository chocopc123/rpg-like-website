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
        msg:  "CHOCO の ちからを しらべた。\n\n⚔ TypeScript    ★★★★★\n🔮 React/Next.js ★★★★★\n🛡 Go / Python   ★★★★☆\n✨ AI 連携       ★★★★☆\n🗺 DB設計        ★★★★☆",
        cmds: [
            { t:"さらにくわしく", to:"skills2" },
            { t:"もどる",         to:"home"    }
        ]
    },
    skills2: {
        loc:  "📍 修練の間・深部",
        msg:  "使いこなす武器の数々……\n\n🖥 VS Code / Claude Code\n🌐 Next.js / Tailwind CSS\n⚙ Node.js / Prisma / tRPC\n☁ Vercel / Cloudflare Workers\n🤖 Gemini / Claude API",
        cmds: [
            { t:"もどる",    to:"skills" },
            { t:"トップへ", to:"home"   }
        ]
    },
    works: {
        loc:  "📍 宝物庫",
        msg:  "これまでの冒険の記録……\n\n🏰 フルスタック Web アプリ\n🌱 水耕栽培モニタリング\n🎮 LoL データダッシュボード\n📝 AI 活用コーディングツール",
        cmds: [
            { t:"GitHub をひらく", fn: function(){ window.open("https://github.com","_blank", "noopener,noreferrer"); } },
            { t:"もどる",          to:"home" }
        ]
    },
    contact: {
        loc:  "📍 伝書鳩の塔",
        msg:  "CHOCO に ことづてを たのんだ。\n\n📧 hello@example.com\n🐦 @duckchoco_dev\n💼 LinkedIn プロフィール",
        cmds: [
            { t:"メールをおくる", fn: function(){ location.href="mailto:hello@example.com"; } },
            { t:"もどる",         to:"home" }
        ]
    },
    about: {
        loc:  "📍 記録の書架",
        msg:  "冒険者は 長野の山里に生まれ、\nWeb の世界を旅して はや 数年。\nモーターサイクルと カラオケと\nLoL を こよなく愛する エンジニア。\n日々 AI と共に コードを紡ぐ。",
        cmds: [
            { t:"もどる", to:"home" }
        ]
    }
};
