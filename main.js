/* future.nostalgia — progressive enhancement
   1) reveal-on-scroll  2) hero prints "develop in"  3) form submit → inline success */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* current year */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* ---- reveal-on-scroll ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---- hero prints develop in (staggered) ---- */
  var prints = document.querySelectorAll("[data-develop]");
  if (reduceMotion) {
    prints.forEach(function (el) { el.style.opacity = 1; el.style.filter = "none"; });
  } else {
    prints.forEach(function (el, i) {
      setTimeout(function () { el.classList.add("is-developed"); }, 180 + i * 220);
    });
  }

  /* ---- booking form ---- */
  var form = document.getElementById("booking-form");
  if (!form) return;

  var statusEl = document.getElementById("form-status");
  var submitBtn = document.getElementById("form-submit");
  var successEl = document.getElementById("book-success");

  function setStatus(msg, isError) {
    if (!statusEl) return;
    statusEl.textContent = msg || "";
    statusEl.classList.toggle("is-error", !!isError);
  }

  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    setStatus("");

    // native validation
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // guard: unconfigured endpoint
    var keyField = form.querySelector('input[name="access_key"]');
    if (keyField && /REPLACE_WITH/.test(keyField.value)) {
      setStatus("Form not connected yet — add your Web3Forms access key (see README).", true);
      return;
    }

    submitBtn.classList.add("is-loading");
    var labelEl = submitBtn.querySelector(".btn__label");
    if (labelEl) labelEl.textContent = "Sending…";

    var data = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" }
    })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { ok: res.ok, body: j }; }); })
      .then(function (r) {
        if (r.ok && (r.body.success === true || r.body.success === undefined)) {
          if (successEl) {
            form.hidden = true;
            successEl.hidden = false;
            successEl.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
          } else {
            setStatus("Thanks — your inquiry is in. We'll reply within 24 hours.");
          }
        } else {
          throw new Error((r.body && r.body.message) || "Submission failed");
        }
      })
      .catch(function () {
        setStatus("Something went wrong. Email hello@futurenostalgia.ca and I'll sort it.", true);
      })
      .finally(function () {
        submitBtn.classList.remove("is-loading");
        if (labelEl) labelEl.textContent = "Send inquiry";
      });
  });
})();
