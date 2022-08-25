import * as React from 'react'
import { styled } from '@mui/material/styles'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  background: '#FFFDE3',
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .01)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}))

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>()

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <div className="accordion">
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Учись!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'justify' }}>
            Электронный учебник состоит из шести разделов, каждый из которых
            отличается уровнем сложности. Каждая страница в учебнике содержит в
            себе 20 слов, их перевод, тематическое изображение, произношение, а
            так же пример использования
          </Typography>
          <Button variant="contained" size="small">
            <Link to="1">Начать</Link>
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Играй!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'justify' }}>
            Получить удовольствие от изучения, а так же закрепить свои знания
            Вам помогут наши игры: &quot;Спринт&quot; и &quot;Аудиовызов&quot;.{' '}
            <br />В игре &quot;Спринт&quot; необходимо указать правильный
            перевод слова за отведенное время. <br />
            Игра &quot;Аудиовызов&quot; поможет развить аудирование и навыки
            перевода.
          </Typography>
          <Button variant="contained" size="small">
            <Link to="2"> Попробовать</Link>
          </Button>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Совершенствуйся!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ textAlign: 'justify' }}>
            Твой личный словарь содержит изученные слова. Ты можешь отметить
            сложные слова, чтобы обратить на них внимание в будущем. <br />
            Раздел статистики поможет оставаться в тонусе и следить за процессом
            обучения.
          </Typography>
          <Button variant="contained" size="small">
            <Link to="5">Перейти</Link>
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}
