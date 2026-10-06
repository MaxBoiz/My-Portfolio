import styles from "./MissionReportSequence.module.css";

type OrbitDigit = { el: HTMLDivElement; x: number; y: number; w: number; h: number };

// Ported from secure-vault-rebuild-v3/script.js: original timings and trajectory.
// The sequence is decorative and does not perform authentication or a download.
export function runMissionReportSequence(card: HTMLElement, onComplete: () => void) {
  function required<T extends Element>(selector: string): T {
    const element = card.querySelector<T>(selector);
    if (!element) throw new Error("Missing mission sequence element: " + selector);
    return element;
  }

  const entryStage = required<HTMLElement>("[data-vault-entry]");
  const inputs = [...card.querySelectorAll<HTMLInputElement>("[data-vault-digit]")];
  const otpWrap = required<HTMLElement>("[data-vault-digits]");
  const orbitZone = required<HTMLElement>("[data-vault-orbit]");
  const cardFooter = required<HTMLElement>("[data-vault-footer]");
  const progressValue = required<SVGCircleElement>("[data-vault-progress-value]");
  const progressNumber = required<HTMLElement>("[data-vault-progress-number]");
  const progressShell = required<HTMLElement>("[data-vault-progress]");
  const successOrb = required<HTMLElement>("[data-vault-success-orb]");
  const verifyStage = required<HTMLElement>("[data-vault-verify]");
  const successStage = required<HTMLElement>("[data-vault-success]");
  const particles = required<HTMLElement>("[data-vault-particles]");
  const CIRCUMFERENCE = 2 * Math.PI * 47;
  let state: 'entry' | 'scatter' | 'verifying' | 'success' | 'cancelled' = 'entry';
  let timers: ReturnType<typeof setTimeout>[] = [];
  let animationFrame = 0;
  let activeAnimations: Animation[] = [];





  const ease = {
    outCubic: (t: number) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t: number) => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3)/2,
    outQuint: (t: number) => 1 - Math.pow(1 - t, 5),
    inQuint: (t: number) => t*t*t*t*t,
  };

  function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
  function rotatePoint(x: number, y: number, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return { x: x * cos - y * sin, y: x * sin + y * cos };
  }

  function later(fn: () => void, delay: number) {
    const id = setTimeout(fn, delay);
    timers.push(id);
    return id;
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }
  function stopAnimations() {
    activeAnimations.forEach(a => { try { a.cancel(); } catch {} });
    activeAnimations = [];
    cancelAnimationFrame(animationFrame);
  }
  function play(el: Element, frames: Keyframe[], options: KeyframeAnimationOptions) {
    const a = el.animate(frames, { fill: 'forwards', ...options });
    activeAnimations.push(a);
    return a;
  }
  function createOrbitDigits() {
    orbitZone.replaceChildren();
    const cardRect = card.getBoundingClientRect();
    return inputs.map((input,index) => {
      const r = input.getBoundingClientRect();
      const d = document.createElement('div');
      d.className = styles.orbitDigit;
      d.textContent = input.value;
      d.dataset.index = String(index);
      d.style.left = `${r.left - cardRect.left}px`;
      d.style.top = `${r.top - cardRect.top}px`;
      d.style.width = `${r.width}px`;
      d.style.height = `${r.height}px`;
      orbitZone.appendChild(d);
      return { el:d, x:r.left-cardRect.left, y:r.top-cardRect.top, w:r.width, h:r.height };
    });
  }

  function beginVerification() {
    if (state !== 'entry') return;
    state = 'scatter';
    inputs.forEach(i => i.blur());
    const clones = createOrbitDigits();

    // The source video spends ~1.55 s on a continuous spiral before verification.
    play(otpWrap,
      [{opacity:1, transform:'translate3d(-50%,0,0) scale(1)'},{opacity:0, transform:'translate3d(-50%,0,0) scale(.985)'}],
      { duration:120, easing:'ease-out' }
    );
    play(cardFooter,
      [{opacity:1, transform:'translateY(0)'},{opacity:.42, transform:'translateY(2px)'}],
      { duration:500, easing:'cubic-bezier(.22,.8,.2,1)' }
    );

    animateSpiral(clones, 1550, () => showVerifyStage());
  }

  function animateSpiral(clones: OrbitDigit[], duration: number, done: () => void) {
    const cardRect = card.getBoundingClientRect();
    const centerX = cardRect.width / 2;
    const centerY = 255;
    const start = performance.now();
    const initial = clones.map(c => ({
      ...c,
      cx: c.x + c.w / 2,
      cy: c.y + c.h / 2,
    }));

    // A clear centred cluster works better than blending directly into orbit.
    const clusterOffsets = [
      { x: -38, y: -24 },
      { x:  38, y: -24 },
      { x: -38, y:  24 },
      { x:  38, y:  24 },
    ];

    function frame(now: number) {
      if (state !== 'scatter') return;
      const raw = Math.min(1, (now - start) / duration);

      initial.forEach((c, i) => {
        const offset = clusterOffsets[i] || { x: 0, y: 0 };
        let desiredCx = c.cx;
        let desiredCy = c.cy;
        let spin = 0;
        let scale = 1;
        let opacity = 1;
        let blur = 0;

        if (raw <= 0.36) {
          // Phase 1: gather from the row into a tight cluster around the centre.
          const t1 = ease.inOutCubic(raw / 0.36);
          desiredCx = lerp(c.cx, centerX + offset.x, t1);
          desiredCy = lerp(c.cy, centerY + offset.y, t1);
          spin = lerp(0, (i % 2 ? -18 : 18), t1);
          scale = lerp(1, 0.98, t1);
        } else if (raw <= 0.84) {
          // Phase 2: once centred, rotate the whole cluster around a shared centre.
          const t2 = ease.inOutCubic((raw - 0.36) / 0.48);
          const angle = t2 * Math.PI * 1.55;
          const shrink = lerp(1, 0.52, t2);
          const rotated = rotatePoint(offset.x * shrink, offset.y * shrink, angle);
          desiredCx = centerX + rotated.x;
          desiredCy = centerY + rotated.y;
          spin = lerp((i % 2 ? -18 : 18), (i % 2 ? -1 : 1) * 210, t2);
          scale = lerp(0.98, 0.78, t2);
        } else {
          // Phase 3: collapse the rotating cluster into the exact centre.
          const t3 = ease.inQuint((raw - 0.84) / 0.16);
          const angle = Math.PI * 1.55 + t3 * Math.PI * 0.5;
          const shrink = lerp(0.52, 0.10, t3);
          const rotated = rotatePoint(offset.x * shrink, offset.y * shrink, angle);
          desiredCx = centerX + rotated.x * (1 - t3);
          desiredCy = centerY + rotated.y * (1 - t3);
          spin = lerp((i % 2 ? -1 : 1) * 210, (i % 2 ? -1 : 1) * 270, t3);
          scale = lerp(0.78, 0.14, t3);
          opacity = 1 - ease.outCubic(t3);
          blur = 2.2 * t3;
        }

        const tx = desiredCx - c.cx;
        const ty = desiredCy - c.cy;
        c.el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${spin}deg) scale(${Math.max(0.12, scale)})`;
        c.el.style.opacity = String(Math.max(0, opacity));
        c.el.style.filter = `blur(${blur}px)`;
      });

      if (raw < 1) {
        animationFrame = requestAnimationFrame(frame);
      } else {
        orbitZone.replaceChildren();
        done();
      }
    }

    animationFrame = requestAnimationFrame(frame);
  }

  function showVerifyStage() {
    if (state !== 'scatter') return;
    state = 'verifying';
    verifyStage.style.visibility = 'visible';
    verifyStage.setAttribute('aria-hidden','false');

    // Cross-fade headings instead of snapping visibility.
    play(entryStage.querySelector<HTMLElement>('[data-vault-copy]')!,
      [{opacity:1, transform:'translateY(0) scale(1)'},{opacity:0, transform:'translateY(-4px) scale(.992)'}],
      {duration:240,easing:'cubic-bezier(.4,0,.6,1)'}
    );
    play(verifyStage,
      [{opacity:0},{opacity:1}],
      {duration:320,easing:'ease-out'}
    );
    play(verifyStage.querySelector<HTMLElement>('[data-vault-copy]')!,
      [{opacity:0, transform:'translateY(4px)'},{opacity:1, transform:'translateY(0)'}],
      {duration:420,easing:'cubic-bezier(.16,1,.3,1)'}
    );
    play(progressShell,
      [{opacity:0, transform:'translate3d(-50%,6px,0) scale(.88)'},{opacity:1, transform:'translate3d(-50%,0,0) scale(1)'}],
      {duration:460,easing:'cubic-bezier(.16,1,.3,1)',delay:70}
    );

    later(runProgress, 120);
  }

  function setProgress(value: number) {
    const bounded = Math.max(0, Math.min(100, value));
    progressNumber.textContent = String(Math.round(bounded));
    progressValue.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - bounded/100));
  }

  function runProgress() {
    if (state !== 'verifying') return;
    const start = performance.now();
    const duration = 1780;

    // The video moves quickly at first and naturally settles near 99.
    function progressCurve(t: number) {
      const fast = 1 - Math.exp(-4.9*t);
      return Math.min(99, fast*102.2);
    }

    function frame(now: number) {
      if (state !== 'verifying') return;
      const t = Math.min(1,(now-start)/duration);
      setProgress(progressCurve(t));
      if (t < 1) animationFrame = requestAnimationFrame(frame);
      else {
        setProgress(99);
        later(showVerificationPulse, 120);
      }
    }
    animationFrame = requestAnimationFrame(frame);
  }

  function showVerificationPulse() {
    if (state !== 'verifying') return;

    play(progressShell,
      [
        {opacity:1, transform:'translate3d(-50%,0,0) scale(1)', filter:'blur(0px)'},
        {opacity:.12, transform:'translate3d(-50%,0,0) scale(.72)', filter:'blur(1px)'},
        {opacity:0, transform:'translate3d(-50%,0,0) scale(.52)', filter:'blur(2px)'}
      ],
      {duration:300,easing:'cubic-bezier(.4,0,1,1)'}
    );

    play(successOrb,
      [
        {opacity:0, transform:'scale(.16)', filter:'blur(3px)'},
        {opacity:1, transform:'scale(1.18)', filter:'blur(0px)', offset:.72},
        {opacity:1, transform:'scale(1)', filter:'blur(0px)'}
      ],
      {duration:560,easing:'cubic-bezier(.16,1,.3,1)',delay:70}
    );
    play(successOrb.querySelector<HTMLElement>('[data-vault-check]')!,
      [{opacity:0, transform:'scale(.55)'},{opacity:1, transform:'scale(1)'}],
      {duration:300,easing:'cubic-bezier(.16,1,.3,1)',delay:270}
    );

    later(showSuccess, 430);
  }

  function showSuccess() {
    if (state !== 'verifying') return;
    state = 'success';
    card.classList.add(styles.isSuccess);
    successStage.style.visibility = 'visible';
    successStage.setAttribute('aria-hidden','false');

    buildParticles();

    play(verifyStage.querySelector<HTMLElement>('[data-vault-copy]')!,
      [{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(-3px)'}],
      {duration:200,easing:'ease-in'}
    );
    play(verifyStage,
      [{opacity:1},{opacity:0}],
      {duration:240,easing:'ease-in'}
    );
    play(successStage,
      [{opacity:0},{opacity:1}],
      {duration:330,easing:'ease-out',delay:80}
    );
    play(successStage.querySelector<HTMLElement>('[data-vault-copy]')!,
      [{opacity:0,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],
      {duration:430,easing:'cubic-bezier(.16,1,.3,1)',delay:80}
    );
    play(successStage.querySelector<HTMLElement>('[data-vault-success-core]')!,
      [
        {opacity:0,transform:'scale(.52)'},
        {opacity:1,transform:'scale(1.09)',offset:.72},
        {opacity:1,transform:'scale(1)'}
      ],
      {duration:560,easing:'cubic-bezier(.16,1,.3,1)',delay:170}
    );
    play(successStage.querySelector<HTMLElement>('[data-vault-pill]')!,
      [{opacity:0,transform:'translate3d(-50%,7px,0)'},{opacity:1,transform:'translate3d(-50%,0,0)'}],
      {duration:400,easing:'cubic-bezier(.16,1,.3,1)',delay:500}
    );
    play(cardFooter,[{opacity:.42},{opacity:0}],{duration:250,easing:'ease-out'});
    later(onComplete, 1700);
  }

  function buildParticles() {
    particles.replaceChildren();
    const points = [
      [8,18,-10,-20],[18,52,-18,8],[24,82,-20,22],[35,30,-12,-25],
      [39,72,-6,22],[47,11,0,-26],[52,89,0,27],[61,24,10,-22],
      [65,73,12,21],[74,44,17,-4],[82,18,18,-18],[89,68,22,14],
      [12,66,-17,15],[30,49,-13,1],[70,57,14,5],[92,34,22,-9]
    ];
    points.forEach(([x,y,dx,dy],index) => {
      const dot = document.createElement('i');
      dot.className = styles.particle;
      dot.style.left = `${x}%`;
      dot.style.top = `${y}%`;
      particles.appendChild(dot);
      play(dot,
        [
          {opacity:0,transform:'translate3d(0,7px,0) scale(.45)'},
          {opacity:.72,transform:`translate3d(${dx*.25}px,${dy*.25}px,0) scale(1)`,offset:.22},
          {opacity:0,transform:`translate3d(${dx}px,${dy}px,0) scale(.15)`}
        ],
        {duration:920+index*8,easing:'cubic-bezier(.2,.75,.25,1)',delay:170+index*24}
      );
    });
  }


  // Same auto-fill as the reference's ?demo=1; no OTP input is required.
  const demoDigits = "2003";
  demoDigits.split("").forEach((digit, index) => {
    later(() => {
      if (state !== "entry") return;
      inputs.forEach(input => input.classList.remove(styles.active));
      inputs[index].value = digit;
      inputs[index].classList.add(styles.filled, styles.active);
      if (index === demoDigits.length - 1) later(beginVerification, 120);
    }, 420 + index * 420);
  });

  return () => {
    state = "cancelled";
    clearTimers();
    stopAnimations();
    card.getAnimations({ subtree: true }).forEach(animation => animation.cancel());
    card.classList.remove(styles.isSuccess);
    orbitZone.replaceChildren();
    particles.replaceChildren();
    inputs.forEach(input => {
      input.value = "";
      input.classList.remove(styles.filled, styles.active);
    });
    verifyStage.style.visibility = "hidden";
    successStage.style.visibility = "hidden";
    verifyStage.setAttribute("aria-hidden", "true");
    successStage.setAttribute("aria-hidden", "true");
    setProgress(0);
  };
}
