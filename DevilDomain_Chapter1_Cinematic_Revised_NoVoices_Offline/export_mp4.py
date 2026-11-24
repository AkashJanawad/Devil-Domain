import asyncio,subprocess,sys,time
from pathlib import Path
from playwright.async_api import async_playwright
root=Path('/mnt/data/devildomain_ch1_v3')
H=root/'DevilDomain_Chapter1_Cinematic.html'
video=root/'DevilDomain_Chapter1_Cinematic_1080p_NoVoices.mp4'
FPS=24
async def main():
    cmd=['ffmpeg','-hide_banner','-loglevel','error','-nostdin','-y',
        '-f','image2pipe','-framerate',str(FPS),'-vcodec','mjpeg','-i','pipe:0',
        '-i',str(root/'DevilDomain_Chapter1_Soundtrack.mp3'),
        '-map','0:v:0','-map','1:a:0','-c:v','libx264','-preset','veryfast','-crf','18',
        '-pix_fmt','yuv420p','-r',str(FPS),'-t','20.0',
        '-profile:v','high','-level:v','4.2','-c:a','aac','-b:a','192k',
        '-ar','48000','-ac','2','-movflags','+faststart','-shortest',str(video)]
    proc=subprocess.Popen(cmd,stdin=subprocess.PIPE,stderr=(root/'ffmpeg_error.log').open('wb'),bufsize=0)
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True,executable_path='/usr/bin/chromium',args=['--no-sandbox','--disable-dev-shm-usage','--disable-background-timer-throttling','--use-gl=swiftshader'])
        page=await browser.new_page(viewport={'width':1920,'height':1080},device_scale_factor=1)
        page_errors=[];page.on('pageerror',lambda ex:page_errors.append(str(ex)))
        await page.set_content(H.read_text(),wait_until='load')
        await page.evaluate("() => {document.body.classList.add('capture'); const c=document.getElementById('film');const context=c.getContext('2d');c.width=1920;c.height=1080;context.setTransform(1.2,0,0,1.2,0,0);window.renderFrame(0)}")
        start=time.monotonic()
        for i in range(FPS*20):
            if proc.poll() is not None:raise RuntimeError(f'ffmpeg quit early, code {proc.returncode}: {(root/"ffmpeg_error.log").read_text()}')
            await page.evaluate('(t)=>window.renderFrame(t)',i/FPS)
            screenshot=await page.screenshot(type='jpeg',quality=92,animations='disabled',timeout=30000)
            proc.stdin.write(screenshot)
            if (i+1)%96==0:
                print('Rendered',i+1,'/',FPS*20,'frames in',round(time.monotonic()-start,1),'s',flush=True)
        await browser.close()
        proc.stdin.close()
        proc.wait(timeout=80)
        print('End',proc.returncode, 'page errors',page_errors)
        if proc.returncode!=0:print((root/'ffmpeg_error.log').read_text()[-4000:])
        print('file',str(video),'bytes',video.stat().st_size if video.exists() else None)
asyncio.run(main())
