import { useEffect, useState } from 'react'
import {Howl, Howler} from 'howler';
import './pomodoro.css'

export const Pomodoro = () => {

    var soundBreak = new Howl({
        src: ['bell.webm'],
        volume: 0.4,
      });

    var soundWork = new Howl({
        src: ['bellwork.webm'],
        volume: 0.4,
      });

    const [start, setStart] = useState(false)
    const [min, setMin] = useState(25)
    const [sec, setSec] = useState(0)
    const [finish, setFinish] = useState(false)
    const [workInterval, setWorkInterval] = useState(0)
    const [breakInterval, setBreakInterval] = useState(0)

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
                    setMin(0);
                    setSec(0);
                    if (!finish) {
                        soundBreak.play();
                        setMin(5);
                        setFinish(true);
                        setWorkInterval((workInterval) => workInterval + 1)
                    }
                    if (finish) {
                        soundWork.play();
                        setMin(25);
                        setFinish(false);
                        setBreakInterval((breakInterval) => breakInterval + 1)
                    }
                    

                }
            }, 1000)
            return () => clearInterval(intervalTimer)
        }
    }, [start, min, sec, workInterval, breakInterval])

    const startPomodoro = () => {
        setStart(true)
    }
    const pausePomodoro = () => {
        setStart(false)
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
                <div>
                    <p className='interval-clock'>{workInterval} Intervalos de trabajo</p>
                    <p className='interval-clock'>{breakInterval} Intervalos de descanso</p>
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