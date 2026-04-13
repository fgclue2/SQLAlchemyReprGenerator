# SQLAlchemy \_\_repr\_\_() generator

This simple extension creates the `__repr__()` string for SQLAlchemy. SQLAlchemy's ORM requires you to create `__repr__()` functions and this extension generates the string for you:

![Showcase](video.gif)

## How to do the thing

1. Press `Ctrl+Shift+P` to open the command pallete.
2. Type `SQLAlchemy: Create __repr__() string`
3. Type in your class name
4. Type in your parameters that aren't relationships separated by commas
5. The result will be inserted in your editor

There is also the full boilerplate command, `SQLAlchemy: Create full __repr()__ boilerplate`, which creates the `__repr__()` function too.
