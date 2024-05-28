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
            "sign_up": "Sign Up",
            "faq_question_1": "What is this site?",
            "faq_answer_1": "This is a site for creator collaboration.",
            "faq_question_2": "How can I register a project?",
            "faq_answer_2": "You can register a project by clicking on the 'Register Project' button.",
            "faq_question_3": "How do I contact support?",
            "faq_answer_3": "You can contact support by emailing support@example.com."
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
            "sign_up": "注册",
            "faq_question_1": "这个网站是什么？",
            "faq_answer_1": "这是一个为创作者合作的网站。",
            "faq_question_2": "我如何注册项目？",
            "faq_answer_2": "您可以通过点击“注册项目”按钮来注册项目。",
            "faq_question_3": "如何联系支持？",
            "faq_answer_3": "您可以通过发送电子邮件至support@example.com来联系支持。"
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
            "sign_up": "登録",
            "faq_question_1": "このサイトは何ですか？",
            "faq_answer_1": "これは創作者のコラボレーションのためのサイトです。",
            "faq_question_2": "プロジェクトを登録するにはどうすればいいですか？",
            "faq_answer_2": "「プロジェクトを登録」ボタンをクリックしてプロジェクトを登録できます。",
            "faq_question_3": "サポートに連絡するにはどうすればいいですか？",
            "faq_answer_3": "support@example.comにメールを送ることでサポートに連絡できます。"
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
