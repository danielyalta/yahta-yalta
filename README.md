## Добавление и изменение картинок яхт в public/images/boats/....

По логике приложения, заглавной картинкой считается первая (по сортировкам) картинка в папке с яхтой.

- Если менялась заглавная картинка, то нужно перегенирировать её сжатую + уменьшенную версию для OG Image:

```bash
npm run generate-og-images

```

- При изменении всех остальных картинок (могли поменяться их названия) нужно перегенерить манифест с путями к ним:

```bash
npm run generate-boats-images-manifest

```

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Nextjs 15

```bash
npm run dev

```
