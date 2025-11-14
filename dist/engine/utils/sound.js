export class Oscillator
{
	constructor()
	{
		this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
		this.motorCount = 0;
	}
	
	play(freq, time)
	{
		const oscillator = this.audioCtx.createOscillator();

		oscillator.type = 'square';
		oscillator.frequency.setValueAtTime(440, this.audioCtx.currentTime); // value in hertz
		oscillator.connect(this.audioCtx.destination);
		oscillator.start();
		oscillator.stop(this.audioCtx.currentTime + time);
	}
	
	shot()
	{
		const low = this.audioCtx.createOscillator();

		low.type = 'sawtooth';
		low.frequency.setValueAtTime(300, this.audioCtx.currentTime); // value in hertz
		low.frequency.setValueAtTime(600, this.audioCtx.currentTime + 0.05); // value in hertz
		low.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.2); // value in hertz
		low.connect(this.audioCtx.destination);

		low.start();
		low.stop(this.audioCtx.currentTime + 0.2);
		
	}
	
	destroy()
	{
		const low = this.audioCtx.createOscillator();

		low.type = 'sawtooth';
		low.frequency.setValueAtTime(600, this.audioCtx.currentTime); // value in hertz
		low.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.1); // value in hertz
		low.frequency.exponentialRampToValueAtTime(400, this.audioCtx.currentTime + 0.15); // value in hertz
		low.frequency.exponentialRampToValueAtTime(300, this.audioCtx.currentTime + 0.2); // value in hertz
		low.frequency.linearRampToValueAtTime(100, this.audioCtx.currentTime + 0.5); // value in hertz
		low.connect(this.audioCtx.destination);

		low.start();
		low.stop(this.audioCtx.currentTime + 0.5);
		
	}
	
	success()
	{
		const low = this.audioCtx.createOscillator();

		low.type = 'sawtooth';
		low.frequency.setValueAtTime(400, this.audioCtx.currentTime); // value in hertz
		low.frequency.setValueAtTime(300, this.audioCtx.currentTime + 0.09); // value in hertz
		low.frequency.setValueAtTime(600, this.audioCtx.currentTime + 0.1); // value in hertz
		low.connect(this.audioCtx.destination);

		low.start();
		low.stop(this.audioCtx.currentTime + 0.2);
		
	}
	
	dead()
	{
		const low = this.audioCtx.createOscillator();

		low.type = 'sawtooth';
		low.frequency.setValueAtTime(200, this.audioCtx.currentTime); // value in hertz
		low.frequency.setValueAtTime(500, this.audioCtx.currentTime + 0.1); // value in hertz
		low.frequency.setValueAtTime(300, this.audioCtx.currentTime + 0.2); // value in hertz
		low.frequency.setValueAtTime(600, this.audioCtx.currentTime + 0.3); // value in hertz
		low.frequency.linearRampToValueAtTime(100, this.audioCtx.currentTime + 0.5); // value in hertz
		low.connect(this.audioCtx.destination);

		low.start();
		low.stop(this.audioCtx.currentTime + 0.5);
	}
}