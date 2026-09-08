import { gsap } from "@/lib/gsap";

/** A "Jarvis is typing" bubble (three bouncing dots). Same classes as a message bubble + .typing. */
export function typingBubble(cls: string) {
  const t = document.createElement("div");
  t.className = `${cls} typing`;
  t.setAttribute("aria-hidden", "true");
  t.innerHTML = "<i></i><i></i><i></i>";
  gsap.to(t.querySelectorAll("i"), { y: -4, duration: 0.28, repeat: -1, yoyo: true, stagger: 0.12, ease: "sine.inOut" });
  return t;
}

/** A chat plays itself: Jarvis "types" (the dots appear before its message), then each message pops in. */
export function playChat(tl: gsap.core.Timeline, msgs: HTMLElement[], typing: HTMLElement, isJarvis: (m: HTMLElement) => boolean) {
  gsap.set(msgs, { opacity: 0, y: 14, scale: 0.96 });
  gsap.set(typing, { opacity: 0 });
  msgs.forEach((m) => {
    if (isJarvis(m)) {
      tl.call(() => { m.before(typing); }).to(typing, { opacity: 1, duration: 0.25 }, "+=.1").to({}, { duration: 0.9 }).to(typing, { opacity: 0, duration: 0.15 });
    } else {
      tl.to({}, { duration: 0.55 });
    }
    tl.to(m, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)" });
  });
  tl.call(() => typing.remove());
}
