export default function validate(data, rules) {
  let errors = {};
  rules.forEach(item => {
    const value = data[item.key];
    errors[item.key] = {};
    if (item.required) {
      if (!value) {
        errors[item.key].required = '必填';
      }
    }
    if (item.pattern) {
      if (item.pattern === 'email') {
        if (!/^.+@.+$/.test(value)) {
          errors[item.key].pattern = '邮箱格式错误';
        }
      }
    }
    if (item.minLength) {
      if (value.length < item.minLength) {
        errors[item.key].minLength = '字符不低于' + item.minLength;
      }
    }
    if (item.maxLength) {
      if (value.length > item.maxLength) {
        errors[item.key].maxLength = '字符不高于' + item.maxLength;
      }
    }
  });

  return errors;
}
