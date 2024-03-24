import { useEffect, useState } from 'react'
import {Howl, Howler} from 'howler';
import './pomodoro.css'

export const Pomodoro = () => {

    var sound = new Howl({
        src: ['bell.webm'],
        volume: 0.4,
      });

    const [start, setStart] = useState(false)
    const [min, setMin] = useState(25)
    const [sec, setSec] = useState(0)

    useEffect(() => {
        if (start) {
            const intervalTimer = setInterval(() => {
                if (sec > 0) {
                    setSec((sec) => sec - 1)
                }
                if (sec === 0) {
                    setMin((min) => min - 1)
                    setSec(59)
                }
                if (min === 0 && sec === 0) {
                    setStart(false)
                }
            }, 1000)
            return () => clearInterval(intervalTimer)
        }
    }, [start, min, sec])

    const startPomodoro = () => {
        setStart(true)
    }
    const pausePomodoro = () => {
        setStart(false)
        sound.play();
    }
    const resetPomodoro = () => {
        setStart(false)
        setMin(25)
        setSec(0)
    }


    return (
        <>
            <div className="pomodoro">
                <div>
                    <p className='text-clock'>{min}:{sec < 10 ? "0" + sec : sec}</p>
                </div>
                <div className='btn-clock'>
                    <button onClick={startPomodoro} className='fa-solid fa-play'></button>
                    <button onClick={pausePomodoro} className='fa-solid fa-pause'></button>
                    <button onClick={resetPomodoro} className='fa-solid fa-repeat'></button>
                </div>
            </div>
        </>
    )
}