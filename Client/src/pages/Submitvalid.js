function Validation(values) {
  let error = {};

  const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

  if (values.name === "") {
    error.name = "Name should not be emty";
  } else {
    error.email = "";
  }

  if (values.email === "") {
    error.email = "Email should not be emty";
  } else if (!email_pattern.test(values.email)) {
    error.email = "Email didn,t match";
  } else {
    error.email = "";
  }

  if (values.number === "") {
    error.number = "Number should not be emty";
  } else {
    error.number = "";
  }
  if (values.password === "") {
    error.password = "password should not be emty";
  } else if (!password_pattern.test(values.password)) {
    error.password = "password didn,t match";
  } else {
    error.password = "";
  }

  return error;
}

export default Validation;
