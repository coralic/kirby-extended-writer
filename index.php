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
      'coralic.extendedWriter.nodes.largerParagraph' => 'Larger Paragraph',
    ],
    'de' => [
      'coralic.extendedWriter.marks.highlight' => 'Hervorheben',
      'coralic.extendedWriter.nodes.largerParagraph' => 'Größerer Absatz'
    ]
  ],
  'fields' => [
    'list' => [
      'props' => [
        /**
         * Sets the allowed list types. Available formats: `bulletList`, `orderedList`.
         * Activate them all by passing `true`. Passing `false` will default to `bulletList`, otherwise default nodes are `bulletList` & `orderedList`.
         * @param array|bool|null $nodes
         */
        'nodes' => function ($nodes = true) {
          return $nodes;
        }
      ]
    ],
    'writer' => [
      'props' => [
        /**
         * Changes the text orientation of the Writer fields contents. Available formats: `left`, `center`, `right`.
         */
        'align' => function ($align = 'left') {
          return in_array($align, ['left', 'center', 'right']) ? $align : 'left';
        },
      ]
    ]
  ]
]);
