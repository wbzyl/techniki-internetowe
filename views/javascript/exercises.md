<blockquote>
<h3>Everybody Got to Learn Sometime</h3>
<p>
  It was a rainy night<br/>
  When he came into sight<br/>
  Standing by the road<br/>
  With no umbrella, no coat
</p>
<p>
  So I pulled up along side<br/>
  And I offered him a ride<br/>
  He accepted with a smile<br/>
  So we drove for a while
</p>
<p>
  I didn't ask him his name<br/>
  This lonely boy in the rain<br/>
  Fate, tell me it's right<br/>
  Is this love at first sight?
</p>
</blockquote>

<!--

Zanim rozwiążemy pierwsze zadanie pisząc program w języku Javascript,
zainstalujemy rozszerzenie do Firefoksa o nazwie [JavaScript
Debugger](https://addons.mozilla.org/en-US/firefox/addon/216).

Następnie przechodzimy do lektury samouczka Svend’a Tofte.
[Learning the JavaScript debugger Venkman](http://www.svendtofte.com/code/learning_venkman/).

Dlaczego powinniśmy zacząć od instalacji debuggera wyjaśnia
Svend zaraz na początku samouczka…

-->

## Dziesięć prostych zadań

1\. Zdefiniować funkcję `max()` o dwóch argumentach
całkowitych, wypisującą większy z podanych argumentów.

Przykładowe rozwiązanie:

    var max = function (x, y) {
      if (x < y)
        print(y); // funkcja dostępna w programie js
      else
        print(x);
    }
    max(2, 99)
    max(2, -1)


Kod wpisujemy w pliku o nazwie *01.js*.
Kod uruchamiamy z wiersza poleceń tak:

    js 01.js

Podobnie, o ile tego nie zaznaczono inaczej, postępujemy
rozwiązując pozostałe zadania.

Oto lista niektórych funkcji dostępnych w programie **js**:

    $   js
    js> help()
    Command        Usage                  Description
    =======        =====                  ===========
    load           load(['foo.js' ...])   Load files named by string arguments
    readline       readline()             Read a single line from stdin
    print          print([exp ...])       Evaluate and print expressions
    help           help([name ...])       Display usage and help messages
    quit           quit()                 Quit the shell
    clear          clear([obj])           Clear properties of object
    clone          clone(fun[, scope])    Clone function object
    evalcx         evalcx(s[, o])         Evaluate s in optional sandbox object o

2\. Zdefiniować funkcję `maxOfThree()` pobierającą trzy argumenty
całkowite i wypisującą największy z nich.

3\. Zdefiniować funkcję `vowel()` o jednym argumencie będącym
napisem składającym się z jednego znaku zwracającej *true*
jeśli podany znak jest samogłoską i zwracającej *false*
w przeciwnym wypadku.

4\. Zdefiniować funkcję `translate()`, która tekst podany
jako jej jedyny argument tłumaczy w następujący sposób:
podwają każdą spółgłoskę i wstawia między nie
literę&nbsp;*o*.
Na przykład, `translate('ala ma kota')` zostanie
przetłumaczone na *alola moma koktota*.

5\. Zdefiniować funkcje `sum()` oraz `multiply()` obliczające,
odpowiednio, sumę i iloczyn w tablicy liczb całkowitych
przekazanej jako argument. Na przykład, wywołanie
`sum([2,3,4])` powinno zwrócić 9, a `multiply([2,3,4])` — 24.

6\. Zdefiniować funkcję `reverse()` obliczającą odwrócony
napis podany jako argument. Na przykład,
`reverse("ala ma kota")` powinno zwrócić *atok am ala*.

7\. Zapamiętać w obiekcie Javascript,
tłumaczenia kilku słów z języka angielskiego na polski.
Użyć tego obiektu do tłumaczenia krótkich **Wielkanocnych**
zdań z angielskiego na polski.

8\. Napisać funkcję `findLongestWord(tab)`, która z podanej
tablicy słów *tab* zwraca najdłuższe słowo.

9\. Napisać funkcję `filterLongWords(tab,i)`, która po podaniu
tablicy z listą słów *tab* i liczby całkowitej *i* zwraca listę
słów dłuższych niż *i*.

10\. Napisać funkcję `charFreq()` o jednym argumencie będącym
napisem, która buduje listę częstości występowania znaków
występujących w podanym napisie. Przykładowe wywołanie
tej funkcji może wygladać tak: `charFreq("abbabcbdbabdbdbabababcbcbab")`.
