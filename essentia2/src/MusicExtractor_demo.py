
# # Melody analysis - MusicBricks Tutorial
# import essentia in standard mode
import sys
import essentia
import essentia.standard
import essentia.standard as es
from essentia.standard import *

# import matplotlib for plotting
import matplotlib.pyplot as plt
import numpy
import math

try:
    filename = sys.argv[1]
except:
    print("usage : %s <input-audiofile>" % sys.argv[0])
    sys.exit()


# Load an audio file

# create an audio loader and import audio file
audio = essentia.standard.MonoLoader(filename = filename, sampleRate = 44100)()
audio = essentia.standard.EqualLoudness()(audio)

lenAudio = len(audio)/44100.0

# PitchMelodia takes the entire audio signal as input - no frame-wise processing is required here...
pExt = PitchMelodia(frameSize = 4096, hopSize = 128, guessUnvoiced=False)
melody_extractor = PitchContourSegmentation()
melody_filter = PitchFilter()
chord_dectecter = ChordsDetectionBeats()
rhythm_extractor = RhythmExtractor2013()
tonal_extractor = TonalExtractor()

pitch, pitchConf = pExt(audio)
pitch = melody_filter(pitch, pitchConf)
onset, duration, melody = melody_extractor(pitch, audio)
restonal = tonal_extractor(audio)

resrhythm = rhythm_extractor(audio)
SecPerBeat = round(60 / resrhythm[0], 5)
SecPerBar = SecPerBeat * 4
sixteenNote = SecPerBeat/4

reschord, reschordstr = chord_dectecter(restonal[7], resrhythm[1])
startaudio = onset[0]
resdiction = {'pitch' : [], 'octave' : [], 'duration' : [], 'bar' : [], 'chords' : []}
validBarInfo = []
print(SecPerBar, SecPerBeat, sixteenNote)
#print(resrhythm[4])
i = 0
tmpchord = ''
chords = []
for chord in reschord:
    if(i % 2 == 0):
        if(tmpchord != chord or i % 4 == 0):
            resdiction['chords'].append(chord)
        elif(i % 4 != 0):
            resdiction['chords'].append('...')
        tmpchord = chord 
    i = i + 1

filMelody = []
filDuration = []
filOnset = []
for idx in range(0, len(duration)):
    if(duration[idx] >= sixteenNote):
        filMelody.append(melody[idx])
        filDuration.append(duration[idx])
        filOnset.append(onset[idx] - startaudio)

#print(len(filOnset))
#print(sixteenNote)
for i in range(0, len(filOnset)):
    filOnset[i] = round(filOnset[i]/sixteenNote) * sixteenNote

for i in range(0,len(filOnset)):
    curNote = filOnset[i]
    nextNote = 0
    if(i == len(filOnset) - 1):
        nextNote = filOnset[i] - (filOnset[i] % SecPerBar) + SecPerBar
    else:
        nextNote = filOnset[i+1]
    if(curNote//SecPerBar != nextNote//SecPerBar):
        validBarInfo.append(1)
        nextNote = math.floor(nextNote/SecPerBar) * SecPerBar
        if(i != len(filOnset) - 1):
            filOnset[i+1] = nextNote + 0.000001
    else:
        validBarInfo.append(0)
    interval = nextNote - curNote
#    print(filOnset[i], interval)
    durate = round(interval/sixteenNote)
#    print(durate)

    if(durate >= 12):
        resdiction['duration'].append(7)
    if(durate >= 8 and durate < 12):
        resdiction['duration'].append(6)
    if(durate >= 6 and durate < 8):
        resdiction['duration'].append(5)
    if(durate >= 4 and durate < 6):
        resdiction['duration'].append(4)
    if(durate == 3):
        resdiction['duration'].append(3)
    if(durate == 2):
        resdiction['duration'].append(2)
    if(durate == 1):
        resdiction['duration'].append(1)
    if(durate < 1):
        resdiction['duration'].append(0)
    
    resdiction['pitch'].append(filMelody[i]%12)
    resdiction['octave'].append(math.floor(filMelody[i]/12) - 3)
num = 0
#print(filOnset)
for valid in validBarInfo:
    num = num + 1
    if(valid == 1):
        resdiction['bar'].append(num)
        num = 0
resdiction['bar'].append(num)
'''
for list in resdiction:
    print(list)
    print(len(resdiction[list]))
    print(resdiction[list])
'''
