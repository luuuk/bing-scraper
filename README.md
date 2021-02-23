# bing-scraper
Scrape results from Microsoft Bing for free.

## sample code
```js
const bing = require("bing-scraper");
bing.search({
    q: "sugar pills idkhow",
    enforceLanguage: true  
}, function(err, resp) {
    if (err) {
        console.log(err);
    } else {
        console.log(resp);
    }
})

//[
//  {
//      title: 'I DONT KNOW HOW BUT THEY FOUND ME – Sugar Pills Lyrics | …',
//      url: 'https://genius.com/I-dont-know-how-but-they-found-me-sugar-pills-lyrics',
//      description: '2020-10-23 · Sugar Pills Lyrics: (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh) / I take one to make me feel better / I take two despite...'
//  }
//]
```

*Result shortened for readability reasons.*

## usage

### ``search(query, cb)``

``query`` is required can be either a string or variable. If it isn't an object, the code attempts to make it a string and searches.

``cb`` is also required and is used as a callback.

#### ``query`` object variables

```js
{
    "q": "hello world",
    "userAgent": "browser's user agent",
    "lang": "browser's Accept-Language header",
    "enforceLanguage": false,
    "referer": "browser's referer",
    "pageCount": 1
}
```

``q`` is the only required variable and is your search.

``userAgent`` is the User Agent used to request Bing with. If it is not set, it defaults to ``Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0``.

``lang`` is the ``Accept-Language`` header used. If it is not set, it defaults to ``en-US,en;q=0.5``.

``enforceLanguage`` is what determines the result's language, a ``lang`` is reccomended but not required. This correlates *with* the ``lang`` object. This variable must be either ``true`` or ``false`` and defaults to ``false``.

``referer`` is the ``Referer`` header used to request Bing with. If it isn't set it defaults to ``https://www.bing.com/``.

``pageCount`` is the number of pages the scraper pulls. This variable must be an Interger and defaults to ``1``.

#### result

```js
[
  {
    title: 'I DONT KNOW HOW BUT THEY FOUND ME – Sugar Pills Lyrics | …',
    url: 'https://genius.com/I-dont-know-how-but-they-found-me-sugar-pills-lyrics',
    description: "2020-10-23 · Sugar, sugar, sugar pills (Pills) Tell me that you're more than a sick fascination [Outro] Oh, you're with me all the time Give me something more for my wild imagination Always in 
the back of my ..."
  },
  {
    title: 'I DONT KNOW HOW BUT THEY FOUND ME - Sugar Pills - YouTube',
    url: 'https://www.youtube.com/watch?v=Wv6cN-y6ps4',
    description: "2020-10-23 · I DONT KNOW HOW BUT THEY FOUND ME – SugarpillsFrom the album 'Razzmatazz' | Available NowListen/Download: http://found.ee/razzmatazzSubscribe to iDKHOW on Yo..."
  },
  {
    title: 'I Dont Know How But They Found Me - Sugar Pills Lyrics | …',
    url: 'https://www.azlyrics.com/lyrics/idontknowhowbuttheyfoundme/sugarpills.html',
    description: "Sugar sugar sugar pills Tell me that you're more than a sick fascination You're with me all the time Give me something more for my wild imagination Always in the back of my mind Tell me that you're more than a sick fascination Fascination Fascination Fascination Fascination Submit Corrections. Thanks to Logan for correcting these lyrics. Writer(s): Dallon Weekes, Stu Maxfield. AZLyrics…"
  },
  {
    title: "SUGAR PILLS CHORDS by I Don't Know How But They Found Me …",
    url: 'https://tabs.ultimate-guitar.com/tab/i-dont-know-how-but-they-found-me/sugar-pills-chords-3388484',
    description: "2020-10-26 · Sugar Pills chords by I Don't Know How But They Found Me. 1,747 views, added to favorites 137 times. Tuning: E A D G B E. Author jessieloz [pro] 261. 1 contributor total, last edit on Oct 26, 2020. Download Pdf. Chords. Guitar Ukulele Piano. D#m. 2. 4. 3. 1. 1 of 14. C#. 2. 3. 4. 1 of 16. F#. 2fr. 2. 4. 3. 1 of 16. A#m. 2. 4. 3. 1 of 14. G#. 4fr. 2. 4. 3. 1 of 16 . B. 2fr. 4. 3. 2. …"    
  },
  {
    title: 'I DONT KNOW HOW BUT THEY FOUND ME - RAZZMATAZZ Lyrics …',
    url: 'https://genius.com/albums/I-dont-know-how-but-they-found-me/Razzmatazz',
    description: '2020-10-23 · Sugar Pills Lyrics. 11.9K 9. Kiss Goodnight ... Razzmatazz is IDKHOW’s debut album and second project with Fearless Records set to release October 16, 2020. The band has stated that it will ...'
  }
]
```

## license

See [License](LICENSE).