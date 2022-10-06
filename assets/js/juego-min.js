const miModule = (() => {
  "use strict";
  let e = [],
    t = ["C", "D", "H", "S"],
    l = ["A", "J", "Q", "K"],
    r = [],
    a = document.querySelector("#btnPedir"),
    n = document.querySelector("#btnDetener"),
    o = document.querySelector("#btnNuevo"),
    s = document.querySelectorAll(".divCharts"),
    d = document.querySelectorAll("small"),
    i = (t = 2) => {
      (e = c()), (r = []);
      for (let l = 0; l < t; l++) r.push(0);
      d.forEach((e) => (e.innerText = 0)),
        s.forEach((e) => (e.innerHTML = "")),
        (a.disabled = !1),
        (n.disabled = !1);
    },
    c = () => {
      let e = [];
      for (let r = 2; r <= 10; r++) for (let a of t) e.push(r + a);
      for (let n = 0; n < l.length; n++) for (let o of t) e.push(l[n] + o);
      return _.shuffle(e);
    },
    u = () => {
      if (0 === e.length) throw "No hay Cartas en el Deck";
      return e.pop();
    },
    $ = (e) => {
      let t = e.substring(0, e.length - 1);
      return isNaN(t) ? ("A" === t ? 11 : 10) : 1 * t;
    },
    h = (e, t) => ((r[t] = r[t] + $(e)), (d[t].innerText = r[t]), r[t]),
    b = (e, t) => {
      let l = document.createElement("img");
      (l.src = `assets/cartas/${e}.png`),
        l.classList.add("cartas"),
        s[t].append(l);
    },
    f = () => {
      let [e, t] = r;
      setTimeout(() => {
        e > 21 || 21 === t
          ? alert("Gana Computadora")
          : 21 === e || e < t
          ? alert("Gana Jugador")
          : t === e && alert("Empate Tecnico");
      }, 20);
    },
    g = (e) => {
      let t = 0;
      do {
        let l = u();
        (t = h(l, r.length - 1)), b(l, r.length - 1);
      } while (t < e && e < 21);
      f();
    };
  return (
    a.addEventListener("click", () => {
      let e = u(),
        t = h(e, 0);
      b(e, 0),
        t > 21
          ? (console.warn("Perdio Palomo"),
            (a.disabled = !0),
            g(t),
            (n.disabled = !0))
          : 21 === t &&
            (console.log("Coronaste palomo"),
            (a.disabled = !0),
            g(t),
            (n.disabled = !0));
    }),
    n.addEventListener("click", () => {
      let e = s[0];
      (a.disabled = !0), (n.disabled = !0), g(e);
    }),
    o.addEventListener("click", () => {
      i();
    }),
    { nuevoJuego: i }
  );
})();
