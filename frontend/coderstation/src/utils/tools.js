export function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
      return obj; // Return the value if obj is not an object
    }
  
    // Create an array or object to hold the values
    const copy = Array.isArray(obj) ? [] : {};
  
    for (let key in obj) {
      // Ensure key is a property of obj, not inherited
      if (obj.hasOwnProperty(key)) {
        copy[key] = deepCopy(obj[key]); // Recursively copy for nested objects
      }
    }
    
    return copy;
  }
  
  export function isEmptyHtml(htmlString) {
    // 移除 <br>、<hr> 等空标签及空白字符
    // 使用正则表达式移除所有 <br> 和空白字符
    const cleanedString = htmlString.replace(/<(a|p|br)[^>]*>|<(\/p|\/a)>/g, '');

    // 判断是否为空
    return cleanedString === '';
}


