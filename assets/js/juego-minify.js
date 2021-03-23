//NOTE: https://javascript-minifier.com/

(() => {
  "use strict";
  let e = [];
  const t = ["C", "D", "H", "S"],
    a = ["A", "J", "Q", "K"];
  let n = 0,
    r = 0;
  const s = document.querySelector("#btnPedir"),
    c = document.querySelector("#btnDetener"),
    o = document.querySelector("#btnNuevo"),
    l = document.querySelector("#jugador-cartas"),
    d = document.querySelector("#computadora-cartas"),
    i = document.querySelectorAll("small"),
    
    u = () => {
      for (let a = 2; a <= 10; a++) for (let n of t) e.push(a + n);
      for (let n of t) for (let t of a) e.push(t + n);
      return (e = _.shuffle(e));
    };
    
  u();
  const m = () => {
      if (0 === e.length) throw "No hay cartas en el deck";
      return e.pop();
    },
    p = (e) => {
      const t = e.substring(0, e.length - 1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
    },
    b = (e) => {
      do {
        const t = m();
        (r += p(t)), (i[1].innerText = r);
        const a = document.createElement("img");
        if (
          ((a.src = `assets/cartas/${t}.png`),
          a.classList.add("carta"),
          d.append(a),
          e > 21)
        )
          break;
      } while (r < e && e < 21);
      setTimeout(() => {
        r === e
          ? alert("¡Nadie gana!")
          : e > 21
          ? alert("¡La computadora gana!")
          : r > 21
          ? alert("¡Ganaste!")
          : 21 === e
          ? alert("¡Ganaste!")
          : alert("¡La computadora gana!");
      }, 10);
    };
  s.addEventListener("click", () => {
    const e = m();
    (n += p(e)), (i[0].innerText = n);
    const t = document.createElement("img");
    (t.src = `assets/cartas/${e}.png`),
      t.classList.add("carta"),
      l.append(t),
      n > 21
        ? (console.warn("Lo siento mucho, perdiste"),
          (s.disabled = !0),
          (c.disabled = !0),
          b(n))
        : 21 === n &&
          (console.warn("21, genial"),
          (s.disabled = !0),
          (c.disabled = !0),
          b(n));
  }),
    c.addEventListener("click", () => {
      (s.disabled = !0), (c.disabled = !0), b(n);
    }),
    o.addEventListener("click", () => {
      console.clear(),
        (e = []),
        (e = u()),
        (r = 0),
        (n = 0),
        (i[0].innerText = 0),
        (i[1].innerText = 0),
        (d.innerHTML = ""),
        (l.innerHTML = ""),
        (s.disabled = !1),
        (c.disabled = !1);
    });
})();
