# Semaine RIM / UPI BeCoMe - Mars 2018

## 00-intro

```
cd 00-intro
http-server
```

## 01-trigger-synth

- soundfile player + feedback delay
- display the waveform of the played soundfile

```
cd 01-trigger-synth
npm install
npm run watch
```

**warnings**

- breaks on iOS due to some bug in `waves-blocks`, if the code related to the waveform display is removed everything works fine on all platforms
- As the `waves-blocks` library used to display the waveform is still under heavy development, this example may break

## 02-step-sequencer

```
cd 02-step-sequencer
npm install
npm run watch
```

**note**

- a button has been added to start the playback - required for iOS.
- a modification have been made in the package.json  
  cf. `"waves-audio": "^0.4.0"` (waves-audio is npm so no need to point to github)

## 03-soundworks-demo

```
cd 03-soundworks-demo
npm install
npm run watch
```
