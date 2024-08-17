/*
# /gas/(バージョン)/(タイトル)

## 作業前の確認事項と主要リンク集
https://github.com/shimajima-eiji/GAS/discussions/33

## 運用上の制限事項
なし

## 関連リンク（あれば）
- []()

## 使用ライブラリ
| スクリプトID | 用途 | 備考 |
| --------- | --- | --- |

## デバッガ.gs
`function debug_(関数名) { }`

## APIパラメータ
### doGet(ない場合は削除)
#### 使い方
1. エンドポイントの後に?(キー1)=(値1)&(キー2)=(値2)でパラメータを渡す
2. curlコマンドを実行

```
# GASはリダイレクトするので-Lは必須
curl GET -L (エンドポイント)?(パラメータ)
```

#### リクエスト
| 物理キー名 | 論理キー名 | 必須キー | 想定される値の例 | 概要 |
| -------- | -------- | ------- | ------------ | --- |

#### レスポンス
レスポンスは([String] or [JSON String] or [JSONS String])形式

| 物理キー名 | 論理キー名 | null(True/False) | 想定される値の例 | 概要 |
| -------- | -------- | ---------------- | ------------ | --- |

### doPost(ない場合は削除)
#### 使い方
```
# GASはリダイレクトするので-Lは必須
curl -X GET -L (エンドポイント)?(パラメータ)
```

#### リクエスト
| 物理キー名 | 論理キー名 | 必須キー | 想定される値の例 | 概要 |
| -------- | -------- | ------- | ------------ | --- |

#### レスポンス
レスポンスは([String] or [JSON String] or [JSONS String])形式

| 物理キー名 | 論理キー名 | null(True/False) | 想定される値の例 | 概要 |
| -------- | -------- | ------- | ------------ | --- |

## システム管理情報
| システム名称 | 情報 |
| --------- | ---- |
| READMEフォーマットのバージョン(YYYY/MM/DD-コミットID) | 2024.08.08-d8a1741a8bfcefd267a1d2e57728a3bf9d414787 |

*/
