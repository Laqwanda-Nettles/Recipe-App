# sass-7-1-template

## Setting up the Folder Structure for the 7-1 Pattern

### Folders

- base
- components
- layout
- pages
- themes
- abstracts
- vendors

## Base Folder

- \_base.scss:
  - Basic setup, like box-sizing, font-sizes, etc.
- typography.scss:
  - Typography rules such as font-family, font-size, line-height.

## Components Folder

- \_buttons.scss:
  - Styles for various buttons.
- \_cards.scss:
  - Basic card component styles.

## Layout Folder

- \_header.scss:
  - Styles for the header section.
- \_footer.scss:
  - Styles for the footer.

## Pages Folder

- \_home.scss:
  - Specific styles for the home page.
- \_about.scss:
  - Specific styles for the about page.

## Themes Folder

- \_theme.scss:
  - Define different themes, like dark mode or alternate color schemes.

## Abstracts Folder

- \_variables.scss:
  - Define your color palette, font stacks, etc.
- \_mixins.scss:
  - Commonly used mixins.

## Vendors Folder

- \_bootstrap.scss:
  - If using Bootstrap or any other third-party CSS frameworks.

## Main SCSS File

- main.scss:
  - Import all above files using @import statements.
