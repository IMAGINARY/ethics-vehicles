export default class Sound {
  constructor(...mediaFiles) {
    this.media = mediaFiles.map((arg) => new Audio(arg));
  }

  getAudio() {
    const index = Math.floor(Math.random() * Math.floor(this.media.length));
    return this.media[index];
  }

  play() {
    this.getAudio()
      .play();
  }
}

export const Sounds = {
  crash500ms: new Sound('assets/audio/crash_500ms.mp3'),
  crash250ms: new Sound('assets/audio/crash_250ms.mp3'),
  carIdling2000ms: new Sound('assets/audio/passing_by_1_2000ms.mp3',
    'assets/audio/passing_by_2_2000ms.mp3',
    'assets/audio/passing_by_3_2000ms.mp3'),
};

Object.freeze(Sounds);
