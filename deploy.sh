#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e
# 跳到docs文件夹
cd packages/docs&demo
# 执行初始化
npm i
# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist


git init
git add -A
git commit -m 'deploy'

git push -f https://${access_token}@github.com/warpcgd/killblanks.git master:gh-pages

cd -