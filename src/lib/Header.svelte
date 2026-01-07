<script>
    import { onMount, tick } from "svelte";
  
    export let name = "Ryan LeRoy";
    export let picture = "./profile.png";
    export let socials = [];
  
    const socialIcons = {
      github: "fab fa-github",
      linkedin: "fab fa-linkedin-in",
      instagram: "fab fa-instagram",
      email: "fas fa-envelope"
    };
  
    let svgEl;
  
    // --- Scene / camera ---
    let viewW = 1400;
    const VIEW_H = 420;
  
    // Plate geometry (scene coords)
    const PLATE_W = 604;
    const PLATE_RECT_X = 78; // rect x within plateGroup
    let plateX = 0;
  
    // Robot scaling request
    const ROBOT_SCALE = 1.5;
  
    const FONT_URL = "/fonts/Roboto-Regular.ttf";
  
    function computeSceneWidth() {
      const w = window.innerWidth || 1024;
  
      // Slightly tighter than before => everything renders bigger (plate + text + robot path space).
      if (w <= 640) viewW = 760;
      else if (w <= 1024) viewW = 1150;
      else viewW = 2100;
  
      // Center the actual plate rect in the viewBox:
      // plateRectCenter = plateX + PLATE_RECT_X + PLATE_W/2 == viewW/2
      plateX = Math.round(viewW / 2 - (PLATE_RECT_X + PLATE_W / 2));
    }
  
    onMount(() => {
      let raf = 0;
      let cancelled = false;
  
      const cleanup = () => {
        cancelled = true;
        if (raf) cancelAnimationFrame(raf);
      };
  
      (async () => {
        computeSceneWidth();
        await tick();
        if (!svgEl) return;
  
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
        if (reduceMotion) return;
  
        // Robot visible on desktop only.
        const showRobot = window.matchMedia?.("(min-width: 1024px)")?.matches;
  
        const VIEW_W = viewW;
        const PLATE_X = plateX;
  
        // Scale speeds with viewBox so motion feels similar.
        const SPEED_SCALE = VIEW_W / 1400;
        const CART_SPEED_PX_PER_MS = 1.25 * SPEED_SCALE;
        const DRAW_SPEED_PX_PER_MS = 0.75 * SPEED_SCALE;
  
        // --- Robot geometry (matches markup BEFORE scaling) ---
        const ROBOT_WRAP_Y = 50; // <g id="robotWrap" transform="translate(0 50)">
        const ARM_BASE_X = 100;  // <g id="arm" transform="translate(100 170)">
        const ARM_BASE_Y = 170;
  
        const L1 = 110;
        const L2 = 130;
  
        // Use scaled geometry for IK, since we scale the robot group.
        const ARM_BASE_X_S = ARM_BASE_X * ROBOT_SCALE;
        const ARM_BASE_Y_S = ARM_BASE_Y * ROBOT_SCALE;
        const L1S = L1 * ROBOT_SCALE;
        const L2S = L2 * ROBOT_SCALE;
  
        // Park robot "next to" the nameplate (to the right of plate rect).
        const PLATE_RIGHT = PLATE_X + PLATE_RECT_X + PLATE_W;
        const ROBOT_PARK_X = PLATE_RIGHT + 30; // small gap
  
        const ROBOT_OFF_X = VIEW_W + 220; // a bit further since robot is bigger
        const T_IN_MS = 650;
  
        // --- Paint / mask ---
        const BRUSH_R = 12.5;
        const X_STEP = BRUSH_R * 0.85;
        const Y_STEP = BRUSH_R * 1.0;
        const BBOX_PAD = BRUSH_R * 1.3;
  
        const NS = "http://www.w3.org/2000/svg";
        const svgNode = (tag) => document.createElementNS(NS, tag);
        const clamp01 = (x) => Math.max(0, Math.min(1, x));
        const lerp = (a, b, t) => a + (b - a) * t;
  
        const mod = await import("opentype.js");
        const opentype = mod?.default ?? mod;
  
        const maskDefs = svgEl.querySelector("#maskDefs");
        const nameFillGroup = svgEl.querySelector("#nameFillGroup");
        const titleFillGroup = svgEl.querySelector("#titleFillGroup");
  
        const robotWrap = svgEl.querySelector("#robotWrap");
        const robot = svgEl.querySelector("#robot");
        const upper = svgEl.querySelector("#upper");
        const lower = svgEl.querySelector("#lower");
  
        if (!maskDefs || !nameFillGroup || !titleFillGroup || !robotWrap || !robot || !upper || !lower) return;
        if (cancelled) return;
  
        // Hide robot visuals on mobile, but keep stamping logic active.
        robotWrap.style.opacity = showRobot ? "1" : "0";
  
        nameFillGroup.style.opacity = "0";
        titleFillGroup.style.opacity = "0";
  
        function setRobotX(x) {
          // IMPORTANT: scale robot graphics; IK math below accounts for this.
          robot.setAttribute("transform", `translate(${x} 0) scale(${ROBOT_SCALE})`);
        }
  
        function solveIK(tx, ty) {
          const d = Math.hypot(tx, ty);
          const maxReach = L1S + L2S - 1e-6;
          const minReach = Math.abs(L1S - L2S) + 1e-6;
          const dd = Math.max(minReach, Math.min(maxReach, d));
  
          const cos2 = (dd * dd - L1S * L1S - L2S * L2S) / (2 * L1S * L2S);
          const a2 = Math.acos(Math.max(-1, Math.min(1, cos2)));
  
          const k1 = L1S + L2S * Math.cos(a2);
          const k2 = L2S * Math.sin(a2);
          const a1 = Math.atan2(ty, tx) - Math.atan2(k2, k1);
          return { a1, a2 };
        }
  
        function setArmAngles(a1, a2) {
          upper.setAttribute("transform", `rotate(${(a1 * 180) / Math.PI})`);
          lower.setAttribute("transform", `rotate(${(a2 * 180) / Math.PI})`);
        }
  
        // Requested park pose: upper straight up; lower towards plate.
        function setDesktopParkPose() {
          setArmAngles(-Math.PI / 2, -Math.PI * 0.70);
        }
  
        function loadFont(url) {
          return new Promise((resolve, reject) => {
            opentype.load(url, (err, font) => (err ? reject(err) : resolve(font)));
          });
        }
  
        function clearGroup(el) {
          el.textContent = "";
        }
  
        function createGlyphMask(maskId) {
          const mask = svgNode("mask");
          mask.setAttribute("id", maskId);
          mask.setAttribute("maskUnits", "userSpaceOnUse");
          mask.setAttribute("x", "0");
          mask.setAttribute("y", "0");
          mask.setAttribute("width", String(VIEW_W));
          mask.setAttribute("height", String(VIEW_H));
  
          const bg = svgNode("rect");
          bg.setAttribute("x", "0");
          bg.setAttribute("y", "0");
          bg.setAttribute("width", String(VIEW_W));
          bg.setAttribute("height", String(VIEW_H));
          bg.setAttribute("fill", "black");
  
          const stamps = svgNode("g");
          stamps.setAttribute("fill", "white");
  
          mask.appendChild(bg);
          mask.appendChild(stamps);
          maskDefs.appendChild(mask);
          return stamps;
        }
  
        function stampCircle(stampsEl, x, y, r) {
          const c = svgNode("circle");
          c.setAttribute("cx", String(x));
          c.setAttribute("cy", String(y));
          c.setAttribute("r", String(r));
          stampsEl.appendChild(c);
        }
  
        function finalizeGlyphMask(stampsEl) {
          const rect = svgNode("rect");
          rect.setAttribute("x", "0");
          rect.setAttribute("y", "0");
          rect.setAttribute("width", String(VIEW_W));
          rect.setAttribute("height", String(VIEW_H));
          rect.setAttribute("fill", "white");
          stampsEl.appendChild(rect);
        }
  
        function buildWords(font, fullText, opts) {
          const { groupEl, maskPrefix, textBox, baselineY, fontSize, color, stroke = null, strokeWidth = 0 } = opts;
  
          clearGroup(groupEl);
  
          const words = fullText.trim().split(/\s+/);
          const spaceW = font.getAdvanceWidth(" ", fontSize, { kerning: true });
          const wordWidths = words.map((w) => font.getAdvanceWidth(w, fontSize, { kerning: true }));
          const totalW = wordWidths.reduce((a, b) => a + b, 0) + spaceW * Math.max(0, words.length - 1);
  
          let xCursor = textBox.x + (textBox.w - totalW) / 2;
          const scale = fontSize / font.unitsPerEm;
  
          const glyphItems = [];
          const wordInfos = [];
          let maskId = 0;
  
          for (let wi = 0; wi < words.length; wi++) {
            const w = words[wi];
            const startIndex = glyphItems.length;
  
            const glyphs = font.stringToGlyphs(w);
  
            for (let gi = 0; gi < glyphs.length; gi++) {
              const g = glyphs[gi];
  
              const pathObj = g.getPath(xCursor, baselineY, fontSize, { kerning: true }, font);
              const d = pathObj.toPathData(2);
  
              const stampsEl = createGlyphMask(`${maskPrefix}${maskId}`);
  
              const p = svgNode("path");
              p.setAttribute("d", d);
              p.setAttribute("fill", color);
              if (stroke) {
                p.setAttribute("stroke", stroke);
                p.setAttribute("stroke-width", String(strokeWidth));
                p.setAttribute("paint-order", "stroke fill");
                p.setAttribute("stroke-linejoin", "round");
              }
              p.setAttribute("mask", `url(#${maskPrefix}${maskId})`);
              groupEl.appendChild(p);
  
              const bbox = p.getBBox();
              glyphItems.push({ stampsEl, bbox, wordIndex: wi });
  
              const adv = (g.advanceWidth || 0) * scale;
              const kern = gi < glyphs.length - 1 ? font.getKerningValue(g, glyphs[gi + 1]) * scale : 0;
              xCursor += adv + kern;
  
              maskId++;
            }
  
            const endIndex = glyphItems.length - 1;
  
            let minX = Infinity, maxX = -Infinity;
            for (let k = startIndex; k <= endIndex; k++) {
              const b = glyphItems[k].bbox;
              minX = Math.min(minX, b.x);
              maxX = Math.max(maxX, b.x + b.width);
            }
  
            wordInfos.push({
              glyphIndices: Array.from({ length: endIndex - startIndex + 1 }, (_, i) => startIndex + i),
              minX,
              maxX,
              centerX: (minX + maxX) / 2
            });
  
            if (wi < words.length - 1) xCursor += spaceW;
          }
  
          return { glyphItems, wordInfos };
        }
  
        function buildGlyphScanSegments(glyphItem, scanStartRight = false) {
          const b = glyphItem.bbox;
  
          const x0 = b.x - BBOX_PAD;
          const x1 = b.x + b.width + BBOX_PAD;
          const y0 = b.y - BBOX_PAD;
          const y1 = b.y + b.height + BBOX_PAD;
  
          const yStart = y0 + BRUSH_R * 0.5;
          const yEnd = y1 - BRUSH_R * 0.5;
  
          const segs = [];
          let total = 0;
  
          const add = (a, bb) => {
            const len = Math.hypot(bb.x - a.x, bb.y - a.y);
            if (len < 1e-6) return;
            total += len;
            segs.push({ a, b: bb, len, cumEnd: total });
          };
  
          let leftToRight = !scanStartRight;
          let cur = {
            x: scanStartRight ? x1 - BRUSH_R * 0.5 : x0 + BRUSH_R * 0.5,
            y: yStart
          };
  
          for (let y = yStart; y <= yEnd + 1e-6; y += Y_STEP) {
            const xa = leftToRight ? x0 + BRUSH_R * 0.5 : x1 - BRUSH_R * 0.5;
            const xb = leftToRight ? x1 - BRUSH_R * 0.5 : x0 + BRUSH_R * 0.5;
  
            add(cur, { x: xa, y });
            cur = { x: xa, y };
  
            const steps = Math.max(1, Math.ceil(Math.abs(xb - xa) / X_STEP));
            for (let s = 1; s <= steps; s++) {
              const t = s / steps;
              const nx = lerp(xa, xb, t);
              const next = { x: nx, y };
              add(cur, next);
              cur = next;
            }
  
            leftToRight = !leftToRight;
          }
  
          return { segs, totalLen: total };
        }
  
        function sampleSegments(prog, dist) {
          const d = Math.max(0, Math.min(prog.totalLen, dist));
          let prev = 0;
          for (const s of prog.segs) {
            if (d <= s.cumEnd) {
              const local = d - prev;
              const t = local / s.len;
              return { x: lerp(s.a.x, s.b.x, t), y: lerp(s.a.y, s.b.y, t) };
            }
            prev = s.cumEnd;
          }
          const last = prog.segs[prog.segs.length - 1];
          return { x: last.b.x, y: last.b.y };
        }
  
        // ---- Run ----
        setRobotX(showRobot ? ROBOT_PARK_X : ROBOT_OFF_X);
        if (showRobot) setDesktopParkPose();
        else setArmAngles(0, 0);
  
        let font;
        try {
          font = await loadFont(FONT_URL);
        } catch {
          return;
        }
        if (cancelled) return;
  
        maskDefs.textContent = "";
  
        // Slightly bigger than prior version
        const nameTextBox = { x: PLATE_X + 130, y: 0, w: 500, h: 96 };
        const titleTextBox = { x: PLATE_X + 140, y: 0, w: 480, h: 64 };
  
        const pass1 = buildWords(font, name, {
          groupEl: nameFillGroup,
          maskPrefix: "n",
          textBox: nameTextBox,
          baselineY: 146,
          fontSize: 94,
          color: "#111"
        });
  
        const pass2 = buildWords(font, "Robotics Engineer", {
          groupEl: titleFillGroup,
          maskPrefix: "t",
          textBox: titleTextBox,
          baselineY: 242,
          fontSize: 50,
          color: "#ffffff",
          stroke: "#111",
          strokeWidth: 2
        });
  
        // Avoid first-frame mask leaks
        svgEl.getBoundingClientRect();
        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
        nameFillGroup.style.opacity = "1";
        titleFillGroup.style.opacity = "1";
  
        function parksForPass1(wordInfos) {
          return wordInfos.map((w) => {
            const desired = w.centerX - ARM_BASE_X_S;
            return Math.max(-200, Math.min(VIEW_W - 180, desired));
          });
        }
  
        // Less sideways movement for the title (and less risk of overlap since robot is bigger).
        function parksForPass2(wordInfos) {
          const margin = 85; // reduced
          return wordInfos.map((w) => {
            const desired = w.maxX - ARM_BASE_X_S + margin;
            return Math.max(-200, Math.min(VIEW_W - 180, desired));
          });
        }
  
        const parks1 = parksForPass1(pass1.wordInfos);
        const parks2 = parksForPass2(pass2.wordInfos);
  
        // State machine
        let phase = "in";
        let t0 = performance.now();
  
        let robotX = showRobot ? ROBOT_PARK_X : ROBOT_OFF_X;
  
        let active = 1;
        let glyphItems = pass1.glyphItems;
        let wordInfos = pass1.wordInfos;
        let parks = parks1;
  
        let wordIdx = 0;
  
        let travelFrom = robotX;
        let travelTo = parks[0] ?? (PLATE_X + PLATE_W + 140);
        let travelDur = T_IN_MS;
  
        let glyphPtr = 0;
        let glyphProg = null;
        let glyphDist = 0;
        let lastPt = null;
        let lastT = performance.now();
  
        function beginTravel(toX) {
          phase = "travel";
          t0 = performance.now();
          travelFrom = robotX;
          travelTo = toX;
          travelDur = Math.max(220, Math.abs(travelTo - travelFrom) / CART_SPEED_PX_PER_MS);
        }
  
        function beginDrawWord() {
          phase = "drawWord";
          glyphPtr = 0;
          glyphProg = null;
          glyphDist = 0;
          lastPt = null;
          lastT = performance.now();
        }
  
        function switchToPass2() {
          active = 2;
          glyphItems = pass2.glyphItems;
          wordInfos = pass2.wordInfos;
          parks = parks2;
          wordIdx = 0;
          beginTravel(parks[0] ?? (PLATE_X + PLATE_W));
        }
  
        function finishAndRestOrExit() {
          if (showRobot) {
            beginTravel(ROBOT_PARK_X);
            phase = "restingTravel";
          } else {
            beginTravel(ROBOT_OFF_X);
            phase = "out";
          }
        }
  
        function tickAnim(now) {
          if (cancelled) return;
  
          if (phase === "in") {
            const p = clamp01((now - t0) / T_IN_MS);
            const startX = showRobot ? ROBOT_PARK_X : ROBOT_OFF_X;
            const inToX = parks1[0] ?? (PLATE_X + PLATE_W);
            robotX = lerp(startX, inToX, p);
            setRobotX(robotX);
  
            const { a1, a2 } = solveIK(170 * ROBOT_SCALE, -20 * ROBOT_SCALE);
            setArmAngles(a1, a2);
  
            if (p >= 1) beginDrawWord();
            raf = requestAnimationFrame(tickAnim);
            return;
          }
  
          if (phase === "travel" || phase === "out" || phase === "restingTravel") {
            const p = clamp01((now - t0) / travelDur);
            robotX = lerp(travelFrom, travelTo, p);
            setRobotX(robotX);
  
            if (phase === "restingTravel") {
              setDesktopParkPose();
            } else {
              const { a1, a2 } = solveIK(150 * ROBOT_SCALE, -10 * ROBOT_SCALE);
              setArmAngles(a1, a2);
            }
  
            if (p >= 1) {
              if (phase === "out") {
                robotWrap.remove();
                return;
              }
              if (phase === "restingTravel") {
                setRobotX(ROBOT_PARK_X);
                setDesktopParkPose();
                return;
              }
              beginDrawWord();
            }
  
            raf = requestAnimationFrame(tickAnim);
            return;
          }
  
          // drawWord
          const gIndices = wordInfos[wordIdx]?.glyphIndices ?? [];
          if (glyphPtr >= gIndices.length) {
            for (const idx of gIndices) finalizeGlyphMask(glyphItems[idx].stampsEl);
  
            if (wordIdx < wordInfos.length - 1) {
              wordIdx++;
              beginTravel(parks[wordIdx]);
            } else {
              if (active === 1) switchToPass2();
              else finishAndRestOrExit();
            }
  
            raf = requestAnimationFrame(tickAnim);
            return;
          }
  
          const curGlyph = glyphItems[gIndices[glyphPtr]];
  
          if (!glyphProg) {
            const scanStartRight = active === 2;
            glyphProg = buildGlyphScanSegments(curGlyph, scanStartRight);
            glyphDist = 0;
            lastPt = null;
  
            if (glyphProg.totalLen < 1) {
              finalizeGlyphMask(curGlyph.stampsEl);
              glyphProg = null;
              glyphPtr++;
              raf = requestAnimationFrame(tickAnim);
              return;
            }
          }
  
          const dt = Math.min(40, Math.max(0, now - lastT));
          lastT = now;
  
          glyphDist = Math.min(glyphProg.totalLen, glyphDist + DRAW_SPEED_PX_PER_MS * dt);
          const pt = sampleSegments(glyphProg, glyphDist);
  
          // Convert scene->robot-local, accounting for robot scale:
          // robot origin at (robotX, 0), arm base at (robotX + s*ARM_BASE_X, s*ARM_BASE_Y) plus robotWrapY.
          const tx = pt.x - (robotX + ARM_BASE_X_S);
          const ty = pt.y - ROBOT_WRAP_Y - ARM_BASE_Y_S;
  
          const { a1, a2 } = solveIK(tx, ty);
          setArmAngles(a1, a2);
  
          if (!lastPt) {
            stampCircle(curGlyph.stampsEl, pt.x, pt.y, BRUSH_R);
          } else {
            const dx = pt.x - lastPt.x;
            const dy = pt.y - lastPt.y;
            const dseg = Math.hypot(dx, dy);
            const steps = Math.max(1, Math.ceil(dseg / (BRUSH_R * 0.4)));
            for (let i = 1; i <= steps; i++) {
              const t = i / steps;
              stampCircle(curGlyph.stampsEl, lastPt.x + dx * t, lastPt.y + dy * t, BRUSH_R);
            }
          }
          lastPt = pt;
  
          if (glyphDist >= glyphProg.totalLen - 1e-3) {
            finalizeGlyphMask(curGlyph.stampsEl);
            glyphProg = null;
            glyphPtr++;
          }
  
          raf = requestAnimationFrame(tickAnim);
        }
  
        raf = requestAnimationFrame(tickAnim);
      })();
  
      return cleanup;
    });
  </script>
  
  <header class="w-full bg-white dark:bg-gray-900 transition-colors duration-300 overflow-x-clip">
    <div class="mx-auto w-full max-w-6xl px-6 sm:px-10 py-2 sm:py-6 lg:py-10">
      <div class="flex flex-col items-center lg:flex-row lg:justify-center gap-2 sm:gap-6 lg:gap-10">
        <img
  src={picture}
  alt={`${name}'s profile`}
  class="shrink-0 w-40 h-40 sm:w-56 sm:h-56 lg:w-80 lg:h-80
         translate-y-20 md:translate-y-0
         lg:translate-x-28
         rounded-full object-cover shadow-xl border-4 border-gray-100 dark:border-gray-800"
  style="border-color: rgba(255, 255, 255, 0.7);"
/>

        <div class="relative w-full max-w-[880px] lg:w-[880px] flex-none">
          <!-- Bigger viewport so everything reads larger -->
          <div class="relative w-full h-[260px] sm:h-[380px] lg:h-[560px]">
            <svg
              bind:this={svgEl}
              class="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-full pointer-events-none"
              style="overflow: visible;"
              viewBox={`0 0 ${viewW} ${VIEW_H}`}
              preserveAspectRatio="xMidYMid meet"
              aria-label="Nameplate robot writer"
            >
              <defs>
                <linearGradient id="plateGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stop-color="#f4f4f4" />
                  <stop offset="0.5" stop-color="#e7e7e7" />
                  <stop offset="1" stop-color="#f8f8f8" />
                </linearGradient>
  
                <filter id="plateShadow" x="-20%" y="-40%" width="140%" height="180%">
                  <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#000" flood-opacity="0.12" />
                </filter>
  
                <g id="maskDefs"></g>
              </defs>
  
              <g id="plateGroup" transform={`translate(${plateX} 0)`}>
                <g filter="url(#plateShadow)">
                  <rect x="78" y="58" width="604" height="112" rx="18" fill="url(#plateGrad)" stroke="#cfcfcf" />
                  <circle cx="116" cy="114" r="7" fill="#c9c9c9" stroke="#b9b9b9" />
                  <circle cx="644" cy="114" r="7" fill="#c9c9c9" stroke="#b9b9b9" />
                  <line x1="112" y1="114" x2="120" y2="114" stroke="#9f9f9f" stroke-width="2" stroke-linecap="round" />
                  <line x1="640" y1="114" x2="648" y2="114" stroke="#9f9f9f" stroke-width="2" stroke-linecap="round" />
                </g>
              </g>
  
              <g id="nameFillGroup" style="opacity:0"></g>
              <g id="titleFillGroup" style="opacity:0"></g>
  
              <g id="robotWrap" transform="translate(0 50)">
                <g id="robot" class="reduce-hide" transform="translate(920 0)">
                  <g opacity="0.98">
                    <rect x="0" y="186" width="200" height="30" rx="10" fill="#2b2f36"></rect>
                    <rect x="22" y="148" width="156" height="48" rx="14" fill="#3a404a"></rect>
  
                    <circle cx="38" cy="230" r="18" fill="#15181d"></circle>
                    <circle cx="38" cy="230" r="6.5" fill="#6d7686"></circle>
  
                    <circle cx="161" cy="230" r="18" fill="#15181d"></circle>
                    <circle cx="161" cy="230" r="6.5" fill="#6d7686"></circle>
                  </g>
  
                  <g id="arm" transform="translate(100 170)">
                    <circle r="16" fill="#1f232b"></circle>
                    <circle r="5" fill="#6d7686"></circle>
  
                    <g id="upper">
                      <rect x="0" y="-11" width="110" height="22" rx="11" fill="#596170"></rect>
  
                      <g id="elbow" transform="translate(110 0)">
                        <circle r="13" fill="#1f232b"></circle>
                        <circle r="4.5" fill="#6d7686"></circle>
  
                        <g id="lower">
                          <rect x="0" y="-10" width="130" height="20" rx="10" fill="#6a7386"></rect>
  
                          <g id="tool" transform="translate(130 0)">
                            <rect x="-9" y="-15" width="18" height="30" rx="6" fill="#1f232b"></rect>
                            <circle id="penTip" cx="0" cy="0" r="5" fill="#ffcc00"></circle>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
              </g>
            </svg>
  
            <!-- Socials OVERLAY: sits close to the title text area, not below with big margin -->
            <div class="absolute left-1/2 top-[74%] -translate-x-1/2 z-10 flex space-x-7 sm:space-x-8 pointer-events-auto">
              {#each socials as social (social.url)}
                <a
                  href={social.url}
                  aria-label={`Link to ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-black dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-200 text-3xl sm:text-4xl"
                >
                  <i class="{social.icon || socialIcons[String(social.name).toLowerCase()] || 'fas fa-link'} fa-sm {social.className || ''}"></i>
                </a>
              {/each}
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
  