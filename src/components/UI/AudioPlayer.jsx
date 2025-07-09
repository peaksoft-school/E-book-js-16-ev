import { useRef, useState, useEffect } from 'react'
import { Box, IconButton, Typography, Slider, styled } from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import PauseIcon from '@mui/icons-material/Pause'

const AudioPlayerRow = ({ label, audioUrl }) => {
   const audioRef = useRef(null)
   const [isPlaying, setIsPlaying] = useState(false)
   const [duration, setDuration] = useState(0)
   const [currentTime, setCurrentTime] = useState(0)
   const [seeking, setSeeking] = useState(false)
   const [seekValue, setSeekValue] = useState(0)

   useEffect(() => {
      if (!audioRef.current) return

      const audio = audioRef.current

      const onLoadedMetadata = () => {
         setDuration(audio.duration)
      }

      const onTimeUpdate = () => {
         if (!seeking) {
            setCurrentTime(audio.currentTime)
            setSeekValue(audio.currentTime)
         }
      }

      const onEnded = () => {
         setIsPlaying(false)
      }

      audio.addEventListener('loadedmetadata', onLoadedMetadata)
      audio.addEventListener('timeupdate', onTimeUpdate)
      audio.addEventListener('ended', onEnded)

      return () => {
         audio.removeEventListener('loadedmetadata', onLoadedMetadata)
         audio.removeEventListener('timeupdate', onTimeUpdate)
         audio.removeEventListener('ended', onEnded)
      }
   }, [seeking])

   const togglePlay = () => {
      if (!audioRef.current) return
      if (isPlaying) {
         audioRef.current.pause()
      } else {
         audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
   }

   const handleSeekChange = (event, newValue) => {
      setSeekValue(newValue)
   }

   const handleSeekCommit = (event, newValue) => {
      if (audioRef.current) {
         audioRef.current.currentTime = newValue
      }
      setCurrentTime(newValue)
      setSeeking(false)
   }

   const handleSeekStart = () => {
      setSeeking(true)
   }

   if (!audioUrl) return null

   return (
      <AudioRowWrapper>
         <Typography variant="body2" sx={{ width: 80 }}>
            {label}
         </Typography>
         <IconButton onClick={togglePlay} size="small">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
         </IconButton>

         <Slider
            min={0}
            max={duration}
            value={seekValue}
            onChange={handleSeekChange}
            onChangeCommitted={handleSeekCommit}
            onMouseDown={handleSeekStart}
            sx={{ flex: 1, mx: 2 }}
         />

         <TimeText>
            {formatTime(currentTime)} / {formatTime(duration)}
         </TimeText>

         <audio ref={audioRef} src={audioUrl} preload="metadata" />
      </AudioRowWrapper>
   )
}

export default function SimpleAudioPlayerColumn({ audioUrl, fragmentUrl }) {
   return (
      <PlayerColumnWrapper>
         {audioUrl && <AudioPlayerRow label="Аудио" audioUrl={audioUrl} />}
         {fragmentUrl && (
            <AudioPlayerRow label="Фрагмент" audioUrl={fragmentUrl} />
         )}
      </PlayerColumnWrapper>
   )
}

function formatTime(seconds) {
   if (isNaN(seconds)) return '0:00'
   const m = Math.floor(seconds / 60)
   const s = Math.floor(seconds % 60)
   return `${m}:${s.toString().padStart(2, '0')}`
}

const PlayerColumnWrapper = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: 16,
   marginTop: 16,
})

const AudioRowWrapper = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: 8,
   width: '100%',
   maxWidth: 600,
})

const TimeText = styled(Typography)({
   minWidth: 60,
   fontSize: 14,
   color: '#555',
})
