exports.getContent = (link) => {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MY SHOP</title>
  </head>
  <body style="text-align:center;">
    <h1>Hello and Welcome</h1>
    <h2> 👇👇 To activate your account click here! 👇👇</h2>
    <a href="${link}">
    <h2>ACTIVATE</h2>
    </a>
  </body>
</html>`;
};
