// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "title": "Submission site for creator collaboration",
            "likes": "Likes",
            "current_developers": "Current Developers",
            "of": "of",
            "find_project": "Find Project",
            "faq": "FAQ",
            "language": "Language",
            "register_project": "Register Project",
            "login": "Login",
            "sign_up": "Sign Up"
        }
    },
    zh: {
        translation: {
            "title": "創作者合作的投稿網站",
            "likes": "喜欢",
            "current_developers": "当前开发者",
            "of": "的",
            "find_project": "查找项目",
            "faq": "常见问题",
            "language": "语言",
            "register_project": "注册项目",
            "login": "登录",
            "sign_up": "注册"
        }
    },
    ja: {
        translation: {
            "title": "創作者合作のための投稿サイト",
            "likes": "いいね",
            "current_developers": "現在の開発者数",
            "of": "の",
            "find_project": "プロジェクトを見つける",
            "faq": "よくある質問",
            "language": "言語",
            "register_project": "プロジェクトを登録",
            "login": "ログイン",
            "sign_up": "登録"
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ja", // 初期設定の言語
        interpolation: {
            escapeValue: false // ReactはXSS対策を既に行っているため
        }
    });

export default i18n;
