import { Button, Menu, MenuItem } from '@mui/material'
import { FileText } from 'lucide-react'
import { useState } from 'react'

const templates = [
  { label: 'Chapter summary', value: '## Chapter summary\n\nMain claim:\n\nEvidence:\n\nWhat changed in my understanding:\n' },
  { label: 'Book summary', value: '## Book summary\n\nCentral idea:\n\nImportant arguments:\n\nWhere this becomes action:\n' },
  { label: 'Quote analysis', value: '## Quote\n\n> \n\nWhy it matters:\n\nConnected thought: [[Topic: ]]\n' },
  { label: 'Key insight', value: '## Key insight\n\nThis page taught me:\n\nIt connects to: [[Topic: ]]\n' },
  { label: 'Study question', value: '## Study question\n\nQuestion:\n\nPossible answer:\n\nWhat to reread:\n' },
  { label: 'Action item', value: '## Action item\n\nPractice:\n\nFirst step:\n\nReview date:\n' },
  { label: 'Study group post', value: '## Group reflection\n\nInsight to share:\n\nQuestion for the circle:\n' },
]

type NoteTemplateMenuProps = {
  onSelect: (template: string) => void
}

export function NoteTemplateMenu({ onSelect }: NoteTemplateMenuProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  return (
    <>
      <Button variant="outlined" startIcon={<FileText size={18} />} onClick={(event) => setAnchor(event.currentTarget)}>
        Template
      </Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {templates.map((template) => (
          <MenuItem
            key={template.label}
            onClick={() => {
              onSelect(template.value)
              setAnchor(null)
            }}
          >
            {template.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
