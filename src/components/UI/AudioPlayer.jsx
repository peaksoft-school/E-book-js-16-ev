import React, { useRef, useState, useEffect } from 'react'
import { Box, styled, Typography, IconButton, Slider } from '@mui/material'

const AudioPlayer = ({ audioUrl, fragmentUrl }) => {
  if (!audioUrl && !fragmentUrl) return null

  return (
    <StyledAudioContainer>
      {audioUrl && <CustomAudioRow label="Аудио" url={audioUrl} />}
      {fragmentUrl && <CustomAudioRow label="Фрагмент" url={fragmentUrl} />}
    </StyledAudioContainer>
  )
}

const CustomAudioRow = ({ label, url }) => {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onLoaded = () => setDuration(audio.duration)
    const onTimeUpdate = () => setCurrentTime(audio.currentTime)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('loadedmetadata', onLoaded)
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', onLoaded)
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const handleSliderChange = (_, value) => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = value
      setCurrentTime(value)
    }
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <AudioRow>
      <AudioLabel>{label}</AudioLabel>
      <AudioPlayerWrapper>
        <IconButtonStyled onClick={togglePlay}>
          {isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayIcon />
          )}
        </IconButtonStyled>

        <Box sx={{ flex: 1 }}>
          <SliderStyled
            value={currentTime}
            min={0}
            max={duration}
            onChange={handleSliderChange}
          />
          <TimeRow>
            <TimeText>{formatTime(currentTime)}</TimeText>
            <TimeText>{formatTime(duration)}</TimeText>
          </TimeRow>
        </Box>

        <audio ref={audioRef} src={url} preload="metadata" />
      </AudioPlayerWrapper>
    </AudioRow>
  )
}

// ===== SVG ICONS =====
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const StyledAudioContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '24px',
})

const AudioRow = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
})

const AudioLabel = styled(Typography)({
  fontSize: '14px',
  fontWeight: 600,
  color: '#333',
  minWidth: '80px',
  lineHeight: '130%',
})

const AudioPlayerWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flex: 1,
  backgroundColor: '#f5f5f5',
  borderRadius: '12px',
  padding: '12px',
})

const IconButtonStyled = styled(IconButton)({
  backgroundColor: '#1976d2',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
  width: 48,
  height: 48,
})

const SliderStyled = styled(Slider)({
//   color: '#1976d2',
  height: 4,
  padding: '0px',
})

const TimeRow = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '4px',
})

const TimeText = styled(Typography)({
  fontSize: '12px',
  color: '#555',
})

export default AudioPlayer
