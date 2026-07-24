import { gsap } from "gsap";

export class TimelineController {
  private timeline = gsap.timeline({
    paused: true,
  });

  play() {
    this.timeline.play();
  }

  pause() {
    this.timeline.pause();
  }

  resume() {
    this.timeline.resume();
  }

  restart() {
    this.timeline.restart();
  }

  seek(label: string) {
    this.timeline.seek(label);
  }

  clear() {
    this.timeline.clear();
  }

  addLabel(label: string) {
    this.timeline.addLabel(label);
  }

  add(
    callback: () => void,
    position?: string | number
  ) {
    this.timeline.call(callback, [], position);
  }

  get instance() {
    return this.timeline;
  }
}

export const masterTimeline =
  new TimelineController();