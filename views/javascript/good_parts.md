Tytuł tego modułu i wszystkie przykłady pochodzą książki
[*JavaScript: The Good Parts*](http://oreilly.com/catalog/9780596517748/index.html)
napisanej przez guru tego języka, Douglasa Crockforda.

*Uwaga terminologiczna:*
Funkcję będącą własnością obiektu nazywamy *metodą*.
Na przykład, w poniższym kodzie *increment* jest metodą,
a *value* własnością:

    var obiekt = {
      value: 0,
      increment: function (inc) {
        this.value += typeof inc == 'number' ? inc : 1;
      }
    };
    obiekt.increment();
    print(obiekt.value);  // 1

    obiekt.increment(2);
    print(obiekt.value);  // 3


Uwaga dotycząca uruchamiania kodu: kod Javascripy uruchamiamy na
konsoli *js*.  Listę dostępnych funkcji uzyskamy wpisując
w powłoce `help()` i wciskając enter.


## Obiekty

Literał obiektu:

    var pusty_obiekt = {};
    var inny_obiekt = {};
    var pusty_obiekt_1 = pusty_obiekt_2 = {};
    inny_obiekt.x = '_^_'
    print(inny_obiekt.x)
    print(pusty_obiekt.x)
    pusty_obiekt_1.x = '_v_'
    print(pusty_obiekt_2.x)


Ważne:

    print(pusty_obiekt.x)   //=> undefined
    print(pusty_obiekt.x.y) //=> TypeError: inny_pusty_obiekt.x has no properties
    pusty_obiekt.x && pusty_obiekt.x.y  //=> tak unikamy TypeError


Do typów podstawowych można dodawać swoje metody, ponieważ
każdy obiekt utworzony via `{ ... }` dziedziczy metody
standardowego obiektu języka `Object.prototype`.

Ale możemy też wybrać obiekt po którym będzie dziedziczył nowo
utworzony obiekt. Metoda `beget` obiektu `Objecct` ułatwia tworzenie
obiektów, które będą dziedziczyć własności po innym obiekcie.

Metoda `beget` tworzy nowy obiekt używający podanego obiektu jako
swojego prototypu.

    if (typeof Object.beget !== 'function') {
      Object.beget = function(o) {
        var F = function () {};
        F.prototype = o;
        return new F();
      }
    }


Przykład użycia: `ja` dziedziczy metody
po `osoba`.

    var osoba = {
      "imię": "Jan",
      "nazwisko": "Nowak",
      "nick": "Janek"
    };
    var ja = Object.beget(osoba);
    ja.nick;  //=> Janek
    ja.nick = "Włodek";
    delete ja.nick;
    ja.nick;  //=> Janek


Refleksja:

    osoba.toString();              //=> [object Object]
    osoba.hasOwnProperty('nick');  //=> true



## The Function Invocation Pattern

Obchodzimy błąd projektowy jezyka:
W wewnętrznej funkcji pomocniczej `this` jest
*bound to the global object*, a nie do obiektu
`obiekt`.

Na szczęście łatwo jest obejść ten błąd.  Konwencja: nazwa zmiennej
której używamy do zapamiętania referencji do obiektu, to zwyczajowo
`that`.

    obiekt.double = function () {
      var that = this;  // workaround
      var helper = function () {
        that.value += that.value;
      }
      helper(); // wywołujemy funkcję pomocniczą
    }
    obiekt.double();
    print(obiekt.value);


### Going functional

Definiujemy funkcję tworzącą obiekty:

    var cat = function(spec) {
      // tworzymy pusty obiekt
      var that = {};
      // dodajemy do obiektu metody (i właściwości)
      // tak
      that.get_name = function() {
        return spec.name;
      };
      // albo tak
      var says = function() {
        return spec.says || 'miau';
      };
      that.says = says;
      // zwracamy zmieniony obiekt
      return that;   //
    };


Przykład użycia:

    var mójKot = cat({name: 'Bazylek'});
    mójKot.says();
    mójKot.get_name();



## Augumenting Types, I

Dwa przykłady.

Zaczynamy od definicji metody pomocniczej
o nazwie *method*.

    Function.prototype.method = function (name, func) {
      if (!this.prototype[name]) {
        this.prototype[name] = func;
      }
    };


Dodajemy metodę *integer* do typu 'number'.

    Number.method('integer', function () {
      return Math[this < 0 ? 'ceiling' : 'floor'](this);
    });

    (-10 / -3).integer();


Dodajemy metodę *trim* do typu 'string'.

    String.method('trim', function () {
      return this.replace(/^\s+|\s+$/g, '');
    });

    "  ala ma kota  ".trim();



## Co to jest „lexical scope” i „current context”

TODO: Tim Caswell. [What is „this”?](http://howtonode.org/what-is-this)


## Closures

Funkcje wewnętrzne mają dostęp do parametrów i zmiennych
funkcji w której są definiowane, za wyjątkiem
**this** oraz **arguments**.

    var fade = function (node) {
      var level = 1;
      var step = function () {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
          level += 1;
          setTimeout(step, 100);
        }
      };
      setTimeout(step, 100);
    }
    fade(document.body);


Powyższy i poniższy kod uruchamiamy w konsoli rozszerzenia *Firebug*.

    var add_the_handlers = function (nodes) {
      var i;
      for (i = 0; i < nodes.length; i += 1) {
        nodes[i].onclick = function (i) {
          return function (event) {
            alert(i);
          };
        }(i);
      }
    };
    elems = document.getElementsByTagName('p');
    add_the_handlers(elems);


I jeszcze jeden przykład. Co wypisuje poniższy kod:

    for (var i = 1; i <= 3; i++) {
      setTimeout(function() { console.log(i); }, 0);
    }


A co ten kod:

    for (var i = 1; i <= 3; i++) {
      (function(i) {
        setTimeout(function() { console.log(i); }, 0);
      })(i);
    }



## Moduły

Tworzymy obiekt do generowania *numerów seryjnych*:

    var sequencer = function () {
      var prefix = '';
      var seq = 0;

      return {
        set_prefix: function (p) {
          prefix = String(p);
        },
        set_seq: function (s) {
          seq = s;
        },
        gensym: function () {
          var result = prefix + seq;
          seq += 1;
          return result;
        }
      };
    }();  //  <<-- !!

    sequencer.set_prefix('Q');
    sequencer.set_seq(1000);
    sequencer.gensym();


Prosty przykład wyjaśniający znaczenie `()` powyżej:

    var o = function() { return {msg: 'hello world'}; }()
    o.msg  //=> hello world



## Curry

*Currying* to funkcja utworzona z funkcji i ustalenia
kilku argumentów (zazwyczaj jednego).

Dodajemy do języka metodę **curry**.

    Function.method('curry', function () {
      var args = arguments, that = this;
      return function () {
        return that.apply(null, args.concat(arguments));
      };
    });
    // nie działa, ponieważ arguments nie jest *prawdziwą* tablicą
    // (arguments nie ma metody concat)


Działający kod:

    Function.method('curry', function () {
      var slice = Array.prototype.slice,
          args = slice.apply(arguments),
          that = this;
      return function () {
        return that.apply(null, args.concat(slice.apply(arguments)));
      };
    });

    var add = function (a, b) {
      return a + b;
    }

    var add2 = add.curry(2);
    print(add2(6));  //=> 8



## Memoization

Unikamy niepotrzebnych obliczeń, zapamiętując
(gdzie?) wyniki wykonanych obliczeń.

Bez memoization:

    var fibonacci = function (n) {
      return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
    };
    for (var i = 0; i <= 12; i += 1) {
      print('// ' + i + ': ' + fibonacci(i));
    };


Z memoization:

    var fibonacci = function () {
      var memo = [0, 1];
      var fib = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
          result = fib(n - 1) + fib(n - 2);
          memo[n] = result;
        };
        return result;
      };
      return fib;
    }();
    for (var i = 0; i <= 12; i += 1) {
      print('// ' + i + ': ' + fibonacci(i));
    };


Funkcja ułatwiająca kodowanie *memoized* funkcji.

    var memoizer = function (memo, fundamental) {
      var shell = function (n) {
        var result = memo[n];
        if (typeof result !== 'number') {
          result = fundamental(shell, n);
          memo[n] = result;
        };
        return result;
      };
      return shell;
    };

    var fibonacci = memoizer([0, 1], function(shell, n) {
      return shell(n - 1) + shell(n - 2);
    });
    for (var i = 0; i <= 12; i += 1) {
      print('// ' + i + ': ' + fibonacci(i));
    };

    var factorial = memoizer([1], function (shell, n) {
      return n * shell(n - 1);
    });
    for (var i = 0; i <= 10; i += 1) {
      print('// ' + i + ': ' + factorial(i));
    };



## Augumenting Objects, X

Przykład wymaga jeszcze dopracowania.
Kod wklejamy na konsoli *js*.

    var t = [2, 2, 2]

    // zmieniamy wartość elementu t[1]
    t[1] = t[1] * t[1]

    // albo tak
    t.zmien1 = function() { this[1] = this[1]*this[1]; }
    t.zmien1()
    t //=> 2, 4, 2

    // albo tak
    t.zmien1 = function(f) { this[1] = f(this[1]); }
    t.zmien1(function(arg) { return arg*arg; })

    var kwadrat = function(arg) { return arg*arg; }
    t.zmien1(kwadrat)


Lepszy przykład:

    var a = [1, 2, 3, 4];
    a.map = function(f) { for(var i=0; i<this.length; i++) this[i] = f(this[i]); }
    a.map(function(arg) { return arg*arg; })  //=> 1,4,9,16
    var kwadrat = function(arg) { return arg*arg; }
    a.map(kwadrat)  //=> 1,16,81,256

