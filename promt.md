Ты работаешь над интерактивным промосайтом табачного бренда Trofimoff’s.



Это не интернет-магазин и не типичный корпоративный сайт. Проект должен быть премиальным digital brand experience / interactive product catalogue, демонстрирующим высокий уровень frontend-разработки, motion design, AI-generated visual production и storytelling.



Проект также является коммерческим showcase: он должен выглядеть как работа digital-студии высокого уровня, которую можно продать производителю как самостоятельную бренд-платформу.



ВАЖНО:

Не начинай сразу писать большое количество кода.

Сначала:

1\. изучи существующий проект;

2\. изучи доступные данные по ароматам;

3\. предложи архитектуру;

4\. разбей реализацию на этапы;

5\. только после этого начинай реализацию.



==================================================

1\. ОСНОВНАЯ КОНЦЕПЦИЯ

==================================================



Сайт состоит из:



1\. Loading screen

2\. Главной страницы / каталога бренда

3\. Страниц ароматов

4\. Системы управления контентом

5\. Набора переиспользуемых visual experience templates



Сайт должен ощущаться как:



\- premium editorial;

\- fashion / spirits / fragrance digital experience;

\- интерактивный каталог бренда;

\- арт-дирекшн важнее количества UI-компонентов;

\- большие изображения;

\- крупная типографика;

\- минимальное количество декоративного UI;

\- плавная сложная анимация;

\- высокая визуальная плотность без ощущения перегруженности.



НЕ использовать визуальный язык SaaS:



\- никаких generic cards;

\- dashboard aesthetics;

\- glassmorphism;

\- бессмысленных gradients;

\- rounded-card-everywhere;

\- стандартных hero + features + CTA секций;

\- типичных шаблонов landing page.



Основная палитра:



\- тёплый beige;

\- глубокий burgundy;

\- off-white;

\- black;

\- дополнительные accent colors могут зависеть от конкретного вкуса.



==================================================

2\. LOADING SCREEN

==================================================



При первоначальной загрузке:



\- fullscreen beige background;

\- логотип Trofimoff’s;

\- минимальная анимация;

\- используется также для preload критических ассетов.



Loading screen должен ощущаться частью бренда, а не стандартным spinner.



После загрузки — плавный переход на главную.



==================================================

3\. ГЛАВНАЯ СТРАНИЦА

==================================================



Первый экран визуально разделён на три области.



Верхняя часть занимает большую часть viewport и состоит из двух колонок примерно 50/50.



LEFT:



\- большое визуальное изображение / motion background;

\- изображение зависит от выбранной линейки;

\- при hover/focus на линейке справа изображение меняется;

\- переход не должен быть простым image swap;

\- использовать controlled transitions:

&#x20; - scale;

&#x20; - blur;

&#x20; - opacity;

&#x20; - subtle camera movement;

&#x20; - image displacement/parallax при необходимости.



RIGHT:



\- глубокий burgundy background;

\- логотип/брендовая навигация;

\- крупный editorial список линеек;

\- пункт "О бренде".



Пример структуры:



01 BURLEY

02 TERROR

03 NO AROMA

04 LIMITED

05 ABOUT



Названия должны быть очень крупными.



При hover:



\- название немного смещается;

\- меняется изображение слева;

\- можно показывать количество вкусов;

\- появляется дополнительная микроинформация;

\- переходы должны быть спокойными и дорогими, не flashy.



В верхней области также находится поиск по вкусам.



==================================================

4\. ПОИСК

==================================================



Не использовать обычное маленькое поле input.



При активации поиска открывается fullscreen search overlay.



Пример:



WHAT ARE YOU LOOKING FOR?



> strawberry



Ниже live results:



WILD STRAWBERRY

Burley / Terror



и т.д.



Поиск должен работать:



\- по названию;

\- по вкусовым нотам;

\- по категории;

\- возможно по описанию.



==================================================

5\. НИЖНЯЯ ЧАСТЬ ГЛАВНОЙ

==================================================



Background — warm beige.



Контент зависит от выбранного раздела.



Если выбрана линейка:



\- название коллекции;

\- короткое описание;

\- список ароматов.



НЕ делать обычную ecommerce grid с карточками.



Предпочтительный вариант — editorial index:



01  PERA

02  CANTALUPO

03  WILD STRAWBERRY

...



При hover:



\- показать небольшой product visual;

\- вкусовые ноты;

\- subtle background transformation;

\- движение typography.



При клике открывается Flavor Experience.



Если выбран ABOUT:



показывается история бренда, философия, производство и т.п.



После блока — footer.



==================================================

6\. ПЕРЕХОД НА СТРАНИЦУ АРОМАТА

==================================================



Переход желательно сделать визуально непрерывным.



Например:



пользователь нажимает PASSION FRUIT



→ изображение/банка увеличивается

→ занимает viewport

→ становится hero страницы вкуса



Не должно возникать ощущения "открылась другая HTML-страница".



Использовать View Transitions API или собственную controlled transition систему, если это оправдано.



Обязательно предусмотреть graceful fallback.



==================================================

7\. FLAVOR EXPERIENCE

==================================================



URL:



/flavors/\[slug]



Это главная showcase-часть проекта.



Страница зависит от visual archetype аромата.



Общая структура:



HERO

↓

CINEMATIC EXPERIENCE

↓

DESCRIPTION

↓

FLAVOR NOTES

↓

CHARACTERISTICS

↓

LINE / STRENGTH VARIANTS

↓

NEXT FLAVOR



Hero:



\- fullscreen;

\- название;

\- линейка;

\- product visual;

\- минимальное количество текста.



==================================================

8\. SCROLL CINEMATIC

==================================================



Основная механика:



scroll пользователя управляет развитием сцены.



Например Fruit Experience:



closed can

↓

lid begins opening

↓

fruit appears

↓

fruit rises

↓

fruit opens/splits

↓

particles / juice / leaves

↓

final composition



Не пытаться обязательно делать всё realtime 3D.



Использовать hybrid rendering:



\- HTML/CSS;

\- GSAP;

\- image sequences;

\- generated video;

\- WebGL/R3F только там, где он действительно полезен;

\- lightweight particles;

\- pre-rendered visual assets.



Для AI-video планируется использовать Higgsfield.



Видео может преобразовываться в image/frame sequence и привязываться к scroll progress.



Пример:



scroll 0%   -> frame 000

scroll 25%  -> frame 040

scroll 50%  -> frame 080

scroll 75%  -> frame 120

scroll 100% -> frame 160



Количество кадров и resolution должны определяться исходя из performance.



Не загружать сотни full-resolution кадров сразу.



Реализовать progressive/preloading strategy.



==================================================

9\. VISUAL ARCHETYPES

==================================================



Не создавать уникальный frontend engine под каждый аромат.



Flavor Experience должен быть data-driven.



Предусмотреть переиспользуемые archetypes, например:



Fruit

Berry

Fruit Tropical

Fruit Spice

Citrus Alcohol

Drink

Dessert

Tobacco Raw

Tobacco Origin

Tobacco Alcohol

Tobacco Blend Alcohol

Tobacco Complex

Botanical Alcohol

Custom



Позже категории могут объединяться.



Каждый archetype определяет:



\- scroll choreography;

\- композицию;

\- background behavior;

\- typography behavior;

\- particles;

\- media layers;

\- optional frame sequence.



Но конкретный контент приходит из CMS.



==================================================

10\. РАЗНЫЙ ВИЗУАЛЬНЫЙ ЯЗЫК ЛИНЕЕК

==================================================



BURLEY



Более яркий, ароматический, визуально насыщенный мир:



\- fruits;

\- berries;

\- drinks;

\- desserts;

\- freshness;

\- natural ingredients.



TERROR



Может использовать те же ароматы, что Burley, но иметь:



\- более тёмный;

\- плотный;

\- агрессивный visual treatment;

\- другое изображение банки;

\- другую крепость.



NO AROMA



Совершенно другой storytelling:



\- tobacco fields;

\- geography;

\- tobacco leaves;

\- fermentation;

\- alcohol aging;

\- barrels;

\- botanical ingredients;

\- origin;

\- terroir-like presentation.



LIMITED



Экспериментальная коллекция.



Здесь допустим более свободный art direction и storytelling.



Например:



Taste

Truth

Goodness

Beauty



могут иметь общий визуальный язык специальной коллекции.



==================================================

11\. FLAVOR != SKU

==================================================



Это критически важно для модели данных.



У бренда около 79 SKU.



Некоторые ароматы существуют одновременно в Burley и Terror, но имеют разную крепость и упаковку.



НЕ создавать два независимых Flavor.



Использовать:



Flavor

&#x20;   |

&#x20;   +--- FlavorVariant

&#x20;   +--- FlavorVariant



Например:



Wild Strawberry



variants:

&#x20;   Burley

&#x20;   Terror



Общие:



\- название;

\- flavor notes;

\- базовый visual experience;

\- cinematic;

\- описание аромата.



Variant-specific:



\- line;

\- strength;

\- package image;

\- SKU;

\- B2B URL;

\- дополнительные характеристики.



==================================================

12\. CMS

==================================================



Контент должен полностью управляться без изменения frontend-кода.



Производитель выпускает несколько новых ароматов каждый месяц.



Добавление нового Flavor НЕ должно требовать deploy или создания React-страницы вручную.



CMS должна позволять:



Flavor:



\- name;

\- slug;

\- display name;

\- profile;

\- short description;

\- full description;

\- flavor notes;

\- visual archetype;

\- characteristics;

\- cinematic status;

\- hero media;

\- frame sequence / video;

\- scene brief;

\- SEO metadata;

\- publication status.



FlavorVariant:



\- flavor;

\- line;

\- strength;

\- package image;

\- SKU;

\- B2B URL;

\- publication status.



Line:



\- name;

\- slug;

\- description;

\- hero media;

\- visual settings;

\- sort order.



Brand:



\- history;

\- texts;

\- media;

\- footer;

\- social links etc.



При Publish:



\- Flavor появляется в каталоге;

\- попадает в нужную Line;

\- появляется в Search;

\- автоматически получает /flavors/\[slug].



Никаких ручных frontend changes.



==================================================

13\. STANDARD И CINEMATIC EXPERIENCE

==================================================



Не каждый Flavor обязан сразу иметь дорогое cinematic video.



Поддерживать:



experienceMode:

&#x20;   standard

&#x20;   cinematic



STANDARD:



\- hero;

\- layered images;

\- parallax;

\- lightweight particles;

\- GSAP;

\- typography animation.



CINEMATIC:



\- scroll-controlled image sequence / video;

\- более сложная choreography.



Таким образом новый вкус можно выпустить как Standard.



Позже маркетолог загружает cinematic assets:



standard -> cinematic



без изменения кода.



==================================================

14\. CHARACTERISTICS

==================================================



Страница вкуса показывает характеристики.



Например:



SWEETNESS

ACIDITY

FRESHNESS

SPICE

TOBACCO CHARACTER



Не использовать generic radar chart.



Предпочтительнее:



\- horizontal editorial indicators;

\- large typography;

\- animated scales;

\- визуальные изменения background/particles.



Также показывается STRENGTH конкретного FlavorVariant.



Важно:



strength относится к Variant, а не обязательно к Flavor.



==================================================

15\. FLAVOR NOTES

==================================================



Flavor notes должны быть самостоятельными сущностями/структурированными данными.



Например:



Wild Strawberry:



wild strawberry

sweetness

acidity



Beauty:



red grapes

raisins

dried apricot

mead

spices

chocolate

Burley



Это позволит:



\- использовать notes в поиске;

\- строить визуализацию;

\- автоматически генерировать related flavors;

\- строить фильтры;

\- использовать данные для будущих AI-функций.



==================================================

16\. HIGGSFIELD PIPELINE

==================================================



Для cinematic assets используется Higgsfield.



В CMS желательно хранить:



sceneBrief

generationPrompt

sourceVideo

frameSequence

poster

mobileFallback



Не связывать frontend напрямую с Higgsfield API на первом этапе.



Frontend должен работать с уже подготовленными media assets.



Pipeline:



CMS/content

↓

scene brief

↓

Higgsfield

↓

video

↓

frame extraction / optimization

↓

storage/CDN

↓

Flavor Experience



Позже pipeline можно автоматизировать.



==================================================

17\. PERFORMANCE

==================================================



Performance является частью продукта.



Особенно внимательно:



\- mobile;

\- Safari/iOS;

\- слабые ноутбуки;

\- high DPI screens.



Нельзя превращать сайт в GPU benchmark.



Использовать:



\- responsive images;

\- AVIF/WebP;

\- lazy loading;

\- progressive frame sequence loading;

\- preload только ближайших кадров;

\- adaptive asset resolution;

\- reduced-motion support;

\- mobile fallbacks;

\- video fallback;

\- WebGL только при необходимости;

\- dynamic imports;

\- code splitting.



prefers-reduced-motion должен поддерживаться обязательно.



На мобильных cinematic experience может быть упрощён.



==================================================

18\. ACCESSIBILITY

==================================================



Несмотря на experimental design:



\- semantic HTML;

\- keyboard navigation;

\- visible focus states;

\- correct aria attributes;

\- reasonable contrast;

\- animations must not block navigation;

\- search accessible from keyboard;

\- reduced motion support.



==================================================

19\. B2B INTEGRATION

==================================================



Сайт сам ничего не продаёт.



Нет:



\- cart;

\- checkout;

\- payment;

\- consumer ecommerce.



При необходимости FlavorVariant содержит:



b2bUrl



CTA:



"Перейти в B2B-каталог"



или аналогичный текст.



Ссылка ведёт на соответствующий SKU существующего B2B-магазина.



B2B-магазин является отдельной системой.



Промосайт должен работать и без этой интеграции.



Предусмотреть конфигурацию:



commerce.enabled

commerce.mode = externalB2B



Чтобы при передаче проекта производителю B2B CTA можно было полностью отключить без изменения архитектуры.



==================================================

20\. ВОЗМОЖНАЯ ПЕРЕДАЧА ПРОИЗВОДИТЕЛЮ

==================================================



Архитектура должна учитывать, что проект может быть полностью передан производителю.



Поэтому:



\- никаких hardcoded зависимостей от нашего B2B-магазина;

\- configurable external links;

\- чистая документация;

\- env configuration;

\- migration/export strategy;

\- CMS должна быть самостоятельной;

\- assets должны иметь понятную структуру;

\- проект должен быть deployable независимо.



==================================================

21\. ТЕХНОЛОГИИ

==================================================



Предпочтительный frontend:



Next.js

TypeScript

React

GSAP / ScrollTrigger



Дополнительно по необходимости:



React Three Fiber

Three.js

Drei

Lenis



Не подключай Three.js/R3F просто ради наличия 3D.



Если эффект эффективнее сделать через:



CSS

GSAP

Canvas

image sequence

video



используй более простое решение.



Для UI/art direction ориентироваться на принципы Impeccable.



Если доступен Impeccable skill/MCP — использовать его для визуального review и polish.



Если доступен Higgsfield MCP — использовать его для подготовки visual assets, а не как runtime dependency сайта.



==================================================

22\. ИСХОДНЫЙ ДАТАСЕТ

==================================================



В проекте имеется эталонный датасет первых 15 ароматов.



Файл:



trofimoffs\_cms\_15\_flavors.xlsx



Используй его как начальную модель контента.



В нём есть:



\- source descriptions;

\- short descriptions;

\- flavor notes;

\- visual archetypes;

\- preliminary characteristic values;

\- cinematic scene concepts;

\- Higgsfield briefs;

\- CMS schema proposal.



ВАЖНО:



поля со сладостью, кислотностью, свежестью, пряностью,

visual archetype и cinematic concepts являются нашей

интерпретацией исходных описаний.



Это НЕ официальные характеристики производителя.



Архитектура должна позволять редактору изменить их через CMS.



Не придумывай отсутствующую крепость.

==================================================

22A. IMAGE ASSETS

==================================================



В проекте есть папка:



/image



В ней находятся:



\- логотип бренда;

\- изображения вкусов;

\- product visuals / packshots для ароматов.



Перед разработкой:



1\. просканируй содержимое /image;

2\. сопоставь изображения с Flavor из датасета;

3\. не дублируй assets без необходимости;

4\. сформируй понятную карту:

&#x20;  flavor -> source image -> usage;

5\. если naming файлов неоднородный — предложи схему нормализации имён;

6\. не переименовывай файлы массово без необходимости на первом этапе.



Использовать изображения в нескольких ролях:



\- preview на главной;

\- flavor index hover;

\- search results;

\- hero flavor page;

\- standard experience;

\- fallback для cinematic;

\- poster для mobile/reduced-motion.



Не считать изображения готовыми cinematic assets.

Они являются исходными product visuals.



Для cinematic page:

\- использовать image как визуальную основу;

\- при необходимости создавать на его базе AI-generated assets через Higgsfield;

\- сохранять визуальную идентичность упаковки;

\- особенно внимательно следить за логотипом, текстом на банке и геометрией упаковки.



==================================================

22B. ASSET MATCHING

==================================================



Создай единый asset manifest.



Например:



type FlavorAssets = {

&#x20; flavorId: string

&#x20; packshot: string

&#x20; catalogPreview?: string

&#x20; hero?: string

&#x20; poster?: string

&#x20; cinematic?: {

&#x20;   video?: string

&#x20;   frames?: string\[]

&#x20; }

}



Не прописывай пути к изображениям вручную по всему проекту.



Все media mappings должны находиться:

\- либо в CMS;

\- либо в одном data/media layer.



Если для Flavor нет изображения:

\- не ломай страницу;

\- используй graceful placeholder;

\- выведи предупреждение в development mode.



==================================================

22C. LOGO

==================================================



Логотип из /image использовать как source of truth.



Подготовить:



\- header version;

\- loader version;

\- footer version;

\- responsive sizing.



Не перерисовывать логотип средствами CSS.

Не менять пропорции.

Не применять случайные эффекты.



==================================================

23\. ПЕРВЫЙ IMPLEMENTATION MILESTONE

==================================================



Не пытайся сразу реализовать все 79 SKU.



Первая версия должна доказать архитектуру.



Реализовать:



1\. Loading screen.

2\. Главную страницу.

3\. Переключение Line.

4\. Flavor index.

5\. Fullscreen search.

6\. CMS/data layer.

7\. Flavor page template.

8\. Standard Flavor Experience.

9\. Один полноценный Cinematic Flavor Experience.

10\. FlavorVariant switching.

11\. Mobile adaptation.

12\. reduced-motion fallback.



Для первого cinematic использовать фруктовый Flavor.



Предпочтительно Pera / Cantalupo / Wild Strawberry

или другой Flavor с подготовленными assets.



==================================================

24\. АРХИТЕКТУРНЫЕ ПРАВИЛА

==================================================



Избегать:



\- huge monolithic components;

\- duplicated flavor pages;

\- hardcoded flavor data inside React components;

\- animation logic mixed directly with content;

\- business data embedded into visual components;

\- direct assumptions about number of lines/flavors;

\- hardcoded B2B dependencies.



Разделить:



content

domain

visual experiences

animation

media

UI

CMS

integration



Пример:



domain/

&#x20;   flavor.ts

&#x20;   line.ts

&#x20;   variant.ts



experiences/

&#x20;   StandardExperience

&#x20;   FruitExperience

&#x20;   BerryExperience

&#x20;   TobaccoExperience

&#x20;   BotanicalExperience

&#x20;   CinematicSequence



components/

&#x20;   catalog/

&#x20;   search/

&#x20;   typography/

&#x20;   transitions/



lib/

&#x20;   animation/

&#x20;   media/

&#x20;   performance/



==================================================

25\. VISUAL QUALITY BAR

==================================================



Каждую страницу оценивай вопросом:



"Это выглядит как дорогой digital brand experience

или как очередной React landing page?"



Если второе — перерабатывай.



Особое внимание:



\- typography;

\- spacing;

\- visual hierarchy;

\- whitespace;

\- transitions;

\- image crop;

\- responsive composition;

\- microinteractions.



Не добавляй элементы только потому, что "так принято на сайтах".



==================================================

26\. РАБОЧИЙ ПРОЦЕСС

==================================================



Работай итеративно.



PHASE 1 — DISCOVERY



Изучи:

\- repository;

\- available assets;

\- dataset;

\- existing branding.



Составь:

\- architecture proposal;

\- content model;

\- route structure;

\- component structure;

\- animation architecture;

\- media strategy;

\- CMS recommendation.



PHASE 2 — FOUNDATION



Создай:

\- design tokens;

\- typography;

\- layouts;

\- data layer;

\- CMS integration;

\- basic routing.



PHASE 3 — HOME



Реализуй:

\- loader;

\- split hero;

\- line navigation;

\- visual transitions;

\- flavor index;

\- search;

\- footer.



PHASE 4 — FLAVOR



Реализуй:

\- generic FlavorPage;

\- FlavorVariant;

\- StandardExperience;

\- characteristics;

\- notes.



PHASE 5 — CINEMATIC



Реализуй:

\- scroll sequence engine;

\- preloading;

\- progress mapping;

\- responsive fallback;

\- first cinematic flavor.



PHASE 6 — POLISH



Проверь:

\- desktop;

\- tablet;

\- mobile;

\- Chromium;

\- WebKit;

\- Firefox;

\- keyboard;

\- reduced motion;

\- loading performance.



Используй visual review / screenshots при наличии соответствующих инструментов.



==================================================

27\. ПЕРЕД НАЧАЛОМ РАЗРАБОТКИ

==================================================



Сначала выдай мне:



1\. Предлагаемую архитектуру приложения.

2\. Предлагаемый стек.

3\. CMS recommendation с аргументацией.

4\. Data model Flavor / FlavorVariant / Line / Experience.

5\. Route structure.

6\. Component tree.

7\. Animation architecture.

8\. Media/storage strategy.

9\. Performance strategy.

10\. План разработки по этапам.

11\. Какие решения ты считаешь потенциально рискованными.

12\. Какие части стоит реализовать MVP, а какие отложить.



После этого остановись и дождись подтверждения перед крупной реализацией.



Не упрощай проект до обычного каталога.

Не переусложняй его ради технологий.



Цель — получить визуально выдающийся, но технически поддерживаемый

и масштабируемый digital product.



