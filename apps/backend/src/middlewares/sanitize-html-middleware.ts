import sanitizeHtml from "sanitize-html";

function sanitizeValue(value) {
  if (typeof value === "string") {
    return sanitizeHtml(value, {
      allowedTags: [], // Remove all HTML tags
      allowedAttributes: {}, // Remove all attributes
    });
  } else if (Array.isArray(value)) {
    return value.map(sanitizeValue); // Sanitize each element in the array
  } else if (typeof value === "object" && value !== null) {
    sanitizeObject(value); // Recursively sanitize nested objects
  }
  return value; // Return the value unchanged if it's neither string, array, nor object
}

function sanitizeObject(obj) {
  for (let key in obj) {
    obj[key] = sanitizeValue(obj[key]); // Sanitize the value for each key
  }
}

export default async function (req, res, next) {
  if (req.body) {
    sanitizeValue(req.body);
  }
  next();
};


