/**
 * 厳密にはこれも初期化の一つ
 */
function i18n() {
  const def = 'ja';
  return {
    getWeek: function(lang) {
      const week = {
        ja: {
          sunday: '日',
          monday: '月',
          tuesday: '火',
          wednesday: '水',
          thursday: '木',
          friday: '金',
          saturday: '土',
        }
      }

      return week[(lang || def)];
    }
  }
}
