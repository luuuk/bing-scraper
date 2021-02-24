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

``q`` or ``url`` is required in the object.

``q`` is the query of your search, ``url`` is a URL you recieve from either the ``lastHref`` or ``nextHref`` varibles in the response.

``userAgent`` is the User Agent used to request Bing with. If it is not set, it defaults to ``Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:85.0) Gecko/20100101 Firefox/85.0``.

``lang`` is the ``Accept-Language`` header used. If it is not set, it defaults to ``en-US,en;q=0.5``.

``enforceLanguage`` is what determines the result's language, a ``lang`` is reccomended but not required. This correlates *with* the ``lang`` object. This variable must be either ``true`` or ``false`` and defaults to ``false``.

``referer`` is the ``Referer`` header used to request Bing with. If it isn't set it defaults to ``https://www.bing.com/``.

``pageCount`` is the number of pages the scraper pulls. This variable must be an Interger and defaults to ``1``.

#### result

```js
{
  results: [
    {
      title: 'I DONT KNOW HOW BUT THEY FOUND ME – Sugar Pills Lyrics ...',
      url: 'https://genius.com/I-dont-know-how-but-they-found-me-sugar-pills-lyrics',
      description: '2020-10-23 · Sugar Pills Lyrics: (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh, ooh, ooh) / (Ooh, ooh, ooh, ooh) / I take one to make me feel better / 
I take two despite...'
    },
    {
      title: 'I DONT KNOW HOW BUT THEY FOUND ME - Sugar Pills - YouTube',
      url: 'https://www.youtube.com/watch?v=Wv6cN-y6ps4',
      description: "2020-10-23 · I DONT KNOW HOW BUT THEY FOUND ME – SugarpillsFrom the album 'Razzmatazz' | Available NowListen/Download: http://found.ee/razzmatazzSubscribe to iDKHOW on Yo..."
    },
    {
      title: 'I Dont Know How But They Found Me - Sugar Pills Lyrics ...',
      url: 'https://www.azlyrics.com/lyrics/idontknowhowbuttheyfoundme/sugarpills.html',
      description: "Sugar sugar sugar pills Give me something more for my wild imagination Sugar sugar sugar pills Tell me that you're more than a sick fascination Fascination Fascination A quick fix It's a cheap trick Get yourself a pseudo-scientific little fiction You can fix this Seven, eight, nine I'm losing count again Maybe they don't work at all Swallow ..."
    },
    {
      title: "SUGAR PILLS CHORDS by I Don't Know How But They Found Me ...",
      url: 'https://tabs.ultimate-guitar.com/tab/i-dont-know-how-but-they-found-me/sugar-pills-chords-3388484',
      description: "2020-10-26 · [Chorus] D#m C# F# A#m Sugar, sugar, sugar pills D#m C# Oh, give me something more F# A#m for my wild imagination D#m C# F# A#m Sugar, sugar, sugar pills D#m C# Tell me that you're more F# A#m than a sick fascination G# Fascination, fascination [Post-Chorus] D#m C# F# A#m (x2) [Verse 2] D#m C# A quick fix, it's a cheap trick G# Get …"
    }
  ],
  lastHref: "https://www.bing.com/search?q=sugar pills idkhow&search=&lf=1&form=QBLH",
  nextHref: "https://www.bing.com/search?q=sugar+pills+idkhow&search=&lf=1&first=6&FORM=PORE",
  topAnswer: null,
  qnaAnswer: null
}
```

## license

See [License](LICENSE).