# pxd-vue-starter

## Last Update 2020.02.13

## Project setup

> ```
> npm install
> ```

### Compiles and hot-reloads for development

> ```
> npm run serve
> ```

### Compiles and minifies for production

> ```
> npm run build
> ```

### NPM Modules

####dependencies

> ```
> vue
> vue-router
> vuex
> core-js
> axios
> ```

####devDependencies

> ```
> @vue/cli-plugin-babel
> @vue/cli-plugin-eslint
> @vue/cli-plugin-router
> @vue/cli-plugin-vuex
> @vue/cli-service
> @vue/eslint-config-airbnb
> babel-eslint
> eslint
> eslint-config-prettier
> eslint-plugin-html
> eslint-plugin-import
> eslint-plugin-prettier
> eslint-plugin-vue
> prettier
> vue-template-compiler
> ```

### Naming rule

> style
>
> -   컨포넌트 이름, 생성자 함수 : PascalCase
> -   컨포넌트의 변수, 함수 : camelCase
> -   html에서 컴포넌트 이름 : kebab-case
> -   mutation과 action 함수 : 대문자와 '\_'(언더바) 사용하며, 최소 두단어 조합
>
> ```js
> SET_DATA () {
>   ...
> }
> ```
>
> -   그외 : camelCase

> name
>
> -   가급적 약어를 사용하지 않고 전체 단어를 사용  
>     (ex. receiveMessage O, recvMsg X)
> -   공통적으로 사용되는 단어가 앞에 위치하여 그룹으로 보이도록 함  
>     (ex. volumeAudio, volumeVideo)

> 참고
>
> -   camelCase : 첫글자 소문자 (ex. namingRule)
> -   PascalCase : 첫글자 대문자 (ex. NamingRule)
> -   kebab-case : 전체 소문자, 단어는 '-'(하이픈)으로 구분 (ex. naming-rule)
