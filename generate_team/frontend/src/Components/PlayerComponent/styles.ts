import { display } from "html2canvas/dist/types/css/property-descriptors/display"

export const PlayerComponentStyle = {
  display: 'flex',
  justifyContent: 'flex-start',
  gap: '5px',
  width: '100%',
}

export const deleteButtonStyle = {
  color: "#fffffe",
  backgroundColor: "#ef4565",
  '&:hover': {
    backgroundColor: '#b8374e'
  },
  width: '20px',
}

export const levelInputStyle = {
  width: '20%',
  display: "flex",
  justifyContent: "end",
}

export const usernameInputStyle = {
  width: "80%",
  display: "flex",
  justifyContent: "end",
}
