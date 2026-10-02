/* ==========================================================================
   Annerie's Driving School — site behaviour
   Content is read from config.js. You normally do not need to edit this file.
   ========================================================================== */
(function () {
  "use strict";

  var S = window.SITE;
  if (!S) { console.error("config.js did not load"); return; }

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- tiny helpers ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }

  function h(tag, props, kids) {
    var n = document.createElement(tag);
    props = props || {};
    Object.keys(props).forEach(function (k) {
      var v = props[k];
      if (v === null || v === undefined || v === false) return;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k === "html") n.innerHTML = v;              // trusted, static markup only
      else n.setAttribute(k, v === true ? "" : v);
    });
    (kids || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      n.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return n;
  }

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, S);
  }

  function money(n) {
    return "R" + Math.round(n).toLocaleString("en-ZA").replace(/\s|\u00a0/g, " ");
  }

  function initials(name) {
    return name.split(" ").map(function (p) { return p.charAt(0); }).slice(0, 2).join("");
  }

  /* ---------- icons ---------- */
  var SVG = function (inner, fill) {
    return '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="' + (fill || "none") +
      '" stroke="' + (fill ? "none" : "currentColor") + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + inner + "</svg>";
  };
  var ICON = {
    check:   SVG('<path d="M5 12.5l4.5 4.5L19 7"/>'),
    dash:    SVG('<path d="M6 12h12"/>'),
    chevron: SVG('<path d="M9 5l7 7-7 7"/>'),
    phone:   SVG('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>'),
    mail:    SVG('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 6l-10 7L2 6"/>'),
    pin:     SVG('<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'),
    clock:   SVG('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    chat:    SVG('<path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5A8.5 8.5 0 1 1 21 11.5z"/>'),
    star:    SVG('<path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21 7 14.2l-5-4.9 6.9-1z"/>', "currentColor")
  };
  function ico(name) { return h("span", { class: "ico", "aria-hidden": "true", html: ICON[name] }); }

  function stars(n) {
    var wrap = h("span", { class: "stars", role: "img", "aria-label": n + " out of 5 stars" });
    for (var i = 0; i < 5; i++) wrap.appendChild(h("span", { class: i < n ? "on" : "off", html: ICON.star }));
    return wrap;
  }

  /* ---------- brand mark (header + footer) ---------- */
  function brand() {
    var mark = '<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#D0112B"/>' +
      '<text x="20" y="27" text-anchor="middle" font-size="24" font-weight="800" fill="#fff" font-family="Bricolage Grotesque,Arial,sans-serif">A</text>' +
      '<rect x="11" y="31" width="18" height="2.5" rx="1.25" fill="#FFD6E4"/></svg>';
    return h("a", { class: "brand", href: "index.html", "aria-label": S.brand.name + ", home" }, [
      h("span", { class: "brand__mark", "aria-hidden": "true", html: mark }),
      h("span", { class: "brand__text" }, [h("strong", { text: S.brand.short }), h("span", { text: "Driving School" })])
    ]);
  }

  /* ---------- header ---------- */
  function renderHeader() {
    var mount = $("#site-header");
    if (!mount) return;
    var page = document.body.getAttribute("data-page");

    var toggle = h("button", {
      class: "nav__toggle", type: "button", "aria-expanded": "false",
      "aria-controls": "nav-menu", "aria-label": "Open menu"
    }, [h("span"), h("span")]);

    var items = S.nav.map(function (n) {
      return h("a", { class: "nav__link", href: n.href, "aria-current": n.id === page ? "page" : null, text: n.label });
    });
    items.push(h("a", { class: "btn btn--small", href: S.navCta.href, text: S.navCta.label }));

    var menu = h("nav", { id: "nav-menu", class: "nav__menu", "aria-label": "Main" }, items);
    var header = h("header", { class: "site-header" }, [h("div", { class: "wrap nav" }, [brand(), toggle, menu])]);
    mount.appendChild(header);

    function close() {
      header.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    }
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("is-open")) { close(); toggle.focus(); }
    });

    function onScroll() { header.classList.toggle("is-scrolled", window.scrollY > 8); }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- footer ---------- */
  function hoursList() {
    return h("ul", { class: "hours-list" }, S.hours.map(function (r) {
      return h("li", {}, [h("span", { text: r.label }), h("span", { text: r.closed ? "Closed" : r.open + " to " + r.close })]);
    }));
  }

  function addressLines() {
    var a = S.contact.address;
    return [a.street, a.suburb + ", " + a.city, a.province + ", " + a.postcode];
  }

  function renderFooter() {
    var mount = $("#site-footer");
    if (!mount) return;
    var c = S.contact;
    var contactList = h("ul", {}, [
      h("li", {}, [h("a", { href: "tel:" + c.phoneTel, text: c.phoneDisplay })]),
      h("li", {}, [h("a", { href: "mailto:" + c.email, text: c.email })]),
      h("li", {}, [h("span", { text: addressLines().join(", ") })])
    ]);
    mount.appendChild(h("footer", { class: "site-footer" }, [
      h("div", { class: "wrap" }, [
        h("div", { class: "footer__grid" }, [
          h("div", { class: "footer__brand" }, [brand(), h("p", { text: S.brand.blurb })]),
          h("div", { class: "footer__col" }, [
            h("h2", { text: "Explore" }),
            h("ul", {}, S.nav.map(function (n) { return h("li", {}, [h("a", { href: n.href, text: n.label })]); }))
          ]),
          h("div", { class: "footer__col" }, [h("h2", { text: "Contact" }), contactList]),
          h("div", { class: "footer__col" }, [h("h2", { text: "Opening hours" }), hoursList()])
        ]),
        h("div", { class: "footer__bottom" }, [
          h("p", { text: "\u00a9 " + new Date().getFullYear() + " " + S.brand.name + ". All rights reserved." }),
          h("p", { text: S.brand.legal })
        ])
      ])
    ]));
  }

  function renderFab() {
    var c = S.contact;
    document.body.appendChild(h("a", {
      class: "fab",
      href: "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(S.whatsappGreeting),
      target: "_blank", rel: "noopener", "aria-label": "Message us on WhatsApp"
    }, [ico("chat"), h("span", { text: "Chat with us" })]));
  }

  /* ---------- data-bind: drop config text into plain HTML ---------- */
  function bindText() {
    $$("[data-bind]").forEach(function (n) {
      var v = get(n.getAttribute("data-bind"));
      if (v !== null && v !== undefined) n.textContent = v;
    });
    $$("[data-bind-href]").forEach(function (n) {
      var v = get(n.getAttribute("data-bind-href"));
      if (v) n.setAttribute("href", v);
    });
  }

  /* ==========================================================================
     Section renderers — each one fills an element with data-render="name"
     ========================================================================== */
  var R = {};

  R.stats = function (m) {
    S.stories.stats.forEach(function (s) {
      m.appendChild(h("div", { class: "stat" }, [
        h("span", { class: "stat__num", "data-count": s.value, "data-decimals": s.decimals || 0, "data-suffix": s.suffix || "", text: "0" }),
        h("span", { class: "stat__label", text: s.label })
      ]));
    });
  };

  R.services = function (m) {
    S.services.forEach(function (s) {
      m.appendChild(h("a", { class: "service", href: s.href || "contact.html" }, [
        h("span", { class: "service__code", text: s.code }),
        h("span", { class: "service__body" }, [
          h("strong", { class: "service__name", text: s.name }),
          h("span", { class: "service__text", text: s.text })
        ]),
        h("span", { class: "service__price", text: s.price }),
        h("span", { class: "service__go", "aria-hidden": "true", html: ICON.chevron })
      ]));
    });
  };

  R.steps = function (m) {
    S.steps.forEach(function (s, i) {
      m.appendChild(h("li", { class: "step", style: "--n:" + i }, [
        h("span", { class: "step__marker", "aria-hidden": "true", text: String(i + 1) }),
        h("div", {}, [h("h3", { class: "step__title", text: s.title }), h("p", { class: "step__text", text: s.text })])
      ]));
    });
  };

  function quote(t, extra) {
    return h("figure", { class: "quote " + (extra || "") }, [
      stars(t.stars || 5),
      h("blockquote", {}, [h("p", { text: t.text })]),
      h("figcaption", {}, [
        h("span", { class: "quote__avatar", "aria-hidden": "true", text: initials(t.name) }),
        h("span", { class: "quote__who" }, [h("strong", { text: t.name }), h("span", { text: t.place })]),
        h("span", { class: "quote__tag", text: t.tag })
      ])
    ]);
  }

  R.testimonials = function (m) {
    var T = S.testimonials;

    /* Home page: one large quote, two smaller */
    if (m.getAttribute("data-layout") === "feature") {
      var lead = T[0], side = T.slice(1, 3);
      m.classList.add("quotes--feature");
      m.appendChild(h("div", { class: "quotes__lead" }, [quote(lead, "quote--lead")]));
      m.appendChild(h("div", { class: "quotes__side" }, side.map(function (t) { return quote(t); })));
      return;
    }

    /* Success Stories page: filterable grid */
    var tags = ["All"];
    T.forEach(function (t) { if (tags.indexOf(t.tag) === -1) tags.push(t.tag); });
    var list = h("div", { class: "quotes--grid", "aria-live": "polite" });
    var chips = h("div", { class: "chips", role: "group", "aria-label": "Filter stories" });

    function show(tag) {
      list.innerHTML = "";
      T.filter(function (t) { return tag === "All" || t.tag === tag; })
        .forEach(function (t) { list.appendChild(quote(t)); });
      $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", String(c.textContent === tag)); });
    }
    tags.forEach(function (tag) {
      chips.appendChild(h("button", { class: "chip", type: "button", "aria-pressed": "false", text: tag }));
    });
    chips.addEventListener("click", function (e) {
      if (e.target.classList.contains("chip")) show(e.target.textContent);
    });
    m.appendChild(chips);
    m.appendChild(list);
    show("All");
  };

  R.faq = function (m) {
    var cat = m.getAttribute("data-cat");
    S.faqs.filter(function (f) { return !cat || f.cat === cat; }).forEach(function (f) {
      m.appendChild(h("details", { class: "faq" }, [
        h("summary", {}, [h("span", { text: f.q }), h("span", { class: "faq__icon", "aria-hidden": "true" })]),
        h("p", { text: f.a })
      ]));
    });
  };

  R.aboutpoints = function (m) {
    S.about.points.forEach(function (p) {
      m.appendChild(h("li", {}, [ico("check"), h("span", { text: p })]));
    });
  };

  R.areas = function (m) {
    S.areas.forEach(function (a) { m.appendChild(h("li", { text: a })); });
  };

  /* ---------- Pricing: packages table ---------- */
  R.packages = function (m) {
    var P = S.pricing;
    var head = h("tr", {}, [h("th", { scope: "col" }, [h("span", { class: "sr-only", text: "What is included" })])]);
    P.packages.forEach(function (p) {
      head.appendChild(h("th", { scope: "col", class: p.badge ? "is-featured" : "" }, [
        p.badge ? h("span", { class: "ptable__badge", text: p.badge }) : null,
        h("span", { class: "ptable__name", text: p.name }),
        h("span", { class: "ptable__price", text: money(p.price) }),
        h("span", { class: "ptable__per", text: p.lessons + " lessons, " + money(p.price / p.lessons) + " each" }),
        h("span", { class: "ptable__note", text: p.note })
      ]));
    });

    var body = h("tbody");
    P.features.forEach(function (f, i) {
      var row = h("tr", {}, [h("th", { scope: "row", text: f })]);
      P.packages.forEach(function (p) {
        var v = p.values[i];
        row.appendChild(h("td", { class: (v ? "yes " : "no ") + (p.badge ? "is-featured" : "") }, [
          ico(v ? "check" : "dash"),
          h("span", { class: "sr-only", text: v ? "Included" : "Not included" })
        ]));
      });
      body.appendChild(row);
    });

    var foot = h("tr", {}, [h("td")]);
    P.packages.forEach(function (p) {
      foot.appendChild(h("td", { class: p.badge ? "is-featured" : "" }, [
        h("a", { class: "btn btn--small", href: "contact.html?package=" + encodeURIComponent(p.name), text: "Choose " + p.name })
      ]));
    });

    m.appendChild(h("table", { class: "ptable" }, [
      h("caption", { class: "sr-only", text: "Lesson packages compared" }),
      h("thead", {}, [head]), body, h("tfoot", {}, [foot])
    ]));
  };

  /* ---------- Pricing: rate list + extras ---------- */
  R.rates = function (m) {
    S.pricing.rates.forEach(function (r) {
      m.appendChild(h("li", { class: "rate" }, [
        h("div", {}, [h("strong", { class: "rate__name", text: r.name }), h("span", { class: "rate__detail", text: r.detail })]),
        h("span", { class: "rate__price", text: money(r.price) })
      ]));
    });
  };
  R.extras = function (m) {
    S.pricing.extras.forEach(function (r) {
      m.appendChild(h("li", { class: "rate" }, [
        h("div", {}, [h("strong", { class: "rate__name", text: r.name }), h("span", { class: "rate__detail", text: r.detail })]),
        h("span", { class: "rate__price", text: r.price })
      ]));
    });
  };
  R.payments = function (m) {
    S.pricing.payments.forEach(function (p) { m.appendChild(h("li", { text: p })); });
  };
  R.pricenotes = function (m) {
    S.pricing.notes.forEach(function (p) { m.appendChild(h("li", { text: p })); });
  };

  /* ---------- Pricing: lesson calculator ---------- */
  R.calculator = function (m) {
    var P = S.pricing;
    var modes = P.rates.filter(function (r) { return r.calc; });
    var mode = modes[0].calc;
    var n = 10;

    var range = h("input", { type: "range", id: "calc-range", min: "1", max: "40", value: String(n) });
    var count = h("output", { class: "calc__count", for: "calc-range" });
    var total = h("output", { class: "calc__total", "aria-live": "polite" });
    var detail = h("p", { class: "calc__detail" });
    var tiers = h("ul", { class: "calc__tiers" }, P.discounts.map(function (d) {
      return h("li", { "data-min": d.min, text: d.min + " or more lessons: " + d.pct + "% off" });
    }));
    var book = h("a", { class: "btn", href: "contact.html", text: "Book these lessons" });

    var modeBox = h("div", { class: "calc__modes", role: "radiogroup", "aria-label": "Gearbox" });
    modes.forEach(function (r, i) {
      var input = h("input", { type: "radio", name: "calc-mode", value: r.calc, id: "calc-" + r.calc, checked: i === 0 });
      input.addEventListener("change", function () { mode = r.calc; update(); });
      modeBox.appendChild(h("label", { class: "calc__mode", for: "calc-" + r.calc }, [
        input, h("span", {}, [h("strong", { text: r.name.replace(" lesson", "") }), h("small", { text: money(r.price) + " per hour" })])
      ]));
    });

    function discountFor(lessons) {
      var d = 0;
      P.discounts.forEach(function (t) { if (lessons >= t.min) d = t.pct; });
      return d;
    }

    function update() {
      n = +range.value;
      var rate = modes.filter(function (r) { return r.calc === mode; })[0];
      var pct = discountFor(n);
      var base = rate.price * n;
      var sum = base * (1 - pct / 100);
      range.style.setProperty("--fill", ((n - 1) / 39 * 100) + "%");
      count.textContent = n + (n === 1 ? " lesson" : " lessons");
      total.textContent = money(sum);
      detail.textContent = pct
        ? "You save " + money(base - sum) + " (" + pct + "% off). That is " + money(sum / n) + " per lesson."
        : money(rate.price) + " per lesson. Book 10 or more to start saving.";
      $$("li", tiers).forEach(function (li) { li.classList.toggle("on", n >= +li.getAttribute("data-min")); });
      book.setAttribute("href", "contact.html?lessons=" + n + "&type=" + mode);
    }
    range.addEventListener("input", update);

    m.appendChild(h("div", { class: "calc__controls" }, [
      h("h3", { text: "Work out your lessons" }),
      modeBox,
      h("div", { class: "calc__slider" }, [h("label", { for: "calc-range", text: "How many lessons?" }), count, range]),
      tiers
    ]));
    m.appendChild(h("div", { class: "calc__result" }, [
      h("p", { class: "calc__label", text: "Your estimate" }), total, detail, book
    ]));
    update();
  };

  /* ---------- Contact: details, hours, map, form ---------- */
  R.contactdetails = function (m) {
    var c = S.contact;
    var rows = [
      ["phone", "Call", c.phoneDisplay, "tel:" + c.phoneTel],
      ["chat",  "WhatsApp", c.phoneDisplay, "https://wa.me/" + c.whatsapp + "?text=" + encodeURIComponent(S.whatsappGreeting)],
      ["mail",  "Email", c.email, "mailto:" + c.email]
    ];
    rows.forEach(function (r) {
      m.appendChild(h("li", {}, [ico(r[0]), h("span", {}, [h("small", { text: r[1] }),
        h("a", { href: r[3], target: r[0] === "chat" ? "_blank" : null, rel: r[0] === "chat" ? "noopener" : null, text: r[2] })])]));
    });
    m.appendChild(h("li", {}, [ico("pin"), h("span", {}, [h("small", { text: "Find us" })].concat(
      addressLines().map(function (l) { return h("span", { class: "line-block", text: l }); })))]));
  };

  function sastNow() {
    var parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Johannesburg", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var o = {};
    parts.forEach(function (p) { o[p.type] = p.value; });
    var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
    return { day: map[o.weekday], mins: (parseInt(o.hour, 10) % 24) * 60 + parseInt(o.minute, 10) };
  }
  function toMins(t) { var p = t.split(":"); return +p[0] * 60 + +p[1]; }

  R.hours = function (m) {
    var now = sastNow(), open = false;
    S.hours.forEach(function (r) {
      if (!r.closed && r.days.indexOf(now.day) > -1 && now.mins >= toMins(r.open) && now.mins < toMins(r.close)) open = true;
    });
    m.appendChild(h("p", { class: "open-now " + (open ? "is-open" : "is-closed") }, [
      h("span", { class: "open-now__dot", "aria-hidden": "true" }),
      open ? "Open now. Call or WhatsApp." : "Closed right now. Leave a message and we will call you back."
    ]));
    m.appendChild(hoursList());
  };

  R.map = function (m) {
    var q = encodeURIComponent(S.contact.mapQuery);
    m.appendChild(h("iframe", {
      title: "Map showing " + S.brand.name, loading: "lazy", referrerpolicy: "no-referrer-when-downgrade",
      src: "https://www.google.com/maps?q=" + q + "&output=embed"
    }));
  };

  R.form = function (m) {
    var params = new URLSearchParams(window.location.search);
    var options = [""].concat(
      S.services.map(function (s) { return s.name; }),
      S.pricing.packages.map(function (p) { return p.name + " package"; }),
      ["Something else"]
    );

    function field(id, label, control, hint) {
      return h("div", { class: "field" }, [h("label", { for: id, text: label }), control, hint ? h("small", { text: hint }) : null]);
    }

    var name  = h("input", { id: "f-name",  name: "name",  type: "text", autocomplete: "name", required: true });
    var phone = h("input", { id: "f-phone", name: "phone", type: "tel",  autocomplete: "tel", inputmode: "tel", required: true });
    var email = h("input", { id: "f-email", name: "email", type: "email", autocomplete: "email" });
    var interest = h("select", { id: "f-interest", name: "interest" }, options.map(function (o) {
      return h("option", { value: o, text: o || "Choose one (optional)" });
    }));
    var msg = h("textarea", { id: "f-msg", name: "message", rows: "5" });
    var trap = h("div", { class: "field field--trap", "aria-hidden": "true" }, [
      h("label", { for: "f-web", text: "Leave this empty" }),
      h("input", { id: "f-web", name: "_gotcha", type: "text", tabindex: "-1", autocomplete: "off" })
    ]);
    var status = h("p", { class: "form__status", role: "status", "aria-live": "polite" });
    var btn = h("button", { class: "btn", type: "submit", text: "Send message" });

    /* Prefill from links on other pages */
    var pkg = params.get("package");
    if (pkg) interest.value = pkg + " package";
    var lessons = params.get("lessons");
    if (lessons) {
      var t = params.get("type") === "automatic" ? "automatic" : "manual";
      msg.value = "I'd like to book " + parseInt(lessons, 10) + " " + t + " lessons.";
    }

    var form = h("form", { class: "form", novalidate: true }, [
      h("div", { class: "form__row" }, [field("f-name", "Full name", name), field("f-phone", "Phone number", phone)]),
      field("f-email", "Email (optional)", email),
      field("f-interest", "I am interested in", interest),
      field("f-msg", "Message (optional)", msg, "Tell us where you are in the process, and the best times to reach you."),
      trap, h("div", { class: "form__actions" }, [btn, status])
    ]);

    function say(text, kind) {
      status.textContent = text;
      status.className = "form__status" + (kind ? " is-" + kind : "");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var data = new FormData(form);
      if (data.get("_gotcha")) return;                        // bots
      var summary = "Hi, I'm " + data.get("name") + " (" + data.get("phone") + ")." +
        (data.get("interest") ? " I'm interested in: " + data.get("interest") + "." : "") +
        (data.get("message") ? " " + data.get("message") : "");

      if (S.formEndpoint) {
        btn.disabled = true; say("Sending...");
        fetch(S.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("bad response");
            form.reset();
            say("Thanks, " + data.get("name") + ". We will call you back within one working day.", "ok");
          })
          .catch(function () {
            say("That did not send. Please call " + S.contact.phoneDisplay + " or message us on WhatsApp.", "error");
          })
          .then(function () { btn.disabled = false; });
      } else {
        say("Opening WhatsApp so you can send your message.", "ok");
        window.open("https://wa.me/" + S.contact.whatsapp + "?text=" + encodeURIComponent(summary), "_blank", "noopener");
      }
    });

    m.appendChild(form);
  };

  /* ---------- Success Stories: pass-rate bars, ticker, odometer ---------- */
  R.bars = function (m) {
    S.stories.byYear.forEach(function (y, i) {
      m.appendChild(h("div", { class: "bar" }, [
        h("span", { class: "bar__year", text: String(y.year) }),
        h("span", { class: "bar__track" }, [h("span", { class: "bar__fill", style: "--w:" + y.pass + "%;--i:" + i })]),
        h("span", { class: "bar__val" }, [h("strong", { text: y.pass + "%" }),
          h("small", { text: y.students + " learners" + (y.note ? " " + y.note : "") })])
      ]));
    });
  };

  R.ticker = function (m) {
    function items(hidden) {
      return h("ul", { class: "ticker__list", "aria-hidden": hidden ? "true" : null }, S.stories.recent.map(function (r) {
        return h("li", { class: "ticker__item" }, [
          ico("check"), h("strong", { text: r.name }), h("span", { text: "passed, " + r.place + ", " + r.when })
        ]);
      }));
    }
    m.appendChild(h("div", { class: "ticker__track" }, [items(false), items(true)]));
  };

  R.odometer = function (m) {
    var str = String(S.stories.total).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    m.setAttribute("role", "img");
    m.setAttribute("aria-label", str + " " + (S.stories.stats[0] ? S.stories.stats[0].label : "learners"));
    var idx = 0;
    str.split("").forEach(function (ch) {
      if (ch === ",") { m.appendChild(h("span", { class: "odo__sep", "aria-hidden": "true", text: "," })); return; }
      var roll = h("span", { class: "odo__roll", style: "--d:" + ch + ";--i:" + idx });
      for (var k = 0; k < 20; k++) roll.appendChild(h("span", { text: String(k % 10) }));
      m.appendChild(h("span", { class: "odo__digit", "aria-hidden": "true" }, [roll]));
      idx++;
    });
  };

  function runRenderers() {
    $$("[data-render]").forEach(function (m) {
      var fn = R[m.getAttribute("data-render")];
      if (fn) fn(m);
    });
  }

  /* ==========================================================================
     Motion
     ========================================================================== */
  function countUp(node) {
    var end = parseFloat(node.getAttribute("data-count"));
    var dec = parseInt(node.getAttribute("data-decimals"), 10) || 0;
    var suf = node.getAttribute("data-suffix") || "";
    function fmt(v) {
      return v.toLocaleString("en-ZA", { minimumFractionDigits: dec, maximumFractionDigits: dec }).replace(/\s|\u00a0/g, " ") + suf;
    }
    if (reduce) { node.textContent = fmt(end); return; }
    var start = null, dur = 1600;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / dur, 1);
      node.textContent = fmt(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function activate(el) {
    el.classList.add("is-in");
    $$("[data-count]", el).forEach(countUp);
  }

  function observe() {
    var targets = $$("[data-reveal], .odo, .bars, .steps, .stats");
    if (!("IntersectionObserver" in window) || reduce) { targets.forEach(activate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { activate(e.target); io.unobserve(e.target); }
      });
    }, { threshold: 0.25, rootMargin: "0px 0px -5% 0px" });
    targets.forEach(function (t) { io.observe(t); });
  }

  /* The road and wheels move as you scroll, so the page feels like driving */
  function roadScroll() {
    var road = $(".road"), car = $(".car");
    if (!road || reduce) return;
    var ticking = false;
    function update() {
      var y = Math.min(window.scrollY, 1400);
      road.style.setProperty("--road-x", (-y * 1.3) + "px");
      if (car) car.style.setProperty("--wheel", (y * 1.1) + "deg");
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- SEO: local business structured data ---------- */
  function jsonLd() {
    var c = S.contact, a = c.address;
    var data = {
      "@context": "https://schema.org",
      "@type": "DrivingSchool",
      name: S.brand.name,
      description: S.brand.blurb,
      telephone: c.phoneTel,
      email: c.email,
      url: window.location.origin + window.location.pathname.replace(/[^/]*$/, ""),
      address: {
        "@type": "PostalAddress", streetAddress: a.street, addressLocality: a.suburb,
        addressRegion: a.province, postalCode: a.postcode, addressCountry: "ZA"
      },
      areaServed: S.areas
    };
    var tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = JSON.stringify(data);
    document.head.appendChild(tag);
  }

  /* ---------- go ---------- */
  function init() {
    renderHeader();
    renderFooter();
    renderFab();
    bindText();
    runRenderers();
    observe();
    roadScroll();
    jsonLd();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
