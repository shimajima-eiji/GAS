function doGet(e) {
  const data = {
    author: "nomuraya",
    connpass: "nomura-san",
    github: "shimajima-eiji",
    qiita: "nomurasan",
    job: ["ソフトウェアエンジニア", "AIエンジニア", "ITシステム・オペレーションコンサルタント", "ソーシャルテックブロガー", "エンジニアリング講師", "xTuberメンター", "DevRelテックマーケター"],
    industry: ["Web", "通信", "医療", "流通", "ゲーム"],
    language: ["日本語", "英語"],
    tech: ["Google App Script", "VueJS", "JQuery", "Python", "Golang", "Swift", "Ruby on Rails", "PHP", "Java"]
  }
  
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  output.setContent(data);
  return output;
}
