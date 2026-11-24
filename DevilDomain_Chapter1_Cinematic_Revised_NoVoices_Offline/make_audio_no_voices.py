"""Composes ORIGINAL cinematic procedural music, Foley, and offline synthesized dialogue. No web services."""
import numpy as np, soundfile as sf, scipy.signal as sig
from pathlib import Path
root=Path(__file__).parent
SR=48000;DUR=20.0;N=int(SR*DUR);rng=np.random.default_rng(2026)
L=np.zeros(N,np.float64);R=np.zeros(N,np.float64)
def add(data, start, vol=.5, pan=0, spatial=True):
    global L,R
    if isinstance(data,list):data=np.array(data)
    data=np.asarray(data,dtype=np.float64)
    if data.ndim>1:data=data.mean(axis=1)
    off=int(start*SR)
    if off<0: data=data[-off:];off=0
    length=min(len(data),N-off)
    if length<=0:return
    if abs(pan)>1: print("BAD PAN",pan,start,vol);pan=float(np.clip(pan,-.95,.95))
    scale_l=np.sqrt((1-pan)/2)*1.30;scale_r=np.sqrt((1+pan)/2)*1.30
    L[off:off+length]+=vol*scale_l*data[:length]
    R[off:off+length]+=vol*scale_r*data[:length]
def env(d,a=.2,r=.25):
    t=np.arange(int(d*SR))/SR
    return np.minimum(1,t/max(a,.001))*np.minimum(1,(d-t)/max(r,.001)).clip(0,1)
def lpf(x,hz=1500):return sig.sosfilt(sig.butter(3,hz,fs=SR,btype='lowpass',output='sos'),x)
def hpf(x,hz=220):return sig.sosfilt(sig.butter(3,hz,fs=SR,btype='highpass',output='sos'),x)
def note(freq,duration,soft=True):
    tm=np.arange(int(duration*SR))/SR
    # lush filtered analog string chords with stereo-ish ensemble motion
    p=2*np.pi*freq*(tm+.0013*np.sin(2*np.pi*4.35*tm)/4.35)
    wave=(np.sin(p)+.24*np.sin(p*2+.15)+.12*np.sin(p*3+.9)+.045*np.sin(p*5))
    return wave*env(duration,.6 if soft else .04,.65 if soft else .12)
def pad_chord(start,duration,freqs,volume=.10):
    for j,f in enumerate(freqs):
        x=note(f,duration)+.22*note(f*.998,duration)
        add(lpf(x,1300),start,.12*volume/.1,pan=[-.62,.1,.58][j%3])
def bell(start,f,dur=1.75,vol=.28,pan=0):
    t=np.arange(int(dur*SR))/SR
    x=(np.sin(2*np.pi*f*t)+.4*np.sin(2*np.pi*2.02*f*t)+.18*np.sin(2*np.pi*3.98*f*t))*np.exp(-t*2.0)
    add(x,start,vol,pan)
def boom(start,vol=.5):
    dur=1.9;t=np.arange(int(dur*SR))/SR
    phase=2*np.pi*(58*t+40*(1-np.exp(-t*13))/13)
    x=(np.sin(phase)+.32*np.sin(phase*.5))*np.exp(-t*5)
    noise=lpf(rng.normal(0,1,len(t)),250)*np.exp(-t*9)
    add(x+noise*.5,start,vol,-.05)
def sweep(start,dur=.75,vol=.25,descending=False,pan=0):
    t=np.arange(int(dur*SR))/SR
    white=rng.normal(0,1,len(t))
    sm=lpf(white,2100)
    p=2*np.pi*(170*t+(70*(-1 if descending else 1))*t*t)
    x=(.56*sm+.22*np.sin(p))*env(dur,.06,.16)
    add(x,start,vol,pan)
def steps(a,b,step=.19,vol=.10):
    for i,t0 in enumerate(np.arange(a,b,step)):
        n=int(.115*SR);t=np.arange(n)/SR
        noise=lpf(rng.normal(0,1,n),420)*np.exp(-t*45)
        low=np.sin(2*np.pi*62*t)*np.exp(-t*38)
        add(.32*noise+.65*low,t0,vol,pan=(-.45 if i%2 else .45))
def rustle(start,vol=.14,dur=.55):
    t=np.arange(int(dur*SR))/SR
    x=hpf(lpf(rng.normal(0,1,len(t)),7000),600)*env(dur,.03,.13)
    x*=.5+.5*np.sin(2*np.pi*13*t)**2
    add(x,start,vol)
# ORIGINAL MUSIC: short 4-bar minor-key score with warm opening -> darkness -> journey.
pad_chord(0,4.1,[130.81,155.56,196.00],.074)
pad_chord(3.05,4.10,[103.83,130.81,155.56],.12)
pad_chord(6.35,4.63,[98.00,116.54,146.83],.14)
pad_chord(10.78,4.48,[116.54,146.83,174.61],.084)
pad_chord(14.88,4.3,[130.81,155.56,196.00],.15)
pad_chord(18.3,1.7,[155.56,196.00,233.08],.15)
# Mystical bell motif intentionally unobtrusive under actors.
for tm,f in [(0.20,523.25),(1.02,659.25),(1.83,783.99),(4.45,369.99),(7.08,523.25),(11.7,349.23),(14.35,523.25),(17.5,587.33),(18.72,783.99)]: bell(tm,f,1.8,.11,pan=(tm%2-.5)*.8)
# An ominous dark rhythmic ostinato under mountain chase.
for i,t0 in enumerate(np.arange(3.05,11.1,.83)):
    add(note(65.4 if i%2==0 else 77.78,.42,False),t0,.055,pan=.1)
# Steady hopeful march notes toward the mountain.
for i,t0 in enumerate(np.arange(15.0,18.5,.56)):
    f=[261.63,311.13,392.00,466.16][i%4]
    add(note(f,.55,False),t0,.043,pan=(-.3 if i%2 else .3))
# Sound effects with spatial placement.
bell(.44,1046,2,.22,-.2);sweep(2.78,.92,.24,False,.7);boom(2.98,.68)
sweep(5.48,.58,.26,False,-.4);sweep(6.39,.46,.45,True,-.18);boom(6.46,.75);bell(6.51,880,.90,.32,-.10)
sweep(7.87,.85,.32,True,.3);steps(8.20,10.78,.17,.18);boom(8.10,.4)
for tm in [11.5,12.02,12.64]:rustle(tm,.14,.47)
rustle(12.95,.21,.8);rustle(13.52,.12,.4)
for tm in [14.87,16.15]:sweep(tm,1.2,.12,False,-.3)
steps(15.4,18.45,.24,.11);boom(18.51,.57);bell(18.7,1046.5,1.1,.23)
# Low rumble swirling behind villain; animated smoothly.
t=np.arange(N)/SR
bass_noise=lpf(rng.normal(0,1,N),140)
rumble=np.zeros(N)
for a,b,lvl in [(2.8,7.9,.016),(7.9,10.9,.021),(14.9,19.3,.022)]:
    mask=(t>=a)&(t<=b);q=t[mask]
    ramp=np.minimum(1,(q-a)/.85)*np.minimum(1,(b-q)/.8)
    rumble[mask]=bass_noise[mask]*lvl*ramp
L+=rumble*.95;R+=rumble*1.05
# Pure score and Foley, with no voice actors or synthesized speech.
# soft mastering and normalize -1.1 dBFS
arr=np.stack([L,R],axis=-1);arr=np.tanh(arr*1.25)
peak=np.max(np.abs(arr));arr=arr/max(peak,1e-9)*.88
wav=root/'DevilDomain_Chapter1_Mix_48k.wav';sf.write(wav,arr,SR,subtype='PCM_16')
print('WAV',wav,'peak',peak)
