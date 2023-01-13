/*!
 * Lunr languages, `Japanese` language
 * https://github.com/MihaiValentin/lunr-languages
 *
 * Copyright 2014, Chad Liu
 * http://www.mozilla.org/MPL/
 */
/*!
 * based on
 * Snowball JavaScript Library v0.3
 * http://code.google.com/p/urim/
 * http://snowball.tartarus.org/
 *
 * Copyright 2010, Oleg Mazko
 * http://www.mozilla.org/MPL/
 */

/**
 * export the module via AMD, CommonJS or as a browser global
 * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
 */
;
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory)
  } else if (typeof exports === 'object') {
    /**
     * Node. Does not work with strict CommonJS, but
     * only CommonJS-like environments that support module.exports,
     * like Node.
     */
    module.exports = factory()
  } else {
    // Browser globals (root is window)
    factory()(root.lunr);
  }
}(this, function () {
  /**
   * Just return a value to define the module export.
   * This example returns an object, but the module
   * can return a function as the exported value.
   */
  return function (lunr) {
    /* throw error if lunr is not yet included */
    if ('undefined' === typeof lunr) {
      throw new Error('Lunr is not present. Please include / require Lunr before this script.');
    }

    /* throw error if lunr stemmer support is not yet included */
    if ('undefined' === typeof lunr.stemmerSupport) {
      throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');
    }

    /* register specific locale function */
    lunr.zh = function () {
      this.pipeline.reset();
      this.pipeline.add(
        lunr.zh.stopWordFilter,
        lunr.zh.stemmer
      );
      // change the tokenizer for japanese one
      lunr.tokenizer = lunr.zh.tokenizer;
    };
    // var segmenter = new TinySegmenter();  // インスタンス生成

    // lunr.zh.tokenizer = function (obj) {
    //     if (!arguments.length || obj == null || obj == undefined) return []
    //     if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

    //     var str = obj.toString().replace(/^\s+/, '')

    //     for (var i = str.length - 1; i >= 0; i--) {
    //         if (/\S/.test(str.charAt(i))) {
    //             str = str.substring(0, i + 1)
    //             break
    //         }
    //     }


    //     var segs = segmenter.segment(str);  // 単語の配列が返る
    //     return segs.filter(function (token) {
    //         return !!token
    //     })
    //         .map(function (token) {
    //             return token
    //         })
    // }

    lunr.zh.tokenizer = function (str) {
      if (!arguments.length || str === null || str === undefined) return [];
      if (Array.isArray(str)) {
        var arr = str.filter(function (token) {
          if (token === null || token === undefined) {
            return false;
          }

          return true;
        });

        arr = arr.map(function (t) {
          return lunr.utils.toString(t);
        });

        var out = [];
        arr.forEach(function (item) {
          var tokens = item.split(lunr.tokenizer.seperator);
          out = out.concat(tokens);
        }, this);

        return out;
      }

      return str.toString().trim().split(lunr.tokenizer.seperator);
    };

    /* lunr stemmer function */
    lunr.zh.stemmer = (function () {

      /* TODO japanese stemmer  */
      return function (word) {
        return word;
      }
    })();

    lunr.Pipeline.registerFunction(lunr.zh.stemmer, 'stemmer-zh');

    /* lunr trimmer function */
    lunr.zh.trimmer = function (_token) {
      return _token;
    }
    lunr.Pipeline.registerFunction(lunr.zh.trimmer, 'trimmer-zh');

    /* stop word filter function */
    lunr.zh.stopWordFilter = function (token) {
      if (lunr.zh.stopWordFilter.stopWords.indexOf(token) === -1) {
        return token;
      }
    };

    lunr.zh.stopWordFilter.stopWords = new lunr.SortedSet();
    lunr.zh.stopWordFilter.stopWords.length = 125;

    // The space at the beginning is crucial: It marks the empty string
    // as a stop word. lunr.js crashes during search when documents
    // processed by the pipeline still contain the empty string.
    // stopword for japanese is from http://www.ranks.nl/stopwords/japanese
    lunr.zh.stopWordFilter.stopWords.elements = '的 一 不 在 人 有 是 为 以 于 上 他 而 后 之 来 及 了 因 下 可 到 由 这 与 也 此 但 并 个 其 已 无 小 我 们 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 别 趁 当 从 到 得 打 凡 儿 尔 该 各 给 跟 和 何 还 即 几 既 看 据 距 靠 啦 了 另 么 每 们 嘛 拿 哪 那 您 凭 且 却 让 仍 啥 如 若 使 谁 虽 随 同 所 她 哇 嗡 往 哪 些 向 沿 哟 用 于 咱 则 怎 曾 至 致 着 诸 自'.split(' ');
    lunr.Pipeline.registerFunction(lunr.zh.stopWordFilter, 'stopWordFilter-zh');
  };
}))