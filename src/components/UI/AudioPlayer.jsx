import { Box, styled } from '@mui/material'

const AudioPlayer = ({ audioUrl, fragmentUrl, fragmentDuration }) => {
   return (
      <StyledAudioContainer>
         <AudioControl>
            <audio controls>
               <source src={audioUrl} type="audio/mp3" />
               Your browser does not support the audio element.
            </audio>
            <AudioLabel>Аудио</AudioLabel>
         </AudioControl>
         {fragmentUrl && (
            <FragmentControl>
               <audio controls>
                  <source src={fragmentUrl} type="audio/mp3" />
                  Your browser does not support the audio element.
               </audio>
               <AudioLabel>Фрагмент</AudioLabel>
               {fragmentDuration && (
                  <FragmentDuration>{`Длительность: ${fragmentDuration}`}</FragmentDuration>
               )}
            </FragmentControl>
         )}
      </StyledAudioContainer>
   )
}

const StyledAudioContainer = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '10px',
})

const AudioControl = styled(Box)({
   display: 'flex',
   alignItems: 'center',
   gap: '10px',
})

const FragmentControl = styled(Box)({
   display: 'flex',
   flexDirection: 'column',
   gap: '5px',
})

const AudioLabel = styled('span')({
   fontSize: '14px',
   fontWeight: 600,
   color: '#333',
})

const FragmentDuration = styled('span')({
   fontSize: '12px',
   fontWeight: 400,
   color: '#777',
})

export default AudioPlayer
