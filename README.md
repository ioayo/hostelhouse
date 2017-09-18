# ПОЕХАЛИ - стартовый шаблон для верстки.

## Юзается gulp, npm, bower, sass.

Reqiured:
1. npm 
https://www.npmjs.com/
2. gulp
https://www.npmjs.com/package/gulp
3. bower 
https://bower.io/
4. sass
http://sass-lang.com/install

Установка:
1. Клонировать репозиторий 
```git clone https://github.com/ioayo/mySite.git```
2. В терминале 
```npm i```
3. ```gulp```
4. DONE


Инклюдед - jquery и bootstrap (only grid), normalize-css и все нужные вам библиотеки инсталлируются через bower


```bower i normalize.css //   as example```

Галп-таски

+ ```gulp``` - для разработки - полностью лайврелоад
+ ```build``` - для продакшена - минифицируются и конкатенируются все файлы css и js
+ ```deploy``` - для деплоя(надо порыться в галпфайле - добавить туда свои данные). 
Деплой делается через фтп, предварительно папка продакшена упаковывается в zip файл и закачивается на сервер на указанный адрес, распакуйте через ssh

## Enjoy ur experience
