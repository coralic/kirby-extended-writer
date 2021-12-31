<?php

use Kirby\Cms\App;
use Kirby\Sane\Html;

// Custom allowed tags so they don't get stripped out by the sanitizer
Html::$allowedTags['mark'] = true;

// Register plugin and its translations
App::plugin('coralic/kirby-extended-writer', [
  'translations' => [
    'en' => [
      'coralic.extendedWriter.marks.highlight' => 'Highlight',
      'coralic.extendedWriter.nodes.heading' => 'Heading',
      'coralic.extendedWriter.nodes.greatPrimer' => 'Great Primer',
    ],
    'de' => [
      'coralic.extendedWriter.marks.highlight' => 'Hervorheben',
      'coralic.extendedWriter.nodes.heading' => 'Überschrift',
      'coralic.extendedWriter.nodes.greatPrimer' => 'Größerer Text'
    ]
  ]
]);
