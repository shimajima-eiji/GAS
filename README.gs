/*
# 更新について
## プロジェクトを作ったらまずはファーストコミット
- このような注釈をREADME.gsに書くか、index.htmlに書くかは悩ましいところ
  - 名前的にはREADME
  - index.htmlにするとGitHub Pagesですぐに公開できるメリットが大きい

## バージョン管理
- バージョンを上げたらGitにpushする。
- コミットメッセージは必ずバージョンを添える
- Web側のバージョンを上げる前にpushする運用を徹底する。diffが見れる。
  - project versionはNewに当たる数値(version.length)を入れる。

# 運用ルール
- 他のプロジェクトから呼ばれるものを想定しているので、var funcname = function()... のような書き方をしない
  - 他プロジェクトで参照した時に補完できなくなるため
  - 本プロジェクトで固有のプロパティはなるべく使わない
- 関数名の最初が大文字のものはsnippetsライブラリ内で呼ばれない事を想定している。
  - デバッグ時は'debug'を引数に実施する

# ライブラリについて
- SlackApp: M3W5Ut3Q39AaIwLquryEPMwV62A3znfOO
- Moment: MHMchiX6c1bwSqGM1PZiW_PxhMjh3Sh48
*/
