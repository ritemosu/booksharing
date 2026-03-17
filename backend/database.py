import sqlite3


def get_db() -> sqlite3.Connection:
    """DB接続を返す関数"""
    conn = sqlite3.connect('booksharing.db')
    conn.row_factory = sqlite3.Row
    conn.execute('PRAGMA foreign_keys = ON')
    return conn


def init_db() -> None:
    conn = get_db()
    try :

        cur = conn.cursor()

        # -------------------------------------------------------
        # users テーブル
        # -------------------------------------------------------
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id              TEXT   PRIMARY KEY,
                username        TEXT      UNIQUE NOT NULL,
                email           TEXT      UNIQUE NOT NULL,
                hashed_password TEXT      NOT NULL,
                bio             TEXT,
                created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)


       # -------------------------------------------------------
        # books テーブル
        # -------------------------------------------------------
        cur.execute("""
            CREATE TABLE IF NOT EXISTS books (
                id         INTEGER   PRIMARY KEY AUTOINCREMENT,
                title      TEXT      NOT NULL,
                author     TEXT,
                isbn       TEXT,
                cover_url  TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
 
        # -------------------------------------------------------
        # posts テーブル
        # -------------------------------------------------------
        cur.execute("""
            CREATE TABLE IF NOT EXISTS posts (
                id          INTEGER   PRIMARY KEY AUTOINCREMENT,
                user_id     TEXT      REFERENCES users(id) ON DELETE CASCADE,
                book_name   TEXT      NOT NULL,
                post_title  TEXT      NOT NULL,
                rating      INTEGER   CHECK(rating BETWEEN 1 AND 5),
                purchase_url TEXT,
                review_text TEXT,
                image_path  TEXT,
                created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
 
        conn.commit()
        print("[DB] テーブルの初期化が完了しました。")
    
    except sqlite3.Error as e:
        conn.rollback()
        print(f"[DB]初期化中にエラーが発生しました: {e}")
        raise

    finally:
        conn.close()