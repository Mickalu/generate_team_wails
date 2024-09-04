import { display } from "html2canvas/dist/types/css/property-descriptors/display"

export const syncAltIconStyle = {
  border: '2px solid #000',
  borderRadius: '5px',
  '&:hover': {
    backgroundColor: '#91b6d1',
    cursor: 'pointer',
  }
}

export const boxTablesStyle = {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
}

export const boxCopyButtons = {
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginTop: '15px'
}
