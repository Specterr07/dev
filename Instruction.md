## 1. Always check the Configs
- check the homepage:"" url for deploying it to the right url
- check base:"" in vite.config.js it is also very important to configure it correctly.

## 2. How to deploy?
- write you code or edits you want to make.
- then run `npm run deploy`.
- this will trigger gh-pages, which will run `npm run buil` and then push the code to gh-pages branch automatically.

## 3. If you want to change domain name.
- change the content of CNAME file inside /public folder.
- check vite.config.js for any changes
- check package.json for any changes to be make.
