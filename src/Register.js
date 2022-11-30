/* Register.js */

import React, { useState, useEffect } from "react";
/* ↓「onAuthStateChanged」をimport */
import { 
    createUserWithEmailAndPassword,
    onAuthStateChanged
} from "firebase/auth";
import { auth } from "./FirebaseConfig.js";
/* 「Link」をimport↓ */
import { Navigate, Link } from "react-router-dom";

const Register = () => {
    /* ↓state変数を定義 */
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    /* ↓関数「handleSubmit」を定義 */
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
            );
        } catch(error) {
            alert("正しく入力してください");
        }
    };

    /* ↓state変数「user」を定義 */
    const [user, setUser] = useState("");

    /* ↓ログインしているかどうかを判定する */
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    }, []);

    return (
        <>
            {/* ↓ログインしていればマイページを表示 */}
            {user ? (
                <Navigate to={`/`} />
            ) : (
            <>
                <h1>新規登録</h1>
                {/* ↓「onSubmit」を追加 */}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>メールアドレス</label>
                        {/* ↓「value」と「onChange」を追加 */}
                        <input
                            name="email"
                            type="email"
                            value={registerEmail}
                            onChange={(e) => setRegisterEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>パスワード</label>
                        <input
                            name="password"
                            type="password"
                            value={registerPassword}
                            onChange={(e) => setRegisterPassword(e.target.value)}
                        />
                    </div>
                    <button>登録する</button>
                    {/* ↓リンクを追加 */}
                    <p>ログインは<Link to={`/login/`}>こちら</Link></p> 
                </form>
              </>
            )}
        </>
    );
};

export default Register;