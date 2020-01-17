/**
 * プロパティの命名ルール
 * （どこにある）_（何の？）_（名前）
 *
 * 
 */
function getProperties(target) {
  const properties = PropertiesService.getScriptProperties().getProperties();
  if(target === undefined) return properties;
  
  const result = {};
  for(key in properties) {
    if(key.indexOf(target) > -1) result[key] = properties[key];
  }
  return result;
}
