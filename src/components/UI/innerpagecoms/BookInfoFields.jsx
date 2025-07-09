import { Box, Typography, styled, useTheme } from '@mui/material'

const BookInfoFields = ({ book }) => {
   const theme = useTheme()

   const baseFields = [
      { label: 'Автор', value: book.authors },
      { label: 'Жанр', value: book.genres?.join(', ') || '—' },
      { label: 'Язык', value: book.language },
      { label: 'Издательство', value: book.publisher },
      { label: 'Год выпуска', value: book.year },
   ]

   const infoFields = [...baseFields]

   if (book.type === 'ELECTRONIC') {
      infoFields.push({ label: 'Объем', value: `${book.valuePages} стр` })
      infoFields.push({ label: 'Смотреть PDF', value: book.pdfUrl })
   } else if (book.type === 'PAPER') {
      infoFields.push({ label: 'Объем', value: `${book.valuePages} стр` })
   } else if (book.type === 'AUDIO') {
      infoFields.push({ label: 'Длительность', value: `${book.audioDuration}` })
   }

   return (
      <InfoGrid>
         <LabelsColumn>
            {infoFields.map(({ label }) => (
               <LabelText key={label}>{label}</LabelText>
            ))}
         </LabelsColumn>
         <ValuesColumn>
            {infoFields.map(({ label, value }) => (
               <ValueText
                  key={label}
                  sx={{
                     color:
                        label === 'Смотреть PDF'
                           ? '#969696'
                           : theme.palette.primary.main,
                  }}
               >
                  {label === 'Смотреть PDF' && value ? (
                     <a
                        href={value}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                           color: '#1976d2',
                           textDecoration: 'none',
                           fontWeight: 500,
                        }}
                     >
                        Document.pdf
                     </a>
                  ) : (
                     value
                  )}
               </ValueText>
            ))}
         </ValuesColumn>
      </InfoGrid>
   )
}

export default BookInfoFields

const InfoGrid = styled(Box)(() => ({
   display: 'flex',
   gap: '24px',
   marginTop: 47,
}))

const LabelsColumn = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
   minWidth: '245px',
}))

const ValuesColumn = styled(Box)(() => ({
   display: 'flex',
   flexDirection: 'column',
   gap: '12px',
}))

const LabelText = styled(Typography)(() => ({
   fontSize: '14px',
   lineHeight: '130%',
   fontWeight: 600,
}))

const ValueText = styled(Typography)(() => ({
   fontSize: '14px',
   lineHeight: '130%',
   fontWeight: 400,
}))
